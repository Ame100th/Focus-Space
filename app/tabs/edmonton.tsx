import React from "react";
import { Text, Image, View, StyleSheet, Pressable, Linking } from "react-native";

export default function Edmonton() {
  const handlePress = () => {
      Linking.openURL("https://www.edmonton.ca");};
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Edmonton</Text>
      <Image style={styles.image} source={require('../../components/edmonton.jpg')} />
      <Text>Edmonton is the capital city of Alberta, Canada. It is known for its beautiful river valley, 
          which offers over 160 km of recreational trails, wildlife viewing, and city views. 
          The city is also home to the West Edmonton Mall, the largest shopping mall in North America, 
          which includes over 800 stores, a water park, an amusement park, an ice rink, and more.</Text>
      <Pressable onPress={handlePress}>
              <Text>Go to City Edmonton</Text>
            </Pressable>
    </View>
  );
}

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
    left: 0,}
});