

import { View, Text } from "react-native";
import React, { useState } from "react";
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




import EmergencyTriage from "./src/components/Triage/EmergencyTriage";
import RedZonePage from "./src/components/Triage/RedZonePage";
import EmergencyTriageScreen from "./src/components/Triage/EmergecyTriageScreen";
import EmergencyTriageNextScreen from "./src/components/Triage/EmergencyTriageNextScreen";
import NextScreen from "./src/components/Triage/EmergencyTriageNextScreen2";
import Trauma from "./src/components/Triage/Trauma";
import EmergencyDashboard from "./src/components/Emergency/EmergencyDashboard";
import EmergencyActivePeopleList from "./src/components/Emergency/EmergencyActivePeopleList";
import ProfilePage from "./src/components/Pages/ProfilePage";
import PatientProfile from "./src/components/Emergency/PatientProfile";
import CommonPatientProfile from "./src/components/Pages/PatientProfile";

import Icon from 'react-native-vector-icons/MaterialIcons';
import EmergencyZoneSelector from "./src/components/Emergency/switchZone";
import InPatientsList from "./src/components/InPatient/InPatientsList";
import OutPatientsList from "./src/components/OutPatient/OutPatientsList";
import EmrgDataVisualization from "./src/components/Emergency/EmrgDataVisualization";
import EmergencyDischargePeopleList from "./src/components/Emergency/EmergencyDischargePeopleList";
import HandshakeModal from "./src/components/Emergency/HandShake";
import TransferPatientForm from "./src/components/Emergency/TransferPatient";
import RequestSurgeryForm from "./src/components/Emergency/ReqSurgery";
import DischargeForm from "./src/components/Emergency/DischargeForm";
import HubScreen from "./src/components/Dashboard/Hub";
import HelpSupportScreen from "./src/components/Dashboard/Help/HelpScreen";
import VideosScreen from "./src/components/Dashboard/Help/VideosScreen";
import ManualsScreen from "./src/components/Dashboard/Help/Manuals";
import SupportScreen from "./src/components/Dashboard/Help/Support";
import ChatScreen from "./src/components/Dashboard/Help/Chat";
import OtDashboard from "./src/components/OT/OtDashboard";
import EmergencyPatientList from "./src/components/OT/EmergencyPatientList";
import ElectivePatientList from "./src/components/OT/ElectivePatientList";
import PreOpRecord from "./src/components/OT/PreOpRecord";
import OtDataVisualization from './src/components/OT/OtDataVisualization'
import OtPatientProfile from "./src/components/OT/OtPatientProfile";
import OtPhysicalExamination from "./src/components/OtTabs/OtPhysicalExamination/OtPhysicalExamination";
import PreOp from "./src/components/OtTabs/PreOP/PreOP";
import ConsentForm from "./src/components/OtTabs/PreOP/ConsentForm";
import ScheduleScreen from "./src/components/OtTabs/PreOP/Schedule";
import Calendar from "./src/components/OT/Calendar";
import AnaesthesiaRecord from "./src/components/OtTabs/PreOP/AnaesthesiaRecord ";
import PreOpRecordAfterSchedule from "./src/components/OtTabs/PreOP/preOpAfterSchedule";

import { IconButton, Menu, Divider } from 'react-native-paper';
import PostOpRecord from "./src/components/OtTabs/PreOP/PostOpRecord";

const Stack = createNativeStackNavigator();


// const Stack = createStackNavigator();

