import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet,Image,TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";


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
      <View style={styles.header10}>
        <View>
          <Image
            style={styles.filterIcon}
            contentFit="cover"
            source={require("../assets/filter.png")}
          />
        </View>
        <View style={[styles.search, styles.headerLayout]}>
          
          

        </View>
      </View>
      {/* Header */}

      <Text style={styles.verifyText}>Welcome to News & </Text>
      <Text style={styles.verifyText}>Feedback Section</Text>


    <View style={styles.container}>
      <Text style={styles.header10}>News Admin Home</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header10: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
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

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

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
    top: -40, // Updated top for responsiveness
    // Updated left for responsiveness
    width: 300,
    left: 120, // Updated width for responsiveness
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


  verifyText: {
    fontSize: 15,
    fontWeight: 700,
    color: Color.colorDarkgray_100,
    marginLeft: 20, // Adjust the margin as needed
    marginTop: 10, // Adjust the margin as needed
    top: 20,
    
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

export default NewsAdminHome;
