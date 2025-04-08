import React, { useEffect, useState } from "react";
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
import { getUser } from "../lib/supabase_crud";
import { signIn, signUp, signOut } from "../lib/supabase_auth";

const { width } = Dimensions.get("window");

type SignProps = {
  setIsSignedIn: (isSignedIn: boolean) => void;
  username: string;
  setUsername: (username: string) => void;
};

const Signin: React.FC<SignProps> = ({ setIsSignedIn, setUsername }) => {
  const [password, setPassword] = useState<string>("");
  const [userData, setUserData] = useState<any>(null);
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  // Fetch user data on component mount
  // 
  

  // Handles sign in by validating email and password, then routing if successful
  const handleSignin = async () => {
    
    const emailRegex = /^[a-zA-Z0-9_.]+[@]{1}[a-zA-Z0-9_.]+\..{3}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\(\)+_\-=\[\]{};':"\\|,.<>\/?]).+$/;

    // Validate email field
    if (email === "") {
      alert("Email is Invalid");
      return;
    } else if (!emailRegex.test(email)) {
      alert("Email Field Must be an Email");
      return;
    } else if (userData && !userData.some((user: any) => user.email === email)) {
      alert("No user by this email");
      return;
    }

    // Validate password field
    if (password === "") {
      alert("Password is required.");
      return;
    } else if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    } else if (!passwordRegex.test(password)) {
      alert("Password must contain a capital letter, a small letter, a number, and a special character");
      return;
    } else if (userData && !userData.some((user: any) => user.password === password)) {
      alert("Incorrect password");
      return;
    }

     signIn(email, password)
      .then(() => {
        router.push({ pathname: "/StudyMethods", params: { email } });
        setIsSignedIn(true);
        console.log("User signed in successfully");
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      }
      );
  
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={require("../assets/Component2.png")} style={styles.focuslogo} />

        <Text style={styles.signtext}>Sign Into Your Account</Text>
        <View style={styles.textinputview}>
          <Image source={require("../assets/tabler_user.png")} style={styles.uspaicon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.textinputview}>
          <Image source={require("../assets/arcticons_password.png")} style={styles.uspaicon} />
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
              <Text style={{ color: "gray" }}>G</Text>
              <Text style={{ color: "gray" }}>o</Text>
              <Text style={{ color: "gray" }}>o</Text>
              <Text style={{ color: "gray" }}>g</Text>
              <Text style={{ color: "gray" }}>l</Text>
              <Text style={{ color: "gray" }}>e</Text>
            </Text>
            {/* <Text style={styles.googletext}>
              <Text style={{ color: "#4285F4" }}>G</Text>
              <Text style={{ color: "#EA4335" }}>o</Text>
              <Text style={{ color: "#FBBC05" }}>o</Text>
              <Text style={{ color: "#4285F4" }}>g</Text>
              <Text style={{ color: "#34A853" }}>l</Text>
              <Text style={{ color: "#EA4335" }}>e</Text>
            </Text> */}
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => router.push("StudyMethods")}>
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
    marginBottom: width * 0.2,
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
    resizeMode: 'contain',
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
  googletext: {
    textDecorationLine: "line-through",
    fontWeight: "bold",
    marginBottom: 55,
    marginTop: 5,
    fontSize: 30,
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
  signupLink: {
    color: "#19a0ae",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  signupview: {
    margin: 20,
  },
});

export default Signin;
