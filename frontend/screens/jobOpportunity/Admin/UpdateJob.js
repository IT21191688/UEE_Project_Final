import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import axios from "axios";

const UpdateJob = ({ route, navigation }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [avgAnnualSalary, setAvgAnnualSalary] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { job } = route.params;

  useEffect(() => {
    setTitle(job.title);
    setType(job.type._id);
    setAvgAnnualSalary(job.avgAnnualSalary.toString());
    setDescription(job.description);
  }, [job]);

  const handleJobUpdate = () => {
    setLoading(true);
    setError("");

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTIxYTUxZTVhOThkNzYxZDM4NWU2NzkiLCJlbWFpbCI6Imthc3VuZEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTcxMDY5MTMsImV4cCI6MTY5NzcxMTcxM30.E1N9C8o55tO9B_iSCwHQGbNibojogGKlLM_SIj75jTk"; // Replace with your actual authentication token

    const updatedJobData = {
      title,
      type,
      avgAnnualSalary: parseFloat(avgAnnualSalary),
      description,
    };

    axios
      .put(
        `https://uee123.onrender.com/api/v1/job/update/${job._id}`,
        updatedJobData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          // Job updated successfully, you can navigate to a success page or perform other actions.
        } else {
          setError("An error occurred while updating the job.");
        }
      })
      .catch((error) => {
        setError("An error occurred while updating the job.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update Job</Text>
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
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <TouchableOpacity
        style={styles.updateButton}
        onPress={() => handleJobUpdate()}
      >
        {loading && <ActivityIndicator size="large" style={styles.loader} />}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Text style={styles.updateButtonText}>Update Job</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    padding: 12,
    marginTop: 20,
    width: 300,
    alignItems: "center",
  },
  updateButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default UpdateJob;
