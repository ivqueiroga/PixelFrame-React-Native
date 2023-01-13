import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList  } from 'react-native';
import { players } from '../helpers/players';

import Header from '../Components/header';
import Footer from '../Components/footer';
import GamePad from '../Components/gamePad';
import Leaderboard from '../Components/Leaderboard';

export default function PixelPebble({ navigation, GlobalState }) {
  const { } = GlobalState;


  const Item = ({name, score}) => (
    <View style={ styles.horizontContainersN}>
      <Text style={{fontWeight:'300'}}>{name}</Text>
      <Text style={{
        justifyContent: 'center',
        alignItens: 'center',
        alignContent: 'center',
        textAlign:'center',
        fontWeight:'300',
        }}>.........................................</Text>
      <Text style={{fontWeight:'300'}}>{score}</Text>
    </View>
  );

  const renderItem = ({item}) => (
    <Item 
    style={{ flex: 1, flexDirection: 'row', margin: 1 }} 
    name={item.name}
    score={item.score}
  />
);

  return (
    <View style={styles.screen}>
      <Header></Header>
      <View style={styles.body}>
        <Text style={styles.menuText}>Pixel Pebble</Text>
          <View style={styles.horizontContainers}>
          <GamePad></GamePad>
          </View>
        <Leaderboard GlobalState={GlobalState} players={players} />
        {/* <View style={styles.leaderboardContainter}>
          <Text style={styles.leaderboard}>Leaderboard</Text>
            <View style={styles.horizontContainersL}>
              <Text style={styles.horizontContainersLText}>Name</Text>
              <Text style={styles.horizontContainersLText}>Score</Text>
            </View>
            <View style={{paddingHorizontal: '10%'}}>
              <FlatList contentContainerStyle={styles.gridBoard}
                data={players}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View>
        </View> */}
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
  leaderboardContainter: {
    marginTop: 10,
    height: '100%',
  },
  horizontContainersL: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: '10%',
  },
  horizontContainersLText: {
    fontWeight: 'bold',
  },
  horizontContainersN: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
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

