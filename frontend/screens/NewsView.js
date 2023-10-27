import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import { useNavigation } from '@navigation/native'; // Please adjust the import path to match your project's setup.
import { useNavigation } from '@react-navigation/native';
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";


const NewsView = () => {
  const [newsData, setNewsData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State for search input


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
      console.log('Token:', token);

      if (!token) {
        console.error('Token is missing in AsyncStorage');
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(`https://uee123.onrender.com/api/v1/news/deleteNews/${newsId}`, { headers });


      if (response.status === 5) {
        console.log('Response status:', response.status);

        
        // News item deleted successfully
        fetchData(); // Refetch the updated list
      } else {
        setError('Failed to delete news item');
      }
    } catch (error) {
      console.log('Request Error:', error);

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

  const filteredNews = selectedCategory
    ? newsData.filter((item) => item.category.name === selectedCategory)
    : newsData;

/*
  const filteredNews = selectedCategory
    ? newsData.filter(
        (item) =>
          item.category.name === selectedCategory &&
          item.status === 1
      )
    : newsData.filter((item) => item.status === 1);
*/



  const searchNews = () => {
    // Filter news based on searchQuery
    const filteredNews = newsData.filter(
      (item) =>
        item.category.name === selectedCategory &&
        (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.content.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    return filteredNews;
  };

  const localNewsButtonStyle = {
    ...styles.categoryButton,
    backgroundColor: selectedCategory === 'Local News' ? 'green' : '#007bff',
  };

  const eventsButtonStyle = {
    ...styles.categoryButton,
    backgroundColor: selectedCategory === 'Events' ? 'green' : '#007bff',
  };


  return (
    <View style={styles.myNews}>
      {/* Rectangle */}
      <Image
        style={[styles.myNewsChild, styles.searchPosition]}
        contentFit="cover"
        source={require("../assets/rectangle-5.png")}
      />

      <View style={styles.AppoinmentTextAndProfile}>
        <Image
          style={styles.ellipseIcon}
          contentFit="cover"
          source={require("../assets/ellipse.png")}
        />
        <View style={styles.headlineParent}>
          <TouchableOpacity >
            <Text style={[styles.headline1, styles.headlineFlexBox]}>
              News Admin Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/*profile*/}
      <View style={styles.header}>
        <View>
          <Image
            style={styles.filterIcon}
            contentFit="cover"
            source={require("../assets/filter.png")}
          />
        </View>
        <View style={[styles.search, styles.headerLayout]}>
          <Image
            style={styles.searchChild}
            contentFit="cover"
            source={require("../assets/rectangle-3.png")}
          />
          <Image
            style={styles.iconSearch}
            contentFit="cover"
            source={require("../assets/icon-search.png")}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
      </View>
      {/* Header */}

      <Text style={styles.verifyText}>Welcome to News & </Text>
      <Text style={styles.verifyText}>Feedback Section</Text>



      <View style={styles.container}>
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

            < FlatList

              data={searchQuery ? searchNews() : filteredNews}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
    //justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  buttonContainer: {
    width: 400,
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



  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  /*
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
 */


  searchPosition: {
    left: 0,
    top: 0,
  },
  headlineFlexBox: {
    display: "flex",
    color: Color.pureWhite,
    alignItems: "center",
    textAlign: "left",
    width: "100%", // Updated width for responsiveness
    left: -20,
    top: 50,
    position: "absolute",
  },
  headerLayout: {
    height: 40,
    position: "absolute",
  },



  myNewsChild: {
    width: "100%",
    height: 221,
    position: "absolute",
  },
  ellipseIcon: {
    left: "80%", // Updated left for responsiveness
    width: 54,
    height: 54,
    top: 55,
    position: "absolute",
  },

  headline1: {
    top: 60,
    fontSize: FontSize.bold22_size,
    letterSpacing: -0.3,
    lineHeight: 26,
    fontWeight: "700",
    fontFamily: FontFamily.bold22,
    alignItems: "center",
  },
  headlineParent: {
    height: 48,
    width: "100%", // Updated width for responsiveness
    left: 40,
    top: 45,
    position: "absolute",
  },
  filterIcon: {
    top: -100, // Updated top for responsiveness
    // Updated left for responsiveness
    width: 300,
    left: 180, // Updated width for responsiveness
    height: 300, // Updated height for responsiveness
    position: "absolute",
  },
  searchChild: {
    top: -50, // Updated top for responsiveness
    left: -50, // Updated left for responsiveness
    borderRadius: Border.br_3xs,
    width: "100%", // Updated width for responsiveness
    height: 164,
    position: "absolute",
  },
  iconSearch: {
    top: 20,
    left: -5,
    width: 24,
    height: 24,
    position: "absolute",
  },
  searchInput: {
    top: 15,
    left: 20,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.dMSansRegular,
    color: Color.colorDarkgray_100,
    textAlign: "left",
    position: "absolute",
  },
  search: {
    width: "90%", // Updated width for responsiveness
    left: 40,
    top: 38,
  },
  header: {
    top: 100, // Updated top for responsiveness
    width: "100%", // Updated width for responsiveness
    left: 0,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  myNews: {
    backgroundColor: Color.colorWhitesmoke,
    height: "100%", // Updated height for responsiveness
    width: "100%",
    flex: 1,
  },
  AppoinmentTextAndProfile: {
    flexDirection: "row",
    alignItems: "center",
  },

  button: {
    flex: 1,
    borderRadius: 97,
    backgroundColor: "#DADBDF",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },

  buttonText: {
    fontSize: 14,
    color: "black",
    fontWeight: 900,
  },
  newAppoinment: {
    display: "flex",
    width: 320,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 97,
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#130160", // Use backgroundColor instead of background
    flexDirection: "row", // Use flexDirection to control the layout direction
    justifyContent: "space-between", // Use justifyContent to space elements horizontally
    left: 20,
    marginVertical: 8,
    marginTop: 100,
    // Add margin for spacing

  },
  buttonTextAdd: {
    fontSize: 16,
    color: "white",
    alignItems: "center",
    left: "350%",
  },

  verifyText: {
    fontSize: 15,
    fontWeight: 700,
    color: Color.colorDarkgray_100,
    marginLeft: 20, // Adjust the margin as needed
    marginTop: 10, // Adjust the margin as needed
    top: -20,
  },
  contentColumn: {
    flexDirection: "row",
    alignItems: "center",
    left: -100,
    top: 35,
  },
  iconsContainer: {
    flexDirection: "row",
    left: -2,
    top: -50,
  },
  iconColumn: {
    flexDirection: "column", // Each icon in a separate column
    alignItems: "center", // Center icons vertically
    marginRight: 20, // Adjust the margin between columns
  },
  icon: {
    marginBottom: 10, // Adjust the margin below each icon
  },
  image: {
    left: 110,
    top: -35,
  },

});

export default NewsView;
