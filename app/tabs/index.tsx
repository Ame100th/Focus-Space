
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