import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

export default function Device(props) {
  const {navigation} = props;
  const PopUpHandler = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView>
      <View
          style={styles.modalContainer}
          animationType="slide"
          transparent={false}
          visible={modalVis}
        >
          <Text>
            Connect to device?
          </Text>
          <View style={styles.horizontContainers}>
            <TouchableOpacity style={styles.buttonBt} onPress={PopUpHandler}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonBt} onPress={PopUpHandler}>
              <Text>Connect</Text>
            </TouchableOpacity>
          </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    width: '60%',
    height: '50%',
  },
  horizontContainers: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonBt: {
    alignItems: 'center',
    backgroundColor: '#00BFFF',
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 12,
    margin: 5,
    width: '40%',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    },
});