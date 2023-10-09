const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import SplashScreenAppointments from "./screens/SplashScreenAppointments";
import SplashScreenCertificates from "./screens/SplashScreenCertificates";
import SplashScreenJobs from "./screens/SplashScreenJobs";
import SplashScreenNews from "./screens/SplashScreenNews";
import Property1Unselected from "./components/Property1Unselected";
import NewsView from "./screens/NewsView";
import MyNews from "./screens/MyNews";
import AdminNews from "./screens/AdminNews";
import CreateNews from "./screens/CreateNews";
import Sample from "./screens/sample";
import Appointments from "./screens/Appointments";


import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import AppointmentView from "./screens/AppointmentView";
import AddAppointments from "./screens/AddAppoinment";

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

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator
            // initialRouteName="SplashScreenJobs"
            screenOptions={{ headerShown: false }}
          >

            <Stack.Screen
              name="SplashScreenNews"
              component={SplashScreenNews}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="AddAppointments"
              component={AddAppointments}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="AppointmentView"
              component={AppointmentView}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Appointments"
              component={Appointments}
              options={{ headerShown: false }}
            />





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

          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;
