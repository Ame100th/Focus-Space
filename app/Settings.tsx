import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import {useFonts} from 'expo-font';

const { width } = Dimensions.get('window');

const Settings: React.FC = () => {
  const router = useRouter();
   useFonts({
      'DynaPuff': require('../assets/fonts/DynaPuff-VariableFont_wdth,wght.ttf')
    });
  
  return (
    <View style={styles.container}>
      {/* Background Images */}
      <Image 
        source={require("../assets/Focus-Space3.png")}
        style={{ position: 'absolute', width: "100%", bottom: width * 1.3 }} 
      /> 
      <Image 
        source={require("../assets/Focus-Space4.png")}
        style={{ position: 'absolute', width: "100%", top: width * 1.3 }} 
      /> 
      
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require("../assets/back.png")} style={styles.notif} />
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        <TouchableOpacity>
          <Text style={styles.textmain}>General preferences</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.textmain}>Notification Preferences</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.textmain}>Theme</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.textmain}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push("Welcome")}>
          <Image source={require("../assets/home.png")} style={styles.notif} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require("../assets/calendar.png")} style={styles.notif} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require("../assets/account.png")} style={styles.notif} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;

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
  // Main Content area style
  mainContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: width * 0.4,
  },
  // Style for main text buttons
  textmain: {
    padding: 10,
    margin: 7,
    // backgroundColor: '#30B0C7',
    backgroundColor: 'gray',
    width: width * 0.5,
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 15,
    fontFamily: 'DynaPuff',
  },
  // Navigation icon style
  notif: {
    width: 30,
    resizeMode: 'contain',
    margin: 10,
  },
});
