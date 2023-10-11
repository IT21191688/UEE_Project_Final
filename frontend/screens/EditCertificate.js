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
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import ModernDatePicker from "react-native-modern-datepicker";
import { RadioButton } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Import Axios for making API requests

const EditCertificate = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [certificateType, setCertificateType] = useState([]);
    const [serviceType, setServiceType] = useState([]);
    const [certificate, setCertificate] = useState('65227227484943893e37bf1d');
    const [service, setService] = useState('65227386068658c5a5e1ae9a');
    const [fullname, setFullname] = useState('');
    const [nic, setNic] = useState('');
    const [email, setEmail] = useState('');
    const [homeAddress, setHomeAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [appId, setIDEd] = useState(''); // Added state for certificate ID
    const [certificateDetails, setCertificateDetails] = useState(null);

    const [fullNameEd, setfullnameEd] = useState('');
    const [nicEd, setnicEd] = useState('');
    const [emailEd, setemailEd] = useState('');
    const [homeAddressEd, sethomeAddressEd] = useState('');
    const [phoneNumberEd, setphoneNumberEd] = useState('');
    const [certificateEd, setcertificateEd] = useState('');
    const [serviceEd, setserviceEd] = useState('');
    
  
    const handleNavigate = () => {
      navigation.navigate('UpdateMsgCertificates');
    };
  
    useEffect(() => {
      const fetchCertificateAndServiceTypes = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          if (!token) {
            console.error('Token is missing in AsyncStorage');
            return;
          }
          const headers = {
            Authorization: `Bearer ${token}`,
          };
  
          // Fetch certificate types
          const certificateTypeResponse = await axios.get(
            'https://uee123.onrender.com/api/v1/category/getAllCategories/?type=certificate',
            { headers }
          );
  
          if (certificateTypeResponse.data.isSuccessful) {
            const certificateTypeData = certificateTypeResponse.data.data;
            const certificateTypeInfo = certificateTypeData.map((ctp) => ({
              id: ctp._id,
              name: ctp.description,
            }));
            setCertificateType(certificateTypeInfo);
          } else {
            console.error('Failed to fetch certificate types:', certificateTypeResponse.data.message);
          }
  
          // Fetch service types
          const serviceTypeResponse = await axios.get(
            'https://uee123.onrender.com/api/v1/category/getAllCategories/?type=serviceType',
            { headers }
          );
  
          if (serviceTypeResponse.data.isSuccessful) {
            const serviceTypeData = serviceTypeResponse.data.data;
            const serviceTypeInfo = serviceTypeData.map((stp) => ({
              id: stp._id,
              name: stp.description,
            }));
            setServiceType(serviceTypeInfo);
          } else {
            console.error('Failed to fetch service types:', serviceTypeResponse.data.message);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchCertificateAndServiceTypes();
      fetchCertificateDetails();
    }, []);

    

    const fetchCertificateDetails = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('Token is missing in AsyncStorage');
                return;
            }

            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            

            // Make a GET request to fetch appointment details by ID
            const response = await axios.get(
                `https://uee123.onrender.com/api/v1/certificate/getById/${route.params.certificateId}`,
                { headers }
            );

            if (response.data.isSuccessful) {
                const fetchedCertificate = response.data.data;
                setCertificateDetails(fetchedCertificate);
                // Pre-fill form fields with fetchedCertificate data
                setIDEd(fetchedCertificate._id);
                setfullnameEd(fetchedCertificate.fullName);
                setnicEd(fetchedCertificate.nic);
                setemailEd(fetchedCertificate.email);
                sethomeAddressEd(fetchedCertificate.address); // Set the initial value for home address
                setphoneNumberEd(fetchedCertificate.contactNumber);
                setcertificateEd(fetchedCertificate.certificate);
                setserviceEd(fetchedCertificate.serviceType);
            } else {
                console.error("Failed to fetch certificates:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching certificates:", error);
        }
    };


  
    const handleEditCertificate = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('Token is missing in AsyncStorage');
          return;
        }
        const headers = {
          Authorization: `Bearer ${token}`,
        };
  
        const requestBody = {
          nic: nicEd,
          email: emailEd,
          address: homeAddressEd,
          contactNumber: phoneNumberEd,
          certificate: certificateEd,
          serviceType: serviceEd,
          //additionalDocuments: ['test', 'test 02'], // Modify this based on your requirements
        };
  
        const response = await axios.patch(
          `https://uee123.onrender.com/api/v1/certificate/update/${appId}`,
          requestBody,
          { headers }
        );
  
        if (response.data.isSuccessful) {
          console.log('Successfully Edit Certificate');
          navigation.navigate('UpdateMsgCertificates'); // Navigating to the appropriate screen
        } else {
          console.error('Failed to Edit Certificate: ' + response.data.message);
          navigation.navigate('UpdateMsgCertificates');
        }
      } catch (error) {
        console.error('Error editing certificate:', error);
      }
    };
  return (
    <View style={styles.container}>
      {/* Back button */}
      <Pressable
        style={styles.backButton}
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </Pressable>

      <Text style={styles.appointmentText}>Edit Certificates</Text>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Full name"
          placeholderTextColor="#AAA6B9"
          value={fullNameEd}
          onChangeText={(text) => setfullnameEd(text)}
        />

        <Text style={styles.sectionTitle}>NIC</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter NIC"
          placeholderTextColor="#AAA6B9"
          value={nicEd}
          onChangeText={(text) => setnicEd(text)}
        />

        <Text style={styles.sectionTitle}>Email address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email address"
          placeholderTextColor="#AAA6B9"
          value={emailEd}
          onChangeText={(text) => setemailEd(text)}
        />

        <Text style={styles.sectionTitle}>Home Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Home Address"
          placeholderTextColor="#AAA6B9"
          value={homeAddressEd}
          onChangeText={(text) => sethomeAddressEd(text)}
        />

        <Text style={styles.sectionTitle}>Phone number</Text>
        <TextInput
          style={styles.input}
          placeholder="+94 00 000 0000"
          placeholderTextColor="#AAA6B9"
          value={phoneNumberEd}
          onChangeText={(text) => setphoneNumberEd(text)}
        />


<Text style={styles.sectionTitle}>Required Certificate type</Text>
        <Picker
          style={styles.picker}
          selectedValue={certificateEd}
          onValueChange={(value) => setcertificateEd(value)}>
          {certificateType.map((ctp, index) => (
            <Picker.Item key={ctp.id} label={ctp.name} value={ctp.id} />
          ))}
        </Picker>

        <Text style={styles.sectionTitle}>Service Type</Text>
        <Picker
          style={styles.picker}
          selectedValue={serviceEd}
          onValueChange={(value) => setserviceEd(value)}>
          {serviceType.map((stp, index) => (
            <Picker.Item key={stp.id} label={stp.name} value={stp.id} />
          ))}
        </Picker>


        <Text style={styles.sectionTitle}>Upload Additional Documents</Text>
        

        <Pressable style={styles.addButton}>
          <Text style={styles.buttonText} onPress={handleEditCertificate}>
            Submit
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
    marginTop: -60,
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

export default EditCertificate;
