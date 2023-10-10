import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import SeniorManagementAppointmentCon2 from "../components/SeniorManagementAppointmentCon2";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import Property1Primary from "../components/Property1Primary";
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppointmentView = () => {
  const route = useRoute();
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

  return (
    <View style={styles.appointmentView}>
      <Text style={styles.description}>Description</Text>
      <Image
        style={[styles.akarIconschevronLeft, styles.editIconLayout]}
        contentFit="cover"
        source={require("../assets/akariconschevronleft.png")}
      />
      {appointmentDetails && (
        <Text style={[styles.sedUtPerspiciatis, styles.timeSlotPosition]}>
          {appointmentDetails.description}
        </Text>
      )}
      <View style={[styles.frameParent, styles.frameParentLayout]}>
        <View style={[styles.xnixlinetrash2Wrapper, styles.frameParentLayout]}>
          <Image
            style={styles.xnixlinetrash2Icon}
            contentFit="cover"
            source={require("../assets/xnixlinetrash-21.png")}
          />
        </View>
        <Image
          style={[styles.editIcon, styles.editIconLayout]}
          contentFit="cover"
          source={require("../assets/edit.png")}
        />
      </View>
      <SeniorManagementAppointmentCon2 />
      {appointmentDetails && (
        <Text style={[styles.negotiable, styles.timeSlotTypo]}>
          {appointmentDetails.date}
        </Text>
      )}
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
          {appointmentDetails ? appointmentDetails.status : 'Loading...'}
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
    left: 320,
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
});

export default AppointmentView;
