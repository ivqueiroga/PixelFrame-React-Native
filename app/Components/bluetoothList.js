import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, PermissionsAndroid, NativeModules, NativeEventEmitter, Platform  } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
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

  const renderEmpty = () =>  <Empty text='No Available Devices'/>
  const renderItem = ({item}) =>  {
    return <Device navigation={navigation} {...item}/>
  }

    return (
    <Layout title='Bluetooth' navigation={navigation}>
      <TouchableOpacity onPress={scanForMorePeripherals} style={{marginLeft: '80%'}}>
        <Icon color={'#00BFFF'} name={!displayScanResults?'refresh-circle':'stop-circle'} size={50}/>
      </TouchableOpacity>
      <Toggle value={btEnable}/>
      <Subtitle title='Devices'/>
      <FlatList
        data={displayScanResults?peripheralsDiscovered:null}
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
