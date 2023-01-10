import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity  } from 'react-native';

import Header from '../Components/header';
import Footer from '../Components/footer';

export default function Effects({ navigation, GlobalState }) {
  const { ledColor, numberColor, setBgOrNumber } = GlobalState;

  const handleBgClick = () => {
    setBgOrNumber(true);
    navigation.navigate('ColorPallet');
  }

  const handleNumberClick = () => {
    setBgOrNumber(false);
    navigation.navigate('ColorPallet');
  }

  return (
    <View style={styles.screen}>
      <Header></Header>
      <View style={styles.body}>
        <Text style={styles.menuText}>Effects</Text>
          <View style={styles.horizontContainers}>
          <Text style={styles.subMenuText}>Background Color</Text>
            <TouchableOpacity 
              style={{...styles.button, backgroundColor:ledColor}}
              onPress={() => handleBgClick()}
            >
            </TouchableOpacity>
          </View>
          <View style={styles.horizontContainers}>
            <Text style={styles.subMenuText}>Effect Color           </Text>
            <TouchableOpacity 
              style={{...styles.button, backgroundColor:numberColor}}
              onPress={() => handleNumberClick()}
            >
            </TouchableOpacity>
          </View>
      </View>
      <Footer navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#D9EEF5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
      flex: 8,
      width: '100%',
      backgroundColor: '#D9EEF5'
  },
  horizontContainers: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  menuText: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 45,
    fontWeight: '900',
    color: '#494949',
    padding: 10,
    margin: 10,
    marginLeft: 10,
  },
  subMenuText: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#494949',
    padding: 10,
    margin: 10,
  },
  regularText: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#494949',
    padding: 10,
    margin: 10,
  },
  button: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: 25,
    width: 50,
    fontSize: 16,
    fontWeight: '700',
    color: '#494949',
    margin: 20,

  }
})
