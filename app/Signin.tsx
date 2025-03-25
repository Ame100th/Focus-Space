import React, { useEffect, useState, } from "react";
import { useRouter } from "expo-router";
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
import {getUser} from "../lib/supabase_crud";

const { width } = Dimensions.get("window");

type SignProps = {
  setIsSignedIn: (isSignedIn: boolean) => void;
  username: string;
  setUsername: (username: string) => void;
};

const Signin: React.FC<SignProps> = ({ setIsSignedIn, username, setUsername }) => {
  const [password, setPassword] = useState<string>("");
  const [userData, setuserData] = useState<any>(null);
  const [email, setEmail] = useState<string>("");
  const [loading, setloading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUser();
        setuserData(data);
      } catch (error) {
        console.error("error fetching data", error);
      } finally {
        setloading(false);
      }
    };
    fetchData();
  }, []);

  

  const handleSignin = () => {
      
    const email_regex = /^[a-zA-Z0-9_.]+[@]{1}[a-zA-Z0-9_.]+\..{3}$/;
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\(\)+_\-=\[\]{};':"\\|,.<>\/?]).+$/;

    if (email === "") {
      alert("Email is Invalid");
      return;
    } else if (email.length < 5) {
      alert("Email must be above 5 characters.");
      return;
    } else if (!email_regex.test(email)) {
      alert("Email Field Must be an Email");
      return;
    } else if (userData && !userData.some((user: any) => user.email === email)) {
      alert("No user by this email");
      return;
    }

    if (password === "") {
      alert("Password is required.");
      return;
    } else if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    } else if (!regex.test(password)) {
      alert("Password must contain a Capital letter, a Small letter, a number and special character");
      return;
    }
      else if (userData && !userData.some((user: any) => user.password === password)){
        alert("Incorrect password");
        return
      }
    
    if (userData) {
      setIsSignedIn(true);
    } else {
      alert("Invalid username or password.");
      return;
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
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
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
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignin}>
          <Text style={styles.signin}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Not yet implemented, Sorry.")}>
          <Text style={styles.forgotText}>Forgot Your Password?</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>Or sign in with</Text>
        <View>
          <TouchableOpacity>
            <Text style={styles.googletext}>
              <Text style={{ color: "#4285F4" }}>G</Text>
              <Text style={{ color: "#EA4335" }}>o</Text>
              <Text style={{ color: "#FBBC05" }}>o</Text>
              <Text style={{ color: "#4285F4" }}>g</Text>
              <Text style={{ color: "#34A853" }}>l</Text>
              <Text style={{ color: "#EA4335" }}>e</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.signupLink}> Continue as a guest</Text>
        </TouchableOpacity>
        <Text style={styles.signupview}>
          Don't have an account? Sign up{" "}
          <TouchableOpacity onPress={() => router.push("signup")}>
          <Text style={styles.signupLink}>Here</Text>
          </TouchableOpacity>
        </Text>
       
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
  // googlebutton:{
  //   borderRadius: 25,
  //   width: 100,
  //   alignItems: 'center',
  //   padding: 12,
  //   borderColor: "black",
  //   borderWidth: .5,
  //   marginBottom: 55,
  //   marginTop: 15,
  // },
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

export default Signin;
function fetchData() {
  throw new Error("Function not implemented.");
}

