import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { CheckBox } from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";

const PhysicalExamination = () => {

  const generalphysicalExamination =   useSelector((state) => state.otPhysicalExamination.generalphysicalExamination);
  const currentPatient = useSelector((state) => state.currentPatientData);
 
 const dispatch = useDispatch()
 
 const handleCheckboxChange = (field, value) => {
  // Update the generalphysicalExamination only
  dispatch({
    type: "updateOtPhysicalExamination",
    payload: {
      generalphysicalExamination: {
        ...generalphysicalExamination, // Preserve other fields in generalphysicalExamination
        [field]: value, // Update the specific field being changed
      },
    },
  });
};
  
 
 console.log("generalphysicalExamination====",generalphysicalExamination)
  return (
    <ScrollView style={styles.checkboxGroup}>
      <CheckBox
        title="JVP"
        checked={generalphysicalExamination.jvp}
        onPress={() => handleCheckboxChange('jvp', !generalphysicalExamination.jvp)}
        disabled={ currentPatient.status !== "pending"}
        containerStyle={{
          opacity:  currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Pallor"
        checked={generalphysicalExamination.pallor}
        onPress={() => handleCheckboxChange('pallor', !generalphysicalExamination.pallor)}
        disabled={ currentPatient.status !== "pending"}
        containerStyle={{
          opacity:  currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Cyanosis"
        checked={generalphysicalExamination.cyanosis}
        onPress={() => handleCheckboxChange('cyanosis', !generalphysicalExamination.cyanosis)}
        disabled={ currentPatient.status !== "pending"}
        containerStyle={{
          opacity:  currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Icterus"
        checked={generalphysicalExamination.icterus}
        onPress={() => handleCheckboxChange('icterus', !generalphysicalExamination.icterus)}
        disabled={ currentPatient.status !== "pending"}
        containerStyle={{
          opacity:  currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Pupils"
        checked={generalphysicalExamination.pupils}
        onPress={() => handleCheckboxChange('pupils', !generalphysicalExamination.pupils)}
        disabled={ currentPatient.status !== "pending"}
        containerStyle={{
          opacity:  currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Edema"
        checked={generalphysicalExamination.edema}
        onPress={() => handleCheckboxChange('edema', !generalphysicalExamination.edema)}
        disabled={ currentPatient.status !== "pending"}
        containerStyle={{
          opacity:  currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Syncopat Attack"
        checked={generalphysicalExamination.syncopatAttack}
        onPress={() => handleCheckboxChange('syncopatAttack', !generalphysicalExamination.syncopatAttack)}
        disabled={ currentPatient.status !== "pending"}
        containerStyle={{
          opacity:  currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Palpitation"
        checked={generalphysicalExamination.paipitation}
        onPress={() => handleCheckboxChange('paipitation', !generalphysicalExamination.paipitation)}
        disabled={ currentPatient.status !== "pending"}
        containerStyle={{
          opacity:  currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Other"
        checked={generalphysicalExamination.other}
        onPress={() => handleCheckboxChange('other', !generalphysicalExamination.other)}
        disabled={ currentPatient.status !== "pending"}
        containerStyle={{
          opacity:  currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#FFA500", // Orange line
    paddingBottom: 5,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f1fe",

    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 5,
  },
  checkboxGroup: {
    padding: 10,
    marginBottom:30,
  },
});

export default PhysicalExamination;
