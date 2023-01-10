import React from "react";
import { View, Text, StyleSheet  } from 'react-native';

export default function Empty(props) {
  return(
    <View>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text:{
    fontSize: 30,
    marginLeft: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignContent: 'center',
  }
});