const Routing = () => {

 

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="TriageDashboard" component={TriageDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="Hub" component={HubScreen}  options={{
    headerStyle: {
      backgroundColor: '#1977f3',
    },
  }}  />
        {/* ============Help =============== */}

        <Stack.Screen name="helpScreen" component={HelpSupportScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Videos" component={VideosScreen} />
        <Stack.Screen name="Manuals" component={ManualsScreen} />
        <Stack.Screen name="Support" component={SupportScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        {/* ============common patient profile=========== */}
        <Stack.Screen
          name="CommonPatientProfile"
          component={CommonPatientProfile}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'Patient Profile',
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

        <Stack.Screen
          name="PatientProfile"
          component={ProfilePage}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'Patient Profile',
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
        

        <Stack.Screen name="EmergencyDashboard" component={EmergencyDashboard} options={{ headerShown: false }} />
        <Stack.Screen
          name="EmergencyActivePeopleList"
          component={EmergencyActivePeopleList}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'Active People List',
            headerLeft: () => (
              <Icon
                name="chevron-left"
                size={24}
                color="#fff"
                style={{ marginLeft: 15 }}
                onPress={() => navigation.goBack()}
              />
            ),
            headerRight: () => (
              <Icon
                name="more-vert" // This is the icon resembling a colon (vertical ellipsis)
                size={24}
                color="#fff"
                style={{ marginRight: 15 }}
                onPress={() => {
                  // Handle press event here
                }}
              />
            ),
          })}
        />

<Stack.Screen
          name="EmergencyDischargePeopleList"
          component={EmergencyDischargePeopleList}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'Discharged  Patient List',
            headerLeft: () => (
              <Icon
                name="chevron-left"
                size={24}
                color="#fff"
                style={{ marginLeft: 15 }}
                onPress={() => navigation.goBack()}
              />
            ),
            headerRight: () => (
              <Icon
                name="more-vert" // This is the icon resembling a colon (vertical ellipsis)
                size={24}
                color="#fff"
                style={{ marginRight: 15 }}
                onPress={() => {
                  // Handle press event here
                }}
              />
            ),
          })}
        />

<Stack.Screen name="Handshake" component={HandshakeModal} options={{ headerShown: false }} />
<Stack.Screen name="TransferPatient" component={TransferPatientForm} options={{ headerShown: false }} />
<Stack.Screen name="RequestSurgery" component={RequestSurgeryForm} options={{ headerShown: false }} />
<Stack.Screen name="DischargePatient" component={DischargeForm} options={{ headerShown: false }} />


{/* ==========================triage Routing start==RequestSurgery====== */}
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
        <Stack.Screen
          name="PeopleList"
          component={PeopleList}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'People List',
            headerLeft: () => (
              <Icon
                name="chevron-left"
                size={24}
                color="#fff"
                style={{ marginLeft: 15 }}
                onPress={() => navigation.goBack()}
              />
            ),
            headerRight: () => (
              <Icon
                name="more-vert" // This is the icon resembling a colon (vertical ellipsis)
                size={24}
                color="#fff"
                style={{ marginRight: 15 }}
                onPress={() => {
                  // Handle press event here
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name="RedZonePage"
          component={RedZonePage}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'Emergency Triage',
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

        <Stack.Screen
          name="EmergencyTriageScreen"
          component={EmergencyTriageScreen}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'Emergency Triage',
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



        <Stack.Screen
          name="EmergencyTriageNextScreen"
          component={EmergencyTriageNextScreen}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'Emergency Triage',
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


        <Stack.Screen
          name="NextScreen"
          component={NextScreen}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'Emergency Triage',
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


        <Stack.Screen
          name="Trauma"
          component={Trauma}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'Emergency Triage',
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

        <Stack.Screen
          name="EmergencyTriage"
          component={EmergencyTriage}
          options={{ headerShown: false }}
        />
{/* ==========================triage Routing end======================== */}

{/* =====================red=start=============== */}
         <Stack.Screen
          name="RedZonePatientProfile"
          component={PatientProfile}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="switchZone"
          component={EmergencyZoneSelector}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="EmergencyDataVisualization"
          component={EmrgDataVisualization}
          options={{ headerShown: false }}
        />
       

{/* =====================red=end=============== */}




         {/* ===================InPatient start================= */}
         <Stack.Screen
          name="InPatientsList"
          component={InPatientsList}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'In Patients List',
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
         {/* ===================InPatient End================= */}

         {/* ===================OutPatient start================= */}
         <Stack.Screen
          name="OutPatientsList"
          component={OutPatientsList}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'Out Patients List',
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
         {/* ===================OutPatient End================= */}

  {/* ===================Ot Start================= */}

         <Stack.Screen name="OtDashboard" component={OtDashboard} options={{ headerShown: false }} />
         <Stack.Screen
          name="EmergencyPatientList"
          component={EmergencyPatientList}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'Emergency Patient List ',
            headerLeft: () => (
              <Icon
                name="chevron-left"
                size={24}
                color="#fff"
                style={{ marginLeft: 15 }}
                onPress={() => navigation.goBack()}
              />
            ),
            headerRight: () => (
              <Icon
                name="more-vert" // This is the icon resembling a colon (vertical ellipsis)
                size={24}
                color="#fff"
                style={{ marginRight: 15 }}
                onPress={() => {
                  // Handle press event here
                }}
              />
            ),
          })}
        />

