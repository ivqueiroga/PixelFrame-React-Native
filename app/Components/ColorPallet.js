import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';

import Header from './header';
import Footer from './footer';
let color = '#ffffff';

export default function ColorPallet ({ navigation, GlobalState }) {
  const { ledColor, numberColor, brushColor, setColor, bgOrNumber, setNumberColor, setBrushColor, brushOn, setBrushOn, } = GlobalState;
  // const [color, setPickerColor] = useState('#ffffff');

  useEffect(() => {
    if (brushOn) {
      color = brushColor;
    } else if (bgOrNumber) {
      color = ledColor;
    } else {
      color = numberColor;
    }
  },[]);

  const onColorChange = (e) => {
    if (brushOn) {
      setBrushColor(e);
      setBrushOn(false);
      
    } else if (bgOrNumber) {
      setColor(e);
    } else {
      setNumberColor(e);
    }
  }

  const setColorHandle = () => {
    if (brushOn) {
      setBrushOn(false);
    }
    navigation.goBack()
  }

  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.body}>
        <SafeAreaView style={styles.container}>
          <View style={styles.colorPickerContainer}>
              <ColorPicker
                color={color}
                // onColorChange={(color) => onColorChange(color)}
                onColorChangeComplete={(color) => onColorChange(color)}
                // onInteractionStart= {color => alert(`Start ${color}`)}
                thumbSize={30}
                sliderSize={30}
                noSnap={true}
                row={false}
                swatches={false}
              />
          </View>
          <TouchableOpacity
            onPress={(color) => setColorHandle(color)}
            style={styles.button}>
            <Text style={styles.buttonText}>Set Color</Text>
          </TouchableOpacity>
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
    alignItems: 'center',
  },
    colorPickerContainer: {
    backgroundColor: 'white',
    width: '80%',
    height: '80%',
    borderColor: 'black',
    borderRadius: 12,
    padding: 10,
    marginTop: '10%',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00BFFF',
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 20,
    borderRadius: 12,
    width: '80%',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    },
  buttonText: {
      color: 'white',
      fontWeight: '900',
      fontSize: 18,
    },
});
