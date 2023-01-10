import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Separator from './separator';
import PopUp from './deviceManag';

export default function Device(props) {
  const {navigation} = props;
  const PopUpHandler = (props) => {
    <PopUp navigation={navigation} name={props.name}></PopUp>
  };

  return(
    <>
      <TouchableOpacity style={styles.wrapper} onPress={PopUpHandler}>
        <View style={styles.wrapperLeft}>
        <Icon 
          style={styles.iconLeft}
          name="bluetooth-outline"
          size={40}
          color={ '#00BFFF'}
        />
        </View>
        <View style={styles.wrapperName}>
          <Text style={styles.name}>{props.name}</Text>
        </View>
        <Icon style={styles.iconRight}
            name="settings-sharp"
            size={40}
            color="#00BFFF"
        />
      </TouchableOpacity>
      <Separator />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  wrapperLeft:{
    borderRadius: 20,
    borderColor: '#00BFFF',
    borderWidth: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  iconLeft:{
  },
  wrapperName:{
  },
  name:{
    color: '#494949',
  },
  iconRight:{
  },
});
