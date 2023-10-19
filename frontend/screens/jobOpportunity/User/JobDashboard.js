import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import FeaturedJobList from "./FeaturedJobList";

const JobDashboard = () => {
  const [userDetails, setUserDetails] = useState({});
  const [featuredJobsCount, setFeaturedJobsCount] = useState(0);
  const [savedJobsCount, setSavedJobsCount] = useState(0);
  const [appliedJobsCount, setAppliedJobsCount] = useState(0);
  const [expiredJobsCount, setExpiredJobsCount] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    // Fetch user details from API and update state
    fetchUserDetails().then((details) => setUserDetails(details));

    // Fetch job counts from API and update state
    fetchJobCounts().then((counts) => {
      setFeaturedJobsCount(counts.featured);
      setSavedJobsCount(counts.saved);
      setAppliedJobsCount(counts.applied);
      setExpiredJobsCount(counts.expired);
    });
  }, []);

  const fetchUserDetails = async () => {
    // Make API call to fetch user details
    const response = await fetch("/api/user/details");
    const data = await response.json();
    return data;
  };

  const fetchJobCounts = async () => {
    // Make API call to fetch job counts
    const response = await fetch("/api/jobs/counts");
    const data = await response.json();
    return data;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {userDetails.firstName} {userDetails.lastName}
      </Text>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("FeaturedJobList")}
        >
          <Text style={styles.cardTitle}>Featured Jobs</Text>
          <Text style={styles.cardCount}>{featuredJobsCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("SavedJobs")}
        >
          <Text style={styles.cardTitle}>Saved Jobs</Text>
          <Text style={styles.cardCount}>{savedJobsCount}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("AppliedJobs")}
        >
          <Text style={styles.cardTitle}>Applied Jobs</Text>
          <Text style={styles.cardCount}>{appliedJobsCount}</Text>
        </TouchableOpacity>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Expired Jobs</Text>
          <Text style={styles.cardCount}>{expiredJobsCount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardCount: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default JobDashboard;
