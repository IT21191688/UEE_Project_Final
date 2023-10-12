import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";

const SplashScreenNews = () => {

  const navigation = useNavigation();

  const handleSkip = () => {
    // Navigate to the next screen
    navigation.navigate('SignUp');
  };

  const handleSkipSkip = () => {
    navigation.navigate("Login")
  }

  return (
    <View style={styles.splashScreenNews}>
      <Image
        style={styles.splashScreenNewsChild}
        contentFit="cover"
        source={require("../assets/rectangle-225.png")}
      />
      <Text style={styles.scheduleYourNewsContainer}>
        <Text style={styles.scheduleYour}>{`Be Updated `}</Text>
        <Text>
          <Text style={styles.News}>With</Text>
          <Text style={styles.scheduleYour}>{` `}</Text>
        </Text>
        <Text style={styles.scheduleYour}>Us!</Text>
      </Text>
      <Text style={[styles.exploreAllTheContainer, styles.nextTypo]}>
        Get Important information regarding the
        operations of the Divisional secretary office
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
  splashScreenNewsChild: {
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
  News: {
    textDecoration: "underline",
    color: Color.colorMidnightblue_100,
  },
  scheduleYourNewsContainer: {
    marginTop: 67,
    marginRight: 100,
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
  splashScreenNews: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default SplashScreenNews;
