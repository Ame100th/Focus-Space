import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const Calender: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Background images for visual enhancement */}
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
          {/* Placeholder for any action */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("Settings")}>
          <Image source={require("../assets/settings.png")} style={styles.notif} />
        </TouchableOpacity>
      </View>

      {/* Main Content Area (currently empty) */}
      <View style={styles.mainContent} />

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

export default Calender;

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
});
