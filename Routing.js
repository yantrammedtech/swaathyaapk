

import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/components/Dashboard/Home";
import LoginScreen from "./src/components/Pages/Login";
import Page1 from "./src/components/Pages/Page1";
import Dashboard from "./src/components/Dashboard/Dashboard";
import TriageDashboard from './src/components/Triage/TriageDashboard';
import PeopleList from "./src/components/Triage/PeopleList";
import Profile from "./src/components/Triage/Profile";
import DataVisualization from "./src/components/Triage/DataVisualization";

import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();


// const Stack = createStackNavigator();

const Routing = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
           
                <Stack.Screen name="dashboard" component={Dashboard}  options={{ headerShown: false }} />
                <Stack.Screen name="TriageDashboard" component ={TriageDashboard}   options={{ headerShown: false }} />
                <Stack.Screen name="PeopleList" component={PeopleList} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen
  name="DataVisualization"
  component={DataVisualization}
  options={({ navigation }) => ({
    headerStyle: {
      backgroundColor: '#1977f3', 
    },
    headerTitleAlign: 'center', 
    headerTitleStyle: {
      color: '#fff', 
    },
    headerLeft: () => (
      <Icon
        name="chevron-left" 
        size={24}
        color="#fff"
        style={{ marginLeft: 15 }}
        onPress={() => navigation.goBack()}
      />
    ),
  })}
/>

                
                <Stack.Screen name="Splash" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
                <Stack.Screen name="Page1" component={Page1} options={{ title: 'Page1' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

  
  export default Routing;