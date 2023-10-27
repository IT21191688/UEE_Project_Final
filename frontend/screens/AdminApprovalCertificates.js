import * as React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Picker } from "@react-native-picker/picker"; // Correct import
import { TouchableOpacity } from "react-native";
import { Alert } from "react-native";

const AdminApprovalCertificates = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [certificateDetails, setCertificateDetails] = useState(null);

  const status = [
    {
      id: 2,
      status: "Pending",
    },
    {
      id: 3,
      status: "Approve",
    },
    {
      id: 4,
      status: "Reject",
    },
  ];

  function findStatus(id) {
    const slot = status.find((slot) => slot.id === id);
    if (slot) {
      if (slot.status === "Approve") {
        return { text: slot.status, color: "green" };
      } else if (slot.status === "Reject") {
        return { text: slot.status, color: "red" };
      } else if (slot.status === "Pending") {
        return { text: slot.status, color: "blue" };
      }
    }
    return { text: "Not Found", color: "black" };
  }
  useEffect(() => {
    const { certificateId } = route.params;

    const getCertificateDetails = async (certificateId) => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.error("Token is missing in AsyncStorage");
          return;
        }
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        console.log(headers);
        console.log(token);

        // Make a GET request to fetch appointment details by ID

        const response = await axios.get(
          `https://uee123.onrender.com/api/v1/certificate/getById/${certificateId}`,
          { headers }
        );

        if (response.data.isSuccessful) {
          const fetchedCertificates = response.data.data;
          setCertificateDetails(fetchedCertificates);
          console.log("Fetched Certficates:", fetchedCertificates);
        } else {
          console.error("Failed to fetch Certficates:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching Certficates:", error);
      }
    };

    getCertificateDetails(certificateId);
  }, [route.params]);

  const handleApprove = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in AsyncStorage");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        `https://uee123.onrender.com/api/v1/certificate/approveReject/${certificateDetails._id}?status=3`,
        null, // You can pass an empty body for this action
        { headers }
      );

      if (response.data.isSuccessful) {
        Alert.alert("Certficates Approved");
        navigation.navigate("ApprovedMsg");
        // You may want to refresh the appointment details or navigate to another screen.
      } else {
        Alert.alert("Failed to Approve Certificate: " + response.data.message);
        navigation.navigate("ApprovedMsg");
      }
    } catch (error) {
      console.error("Error approving certficate:", error);
      Alert.alert("Failed to Approve certficate: " + error.message);
    }
  };

  const handleReject = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in AsyncStorage");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        `https://uee123.onrender.com/api/v1/certificate/approveReject/${certificateDetails._id}?status=4`,
        null, // You can pass an empty body for this action
        { headers }
      );

      if (response.data.isSuccessful) {
        Alert.alert("Certficates Rejected");
        navigation.navigate("RejectMsg");
        // You may want to refresh the appointment details or navigate to another screen.
      } else {
        Alert.alert("Failed to Reject certificate: " + response.data.message);
        navigation.navigate("RejectMsg");
      }
    } catch (error) {
      console.error("Error rejecting certficate:", error);
      Alert.alert("Failed to Approve certficate: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.backButtonText}>{"<"}</Text>
      </Pressable>

      <Text style={styles.appointmentText}>Admin Approvel</Text>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Full Name</Text>
        <TextInput style={styles.input}>
          {certificateDetails && <Text>{certificateDetails.fullName}</Text>}
        </TextInput>
        <Text style={styles.sectionTitle}>NIC</Text>

        <TextInput style={styles.input}>
          {certificateDetails && <Text>{certificateDetails.nic}</Text>}
        </TextInput>

        <Text style={styles.sectionTitle}>E mail</Text>
        <TextInput style={styles.input}>
          {certificateDetails && <Text>{certificateDetails.email}</Text>}
        </TextInput>

        <Text style={styles.sectionTitle}>Address</Text>
        <TextInput style={styles.input}>
          {certificateDetails && <Text>{certificateDetails.address}</Text>}
        </TextInput>

        <Text style={styles.sectionTitle}>contact Number</Text>
        <TextInput style={styles.input}>
          {certificateDetails && (
            <Text>{certificateDetails.contactNumber}</Text>
          )}
        </TextInput>

        <Text style={styles.sectionTitle}>Certficate Type</Text>
        <TextInput style={styles.input}>
          {certificateDetails && <Text>{certificateDetails.certificate}</Text>}
        </TextInput>

        <Text style={styles.sectionTitle}>service Type</Text>
        <TextInput style={styles.input}>
          {certificateDetails && <Text>{certificateDetails.serviceType}</Text>}
        </TextInput>

        <Pressable style={styles.button}>
          <Text
            style={{
              ...styles.buttonText,
              color: certificateDetails
                ? findStatus(certificateDetails.status).color
                : "black",
            }}
          >
            {certificateDetails
              ? findStatus(certificateDetails.status).text
              : "Loading..."}
          </Text>
        </Pressable>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.approveButton]}
            onPress={() => handleApprove()}
          >
            <Text style={styles.buttonText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.rejectButton]}
            onPress={() => handleReject()}
          >
            <Text>Reject</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.textNote}>
          Note: After approval, this certificate will be automatically sent to
          the user via internal government postal services.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFD",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 16,
  },
  backButtonText: {
    color: "#130160",
    fontSize: 16,
  },
  appointmentText: {
    color: "#150B3D",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
    textAlign: "center",
  },
  form: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#150B3D",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#AAA6B9",
    borderRadius: 8,
    paddingLeft: 16,
    marginBottom: 16,
    color: "#130160",
  },
  picker: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#AAA6B9",
    borderRadius: 8,
    marginBottom: 16,
  },
  addButton: {
    width: "100%",
    height: 60,
    borderRadius: 10,
    backgroundColor: "#130160",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -60,
    marginBottom: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20, // Adjust the margin as needed
    top: -12,
  },

  button: {
    flex: 1,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginRight: 10,
    // Add any common button styles here
  },

  approveButton: {
    backgroundColor: "#130160", // Adjust the color as needed
  },

  rejectButton: {
    borderColor: "#130160", // Set the border color
    borderWidth: 2, // You can adjust the border width as needed
    color: "black", // This sets the text color to white
    textAlign: "center", // Center the text horizontally
    fontWeight: "bold", // Make the text bold if needed
    fontSize: 16, // Adjust the font size as desired
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  textNote: {
    color: "#95969D",
    left: 35,
    marginBottom: 20,
  },
});

export default AdminApprovalCertificates;
