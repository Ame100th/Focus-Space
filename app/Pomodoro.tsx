import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, Text } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

class Count extends React.Component<{ count: number, minutes: number }> {
  render() {
    return (
      <Text style={styles.count}>{this.props.minutes.toString().padStart(2,'0')}:{this.props.count.toString().padStart(2,'0')}</Text>
    );
  }
}

const Pomodoro = () => {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [count, setCount] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(25);
  const [isbreak, setIsbreak] = useState<boolean>(false);
  const [sessionTime, setSessionTime] = useState<number>(0);


  useEffect(() =>{
    if(!isPlaying) return;

    const interval = setInterval(() => {
      setCount(prevCount => {
      if (prevCount === 0) {
        if (minutes > 0) {
        setMinutes(prevMinutes => prevMinutes - 1);
        return 59; // Reset seconds to 59 when a minute is deducted
        } else {
            if(!isbreak){
              const breakDuration = sessionTime === 25 ? 5: (sessionTime === 50 ? 10 : 5);  
              if(breakDuration > 0){
              setMinutes(breakDuration);
              setIsbreak(true);
              return 0
            }else{
              setIsPlaying(false);
              clearInterval(interval);
              return 0;
            }
            } 
            else{
              setMinutes(sessionTime);
              setIsbreak(false);

              return 0;
            }
        }
      }
      return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, minutes, count, isbreak, sessionTime]);


  const handleplay = () => {
    setIsPlaying(true);
  }
  const handelstop = () =>{
    setIsPlaying(false)
  }
  const handle25 = () =>{
    setCount(0);
    setMinutes(25);
    setIsPlaying(false);
    setSessionTime(25);
    setIsbreak(false)
  }
  const handle50 = () =>{
    setCount(0);
    setMinutes(50);
    setIsPlaying(false);
    setSessionTime(50);
    setIsbreak(false);
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
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require("../assets/back.png")} style={styles.notif} />
        </TouchableOpacity>
      </View>

      {/* Main Content Area (currently empty) */}
      <View style={styles.mainContent}>
        <Count count={count} minutes={minutes} />
      </View>
      <View style={styles.timescontainer}>
        <TouchableOpacity onPress={handle25}>
          <Image style={styles.times} source={require("../assets/25.png")}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={handle50}>
          <Image style={styles.times} source={require("../assets/50.png")}/>
        </TouchableOpacity>
      </View>
      <View style={styles.playandstopbutton}>
      <TouchableOpacity style={styles.playstop} onPress={handleplay}>
        <Image style={styles.playstopimg} source={require("../assets/play.png")}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.playstop} onPress={handelstop}>
        <Image style={styles.playstopimg} source={require("../assets/stop.png")}/>
      </TouchableOpacity>
      </View>

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
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: width * 0.3,
  },
  // Style for navigation icons
  notif: {
    width: 33,
    resizeMode: 'contain',
    margin: 10,
  },
  count: {
    fontSize: width * .3,
    fontWeight: '900',
    color: '#4A4E4F'
  },
  playstop:{
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: width * .1,
  },
  playstopimg:{
    width:75,
    resizeMode: 'contain',
  },
  playandstopbutton:{
    flexDirection: 'row',
    gap: "25%",
    justifyContent: 'center'
  },
  timescontainer:{
    flexDirection: 'row',
    gap: "10%",
    justifyContent: 'center',
    bottom: width * 0.4
  },
  times:{
    width: 60,
    resizeMode: 'contain'
  },
});
