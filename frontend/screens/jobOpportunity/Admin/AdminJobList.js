import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation, useAuth } from "@react-navigation/native";

const FeaturedJobList = () => {
  // const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigation = useNavigation();

  const formatSalary = (salary) => {
    if (salary >= 1000) {
      return `${(salary / 1000).toFixed(1)}K`;
    }
    return salary.toString();
  };

  useEffect(() => {
    const apiUrl = "https://uee123.onrender.com/api/v1/job/allJobs";
    const bearerToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTIxYTUxZTVhOThkNzYxZDM4NWU2NzkiLCJlbWFpbCI6Imthc3VuZEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTcxMDY5MTMsImV4cCI6MTY5NzcxMTcxM30.E1N9C8o55tO9B_iSCwHQGbNibojogGKlLM_SIj75jTk"; // Assuming the user object contains the token.
    const headers = {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    };

    axios
      .get(apiUrl, { headers })
      .then((response) => {
        const data = response.data;
        if (data.isSuccessful) {
          // Filter jobs based on the user's ID
          const filtered = data.data.filter(
            (job) => job.addedBy === "6521a51e5a98d761d385e679"
          );
          setJobs(filtered);
          setFilteredJobs(filtered);
          const uniqueCategories = Array.from(
            new Set(filtered.map((job) => job.type.categoryType))
          );
          setCategories(uniqueCategories);
        } else {
          console.error("Failed to fetch job data:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching job data:", error);
      });
  }, []);

  const handleFilter = (categoryType) => {
    if (categoryType === "All") {
      setSelectedCategory("All");
      setFilteredJobs(jobs);
    } else {
      setSelectedCategory(categoryType);
      const filtered = jobs.filter(
        (job) => job.type.categoryType === categoryType
      );
      setFilteredJobs(filtered);
    }
  };

  const handleJobPress = (job) => {
    navigation.navigate("SingleJobScreen", { job: job });
  };

  const handleApply = (job) => {
    console.log("Apply for job:", job);
    navigation.navigate("ApplyForm", { job: job });
  };

  const handleUpdateJob = (job) => {
    console.log("Update job:", job);
    // Navigate to the job update screen, passing the job data as a parameter
    navigation.navigate("UpdateJob", { job: job });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.filterContainer}>
        <View style={styles.filterScrollView}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedCategory === "All" && styles.selectedFilterButton,
            ]}
            onPress={() => handleFilter("All")}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedCategory === "All" && styles.selectedFilterButtonText,
              ]}
            >
              <FontAwesome5
                name="list"
                size={20}
                color={selectedCategory === "All" ? "#fff" : "#555"}
              />
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.filterScrollView}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((categoryType, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterButton,
                selectedCategory === categoryType &&
                  styles.selectedFilterButton,
              ]}
              onPress={() => handleFilter(categoryType)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedCategory === categoryType &&
                    styles.selectedFilterButtonText,
                ]}
              >
                {categoryType}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {filteredJobs.map((job) => (
        <View key={job._id}>
          {/* <View onPress={() => handleJobPress(job)}> */}
          <View style={styles.jobCard}>
            <View style={styles.jobSaveButtonContainer}>
              <TouchableOpacity
                style={styles.jobSaveButton}
                onPress={() => handleUpdateJob(job)}
              >
                <Text style={styles.jobSaveButtonText}>Update</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.jobInfo}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.organization}>
                {job.organization.orgName} . {job.organization.orgAddress}
              </Text>
              <Text style={styles.jobSalary}>
                $ {formatSalary(job.avgAnnualSalary)}/year
              </Text>
            </View>
            <View style={styles.applyButtonContainer}>
              <Text style={styles.jobType}>{job.type.name}</Text>
              <Text style={styles.categoryText}>{job.type.categoryType}</Text>
            </View>
          </View>
          {/* </View> */}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
  },
  selectedFilterButton: {
    backgroundColor: "blue",
  },
  filterButtonText: {
    color: "#333",
  },
  selectedFilterButtonText: {
    color: "#fff",
  },
  jobCard: {
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  jobSaveButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  jobSaveButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  jobSalary: {
    color: "blue",
    marginTop: 4,
    marginBottom: 8,
    fontSize: 20,
    fontWeight: "bold",
  },
  organization: {
    color: "#777",
  },
  applyButtonContainer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  jobType: {
    fontSize: 16,
    color: "#fff",
    backgroundColor: "blue",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  categoryText: {
    fontSize: 16,
    color: "#fff",
    backgroundColor: "blue",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  jobSaveButtonText: {
    color: "blue",
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: "blue",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default FeaturedJobList;
