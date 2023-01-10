import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet
} from 'react-native';

import Header from '../Components/header';
import Footer from '../Components/footer';

export default function BluetoothListLayout(props) {
  const {navigation} = props;
  return(
    <SafeAreaView style={styles.screen}>
      <Header/>
      <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
        {props.children}
      </View>
      <Footer navigation={navigation}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#D9EEF5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container:{
    width: '100%',
    height: '80%',  
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: '#D9EEF5',
  },
  title: {
    marginLeft: 10,
    fontSize: 30,
    fontWeight: 'bold',
  }
});
