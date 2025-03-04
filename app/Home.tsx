import { Picker } from "@react-native-picker/picker";
import React, {useState, useEffect} from "react";
import { View, Text, TextInput, StyleSheet} from "react-native";

const facts: React.FC = () => { 
    const [date, setDate] = useState<string>("");
    const [month, setMonth] = useState<string>("");
    const [fact, setFact] = useState<string>("");

    useEffect(() => {
        if(!date || !month) {
            return;
        }

        const fetchFact = async () => {
            const url = `https://numbersapi.p.rapidapi.com/${month}/${date}/date`;
            const options = {
              method: "GET",
              headers: {
                "x-rapidapi-key": '526b948c2emsh2ef8f078fc67537p1d1a94jsn0b80c7e1a988',
                "x-rapidapi-host": "numbersapi.p.rapidapi.com",
              },
            };
      
            try {
              const response = await fetch(url, options);
              const result = await response.text();
              setFact(result);
            } catch (error) {
              console.error(error);
            }
          };
          fetchFact();
        }, [date, month]);
      
        return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputtext}
                placeholder="Date"
                value={date}
                onChangeText={setDate}
            />
            <Picker
                style={styles.inputtext}
                selectedValue={month}
                onValueChange={setMonth}
            >
          <Picker.Item label="Select Month" value="" />
          <Picker.Item label="January" value="1" />
          <Picker.Item label="February" value="2" />
          <Picker.Item label="March" value="3" />
          <Picker.Item label="April" value="4" />
          <Picker.Item label="May" value="5" />
          <Picker.Item label="June" value="6" />
          <Picker.Item label="July" value="7" />
          <Picker.Item label="August" value="8" />
          <Picker.Item label="September" value="9" />
          <Picker.Item label="October" value="10" />
          <Picker.Item label="November" value="11" />
          <Picker.Item label="December" value="12" />
              </Picker>
            {date.length === 2 && parseInt(date, 10) <= 31 && parseInt(month, 10) <= 12 && <Text>{fact}</Text>}
        </View>
        );
      };
      

const styles = StyleSheet.create({
    inputtext: {
        borderColor: 'black',
        borderWidth: .8,
        borderRadius: 7,
        margin: 10,
        padding: 10,
        width: 200,
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#d8f5f8'
    },
});
export default facts;


