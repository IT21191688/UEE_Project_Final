import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from "@rneui/base";

const CreateNews = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("652021f9908ee6af777828aa");
  const [content, setContent] = useState("");
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Make an API request to fetch news data
        const response = await axios.get('https://uee123.onrender.com/api/v1/news/getAllActiveNews');

        if (response.data.isSuccessful) {
          // Set the fetched news data in state
          setNewsList(response.data.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setIsError(true);
        }
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchNews();
  }, []);

  //const additionalDocuments = "C:/Users/user/Desktop/finalAsiaCup.PNG";
/*
  const handleSubmit = async () => {
    try {
      const requestBody = {
        title: title,
        category: category,
        content: content,
        newsImage: [additionalDocuments],
      };

      console.log('Request Body:', requestBody);

      // Replace 'YOUR_API_TOKEN' with your actual token
      const token = await AsyncStorage.getItem('token');
      if (!token) {
          console.error('Token is missing in AsyncStorage');
          return;
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        //'Content-Type': 'application/json', // Specify the content type
      };

      const response = await axios.post(
        'https://uee123.onrender.com/api/v1/news/create',
        requestBody,
        { headers }
      );

      console.log('Response:', response);

      if (response.data.isSuccessful) {
        // Handle a successful response (e.g., show a success message)
        console.log('News saved successfully');
        // You may want to fetch the updated news list here
      } else {
        // Handle an unsuccessful response (e.g., show an error message)
        console.error('Failed to save news:', response.data.message);
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error saving news:', error);
    }
  };
*/

  const handleSubmit = async () => {
    try {
      const requestBody = {
        title: title,
        category: category,
        content: content,
        newsImage: 'C:/Users/user/Desktop/finalAsiaCup.PNG', // Replace with a default image URL
      };

      console.log('Request Body:', requestBody);

      // Replace 'YOUR_API_TOKEN' with your actual token
      const token = await AsyncStorage.getItem('token');
      if (!token) {
          console.error('Token is missing in AsyncStorage');
          return;
      }
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.post(
        'https://uee123.onrender.com/api/v1/news/create',
        requestBody,
        { headers }
      );

      console.log('Response:', response);

      if (response.data.isSuccessful) {
        // Handle a successful response (e.g., show a success message)
        console.log('News saved successfully');
        // You may want to fetch the updated news list here
      } else {
        // Handle an unsuccessful response (e.g., show an error message)
        console.error('Failed to save news:', response.data.message);
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error saving news:', error);
    }
  };

  /*
  const handleSubmit = async () => {
    try {


      // Define the data to be sent to the server
      const requestBody = {
        title:title,
        category:category,
        content:content,
        newsImage:additionalDocuments
        
        // Add more fields as needed
      };
      console.log(requestBody)

      const token = await AsyncStorage.getItem('token');
                if (!token) {
                    console.error('Token is missing in AsyncStorage');
                    return;
                }
                const headers = {
                    'Authorization': `Bearer ${token}`,
                };

      // Make a POST request to save news data
      console.log(headers)
      const response = await axios.post('https://uee123.onrender.com/api/v1/news/create', requestBody,{headers});
       
      console.log(response)
      if (response.data.isSuccessful) {
        // Handle a successful response (e.g., show a success message)
        console.log('News saved successfully');
        // You may want to fetch the updated news list here
      } else {
        // Handle an unsuccessful response (e.g., show an error message)
        console.error('Failed to save news:', response.data.message);
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error saving news:', error);
    }
  };
*/

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
            style={styles.formContainer}
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label="Select a category" value="" />
            <Picker.Item label="Local News" value="category1" />
            <Picker.Item label="Category 2" value="category2" />
            {/* Add more categories as needed */}
          </Picker>
        </View>

{/*
        <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e.target.files[0])}
      />
     */}   
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

        <TouchableOpacity style={styles.publishButton} onPress={handleSubmit}>
          <Text style={styles.publishText}>Publish News</Text>
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
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
  },
  backIcon: {
    paddingEnd:10,
    width: 24,
    height: 24,
  },
  title: {
    paddingTop:38,
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
  contentInput: {
    height: 120,
    textAlignVertical: "top",
  },
  publishButton: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 12,
  },
  publishText: {
    color: "white",
    fontWeight: "bold",
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
});

export default CreateNews;
