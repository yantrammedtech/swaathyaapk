import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Airway from '../../OtPhysicalTabs/Airway/Airway';
import PhysicalExamination from '../../OtPhysicalTabs/PhysicalExamination/PhysicalExamination';
import Respiratory from '../../OtPhysicalTabs/Respiratory/Respiratory';
import Hepato from '../../OtPhysicalTabs/Hepato/Hepato';
import CardioVascular from '../../OtPhysicalTabs/CardioVascular/CardioVascular';
import Neuro from '../../OtPhysicalTabs/Neuro/Neuro';
import Renal from '../../OtPhysicalTabs/Renal/Renal'
import Other from '../../OtPhysicalTabs/Other/Other';
import { useSelector } from 'react-redux';
import { authFetch } from '../../../axios/authFetch';


export default function OtPhyBasicTabs() {

  const user = useSelector((state) => state.currentUserData);
  const currentPatient = useSelector((state) => state.currentPatientData);
  const patientTimeLineID = currentPatient?.patientTimeLineID;

  const [selectedCategory, setSelectedCategory] = React.useState('Air way');



  const getOTData = async () => {
    try {
      const response = await authFetch(
        `ot/${user.hospitalID}/${patientTimeLineID}/getOTData`,
        user.token
      );
      console.log("response=====",response)
      if (response.status == 200) {
        const physicalExaminationData = response.data[0].physicalExamination;
       
        const preOPData = response.data[0].preopRecord;
        
      }
    } catch (error) {
      // console.log("error");
    }
  };

  React.useEffect(() => {
    getOTData()
  },[])

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScrollView}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Air way"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => setSelectedCategory("Air way")}
        >
          <Text style={styles.categoryText}>Air way</Text>
        </TouchableOpacity>
       
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "General Physical Examination"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => setSelectedCategory("General Physical Examination")}
        >
          <Text style={styles.categoryText}>General Physical Examination</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Respiratory"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => setSelectedCategory("Respiratory")}
        >
          <Text style={styles.categoryText}>Respiratory</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Hepato/Gastrointestinal"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => setSelectedCategory("Hepato/Gastrointestinal")}
        >
          <Text style={styles.categoryText}>Hepato/Gastrointestinal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "CardioVascular"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => setSelectedCategory("CardioVascular")}
        >
          <Text style={styles.categoryText}>CardioVascular</Text>
        </TouchableOpacity>
       
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Neuro/Musculoskeietal"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => setSelectedCategory("Neuro/Musculoskeietal")}
        >
          <Text style={styles.categoryText}>Neuro/Musculoskeietal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Renal/Endocrine"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => setSelectedCategory("Renal/Endocrine")}
        >
          <Text style={styles.categoryText}>Renal/Endocrine</Text>
        </TouchableOpacity>
       
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Other"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => setSelectedCategory("Other")}
        >
          <Text style={styles.categoryText}>Other</Text>
        </TouchableOpacity>
       
        
      </ScrollView>
      <View style={styles.tabContent}>
        {selectedCategory === 'Air way' && <Airway/>}
      {selectedCategory === 'General Physical Examination' && <PhysicalExamination/>} 
         {selectedCategory === 'Respiratory' && <Respiratory />} 
        {selectedCategory === 'Hepato/Gastrointestinal' && <Hepato />}
         {selectedCategory === 'CardioVascular' && <CardioVascular />} 
         {selectedCategory === 'Neuro/Musculoskeietal' && <Neuro />} 
         {selectedCategory === 'Renal/Endocrine' && <Renal />}
         {selectedCategory === 'Other' && <Other />}

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
