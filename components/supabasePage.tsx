import React, {useEffect, useState} from "react";
import { View, Text, TextInput, StyleSheet, ScrollView} from "react-native";
import { getVisitors } from "../lib/supabase_crud";

const supabasePage = () => {
    const [visitors, setVisitors] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
       const fetchVisitors = async () => {
        try {
          const { visitors, error } = await getVisitors();
            setVisitors(visitors);
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
    };
    fetchVisitors();
}, []);

    if(loading) {
        return <Text>Loading...</Text>;
    }

    return(
        <ScrollView>
            <Text>Visitors</Text>
            {visitors.map((visitor: any, index: number | string) => (
                <View key={index}>
                    <Text> ID: {visitor.id}</Text>
                    <Text>Name: {visitor.visitor_name}</Text>
                </View>
            ))}
        </ScrollView>
    )
}
export default supabasePage;