import * as React from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import FormContainer from "../components/FormContainer";
import SectionUploadForm from "../components/SectionUploadForm";
import { Border, FontFamily, FontSize, Color } from "../GlobalStyles";

const CreateNews = () => {
  return (
    <View style={styles.createNews}>
      <View style={styles.akarIconschevronLeftParent}>
        <Image
          style={[styles.akarIconschevronLeft, styles.groupChildPosition]}
          contentFit="cover"
          source={require("../assets/akariconschevronleft.png")}
        />
        <Text style={styles.publishANews}>Publish a News</Text>
      </View>
      <ScrollView
        style={[styles.groupParent, styles.pubishJobPosition]}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={[styles.jobTitleParent, styles.jobPosition1]}>
          <View style={[styles.jobTitle, styles.jobPosition1]}>
            <Image
              style={[styles.jobTitleChild, styles.jobPosition]}
              contentFit="cover"
              source={require("../assets/rectangle-592.png")}
            />
            <Text style={[styles.title, styles.titleTypo]}>Title</Text>
            <TextInput
              style={[styles.writeTheTitle, styles.content1Position]}
              placeholder="Write the title of the news here"
              placeholderTextColor="#aaa6b9"
            />
          </View>
          <View style={[styles.jobTitle1, styles.jobTitle1Position]}>
            <Image
              style={[styles.jobTitleItem, styles.jobPosition]}
              contentFit="cover"
              source={require("../assets/rectangle-593.png")}
            />
            <Text style={[styles.content, styles.titleTypo]}>Content</Text>
            <TextInput
              style={[styles.content1, styles.content1Position]}
              placeholder="Content"
              placeholderTextColor="#aaa6b9"
            />
          </View>
          <View style={[styles.remove, styles.removePosition]}>
            <View style={[styles.removeChild, styles.removePosition]} />
            <Text style={[styles.pubishJob, styles.cnnFlexBox]}>
              Publish News
            </Text>
          </View>
          <FormContainer />
          <SectionUploadForm />
        </View>
        <View style={[styles.groupContainer, styles.jobTitle1Position]}>
          <View style={styles.groupChildLayout}>
            <Image
              style={[styles.groupChild, styles.groupChildLayout]}
              contentFit="cover"
              source={require("../assets/ellipse-1.png")}
            />
          </View>
          <Text style={styles.cnnNews}>CNN News</Text>
        </View>
      </ScrollView>
      {/* <Image
        style={styles.menuBarIcon}
        contentFit="cover"
        source={require("../assets/menu-bar3.png")}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildPosition: {
    left: 0,
    top: 0,
    position: "absolute",
  },
  pubishJobPosition: {
    left: "50%",
    top: "18%",
    height: "250%",
  },
  jobPosition1: {
    marginLeft: 18,
    // left: "50%",
    // top: "50%",
    // position: "absolute",
  },
  jobPosition: {
    width: 459,
    borderRadius: Border.br_3xs,
    marginLeft: -229.5,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  titleTypo: {
    fontFamily: FontFamily.openSansSemiBold,
    fontSize: FontSize.textXsRegular_size,
    fontWeight: "600",
    left: "50%",
    top: "51%",
    marginLeft: -167.5,
    textAlign: "left",
    color: Color.colorMidnightblue_100,
    position: "absolute",
  },
  content1Position: {
    fontFamily: FontFamily.dMSansRegular,
    marginLeft: -147.5,
    fontSize: FontSize.textXsRegular_size,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  jobTitle1Position: {
    marginLeft: -150,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  removePosition: {
    height: 50,
    width: 317,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  cnnFlexBox: {
    textAlign: "center",
    color: Color.pureWhite,
    position: "absolute",
  },
  groupChildLayout: {
    height: 41,
    width: 41,
    marginLeft: -10,
  },
  menuBarIcon: {
    bottom: -163,
    left: -159,
    width: 736,
    height: 390,
    position: "absolute",
  },
  akarIconschevronLeft: {
    width: 24,
    overflow: "hidden",
    height: 24,
  },
  publishANews: {
    top: 64,
    fontSize: FontSize.semibold16_size,
    textAlign: "left",
    color: Color.colorMidnightblue_100,
    fontFamily: FontFamily.dMSansBold,
    fontWeight: "700",
    left: 0,
    position: "absolute",
  },
  akarIconschevronLeftParent: {
    top: 55,
    left: 20,
    width: 116,
    height: 85,
    position: "absolute",
  },
  jobTitleChild: {
    marginTop: -91.5,
    height: 217,
  },
  title: {
    marginTop: -59.5,
  },
  writeTheTitle: {
    marginTop: -21.5,
  },
  jobTitle: {
    //marginTop: -361.5,
    height: 119,
    width: 335,
  },
  jobTitleItem: {
    marginTop: -172,
    height: 378,
  },
  content: {
    marginTop: -140,
  },
  content1: {
    marginTop: -102,
  },
  jobTitle1: {
    marginTop: -150.5,
    height: 280,
    width: 335,
  },
  removeChild: {
    marginTop: -25,
    marginLeft: -158.5,
    borderRadius: Border.br_7xs,
    backgroundColor: Color.colorMidnightblue_100,
  },
  pubishJob: {
    marginTop: -9,
    marginLeft: -67.5,
    fontSize: FontSize.medium14_size,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    width: 134,
    left: "50%",
    top: "50%",
    fontFamily: FontFamily.dMSansBold,
    fontWeight: "700",
    color: Color.pureWhite,
  },
  remove: {
    marginTop: 311.5,
    marginLeft: -140,
  },
  jobTitleParent: {
    marginTop: 100,
    height: 723,
    width: 338,
  },
  groupChild: {
    left: 0,
    top: 0,
    position: "absolute",
  },
  cnn: {
    top: 9,
    left: 1,
    fontSize: 18,
    letterSpacing: -1.7,
    fontStyle: "italic",
    fontWeight: "800",
    fontFamily: FontFamily.archivoExtraBoldItalic,
    width: 37,
    height: 24,
  },
  cnnNews: {
    fontSize: FontSize.size_mini,
    lineHeight: 18,
    fontFamily: FontFamily.interSemiBold,
    color: Color.gray900,
    marginLeft: 8,
    fontWeight: "600",
    textAlign: "left",
    flex: 1,
  },
  groupContainer: {
    marginTop: -396,
    width: 258,
    height: 39,
    flexDirection: "row",
    alignItems: "center",
  },
  groupParent: {
    marginTop: 30,
    maxWidth: 408,
    width: 400,
    marginLeft: -200,
    //top: "50%",
    //position: "absolute",
    flex: 1,
    height: "50%",
  },
  createNews: {
    backgroundColor: Color.colorGray_100,
    width: "100%",
    //height: "700%",
    flex: 1,
  },
});

export default CreateNews;
