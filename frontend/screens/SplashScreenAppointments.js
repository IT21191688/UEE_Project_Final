import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";

const SplashScreenAppointments = () => {

  const navigation = useNavigation();

  const handleSkip = () => {
    // Navigate to the next screen
    navigation.navigate('SplashScreenCertificates');
  };

  const handleSkipSkip = () => {
    navigation.navigate("Login")
  }

  return (
    <View style={styles.splashScreenAppointments}>
      <Image
        style={styles.splashScreenAppointmentsChild}
        contentFit="cover"
        source={require("../assets/rectangle-225.png")}
      />
      <View style={styles.container}>
        <Text style={styles.scheduleYourAppointmentsContainer}>
          Schedule Your <Text style={styles.appointments}>Appointments</Text> Here!
        </Text>
        <Text style={[styles.exploreAllTheContainer, styles.nextTypo]}>
          Explore all the most exciting job roles based on your interest and study major.
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.skip, styles.skipPosition]}
        onPress={handleSkipSkip}
      >
        <Text style={styles.skip1}>Skip</Text>
      </TouchableOpacity>
      <Image
        style={styles.calendarBro1Icon}
        contentFit="cover"
        source={require("../assets/calendarbro-1.png")}
      />
      <TouchableOpacity
        style={[styles.save, styles.saveLayout]}
        Next="next"
        onPress={handleSkip}
      >
        <View style={[styles.saveChild, styles.saveLayout]} />
        <Text style={[styles.next, styles.nextTypo]}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  nextTypo: {
    fontSize: FontSize.size_sm,
    position: "absolute",
  },
  skipPosition: {
    left: 32,
    top: "50%",
  },
  saveLayout: {
    height: 48,
    width: 126,
    position: "absolute",
  },
  splashScreenAppointmentsChild: {
    top: -36,
    left: -1,
    width: 375,
    height: 849,
    display: "none",
    position: "absolute",
  },
  scheduleYour: {
    color: Color.colorBlack,
  },
  appointments: {
    textDecoration: "underline",
    color: Color.colorMidnightblue_100,
  },
  scheduleYourAppointmentsContainer: {
    marginTop: 67,
    marginRight: 10,
    left: 29,
    fontSize: FontSize.size_21xl,
    lineHeight: 38,
    fontWeight: "700",
    textAlign: "left",
    top: "50%",
    position: "absolute",
  },
  exploreAllTheContainer: {
    marginTop: 197,
    marginRight: 30,
    color: Color.colorDimgray,
    left: 32,
    top: "50%",
    textAlign: "left",
  },
  skip1: {
    marginTop: 337,
    fontSize: FontSize.size_base,
    letterSpacing: -0.2,
    lineHeight: 24,
    fontWeight: "500",
    color: Color.colorDarkgray_200,
    textAlign: "left",
  },
  skip: {
    position: "absolute",
  },
  calendarBro1Icon: {
    top: 140,
    left: 37,
    width: 301,
    height: 301,
    position: "absolute",
  },
  saveChild: {
    top: 0,
    right: 0,
    borderRadius: Border.br_7xs,
    backgroundColor: Color.colorMidnightblue_100,
    shadowColor: "rgba(153, 171, 198, 0.18)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 62,
    elevation: 62,
    shadowOpacity: 1,
  },
  next: {
    top: 15,
    right: 10,
    letterSpacing: 1.2,
    textTransform: "capitalize",
    fontWeight: "600",
    color: Color.colorWhite,
    textAlign: "center",
    width: 105,
  },
  save: {
    marginLeft: 100,
    top: 670,
    right: 20,
  },
  splashScreenAppointments: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
  container: {
    top: 400,

  }
});

export default SplashScreenAppointments;
