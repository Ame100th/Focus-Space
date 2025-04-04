import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, Text, ActivityIndicator, ScrollView, TextInput, Button, } from 'react-native';
import { useRouter } from 'expo-router';
import {GoogleGenerativeAI,} from '@google/generative-ai';
import {useFonts} from 'expo-font';

const { width } = Dimensions.get('window');
const API_KEY = '';
const MODEL_NAME = 'gemini-2.0-flash';

const ActiveRecall: React.FC = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState<string>();
  const [response, setResponse] = useState<string | null>(null)
  const [loading, setisLoading] = useState<boolean>(false);
  const [error, setisError] = useState<string | null>(null);
   useFonts({
      'DynaPuff': require('../assets/fonts/DynaPuff-VariableFont_wdth,wght.ttf')
    });

  const handleApiCall = async () => {
    setisLoading(true);
    setisError(null);
    setResponse(null);
  
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({model: MODEL_NAME});

    const result = await model.generateContent(`Randomly generate 10 questions ranging from easy to hard about ${prompt}(don't include anything except the questions and add an extra space after every question)`);
    const response = result.response;
    const text = response.text();
    setResponse(text);

  } catch (error: any){
    setisError(error.message);
  } finally {
    setisLoading(false);
  }
}
  
  return (
    <View style={styles.container}>
      {/* Background Images with absolute positioning */}
      
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require("../assets/back.png")} style={styles.notif} />
        </TouchableOpacity>
      </View>
      <View style={styles.mainContent}>
        <Text style={{fontFamily: 'DynaPuff', fontSize: 15}}>This feature generates 10 questions for you, input the topic and you'll see questions ranging from easy to hard.</Text>
      <TextInput style={{borderWidth: .5, borderRadius: 5}} value={prompt} onChangeText={setPrompt} placeholder='What subject do you want questions for? ' multiline/>
      {loading && <ActivityIndicator size='large' color="#30B0C7"/>}
      <TouchableOpacity style={{padding: 10, backgroundColor: '#30B0C7', borderRadius: 5}} onPress={(handleApiCall)} disabled={loading} >
        <Text style={{color: 'white'}}>Generate</Text>
      </TouchableOpacity>
      {response && !loading && (
        <ScrollView>
          <Text style={{fontSize: 20}}>{response}</Text>
        </ScrollView>
      )}
      </View>
      
      {/* Main Content Area (currently empty) */}
     

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

export default ActiveRecall;

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
    gap: 15,
  },
  // Style for navigation icons
  notif: {
    width: 33,
    resizeMode: 'contain',
    margin: 10,
  },
});
