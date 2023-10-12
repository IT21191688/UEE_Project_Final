import axios from 'axios'; // Import the Axios library
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateNews = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('64eaf5224b77b2ddf24cfabc');
  const [content, setContent] = useState('');
  const [newsImage, setNewsImage] = useState(null);

  const selectFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'image/*' });

    if (result.type === 'success') {
      setFile(result);
    } else {
      Alert.alert('File selection canceled');
    }
  };

  const uploadNews = async () => {
    if (!file) {
      Alert.alert('Please select a file first');
      return;
    }

    const token = await AsyncStorage.getItem('token');

    if (!token) {
      console.error('Token is missing in AsyncStorage');
      return;
    }
    console.log(token)

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('content', content);
    formData.append('file', {
      name: file.name,
      type: file.type,
      uri: file.uri,
    });

    try {
      const response = await axios.post('http://192.168.43.93:8090/api/v1/news/create', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        const data = response.data;
        if (data.success) {
          Alert.alert('News uploaded successfully');
        } else {
          Alert.alert('News upload failed');
        }
      } else {
        Alert.alert('Server Error', 'Failed to upload news: ' + response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload news: ' + error.message);
    }
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

      // Create a request body object with the appointment details
      const requestBody = {
        title: title,
        category: category, // Replace with your description
        content: content,
        newsImage: newsImage, // Make sure selectedTimeSlot is set to a valid value

      };

      console.log(requestBody)
      const response = await axios.post(
        'https://uee123.onrender.com/api/v1/news/create',
        requestBody,
        { headers }
      );

      if (response.data.isSuccessful) {
        Alert.alert("Successfully Created");
        //navigation.navigate("AppoinmentSuccess")
      } else {
        Alert.alert("Failed Try Again: " + response.data.message);
        //navigation.navigate("Appointments")
      }
    } catch (error) {
      //console.error('Error creating', error);
      Alert.alert("Failed to Create" + error.message);
    }
  };

  return (
    <View style={{ top: 100 }}>
      <Text>Title:</Text>
      <TextInput value={title} onChangeText={setTitle} />

      <Text>Category:</Text>
      <TextInput value={category} onChangeText={setCategory} />

      <Text>Content:</Text>
      <TextInput value={content} onChangeText={setContent} />

      <Text>News Image</Text>
      <TextInput value={newsImage} onChangeText={setNewsImage} />

      <Button title="Upload News" onPress={handleAddAppointment} />
    </View>
  );
};

export default CreateNews;
