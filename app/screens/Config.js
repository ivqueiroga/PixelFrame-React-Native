import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../Components/header';
import Footer from '../Components/footer';

export default function Config({ navigation, GlobalState }) {
  const { userName } = GlobalState;

  return (
    <View style={styles.screen}>
      <Header></Header>
      <View style={styles.body}>
        <Text style={styles.menuText}>Config</Text>
        <View style={styles.horizontContainers}>
          <Text style={styles.subMenuText} >User: </Text>
          <Text style={styles.subMenuText} >{userName}</Text>
        </View>
        <View style={styles.horizontContainers}>
          <Text style={styles.subMenuText}>Bluetooth Status </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Bt')}>
            <Icon 
                    style={{
                    margin: 5,
                    height: 50,
                    width: 50,
                    }}
                    name="bluetooth"
                    size={50}
                    color={ '#00BFFF'}
                  />
          </TouchableOpacity>
        </View>
        <View style={styles.horizontContainers}>
          <Text style={styles.subMenuText}>Bluetooth Conection:  </Text>
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
  }
})

