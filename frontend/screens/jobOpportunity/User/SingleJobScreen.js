import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

const SingleJobScreen = ({ route }) => {
  const { job } = route.params;
  const [selectedTab, setSelectedTab] = useState("description"); // Initially, display the description tab
  const navigator = useNavigation();

  const renderTabContent = () => {
    switch (selectedTab) {
      case "description":
        return <Text style={styles.jobDetail}>{job.description}</Text>;
      case "requirements":
        return <Text style={styles.jobDetail}>Requirements go here.</Text>;
      case "about":
        return (
          <Text style={styles.jobDetail}>Company information goes here.</Text>
        );
      case "reviews":
        return <Text style={styles.jobDetail}>Reviews go here.</Text>;
      default:
        return null;
    }
  };

  const handleApply = (job) => {
    navigator.navigate("ApplyForm", { job: job });
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.orgName}>{job.organization.orgName}</Text>
          <View style={styles.salaryAndAddressContainer}>
            <Text style={styles.leftText}>{job.avgAnnualSalary}/year</Text>
            <Text style={styles.rightText}>
              {job.organization.orgAddress}, {job.organization.country}
            </Text>
          </View>
        </View>
        <ScrollView
          style={styles.filterScrollView}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.tabButtons}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === "description" && styles.activeTabButton,
              ]}
              onPress={() => setSelectedTab("description")}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  selectedTab === "description" && styles.activeTabButtonText,
                ]}
              >
                Description
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === "requirements" && styles.activeTabButton,
              ]}
              onPress={() => setSelectedTab("requirements")}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  selectedTab === "requirements" && styles.activeTabButtonText,
                ]}
              >
                Requirements
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === "about" && styles.activeTabButton,
              ]}
              onPress={() => setSelectedTab("about")}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  selectedTab === "about" && styles.activeTabButtonText,
                ]}
              >
                About
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === "reviews" && styles.activeTabButton,
              ]}
              onPress={() => setSelectedTab("reviews")}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  selectedTab === "reviews" && styles.activeTabButtonText,
                ]}
              >
                Reviews
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.tabContent}>{renderTabContent()}</View>
      </ScrollView>
      <View>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => handleApply(job)}
        >
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  centerContainer: {
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  orgName: {
    fontSize: 18,
    marginBottom: 8,
    color: "gray",
  },
  salaryAndAddressContainer: {
    // marginHorizontal: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  leftText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "left", // Align text to the left
    flex: 1, // Take up available space on the left
  },
  rightText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "right", // Align text to the right
    flex: 1, // Take up available space on the right
  },
  tabButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 12, // Add horizontal padding to increase space between buttons
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: "blue",
  },
  activeTabButtonText: {
    color: "white", // Set the text color to white
    fontWeight: "bold", // You can adjust the font weight if needed
  },
  tabButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  tabContent: {
    marginVertical: 16,
  },
  jobDetail: {
    fontSize: 16,
    marginBottom: 8,
  },
  applyButton: {
    backgroundColor: "blue",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  applyButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SingleJobScreen;
