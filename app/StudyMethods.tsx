import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

type StudyMethodsProps = {
  username: string;
  setUsername: (username: string) => void;
};

const StudyMethods: React.FC<StudyMethodsProps> = ({ username, setUsername }) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
        <Image source={require("../assets/Focus-Space3.png")}
        style={{position: 'absolute', width: "100%", bottom: width * .9}} /> 
        <Image source={require("../assets/Focus-Space4.png")}
        style={{position: 'absolute', width: "100%", top: width * .9}} /> 
      <View style={styles.topBar}>
        
        <TouchableOpacity onPress={() => router.push("Welcome")}>
        <Image source={require("../assets/back.png")}
        style={styles.notif}
        />
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        <TouchableOpacity>
        <Text style={styles.textmain}>Active Recall</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Text style={styles.textmain}>Pomodoro</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Text style={styles.textmain}>Space Repetition</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Text style={styles.textmain}>Teach/Explain</Text>
        </TouchableOpacity>
      </View>
      

      {/* Bottom Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity>
        <Image source={require("../assets/home.png")}
            style={styles.notif}
            />
        </TouchableOpacity>
        <TouchableOpacity>
        <Image source={require("../assets/calendar.png")}
            style={styles.notif}
            />
        </TouchableOpacity>
        <TouchableOpacity>
        <Image source={require("../assets/account.png")}
            style={styles.notif}
            />
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
  // Top Navigation Bar
  topBar: {
    width: '100%',
    height: 45,
    backgroundColor: '#4A4E4F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  // Bottom Navigation Bar
  bottomBar: {
    width: '100%',
    height: 60,
    backgroundColor: '#4A4E4F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // Nav Items (e.g., placeholders for icons/text)
  navItem: {
    padding: 10,
  },
  navText: {
    color: '#ffffff',
    fontSize: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Main Content
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    top: width * .5
  },

  textmain:{
    padding: 10,
    margin: 15,
    backgroundColor: '#30B0C7',
    width: width * 0.3,
    height: width * 0.3,
    textAlign: 'center',
    borderRadius: 7,
    fontSize: 16,
    fontWeight: '900',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    textAlignVertical: 'center',
  },
  contentText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  notif: {
    width: 33,
    resizeMode: 'contain',
    margin: 10
  },
});
