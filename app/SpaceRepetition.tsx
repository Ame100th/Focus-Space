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

type spaceProps = {
  username: string;
  setUsername: (username: string) => void;
};

const space: React.FC<spaceProps> = ({ username, setUsername }) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
        <Image source={require("../assets/Focus-Space3.png")}
        style={{position: 'absolute', width: "100%", bottom: width * 1.3}} /> 
        <Image source={require("../assets/Focus-Space4.png")}
        style={{position: 'absolute', width: "100%", top: width * 1.3}} /> 
      <View style={styles.topBar}>
        
        <TouchableOpacity onPress={() => router.push("StudyMethods")}>
        <Image source={require("../assets/back.png")}
        style={styles.notif}
        />
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push("Welcome")}>
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

export default space;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8f5f8',
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
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: width * 0.4,
  },

  textmain:{
    padding: 10,
    margin: 7,
    backgroundColor: '#30B0C7',
    width: width * 0.5,
    textAlign: 'center',
    borderRadius: 7,
    fontSize: 15,
    fontWeight: '900'
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
