import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const UserNewsView = () => {
  const [newsData, setNewsData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigation = useNavigation();

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

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => filterNewsByCategory('Local News')}
            >
              <Text style={styles.buttonText}>Local News</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default UserNewsView;
