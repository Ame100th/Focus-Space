import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Signin from "../app/Signin";
import Welcome from '../app/Welcome';
import StudyMethods from './StudyMethods';

const App = () => {
  // State to determine if the user is signed in and manage the username.
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  

  return (
    <View style={styles.container}>
      {isSignedIn ? (
        // <Welcome username={username} setUsername={setUsername} />
        <StudyMethods/>
      ) : (
        <Signin setIsSignedIn={setIsSignedIn} username={username} setUsername={setUsername} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#d8f5f8',
  },
});

export default App;
