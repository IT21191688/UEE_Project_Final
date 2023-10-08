import * as React from "react";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import your chosen icon library

//screens import
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import SplashScreenAppointments from "./screens/SplashScreenAppointments";
import SplashScreenCertificates from "./screens/SplashScreenCertificates";
import SplashScreenJobs from "./screens/SplashScreenJobs";
import Property1Unselected from "./components/Property1Unselected";
import NewsView from "./screens/NewsView";
import MyNews from "./screens/MyNews";
import AdminNews from "./screens/AdminNews";
import CreateNews from "./screens/CreateNews";
import Sample from "./screens/sample";
import Appointments from "./screens/Appointments";
import Dashboard from "./screens/Dashboard";

//jobOpportunity import
// User
import HomeScreen from "./screens/jobOpportunity/User/HomeScreen";

//Admin

//bottomTabNavigation import
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import homeScreen from "./screens/jobOpportunity/User/HomeScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ onPress, focused }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        width: 60,
        height: 60,
        backgroundColor: focused ? "#007AFF" : "#FFFFFF",
        borderRadius: 30, // Make it a circle
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10, // Adjust the vertical position as needed
        elevation: 5,
      }}
    >
      <Ionicons
        name="ios-add"
        size={30}
        color={focused ? "#FFFFFF" : "#007AFF"}
      />
    </View>
  </TouchableOpacity>
);

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        style: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 100,
          showLabel: false,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Featured Jobs"
        component={homeScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 45,
                width: 45,
                marginTop: 15,
              }}
            >
              <Ionicons
                name={focused ? "ios-home" : "ios-home-outline"}
                size={size}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={homeScreen}
        // listeners={({ navigation }) => ({
        //   tabPress: (e) => {
        //     e.preventDefault(); // Prevent navigation to a screen
        //     // You can add your logic here to perform an action when the plus icon is pressed
        //   },
        // })}
        options={({ focused }) => ({
          tabBarIcon: ({ size, color }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 60, // Adjust the height to increase the size
                width: 60, // Adjust the width to increase the size
                borderRadius: 30, // Make it a circle
              }}
            >
              <Ionicons
                name={focused ? "add-circle-sharp" : "add-circle-sharp"}
                size={60} // Adjust the size of the plus icon
                color={color} // White plus icon
              />
            </View>
          ),
          tabBarLabel: "", // This will hide the label
        })}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 45,
                width: 45,
                marginTop: 15,
              }}
            >
              <Ionicons
                name={
                  focused
                    ? "chatbubble-ellipses"
                    : "chatbubble-ellipses-outline"
                }
                size={size}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  const [fontsLoaded, error] = useFonts({
    "DMSans-Regular": require("./assets/fonts/DMSans-Regular.ttf"),
    "DMSans-Bold": require("./assets/fonts/DMSans-Bold.ttf"),
    "OpenSans-SemiBold": require("./assets/fonts/OpenSans-SemiBold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Archivo-Bold": require("./assets/fonts/Archivo-Bold.ttf"),
    "Archivo-ExtraBoldItalic": require("./assets/fonts/Archivo-ExtraBoldItalic.ttf"),
    "Archivo-BlackItalic": require("./assets/fonts/Archivo-BlackItalic.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
  });

  const [user, setUser] = React.useState(null);

  useEffect(() => {
    setUser(true);
  }, []);

  if (!fontsLoaded && !error) {
    return null;
  }

  if (!user) {
    return (
      <>
        {hideSplashScreen ? (
          <Stack.Navigator
            // initialRouteName="SplashScreenJobs"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="SplashScreenAppointments"
              component={SplashScreenAppointments}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SplashScreenCertificates"
              component={SplashScreenCertificates}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SplashScreenJobs"
              component={SplashScreenJobs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewsView"
              component={NewsView}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MyNews"
              component={MyNews}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AdminNews"
              component={AdminNews}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateNews"
              component={CreateNews}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Sample"
              component={Sample}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Appointments"
              component={Appointments}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </>
    );
  } else {
    return (
      <>
        {hideSplashScreen ? (
          <Stack.Navigator>
            <Stack.Screen
              name="TabNavigator"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </>
    );
  }
};

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
