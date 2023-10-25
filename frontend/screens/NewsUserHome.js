import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NewsUserHome = () => {
  const navigation = useNavigation();

  const handleChatInterface = () => {
    navigation.navigate('ChatInterface'); // Navigate to the UserChat screen
  };

  const handleNewsView = () => {
    navigation.navigate('NewsView'); // Navigate to the NewsView screen
  };



  return (
    <View style={styles.container}>
      <Text style={styles.header}>News User Home</Text>
      <TouchableOpacity style={styles.button} onPress={handleChatInterface}>
        <Text style={styles.buttonText}>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNewsView}>
        <Text style={styles.buttonText}>News View</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 18,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NewsUserHome;
