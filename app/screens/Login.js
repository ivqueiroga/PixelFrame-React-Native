import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function Login({ navigation, GlobalState }) {
  const { userName, setUserName, btStat } = GlobalState;
  const [loginEnable, setLoginEnable] = useState(true);

  useEffect(() => {
    setLoginEnable(true);
    if (userName.length >=3) setLoginEnable(false)
  }, [userName])

  return (
    <View style={styles.screen}>
      <Text style={{fontWeight:'bold', fontSize: 20}}>{`Bluetooth is: ${btStat? "Connected":"Disconnected"}`}</Text>
      <View style={styles.horizontContainers}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Bt')}
          style={styles.buttonBt}
        >
          <Text>
            Connect
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBt}>
          <Text style={{fontWeight:'bold',}}>
            Clear Connect
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput 
        style={styles.input}
        onChangeText={setUserName}
        value={userName}
        placeholder="Username"
      />
      <TouchableOpacity 
        style={ 
          !loginEnable
          ? {...styles.button}
          : {...styles.buttonOff}
        }
        onPress={() => navigation.navigate('Home')}
        disabled={loginEnable}
      >
        <Text style={ 
          !loginEnable
          ? {...styles.buttonText}
          : {...styles.buttonTextOff}
        } >Login</Text>
      </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
  screen: {
    flex: 8,
    backgroundColor: '#D9EEF5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
      flex: 1,
      width: '100%',
      backgroundColor: '#D9EEF5'
  },
  input: {
    color: '#00BFFF',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'white',
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    width: '80%',
    margin: 10,
    marginTop: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
},
buttonBt: {
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
button: {
    alignItems: 'center',
    backgroundColor: '#00BFFF',
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
    marginBottom: 30,
    borderRadius: 12,
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
      margin: 10,
      marginBottom: 30,
      borderRadius: 12,
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
  horizontContainers: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  }
})