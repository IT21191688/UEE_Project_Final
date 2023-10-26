import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NewsAdminHome = () => {
  const navigation = useNavigation();

  const handleCreateNews = () => {
    navigation.navigate('CreateNews'); // Navigate to the CreateNews screen
  };

  const handleNewsView = () => {
    navigation.navigate('NewsView'); // Navigate to the NewsView screen
  };

  const handleChatInterface = () => {
    navigation.navigate('ChatInterfaceAdminSide'); // Navigate to the ChatInterfaceAdminSide screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>News Admin Home</Text>
      <TouchableOpacity style={styles.button} onPress={handleCreateNews}>
        <Text style={styles.buttonText}>Create News</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNewsView}>
        <Text style={styles.buttonText}>News View</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleChatInterface}>
        <Text style={styles.buttonText}>Chat Interface</Text>
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

export default NewsAdminHome;
