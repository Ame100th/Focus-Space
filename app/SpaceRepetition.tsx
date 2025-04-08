import React, { useState, useEffect, useCallback } from 'react';
import {
  View, StyleSheet, TouchableOpacity, Dimensions, Image, Text,
  ActivityIndicator, Button, TextInput, Alert, Keyboard 
} from 'react-native';
import { useRouter } from 'expo-router';
import supabase from '../lib/supabase';
import { SrsItemRecord, getDueSrsItems, updateSrsItem, addDays, addSrsItem } from '../lib/srs_crud';
import { User } from '@supabase/supabase-js';




const SpaceRepetition: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [isAddingCard, setIsAddingCard] = useState(false); 
  const [dueItems, setDueItems] = useState<SrsItemRecord[]>([]);
  const [currentItem, setCurrentItem] = useState<SrsItemRecord | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for adding a new card
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
       try {
        const { data: { session }, error } = await supabase.auth.getSession();
         if (error) throw error;
        if (session?.user) {
           setUser(session.user);
        } else {
            console.log("No active session found.");
             setError("You need to be logged in."); 
        }
      } catch (err: any) {
        console.error('Error fetching user session:', err);
        setError(err.message || 'Failed to fetch user session.');
      }
    };
    fetchUser();
  }, []); 

  const fetchDueItems = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);
    try {
      const items = await getDueSrsItems(user.id);
      setDueItems(items);
      setCurrentItem(items.length > 0 ? items[0] : null);
      setShowAnswer(false);
    } catch (err: any) {
      console.error('Failed to fetch due items:', err);
      setError(err.message || 'Could not load review items.');
      setDueItems([]);
      setCurrentItem(null);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchDueItems();
    } else {
      setIsLoading(false);
      setDueItems([]);
      setCurrentItem(null);
    }
  }, [user, fetchDueItems]);

  const handleFeedback = async (feedback: 'Forgot' | 'Remembered') => {
    if (!currentItem) return;
     setIsLoading(true);
     const today = new Date();
     let updates: Partial<Pick<SrsItemRecord, 'next_review_date' | 'interval' | 'ease_factor' | 'is_new'>> = {};

     if (feedback === 'Forgot') {
        updates = { interval: 1, is_new: false, next_review_date: addDays(today, 1).toISOString()};
     } else {
        let newInterval: number;
        if (currentItem.is_new || currentItem.interval < 1) newInterval = 1;
        else if (currentItem.interval === 1) newInterval = 3;
        else newInterval = Math.round(currentItem.interval * currentItem.ease_factor);
        updates = { interval: newInterval, is_new: false, next_review_date: addDays(today, newInterval).toISOString() };
     }

     try {
        await updateSrsItem(currentItem.id, updates);
        const remainingItems = dueItems.slice(1);
        setDueItems(remainingItems);
        setCurrentItem(remainingItems.length > 0 ? remainingItems[0] : null);
        setShowAnswer(false);
     } catch (err: any) {
        console.error('Failed to update SRS item:', err);
        setError(err.message || 'Could not save review progress.');
     } finally {
        setIsLoading(false);
     }
  };

  const handleAddNewCard = async () => {
    if (!user) {
        Alert.alert('Error', 'You must be logged in to add cards.');
        return;
    }
    if (!newQuestion.trim() || !newAnswer.trim()) {
        Alert.alert('Validation Error', 'Please enter both a question and an answer.');
        return;
    }

    Keyboard.dismiss(); 
    setIsAddingCard(true); 
    setError(null);

    try {
        const addedItem = await addSrsItem(user.id, newQuestion.trim(), newAnswer.trim());

        if (addedItem) {
            Alert.alert('Success', 'New card added!');
            setNewQuestion(''); 
            setNewAnswer('');
        } else {
             setError('Failed to add the new card. Please try again.');
             Alert.alert('Error', 'Failed to add the new card. Please try again.');
        }
    } catch (err: any) {
        console.error('Failed to add card:', err);
        setError(err.message || 'An unexpected error occurred while adding the card.');
        Alert.alert('Error', err.message || 'An unexpected error occurred.');
    } finally {
        setIsAddingCard(false);
    }
  };


  const renderAddCard = () => {
    if (!user) return null; 

    return (
        <View style={styles.addCardContainer}>
            <Text style={styles.addCardTitle}>Add a New Card</Text>
            <TextInput
                style={styles.input}
                placeholder="Question"
                value={newQuestion}
                onChangeText={setNewQuestion}
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.input}
                placeholder="Answer"
                value={newAnswer}
                onChangeText={setNewAnswer}
                placeholderTextColor="#888"
            />
            <Button
                title={isAddingCard ? "Adding..." : "Add Card"}
                onPress={handleAddNewCard}
                disabled={isAddingCard}
                color="#19a0ae"
            />
        </View>
    );
  };
  // Render Review Section
  const renderReviewContent = () => {
    if (isLoading && dueItems.length === 0) { // Show loading only initially
      return <ActivityIndicator size="large" color="#19a0ae" />;
    }
     // Separate general errors from add card errors if needed
     if (error && !isAddingCard) { // Show general fetch/update errors
        return <Text>{error}</Text>;
     }
    if (!user) {
         return <Text >Please log in to review or add cards.</Text>;
    }
    if (!currentItem && !isLoading) { // Check isLoading to avoid flash of "no items"
      return <Text> No items to review for now! </Text>;
    }
    if (!currentItem) {
        // Still loading or transitioning between cards
        return <ActivityIndicator size="large" color="#19a0ae" />;
    }

    // Display Current Item
    return (
      <View style={styles.card}>
        <Text style={styles.cardText}>{currentItem.question}</Text>
        {showAnswer && <Text style={styles.cardText}>{currentItem.answer}</Text>}

        <View>
          {!showAnswer ? (
            <Button title="Reveal Answer" onPress={() => setShowAnswer(true)} color="#19a0ae"/>
          ) : (
            <>
              <Button title="Forgot" onPress={() => handleFeedback('Forgot')} color="#abdbe3" disabled={isLoading}/>
              <Button title="Remembered" onPress={() => handleFeedback('Remembered')} color="#2596be" disabled={isLoading}/>
            </>
          )}
        </View>
         {isLoading && <ActivityIndicator size="small" color="#555" style={{ marginTop: 10 }} />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
         <TouchableOpacity onPress={() => router.back()}>
             <Image source={require("../assets/back.png")} style={styles.navIcon} />
         </TouchableOpacity>
         <View style={{ width: 33 }} />
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
         {renderAddCard()}
         {renderReviewContent()}
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => router.push("StudyMethods")}>
           <Image source={require("../assets/home.png")} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("calender")}>
           <Image source={require("../assets/calendar.png")} style={styles.navIcon} />
        </TouchableOpacity>
         <TouchableOpacity onPress={() => router.push("account")}>
            <Image source={require("../assets/account.png")} style={styles.navIcon} />
         </TouchableOpacity>
      </View>
    </View>
  );
};

export default SpaceRepetition;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8f5f8',
  },
  backgroundImage: { 
    position: 'absolute',
    width: "100%",
    opacity: 0.3,
  },
  topBar: {
     width: '100%',
    height: 45,
    backgroundColor: '#4A4E4F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  bottomBar: {
    width: '100%',
    height: 45,
    backgroundColor: '#4A4E4F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  mainContent: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  navIcon: {
    width: 30,
    resizeMode: 'contain',
    margin: 10,
  },
  titleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addCardContainer: {
    width: '95%',
    padding: 15,
    backgroundColor: '#ffffffcc',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 1 },
     shadowOpacity: 0.15,
     shadowRadius: 2,
  },
  addCardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      color: '#333',
  },
  input: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 8,
      fontSize: 16,
      marginBottom: 10,
      color: '#000',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 25,
    width: '95%',
    minHeight: 180, 
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
});