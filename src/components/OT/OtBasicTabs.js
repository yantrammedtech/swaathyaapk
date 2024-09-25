import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SymptomsTab from '../OtTabs/Symptoms/Symptoms';
import VitalsTab from '../OtTabs/Vitals/Vitals';
import Report from '../OtTabs/Reports/Report';
import Medication from '../OtTabs/Medication/Medication';
import MedicalHistory from '../OtTabs/MedicalHistory/MedicalHistory';
// import MedicalHistoryScreen from '../Tabs/MedicalHistory/MedicalHistory';
// import PatientTimeline from '../Tabs/PatientTimeLine/PatientTimeLine';
// import PhysicalExamination from '../Tabs/PhysicalExamination/PhysicalExamination';
// import MedicalHistoryForm from '../Tabs/MedicalHistory/MedicalHistoryForm';


const Tab = createMaterialTopTabNavigator();

export default function OtBasicTabs() {
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
            selectedCategory === "Medication"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => setSelectedCategory("Medication")}
        >
          <Text style={styles.categoryText}>Medication</Text>
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
       
       
        
      </ScrollView>
      <View style={styles.tabContent}>
        {selectedCategory === 'Symptoms' && <SymptomsTab/>}
      {selectedCategory === 'Vitals' && <VitalsTab />} 
         {selectedCategory === 'Medication' && <Medication />} 
        {selectedCategory === 'Medical History' && <MedicalHistory />}
         {selectedCategory === 'Reports' && <Report />} 

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
