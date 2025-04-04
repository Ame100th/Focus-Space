import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getUser } from "../lib/supabase_crud";
import {useFonts} from 'expo-font';

const { width } = Dimensions.get('window');

type WelcomeProps = {
  username: string;
  setUsername: (username: string) => void;
};

const Welcome: React.FC<WelcomeProps> = () => {
  const { email } = useLocalSearchParams();
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();
   useFonts({
    'DynaPuff': require('../assets/fonts/DynaPuff-VariableFont_wdth,wght.ttf')
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUser();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Images */}
      <Image 
        source={require("../assets/Focus-Space3.png")}
        style={{ position: 'absolute', width: "100%", bottom: width * 0.9 }} 
      /> 
      <Image 
        source={require("../assets/Focus-Spacemoonpng.png")}
        style={{ position: 'absolute', width: "100%", bottom: width * .1, resizeMode: 'contain'}} 
      /> 
      <Image 
        source={require("../assets/Focus-Space4.png")}
        style={{ position: 'absolute', width: "100%", top: width * 0.9 }} 
      /> 
      
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Image source={require("../assets/notifications.png")} style={styles.notif} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("Settings")}>
          <Image source={require("../assets/settings.png")} style={styles.notif} />
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {userData && userData.some((user: any) => user.email === email) && (
          <Text style={styles.welcometext}>
            Welcome {userData.find((user: any) => user.email === email).firstname}{" "}
            {userData.find((user: any) => user.email === email).lastname}
          </Text>
        )}
        <TouchableOpacity onPress={() => router.push("StudyMethods")}>
          <Text style={styles.textmain}>Study Methods</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("Studyplan")}>
          <Text style={styles.textmain}>Study Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("Tasks&Notes")}>
          <Text style={styles.textmain}>Tasks & Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("Progress")}>
          <Text style={styles.textmain}>Progress</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Image source={require("../assets/home.png")} style={styles.notif} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("calender")}>
          <Image source={require("../assets/calendar.png")} style={styles.notif} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("account")}>
          <Image source={require("../assets/account.png")} style={styles.notif} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8f5f8',
  },
  // Navigation Bar style (used for both top and bottom)
  topBar: {
    width: '100%',
    height: 45,
    backgroundColor: '#4A4E4F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  welcometext:{
    fontSize: 25,
    bottom: width * 0.2,
    fontFamily: 'DynaPuff',
  },
  // Main Content area style
  mainContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Style for main buttons
  textmain: {
    padding: 10,
    margin: 7,
    backgroundColor: '#30B0C7',
    width: width * 0.7,
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 15,
    fontFamily: 'DynaPuff'
  },
  // Navigation icon style
  notif: {
    width: 30,
    resizeMode: 'contain',
    margin: 10,
  },
});
