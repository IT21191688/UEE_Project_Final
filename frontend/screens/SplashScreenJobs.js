import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";

const SplashScreenJobs = () => {

  const navigation = useNavigation();

  const handleSkip = () => {
    // Navigate to the next screen
    navigation.navigate('SplashScreenNews');
  };
  const handleSkipSkip = () => {
    navigation.navigate("Login")
  }

  return (
    <View style={styles.splashScreenJobs}>
      <Image
        style={styles.splashScreenJobsChild}
        contentFit="cover"
        source={require("../assets/rectangle-225.png")}
      />
      <Text style={[styles.findYourDreamContainer, styles.containerPosition]}>
        <Text style={styles.findYour}>{`Find Your `}</Text>
        <Text>
          <Text style={styles.dreamJob}>Dream Job</Text>
          <Text style={styles.findYour}>{` `}</Text>
        </Text>
        <Text style={styles.findYour}>Here!</Text>
      </Text>
      <Text style={[styles.exploreAllTheContainer, styles.nextTypo]}>
        Explore all the most exciting job roles based on your interest and study
        major.
      </Text>
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
  containerPosition: {
    left: 32,
    top: "50%",
  },
  nextTypo: {
    fontSize: FontSize.size_sm,
    position: "absolute",
  },
  saveLayout: {
    height: 48,
    width: 126,
    marginLeft: 20,
    position: "absolute",
  },
  splashScreenJobsChild: {
    top: -36,
    left: -1,
    width: 375,
    height: 849,
    display: "none",
    position: "absolute",
  },
  findYour: {
    color: Color.colorBlack,
  },
  dreamJob: {
    textDecoration: "underline",
    color: Color.colorMidnightblue_100,
  },
  findYourDreamContainer: {
    marginTop: 70,
    fontSize: FontSize.size_21xl,
    lineHeight: 38,
    fontWeight: "700",
    width: 213,
    textAlign: "left",
    position: "absolute",
  },
  exploreAllTheContainer: {
    marginTop: 201,
    marginRight: 30,
    color: Color.colorDimgray,
    textAlign: "left",
    left: 32,
    top: "50%",
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
  profileDataCuate1: {
    marginTop: -263,
    marginLeft: -150.5,
    left: "50%",
    width: 301,
    height: 301,
    top: "50%",
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
    right: 24,
    letterSpacing: 1.2,
    textTransform: "capitalize",
    fontWeight: "600",
    color: Color.colorWhite,
    textAlign: "center",
    width: 80,
  },
  save: {
    marginLeft: 100,
    top: 670,
    right: 20,
  },
  splashScreenJobs: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default SplashScreenJobs;
