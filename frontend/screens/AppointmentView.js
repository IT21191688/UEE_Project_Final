import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import SeniorManagementAppointmentCon2 from "../components/SeniorManagementAppointmentCon2";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import Property1Primary from "../components/Property1Primary";

const AppointmentView = () => {





  return (
    <View style={styles.appointmentView}>
      <Text style={styles.description}>Description</Text>

      <Image
        style={[styles.akarIconschevronLeft, styles.editIconLayout]}
        contentFit="cover"
        source={require("../assets/akariconschevronleft.png")}
      />
      <Text style={[styles.sedUtPerspiciatis, styles.timeSlotPosition]}>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Sed ut perspiciatis unde omnis iste natus error sit
        voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
        ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
        dicta sunt explicabo.
      </Text>
      <View style={[styles.frameParent, styles.frameParentLayout]}>
        <View style={[styles.xnixlinetrash2Wrapper, styles.frameParentLayout]}>
          <Image
            style={styles.xnixlinetrash2Icon}
            contentFit="cover"
            source={require("../assets/xnixlinetrash-21.png")}
          />
        </View>
        <Image
          style={[styles.editIcon, styles.editIconLayout]}
          contentFit="cover"
          source={require("../assets/edit.png")}
        />
      </View>
      <SeniorManagementAppointmentCon2 />
      <Text style={[styles.negotiable, styles.timeSlotTypo]}>13/05/22</Text>
      <View style={[styles.vectorParent, styles.timeSlotPosition]}>
        <Image
          style={[styles.groupChild, styles.groupChildLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-61.png")}
        />
        <Text style={[styles.timeSlot, styles.timeSlotTypo]}>
          Time slot : 8.00AM - 8.30AM
        </Text>
      </View>
      <Pressable style={styles.button} >
        <Text style={styles.buttonText}>Pending</Text>
      </Pressable>
      {/* <Image
        style={styles.menuBarIcon}
        contentFit="cover"
        source={require("../assets/menu-bar3.png")}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  editIconLayout: {
    height: 24,
    width: 24,
    position: "absolute",
  },
  size: {
    left: 107,
    position: "relative",
  },
  menuBarIcon: {
    bottom: -163,
    left: -159,
    width: 736,
    height: 390,
    position: "absolute",
  },
  timeSlotPosition: {
    left: "50%",
    top: "60%",
  },
  groupChildLayout: {
    width: 375,
    position: "absolute",
  },
  frameParentLayout: {
    height: 28,
    position: "absolute",
  },
  timeSlotTypo: {
    color: Color.colorDarkgray_200,
    fontFamily: FontFamily.medium14,
    letterSpacing: -0.1,
    fontWeight: "500",
    position: "absolute",
  },
  description: {
    top: 342,
    left: 24,
    lineHeight: 17,
    fontFamily: FontFamily.circularStd,
    color: Color.black,
    textAlign: "left",
    fontWeight: "500",
    fontSize: FontSize.medium14_size,
    position: "absolute",
  },
  akarIconschevronLeft: {
    top: 60,
    left: 18,
    overflow: "hidden",
  },
  sedUtPerspiciatis: {
    marginTop: -50,
    marginLeft: -163.5,
    fontFamily: FontFamily.dMSansRegular,
    color: Color.colorDimgray,
    width: 329,
    textAlign: "left",
    fontSize: FontSize.medium14_size,
    top: "50%",
    position: "absolute",
  },
  xnixlinetrash2Icon: {
    height: 31,
    width: 29,
  },
  xnixlinetrash2Wrapper: {
    top: 0,
    left: 36,
    borderRadius: 40,
    backgroundColor: Color.colorMidnightblue_300,
    shadowColor: "rgba(255, 255, 255, 0.75)",
    shadowOffset: {
      width: -4,
      height: -4,
    },
    shadowRadius: 10,
    elevation: 10,
    shadowOpacity: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 29,
  },
  editIcon: {
    top: 2,
    left: 0,
  },
  frameParent: {
    top: 57,
    left: 320,
    width: 65,
  },
  negotiable: {
    top: "22.41%",
    left: "6.67%",
    fontSize: FontSize.medium12_size,
    lineHeight: 19,
    textAlign: "left",
  },
  groupChild: {
    marginTop: -92,
    marginLeft: -188.5,
    borderRadius: Border.br_xl,
    height: 192,
    left: "50%",
    top: "50%",
  },
  timeSlot: {
    marginTop: -12,
    marginLeft: -108.5,
    fontSize: FontSize.size_mini,
    lineHeight: 24,
    textAlign: "right",
    left: "50%",
    top: "50%",
  },
  vectorParent: {
    marginTop: -195,
    marginLeft: -169.5,
    width: 341,
    height: 68,
    position: "absolute",
    top: "50%",
  },
  appointmentView: {
    backgroundColor: Color.bG,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },


  button: {
    width: 100,
    height: 40,
    top: '50%',
    left: '30%',
    borderRadius: 97,
    backgroundColor: '#130160',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
  },
});

export default AppointmentView;
