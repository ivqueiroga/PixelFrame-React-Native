import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../helpers/ColorData';

import Header from './header';
import Footer from './footer';

export default function ColorPallet ({ navigation, GlobalState }) {
  const { setColor, bgOrNumber, setNumberColor, setBrushColor, brushOn, setBrushOn, } = GlobalState;

  const handleClick = (e) => {
    if (brushOn) {
      setBrushColor(e);
      setBrushOn(false);
    } else if (bgOrNumber) {
      setColor(e);
    } else {
      setNumberColor(e);
    }
    navigation.goBack();
  }

  const Item = ({ hex }) => (
    <TouchableOpacity 
    onPress={() => handleClick(hex)}
    style={{
        backgroundColor: hex,
        height: 60,
        width: '20%',}
      }>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item 
      style={{ flexDirection: 'column' }} 
      hex={item.hex}
    />
  );

  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.body}>
        <SafeAreaView style={styles.container}>
          <FlatList contentContainerStyle={styles.gridBoard}
            data={Colors}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={5}
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
    borderColor: 'black',
  },
    gridBoard: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: "column",
    padding: 5,
  },
});
