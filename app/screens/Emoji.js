import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image , FlatList  } from 'react-native';
import { emojiData } from '../helpers/EmojiData';

import Header from '../Components/header';
import Footer from '../Components/footer';

export default function Emoji({ navigation, GlobalState }) {
  const { } = GlobalState;

  const handleClick = ({item}) => {
    console.log(item)
  }

  const Item = ({title}) => (
    <TouchableOpacity
    onPress={() => handleClick(title)}
    style={{
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'center',
        height: 72,
        width: 72,
        margin: 15,
      }
      }>
        <Image
          style={{width: '100%', height: '100%'}}
          resizeMode='cover' 
          source={{uri: title.item.url}} 
        />
    </TouchableOpacity>
  );

  const renderItem = (item) =>( 
    <Item 
      style={{ flex: 1, flexDirection: 'column', margin: 1 }} 
      title={item}
    />
  );

  return (
    <View style={styles.screen}>
      <Header />
        <View style={styles.body}>
          <Text style={styles.menuText}>Emoji</Text>
          <SafeAreaView style={styles.container}>
            <FlatList contentContainerStyle={styles.gridBoard}
              data={emojiData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              numColumns={3}
            />
          </SafeAreaView>
        </View>
        <Footer navigation={navigation} />
    </View>
  );
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
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  gridBoard: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: "column",
    padding: 5,
  },
  menuText: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 45,
    fontWeight: '900',
    color: '#494949',
    paddingTop: 10,
  }
})
