import React, {useState} from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, } from "react-native";
import credentials from "../credentials.json";

type signProps = {setIsSignedIn: (isSignedIn: boolean) => void, username: string, setUsername: (username: string) => void};

const Signin: React.FC<signProps> = ({setIsSignedIn, username, setUsername}) => {
    
    const [password, setPassword] = useState<string>("");
    const handleSignin = () => { 
        const lowername = username.toLowerCase();
        const user = credentials.users.find((user) => 
            user.username.toLowerCase() === lowername && user.password === password
        );
        if(user){
            setIsSignedIn(true);
        } else {
            alert("Sign in failed");
        }
    };
    
    
  return (
    <View style={styles.container}>
        <Text style={styles.signtext}>Sign in</Text>
      <TextInput style={styles.input} placeholder="username" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword}/>
      <TouchableOpacity style={styles.button} onPress={() => handleSignin()}>
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
        paddingLeft: 10,
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
        fontSize: 25,
        marginBottom: 20,
        color: "#19a0ae",
        fontWeight: "bold",
       
    }
})

export default Signin;