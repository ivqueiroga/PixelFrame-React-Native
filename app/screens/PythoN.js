import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity  } from 'react-native';
import { players } from '../helpers/players';
import Leaderboard from '../Components/Leaderboard';

import Header from '../Components/header';
import Footer from '../Components/footer';
import GamePad from '../Components/gamePad';

export default function PythoN({ navigation, GlobalState }) {
  const { } = GlobalState;

  return (
    <View style={styles.screen}>
      <Header></Header>
      <View style={styles.body}>
        <Text style={styles.menuText}>PythoN</Text>
          <View style={styles.horizontContainers}>
          <GamePad ></GamePad>
          </View>
          <Leaderboard GlobalState={GlobalState} players={players} />
      </View>
      <Footer navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#D9EEF5',
  },
  body: {
    flex: 8,
    width: '100%',
    backgroundColor: '#D9EEF5',
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
  leaderboard: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#494949',
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