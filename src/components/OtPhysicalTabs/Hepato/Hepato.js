import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { CheckBox } from 'react-native-elements';
import { useDispatch, useSelector } from "react-redux";

const Hepato = () => {
  const hepato =   useSelector((state) => state.otPhysicalExamination.hepato);
  const currentPatient = useSelector((state) => state.currentPatientData);

  const dispatch = useDispatch()
  
  const handleCheckboxChange = (field, value) => {
   
    dispatch({
      type: 'updateOtPhysicalExamination',
      payload: {
        hepato: {
          ...hepato,
          [field]: value,
        },
      },
    });
  };
  
  console.log("hepato=======",hepato)

  return (
    <View style={styles.checkboxGroup}>
      <CheckBox
        title="Vomiting"
        checked={hepato.vomiting}
        onPress={() => handleCheckboxChange('vomiting', !hepato.vomiting)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="GERD"
        checked={hepato.gerd}
        onPress={() => handleCheckboxChange('gerd', !hepato.gerd)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Diarrhoea"
        checked={hepato.diarrhoea}
        onPress={() => handleCheckboxChange('diarrhoea', !hepato.diarrhoea)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Gallbladder DS"
        checked={hepato.galbladderDS}
        onPress={() => handleCheckboxChange('galbladderDS', !hepato.galbladderDS)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Jaundice"
        checked={hepato.jaundice}
        onPress={() => handleCheckboxChange('jaundice', !hepato.jaundice)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Cirrhosis"
        checked={hepato.cirrhosis}
        onPress={() => handleCheckboxChange('cirrhosis', !hepato.cirrhosis)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  
});

export default Hepato;
