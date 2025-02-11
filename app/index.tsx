import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Signin from '../components/Signin';
import { Image } from 'react-native';

const App = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.signtext}>Focus Space</Text>
            <Image style={styles.image}
            source={require('../components/Focus-Space.png')}
            />
            <Signin />
        </View>
    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#d8f5f8'
    },
    image:{
        width:200,
        height: 200,
        resizeMode: 'contain',
        opacity: .8,
    },
    signtext:{
        fontSize: 30,
        color: "#19a0ae",
        fontWeight: "bold",
        padding: 30,
    }

});


export default App;