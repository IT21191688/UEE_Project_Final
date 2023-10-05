import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";

const SplashScreenAppointments = () => {

  return (
    <View style={styles.splashScreenAppointments}>
      <Image
        style={styles.splashScreenAppointmentsChild}
        contentFit="cover"
        source={require("../assets/rectangle-225.png")}
      />
      <Text style={styles.scheduleYourAppointmentsContainer}>
        <Text style={styles.scheduleYour}>{`Schedule Your `}</Text>
        <Text>
          <Text style={styles.appointments}>Appointments</Text>
          <Text style={styles.scheduleYour}>{` `}</Text>
        </Text>
        <Text style={styles.scheduleYour}>Here!</Text>
      </Text>
      <Text style={[styles.exploreAllTheContainer, styles.nextTypo]}>
        Explore all the most exciting job roles based on your interest and study
        major.
      </Text>
      <Pressable
        style={[styles.skip, styles.skipPosition]}
      >
        <Text style={styles.skip1}>Skip</Text>
      </Pressable>
      <Image
        style={styles.calendarBro1Icon}
        contentFit="cover"
        source={require("../assets/calendarbro-1.png")}
      />
      <Pressable
        style={[styles.save, styles.saveLayout]}
        Next="next"
      >
        <View style={[styles.saveChild, styles.saveLayout]} />
        <Text style={[styles.next, styles.nextTypo]}>Next</Text>
      </Pressable>
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
    marginRight: 100,
    left: 29,
    fontSize: FontSize.size_21xl,
    lineHeight: 38,
    fontWeight: "700",
    fontFamily: FontFamily.dMSansBold,
    textAlign: "left",
    top: "50%",
    position: "absolute",
  },
  exploreAllTheContainer: {
    marginTop: 197,
    marginRight: 30,
    fontFamily: FontFamily.dMSansRegular,
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
    fontFamily: FontFamily.poppinsMedium,
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
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorWhite,
    textAlign: "center",
    width: 105,
  },
  save: {
    top: 757,
    right: 27,
  },
  splashScreenAppointments: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default SplashScreenAppointments;
