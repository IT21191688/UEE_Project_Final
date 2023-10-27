import axios from 'axios'; // Import the Axios library
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from '@react-navigation/native';

const CreateNews = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('64eaf5224b77b2ddf24cfabc');
  const [content, setContent] = useState('');
  const [newsImage, setNewsImage] = useState(null); // Used to store the image URL

  const selectFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'image/*' });

    if (result.type === 'success') {
      setNewsImage(result.uri); // Store the selected image URI
    } else {
      Alert.alert('File selection canceled');
    }
  };

  const handleViewNews = () => {
    navigation.navigate('NewsView');
  };

  const handleAddAppointment = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('Token is missing in AsyncStorage');
        return;
      }
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      const requestBody = {
        title: title,
        category: category,
        content: content,
        newsImage: newsImage, // Use the stored image URI
      };

      const response = await axios.post(
        'https://uee123.onrender.com/api/v1/news/create',
        requestBody,
        { headers }
      );

      if (response.data.isSuccessful) {
        Alert.alert("Successfully Created");
        navigation.navigate('NewsView', { newsId: response.data.newsId });

      } else {
        Alert.alert("Failed Try Again: " + response.data.message);
      }
    } catch (error) {
      Alert.alert("Failed to Create: " + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/akariconschevronleft.png")}
          style={styles.backIcon}
        />


        <Text style={styles.title}>Publish a News</Text>
      </View>

      <View style={styles.footer}>
        <Image
          source={require("../assets/ellipse-1.png")}
          style={styles.footerIcon}
        />
        <Text style={styles.footerText}>DIV-LINK News</Text>
    </View>

      

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Write the title of the news here"
            placeholderTextColor="#aaa6b9"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Category</Text>
          <Picker
            style={styles.picker}
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label="Select a category" value="" />
            <Picker.Item label="Local News" value="652021f9908ee6af777828aa" />
            <Picker.Item label="Events" value="65277a60cf373daf8cb153d8" />
            {/* Add more categories as needed */}
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Content</Text>
          <TextInput
            style={[styles.input, styles.contentInput]}
            placeholder="Content"
            placeholderTextColor="#aaa6b9"
            value={content}
            onChangeText={(text) => setContent(text)}
            multiline
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>News Image</Text>
          <TouchableOpacity style={styles.selectFileButton} onPress={selectFile}>
            <Text style={styles.selectFileButtonText}>Select an Image</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.publishButton} onPress={handleAddAppointment}>
          <Text style={styles.publishText}>Upload News</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewNewsButton} onPress={handleViewNews}>
          <Text style={styles.viewNewsButtonText}>View News</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 40,
    paddingHorizontal: 16,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
  },
  backIcon: {
    paddingEnd: 10,
    width: 24,
    height: 24,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  footerIcon: {
    width: 24,
    height: 24,
  },
  footerText: {
    fontSize: 16,
    marginLeft: 8,
  },
  title: {
    paddingTop: 38,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: -20,
  },
  formContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    elevation: 4,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
  },
  contentInput: {
    height: 120,
    textAlignVertical: "top",
  },
  selectFileButton: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
  },
  selectFileButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  publishText: {
    color: "white",
    fontWeight: "bold",
  },
  publishButton: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 12,
    marginBottom:10,
  },
  viewNewsButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewNewsButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CreateNews;
