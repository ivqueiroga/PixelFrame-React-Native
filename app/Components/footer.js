import { StyleSheet, View } from "react-native";

import Icon from 'react-native-vector-icons/Ionicons';

export default function Footer({ navigation }) {

    return (
        <View style={styles.footer}>
            <Icon 
                name="md-chevron-back-outline"
                size={30}
                color="#00BFFF"
                onPress={() => navigation.goBack()}
            />
            <Icon 
                name={"home-sharp"}
                size={30}
                color="#00BFFF"
                onPress={() => navigation.navigate('Home')}
            />
            <Icon 
                name={"settings-sharp"}
                size={30}
                color="#00BFFF"
                onPress={() => navigation.navigate('Config')}
            />
        </View>
        
    )
}

const styles = StyleSheet.create({
    footer: {

        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#494949',
        elevation: 10,
        zIndex: 10,
        borderTopWidth: 1,
        borderTopColor: '#14141410'
    },
})