import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FacilityDetails from './FacilityDetails'
import DoctorDetails from './DoctorDetails'
import EnterNameDetails from './EnterNameDetails'
import GenerateOtpforLoginScreen from './GenerateOtpforLoginScreen'
import HospitalDepartments from './HospitalDepartments'
import HospitalSearch from './HospitalSearch'
import DoctorFaclitiesList from './DoctorFaclitiesList'
import HospitalDetails from './HospitalDetails'
import { COLORS } from './theme';
import EnterGeneratedOTP from './EnterGeneratedOTP'
import SplashScreen from './SplashScreen'
GLOBAL = require('./globals');
import HomePage from './Cluzn-Eva/HomePage'
import Categories from './Cluzn-Eva/Categories'
import DoctorDescription from './Cluzn-Eva/DoctorDescription'
import AppointmentDetails from './Cluzn-Eva/AppointmentDetails'
import Webinar from './Cluzn-Eva/Webinar'
import WebinarDetails from './Cluzn-Eva/WebinarDetails'
import PackageDetails from './Cluzn-Eva/PackageDetails'
import PurchaseForm from './Cluzn-Eva/PurchaseForm'
import WebinarPurchaseForm from './Cluzn-Eva/WebinarPurchaseForm'
import Video1 from './Cluzn-Eva/Video1'
import BlogDetail from './Cluzn-Eva/BlogDetail';

const HomeStack = createStackNavigator();

export default function HomeStackScreen({ navigation }) {
  return (
    <NavigationContainer>
      <HomeStack.Navigator initialRouteName='SplashScreen'
        screenOptions={{
          headerShown: false
        }}
      >
        <HomeStack.Screen name="SplashScreen" component={SplashScreen}></HomeStack.Screen>
        <HomeStack.Screen name="GenerateOtpforLoginScreen" component={GenerateOtpforLoginScreen}></HomeStack.Screen>
        <HomeStack.Screen name="EnterGeneratedOTP" component={EnterGeneratedOTP}></HomeStack.Screen>
        <HomeStack.Screen name="EnterNameDetails" component={EnterNameDetails}></HomeStack.Screen>
        <HomeStack.Screen name="HospitalSearch" component={HospitalSearch}></HomeStack.Screen>
        <HomeStack.Screen name="HospitalDepartments" component={HospitalDepartments}></HomeStack.Screen>
        <HomeStack.Screen name="FacilityDetails" component={FacilityDetails}></HomeStack.Screen>
        <HomeStack.Screen name="DoctorDetails" component={DoctorDetails}></HomeStack.Screen>
        <HomeStack.Screen name="DoctorFaclitiesList" component={DoctorFaclitiesList}></HomeStack.Screen>
        <HomeStack.Screen name="HospitalDetails" component={HospitalDetails}></HomeStack.Screen>
        <HomeStack.Screen name="HomePage" component={HomePage}></HomeStack.Screen>
        <HomeStack.Screen name="Categories" component={Categories}></HomeStack.Screen>
        <HomeStack.Screen name="DoctorDescription" component={DoctorDescription}></HomeStack.Screen>
        <HomeStack.Screen name="AppointmentDetails" component={AppointmentDetails}></HomeStack.Screen>
        <HomeStack.Screen name="Webinar" component={Webinar}></HomeStack.Screen>
        <HomeStack.Screen name="WebinarDetails" component={WebinarDetails}></HomeStack.Screen>
        <HomeStack.Screen name="PackageDetails" component={PackageDetails}></HomeStack.Screen>
        <HomeStack.Screen name="PurchaseForm" component={PurchaseForm}></HomeStack.Screen>
        <HomeStack.Screen name="WebinarPurchaseForm" component={WebinarPurchaseForm}></HomeStack.Screen>
        <HomeStack.Screen name="Video1" component={Video1}></HomeStack.Screen>
        <HomeStack.Screen name="BlogDetail" component={BlogDetail}></HomeStack.Screen>
        
      
      </HomeStack.Navigator>
    </NavigationContainer>
  )
}