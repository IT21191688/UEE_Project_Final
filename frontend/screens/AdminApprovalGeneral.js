import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import { Image } from "expo-image";
import Philippines from "../components/NewsCard";
import Property1Unselected from "../components/Property1Unselected";
import { Color,FontSize, Border, Padding } from "../GlobalStyles";
import DesignSection1 from "../components/DesignSection1";
import { Button } from "@rneui/base";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const { width } = Dimensions.get("window");

const isSmallScreen = width < 360;

const AdminApprovalGeneral = () => {
  const navigation = useNavigation();
  const [certificates, setCertificates] = useState([]);
  const [serviceType, setServiceType] = useState("");
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchText, setSearchText] = useState(""); // State to store search text
  const [selectedButton, setSelectedButton] = useState(null);

  // Function to filter certificates based on description
  const filterCertificatesByDescription = (certificates, text) => {
    if (!text) return certificates; // If search text is empty, return all certificates
    return certificates.filter((certificate) =>
      certificate.certificate.description
        .toLowerCase()
        .includes(text.toLowerCase())
    );
  };

  const handleNavigateUrgent = () => {
    navigation.navigate("AdminApprovalUrgent");
  };

  const handleCertificateApproval = (id) => {
    console.log(id);
    navigation.navigate("AdminApprovalCertificates", { certificateId: id });
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in AsyncStorage");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Make an API GET request to fetch all certificates
      const response = await axios.get(
        "https://uee123.onrender.com/api/v1/certificate/getAll",
        { headers }
      );

      if (response.data.isSuccessful) {
        const fetchedCertificates = response.data.data;
        setCertificates(fetchedCertificates);
        // Initially, show all certificates
        setFilteredCertificates(fetchedCertificates);
      } else {
        console.error("Failed to fetch certificates:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  const calculateTimeDifference = (createdAt) => {
    const currentDate = new Date();
    const createdAtDate = new Date(createdAt);

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - createdAtDate;

    // Convert the time difference to seconds
    // Convert the time difference to days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    return Math.floor(daysDifference);
  };

  const handleUrgentClick = () => {
    setServiceType("65227386068658c5a5e1ae9a");
    console.log("helooo");
    certificatesDetails("65227386068658c5a5e1ae9a");
    setSelectedStatus(7);
    setSelectedButton("general");
  };

  const handleGeneralClick = () => {
    setServiceType("652273b1068658c5a5e1ae9c");
    certificatesDetails("652273b1068658c5a5e1ae9c");
    setSelectedStatus(8);
    setSelectedButton("urgent");
  };

  const handleApprovedClick = () => {
    setSelectedStatus(3); // Use numeric value
    filtercertificatesDetails(3); // Use numeric value
    setSelectedButton("approved");

  };

  const certificatesDetails = (status) => {
    const filtered = certificates.filter(
      (certificate) => certificate.serviceType._id === status
    );
    setFilteredCertificates(filtered);
  };

  const filtercertificatesDetails = (status) => {
    const filteredStatus = certificates.filter((cer) => cer.status === status);
    setFilteredCertificates(filteredStatus);
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
          <Text style={[styles.headline1, styles.headlineFlexBox]}>
            Certificates
          </Text>
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
            style={styles.search1}
            placeholder="Search"
            placeholderTextColor="rgba(13, 1, 64, 0.6"
            value={searchText} // Set the value of the search input to the state
            onChangeText={(text) => setSearchText(text)} // Update the state with search input text
          />
        </View>
      </View>
      {/* Header */}

      <Text style={styles.verifyText}>Welcome to Certifications & </Text>
      <Text style={styles.verifyText}>Applications Section</Text>
      <Text style={styles.verifyText1}>Verify User Certficates</Text>

      <View style={styles.btnsetcontainer}>
      <TouchableOpacity
        style={[styles.button, selectedButton === "general" && styles.button1]}
        onPress={handleUrgentClick}
        
      >
        <Text style={[styles.buttonText, selectedButton === "general" && styles.buttonText1]}>General</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selectedButton === "urgent" && styles.button1]}
        onPress={handleGeneralClick}
      >
        <Text style={[styles.buttonText, selectedButton === "urgent" && styles.buttonText1]}>Urgent</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selectedButton === "approved" && styles.button1]}
        onPress={handleApprovedClick}
      >
        <Text style={[styles.buttonText, selectedButton === "approved" && styles.buttonText1]}>Approved</Text>
      </TouchableOpacity>
            </View>

      <FlatList
        style={styles.main}
        data={filterCertificatesByDescription(filteredCertificates, searchText)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCertificateApproval(item._id)}>
            <View style={styles.componentContainer}>
              <View style={styles.contentColumn}>
                <Image
                  source={require("../assets/Icon_licence.png")}
                  style={[styles.circularImage, styles.image]}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.text}>
                    {item.certificate.description}
                  </Text>
                  <Text style={styles.dateText}>
                    Service Type: {item.serviceType.description}
                  </Text>
                  <Text style={styles.dateText}>
                    Requested On:{" "}
                    {calculateTimeDifference(item.serviceType.createdAt)}{" "}
                    seconds ago
                  </Text>

                  <Text style={styles.dateText1}>
                    {item.status === 3
                      ? "Approved"
                      : item.status === 4
                      ? "Rejected"
                      : "Pending"}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollableSectionScrollViewContent: {
    flexDirection: "column",
    paddingBottom: 100, // Updated paddingBottom for responsiveness
    alignItems: "center",
    justifyContent: "flex-start",
  },
  frameScrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollableSectionPosition: {
    left: "50%",
    top: "50%",
    position: "absolute",
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
  headerLayout: {
    height: 40,
    position: "absolute",
  },
  type8Typo: {
    fontWeight: "500",
    lineHeight: 21,
    letterSpacing: -0.1,
    fontSize: FontSize.medium14_size,
  },
  scrollableSection: {
    marginTop: -100, // Updated marginTop for responsiveness
    marginLeft: -50, // Updated marginLeft for responsiveness
    width: "100%", // Updated width for responsiveness
    flex: 1,
    height: "100%",
  },
  menuBarIcon: {
    bottom: -100, // Updated bottom for responsiveness
    left: -50, // Updated left for responsiveness
    width: "100%", // Updated width for responsiveness
    height: 100, // Updated height for responsiveness
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
  headline: {
    alignItems: "center",
    fontWeight: "500",
    lineHeight: 21,
    letterSpacing: -0.1,
    fontSize: FontSize.medium14_size,
    top: 0,
    display: "flex",
    color: Color.pureWhite,
  },
  headline1: {
    top: 60,
    fontSize: FontSize.bold22_size,
    letterSpacing: -0.3,
    lineHeight: 26,
    fontWeight: "700",
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
    top: -110, // Updated top for responsiveness
    // Updated left for responsiveness
    width: 300,
    left: 170, // Updated width for responsiveness
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
  search1: {
    top: 15,
    left: 20,
    fontSize: FontSize.size_xs,
    color: Color.colorDarkgray_100,
    textAlign: "left",
    position: "absolute",
  },
  search: {
    width: "90%", // Updated width for responsiveness
    left: 40,
    top: 28,
  },
  header: {
    top: 100, // Updated top for responsiveness
    width: "100%", // Updated width for responsiveness
    left: 0,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  type8: {
    color: Color.colorDarkgray_200,
    textAlign: "left",
  },
  type8Wrapper: {
    borderRadius: Border.br_78xl,
    borderStyle: "solid",
    borderColor: Color.colorDarkgray_200,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_5xs,
    marginLeft: 10,
    alignItems: "center",
  },
  component32Parent: {
    marginTop: -206,
    marginLeft: -189,
    width: "100%",
  },
  myNews: {
    backgroundColor: Color.colorWhitesmoke,
    height: "100%", // Updated height for responsiveness
    width: "100%",
    flex: 1,
  },
  AppoinmentTextAndProfileRow: {
    flexDirection: "row",
    alignItems: "center",
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
    marginTop: 150,
    // Add margin for spacing
  },

  buttonTextAdd: {
    fontSize: 16,
    color: "white",
    alignItems: "center",
    left: "350%",
  },
  buttonContainer: {
    borderRadius: 97,
    backgroundColor: "#130160",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  btnsetcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    //top: 150,
    marginTop: 140,
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
  button1: {
    flex: 1,
    borderRadius: 97,
    backgroundColor: "#130160",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    color: "#FFFFFF",
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 14,
    color: "black",
    fontWeight: 900,
  },
  buttonText1: {
    fontSize: 14,
    color: "white",
    fontWeight: 900,
  },
  componentContainer: {
    width: 335,
    height: 100,
    top: 40,
    left: 15,
    marginBottom: 28,
    flexShrink: 0,
    backgroundColor: "#FFFFFF", //#fff
    shadowColor: "rgba(153, 171, 198, 0.18)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 62,
    shadowOpacity: 1,
    elevation: 8, // For Android shadow
    borderRadius: 8,
  },
  circularImage: {
    width: 52,
    height: 52,
    left: 20,
    top: 20,
    borderRadius: 8, // Half of the width and height to make it a circle
    marginRight: 16,
    backgroundColor: "white", // Spacing between the image and content
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    left: 100,
    top: -8,
  },
  textContainer1: {
    left: 50,
  },
  text: {
    color: "#0D0D26", // Change to your desired text color
    fontSize: 20,
    fontWeight: 700,
    fontWeight: "600",
    lineHeight: 18.2,
    letterSpacing: -0.14,
    width: 238,
    height: 38,
    top: -8,
  },
  dateText: {
    color: "#95969D", // Change to your desired text color
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 19.2,
    top: -20,
    letterSpacing: -0.12,
  },
  dateText1: {
    color: "#95969D", // Change to your desired text color
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 19.2,
    top: -20,
    letterSpacing: -0.12,
    left: 200,
    top: -90,
  },

  timeSlotText: {
    color: "#95969D", // Change to your desired text color
    textAlign: "right",
    fontSize: 12,
    left: -100,
    padding: 10,
    fontWeight: "500",
    lineHeight: 19.2,
    letterSpacing: -0.12,
  },

  verifyText: {
    fontSize: 15,
    fontWeight: 700,
    color: Color.colorDarkgray_100,
    marginLeft: 20, // Adjust the margin as needed
    marginTop: 10, // Adjust the margin as needed
    top: -20,
  },
  verifyText1: {
    fontSize: 20,
    fontWeight: 700,
    color: "#130160",
    marginLeft: 20, // Adjust the margin as needed
    marginTop: 10, // Adjust the margin as needed
    top: 130,
  },
  contentColumn: {
    flexDirection: "row",
    alignItems: "center",
    left: -100,
    top: 35,
  },
  iconsContainer: {
    flexDirection: "row",
    left: 45,
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

export default AdminApprovalGeneral;
