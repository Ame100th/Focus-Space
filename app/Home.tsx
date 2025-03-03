import React, {useState, useEffect} from "react";
import { View, Text, ActivityIndicator, Button} from "react-native";

interface Book {
    id: number;
    title: string;
    author: string;
}

const BookList: React.FC = () => {
    const [data, setData] = useState<Book[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {(async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            if(!response.ok) {
                throw new Error("Something went wrong");
            }
            const data = await response.json();
            setData(data);
            setLoading(false); 
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
        }
    })();
}, []);

if(loading) {
    return (
        <View>
            <ActivityIndicator size="large" color="#0000ff"/>
        </View>
    );
    }

    if(error) {
        return (
            <View>
                <Text>Error : {error}</Text>
            </View>
        );
    }

    return (
        <View>
            {data.map((book) => (
                <Text key={book.id}>{book.title}</Text>
            ))}
        </View>
    );
}
export default BookList;



