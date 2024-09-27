import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { CheckBox } from 'react-native-elements';

const CardioVascular = () => {

  const cardioVascular =   useSelector((state) => state.otPhysicalExamination.cardioVascular);
  const dispatch = useDispatch()

  const handleCheckboxChange = (field, value) => {
    dispatch({
      type: 'updateOtPhysicalExamination',
      payload: {
        cardioVascular: {
          ...cardioVascular,
          [field]: value,
        },
      },
    });
  };
  

  console.log("cardioVascular===========",cardioVascular)
  return (
    <ScrollView style={styles.checkboxGroup}>
      <CheckBox
        title="Hypertension"
        checked={cardioVascular.hypertension}
        onPress={() => handleCheckboxChange('hypertension', !cardioVascular.hypertension)}
      />
      <CheckBox
        title="CAF DOE"
        checked={cardioVascular.cafDOE}
        onPress={() => handleCheckboxChange('cafDOE', !cardioVascular.cafDOE)}
      />
      <CheckBox
        title="Ischemic Heart Disease"
        checked={cardioVascular.ischemicHeartDisease}
        onPress={() => handleCheckboxChange('ischemicHeartDisease', !cardioVascular.ischemicHeartDisease)}
      />
      <CheckBox
        title="Rheumatic Fever"
        checked={cardioVascular.rheumaticFever}
        onPress={() => handleCheckboxChange('rheumaticFever', !cardioVascular.rheumaticFever)}
      />
      <CheckBox
        title="Orthopnea/PND"
        checked={cardioVascular.orthpneaPND}
        onPress={() => handleCheckboxChange('orthpneaPND', !cardioVascular.orthpneaPND)}
      />
      <CheckBox
        title="Murmurs"
        checked={cardioVascular.murmurs}
        onPress={() => handleCheckboxChange('murmurs', !cardioVascular.murmurs)}
      />
      <CheckBox
        title="CAD"
        checked={cardioVascular.cad}
        onPress={() => handleCheckboxChange('cad', !cardioVascular.cad)}
      />
      <CheckBox
        title="Exercise Tolerance"
        checked={cardioVascular.exerciseTolerance}
        onPress={() => handleCheckboxChange('exerciseTolerance', !cardioVascular.exerciseTolerance)}
      />
      <CheckBox
        title="Cardiac Enlargement"
        checked={cardioVascular.cardicEnlargement}
        onPress={() => handleCheckboxChange('cardicEnlargement', !cardioVascular.cardicEnlargement)}
      />
      <CheckBox
        title="Angina"
        checked={cardioVascular.angina}
        onPress={() => handleCheckboxChange('angina', !cardioVascular.angina)}
      />
      <CheckBox
        title="MI"
        checked={cardioVascular.mi}
        onPress={() => handleCheckboxChange('mi', !cardioVascular.mi)}
      />
      <CheckBox
        title="MTD<4"
        checked={cardioVascular.mtdLessThan4}
        onPress={() => handleCheckboxChange('mtdLessThan4', !cardioVascular.mtdLessThan4)}
      />
      <CheckBox
        title="MTD>4"
        checked={cardioVascular.mtdGreaterThan4}
        onPress={() => handleCheckboxChange('mtdGreaterThan4', !cardioVascular.mtdGreaterThan4)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  checkboxGroup: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    marginBottom:40,
  },
 
 
});
export default CardioVascular;
