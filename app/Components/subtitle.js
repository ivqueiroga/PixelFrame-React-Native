import React from "react";
import { View, Text, StyleSheet } from 'react-native';

export default function Subtitle(props) {
  return(
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.line}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVerticalAlignment: 15,
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'regular',
    color: 'gray',
  },
  line: {
    borderBottomWidth: 1,
    marginLeft: 5,
    flex: 1,
    marginTop: 3,
    borderColor: "#eceff1"
  }
});