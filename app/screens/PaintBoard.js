import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity , FlatList  } from 'react-native';

import Header from '../Components/header';
import Footer from '../Components/footer';
const H = 16;
const W = 16;
const MATRIX = H * W;

export default function PaintBoard({ navigation, GlobalState }) {
  const { brushColor, setBrushOn, ledArray, setLedArray, reRender, setReRender } = GlobalState;

  useEffect(() => {
    const currentArray = [];
    if (reRender === true) {
      for(let i = 0; i < MATRIX; i++) {
        currentArray[i] = {id: i, hex: 'white'};
        setLedArray(currentArray);
      }
      setReRender(false);
    }
  }, [reRender, brushColor]);

  const clearBoard = () => {
    setReRender(true);
  }

  const handleBrushColor = () => {
    setBrushOn(true);
    navigation.navigate('ColorPallet');
  }

  const handleClick = (e) => {
    const { id } = e;
    const newLedArray = ledArray;
    newLedArray[id] = {hex: brushColor}
    setLedArray([...newLedArray]);
  };

  const Item = ({title}) => (
    <TouchableOpacity
    onPress={() => handleClick(title)}
    style={{
        backgroundColor: title.hex, 
        borderWidth: 1,
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'center',
        padding: 10,
      }
      }>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => (
    <Item title={item}
      style={{ flex: 1, flexDirection: 'column', margin: 1 }}
    />
  );

  return (
    <View style={styles.screen}>
      <Header />
        <View style={styles.body}>
          <Text style={styles.menuText}>Pixel Board</Text>
          < View style={styles.horizontContainers}>
            <Text style={styles.subMenuText}>Brush Color</Text>
            <TouchableOpacity
              onPress={handleBrushColor}
            >
                  <View style={styles.pickedColor} backgroundColor={brushColor}></View>
            </TouchableOpacity> 
          </View>
          <TouchableOpacity
            onPress={clearBoard}
          >
            <Text style={styles.subMenuText}>Clear Board</Text>
          </TouchableOpacity>
          <SafeAreaView style={styles.container}>
            <FlatList contentContainerStyle={styles.gridBoard}
              data={ledArray}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={W}
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
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    flexDirection: "column",
    marginBottom: 1,
    padding: 15,
    borderColor: 'black',
    borderWidth: 5,
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
    padding: 5,
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
  pickedColor: {
    height: 30,
    width: 30,
    marginLeft: 10,
    borderRadius: 15,
  },
})
