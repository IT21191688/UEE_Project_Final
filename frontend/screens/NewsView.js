import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity,StyleSheet,Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";


const NewsView = () => {
  const [newsData, setNewsData] = useState([]);
  const [error, setError] = useState(null);

  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate("CreateNews"); // Replace "OtherScreen" with the name of the screen you want to navigate to
  };

  const handleNavigateUpdate = (id) => {
    console.log(id)
    navigation.navigate("UpdateNews",{newsId:id}); // Replace "OtherScreen" with the name of the screen you want to navigate to
  };

  const handleNavigateDelete = () => {
    navigation.navigate("DeleteMsgCertificates"); // Replace "OtherScreen" with the name of the screen you want to navigate to
  };

  useEffect(() => {
    // Fetch news data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('Token is missing in AsyncStorage');
        return;
      }
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get('https://uee123.onrender.com/api/v1/news/getAllActiveNews', { headers });

      if (response.status === 200) {
        setNewsData(response.data.data);
      } else {
        setError('Failed to fetch news data');
      }
    } catch (error) {
      setError('Error fetching news data: ' + error.message);
    }
  };



  return (
    
    <View style={styles.container}>

<TouchableOpacity style={styles.newAppoinment} onPress={handleNavigate}>
        <Text style={styles.buttonTextAdd}>Request Certificates</Text>
      </TouchableOpacity>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={newsData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.newsItem}>
              <Image
                  source={{ uri: item.newsImage }} // Assuming the URL is stored in the 'newsImage' field
                  style={styles.newsImage}
              />
              <Text style={styles.category}>{item.category.name}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.content}>{item.content}</Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => handleNavigateUpdate(item._id)}
                >
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleNavigateDelete}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
      
            </View>
            
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  newsItem: {
    marginBottom: 16,
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
  },
  content: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },

  newsImage: {
    width: 200, // Adjust the width and height as needed
    height: 200,
    resizeMode: 'cover',
  },

});

export default NewsView; 
