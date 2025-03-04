import React, {useState, useEffect} from "react";
import { View, Text, ActivityIndicator, Button, TextInput, StyleSheet} from "react-native";

const facts: React.FC = () => { 
    const [date, setDate] = useState<string>("");
    const [month, setMonth] = useState<string>("");
    const [fact, setFact] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
              setError("An error occurred. Please try again later.");
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
            <TextInput
                style={styles.inputtext}
                placeholder="Month"
                value={month}
                onChangeText={setMonth}
            />
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


