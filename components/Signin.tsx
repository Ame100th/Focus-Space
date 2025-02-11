import React from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Touchable } from "react-native";

const Signin = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.signin}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        margin: 50,
        alignItems: "center",
        backgroundColor: '#d8f5f8'
    },

    input:{
        borderWidth: .6,
        borderColor: "#19a0ae",
        borderRadius: 9,
        width: 200,
        height: 40,
        margin: 3,
    },

    button:{
        backgroundColor: "#19a0ae",
        padding: 12,
        borderRadius: 9,
        width: 100,
        marginTop: 15,
        alignItems: "center",
        
    },

    signin:{
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    signtext:{
        fontSize: 30,
        marginBottom: 20,
       
    }
})

export default Signin;