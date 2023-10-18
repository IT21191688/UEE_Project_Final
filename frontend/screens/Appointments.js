import * as React from "react";
import { ScrollView, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Pressable, FlatList } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width } = Dimensions.get('window');

const isSmallScreen = width < 360;



const Appointments = () => {

  const navigation = useNavigation();

  const [appointments, setAppointments] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All"); // Initialize with "All"
  const [filteredAppointments, setFilteredAppointments] = useState(appointments);

  const [isLoading, setIsLoading] = useState(true);



  const timeSlots = [
    {
      id: 1,
      timeSlot: "9:00 AM - 09:30 AM",
    },
    {
      id: 2,
      timeSlot: "09:30 AM - 10:00 AM",
    },
    {
      id: 3,
      timeSlot: "10:00 AM - 10:30 AM",
    },
    {
      id: 4,
      timeSlot: "10:30 AM - 11:00 AM",
    },
    {
      id: 5,
      timeSlot: "11:00 AM - 11:30 AM",
    },
    {
      id: 6,
      timeSlot: "11:30 AM - 12:00 PM",
    },
    {
      id: 7,
      timeSlot: "12:00 PM - 12:30 PM",
    },
    {
      id: 8,
      timeSlot: "12:30 PM - 1:00 PM",
    },
    {
      id: 9,
      timeSlot: "01:00 PM - 1:30 PM",
    },
    {
      id: 10,
      timeSlot: "01:30 PM - 2:00 PM",
    },
    {
      id: 11,
      timeSlot: "03:00 PM - 3:30 PM",
    },
    {
      id: 12,
      timeSlot: "03:30 PM - 4:00 PM",
    },
    {
      id: 13,
      timeSlot: "04:00 PM - 4:30 PM",
    },
    {
      id: 14,
      timeSlot: "04:30 PM - 5:00 PM",
    },
  ];



  useEffect(() => {
    setIsLoading(true); // Set loading to true
    console.log("Hello");

    fetchAppointments();
  }, []);

  function forceRerender() {
    this.forceUpdate();
  }

  const fetchAppointments = async () => {
    try {

      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('Token is missing in AsyncStorage');
        return;
      }
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      // Make an API GET request to fetch appointments
      const response = await axios.get(
        "https://uee123.onrender.com/api/v1/appointment/getAppointments", { headers }
      );

      if (response.data.isSuccessful) {
        const fetchedAppointments = response.data.data;
        setAppointments(fetchedAppointments);


        console.log(fetchedAppointments);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch appointments:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      // Set loading state to false when data is fetched
      setIsLoading(false);
      handleAllClick();
    }
  };


  const handleAppointmentView = (id) => {
    console.log(id)
    navigation.navigate('AppointmentView', { appointmentId: id })
  };

  const handleAddNewAppointment = () => {
    // Use navigation.navigate to navigate to the desired screen
    navigation.navigate("AddAppointment"); // Replace "AddAppointment" with the name of the screen you want to navigate to
  };

  function findTimeSlotById(id) {
    return timeSlots.find(slot => slot.id === id);
  }

  const handlePendingClick = () => {
    setSelectedStatus(2); // Use numeric value
    filterAppointments(2); // Use numeric value
  };

  const handleApprovedClick = () => {
    setSelectedStatus(3); // Use numeric value
    filterAppointments(3); // Use numeric value
  };

  const handleDeclinedClick = () => {
    setSelectedStatus(4); // Use numeric value
    filterAppointments(4); // Use numeric value
  };

  const handleAllClick = () => {
    //setSelectedStatus("All");

    setFilteredAppointments(appointments); // Show all appointments
  };

  const filterAppointments = (status) => {
    const filtered = appointments.filter((appointment) => appointment.status === status);
    setFilteredAppointments(filtered);
  };

  const [searchQuery, setSearchQuery] = useState(''); // State to capture the search query

  const handleSearch = (query) => {
    setSearchQuery(query); // Update the search query state

    const filtered = appointments.filter((appointment) => {
      const appointmentTitle = appointment.title.toLowerCase();
      return appointmentTitle.includes(query.toLowerCase());
    });

    setFilteredAppointments(filtered);
  };

  const handleMainPage = () => {

    console.log("Press")
    navigation.navigate('UserHomePage')
  }

  const calculateRemainingTime = (inputDate, timeSlot) => {
    if (!inputDate || !timeSlot || !timeSlot.timeSlot) {
      return "Invalid input data";
    }

    const now = new Date();
    const appointmentDateTime = new Date(inputDate);

    // Extract the start time from the timeSlot
    const timeParts = timeSlot.timeSlot.split('-');

    if (timeParts.length !== 2) {
      return "Invalid time slot format";
    }

    // Extract and parse the start time
    const startTime = timeParts[0].trim();
    const timeFormat = /(\d+:\d+\s[APap][Mm])/;
    const startTimeMatch = startTime.match(timeFormat);

    if (!startTimeMatch) {
      return "Invalid time format";
    }

    const startTimeParts = startTimeMatch[0].split(':');
    const hours = parseInt(startTimeParts[0], 10);
    const minutes = parseInt(startTimeParts[1].slice(0, 2), 10);

    // Calculate the start time based on the input date
    const startDateTime = new Date(appointmentDateTime);
    startDateTime.setHours(hours);
    startDateTime.setMinutes(minutes);

    // Calculate the difference in milliseconds
    const timeDifference = startDateTime - now;

    // Convert the time difference to hours and minutes
    const hoursRemaining = Math.floor(timeDifference / 3600000);
    const minutesRemaining = Math.floor((timeDifference % 3600000) / 60000);

    return `${hoursRemaining}h ${minutesRemaining}m`;
  };

  const findColor = (time) => {
    // Split the time string into hours and minutes
    const [hours, minutes] = time.split('h ').map((part) => parseInt(part, 10));

    // Calculate the total time in minutes
    const totalTimeInMinutes = hours * 60 + minutes;

    // Check if the total time is less than or equal to 60 minutes (1 hour)
    if (totalTimeInMinutes <= 60) {
      return 'red'; // Color for less than 1 hour
    } else {
      return '#FF9228'; // Color for 1 hour or more
    }
  };

  return (
    <View style={styles.myNews}>
      {/* Rectangle */}
      <Image
        style={[styles.myNewsChild, styles.searchPosition]}
        contentFit="cover"
        source={require("../assets/rectangle-5.png")}
      />

      <View style={styles.AppoinmentTextAndProfile}>
        <Image
          style={styles.ellipseIcon}
          contentFit="cover"
          source={require("../assets/ellipse.png")}
        />
        <View style={styles.headlineParent}>
          <TouchableOpacity onPress={handleMainPage}>
            <Text style={[styles.headline1, styles.headlineFlexBox]} >
              Appointments
            </Text>
          </TouchableOpacity>

        </View>
      </View>



      {/*profile*/}

      <View style={styles.header}>

        <TouchableOpacity >
          <Image
            style={styles.filterIcon}
            contentFit="cover"
            source={require("../assets/filter.png")}
          />
        </TouchableOpacity>
        <View style={[styles.search, styles.headerLayout]}>
          <Image
            style={styles.searchChild}
            contentFit="cover"
            source={require("../assets/rectangle-3.png")}
          />
          <Image
            style={styles.iconSearch}
            contentFit="cover"
            source={require("../assets/icon-search.png")}
          />
          <TextInput
            onChangeText={handleSearch} // Handle search on text input change
            value={searchQuery}
            style={[styles.search1]}
            placeholder="Search"
            placeholderTextColor="rgba(13, 1, 64, 0.6)"
          />
        </View>
      </View>
      {/* Header */}

      <TouchableOpacity
        style={styles.newAppointment}
        onPress={handleAddNewAppointment}
      >
        <Text style={styles.buttonTextAdd}>Add new Appointment</Text>
      </TouchableOpacity>
      <View style={styles.btnsetcontainer}>
        <Pressable
          style={[
            styles.button,
            selectedStatus === 4 && styles.selectedButton,
          ]}
          onPress={handleAllClick}
        >
          <Text
            style={[
              styles.buttonText,
              selectedStatus === 4 && styles.selectedButtonText,
            ]}
          >
            All
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            selectedStatus === 2 && styles.selectedButton,
          ]}
          onPress={handlePendingClick}
        >
          <Text
            style={[
              styles.buttonText,
              selectedStatus === 2 && styles.selectedButtonText,
            ]}
          >
            Pending
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            selectedStatus === 3 && styles.selectedButton,
          ]}
          onPress={handleApprovedClick}
        >
          <Text
            style={[
              styles.buttonText,
              selectedStatus === 3 && styles.selectedButtonText,
            ]}
          >
            Approved
          </Text>
        </Pressable>

      </View>



      <ScrollView style={styles.scroller} >

        <FlatList

          data={isLoading ? [] : filteredAppointments}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={() => (
            <Text>No appointments available</Text>
          )}
          renderItem={({ item, index }) => {
            const foundTimeSlot = findTimeSlotById(item.appointmentTime);
            const time = calculateRemainingTime(item.appointmentDate, foundTimeSlot)

            const color = findColor(time)
            //const remainingTime = calculateRemainingTime(item.appointmentDate, foundTimeSlot)
            return (
              <TouchableOpacity
                key={index}
                style={styles.appointmentItem}
                onPress={() => handleAppointmentView(item._id)}
              >
                <Image
                  source={require("../assets/ellipse.png")}
                  style={styles.circularImage}
                />
                <View style={styles.appointmentDetails}>
                  <Text style={styles.appointmentTitle}>{item.title} {"   "} {item.appointmentTime}</Text>
                  <Text style={styles.appointmentDate}>
                    {new Date(item.appointmentDate).toLocaleDateString("en-US")}
                  </Text>
                  <Text style={styles.appointmentTimeSlot}>

                    {foundTimeSlot ? foundTimeSlot.timeSlot : "Not Found"}


                  </Text>
                  <Text style={[styles.remaining, { color: color }]}>{time} Remaining</Text>

                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>


    </View>
  );
};


const styles = StyleSheet.create({
  scrollableSectionScrollViewContent: {
    flexDirection: "column",
    paddingBottom: 100, // Updated paddingBottom for responsiveness
    alignItems: "center",
    justifyContent: "flex-start",
  },
  frameScrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollableSectionPosition: {
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  searchPosition: {
    left: 0,
    top: 0,
  },
  headlineFlexBox: {
    display: "flex",
    color: Color.pureWhite,
    alignItems: "center",
    textAlign: "left",
    width: "100%", // Updated width for responsiveness
    left: 0,
    position: "absolute",
  },
  headerLayout: {
    height: 40,
    position: "absolute",
  },
  type8Typo: {
    fontFamily: FontFamily.medium14,
    fontWeight: "500",
    lineHeight: 21,
    letterSpacing: -0.1,
    fontSize: FontSize.medium14_size,
  },
  scrollableSection: {
    marginTop: -100, // Updated marginTop for responsiveness
    marginLeft: -50, // Updated marginLeft for responsiveness
    width: "100%", // Updated width for responsiveness
    flex: 1,
    height: "100%",
  },
  menuBarIcon: {
    bottom: -100, // Updated bottom for responsiveness
    left: -50, // Updated left for responsiveness
    width: "100%", // Updated width for responsiveness
    height: 100, // Updated height for responsiveness
    position: "absolute",
  },
  myNewsChild: {
    width: "100%",
    height: 221,
    position: "absolute",
  },
  ellipseIcon: {
    left: "80%", // Updated left for responsiveness
    width: 54,
    height: 54,
    top: 55,
    position: "absolute",
  },
  headline: {
    alignItems: "center",
    fontFamily: FontFamily.medium14,
    fontWeight: "500",
    lineHeight: 21,
    letterSpacing: -0.1,
    fontSize: FontSize.medium14_size,
    top: 0,
    display: "flex",
    color: Color.pureWhite,
  },
  headline1: {
    top: 22,
    fontSize: FontSize.bold22_size,
    letterSpacing: -0.3,
    lineHeight: 26,
    fontWeight: "700",
    fontFamily: FontFamily.bold22,
    alignItems: "center",
  },
  headlineParent: {
    height: 48,
    width: "100%", // Updated width for responsiveness
    left: 40,
    top: 45,
    position: "absolute",
  },
  filterIcon: {
    top: -110, // Updated top for responsiveness
    // Updated left for responsiveness
    width: 300,
    left: 170, // Updated width for responsiveness
    height: 300, // Updated height for responsiveness
    position: "absolute",

  },
  searchChild: {
    top: -50, // Updated top for responsiveness
    left: -50, // Updated left for responsiveness
    borderRadius: Border.br_3xs,
    width: "100%", // Updated width for responsiveness
    height: 164,
    position: "absolute",
  },
  iconSearch: {
    top: 17,
    left: -20,
    width: 24,
    height: 24,
    position: "absolute",
  },
  search1: {
    top: 15,
    left: 20,
    textAlign: "left",
    position: "absolute",
    height: 30,
    width: 200
  },
  search: {
    width: "90%", // Updated width for responsiveness
    left: 45,
    top: 28,
  },
  header: {
    top: 100, // Updated top for responsiveness
    width: "100%", // Updated width for responsiveness
    left: 0,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center'

  },
  type8: {
    color: Color.colorDarkgray_200,
    textAlign: "left",
  },
  type8Wrapper: {
    borderRadius: Border.br_78xl,
    borderStyle: "solid",
    borderColor: Color.colorDarkgray_200,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_5xs,
    marginLeft: 10,
    alignItems: "center",
  },
  component32Parent: {
    marginTop: -206,
    marginLeft: -189,
    width: "100%",
  },
  myNews: {
    backgroundColor: Color.colorWhitesmoke,
    height: "100%", // Updated height for responsiveness
    width: "100%",
    flex: 1,
  },
  AppoinmentTextAndProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  AppoinmentTextAndProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newAppointment: {
    width: 320,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 97,
    backgroundColor: "#D1E1FE",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    position: "absolute",
    bottom: 450, // Adjust the bottom position as needed
    alignSelf: "center", // Center it horizontally
    zIndex: 1, // Ensure it's above other elements
  },
  buttonTextAdd: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    flex: 1,
  },
  buttonContainer: {
    borderRadius: 97,
    backgroundColor: '#130160',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  btnsetcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    top: 250
  },
  button: {
    flex: 1,
    borderRadius: 97,
    backgroundColor: '#130160',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
  },
  componentContainer: {
    width: 335,
    height: 134,
    top: -250,
    left: 10,
    flexShrink: 0,
    backgroundColor: 'blue',//#fff
    shadowColor: 'rgba(153, 171, 198, 0.18)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 62,
    shadowOpacity: 1,
    elevation: 8, // For Android shadow
    borderRadius: 8,
  },
  circularImage: {
    width: 52,
    height: 52,
    left: 20,
    top: 20,
    borderRadius: 26, // Half of the width and height to make it a circle
    marginRight: 16,
    backgroundColor: 'green' // Spacing between the image and content
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    left: 90,
    top: -20,
  },
  text: {
    color: '#0D0D26', // Change to your desired text color
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 18.2,
    letterSpacing: -0.14,
    width: 238,
    height: 38,
  },
  dateText: {
    color: '#95969D', // Change to your desired text color
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 19.2,
    letterSpacing: -0.12,
  },
  timeSlotText: {
    color: '#95969D', // Change to your desired text color
    textAlign: 'right',
    fontFamily: 'Poppins',
    fontSize: 12,
    left: -100,
    padding: 10,
    fontWeight: '500',
    lineHeight: 19.2,
    letterSpacing: -0.12,
  },




  appointmentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  circularImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  appointmentDetails: {
    flex: 1,
    marginLeft: 20,
  },
  appointmentTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  appointmentDate: {
    fontSize: 16,
    color: "#95969D",
  },
  appointmentTimeSlot: {
    fontSize: 16,
    color: "#95969D",
  },
  scroller: {
    marginTop: 260

    // Ensure it takes up all available vertical space
  },
  selectedButton: {
    backgroundColor: 'white', // Background color when selected
  },
  selectedButtonText: {
    color: 'black', // Text color when selected
  },
  remaining: {
    color: '#FF9228'
  }

});




export default Appointments;
