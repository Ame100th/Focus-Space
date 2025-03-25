import React, { useEffect, useState } from "react";
import Welcome from '../app/Welcome';
import {useRouter} from 'expo-router';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import {getUser, createuser} from "../lib/supabase_crud";

const { width } = Dimensions.get("window");

type signupProps = {
  setIsSignedUp: (isSignedup: boolean) => void;
}


const signup: React.FC<signupProps> = ({ setIsSignedUp}) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUser();
                if (data && typeof data === 'string') {
                    setUsername(data);
                } else {
                    console.error("Invalid user data:", data);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])

const handlesignup = async () => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\(\)+_\-=\[\]{};':"\\|,.<>\/?]).+$/;
    if(username === "" || username.length < 5 ){
        alert("Username must be above 5 characters")
    }
    else if (password === "" || password.length < 8){
      alert("Password must be longer than 8 characters")
    }
    else if(!regex.test(password)){
      alert("incorrect Password");
    }
    else
        try{
          await createuser({username, password});
          setIsSignedUp(true)
      } catch (error) {
          console.error("error creating data for user", error)
      }
};
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require("../assets/Component2.png")}
          style={styles.focuslogo}
        />

        <Text style={styles.signtext}>Sign Into Your Account</Text>
        <View style={styles.textinputview}>
          <Image
            source={require("../assets/tabler_user.png")}
            style={styles.uspaicon}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.textinputview}>
          <Image
            source={require("../assets/arcticons_password.png")}
            style={styles.uspaicon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handlesignup}>
          <Text style={styles.signin}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Not yet implemented, Sorry.")}>
          <Text style={styles.forgotText}>Forgot Your Password?</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#d8f5f8",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: width * 0.1,
    justifyContent: "center",
    marginBottom: width * 0.2
  },
  focuslogo: {
    width: "90%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    marginBottom: 20,
  },
  signtext: {
    fontSize: 30,
    marginBottom: 30,
    fontWeight: "bold",
    fontFamily: "arial",
    textAlign: "center",
  },
  textinputview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    width: "100%",
  },
  uspaicon: {
    width: 18,
    height: 18,
    position: "absolute",
    zIndex: 1,
    left: 10,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 0.6,
    borderColor: "#19a0ae",
    borderRadius: 9,
    width: "100%",
    height: 40,
    paddingLeft: 35,
  },
  button: {
    backgroundColor: "#19a0ae",
    padding: 9,
    borderRadius: 9,
    width: "95%",
    marginTop: 15,
    alignItems: "center",
    borderColor: "black",
    borderWidth: 0.5,
  },

  googleimage:{
      width: 27,
      height: 27,
      position: 'absolute',
      zIndex: 1,
      left: 120,
      top: 22,
  },
  googletext:{
    fontWeight: 'bold',
    marginBottom: 55,
    marginTop: 5,
    fontSize:30,
    borderRadius: 100,
  },


  signin: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  forgotText: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginTop: 20,
  },
  orText: {
    marginTop: 35,
    fontSize: 15,
  },
  googlelogobutton: {
    alignItems: "center",
    
  },
  viewgoogle: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
 
  signupLink: {
    color: "#19a0ae",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  contactcontainer:{
    flexDirection: 'row',
    verticalAlign: 'middle'
    
  },
  contactText: {
    fontWeight: "bold",
    color: '#19a0ae',
    textDecorationLine: "underline",
  },
  signupview:{
    margin: 20,
  },
});

export default signup;
