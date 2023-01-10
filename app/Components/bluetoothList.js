import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, PermissionsAndroid, NativeModules, NativeEventEmitter, Platform  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Layout from '../screens/BluetoothListLayout'
import Empty from './empty'
import Toggle from './toggle';
import Subtitle from './subtitle';
import Device from './device';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import BleManager from 'react-native-ble-manager'
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function BluetoothList(props) {
  const {navigation} = props;
  const [btEnable, setBtEnable] = useState(false);

  //Get an id from peripherals 
  const [peripherals, setPeripherals] = useState([]) //useState([{ id: '77:77:77:77:77', peripheral: { id: '77:77:77:77:77', name: 'TSDZ2 Motor' }} ])                                              //a list of all saved peripherals and saved into async storage
  let plist = []
  
  const [peripheralsDiscovered, setPeripheralsDiscovered] = useState([])                          //peripherals found from a scan, stored in a Set object, why? So no duplicates
  let pDiscovered = []

  const [displayScanResults, setDisplayScanResults] = useState(false)                             //control the bluetooth button, press to scan press to stop

  const [peripheralsConnected, setPeripheralsConnected] = useState([])
  const [rowsTouched, setRowsTouched] = useState([]) 

  const [readPeripheralState, setReadPeripheralState] = useState(false)

  const [peripheralData, setPeripheralData] = useState([])   //useState([{id: 0, data: 'heyupski'}])

  const [sendtext, setSendtext] = useState('')
  //-----------------------------------------Async Storage routines-------------------------------------
  const clearAsyncStorage = async () => {  //!!!!!!!!!!!be careful will get rid of everything
    try {
      await AsyncStorage.clear()
    } catch (e) {
      console.log('GM error clearing async storage : ', e)
    }
  }

  const setStringValue = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      console.log('GM set data error : ', e)
    }
  }

  //-------------------------------------------------UseEffect--------------------------------------------------
  useEffect( () => {
    // ----------------------------------------------BLE Setup----------------------------------------------------
    //handle ble permissions
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
        if (result) {
          console.log("Blutooth BLE Permission is OK")
        } else {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
            if (result) {
              console.log("User accepted bluetooth")
            } else {
              console.log("User refused bluetooth")
            }
          })
        }
      })
    }

    //start ble manager
    BleManager.start({ showAlert: false }).then(() => {
      console.log("GM: BLE initialised")
    })

    //set up handlers
    const bleMDiscoverPeripheral    = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral)
    const bleMStopScan              = bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan)
    const bleMUpdateValue = null
    //const bleMUpdateValue           = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic)
    const bleMDisconnectPeripheral  = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral)

    const getAllSavedPeripherals = async () => {
      //get an array from all keys of those starting with ble
      let keys = []
      let values = []
      try {
        keys = await AsyncStorage.getAllKeys()
        if (keys !== null) {
          keys = keys.filter(key => key.startsWith('ble'))
        }
      } catch (e) {
        console.log('GM: get all keys error : ', e)
      }
      //now multi-get and process
      try {
        if (keys !== null) {
          values = await AsyncStorage.multiGet(keys)
          // //getting back arrays of arrays, need to convert to array of objects
          plist = []
          values.forEach(v => {
            plist.push({ id: v[0].substring(3), peripheral: JSON.parse(v[1]).peripheral })
          })
          setPeripherals(plist) //update the state
        }
      } catch (e) {
        console.log('GM: get all data error : ', e)
      }
    }
    getAllSavedPeripherals()
    //remove handlers on exit -- need these at end of useEffect
    return (() => {
      bleMDiscoverPeripheral.remove()
      bleMStopScan.remove()
      //bleMUpdateValue.remove()
      if (bleMUpdateValue !== null) bleMUpdateValue.remove()
      bleMDisconnectPeripheral.remove()
    })

  }, [])

  const deletePeripheralFromList = (p) => {
    //console.log('delete', p)
    //put an alert in 

    Alert.alert(
      "Delete this peripheral?",
      "Are you sure? You will need to rescan if you want it back.",
      [
        {
          text: "Cancel",
          onPress: () => { },
          style: "cancel"
        },
        {
          text: "OK", onPress: () => {
            let x = peripherals.filter(item => item.id !== p.id)
            setPeripherals(x)
            //need to actually delete it from async storage
            delPeripheral(p)
          }
        }
      ]
    )
  }

  const delPeripheral = async (p) => {
    try {
      await AsyncStorage.removeItem('ble'+p.id)
    }
    catch (e) {
      console.log('GM: failed to delete peripheral : ', e)
    }
  }

  //---------------------------------------------------Scan button--------------------------------------------------
  
  const scanForMorePeripherals = () => {  //from bluetooth button
    console.log('Scanning...')
    if (!displayScanResults) {
      setDisplayScanResults(true)
      pDiscovered = []
      startScan()
    }
    else {
      setDisplayScanResults(false)
      stopScan()
    }
  }

  const startScan = async () => {  
    try {
      console.log('GM Started scanning...')
      await BleManager.scan([], 5)                                //these options were supposed to stop duplicates??, false, {numberOfMatches: 1, matchMode: 1, scanMode: 1, reportDelay: 0} ) )  
    }
    catch (e) {
      console.log('GM: Error scanning ' + e)
    }
  }

  const handleStopScan = () => {  //from event emitter when scan time (3 seconds currently) finishes
    console.log('GM: Stopped scanning')
    setPeripheralsDiscovered(pDiscovered)
  }

  const stopScan = async () => {  //manual stop by pressing BT button
    try {
      await BleManager.stopScan()
      console.log('GM: Stopped scan manually')
      setPeripheralsDiscovered(pDiscovered)
    }
    catch (e) {
      console.log('GM: Error in stopping scan ' + e)
    }
  }

  const handleDiscoverPeripheral = (p) => {     //if peripheral discovered during scan, controlled by event emitter in useEffect
    //console.log(p)
    if (p.name !== null) {
      let unique = true
      pDiscovered.forEach(pid => {
        if (pid.id === p.id) unique = false
      })
      if (unique) pDiscovered.push({ id: p.id, peripheral: p })
    }
  }

  const addPeripheralToSavedList = (p) => {
    //check does the peripheral exist in my saved list?
    let exists = false
    peripherals.forEach(peripheral => {
      if (peripheral.id === p.id) exists = true
    })
    if (!exists) {
      setPeripherals( peripherals => [...peripherals, { id: p.id, peripheral: p }] )
      setStringValue('ble' + p.id, JSON.stringify({ peripheral: p}))  //add to async storage    
    }
  }


  //--------------------------------------Connect peripheral and listen for notifications----------------------------------


  const selectPeripheral = async (p, i) => {
    let itemId = p.item.id  //e.g. "F3:69:03:E9:DF:F9" 
    if ( !rowsTouched.includes(i.index) ) {   //array of touched rows
      setRowsTouched([...rowsTouched, i.index])
      //now connect to the selected peripheral
      try {
        await BleManager.connect(itemId)
        setPeripheralsConnected([...peripheralsConnected, i.index])
        const peripheralinfo = await BleManager.retrieveServices(itemId)
        console.log('Peripheral info ', peripheralinfo)
        //so hard coded!!
        //peripheral, service, characteristic

        if (peripheralinfo.id === 'F3:69:03:E9:DF:F9') {  //the heart rate monitor
          setupNotifier('F3:69:03:E9:DF:F9', '180d', '2A37')
        }
        if (peripheralinfo.id === 'E8:72:D1:25:6E:4E') {  //the speedo
          setupNotifier('E8:72:D1:25:6E:4E', '1816', '2A5B')
        }
        if (peripheralinfo.id === 'D6:70:81:A8:5B:2D') {  //the cadence
          setupNotifier('D6:70:81:A8:5B:2D', '1816', '2A5B')
        }
        if (peripheralinfo.id === 'xx:xx:xx:xx:xx:xx') {  //TSDZ2 motor
          setupNotifier('xx:xx:xx:xx:xx:xx', 'xxxx', 'xxxx')
        }

        //test with HM-10 (HM Soft) board
        //read
        if (peripheralinfo.id === '7C:EC:79:DC:AC:E8') {
          setupNotifier('7C:EC:79:DC:AC:E8', 'FFE0', 'FFE1')
        }

        //test with nRF52840 DK board
        if (peripheralinfo.id === 'D5:81:32:F6:09:3C') {
          setupNotifier('D5:81:32:F6:09:3C', '1816', '2A5B')
        }

      }
      catch(e) {
        console.log("GM: Couldn't connect ", e)
        setRowsTouched(rowsTouched.filter(r => r !== i.index)) 
        setPeripheralsConnected(peripheralsConnected.filter(p => p !== i.index))
      }
    }
    else {  //now disconnect from deselected peripheral
      setRowsTouched(rowsTouched.filter(r => r !== i.index))
      try {
        await BleManager.disconnect(itemId)
      }
      catch(e) {
        console.log("GM: Couldn't disconnect ", e)
        //and do what?
      }
    }
  }

  const setupNotifier = async (peripheral, service, characteristic) => {
    const pinfo = await BleManager.retrieveServices(peripheral)

    await BleManager.startNotification(peripheral, service, characteristic)
    console.log('Notifier started', pinfo)
  }
  
  const renderEmpty = () =>  <Empty text='No Available Devices'/>
  const renderItem = ({item}) =>  {
    return <Device navigation={navigation} {...item}/>
  }

  const readdata = async () => {
    let readdata
    try {
      // readdata = await BleManager.read("7C:EC:79:DC:AC:E8", "1800", "2A00" )
      // console.log('Data from HM10 2A00 ',readdata)
      // readdata = await BleManager.read("7C:EC:79:DC:AC:E8", "1800", "2A01" )
      // console.log('Data from HM10 2A01 ',readdata)
      // readdata = await BleManager.read("7C:EC:79:DC:AC:E8", "1800", "2A02" )
      // console.log('Data from HM10 2A02 ',readdata)
      // readdata = await BleManager.read("7C:EC:79:DC:AC:E8", "1800", "2A04" )
      // console.log('Data from HM10 2A04 ',readdata)

      readdata = await BleManager.read("7C:EC:79:DC:AC:E8", "FFE0", "FFE1" )
      console.log('Read from HM10 FFE0 FFE1 ', readdata)

      setTestreaddata(readdata)
      setMotor(readdata)
    }
    catch (e) {
      console.log('GM read error ', e)
    }

  }

  const writedata = async () => {
    //let str = 'Hello HM10'
    let str = sendtext
    let bdata = toUTF8Array(str)    //48-65-6C-6C-6F   //72-101-108-108-111
    setTestwritedata(str)

    try {
      await BleManager.retrieveServices("7C:EC:79:DC:AC:E8")
      await BleManager.writeWithoutResponse("7C:EC:79:DC:AC:E8", "FFE0", "FFE1", bdata)
      console.log('Write to HM10 (FFE0 FFE1) ', bdata, str)
    }
    catch (e) {
      console.log('GM write error ', e)
    }
  }

  const toUTF8Array = (str) => {
    let utf8 = [];
    for (let i = 0; i < str.length; i++) {
      let charcode = str.charCodeAt(i);
      if (charcode < 0x80) utf8.push(charcode);
      else if (charcode < 0x800) {
        utf8.push(0xc0 | (charcode >> 6),
          0x80 | (charcode & 0x3f));
      }
      else if (charcode < 0xd800 || charcode >= 0xe000) {
        utf8.push(0xe0 | (charcode >> 12),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f));
      }
      // surrogate pair
      else {
        i++;
        // UTF-16 encodes 0x10000-0x10FFFF by
        // subtracting 0x10000 and splitting the
        // 20 bits of 0x0-0xFFFFF into two halves
        charcode = 0x10000 + (((charcode & 0x3ff) << 10)
          | (str.charCodeAt(i) & 0x3ff));
        utf8.push(0xf0 | (charcode >> 18),
          0x80 | ((charcode >> 12) & 0x3f),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f));
      }
    }
    return utf8;
  }

  const sendtextchange = (txt) => {
    setSendtext(txt)
  }


    return (
    <Layout title='Bluetooth' navigation={navigation}>
      <TouchableOpacity onPress={!displayScanResults?startScan:stopScan} style={{marginLeft: '80%'}}>
        <Icon color={'#00BFFF'} name={!displayScanResults?'refresh-circle':'stop-circle'} size={50}/>
      </TouchableOpacity>
      <Toggle value={btEnable}/>
      <Subtitle title='Devices'/>
      <FlatList
        data={peripheralsDiscovered?peripheralsDiscovered:null}
        ListEmptyComponent={renderEmpty}
        renderItem={renderItem}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  btItem:{
    fontSize: 20,
  }
});
