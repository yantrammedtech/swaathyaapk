import React from 'react'
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from 'react-redux';
import { CheckBox } from 'react-native-elements';

const Renal = () => {

  const renal =   useSelector((state) => state.otPhysicalExamination.renal);
  const currentPatient = useSelector((state) => state.currentPatientData);

  const dispatch = useDispatch()
  
  const handleCheckboxChange = (field, value) => {
   
    dispatch({
      type: 'updateOtPhysicalExamination',
      payload: {
        renal: {
          ...renal,
          [field]: value,
        },
      },
    });
  };
  
  console.log("renal=======",renal)

     return (
    <View style={styles.checkboxGroup}>
      <CheckBox
        title="UTI"
        checked={renal.uti}
        onPress={() => handleCheckboxChange('uti', !renal.uti)}
        disabled={currentPatient.status === "approved"}
        containerStyle={{
          opacity: currentPatient.status === "approved" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Haemateria"
        checked={renal.haemateria}
        onPress={() => handleCheckboxChange('haemateria', !renal.haemateria)}
        disabled={currentPatient.status === "approved"}
        containerStyle={{
          opacity: currentPatient.status === "approved" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Renal Insufficiency"
        checked={renal.renalInsufficiency}
        onPress={() => handleCheckboxChange('renalInsufficiency', !renal.renalInsufficiency)}
        disabled={currentPatient.status === "approved"}
        containerStyle={{
          opacity: currentPatient.status === "approved" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Aorenocortical Insuff"
        checked={renal.aorenocorticalInsuff}
        onPress={() => handleCheckboxChange('aorenocorticalInsuff', !renal.aorenocorticalInsuff)}
        disabled={currentPatient.status === "approved"}
        containerStyle={{
          opacity: currentPatient.status === "approved" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Thyroid Disorder"
        checked={renal.thyroidDisorder}
        onPress={() => handleCheckboxChange('thyroidDisorder', !renal.thyroidDisorder)}
        disabled={currentPatient.status === "approved"}
        containerStyle={{
          opacity: currentPatient.status === "approved" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Pituitary Disorder"
        checked={renal.pituitaryDisorder}
        onPress={() => handleCheckboxChange('pituitaryDisorder', !renal.pituitaryDisorder)}
        disabled={currentPatient.status === "approved"}
        containerStyle={{
          opacity: currentPatient.status === "approved" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Diabetics Malitus"
        checked={renal.diabeticsMalitus}
        onPress={() => handleCheckboxChange('diabeticsMalitus', !renal.diabeticsMalitus)}
        disabled={currentPatient.status === "approved"}
        containerStyle={{
          opacity: currentPatient.status === "approved" ? 0.5 : 1, // Apply opacity to indicate disabled state
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
      checkboxGroup: {
        margin: 10, // Adjust margins and styles as needed
      },
     
    });

export default Renal
