import React, { useEffect, useState } from "react";
import { useRouter } from 'expo-router';
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
import { getUser, createuser } from "../lib/supabase_crud";

const { width } = Dimensions.get("window");

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userData, setUserData] = useState<any>(null);

  const router = useRouter();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUser();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUserData();
  }, []);

  // Handles user signup by validating input and creating a new user
  const handleSignup = async () => {
    const emailRegex = /^[a-zA-Z0-9_.]+[@]{1}[a-zA-Z0-9_.]+\..{3}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\(\)+_\-=\[\]{};':"\\|,.<>\/?]).+$/;

    if (email === "") {
      alert("Email is Invalid");
      return;
    } else if (!emailRegex.test(email)) {
      alert("Email Field Must be an Email");
      return;
    } else if (userData && userData.some((user: any) => user.email === email)) {
      alert("Email already exists");
      return;
    } else if (password === "") {
      alert("Password is required.");
      return;
    } else if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    } else if (!passwordRegex.test(password)) {
      alert("Password must contain a capital letter, a small letter, a number, and a special character");
      return;
    } else if (!firstname || !lastname) {
      alert("Name Fields Must be Filled");
      return;
    }
    
    try {
      await createuser({ firstname, lastname, email, password });
      router.push({ pathname: "Welcome", params: { email } });
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={require("../assets/Component2.png")} style={styles.focuslogo} />
        <Text style={styles.signtext}>Sign Up</Text>
        <View style={{ flexDirection: 'row', gap: width * 0.01 }}>
          <View style={styles.textinputviewname}>
            <Image source={require("../assets/name.png")} style={styles.uspaicon} />
            <TextInput
              style={styles.input}
              placeholder="First name"
              value={firstname}
              onChangeText={setFirstname}
            />
          </View>
          <View style={styles.textinputviewname}>
            <Image source={require("../assets/name.png")} style={styles.uspaicon} />
            <TextInput
              style={styles.input}
              placeholder="Last name"
              value={lastname}
              onChangeText={setLastname}
            />
          </View>
        </View>
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
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
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
  textinputviewname: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
    width: "49%",
  },
  uspaicon: {
    width: 18,
    height: 18,
    position: "absolute",
    zIndex: 1,
    left: 10,
    resizeMode: 'contain'
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

export default Signup;
