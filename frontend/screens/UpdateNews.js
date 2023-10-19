import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from '@react-navigation/native';

const UpdateNews = () => {
  const [newsId, setNewsId] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]); // Categories data for the dropdown

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('Token is missing in AsyncStorage');
          return;
        }

        const headers = {
          'Authorization': `Bearer ${token}`,
        };

        const response = await axios.get(`https://uee123.onrender.com/api/v1/news/getOneNews/${route.params.newsId}`, { headers });

        if (response.status === 200) {
          const news = response.data.data;
          setNewsId(news._id);
          setTitle(news.title);
          setCategory(news.category._id); // Assuming category is an ID
          setContent(news.content);
        } else {
          Alert.alert('Failed to fetch news data');
        }
      } catch (error) {
        Alert.alert('Error fetching news data: ' + error.message);
      }
    };

    fetchNewsData();

    // Fetch categories for the dropdown
    const fetchCategories = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('Token is missing in AsyncStorage');
          return;
        }

        const headers = {
          'Authorization': `Bearer ${token}`,
        };

        const response = await axios.get('https://uee123.onrender.com/api/v1/category/getAllCategories/?type=news', { headers });

        if (response.status === 200) {
          setCategories(response.data.data);
        } else {
          Alert.alert('Failed to fetch categories');
        }
      } catch (error) {
        Alert.alert('Error fetching categories: ' + error.message);
      }
    };

    fetchCategories();
  }, [route.params.newsId]);

  const updateNews = async () => {
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
    };

    try {
      const response = await axios.patch(`https://uee123.onrender.com/api/v1/news/updateNews/${newsId}`, requestBody, { headers });

      if (response.data.isSuccessful) {
        Alert.alert('News updated successfully');
        navigation.navigate('NewsView'); // Navigate back to the NewsView screen
      } else {
        Alert.alert('Failed to update news: ' + response.data.message);
      }
    } catch (error) {
      Alert.alert('Error updating news: ' + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Update News</Text>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
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
            <Picker.Item label="Select a category" value="652021f9908ee6af777828aa" />
            {categories.map((cat) => (
              <Picker.Item key={cat._id} label={cat.name} value={cat._id} />
            ))}
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Content</Text>
          <TextInput
            style={[styles.input, styles.contentInput]}
            multiline
            value={content}
            onChangeText={(text) => setContent(text)}
          />
        </View>

        <TouchableOpacity style={styles.updateButton} onPress={updateNews}>
          <Text style={styles.updateButtonText}>Update News</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 20,
    paddingHorizontal: 16,
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
  contentInput: {
    height: 120,
    textAlignVertical: "top",
  },
  updateButton: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  updateButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
  },
});

export default UpdateNews;
