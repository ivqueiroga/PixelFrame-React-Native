import React from "react";
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import BluetoothList from '../Components/bluetoothList' 

export default function Bt({navigation, props}) {
  return (
    <BluetoothList navigation={navigation} title={'Bluetooth'}></BluetoothList>
  );
}

const styles = StyleSheet.create({
  }
);