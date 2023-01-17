import React, { useState, useEffect, useCallback } from 'react';
import { PermissionsAndroid, Platform } from "react-native";
import { BleError, BleManager, Characteristic, Device } from "react-native-ble-plx";
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';

import {atob, btoa} from 'react-native-quick-base64';

const SERVICE_UUID = "13e0ba4e-9678-11ed-a1eb-0242ac120002";
const CHARACTERISTIC_UUID = "311ffe9e-9678-11ed-a1eb-0242ac120002";

const bleManager = new BleManager();

export default function useBLE() {
  const [connectedDevice, setConnectedDevice] = useState([]);
  const [allDevices, setAllDevices] = useState([]);

  const requestPermissions = async (cb) =>{
    if(Platform.OS === "android")	{
      const apiLevel = await DeviceInfo.getApiLevel();
      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Bluetooth Low Energy requires Location',
            buttonNeutral: 'Ask Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        cb(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        const result = await requestMultiple([
          PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ]);

        const isGranted =
          result['android.permission.BLUETOOTH_CONNECT'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.ACCESS_FINE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED;

        cb(isGranted);
      }
    } else {
      cb(true);
    }
  };

  const isDuplicateDevice = (devices, nextDevices) => 
    devices.findIndex(device => nextDevices.id === device.id) > -1;

  const scanForDevices = () => {
    bleManager.startDeviceScan((error, device) => {
      if(error) {
        console.log(error);
      }
      if (device){
        setAllDevices((prevState) => {
          if(!isDuplicateDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        })
      }
    });
  }

  const connectToDevice = async (device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setConnectedDevice(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();
      startStreamingData(deviceConnection);
    } catch (e) {
      console.log('FAILED TO CONNECT', e);
    }
  };

  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
    }
  };

  return {
    requestPermissions,
    scanForDevices,
    allDevices,
    connectToDevice, 
    connectedDevice, 
    disconnectFromDevice,
  };
}