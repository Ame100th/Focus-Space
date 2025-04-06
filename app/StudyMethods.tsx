import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import {useFonts} from 'expo-font';

const { width } = Dimensions.get('window');

const StudyMethods: React.FC = () => {
  const router = useRouter();
   const [fontsLoaded, fontError] = useFonts({
      'DynaPuff': require('../assets/fonts/DynaPuff-VariableFont_wdth,wght.ttf')
    });
  
  return (
    <View style={styles.container}>
      {/* Background Images */}
      <Image 
        source={require("../assets/Focus-Space3.png")}
        style={{ position: 'absolute', width: "100%", bottom: width * 1.1 }} 
      /> 
      <Image 
              source={require("../assets/Focus-Spacemoonpng.png")}
              style={{ position: 'absolute', width: "100%", bottom: width * .1, resizeMode: 'contain'}} 
            /> 
      <Image 
        source={require("../assets/Focus-Space4.png")}
        style={{ position: 'absolute', width: "100%", top: width * 1.1 }} 
      /> 
      
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          {/* <Image source={require("../assets/back.png")} style={styles.notif} /> */}
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        <TouchableOpacity onPress={() => router.push("ActiveRecall")}>
          <Text style={styles.textmain}>Active Recall</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("Pomodoro")}>
          <Text style={styles.textmain}>Pomodoro</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("SpaceRepetition")}>
          <Text style={styles.textmain}>Space Repetition</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.textmain1}>Teach/Explain</Text>
        </TouchableOpacity>
      </View>
      
      {/* Bottom Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push("StudyMethods")}>
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

export default StudyMethods;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8f5f8',
    justifyContent: 'center',
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
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    top: width * 0.5,
  },
  // Style for grid buttons in main content
  textmain: {
    padding: 10,
    margin: 15,
    backgroundColor: '#30B0C7',
    width: width * 0.3,
    height: width * 0.3,
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    textAlignVertical: 'center',
    fontFamily: 'DynaPuff'
  },
  textmain1: {
    padding: 10,
    margin: 15,
    backgroundColor: 'gray',
    width: width * 0.3,
    height: width * 0.3,
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    textAlignVertical: 'center',
    fontFamily: 'DynaPuff'
  },
  // Navigation icon style
  notif: {
    width: 30,
    resizeMode: 'contain',
    margin: 10,
  },
});
