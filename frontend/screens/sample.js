import * as React from "react";
import { ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import { Image } from "expo-image";
import Philippines from "../components/NewsCard";
import Property1Unselected from "../components/Property1Unselected";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import DesignSection1 from "../components/DesignSection1";

const Sample = () => {
  return (
    <View style={styles.myNews}>
      {/* Header */}
      <Image
        style={[styles.myNewsChild, styles.searchPosition]}
        contentFit="cover"
        source={require("../assets/rectangle-5.png")}
      />
      <Image
        style={styles.ellipseIcon}
        contentFit="cover"
        source={require("../assets/ellipse.png")}
      />
      <View style={styles.headlineParent}>
        <Text style={[styles.headline, styles.headlineFlexBox]}>
          Welcome Back
        </Text>
        <Text style={[styles.headline1, styles.headlineFlexBox]}>
          John Doe!
        </Text>
      </View>
      <View style={[styles.header, styles.headerLayout]}>
        <Image
          style={styles.filterIcon}
          contentFit="cover"
          source={require("../assets/filter.png")}
        />
        <View style={[styles.search, styles.headerLayout]}>
          <Image
            style={styles.searchChild}
            contentFit="cover"
            source={require("../assets/rectangle-3.png")}
          />
          <Image
            style={styles.iconSearch}
            contentFit="cover"
            source={require("../assets/icon-search.png")}
          />
          <TextInput
            style={[styles.search1]}
            placeholder="Search"
            placeholderTextColor="rgba(13, 1, 64, 0.6)"
          />
        </View>
      </View>
      {/* Header */}

      {/* Content */}

      {/* Content */}

      {/* Bottom Tabs */}
      <Image
        style={styles.menuBarIcon}
        contentFit="cover"
        source={require("../assets/menu-bar3.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollableSectionScrollViewContent: {
    flexDirection: "column",
    paddingBottom: 552,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  frameScrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollableSectionPosition: {
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  searchPosition: {
    left: 0,
    top: 0,
  },
  headlineFlexBox: {
    display: "flex",
    color: Color.pureWhite,
    alignItems: "center",
    textAlign: "left",
    width: 254,
    left: 0,
    position: "absolute",
  },
  headerLayout: {
    height: 40,
    position: "absolute",
  },
  type8Typo: {
    fontFamily: FontFamily.medium14,
    fontWeight: "500",
    lineHeight: 21,
    letterSpacing: -0.1,
    fontSize: FontSize.medium14_size,
  },
  scrollableSection: {
    marginTop: -159.5,
    marginLeft: -196.5,
    width: 393,
    maxWidth: 393,
    flex: 1,
    height: "100%",
  },
  menuBarIcon: {
    bottom: -163,
    left: -159,
    width: 736,
    height: 390,
    position: "absolute",
  },
  myNewsChild: {
    width: 411.5,
    height: 221,
    position: "absolute",
  },
  ellipseIcon: {
    left: 338,
    width: 54,
    height: 54,
    top: 55,
    position: "absolute",
  },
  headline: {
    alignItems: "center",
    fontFamily: FontFamily.medium14,
    fontWeight: "500",
    lineHeight: 21,
    letterSpacing: -0.1,
    fontSize: FontSize.medium14_size,
    top: 0,
    display: "flex",
    color: Color.pureWhite,
  },
  headline1: {
    top: 22,
    fontSize: FontSize.bold22_size,
    letterSpacing: -0.3,
    lineHeight: 26,
    fontWeight: "700",
    fontFamily: FontFamily.bold22,
    alignItems: "center",
  },
  headlineParent: {
    height: 48,
    width: 254,
    left: 22,
    top: 55,
    position: "absolute",
  },
  filterIcon: {
    top: -146,
    left: 169,
    width: 340,
    height: 340,
    position: "absolute",
  },
  searchChild: {
    top: -58,
    left: -62,
    borderRadius: Border.br_3xs,
    width: 435,
    height: 164,
    position: "absolute",
  },
  iconSearch: {
    top: 8,
    left: 15,
    width: 24,
    height: 24,
    position: "absolute",
  },
  search1: {
    top: 7,
    left: 49,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.dMSansRegular,
    color: Color.colorDarkgray_100,
    textAlign: "left",
    position: "absolute",
  },
  search: {
    width: 280,
    left: 0,
    top: 0,
  },
  header: {
    top: 134,
    width: 335,
    left: 22,
    height: 40,
  },
  type8: {
    color: Color.colorDarkgray_200,
    textAlign: "left",
  },
  type8Wrapper: {
    borderRadius: Border.br_78xl,
    borderStyle: "solid",
    borderColor: Color.colorDarkgray_200,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_5xs,
    marginLeft: 10,
    alignItems: "center",
  },
  component32Parent: {
    marginTop: -206,
    marginLeft: -189,
    width: "100%",
  },
  myNews: {
    backgroundColor: Color.colorWhitesmoke,
    height: 893,
    width: "100%",
    flex: 1,
  },
});

export default Sample;
