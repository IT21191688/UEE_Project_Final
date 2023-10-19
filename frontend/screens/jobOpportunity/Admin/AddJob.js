import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [avgAnnualSalary, setAvgAnnualSalary] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const handleJobSubmit = async () => {
    setLoading(true);
    setError("");

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTIxYTUxZTVhOThkNzYxZDM4NWU2NzkiLCJlbWFpbCI6Imthc3VuZEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTcxMDY5MTMsImV4cCI6MTY5NzcxMTcxM30.E1N9C8o55tO9B_iSCwHQGbNibojogGKlLM_SIj75jTk";

    const jobData = {
      title,
      type: "64f22756460e1b0a95ad43df",
      avgAnnualSalary,
      description,
    };

    console.log(jobData);

    try {
      const response = await fetch(
        "https://uee123.onrender.com/api/v1/job/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(jobData),
        }
      );

      if (response.ok) {
        navigation.navigate("SuccessNotify");
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred while adding the job.");
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setTitle("");
    setType("");
    setAvgAnnualSalary("");
    setDescription("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Admin Add Job</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Type"
        value={type}
        onChangeText={(text) => setType(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Average Annual Salary"
        value={avgAnnualSalary}
        onChangeText={(text) => setAvgAnnualSalary(text)}
      />
      <TextInput
        style={styles.descriptionInput}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleJobSubmit}>
        {loading && <ActivityIndicator size="large" style={styles.loader} />}
        <Text style={styles.buttonText}>Add Job</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={clearForm}>
        <Text style={styles.buttonText}>Clear Form</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  descriptionInput: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default AddJob;
