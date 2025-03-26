import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const Account: React.FC = () => {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      {/* Background images for visual effect */}
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
        <TouchableOpacity>
          {/* Placeholder for potential additional action */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("Settings")}>
          <Image source={require("../assets/settings.png")} style={styles.notif} />
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("Signin")}>
          <Text>Logout</Text>
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

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8f5f8',
  },
  // Shared navigation bar style (used for both top and bottom)
  topBar: {
    width: '100%',
    height: 45,
    backgroundColor: '#4A4E4F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  // Main content area style
  mainContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: width * 0.4,
  },
  // Style for navigation icons
  notif: {
    width: 30,
    resizeMode: 'contain',
    margin: 10,
  },
  // Style for button (logout)
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
});
