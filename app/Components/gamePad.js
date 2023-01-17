import { SafeAreaView, StyleSheet, View, TouchableOpacity, Linking } from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ColorPallet ({navigation,  GlobalState }) {

  const onPress = async () => {

  }

  const offPress = () => {
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gamepad}>
        <TouchableOpacity style={styles.actionBtn}>
        <Icon 
                  type="MaterialCommunityIcons"
                  style={{
                  margin: 5,
                  height: 50,
                  width: 50,
                  }}
                  name="arrow-up-bold-circle"
                  size={50}
                  color={'#00BFFF'}
                />
        </TouchableOpacity>
        <View style={styles.horizontContainers}>
          <TouchableOpacity style={styles.actionBtn}>
          <Icon 
                  style={{
                  margin: 5,
                  height: 50,
                  width: 50,
                  }}
                  name="arrow-left-bold-circle"
                  size={50}
                  color={'#00BFFF'}
                />
          </TouchableOpacity>
          <TouchableOpacity
          onPressIn={onPress}
          onPressOut={offPress}
          style={styles.actionBtn}>
          <Icon 
                  style={{
                  margin: 5,
                  height: 50,
                  width: 50,
                  }}
                  name="checkbox-blank-circle"
                  size={50}
                  color={'#00BFFF'}
                />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
          <Icon 
                  style={{
                  margin: 5,
                  height: 50,
                  width: 50,
                  }}
                  name="arrow-right-bold-circle"
                  size={50}
                  color={'#00BFFF'}
                />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.actionBtn}>
        <Icon 
                  style={{
                  margin: 5,
                  height: 50,
                  width: 50,
                  }}
                  name="arrow-down-bold-circle"
                  size={50}
                  color={'#00BFFF'}
                />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  gamepad: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 500,
    width: '70%',
    shadowColor: "white",
    shadowOpacity: 0.5,
    elevation: 2,
  },
  horizontContainers: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  actionBtn: {
    padding: 10,
  }
});