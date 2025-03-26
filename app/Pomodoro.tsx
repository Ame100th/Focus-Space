import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const Pomodoro = () => {
  const router = useRouter();
  const [count, setCount] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() =>{
    if(!isPlaying) return;

    const interval = setInterval(() => {
      setCount(prevCount => prevCount - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleplay = () => {
    setIsPlaying(prevState => !prevState);
  }

  return (
    <View style={styles.container}>
      {/* Background images */}
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
        <TouchableOpacity onPress={() => router.push("StudyMethods")}>
          <Image source={require("../assets/back.png")} style={styles.notif} />
        </TouchableOpacity>
      </View>

      {/* Main Content Area (currently empty) */}
      <View style={styles.mainContent}>
        <Text style={styles.count}>{count}</Text>
      </View>
      <Button title="play" onPress={handleplay}></Button>

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

export default Pomodoro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8f5f8',
  },
  // Shared navigation bar style
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
    width: 33,
    resizeMode: 'contain',
    margin: 10,
  },
  count: {
    fontSize: 60,
  },
});
