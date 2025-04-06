import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, Alert, Text, ActivityIndicator, ScrollView, TextInput, Button, } from 'react-native';
import { useRouter } from 'expo-router';
import {useFonts} from 'expo-font';

const { width } = Dimensions.get('window');
const LAMBDA_ENDPOINT_URL = 'https://ih1rkg927b.execute-api.us-east-2.amazonaws.com/myAppGenerateQuestionsFunction';
const MODEL_NAME = 'gemini-2.5-pro-preview-03-25';

const ActiveRecall: React.FC = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState<string>("");
  const [questionCount, setQuestion] = useState<string>("");
  const [response, setResponse] = useState<string | null>(null)
  const [loading, setisLoading] = useState<boolean>(false);
  const [error, setisError] = useState<string | null>(null);
   useFonts({
      'DynaPuff': require('../assets/fonts/DynaPuff-VariableFont_wdth,wght.ttf')
    });

  const handleApiCall = async () => {

    const topic = prompt.trim();
    if(!topic){
      setisError("Please Enter a topic")
      Alert.alert("Missing Input", "Please enter a topic for the question.")
      return
    }
    if(!questionCount){
      setisError("Please Enter the question amount")
      Alert.alert("Missing Input", "Please Enter the question amount.")
      return
    }

    setisLoading(true);
    setisError(null);
    setResponse(null);
  
  try {
    const requestBody = JSON.stringify({
      prompt: topic,
      questionCount: questionCount
    });

    const lambdaResponse = await fetch(LAMBDA_ENDPOINT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      }, 
      body: requestBody,
    });

    if(!lambdaResponse.ok){
      let errorBody = await lambdaResponse.text();
      try{
        const errorJson = JSON.parse(errorBody);
        errorBody = errorJson.message || errorJson.error || JSON.stringify(errorJson);

      } catch(parseError){
        console.log("Lambda error", errorBody);

      }
      throw new Error(`backend error: ${lambdaResponse.status} - ${errorBody}`);
    }

    const responseData = await lambdaResponse.json();
    if(responseData && responseData.questions){
      setResponse(responseData.questions)
    }else {
      console.warn("Lambda response format unexpected:", responseData);
        throw new Error("Received an unexpected response format from the backend.");
    }

  } catch (error: any){
    setisError(error.message);
  } finally {
    setisLoading(false);
  }
}
  
  return (
    <View style={styles.container}>
      
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require("../assets/back.png")} style={styles.notif} />
        </TouchableOpacity>
      </View>
      <View style={styles.mainContent}>
        <Text style={{fontFamily: 'DynaPuff', fontSize: 15}}>This feature generates questions for you, input the topic and number of questions, it'll provide you with questions ranging from easy to hard.</Text>
      <TextInput style={styles.textinput} value={prompt} onChangeText={setPrompt} placeholder='What subject do you want questions for? ' multiline/>
      <TextInput style={styles.textinput} value={questionCount} onChangeText={setQuestion} placeholder='How many questions would you like? '/>
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
  textinput:{
    borderWidth: .5,
    borderRadius: 5,
    width: width * .6,
    textAlign: 'center'
  },
});
