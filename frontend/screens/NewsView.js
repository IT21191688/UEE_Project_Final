import * as React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { FontSize, Color, FontFamily } from "../GlobalStyles";

const NewsView = () => {
  return (
    <View style={styles.newsView}>
      <ScrollView
        style={[styles.imageParent, styles.cnnPosition]}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <Image
          style={styles.imageIcon}
          contentFit="cover"
          source={require("../assets/image.png")}
        />
        <View style={styles.content}>
          <Text
            style={[styles.trafficInPhilippines, styles.philippinesPosition]}
          >
            Traffic in Philippines' Capital City of Manila Worsens Despite
            Measures to Ease Congestion
          </Text>
          <Text style={[styles.generalNews, styles.minutesAgoTypo]}>
            GENERAL NEWS
          </Text>
          <Text
            style={[styles.manilaPhilippines, styles.philippinesPosition]}
          >{`MANILA, Philippines - Despite efforts to ease traffic congestion in the capital city of Manila, residents are reporting that traffic has only gotten worse. The government has implemented a number of measures in recent years, including the construction of new roadways and the implementation of a color-coded coding scheme for vehicles, but these efforts have done little to alleviate the problem.
According to a recent survey, the average commuter in Manila spends an average of three hours a day stuck in traffic. This has not only caused frustration and inconvenience for residents, but it is also taking a toll on the city's economy. Businesses are struggling to keep up with the high costs of transportation and delivery, and many residents are finding it difficult to make it to work on time.
The government has acknowledged the problem and is looking for new solutions to ease the traffic congestion. Some officials have suggested the implementation of a more comprehensive public transportation system, while others have proposed the construction of new flyovers and underpasses.
As the population and urbanization of Manila is growing rapidly, traffic congestion is becoming a major problem for the city. The government is doing efforts to ease the traffic but seems not enough to solve the problem. Hopefully, new solutions will be implemented soon to improve the quality of life for the residents of Manila.`}</Text>
        </View>
      </ScrollView>
      <View style={styles.sourceName}>
        <Text style={[styles.cnnPhilippines, styles.minutesAgoPosition]}>
          CNN Philippines
        </Text>
        <Text style={[styles.minutesAgo, styles.minutesAgoPosition]}>
          10 minutes ago
        </Text>
        <View style={[styles.ellipseParent, styles.groupChildPosition]}>
          <Image
            style={[styles.groupChild, styles.groupChildPosition]}
            contentFit="cover"
            source={require("../assets/ellipse-1.png")}
          />
        </View>
      </View>
      {/* <Image
        style={styles.menuBarIcon}
        contentFit="cover"
        source={require("../assets/menu-bar3.png")}
      /> */}
      <Image
        style={styles.akarIconschevronLeft}
        contentFit="cover"
        source={require("../assets/akariconschevronleft.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  frameScrollViewContent: {
    flexDirection: "column",
    paddingHorizontal: 0,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cnnPosition: {
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  philippinesPosition: {
    textAlign: "left",
    left: 0,
    width: 360,
    position: "absolute",
  },
  minutesAgoTypo: {
    letterSpacing: -0.5,
    fontSize: FontSize.size_xs,
  },
  minutesAgoPosition: {
    width: "80%",
    marginLeft: -30.5,
    textAlign: "left",
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  groupChildPosition: {
    width: 41,
    marginTop: -20.5,
    height: 41,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  imageIcon: {
    borderRadius: 14,
    height: 216,
    width: 375,
  },
  trafficInPhilippines: {
    top: 21,
    fontSize: 25,
    letterSpacing: -1.1,
    color: Color.colorGray,
    textAlign: "left",
    left: 0,
    fontFamily: FontFamily.archivoBold,
    fontWeight: "700",
  },
  generalNews: {
    top: 0,
    color: "#de4619",
    textAlign: "left",
    left: 0,
    width: 340,
    position: "absolute",
    fontFamily: FontFamily.archivoBold,
    fontWeight: "700",
    fontSize: FontSize.size_xs,
  },
  manilaPhilippines: {
    top: 114,
    lineHeight: 24,
    height: 841,
    fontFamily: FontFamily.sFProDisplay,
    fontSize: FontSize.size_mini,
    color: Color.colorGray,
    textAlign: "left",
    left: 0,
  },
  content: {
    height: 955,
    marginTop: 18,
    width: 340,
    left: -12,
  },
  imageParent: {
    marginTop: -260,
    marginLeft: -195,
    maxWidth: 390,
    width: 390,
    flex: 1,
    height: "100%"
  },
  cnnPhilippines: {
    marginTop: -15.5,
    color: Color.colorBlack,
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.archivoBold,
    fontWeight: "700",
  },
  minutesAgo: {
    marginTop: 1.5,
    color: Color.colorDarkgray_100,
    fontFamily: FontFamily.sFProDisplay,
    letterSpacing: -0.5,
    fontSize: FontSize.size_xs,
  },
  groupChild: {
    marginLeft: -20.5,
  },
  cnn: {
    marginTop: -13.43,
    marginLeft: -19.09,
    fontSize: 22,
    letterSpacing: -2,
    fontStyle: "italic",
    fontWeight: "800",
    fontFamily: FontFamily.archivoExtraBoldItalic,
    color: Color.pureWhite,
    textAlign: "center",
  },
  ellipseParent: {
    marginLeft: -81.5,
  },
  sourceName: {
    marginTop: 52,
    marginLeft: -135.5,
    width: 163,
    height: 41,
    left: "45%",
    position: "absolute",
  },
  menuBarIcon: {
    bottom: -163,
    left: -159,
    width: 736,
    height: 390,
    position: "absolute",
  },
  akarIconschevronLeft: {
    top: 60,
    left: 18,
    width: 24,
    height: 24,
    overflow: "hidden",
    position: "absolute",
  },
  newsView: {
    backgroundColor: Color.colorWhitesmoke,
    width: "100%",
    height: 812,
    flex: 1,
  },
});

export default NewsView;
