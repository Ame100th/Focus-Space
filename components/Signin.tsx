import React, {useState} from "react";
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, } from "react-native";
import credentials from "../credentials.json";

type signProps = {setIsSignedIn: (isSignedIn: boolean) => void, username: string, setUsername: (username: string) => void};

const Signin: React.FC<signProps> = ({setIsSignedIn, username, setUsername}) => {
    
    const [password, setPassword] = useState<string>("");
    const handleSignin = () => { 
        const lowername = username.toLowerCase().trim();
        const user = credentials.users.find((user) => 
            user.username.toLowerCase() === lowername && user.password === password.trim()
        );

        if (lowername === ""){
            alert("Username is Invalid");
            return;
        }
        else if (lowername.length < 5) {
            alert("Username must be above 5 characters.");
            return;
        }
        
        if (password === "") {
            alert("Password is required.");
            return;
        }
        else if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }
        else if (!/^[A-Z]{1,}/.test(password)) {
            alert("Password must contain at least one uppercase letter.");
            return;
        }
        else if (!/[a-z]/.test(password)){
            alert("Password must contain at least one lowercase letter.");
            return;
        }
        else if(!/[0-9]{1,}/.test(password)){
            alert("Password must contain at least one number.");
            return;
        }
        else if(!/(?=.*[!@#\$%\^&\*\(\)+_\-=\[\]{};':"\\|,.<>\/?])/.test(password)){
            alert("Password must contain at least one special character.");
            return;
        }
        if(user){
            setIsSignedIn(true);
        } else {
            alert("You don't have an account, Please Sign up.");
            return;
        }
    };
    
  return (
    <View style={styles.container}>
        <Image style={styles.imagelogo} source={require('../components/focus_logo.png')}/>
        
        <Text style={styles.signtext}>Sign In To Your Account</Text>
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword}/>
      <TouchableOpacity style={styles.button} onPress={() => handleSignin()}>
        <Text style={styles.signin}>Sign in</Text>
      </TouchableOpacity>
      <Text style={{fontWeight: "bold", marginTop: 100,}}>Don't have an account? Sign up <Text style={{color: "#19a0ae", textDecorationLine: "underline", fontWeight:"bold" }}>Here</Text></Text>
      <TouchableOpacity>
        <Text style={{fontWeight: "bold", textDecorationLine: "underline", marginTop:40}}>Forgot Your Password?</Text>
      </TouchableOpacity>
        <Text style={{fontWeight: "bold", marginTop: 100}}>Need Help? <TouchableOpacity>
        <Text style={{fontWeight: "bold", textDecorationLine: "underline",}}>Contact Us</Text>
      </TouchableOpacity></Text>
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
        width: 310,
        height: 40,
        margin: 3,
        paddingLeft: 10,
    },

    button:{
        backgroundColor: "#19a0ae",
        padding: 12,
        borderRadius: 9,
        width: 300,
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
        marginBottom: 40,
        fontWeight: "bold",
        fontFamily: "arial",
       
    },
    imagelogo:{
        width:200,
        height: 200,
        resizeMode: 'contain',
        opacity: .9,
        
},

});

export default Signin;