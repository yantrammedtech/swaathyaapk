import React from 'react'
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from 'react-redux';
import { CheckBox } from 'react-native-elements';

const Renal = () => {

  const renal =   useSelector((state) => state.otPhysicalExamination.renal);
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
      />
      <CheckBox
        title="Haemateria"
        checked={renal.haemateria}
        onPress={() => handleCheckboxChange('haemateria', !renal.haemateria)}
      />
      <CheckBox
        title="Renal Insufficiency"
        checked={renal.renalInsufficiency}
        onPress={() => handleCheckboxChange('renalInsufficiency', !renal.renalInsufficiency)}
      />
      <CheckBox
        title="Aorenocortical Insuff"
        checked={renal.aorenocorticalInsuff}
        onPress={() => handleCheckboxChange('aorenocorticalInsuff', !renal.aorenocorticalInsuff)}
      />
      <CheckBox
        title="Thyroid Disorder"
        checked={renal.thyroidDisorder}
        onPress={() => handleCheckboxChange('thyroidDisorder', !renal.thyroidDisorder)}
      />
      <CheckBox
        title="Pituitary Disorder"
        checked={renal.pituitaryDisorder}
        onPress={() => handleCheckboxChange('pituitaryDisorder', !renal.pituitaryDisorder)}
      />
      <CheckBox
        title="Diabetics Malitus"
        checked={renal.diabeticsMalitus}
        onPress={() => handleCheckboxChange('diabeticsMalitus', !renal.diabeticsMalitus)}
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
