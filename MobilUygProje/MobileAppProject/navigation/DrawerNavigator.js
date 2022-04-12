import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { ContactStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const screenOptionStyle = {
    headerShown: false,
  headerTintColor: "white",
  headerBackTitle: "Back",
};


const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={screenOptionStyle}>
      <Drawer.Screen name="Ana Sayfa" component={TabNavigator} />
      <Drawer.Screen name="Kampanyalar" component={TabNavigator} />
      <Drawer.Screen name="Giriş" component={TabNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;