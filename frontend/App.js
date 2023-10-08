const Stack = createNativeStackNavigator();
import * as React from "react";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
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
import EditAppoinment from "./screens/EditAppoinment";
import AddAppointment from "./screens/AddAppoinment";
import AppoinmentUpdateSuccess from "./screens/AppoinmentUpdateSuccess";
import AppoinmentDeleteSuccess from "./screens/AppoinmentDeleteSuccess";


import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import AppointmentView from "./screens/AppointmentView";
import AddAppointments from "./screens/AddAppoinment";
import AppoinmentSuccess from "./screens/AppoinmentSuccess";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);


  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={"Login"} // Adjust this based on your logic
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
            name="AppoinmentDeleteSuccess"
            component={AppoinmentDeleteSuccess}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Appointments"
            component={Appointments}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="AddAppointment"
            component={AddAppointment}
            options={{ headerShown: false }}
          />


          <Stack.Screen
            name="AppointmentView"
            component={AppointmentView}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      { /*
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator
            // initialRouteName="SplashScreenJobs"
            screenOptions={{ headerShown: false }}
          >


            <Stack.Screen
              name="AppoinmentDeleteSuccess"
              component={AppoinmentDeleteSuccess}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="AppoinmentUpdateSuccess"
              component={AppoinmentUpdateSuccess}
              options={{ headerShown: false }}
            />



            <Stack.Screen
              name="AppoinmentSuccess"
              component={AppoinmentSuccess}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditAppoinment"
              component={EditAppoinment}
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
              name="AddAppointments"
              component={AddAppointments}
              options={{ headerShown: false }}
            />









            <Stack.Screen
              name="CreateNews"
              component={CreateNews}
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
              name="AdminNews"
              component={AdminNews}
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
      */}
    </>
  );
};
export default App;
