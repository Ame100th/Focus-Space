import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import SupabasePage from './supabasePage';

type WelcomeProps = {username: string, setUsername: (username: string) => void};

const Welcome:React.FC<WelcomeProps> = ({username}) => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            {/* <Image style={styles.image}
            source={require('../components/Focus-Space.png')}
            />
            <Text style={styles.title}>Welcome {username} to Focus Space!</Text>
            <Text style={styles.subtitle}>
                Stay focused, achieve your goals, and embrace productivity.
            </Text> */}
            {/* <TouchableOpacity style={styles.button} onPress={() => router.push("Home")}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity> */}
            <SupabasePage />
        </View>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d8f5f8',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    image:{
        width:200,
        height: 200,
        resizeMode: 'contain',
        opacity: .8,
        marginBottom: 50,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
        marginBottom: 30,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 24,
    },
    button: {
        backgroundColor: '#19a0ae',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },

});

