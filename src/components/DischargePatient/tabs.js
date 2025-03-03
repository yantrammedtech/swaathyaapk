import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import PatientTimeline from '../Tabs/PatientTimeLine/PatientTimeLine';
import { useSelector } from 'react-redux';
import SymptomsTab from './Symptoms/Symptoms';
import VitalsTab from './Vitals/Vitals';
import TreatmentPlanScreen from './TreatmentPlan/TreatmentPlan';
import MedicalHistoryForm from './MedicalHistory/MedicalHistory';
import Report from './Reports/Reports';


const Tab = createMaterialTopTabNavigator();

export default function DischargeBasicTabs() {
  const currentPatient = useSelector((state) => state.currentPatientData);
  
  const [selectedCategory, setSelectedCategory] = React.useState('Symptoms');

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScrollView}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Symptoms"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => setSelectedCategory("Symptoms")}
        >
          <Text style={styles.categoryText}>Symptoms</Text>
        </TouchableOpacity>
       
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Vitals"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => setSelectedCategory("Vitals")}
        >
          <Text style={styles.categoryText}>Vitals</Text>
        </TouchableOpacity>


        
         
          <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Treatment Plan"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => setSelectedCategory("Treatment Plan")}
        >
          <Text style={styles.categoryText}> Treatment Plan
   
  </Text>
        </TouchableOpacity>

         


      

        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Medical History"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => setSelectedCategory("Medical History")}
        >
          <Text style={styles.categoryText}>Medical History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Reports"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => setSelectedCategory("Reports")}
        >
          <Text style={styles.categoryText}>Reports</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Patient Timeline"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => setSelectedCategory("Patient Timeline")}
        >
          <Text style={styles.categoryText}>Patient Timeline</Text>
        </TouchableOpacity>

       
       

       
      </ScrollView>
      <View style={styles.tabContent}>
        {selectedCategory === 'Symptoms' && <SymptomsTab />}
      
        {selectedCategory === 'Vitals' && <VitalsTab />}
        {selectedCategory === 'Treatment Plan' && <TreatmentPlanScreen/>}
        {selectedCategory === 'Medical History' && <MedicalHistoryForm />}
        {selectedCategory === 'Reports' && <Report />}
        {selectedCategory === 'Patient Timeline' && <PatientTimeline />}
      



       
        {/* Add other tab components here */}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    // backgroundColor: 'yellow',

  },
  categoryScrollView: {
    flexDirection: 'row',
   
  },
  categoryButton: {
    marginHorizontal: 7,
    paddingVertical: 0, 
  },
  activeButton: {
    borderBottomWidth: 3,
    borderBottomColor: 'blue', // Or your desired color
  },
  inactiveButton: {
    borderBottomWidth: 0,
  },
  categoryText: {
    color: 'black', // Text color for contrast
    textAlign: 'center',
    fontSize: 15,
   fontWeight:'600',
   lineHeight: 15, // Match the fontSize to minimize extra spacing
   paddingBottom: 0, // Ensure no padding below the text
   marginBottom: 0, 

  },
  tabContent: {
    // flex: 1,
 height: '90%',
    marginTop: 20,
  },
});
