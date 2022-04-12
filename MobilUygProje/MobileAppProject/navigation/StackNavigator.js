// ./navigation/StackNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";

import Campaigns from "../screens/CampaignsScreen";
import LoginScreen from "../screens/LoginScreen";
import CampaignDetailsScreen from "../screens/CampaignDetails"
import SeferScreen from "../screens/Sefer"
const Stack = createStackNavigator();

const screenOptionStyle = {
    headerShown: false,
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Ana Sayfa" component={HomeScreen} />
      <Stack.Screen name="Detay" component={CampaignDetailsScreen} />
      <Stack.Screen name="Sefer" component={SeferScreen} />

    </Stack.Navigator>
  );
}

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Campaigns" component={Campaigns} />
    </Stack.Navigator>
  );
}

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
  
}


  


export { MainStackNavigator, ContactStackNavigator ,LoginStackNavigator};