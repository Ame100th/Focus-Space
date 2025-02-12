
import React from "react";
import { Text, Image, View, StyleSheet, Pressable, Linking} from "react-native";

const TabsScreen = () => {
  const handlePress = () => {
    Linking.openURL("https://www.calgary.ca/home.html");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Calgary</Text>
      <Image style={styles.image} source={require('../../components/calgary.jpg')} />
      <Text>Known as the “Gateway to the Rockies,” Calgary hosts the annual Calgary Stampede,
         often called “The Greatest Outdoor Show on Earth.” This world-famous rodeo and festival 
         draws over a million visitors every July and showcases the city’s Western heritage, featuring
          chuckwagon races, barrel racing, a parade, concerts, and more.</Text>
      <Pressable onPress={handlePress}>
        <Text>Go to City Calgary</Text>
      </Pressable>
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    position: 'absolute',
    top: 0,
  },
  image:{
    width:"100%",
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    left: 0,
}, }); ;

export default TabsScreen;