import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Text, StyleSheet, Alert  } from 'react-native';
import Layout from '../screens/BluetoothListLayout'
import Empty from './empty'
import Toggle from './toggle';
import Subtitle from './subtitle';
import Device from './device';
// import useBle from './useBLE'
const listei = [
  {
    name: 'Device 01',
    id: '01',
  },
  {
    name: 'Device 02',
    id: '02',
  }
];

export default function BluetoothList(props) {
  const {navigation} = props;
  // const { 
  //   requestPermissions,
  //   scanForDevices,
  //   allDevices,
  //   connectToDevice,
  //   connectedDevice,
  //   disconnectFromDevice 
  // } = useBle();

  const [list, setList] = useState([]);
  const [btEnable, setBtEnable] = useState(false);
  const renderEmpty = () =>  <Empty text='No Available Devices'/>
  const renderItem = ({item}) =>  {
    return <Device navigation={navigation} {...item}/>
  }

  // const scanForPeripherals = () => {
  //   requestPermissions(isGranted => {
  //     if (isGranted) {
  //       scanForDevices();
  //     }
  //   });
  // };

  // const openModal = async () => {
  //       scanForDevices()
  //       setList(allDevices);
  // };

    return (
    <Layout title='Bluetooth' navigation={navigation}>
      <Toggle onValueChange={btEnable?setBtEnable(false):"openModal"} value={btEnable}/>
      <Subtitle title='Devices'/>
      <FlatList
        data={listei}
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
