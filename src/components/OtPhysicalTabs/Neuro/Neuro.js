import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { CheckBox } from 'react-native-elements';


const Neuro = () => {

  const neuroMuscular =   useSelector((state) => state.otPhysicalExamination.neuroMuscular);
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
      />
      <CheckBox
        title="Gout"
        checked={neuroMuscular.gout}
        onPress={() => handleCheckboxChange('gout', !neuroMuscular.gout)}
      />
      <CheckBox
        title="Backache"
        checked={neuroMuscular.backache}
        onPress={() => handleCheckboxChange('backache', !neuroMuscular.backache)}
      />
      <CheckBox
        title="Head Ache"
        checked={neuroMuscular.headAche}
        onPress={() => handleCheckboxChange('headAche', !neuroMuscular.headAche)}
      />
      <CheckBox
        title="Seizures"
        checked={neuroMuscular.seizures}
        onPress={() => handleCheckboxChange('seizures', !neuroMuscular.seizures)}
      />
      <CheckBox
        title="Scoliosis/Kyphosis"
        checked={neuroMuscular.scoliosisKyphosis}
        onPress={() => handleCheckboxChange('scoliosisKyphosis', !neuroMuscular.scoliosisKyphosis)}
      />
      <CheckBox
        title="Paresthesia"
        checked={neuroMuscular.paresthesia}
        onPress={() => handleCheckboxChange('paresthesia', !neuroMuscular.paresthesia)}
      />
      <CheckBox
        title="Loc/Unconscious"
        checked={neuroMuscular.locUnconscious}
        onPress={() => handleCheckboxChange('locUnconscious', !neuroMuscular.locUnconscious)}
      />
      <CheckBox
        title="Muscle Weakness"
        checked={neuroMuscular.muscleWeakness}
        onPress={() => handleCheckboxChange('muscleWeakness', !neuroMuscular.muscleWeakness)}
      />
      <CheckBox
        title="CVA/TIA"
        checked={neuroMuscular.cvaTia}
        onPress={() => handleCheckboxChange('cvaTia', !neuroMuscular.cvaTia)}
      />
      <CheckBox
        title="Head Injury"
        checked={neuroMuscular.headInjury}
        onPress={() => handleCheckboxChange('headInjury', !neuroMuscular.headInjury)}
      />
      <CheckBox
        title="Paralysis"
        checked={neuroMuscular.paralysis}
        onPress={() => handleCheckboxChange('paralysis', !neuroMuscular.paralysis)}
      />
      <CheckBox
        title="Psych Disorder"
        checked={neuroMuscular.psychDisorder}
        onPress={() => handleCheckboxChange('psychDisorder', !neuroMuscular.psychDisorder)}
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
