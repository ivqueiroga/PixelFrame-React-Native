import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList  } from 'react-native';

export default function Leaderboard({ players, GlobalState }) {
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
    <View style={styles.leaderboardContainter}>
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
        </View>
  );
}

const styles = StyleSheet.create({
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
  leaderboard: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#494949',
  }
})