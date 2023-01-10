import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Alert, PermissionsAndroid  } from 'react-native';
import Layout from '../screens/BluetoothListLayout'
import Empty from './empty'
import Toggle from './toggle';
import Subtitle from './subtitle';
import Device from './device';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useBLE from '../helpers/bleManager';

// const listei = [
//   {
//     name: 'Device 01',
//     id: '01',
//   },
//   {
//     name: 'Device 02',
//     id: '02',
//   }
// ];

export default function BluetoothList(props) {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice, 
    connectedDevice, 
    disconnectFromDevice,
  } = useBLE();

  const {navigation} = props;
  const [list, setList] = useState([]);
  const [btEnable, setBtEnable] = useState(false);

  const scanForDevices = () => {
    requestPermissions(isGranted => {
      if (isGranted) {
        scanForPeripherals();
      }
    });
  };

  const renderEmpty = () =>  <Empty text='No Available Devices'/>
  const renderItem = ({item}) =>  {
    return <Device navigation={navigation} {...item}/>
  }
    return (
    <Layout title='Bluetooth' navigation={navigation}>
      <TouchableOpacity onPress={scanForDevices} style={{marginLeft: '80%'}}>
        <Icon color={'#00BFFF'} name='refresh-circle' size={50}/>
      </TouchableOpacity>
      <Toggle onValueChange={''} value={btEnable}/>
      <Subtitle title='Devices'/>
      <FlatList
        data={allDevices}
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
