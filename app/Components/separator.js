import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Separator(props) {
  return(
    <View 
      style={[styles.separator,
      {
        borderColor: props.color? props.color: 'gray'
      }]}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    borderTopWidth: 1,
    marginLeft: 60,
    marginRight: 25,
  }
});