import React, { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, Text, TextInput, View } from "react-native";
import { CheckBox } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`https://192.168.43.93:5000/login`, {
        email,
        password,

      });

      if (response.status === 200) {

        const { token, role } = response.data;

        AsyncStorage.setItem('token', token);
        AsyncStorage.setItem('role', role);

        if (role === 'admin') {
          navigation.navigate('AdminHome');
        } else {
          navigation.navigate('UserHome');
        }
        Alert.alert('Success', 'Login successful');
      } else {
        Alert.alert('UnSuccess', 'Login Unsuccessful');
        console.error('Login failed:', response.statusText);

      }
    } catch (error) {
      Alert.alert('UnSuccess', 'Login Unsuccessful');
      console.error('Login error:', error);

    }
  };



  const [rectangleCheckboxchecked, setRectangleCheckboxchecked] =
    useState(false);

  return (
    <View style={styles.login}>
      {/* Email Input */}
      <View style={[styles.email, styles.emailPosition]}>
        <Image
          style={[styles.passwordChild, styles.passwordChildPosition]}
          contentFit="cover"
          source={require("../assets/rectangle-59.png")}
        />
        <TextInput
          style={[styles.brandonelouisgmailcom, styles.passwordTypo]}
          placeholder="Brandonelouis@gmail.com"
          placeholderTextColor="rgba(13, 1, 64, 0.6)"
          onChangeText={text => setEmail(text)}
        />
        <Text style={[styles.email1, styles.email1Typo]}>Email</Text>
      </View>

      {/* Password Input */}
      <View style={[styles.password, styles.emailPosition]}>
        <Image
          style={[styles.passwordChild, styles.passwordChildPosition]}
          contentFit="cover"
          source={require("../assets/rectangle-59.png")}
        />
        <TextInput
          style={[styles.password2, styles.passwordTypo]}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="rgba(13, 1, 64, 0.6)"
          onChangeText={text => setPassword(text)}
        />
        <Text style={[styles.password1, styles.passwordClr]}>Password</Text>
      </View>

      {/* Remember Me Checkbox */}
      <View style={[styles.rememberMe, styles.iconEyeLayout]}>
        <CheckBox
          style={[styles.rememberMeChild, styles.childShadowBox]}
          checked={rememberMe}
          onPress={() => setRememberMe(!rememberMe)}
          checkedColor="#e6e1ff"
          containerStyle={styles.rectangleCheckboxLayout}
        />
        <Text style={[styles.rememberMe1, styles.login1Position]}>
          Remember me
        </Text>
      </View>

      {/* Login Button */}
      <Pressable style={[styles.save, styles.savePosition]} onPress={handleLogin}>
        <View style={[styles.saveChild, styles.savePosition]} />
        <Text style={[styles.login1, styles.login1Position]}>Login</Text>
      </Pressable>

      {/* Forgot Password */}
      <Text style={[styles.forgotPassword, styles.passwordTypo]}>
        Forgot Password?
      </Text>

      {/* "Don't have an account" text */}
      <Pressable
        style={[styles.youDontHaveContainer, styles.passwordChildPosition]}
      >
        <Text style={[styles.text, styles.passwordTypo]}>
          <Text style={styles.youDontHave}>You don't have an account yet? </Text>
          <Text style={styles.signUp}>Sign up</Text>
        </Text>
      </Pressable>

      {/* Additional text */}
      <Text style={[styles.loremIpsumDolor, styles.passwordTypo]}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      </Text>

      {/* Welcome Back text */}
      <Text style={[styles.welcomeBack, styles.email1Typo]}>Welcome Back</Text>
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
    marginLeft: -158.5,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  passwordChildPosition: {
    position: "absolute",
    left: "50%",
    top: "50%",
  },
  iconEyeLayout: {
    height: 24,
    position: "absolute",
  },
  passwordClr: {
    color: Color.colorMidnightblue_200,
    textAlign: "left",
    position: "absolute",
  },
  passwordTypo: {
    fontFamily: FontFamily.dMSansRegular,
    fontSize: FontSize.size_xs,
  },
  email1Typo: {
    fontFamily: FontFamily.dMSansBold,
    fontWeight: "700",
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
  login1Position: {
    marginTop: -8,
    textAlign: "left",
    top: "50%",
    position: "absolute",
  },
  savePosition: {
    height: 50,
    width: 266,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  passwordChild: {
    marginTop: -70,
    marginLeft: -187.5,
    borderRadius: Border.br_3xs,
    width: 375,
    height: 174,
    left: "50%",
    top: "50%",
  },
  iconEye: {
    top: 39,
    left: 282,
    width: 24,
  },
  password1: {
    fontWeight: "600",
    fontFamily: FontFamily.openSansSemiBold,
    textAlign: "left",
    fontSize: FontSize.size_xs,
    left: 3,
    top: 0,
    color: Color.colorMidnightblue_200,
  },
  password2: {
    top: 38,
    width: 240,
    left: 15,
    fontFamily: FontFamily.dMSansRegular,
    position: "absolute",
  },
  password: {
    marginTop: -61,
  },
  brandonelouisgmailcom: {
    top: 38,
    left: 15,
    width: 285,
    fontFamily: FontFamily.dMSansRegular,
    position: "absolute",
  },
  email1: {
    textAlign: "left",
    color: Color.colorMidnightblue_200,
    position: "absolute",
    fontSize: FontSize.size_xs,
    left: 3,
    top: 0,
  },
  email: {
    marginTop: -152,
  },
  rememberMeChild: {
    borderRadius: Border.br_8xs,
    backgroundColor: Color.colorLavender,
  },
  rememberMe1: {
    left: 39,
    color: Color.colorDarkgray_100,
    fontFamily: FontFamily.dMSansRegular,
    fontSize: FontSize.size_xs,
  },
  rememberMe: {
    marginTop: 35,
    left: 32,
    width: 121,
    top: "50%",
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
  login1: {
    marginLeft: -23,
    fontSize: FontSize.size_sm,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: Color.colorWhite,
    fontFamily: FontFamily.dMSansBold,
    fontWeight: "700",
    left: "50%",
  },
  save: {
    marginTop: 91,
    marginLeft: -130.5,
  },
  forgotPassword: {
    marginTop: 39,
    right: 21,
    textAlign: "left",
    color: Color.colorMidnightblue_200,
    position: "absolute",
    top: "50%",
  },
  youDontHave: {
    color: Color.colorDimgray,
  },
  signUp: {
    textDecoration: "underline",
    color: Color.colorDarkorange,
  },
  text: {
    marginTop: 173,
    marginLeft: -110.5,
    textAlign: "left",
  },
  youDontHaveContainer: {
    left: "50%",
    top: "50%",
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
  welcomeBack: {
    marginTop: -308,
    marginLeft: -100,
    fontSize: FontSize.size_11xl,
    textAlign: "left",
    color: Color.colorMidnightblue_200,
    position: "absolute",
    left: "50%",
    top: "50%",
  },
  login: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default Login;