<Stack.Screen
          name="ElectivePatientList"
          component={ElectivePatientList}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'Elective Patient List ',
            headerLeft: () => (
              <Icon
                name="chevron-left"
                size={24}
                color="#fff"
                style={{ marginLeft: 15 }}
                onPress={() => navigation.goBack()}
              />
            ),
            headerRight: () => (
              <Icon
                name="more-vert" // This is the icon resembling a colon (vertical ellipsis)
                size={24}
                color="#fff"
                style={{ marginRight: 15 }}
                onPress={() => {
                  // Handle press event here
                }}
              />
            ),
          })}
        />

        
<Stack.Screen
          name="PreOpRecord"
          component={PreOpRecord}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'Pre-Op Record',
            headerLeft: () => (
              <Icon
                name="chevron-left"
                size={24}
                color="#fff"
                style={{ marginLeft: 15 }}
                onPress={() => navigation.goBack()}
              />
            )
            
          })}
        />

<Stack.Screen
          name="OtPatientProfile"
          component={OtPatientProfile}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'Patient Profile',
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


<Stack.Screen
          name="OtDataVisualization"
          component={OtDataVisualization}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'DataVisualization',
            headerLeft: () => (
              <Icon
                name="chevron-left"
                size={24}
                color="#fff"
                style={{ marginLeft: 15 }}
                onPress={() => navigation.goBack()}
              />
            )
           
          })}
        />


<Stack.Screen
          name="OtPhysicalExamination"
          component={OtPhysicalExamination}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'PhysicalExamination',
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

        
<Stack.Screen
          name="OtPreOP"
          component={PreOp}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'Pre OP-Record',
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

               
<Stack.Screen
          name="ConsentForm"
          component={ConsentForm}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'Consent Form',
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

                      
<Stack.Screen
          name="Schedule"
          component={ScheduleScreen}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'Schedule',
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

                     
<Stack.Screen
          name="Calendar"
          component={Calendar}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'Calendar',
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


                   
<Stack.Screen
          name="AnaesthesiaRecord"
          component={AnaesthesiaRecord}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'Anaesthesia Record',
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

                  
<Stack.Screen
          name="PostOpRecord"
          component={PostOpRecord}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'Post OP-Record',
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

    
<Stack.Screen
          name="PreOpRecordAfterSchedule"
          component={PreOpRecordAfterSchedule}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1977f3',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#fff',
            },
            headerTitle: 'Pre OP-Record',
            headerLeft: () => (
              <Icon
                name="chevron-left"
                size={24}
                color="#fff"
                style={{ marginLeft: 15 }}
                onPress={() => navigation.goBack()}
              />
            ),

            headerRight: () => (
              <Icon
                name="more-vert" // This is the icon resembling a colon (vertical ellipsis)
                size={24}
                color="#fff"
                style={{ marginRight: 15 }}
                onPress={() => {
                  // Handle press event here
                }}
              />
            ),
           
           
          })}
        />

  {/* ===================Ot End====PreOpRecordAfterSchedule============= */}

        <Stack.Screen name="Page1" component={Page1} options={{ title: 'Page1' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default Routing;