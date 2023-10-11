import * as React from "react";
import { ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import { Image } from "expo-image";
import NewsCard from "../components/NewsCard";
import Property1Unselected from "../components/Property1Unselected";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";

const MyNews = () => {
  return (
    <View style={styles.myNews}>
      <ScrollView
        style={[styles.scrollableSection, styles.scrollableSectionPosition]}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollableSectionScrollViewContent}
      >
        <NewsCard
          articleImageUrl={require("../assets/rectangle-4.png")}
          newsImageUrl="Philippines' military conducts successful operations against Islamist extremist groups"
          newsTitle="Rappler"
          imageDimensions={require("../assets/ellipse-11.png")}
          newsDescription="rpl"
          timeAgo="2 hours ago"
        />
        <NewsCard
          articleImageUrl={require("../assets/rectangle-41.png")}
          newsImageUrl="Leading tech company unveils latest innovation in artificial intelligence (A1) - Takeaways"
          newsTitle="Sunrise Scoops"
          imageDimensions={require("../assets/ellipse-12.png")}
          newsDescription="srs"
          timeAgo="5 hours ago"
          philippinesMilitaryConducMarginTop={13}
          rapplerTop={196}
          fmIconLeft={2}
          fmIconTextAlign="center"
        />
        <NewsCard
          articleImageUrl={require("../assets/rectangle-42.png")}
          newsImageUrl="Philippines' business sector sees positive growth as lockdown measures ease"
          newsTitle="Sureshot News"
          imageDimensions={require("../assets/ellipse-13.png")}
          newsDescription="sn"
          timeAgo="a day ago"
          philippinesMilitaryConducMarginTop={13}
          rapplerTop={196}
          fmIconLeft={5}
          fmIconTextAlign="center"
        />
      </ScrollView>
      {/* <Image
        style={styles.menuBarIcon}
        contentFit="cover"
        source={require("../assets/menu-bar3.png")}
      /> */}
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
      <ScrollView
        style={[styles.component32Parent, styles.scrollableSectionPosition]}
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <Property1Unselected
          type8="General"
          property1UnselectedPosition="unset"
          property1UnselectedBorderStyle="unset"
          property1UnselectedBorderColor="unset"
          property1UnselectedBackgroundColor="#130160"
          property1UnselectedMarginLeft="unset"
          type8Color="#fff"
        />
        <Property1Unselected
          type8="Health"
          property1UnselectedPosition="unset"
          property1UnselectedBorderStyle="solid"
          property1UnselectedBorderColor="#95969d"
          property1UnselectedBorderWidth={1}
          property1UnselectedBackgroundColor="unset"
          property1UnselectedMarginLeft={10}
          type8Color="#95969d"
        />
        <View style={styles.type8Wrapper}>
          <Text style={[styles.type8, styles.type8Typo]}>Finance</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollableSectionScrollViewContent: {
    flexDirection: "column",
    paddingBottom: 552,
    paddingTop: 80,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  frameScrollViewContent: {
    flexDirection: "row",
    paddingTop: 50,
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

export default MyNews;
