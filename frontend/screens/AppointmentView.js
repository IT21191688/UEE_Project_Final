import * as React from "react";
import { Text, StyleSheet, View, Pressable, TouchableOpacity, Alert } from "react-native";
import { Image } from "expo-image";
import SeniorManagementAppointmentCon2 from "../components/SeniorManagementAppointmentCon2";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import Property1Primary from "../components/Property1Primary";
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const AppointmentView = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  // Your time slots data
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
  const ststus = [
    {
      id: 2,
      status: "Pending"

    },
    {
      id: 3,
      status: "Approve"

    },
    {
      id: 4,
      status: "Reject"

    }
  ]


  const handleEditAppointment = (appointmentId) => {
    navigation.navigate('EditAppoinment', { appointmentId });
  };


  function findTimeSlotById(id) {
    const slot = timeSlots.find(slot => slot.id === id);
    return slot ? slot.timeSlot : 'Not Found';
  }

  function findStatus(id) {
    const slot = ststus.find(slot => slot.id === id);
    return slot ? slot.status : 'Not Found';
  }

  useEffect(() => {
    const { appointmentId } = route.params;


    const getAppoinmentDetails = async (appointmentId) => {
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
          `https://uee123.onrender.com/api/v1/appointment/getAppoinmentDetails/${appointmentId}`,
          { headers }
        );

        if (response.data.isSuccessful) {
          const fetchedAppointment = response.data.data;
          setAppointmentDetails(fetchedAppointment);
          console.log('Fetched Appointment:', fetchedAppointment);
        } else {
          console.error("Failed to fetch appointment:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };

    getAppoinmentDetails(appointmentId);
  }, [route.params]);

  const deleteAppointment = async (appointmentId) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    try {
      const response = await axios.patch( // Use PATCH method to match the server route
        `https://uee123.onrender.com/api/v1/appointment/delete/${appointmentId}`,
        null, // Remove the request body
        { headers }
      );
      console.log(response);

      if (response.data.isSuccessful) {
        Alert.alert("Successfully Deleted Appointment");
        navigation.navigate('Appointments');
      } else {
        Alert.alert("Delete Unsuccessfull");
        console.log(response.data.message)
        navigation.navigate("AppoinmentAdminHome")
      }
    } catch (error) {
      console.error('Error deleting appointment:', error.message);
      Alert.alert("Failed to Delete Appointment: " + error.message);
    }
  };

  return (
    <View style={styles.appointmentView}>
      <Text style={styles.description}>Description</Text>
      <TouchableOpacity

      >
        <Image
          style={[styles.akarIconschevronLeft, styles.editIconLayout]}
          contentFit="cover"
          source={require("../assets/akariconschevronleft.png")}
        />
      </TouchableOpacity>
      {appointmentDetails && (
        <Text style={[styles.sedUtPerspiciatis, styles.timeSlotPosition]}>
          {appointmentDetails.description}
        </Text>
      )}
      <View style={[styles.frameParent, styles.frameParentLayout]}>


        <TouchableOpacity style={[styles.xnixlinetrash2Wrapper, styles.frameParentLayout]} onPress={() => deleteAppointment(appointmentDetails._id)}>
          <Image
            style={styles.xnixlinetrash2Icon}
            contentFit="cover"
            source={require("../assets/xnixlinetrash-21.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleEditAppointment(appointmentDetails._id)}>
          <Image
            style={[styles.editIcon, styles.editIconLayout]}
            contentFit="cover"
            source={require("../assets/edit.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.groupParent}>
        <View style={styles.spotigyWrapper}>
          <Image
            style={styles.spotigyWrapper}
            contentFit="cover"
            source={require("../assets/spotigy1.png")}
          />
        </View>
        <View
          style={[styles.seniorManagementAppointmentParent, styles.seniorLayout]}
        >
          {appointmentDetails && (
            <Text
              style={[styles.seniorManagementAppointment, styles.spotifyPosition]}
            >
              {appointmentDetails.title}
            </Text>
          )}
          <Text style={[styles.spotify, styles.spotifyPosition]}>Spotify</Text>
        </View>
      </View>
      {
        appointmentDetails && (
          <Text style={[styles.negotiable, styles.timeSlotTypo]}>
            {new Date(appointmentDetails.appointmentDate).toLocaleDateString("en-US")}
          </Text>
        )
      }
      <View style={[styles.vectorParent, styles.timeSlotPosition]}>
        <Image
          style={[styles.groupChild, styles.groupChildLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-61.png")}
        />
        {appointmentDetails && (
          <Text style={[styles.timeSlot, styles.timeSlotTypo]}>
            Time slot : {findTimeSlotById(appointmentDetails.appointmentTime)}
          </Text>
        )}
      </View>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>
          {appointmentDetails ? findStatus(appointmentDetails.status) : 'Loading...'}
        </Text>
      </Pressable>
    </View>
  );
};







const styles = StyleSheet.create({
  editIconLayout: {
    height: 24,
    width: 24,
    position: "absolute",
  },
  size: {
    left: 107,
    position: "relative",
  },
  menuBarIcon: {
    bottom: -163,
    left: -159,
    width: 736,
    height: 390,
    position: "absolute",
  },
  timeSlotPosition: {
    left: "50%",
    top: "60%",
  },
  groupChildLayout: {
    width: 375,
    position: "absolute",
  },
  frameParentLayout: {
    height: 28,
    position: "absolute",
  },
  timeSlotTypo: {
    color: Color.colorDarkgray_200,
    fontFamily: FontFamily.medium14,
    letterSpacing: -0.1,
    fontWeight: "500",
    position: "absolute",
  },
  description: {
    top: 342,
    left: 24,
    lineHeight: 17,
    fontFamily: FontFamily.circularStd,
    color: Color.black,
    textAlign: "left",
    fontWeight: "500",
    fontSize: FontSize.medium14_size,
    position: "absolute",
  },
  akarIconschevronLeft: {
    top: 60,
    left: 18,
    overflow: "hidden",
  },
  sedUtPerspiciatis: {
    marginTop: -50,
    marginLeft: -163.5,
    fontFamily: FontFamily.dMSansRegular,
    color: Color.colorDimgray,
    width: 329,
    textAlign: "left",
    fontSize: FontSize.medium14_size,
    top: "50%",
    position: "absolute",
  },
  xnixlinetrash2Icon: {
    height: 31,
    width: 29,
  },
  xnixlinetrash2Wrapper: {
    top: 0,
    left: 36,
    borderRadius: 40,
    backgroundColor: Color.colorMidnightblue_300,
    shadowColor: "rgba(255, 255, 255, 0.75)",
    shadowOffset: {
      width: -4,
      height: -4,
    },
    shadowRadius: 10,
    elevation: 10,
    shadowOpacity: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 29,
  },
  editIcon: {
    top: 2,
    left: 0,
  },
  frameParent: {
    top: 57,
    left: 280,
    width: 65,
  },
  negotiable: {
    top: "22.41%",
    left: "6.67%",
    fontSize: FontSize.medium12_size,
    lineHeight: 19,
    textAlign: "left",
  },
  groupChild: {
    marginTop: -92,
    marginLeft: -188.5,
    borderRadius: Border.br_xl,
    height: 192,
    left: "50%",
    top: "50%",
  },
  timeSlot: {
    marginTop: -12,
    marginLeft: -108.5,
    fontSize: FontSize.size_mini,
    lineHeight: 24,
    textAlign: "right",
    left: "50%",
    top: "50%",
  },
  vectorParent: {
    marginTop: -195,
    marginLeft: -169.5,
    width: 341,
    height: 68,
    position: "absolute",
    top: "50%",
  },
  appointmentView: {
    backgroundColor: Color.bG,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },


  button: {
    width: 100,
    height: 40,
    top: '50%',
    left: '30%',
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



  seniorLayout: {
    width: 259,
    top: 0,
  },
  spotifyPosition: {
    textAlign: "left",
    left: 0,
    position: "absolute",
  },
  spotigyWrapper: {
    width: 64,
    left: 0,
    top: 0,
    height: 64,
    position: "absolute",
  },
  seniorManagementAppointment: {
    fontSize: FontSize.medium14_size,
    letterSpacing: -0.1,
    lineHeight: 18,
    fontWeight: "600",
    fontFamily: FontFamily.semibold14,
    color: Color.colorBlack,
    display: "flex",
    alignItems: "center",
    height: 38,
    width: 259,
    top: 12,
  },
  spotify: {
    top: 31,
    fontSize: FontSize.medium13_size,
    fontWeight: "700",
    fontFamily: FontFamily.dMSansBold,
    color: Color.colorDarkgray_200,
    width: 153,
    height: 16,
  },
  seniorManagementAppointmentParent: {
    left: 73,
    height: 47,
    position: "absolute",
    width: 259,
  },
  groupParent: {
    top: 104,
    left: 21,
    width: 332,
    height: 64,
    position: "absolute",
  },
});

export default AppointmentView;
