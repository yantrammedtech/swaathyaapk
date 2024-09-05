import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SymptomsTab from '../Tabs/Symptoms/Symptoms';
import TestTab from '../Tabs/TestTab/Test';
import VitalsTab from '../Tabs/Vitals/Vitals';
import TreatmentPlanScreen from '../Tabs/TreatmentPlan/TreatmentPlan';

const Tab = createMaterialTopTabNavigator();

export default function BasicTabs() {
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
            selectedCategory === "Tests"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => setSelectedCategory("Tests")}
        >
          <Text style={styles.categoryText}>Tests</Text>
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
          <Text style={styles.categoryText}>Treatment Plan</Text>
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
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "POCUS"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => setSelectedCategory("POCUS")}
        >
          <Text style={styles.categoryText}>POCUS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Physical Examination"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => setSelectedCategory("Physical Examination")}
        >
          <Text style={styles.categoryText}>Physical Examination</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.tabContent}>
        {selectedCategory === 'Symptoms' && <SymptomsTab />}
        {selectedCategory === 'Tests' && <TestTab />}
        {selectedCategory === 'Vitals' && <VitalsTab />}
        {selectedCategory === 'Treatment Plan' && <TreatmentPlanScreen />}
       
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
    // marginBottom:200,
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
    flex: 1,
    marginTop: 20,
  },
});
