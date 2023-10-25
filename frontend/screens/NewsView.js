import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { useNavigation } from '@navigation/native'; // Please adjust the import path to match your project's setup.
import { useNavigation } from '@react-navigation/native';


const NewsView = () => {
  const [newsData, setNewsData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate('CreateNews');
  };

  

  const handleNavigateUpdate = (id) => {
    navigation.navigate('UpdateNews', { newsId: id });
  };

  const handleDeleteNews = async (newsId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('Token is missing in AsyncStorage');
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(`https://uee123.onrender.com/api/v1/news/deleteNews/${newsId}`, { headers });

      if (response.status === 200) {
        // News item deleted successfully
        fetchData(); // Refetch the updated list
      } else {
        setError('Failed to delete news item');
      }
    } catch (error) {
      setError('Error deleting news item: ' + error.message);
    }
  };

  useEffect(() => {
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
        Authorization: `Bearer ${token}`,
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

  const filterNewsByCategory = (category) => {
    setSelectedCategory(category);
  };

  // Filter the news based on the selected category
  const filteredNews = selectedCategory
    ? newsData.filter((item) => item.category.name === selectedCategory)
    : newsData;

    const localNewsButtonStyle = {
      ...styles.categoryButton,
      backgroundColor: selectedCategory === 'Local News' ? 'green' : '#007bff',
    };

    const eventsButtonStyle = {
      ...styles.categoryButton,
      backgroundColor: selectedCategory === 'Events' ? 'green' : '#007bff',
    };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.newAppointment} onPress={handleNavigate}>
        <Text style={styles.buttonTextAdd}>View News</Text>
      </TouchableOpacity>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View>
          <View style={styles.buttonContainer}>
          <TouchableOpacity
          style={localNewsButtonStyle}
          onPress={() => filterNewsByCategory('Local News')}
        >
          <Text style={styles.buttonText}>Local News</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={eventsButtonStyle}
          onPress={() => filterNewsByCategory('Events')}
        >
          <Text style={styles.buttonText}>Events</Text>
        </TouchableOpacity>
          </View>
          <FlatList
            data={filteredNews}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.newsItem}>
                <Image source={{ uri: item.newsImage }} style={styles.newsImage} />
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
                    onPress={() => handleDeleteNews(item._id)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },
  newsItem: {
    marginBottom: 50,
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
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  newAppointment: {
    // Define styles for the "Request Certificates" button
  },
  buttonTextAdd: {
    // Define styles for the button text
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  updateButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    margin: 10,

    
  },
  deleteButton: {

    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    margin: 10,
 
  },
  buttonText: {
    // Define styles for the button text
  },
  categoryButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    margin: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NewsView;
