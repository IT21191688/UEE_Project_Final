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

// Import an icon library, such as FontAwesome or Material Icons
import { FontAwesome5 } from "@expo/vector-icons"; // Example using FontAwesome5
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

// // Sample job data (mock data)
// const sampleJobData = {
//   isSuccessful: true,
//   timeStamp: "2023-10-07T19:29:03.501Z",
//   message: "Jobs fetched successfully",
//   data: [
//     {
//       _id: "6521ae01db68ff12c531a2f9",
//       title: "Software Engineer",
//       type: {
//         _id: "64f22756460e1b0a95ad43df",
//         name: "Full Time",
//         description: "Full-time position",
//         categoryType: "Senior designer",
//       },
//       avgAnnualSalary: 80000,
//       description:
//         "Join our team as a Software Engineer and work on exciting projects.",
//       status: 1,
//       organization: {
//         _id: "6521a51e5a98d761d385e67b",
//         orgName: "Tech Co.",
//         orgEmail: "info@techco.com",
//         orgAddress: "123 Main Street",
//         country: "United States",
//         orgImage: "techco-logo.png",
//         description: "Tech Co. is a leading technology company.",
//       },
//       addedBy: "6521a51e5a98d761d385e679",
//       createdAt: "2023-10-07T19:14:09.071Z",
//       updatedAt: "2023-10-07T19:14:09.071Z",
//     },
//     {
//       _id: "6521ae01db68ff12c531a2fa",
//       title: "Data Analyst",
//       type: {
//         _id: "64f22756460e1b0a95ad43de",
//         name: "Part Time",
//         description: "Part-time position",
//         categoryType: "Designer",
//       },
//       avgAnnualSalary: 50000,
//       description:
//         "Join our team as a Data Analyst and analyze data for meaningful insights.",
//       status: 1,
//       organization: {
//         _id: "6521a51e5a98d761d385e67c",
//         orgName: "Data Insights",
//         orgEmail: "info@datainsights.com",
//         orgAddress: "456 Elm Street",
//         country: "Canada",
//         orgImage: "datainsights-logo.png",
//         description: "Data Insights specializes in data analysis solutions.",
//       },
//       addedBy: "6521a51e5a98d761d385e679",
//       createdAt: "2023-10-07T19:15:09.071Z",
//       updatedAt: "2023-10-07T19:15:09.071Z",
//     },
//     {
//       _id: "6521ae01db68ff12c531a2fb",
//       title: "Frontend Developer",
//       type: {
//         _id: "64f22756460e1b0a95ad43df",
//         name: "Full Time",
//         description: "Full-time position",
//         categoryType: "Web Developer",
//       },
//       avgAnnualSalary: 75000,
//       description:
//         "We are looking for a talented Frontend Developer to join our team and create amazing web applications.",
//       status: 1,
//       organization: {
//         _id: "6521a51e5a98d761d385e67d",
//         orgName: "WebTech",
//         orgEmail: "info@webtech.com",
//         orgAddress: "789 Elm Street",
//         country: "United States",
//         orgImage: "webtech-logo.png",
//         description: "WebTech specializes in web development services.",
//       },
//       addedBy: "6521a51e5a98d761d385e67a",
//       createdAt: "2023-10-07T19:16:09.071Z",
//       updatedAt: "2023-10-07T19:16:09.071Z",
//     },
//     {
//       _id: "6521ae01db68ff12c531a2fc",
//       title: "UX Designer",
//       type: {
//         _id: "64f22756460e1b0a95ad43de",
//         name: "Part Time",
//         description: "Part-time position",
//         categoryType: "Designer",
//       },
//       avgAnnualSalary: 60000,
//       description:
//         "Join our creative team as a UX Designer and help shape user experiences for our products.",
//       status: 1,
//       organization: {
//         _id: "6521a51e5a98d761d385e67e",
//         orgName: "Design Innovations",
//         orgEmail: "info@designinnovations.com",
//         orgAddress: "123 Oak Street",
//         country: "United States",
//         orgImage: "designinnovations-logo.png",
//         description:
//           "Design Innovations focuses on innovative design solutions.",
//       },
//       addedBy: "6521a51e5a98d761d385e67a",
//       createdAt: "2023-10-07T19:17:09.071Z",
//       updatedAt: "2023-10-07T19:17:09.071Z",
//     },
//   ],
// };

const HomeScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Track the selected category

  const navigation = useNavigation();

  // Function to format salary in K (thousands)
  const formatSalary = (salary) => {
    if (salary >= 1000) {
      return `${(salary / 1000).toFixed(1)}K`;
    }
    return salary.toString();
  };

  useEffect(() => {
    const apiUrl = "https://uee123.onrender.com/api/v1/job/allJobs";
    const bearerToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTIxYTUxZTVhOThkNzYxZDM4NWU2NzkiLCJlbWFpbCI6Imthc3VuZEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTY3MDY5MzIsImV4cCI6MTY5NzMxMTczMn0.ofeqwQDSByMlCfggIM_XNuIIqzC1UMmRmEZK-9cb1Y8";
    const headers = {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
      // Other headers if needed
    };
    // Use Axios to fetch job data
    axios
      .get(apiUrl, { headers }) // Use the get method and pass the headers
      .then((response) => {
        console.log("Response:", response);
        const data = response.data;
        console.log("Job data:", data);
        if (data.isSuccessful) {
          setJobs(data.data);
          setFilteredJobs(data.data);
          const uniqueCategories = Array.from(
            new Set(data.data.map((job) => job.type.categoryType))
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

  // useEffect(() => {
  //   const data = sampleJobData;

  //   if (data.isSuccessful) {
  //     setJobs(data.data);
  //     setFilteredJobs(data.data);
  //     // Extract and set unique categories
  //     const uniqueCategories = Array.from(
  //       new Set(data.data.map((job) => job.type.categoryType))
  //     );
  //     setCategories(uniqueCategories);
  //   } else {
  //     console.error("Failed to fetch job data:", data.message);
  //   }
  // }, []);

  const handleFilter = (categoryType) => {
    if (categoryType === "All") {
      setSelectedCategory("All");
      setFilteredJobs(jobs); // Show all jobs
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.header}>Featured Jobs</Text> */}
      <View style={styles.filterContainer}>
        {/* "All" filter button placed outside the ScrollView */}
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
        <TouchableOpacity key={job._id} onPress={() => handleJobPress(job)}>
          <View style={styles.jobCard} key={job._id}>
            <View style={styles.jobInfo}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.organization}>
                {job.organization.orgName}, {job.organization.orgAddress}
              </Text>
              {/* <Text style={styles.jobType}>{job.type.name}</Text> */}
              <Text style={styles.jobSalary}>
                Salary: {formatSalary(job.avgAnnualSalary)}/year
              </Text>
              <Text style={styles.jobDescription}>{job.description}</Text>
            </View>
            {/* Move the "Apply" button inside the jobCard */}
            <View style={styles.applyButtonContainer}>
              <Text style={styles.jobType}>{job.type.name}</Text>
              <Text style={styles.categoryText}>{job.type.categoryType}</Text>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => handleApply(job)}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>

              {/* <Text style={styles.organization}>Posted on: {job.createdAt}</Text> */}
            </View>
          </View>
        </TouchableOpacity>
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
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
    flexDirection: "column", // Change to column layout
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
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  jobSalary: {
    color: "blue",
    marginTop: 4,
  },
  jobDescription: {
    marginTop: 8,
    marginBottom: 12,
  },
  organization: {
    color: "#777",
  },
  applyButtonContainer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between", // Add this line to create space between elements
    alignItems: "center", // Center the elements vertically
  },
  jobType: {
    fontSize: 16,
    color: "#fff", // Change text color to white
    backgroundColor: "#ccc", // Gray background color
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  categoryText: {
    fontSize: 16,
    color: "#fff", // Change text color to white
    backgroundColor: "#ccc", // Gray background color
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
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

export default HomeScreen;
