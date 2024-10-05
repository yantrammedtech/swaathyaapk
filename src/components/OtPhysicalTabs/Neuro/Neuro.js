import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { CheckBox } from 'react-native-elements';


const Neuro = () => {

  const neuroMuscular =   useSelector((state) => state.otPhysicalExamination.neuroMuscular);
  const currentPatient = useSelector((state) => state.currentPatientData);

  const dispatch = useDispatch()

  const handleCheckboxChange = (field, value) => {
    dispatch({
      type: 'updateOtPhysicalExamination',
      payload: {
        neuroMuscular: {
          ...neuroMuscular,
          [field]: value,
        },
      },
    });
  };
  


  console.log("neuroMuscular=======",neuroMuscular)
  return (
    <ScrollView style={styles.checkboxGroup}>
      <CheckBox
        title="Rh arthritis"
        checked={neuroMuscular.rhArthritis}
        onPress={() => handleCheckboxChange('rhArthritis', !neuroMuscular.rhArthritis)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Gout"
        checked={neuroMuscular.gout}
        onPress={() => handleCheckboxChange('gout', !neuroMuscular.gout)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Backache"
        checked={neuroMuscular.backache}
        onPress={() => handleCheckboxChange('backache', !neuroMuscular.backache)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Head Ache"
        checked={neuroMuscular.headAche}
        onPress={() => handleCheckboxChange('headAche', !neuroMuscular.headAche)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Seizures"
        checked={neuroMuscular.seizures}
        onPress={() => handleCheckboxChange('seizures', !neuroMuscular.seizures)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Scoliosis/Kyphosis"
        checked={neuroMuscular.scoliosisKyphosis}
        onPress={() => handleCheckboxChange('scoliosisKyphosis', !neuroMuscular.scoliosisKyphosis)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Paresthesia"
        checked={neuroMuscular.paresthesia}
        onPress={() => handleCheckboxChange('paresthesia', !neuroMuscular.paresthesia)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Loc/Unconscious"
        checked={neuroMuscular.locUnconscious}
        onPress={() => handleCheckboxChange('locUnconscious', !neuroMuscular.locUnconscious)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Muscle Weakness"
        checked={neuroMuscular.muscleWeakness}
        onPress={() => handleCheckboxChange('muscleWeakness', !neuroMuscular.muscleWeakness)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="CVA/TIA"
        checked={neuroMuscular.cvaTia}
        onPress={() => handleCheckboxChange('cvaTia', !neuroMuscular.cvaTia)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Head Injury"
        checked={neuroMuscular.headInjury}
        onPress={() => handleCheckboxChange('headInjury', !neuroMuscular.headInjury)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Paralysis"
        checked={neuroMuscular.paralysis}
        onPress={() => handleCheckboxChange('paralysis', !neuroMuscular.paralysis)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Psych Disorder"
        checked={neuroMuscular.psychDisorder}
        onPress={() => handleCheckboxChange('psychDisorder', !neuroMuscular.psychDisorder)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
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
    marginBottom:10,
  },
  checkboxGroup: {
    margin: 10, // Add any other styles as needed
    marginBottom:20,
  },
 
});

export default Neuro;
