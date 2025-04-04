import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, LocaleConfig } from 'react-native-calendars';

const { width } = Dimensions.get('window');

const Calender: React.FC = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');

  const handleDayPress = (day: any) => {
    console.log('selected day', day);
    setSelectedDate(day.dateString);
  };
  return (
    <View style={styles.container}>
     

      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          {/* Placeholder for any action */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("Settings")}>
          <Image source={require("../assets/settings.png")} style={styles.notif} />
        </TouchableOpacity>
      </View>

      {/* Main Content Area (currently empty) */}
      <View style={styles.mainContent}>
        <Calendar
          style={styles.calendar}
          current={new Date().toISOString().split('T')[0]}
          minDate={'2020-01-01'}
          maxDate={'2030-12-31'}
          onDayPress={handleDayPress}
          onMonthChange={(month: any) => {
            console.log('month changed', month);
          }}
          hideDayNames={false}
          onPressArrowLeft={(subtractMonth: () => void) => subtractMonth()}
          onPressArrowRight={(addMonth: () => void) => addMonth()}
          enableSwipeMonths={true}

           // Mark specific dates
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#4A90E2', }, 
          }}

           // Theme example
           theme={{
             backgroundColor: '#ffffff',
             calendarBackground: '#ffffff',
             textSectionTitleColor: 'black',
             selectedDayBackgroundColor: 'black',
             selectedDayTextColor: 'black',
             todayTextColor: 'red',
             dayTextColor: 'black',
             textDisabledColor: '#d9e1e8',
             dotColor: '#00adf5',
             selectedDotColor: '#ffffff',
             arrowColor: 'black',
             monthTextColor: 'black',
             indicatorColor: 'blue',
             textDayFontWeight: '300',
             textMonthFontWeight: 'bold',
             textDayHeaderFontWeight: '300',
             textDayFontSize: 16,
             textMonthFontSize: 17,
             textDayHeaderFontSize: 16
           }}
        />
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push("Welcome")}>
          <Image source={require("../assets/home.png")} style={styles.notif} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require("../assets/calendar.png")} style={styles.notif} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("account")}>
          <Image source={require("../assets/account.png")} style={styles.notif} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Calender;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 30,
    resizeMode: 'contain',
    margin: 10,
  },
  calendar:{
    width: width,
    height: width,
    borderColor: 'lightgrey',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignContent: 'center',
  },
  selectedText:{
    marginTop: 10,
     fontSize: 16,
     textAlign: 'center',
     color: '#333',
  }
});
