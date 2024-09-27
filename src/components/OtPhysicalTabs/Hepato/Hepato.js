import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { CheckBox } from 'react-native-elements';
import { useDispatch, useSelector } from "react-redux";

const Hepato = () => {
  const hepato =   useSelector((state) => state.otPhysicalExamination.hepato);
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
      />
      <CheckBox
        title="GERD"
        checked={hepato.gerd}
        onPress={() => handleCheckboxChange('gerd', !hepato.gerd)}
      />
      <CheckBox
        title="Diarrhoea"
        checked={hepato.diarrhoea}
        onPress={() => handleCheckboxChange('diarrhoea', !hepato.diarrhoea)}
      />
      <CheckBox
        title="Gallbladder DS"
        checked={hepato.galbladderDS}
        onPress={() => handleCheckboxChange('galbladderDS', !hepato.galbladderDS)}
      />
      <CheckBox
        title="Jaundice"
        checked={hepato.jaundice}
        onPress={() => handleCheckboxChange('jaundice', !hepato.jaundice)}
      />
      <CheckBox
        title="Cirrhosis"
        checked={hepato.cirrhosis}
        onPress={() => handleCheckboxChange('cirrhosis', !hepato.cirrhosis)}
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
