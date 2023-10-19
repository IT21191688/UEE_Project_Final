import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";

const RejectMsg = () => {
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate("AdminApprovalGeneral");
  }

  return (
    <View style={styles.splashScreenCertificates}>
      <Image
        style={styles.splashScreenCertificatesChild}
        contentFit="cover"
        source={require("../assets/rectangle-225.png")}
      />
      <Image
        style={[
          styles.certificationBro1Icon,
          styles.certificationBro1IconPosition,
        ]}
        contentFit="cover"
        source={require("../assets/rejectImage.png")}
      />
      <Text style={styles.verifyText}>Reject Successfully</Text>

    <Pressable style={styles.OKbtn} >
        <Text style={styles.buttonTextAdd} onPress={handleNavigate}>OK</Text>
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
 
  certificationBro1Icon: {
    marginTop: -266,
    marginLeft: -130.5,
    width: 250,
    height: 250,
    position: "absolute",
  },


  splashScreenCertificates: {
    backgroundColor: 'white',
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
  OKbtn: {
    width: 300,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 97,
    borderColor: '#356899', // Border color
    borderWidth: 1, // Border width
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 25,
    marginVertical: 8,
    top: 450,
  },
  
  buttonTextAdd: {
    fontSize: 18,
    color: '#356899',
    fontWeight:900,
    alignItems: 'center',
    alignContent:'center',
    left: '500%'
  },
  verifyText: {
    fontSize: 24,
    fontWeight:700,
    color: 'black',
    marginLeft: 20, // Adjust the margin as needed
    marginTop: 10, // Adjust the margin as needed
    top: 400,
    left:50,
    
  },
});

export default RejectMsg;
