import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity  } from 'react-native';

import Header from '../Components/header';
import Footer from '../Components/footer';

export default function WIP({ navigation, GlobalState }) {
  const { } = GlobalState;

  return (
    <View style={styles.screen}>
      <Header></Header>
      <View style={styles.body}>
        <Text style={styles.menuText}>WORK IN PROGRESS</Text>
      </View>
      <Footer navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({

});