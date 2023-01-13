import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity , FlatList, Alert  } from 'react-native';

import Header from '../Components/header';
import Footer from '../Components/footer';
const H = 16;
const W = 16;
const MATRIX = H * W;
let newArr = []

export default function PaintBoard({ navigation, GlobalState }) {
  const { brushColor, setBrushOn, ledArray, setLedArray, reRender, setReRender } = GlobalState;

  useEffect(() => {
    for(let i = 0; i < MATRIX; i++) {
      newArr.push({id: i, hex: 'white'});
    }
    if (reRender === true){
      for(let i = 0; i < MATRIX; i++) {
        newArr.push({id: i, hex: 'white'});
      }
    }
  }, [reRender]);

  const clearBoard = () => {
    Alert.alert('Clearing board!', 'Are you sure you want to clear the board?',[
      {
        text: 'No', onePress: () => console.log('clear aborted')
      }, 
      {text: 'Yes', onPress: () => {setReRender(true)}}
    ])
    setReRender(false);
  }

  const handleBrushColor = () => {
    setBrushOn(true);
    navigation.navigate('ColorPallet');
  }

  const handleClick = (e) => {
    console.log(newArr);
    const { id } = e;
    const newLedArr = newArr;
    newLedArr[id] = {hex: brushColor}; 
    // setLedArray(newLedArray.map((pix, pixIndex) => {
    //     if (pixIndex === id) {
    //       pix.hex = brushColor
    //     }
    //   }));
    // }
    setLedArray([...newLedArr]);
  }

  // const Item = ({title}) => (
  //   // <TouchableOpacity
  //   // onPress={() => handleClick(title)}
  //   // style={{
  //   //     backgroundColor: title.hex, 
  //   //     borderWidth: 1,
  //   //     flexDirection:"row",
  //   //     alignItems:'center',
  //   //     justifyContent:'center',
  //   //   }
  //   //   }>
  //   // </TouchableOpacity>
  // );

  const renderItem = ({item}) => {
    // <Item title={item}
    //   style={{ flex: 1, flexDirection: 'column' }}
    // />
    <TouchableOpacity
    onPress={() => handleClick(item)}
    style={{
        flex: 1, 
        flexDirection: 'column',
        backgroundColor: item.hex, 
        borderWidth: 1,
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'center',
        padding: 1,
      }
      }>
    </TouchableOpacity>
  }

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
          <TouchableOpacity style={styles.clearBtnR }
            onPress={clearBoard}
          >
            <Text style={styles.clearBtn }>Clear Board</Text>
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
    borderWidth: 2,
    borderRadius: 12,
    margin: 10,
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
  clearBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#494949',
    padding: 5,
  },
  clearBtnR: {
    marginLeft: '25%',
    margin: 5,
    borderWidth: 1,
    width: '50%',
    borderRadius: 12,
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
