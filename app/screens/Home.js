import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../Components/header';
import Footer from '../Components/footer';

export default function Home({ navigation, GlobalState }) {
    const { userName, lampState, setLampState, ledColor, setColor, setBgOrNumber } = GlobalState;
    const [ initColor, setInitColor ] = useState('#ffffff');

    const handleLamp = async () => {
      const pickCol = initColor;
      let lampStatus = lampState;
      lampStatus = !lampState;
      setLampState(lampStatus);
      setColor(pickCol);
      setInitColor(ledColor);
    }

    const handleLedColor = () => {
      setBgOrNumber(true);
      navigation.navigate('ColorPallet');
    }

    return (
        <View style={styles.screen}>
            <Header />
            <View style={styles.body}>
              <Text style={styles.subMenuText} >{userName}</Text>
              <View style={styles.horizontContainers}>
                <Text style={styles.text} >Light Switch:</Text>
                <Icon 
                  style={{
                  margin: 5,
                  height: 50,
                  width: 50,
                  }}
                  name="power-standby"
                  size={50}
                  color={ lampState ? '#00BFFF' : 'black'}
                  onPress={() => handleLamp()}
                />
                <Text style={styles.text} >Color:</Text>
                <TouchableOpacity onPress={() => handleLedColor()} disabled={!lampState}>
                  <View style={styles.pickedColor} backgroundColor={lampState?ledColor:'black'}></View>
                </TouchableOpacity>                
              </View>
              <Text style={styles.subMenuText} >Functions</Text>
              <View style={styles.containers}>
                <TouchableOpacity
                  style={ 
                    lampState
                    ? {...styles.button}
                    : {...styles.buttonOff}
                  }
                  onPress={() => navigation.navigate('Clock')}
                  disabled={!lampState}
                >
                  <Text style={ 
                  lampState
                    ? {...styles.buttonText}
                    : {...styles.buttonTextOff}
                    } 
                    >
                      Clock
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={ 
                    lampState
                    ? {...styles.button}
                    : {...styles.buttonOff}
                  }
                  onPress={() => navigation.navigate('Effects')}
                  disabled={!lampState}
                >
                  <Text style={ 
                  lampState
                    ? {...styles.buttonText}
                    : {...styles.buttonTextOff}
                    } 
                    >
                      Effects
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={ 
                    lampState
                    ? {...styles.button}
                    : {...styles.buttonOff}
                  }
                  onPress={() => navigation.navigate('Emoji')}
                  disabled={!lampState}
                >
                  <Text style={ 
                  lampState
                    ? {...styles.buttonText}
                    : {...styles.buttonTextOff}
                    } 
                    >
                      Emoji
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={ 
                    lampState
                    ? {...styles.button}
                    : {...styles.buttonOff}
                  }
                  onPress={() => navigation.navigate('PaintBoard')}
                  disabled={!lampState}
                >
                  <Text style={ 
                  lampState
                    ? {...styles.buttonText}
                    : {...styles.buttonTextOff}
                    } 
                    >
                      Paint Board
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.subMenuText} >Games</Text>
              <View style={styles.containers}>
                <TouchableOpacity
                    style={ 
                      lampState
                      ? {...styles.button}
                      : {...styles.buttonOff}
                    }
                    onPress={() => navigation.navigate('PythoN')}
                    disabled={!lampState}
                  >
                    <Text style={ 
                    lampState
                      ? {...styles.buttonText}
                      : {...styles.buttonTextOff}
                      } 
                      >
                        PythoN
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={ 
                      lampState
                      ? {...styles.button}
                      : {...styles.buttonOff}
                    }
                    onPress={() => navigation.navigate('PixelPebble')}
                    disabled={!lampState}
                  >
                    <Text style={ 
                    lampState
                      ? {...styles.buttonText}
                      : {...styles.buttonTextOff}
                      } 
                      >
                        PixelPebble
                    </Text>
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
    containers: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#00BFFF',
      padding: 15,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 12,
      margin: 5,
      width: '40%',
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
        fontWeight: '900'
      },
      buttonOff: {
        alignItems: 'center',
        backgroundColor: '#D9EEF5',
        padding: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 12,
        margin: 5,
        width: '40%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        },
        buttonTextOff: {
            color: 'white',
            fontWeight: '900'
        },
    pickedColor: {
      borderRadius: 12,
      margin: 5,
      height: 50,
      width: 50,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
        },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    regularText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#494949',
      padding: 5,
      margin: 5,
      marginLeft: '10%',
    },
    subMenuText: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '700',
      color: '#494949',
      padding: 10,
      margin: 10,
    },
    colorBtn: {
      height: 25,
      width: 25,
      borderRadius: 13,
    },
    text: {
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 16,
      fontWeight: '900',
      color: '#494949',
      padding: 10,
      margin: 10,
      marginLeft: 10,
    },
  horizontContainers: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  }
})