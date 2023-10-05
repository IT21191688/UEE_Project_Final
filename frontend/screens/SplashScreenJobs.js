import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";

const SplashScreenJobs = () => {

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
      <Pressable
        style={[styles.skip, styles.containerPosition]}
      >
        <Text style={styles.skip1}>Skip</Text>
      </Pressable>
      <Image
        style={styles.profileDataCuate1}
        contentFit="cover"
        source={require("../assets/profile-datacuate-1.png")}
      />
      <Pressable
        style={[styles.save, styles.saveLayout]}
      >
        <View style={[styles.saveChild, styles.saveLayout]} />
        <Text style={[styles.next, styles.nextTypo]}>Next</Text>
      </Pressable>
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
    fontFamily: FontFamily.dMSansBold,
    width: 213,
    textAlign: "left",
    position: "absolute",
  },
  exploreAllTheContainer: {
    marginTop: 201,
    marginRight: 30,
    fontFamily: FontFamily.dMSansRegular,
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
    fontFamily: FontFamily.poppinsMedium,
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
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorWhite,
    textAlign: "center",
    width: 80,
  },
  save: {
    marginLeft: 100,
    top: 757,
    right: 26,
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
