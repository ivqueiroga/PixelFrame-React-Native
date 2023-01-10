import { StyleSheet, View, Text } from "react-native";

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>PIXEL FRAME</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#494949',
        elevation: 10,
        zIndex: 10
    },
    text: {
        fontSize: 20,
        fontWeight: '900',
        color: '#00BFFF'
    }
})