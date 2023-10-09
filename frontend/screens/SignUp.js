import React, { useState } from "react";
import axios from 'axios';
import { Image } from "expo-image";
import { StyleSheet, Text, TextInput, View, Pressable, TouchableOpacity, Alert } from "react-native";
import { CheckBox } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { Border, FontFamily, FontSize, Color } from "../GlobalStyles";

const SignUp = () => {
  const [rectangleCheckboxchecked, setRectangleCheckboxchecked] =
    useState(false);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const role = 'user';
  // const email = "nimna12345@gmail.com"
  //const password = "12345"
  //const fullName = "Nimna Thiraanjayaaa"
  const [rememberMe, setRememberMe] = useState(false);

  const navigation = useNavigation();

  const handleSignInPress = () => {
    navigation.navigate("Login");
  };

  const handleSignup = async () => {
    const user = {
      fullName,
      email,
      password,
      role
    };
    //alert(user.fullName + user.email + user.password + user.role)

    //http://192.168.43.93
    try {

      const response = await axios.post('https://uee123.onrender.com/api/v1/user/register', {
        user: user,
      });

      if (response.status === 201) {
        console.log('User registered successfully:', response.data);
        Alert.alert('Success', 'User Created');
        navigation.navigate("Login");
        // You can add navigation or other actions for successful registration here
      } else {
        console.error('Registration failed with status code:', response.status);

        // Parse and display server error response (if available)
        if (response.data && response.data.error) {
          Alert.alert('Registration Error', response.data.error);
        } else {
          Alert.alert('Unsuccessful Registration', 'User Not Created');
        }
      }
    } catch (error) {
      if (error.message === 'Network Error') {
        console.error('Network error. Please check your internet connection.');
        Alert.alert('Network Error', 'User Not Created');
      } else {
        console.error('Registration error:', error);
        Alert.alert('Unsuccessful Registration', 'User Not Created');
      }
    }

  };


  return (
    <View style={styles.signUp}>
      {/* Password Input */}
      <View style={[styles.password, styles.emailPosition]}>
        <Image
          style={[styles.passwordChild, styles.childPosition]}
          contentFit="cover"
          source={require("../assets/rectangle-59.png")}
        />
        <TextInput
          style={[styles.password2, styles.passwordTypo]}
          placeholder="Enter your Password"
          autoCapitalize="none"
          secureTextEntry={true}
          placeholderTextColor="rgba(13, 1, 64, 0.6)"
          onChangeText={text => setPassword(text)}
        />
        <Text style={[styles.password1, styles.email1Typo]}>Password</Text>
      </View>

      {/* Email Input */}
      <View style={[styles.email, styles.emailPosition]}>
        <Image
          style={[styles.passwordChild, styles.childPosition]}
          contentFit="cover"
          source={require("../assets/rectangle-59.png")}
        />
        <TextInput
          style={[styles.brandonelouisgmailcom, styles.signUp1Position]}
          placeholder="Enter your Email"
          keyboardType="email-address"
          placeholderTextColor="rgba(13, 1, 64, 0.6)"
          onChangeText={text => setEmail(text)}
        />
        <Text style={[styles.email1, styles.email1Position]}>Email</Text>
      </View>

      {/* Full Name Input */}
      <View style={[styles.fullName, styles.emailPosition]}>
        <Image
          style={[styles.fullNameChild, styles.childPosition]}
          contentFit="cover"
          source={require("../assets/rectangle-59.png")}
        />
        <TextInput
          style={[styles.brandoneLouis, styles.passwordTypo]}
          placeholder="Enter your full name"
          placeholderTextColor="rgba(13, 1, 64, 0.6)"
          onChangeText={text => setFullName(text)}
        />
        <Text style={[styles.email1, styles.email1Position]}>Full name</Text>
      </View>

      {/* Remember Me Checkbox */}
      <View style={[styles.rememberMe, styles.iconEyePosition]}>
        <CheckBox
          style={[styles.rememberMeChild, styles.childShadowBox]}
          checked={rememberMe}
          onPress={() => setRememberMe(!rememberMe)}
          checkedColor="#e6e1ff"
          containerStyle={styles.rectangleCheckboxLayout}
        />
        <Text style={[styles.rememberMe1]}>Remember me</Text>
      </View>

      {/* Signup Button */}
      <TouchableOpacity style={[styles.save, styles.savePosition]} onPress={handleSignup}>
        <View style={[styles.saveChild, styles.savePosition]} />
        <Text style={[styles.signUp1]}>Sign up</Text>
      </TouchableOpacity>

      {/* "Forgot Password" text */}
      <Text style={[styles.forgotPassword, styles.email1Position]}>
        Forgot Password?
      </Text>

      {/* "Already have an account" text */}
      <Pressable
        style={[styles.youDontHaveContainer, styles.password1Position]}
      >
        <Text style={[styles.text, styles.passwordTypo]}>
          <Text style={styles.youDontHave}>You don't have an account yet? </Text>
          <TouchableOpacity onPress={handleSignInPress}>
            <Text style={styles.signIn}>Sign in</Text>
          </TouchableOpacity>
        </Text>
      </Pressable>

      {/* Additional text */}
      <Text style={[styles.loremIpsumDolor, styles.passwordTypo]}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      </Text>

      {/* "Create an Account" text */}
      <Text style={[styles.createAnAccount, styles.email1Position]}>
        Create an Account
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rectangleCheckboxLayout: {
    backgroundColor: "transparent",
    padding: 0,
    left: 0,
    marginTop: -12,
    top: "50%",
    position: "absolute",
  },
  emailPosition: {
    height: 76,
    width: 317,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  childPosition: {
    height: 174,
    width: 375,
    borderRadius: Border.br_3xs,
    marginTop: -70,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  iconEyePosition: {
    height: 24,
    top: "50%",
    position: "absolute",
  },
  email1Typo: {
    fontFamily: FontFamily.dMSansBold,
    fontWeight: "700",
  },
  passwordTypo: {
    fontFamily: FontFamily.dMSansRegular,
    fontSize: FontSize.size_xs,
  },
  signUp1Position: {
    marginTop: 0,
    top: "50%",
    position: "absolute",
  },
  email1Position: {
    color: Color.colorMidnightblue_200,
    textAlign: "left",
    top: "50%",
    position: "absolute",
  },
  childShadowBox: {
    shadowOpacity: 1,
    elevation: 62,
    shadowRadius: 62,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(153, 171, 198, 0.18)",
  },
  savePosition: {
    height: 50,
    width: 266,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  password1Position: {
    top: "50%",
    position: "absolute",
  },
  passwordChild: {
    marginLeft: -188.5,
  },
  iconEye: {
    marginTop: 1,
    left: 271,
    width: 24,
  },
  password1: {
    color: "#150b3d",
    textAlign: "left",
    fontSize: FontSize.size_xs,
    left: 0,
    marginTop: -38,
    fontWeight: "700",
    top: "50%",
    position: "absolute",
  },
  password2: {
    width: 240,
    left: 12,
    marginTop: 0,
    fontFamily: FontFamily.dMSansRegular,
    top: "50%",
    position: "absolute",
  },
  password: {
    marginTop: 29,
    marginLeft: -157.5,
    width: 250,
  },
  brandonelouisgmailcom: {
    width: 285,
    left: 15,
    fontFamily: FontFamily.dMSansRegular,
    fontSize: FontSize.size_xs,
  },
  email1: {
    fontFamily: FontFamily.dMSansBold,
    fontWeight: "700",
    fontSize: FontSize.size_xs,
    left: 0,
    marginTop: -38,
  },
  email: {
    marginTop: -61,
    marginLeft: -157.5,
    width: 317,
  },
  fullNameChild: {
    marginLeft: -187.5,
  },
  brandoneLouis: {
    left: 16,
    marginTop: 0,
    width: 285,
    fontFamily: FontFamily.dMSansRegular,
    top: "50%",
    position: "absolute",
  },
  fullName: {
    marginTop: -152,
    marginLeft: -158.5,
  },
  rememberMeChild: {
    borderRadius: Border.br_8xs,
    backgroundColor: Color.colorLavender,
  },
  rememberMe1: {
    left: 41,
    marginTop: 3,
    color: Color.colorDarkgray_100,
    fontFamily: FontFamily.dMSansRegular,
    fontSize: FontSize.size_xs,
    textAlign: "left",
  },
  rememberMe: {
    marginTop: 125,
    left: 29,
    width: 123,
  },
  saveChild: {
    marginTop: -25,
    marginLeft: -133,
    borderRadius: Border.br_7xs,
    backgroundColor: Color.colorMidnightblue_100,
    shadowOpacity: 1,
    elevation: 62,
    shadowRadius: 62,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(153, 171, 198, 0.18)",
  },
  signUp1: {
    marginLeft: -32.83,
    marginTop: 14,
    fontSize: FontSize.size_sm,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: Color.colorWhite,
    width: 66,
    textAlign: "left",
    fontFamily: FontFamily.dMSansBold,
    fontWeight: "700",
    left: "50%",
  },
  save: {
    marginTop: 169,
    marginLeft: -133.5,
  },
  forgotPassword: {
    marginTop: 129,
    right: 31,
    fontFamily: FontFamily.dMSansRegular,
    fontSize: FontSize.size_xs,
  },
  youDontHave: {
    color: Color.colorDimgray,
  },
  signIn: {
    textDecoration: "underline",
    color: Color.colorDarkorange,
  },
  text: {
    marginTop: 243,
    marginLeft: -110.5,
    textAlign: "left",
  },
  youDontHaveContainer: {
    left: "50%",
  },
  loremIpsumDolor: {
    marginTop: -254,
    marginLeft: -145.5,
    lineHeight: 19,
    textAlign: "center",
    width: 291,
    color: Color.colorDimgray,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  createAnAccount: {
    marginTop: -304,
    marginLeft: -125,
    fontSize: FontSize.size_11xl,
    fontFamily: FontFamily.dMSansBold,
    fontWeight: "700",
    left: "50%",
  },
  signUp: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default SignUp;
