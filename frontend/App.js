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
import SplashScreenNews from "./screens/SplashScreenNews";
import Property1Unselected from "./components/Property1Unselected";

import Sample from "./screens/sample";
import DeleteMsgCertificates from "./screens/DeleteMsgCertificates"


import Appointments from "./screens/Appointments";
import EditAppoinment from "./screens/EditAppoinment";
import AddAppointment from "./screens/AddAppoinment";
import AppoinmentUpdateSuccess from "./screens/AppoinmentUpdateSuccess";
import AppoinmentDeleteSuccess from "./screens/AppoinmentDeleteSuccess";
import AppoinmentAdminHome from "./screens/AppoinmentAdminHome";
import AppointmentView from "./screens/AppointmentView";
import AddAppointments from "./screens/AddAppoinment";
import AppoinmentSuccess from "./screens/AppoinmentSuccess";
import AppoinmentAdminView from "./screens/AppoinmentAdminView";
import UserHomePage from "./screens/UserHomePage";
import AdminHomePage from "./screens/AdminHomePage";


import AddCertificates from "./screens/AddCertificates";
import AdminApprovalGeneral from "./screens/AdminApprovalGeneral";
import CertificateList from "./screens/CertificateList";
import AdminApprovalCertificates from "./screens/AdminApprovalCertificates"
import ApprovedMsg from "./screens/ApprovedMsg";
import RejectMsg from "./screens/RejectMsg";
import PaymentUI from "./screens/PaymentUI";
import EditCertificate from "./screens/EditCertificate";
import SuccessMsgCertificates from "./screens/SuccessMsgCertificates";
import UpdateMsgCertificates from "./screens/UpdateMsgCertificates";
//import DeleteMsgCertificates from "./screens/DeleteMsgCertificates";
import AdminCertificateView from "./screens/AdminCertificateView";




import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UserNewsView from "./screens/UserNewsView";
import NewsView from "./screens/NewsView";
import MyNews from "./screens/MyNews";
import UpdateNews from "./screens/UpdateNews";
import AdminNews from "./screens/AdminNews";
import CreateNews from "./screens/CreateNews";
import ChatInterface from "./screens/ChatInterface";
import ChatInterfaceAdminSide from "./screens/ChatInterfaceAdminSide";
import NewsAdminHome from "./screens/NewsAdminHome";
import NewsUserHome from "./screens/NewsUserHome";


const App = () => {



  const [isLoaded, setIsLoaded] = useState(false);


  const [showSplashScreens, setShowSplashScreens] = useState(true);

  useEffect(() => {
    async function checkAppOpened() {
      try {
        const hasAppOpenedBefore = await AsyncStorage.getItem('appOpenedBefore');
        if (hasAppOpenedBefore) {
          setShowSplashScreens(false);
        } else {
          await AsyncStorage.setItem('appOpenedBefore', 'true');
        }
      } catch (error) {
        console.error('Error checking app open status:', error);
      }
    }

    checkAppOpened();
  }, []);


  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  const [token, setToken] = useState(null); // Initialize the token state

  // Check if the token is already stored in AsyncStorage when the app starts
  useEffect(() => {
    const getTokenFromStorage = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Error retrieving token from AsyncStorage:', error);
      }
    };

    getTokenFromStorage();
  }, []);


  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={showSplashScreens ? 'SplashScreenAppointments' : 'Login'}
          screenOptions={{ headerShown: false }}
        >

          <Stack.Screen
            name="SplashScreenAppointments"
            component={SplashScreenAppointments}
            options={{ headerShown: false }}
          />





          <Stack.Screen
            name="DeleteMsgCertificates"
            component={DeleteMsgCertificates}
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
            name="SplashScreenNews"
            component={SplashScreenNews}
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
            name="UserHomePage"
            component={UserHomePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminHomePage"
            component={AdminHomePage}
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

          <Stack.Screen
            name="NewsView"
            component={NewsView}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UserNewsView"
            component={UserNewsView}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="NewsUserHome"
            component={NewsUserHome}
            options={{ headerShown: false }}
          />




          <Stack.Screen
            name="UpdateNews"
            component={UpdateNews}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="MyNews"
            component={MyNews}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="NewsAdminHome"
            component={NewsAdminHome}
            options={{ headerShown: false }}
          />


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
            name="ChatInterface"
            component={ChatInterface}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChatInterfaceAdminSide"
            component={ChatInterfaceAdminSide}
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
            name="CreateNews"
            component={CreateNews}
            options={{ headerShown: false }}
          />


          <Stack.Screen
            name="AppoinmentAdminHome"
            component={AppoinmentAdminHome}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="AppoinmentAdminView"
            component={AppoinmentAdminView}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="AddCertificates"
            component={AddCertificates}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="AdminApprovalGeneral"
            component={AdminApprovalGeneral}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="CertificateList"
            component={CertificateList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminCertificateView"
            component={AdminCertificateView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PaymentUI"
            component={PaymentUI}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SuccessMsgCertificates"
            component={SuccessMsgCertificates}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminApprovalCertificates"
            component={AdminApprovalCertificates}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UpdateMsgCertificates"
            component={UpdateMsgCertificates}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditCertificate"
            component={EditCertificate}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RejectMsg"
            component={RejectMsg}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ApprovedMsg"
            component={ApprovedMsg}
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
