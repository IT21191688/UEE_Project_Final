import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";

const ApplyForm = ({ route }) => {
  const { job } = route.params;
  console.log("job", job._id);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fileName, setFileName] = useState("");

  console.log("selectedFile", selectedFile);

  const apply = async () => {
    if (!fullName || !email || !selectedFile) {
      // Check if required fields are missing
      alert("Please fill in all required fields and select a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("mobileNumber", phoneNumber);
      formData.append("resume", {
        name: selectedFile.assets[0].name,
        type: "application/pdf",
        uri: selectedFile.uri,
      });

      const apiUrl = `https://uee123.onrender.com/api/v1/job/apply/${job._id}`;

      const bearerToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTIxYTFlZjVhOThkNzYxZDM4NWU2NmEiLCJlbWFpbCI6InRoYW51amFkQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk3MTAzODgxLCJleHAiOjE2OTc3MDg2ODF9.otf6goKGZq80rExh0UL2KHxuciQq0BAAcob-UWeMbPI"; // Replace with your actual token
      const headers = {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "multipart/form-data",
      };

      console.log("formData", selectedFile.uri);

      const response = await axios.post(apiUrl, formData, { headers });

      if (response.status === 200) {
        alert("Application submitted successfully!");
      } else {
        alert("Application submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert(
        "An error occurred while submitting your application. Please try again later."
      );
    }
  };

  const handleFilePick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    if (result.type === "cancel") {
      return;
    }

    setSelectedFile(result);
    setFileName(result.assets[0].name);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading} textAlign="center">
        {job.title}
      </Text>
      <Text style={styles.orgName} textAlign="center">
        {job.organization.orgName}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          onChangeText={(text) => setFullName(text)} // Handle full name input changes
          value={fullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)} // Handle email input changes
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          onChangeText={(text) => setPhoneNumber(text)} // Handle phone number input changes
          value={phoneNumber}
        />
      </View>
      {selectedFile ? (
        <View style={styles.selectedFileContainer}>
          <View style={styles.selectedFileDetails}>
            <Text style={styles.selectedFileName}>
              {selectedFile.assets[0].name}
            </Text>
            <Text style={styles.selectedFileSize}>
              {Math.round((selectedFile.assets[0].size / 1024) * 100) / 100} KB
            </Text>
          </View>
          <TouchableOpacity onPress={handleRemoveFile}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.uploadButton} onPress={handleFilePick}>
          <Text style={styles.uploadButtonText}>Upload CV (PDF)</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.submitButton} onPress={apply}>
        <Text style={styles.submitButtonText}>Apply Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  orgName: {
    fontSize: 18,
    marginBottom: 16,
    color: "gray",
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    width: "100%",
  },
  uploadButton: {
    backgroundColor: "blue",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
  },
  selectedFileContainer: {
    alignItems: "center",
    backgroundColor: "#e5f7ff", // Light blue background
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    width: "100%",
  },
  selectedFileDetails: {
    alignItems: "center",
    marginBottom: 8, // Add margin between file details
  },
  selectedFileName: {
    color: "green",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4, // Add margin between file name and size
  },
  selectedFileSize: {
    color: "gray",
    fontSize: 14,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  removeButtonText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "blue",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    width: "100%",
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ApplyForm;
