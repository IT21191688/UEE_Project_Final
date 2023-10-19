import * as React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import ModernDatePicker from "react-native-modern-datepicker";
import { RadioButton } from "react-native-paper";
import axios from "axios"; // Import Axios for making API requests
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddCertificates = () => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate("PaymentUI");
  };

  const [fullName, setFullName] = useState("");
  const [nic, setNic] = useState("");
  const [email, setEmail] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [certificateType, setCertificateType] = useState([]);
  const [serviceType, setServiceType] = useState([]);

  const [cetificate, setSetificate] = useState("");
  const [service, setService] = useState("");

  const additionalDocuments = ["hello", "hello"];
  useEffect(() => {
    const fetchCertificateAndServiceTypes = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.error("Token is missing in AsyncStorage");
          return;
        }
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Fetch certificate types
        const certificateTypeResponse = await axios.get(
          "https://uee123.onrender.com/api/v1/category/getAllCategories/?type=certificate",
          { headers }
        );

        if (certificateTypeResponse.data.isSuccessful) {
          const certificateTypeData = certificateTypeResponse.data.data;
          const certificateTypeInfo = certificateTypeData.map((ctp) => ({
            id: ctp._id,
            name: ctp.description,
          }));
          setCertificateType(certificateTypeInfo);
          console.log(certificateTypeInfo);
        } else {
          console.error(
            "Failed to fetch certificate types:",
            certificateTypeResponse.data.message
          );
        }

        // Fetch service types
        const serviceTypeResponse = await axios.get(
          "https://uee123.onrender.com/api/v1/category/getAllCategories/?type=serviceType",
          { headers }
        );

        if (serviceTypeResponse.data.isSuccessful) {
          const serviceTypeData = serviceTypeResponse.data.data;
          const serviceTypeInfo = serviceTypeData.map((stp) => ({
            id: stp._id,
            name: stp.description,
          }));
          setServiceType(serviceTypeInfo);
          console.log(serviceTypeInfo);
        } else {
          console.error(
            "Failed to fetch service types:",
            serviceTypeResponse.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCertificateAndServiceTypes();
  }, []);

  const handleAddCertificate = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in AsyncStorage");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      //console.log(fullName+nic+email+homeAddress+phoneNumber+certificateType+serviceType+additionalDocuments)

      /*Create a request body object with the certificate request details
            const requestBody = {
                fullName: fullName,
                nic: nic,
                email: email,
                homeAddress: homeAddress,
                phoneNumber: phoneNumber,
                certificate: "65227241484943893e37bf22", // Assuming certificateType is the selected certificate type
                serviceType: "65227386068658c5a5e1ae9a",
                additionalDocuments:additionalDocuments // Assuming serviceType is the selected service type
                 // Assuming additionalDocuments contains uploaded documents
            };*/

      const requestBody = {
        //ntains uploaded documents
        fullName: fullName,
        nic: nic,
        email: email,
        address: homeAddress,
        contactNumber: phoneNumber,
        certificate: cetificate,
        serviceType: service,
        additionalDocuments: ["null"],
      };

      const response = await axios.post(
        "https://uee123.onrender.com/api/v1/certificate/request",
        requestBody,
        { headers }
      );

      if (response.data.isSuccessful) {
        Alert.alert("Successfully Created Certificate Request");
        navigation.navigate("PaymentUI");
      } else {
        Alert.alert(
          "Failed to Create Certificate Request: " + response.data.message
        );
      }
    } catch (error) {
      console.error("Error creating certificate request:", error);
      Alert.alert("Failed to Create Certificate Request: " + error.message);
    }
  };

  const handleCertificateType = (value) => {
    // Handle the selected certificate type

    setSetificate(value);

    console.log("Selected Certificate Type:", value);
  };
  const handleServiceType = (value) => {
    // Handle the selected certificate type
    console.log("Selected Service Type:", value);
    setService(value);
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <Pressable
        style={styles.backButton}
        onPress={() => {
          navigation.goBack(); // Navigate back when pressed
        }}
      >
        <Text style={styles.backButtonText}>{"<"}</Text>
      </Pressable>

      <Text style={styles.appointmentText}>Request Certificates </Text>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Full name"
          placeholderTextColor="#AAA6B9"
          value={fullName}
          onChangeText={(text) => setFullName(text)} // Update state on change
        />
        <Text style={styles.sectionTitle}>NIC</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter NIC"
          placeholderTextColor="#AAA6B9"
          value={nic}
          onChangeText={(text) => setNic(text)} // Update state on change
        />
        <Text style={styles.sectionTitle}>Email address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email address"
          placeholderTextColor="#AAA6B9"
          value={email}
          onChangeText={(text) => setEmail(text)} // Update state on change
        />
        <Text style={styles.sectionTitle}>Home Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Home Address"
          placeholderTextColor="#AAA6B9"
          value={homeAddress}
          onChangeText={(text) => setHomeAddress(text)} // Update state on change
        />
        <Text style={styles.sectionTitle}>Phone number</Text>
        <TextInput
          style={styles.input}
          placeholder="+94 00 000 0000"
          placeholderTextColor="#AAA6B9"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)} // Update state on change
        />


<Text style={styles.sectionTitle}>Certficate Type</Text>
        <Picker
          style={styles.picker}
          selectedValue={cetificate} // Use cetificate as the selected value
          onValueChange={handleCertificateType} // Update state on change
        >
          {certificateType.map((ctp) => (
            <Picker.Item key={ctp.id} label={ctp.name} value={ctp.id} />
          ))}
        </Picker>

        <Text style={styles.sectionTitle}>Service Type</Text>
        <Picker
          style={styles.picker}
          selectedValue={service} // Use service as the selected value
          onValueChange={handleServiceType} // Update state on change
        >
          {serviceType.map((stp) => (
            <Picker.Item key={stp.id} label={stp.name} value={stp.id} />
          ))}
        </Picker>

        <Pressable style={styles.addButton}>
          <Text style={styles.buttonText} onPress={handleAddCertificate}>
            Proceed to Payment
          </Text>
        </Pressable>
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
  descriptionInput: {
    height: 140,
    top: -110,
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
    marginTop: -10,
    marginBottom: 70,
  },
  upload: {
    width: "70%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#130160",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 45,
    marginBottom: 60,
    top: 50,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default AddCertificates;
