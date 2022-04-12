import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MainStackNavigator, ContactStackNavigator, LoginStackNavigator ,CampaignDetailsNavigator} from "./StackNavigator";

const Tab = createBottomTabNavigator();


const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      
      <Tab.Screen name="Ana Sayfa" component={MainStackNavigator} 
      options={{
        tabBarLabel: 'Ana Sayfa',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}/>


     
     
      <Tab.Screen name="Kampanyalar" component={ContactStackNavigator} 
       options={{
        tabBarLabel: 'Kampanyalar',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="sale" color={color} size={size} />
        ),
      }}/>
      <Tab.Screen name="Giriş" component={LoginStackNavigator} 
      options={{
        tabBarLabel: 'Giriş',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="login" color={color} size={size} />
        ),
      }}/>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;