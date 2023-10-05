import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";

const SplashScreenCertificates = () => {

  return (
    <View style={styles.splashScreenCertificates}>
      <Image
        style={styles.splashScreenCertificatesChild}
        contentFit="cover"
        source={require("../assets/rectangle-225.png")}
      />
      <Text style={[styles.grabYourCertificatesContainer, styles.skipPosition]}>
        <Text style={styles.grabYour}>{`Grab Your `}</Text>
        <Text>
          <Text style={styles.certificates}>Certificates</Text>
          <Text style={styles.grabYour}>{` `}</Text>
        </Text>
        <Text style={styles.grabYour}>Easily!</Text>
      </Text>
      <Text style={[styles.exploreAllTheContainer, styles.nextTypo]}>
        Explore all the most exciting job roles based on your interest and study
        major.
      </Text>
      <Pressable
        style={styles.skipPosition}
      >
        <Text style={styles.skip1}>Skip</Text>
      </Pressable>
      <Image
        style={[
          styles.certificationBro1Icon,
          styles.certificationBro1IconPosition,
        ]}
        contentFit="cover"
        source={require("../assets/certificationbro-1.png")}
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
  skipPosition: {
    left: 32,
    top: "50%",
    position: "absolute",
  },
  nextTypo: {
    fontSize: FontSize.size_sm,
    position: "absolute",
  },
  certificationBro1IconPosition: {
    left: "50%",
    top: "50%",
  },
  saveLayout: {
    height: 48,
    width: 126,
    position: "absolute",
  },
  splashScreenCertificatesChild: {
    top: -36,
    left: -1,
    width: 375,
    height: 849,
    display: "none",
    position: "absolute",
  },
  grabYour: {
    color: Color.colorBlack,
  },
  certificates: {
    textDecoration: "underline",
    color: Color.colorMidnightblue_100,
  },
  grabYourCertificatesContainer: {
    marginTop: 68,
    marginRight: 100,
    fontSize: FontSize.size_21xl,
    lineHeight: 40,
    fontWeight: "700",
    fontFamily: FontFamily.dMSansBold,
    textAlign: "left",
  },
  exploreAllTheContainer: {
    marginTop: 203,
    marginRight: 200,
    marginLeft: -169,
    fontFamily: FontFamily.dMSansRegular,
    color: Color.colorDimgray,
    left: "50%",
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
  certificationBro1Icon: {
    marginTop: -266,
    marginLeft: -150.5,
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
    right: 20,
    letterSpacing: 1.2,
    textTransform: "capitalize",
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorWhite,
    textAlign: "center",
    width: 83,
  },
  save: {
    top: 757,
    right: 27,
  },
  splashScreenCertificates: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default SplashScreenCertificates;
