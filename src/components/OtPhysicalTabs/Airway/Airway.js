import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';


const Airway = () => {
  const mainFormFields =   useSelector((state) => state.otPhysicalExamination.mainFormFields);
  const currentPatient = useSelector((state) => state.currentPatientData);

  const dispatch = useDispatch()


  const handleCheckboxChange = (field, value) => {
  
    dispatch({
      type: "updateOtPhysicalExamination",
      payload: {
        mainFormFields: {
          ...mainFormFields, // Preserve other fields in generalphysicalExamination
          [field]: value, // Update the specific field being changed
        },
      },
    });
  };

  const handleButtonGroupChange = (field, value) => {
  

    dispatch({
      type: "updateOtPhysicalExamination",
      payload: {
        mainFormFields: {
          ...mainFormFields, // Preserve other fields in generalphysicalExamination
          [field]: value, // Update the specific field being changed
        },
      },
    });
  };

  const handleTextFieldInput = (field, value) => {
   
    dispatch({
      type: "updateOtPhysicalExamination",
      payload: {
        mainFormFields: {
          ...mainFormFields, // Preserve other fields in generalphysicalExamination
          [field]: value, // Update the specific field being changed
        },
      },
    });
  };


  console.log("mainFormFields========",mainFormFields)
  return (
    <ScrollView style={styles.container}>
      {/* Checkbox Group */}
      <View style={styles.checkboxGroup}>
        <CheckBox
          title="MP 1"
          checked={mainFormFields.mp1}
          onPress={() => handleCheckboxChange('mp1', !mainFormFields.mp1)}
          disabled={currentPatient.status === "approved"}
          containerStyle={{
            opacity: currentPatient.status === "approved" ? 0.5 : 1, // Apply opacity to indicate disabled state
          }}
        />
        <CheckBox
          title="MP 2"
          checked={mainFormFields.mp2}
          onPress={() => handleCheckboxChange('mp2', !mainFormFields.mp2)}
          disabled={currentPatient.status === "approved"}
          containerStyle={{
            opacity: currentPatient.status === "approved" ? 0.5 : 1, // Apply opacity to indicate disabled state
          }}
        />
        <CheckBox
          title="MP 3"
          checked={mainFormFields.mp3}
          onPress={() => handleCheckboxChange('mp3', !mainFormFields.mp3)}
          disabled={currentPatient.status === "approved"}
          containerStyle={{
            opacity: currentPatient.status === "approved" ? 0.5 : 1, // Apply opacity to indicate disabled state
          }}
        />
        <CheckBox
          title="MP 4"
          checked={mainFormFields.mp4}
          onPress={() => handleCheckboxChange('mp4', !mainFormFields.mp4)}
          disabled={currentPatient.status === "approved"}
          containerStyle={{
            opacity: currentPatient.status === "approved" ? 0.5 : 1, // Apply opacity to indicate disabled state
          }}
        />
      </View>

      {/* Text Input */}
      <View style={styles.inputGroup}>
        <Text>TM Distance</Text>
        <TextInput
        
        style={[styles.input, {
          opacity: currentPatient.status === "approved" ? 0.5 : 1, // Apply opacity to indicate disabled state
          backgroundColor: currentPatient.status === "approved" ? '#e0e0e0' : '#fff', // Change background color to indicate disabled
        }]}
          value={mainFormFields.tmDistance}
          onChangeText={(value) => handleTextFieldInput("tmDistance", value)}
          editable={currentPatient.status !== "approved"} // Disable input if status is approved
        
        />
      </View>

      {/* Button Group for Mouth Opening */}
      <View style={styles.buttonGroup}>
        <Text>Mouth Opening:</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              mainFormFields.mouthOpening === 'yes' && styles.selectedButton,
              currentPatient.status === 'approved' && styles.disabledButton
            ]}
            onPress={() => handleButtonGroupChange('mouthOpening', 'yes')}
            disabled={currentPatient.status === 'approved'}
          >
              <Text style={currentPatient.status === 'approved' ? styles.disabledText : null}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              mainFormFields.mouthOpening === 'no' && styles.selectedButton,
              currentPatient.status === 'approved' && styles.disabledButton
            ]}
            onPress={() => handleButtonGroupChange('mouthOpening', 'no')}
            disabled={currentPatient.status === 'approved'}
          >
            <Text style={currentPatient.status === 'approved' ? styles.disabledText : null}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Button Group for Neck Rotation */}
      <View style={styles.buttonGroup}>
  <Text>Neck Rotation:</Text>
  <View style={styles.buttonContainer}>
    {/* Full Option */}
    <TouchableOpacity
      style={[
        styles.button,
        mainFormFields.neckRotation === 'full' && styles.selectedButton,
        currentPatient.status === 'approved' && styles.disabledButton, // Apply disabled style
      ]}
      onPress={() => handleButtonGroupChange('neckRotation', 'full')}
      disabled={currentPatient.status === 'approved'} // Disable if status is approved
    >
      <Text style={currentPatient.status === 'approved' ? styles.disabledText : null}>
        Full
      </Text>
    </TouchableOpacity>

    {/* Limited Option */}
    <TouchableOpacity
      style={[
        styles.button,
        mainFormFields.neckRotation === 'limited' && styles.selectedButton,
        currentPatient.status === 'approved' && styles.disabledButton, // Apply disabled style
      ]}
      onPress={() => handleButtonGroupChange('neckRotation', 'limited')}
      disabled={currentPatient.status === 'approved'} // Disable if status is approved
    >
      <Text style={currentPatient.status === 'approved' ? styles.disabledText : null}>
        Limited
      </Text>
    </TouchableOpacity>

    {/* No Option */}
    <TouchableOpacity
      style={[
        styles.button,
        mainFormFields.neckRotation === 'no' && styles.selectedButton,
        currentPatient.status === 'approved' && styles.disabledButton, // Apply disabled style
      ]}
      onPress={() => handleButtonGroupChange('neckRotation', 'no')}
      disabled={currentPatient.status === 'approved'} // Disable if status is approved
    >
      <Text style={currentPatient.status === 'approved' ? styles.disabledText : null}>
        No
      </Text>
    </TouchableOpacity>
  </View>
</View>

      {/* Additional Checkboxes */}
      <View style={styles.checkboxGroup}>
        <CheckBox
          title="Morbid obesity"
          checked={mainFormFields.morbidObesity}
          onPress={() => handleCheckboxChange('morbidObesity', !mainFormFields.morbidObesity)}
          disabled={currentPatient.status === "approved"}
          containerStyle={{
            opacity: currentPatient.status === "approved" ? 0.5 : 1, // Apply opacity to indicate disabled state
          }}
        />
        <CheckBox
          title="H/o difficult airway"
          checked={mainFormFields.difficultAirway}
          onPress={() => handleCheckboxChange('difficultAirway', !mainFormFields.difficultAirway)}
          disabled={currentPatient.status === "approved"}
          containerStyle={{
            opacity: currentPatient.status === "approved" ? 0.5 : 1, // Apply opacity to indicate disabled state
          }}
        />
        <CheckBox
          title="Teeth poor repair/loose"
          checked={mainFormFields.teethPoorRepair}
          onPress={() => handleCheckboxChange('teethPoorRepair', !mainFormFields.teethPoorRepair)}
          disabled={currentPatient.status === "approved"}
          containerStyle={{
            opacity: currentPatient.status === "approved" ? 0.5 : 1, // Apply opacity to indicate disabled state
          }}
        />
        <CheckBox
          title="Micrognathia"
          checked={mainFormFields.micrognathia}
          onPress={() => handleCheckboxChange('micrognathia', !mainFormFields.micrognathia)}
          disabled={currentPatient.status === "approved"}
          containerStyle={{
            opacity: currentPatient.status === "approved" ? 0.5 : 1, // Apply opacity to indicate disabled state
          }}
        />
        <CheckBox
          title="Edentulous"
          checked={mainFormFields.edentulous}
          onPress={() => handleCheckboxChange('edentulous', !mainFormFields.edentulous)}
          disabled={currentPatient.status === "approved"}
          containerStyle={{
            opacity: currentPatient.status === "approved" ? 0.5 : 1, // Apply opacity to indicate disabled state
          }}
        />
        <CheckBox
          title="Beard"
          checked={mainFormFields.beard}
          onPress={() => handleCheckboxChange('beard', !mainFormFields.beard)}
          disabled={currentPatient.status === "approved"}
          containerStyle={{
            opacity: currentPatient.status === "approved" ? 0.5 : 1, // Apply opacity to indicate disabled state
          }}
        />
        <CheckBox
          title="Short muscular neck"
          checked={mainFormFields.shortMuscularNeck}
          onPress={() => handleCheckboxChange('shortMuscularNeck', !mainFormFields.shortMuscularNeck)}
          disabled={currentPatient.status === "approved"}
          containerStyle={{
            opacity: currentPatient.status === "approved" ? 0.5 : 1, // Apply opacity to indicate disabled state
          }}
        />
        <CheckBox
          title="Prominent incisors"
          checked={mainFormFields.prominentIncisors}
          onPress={() => handleCheckboxChange('prominentIncisors', !mainFormFields.prominentIncisors)}
          disabled={currentPatient.status === "approved"}
          containerStyle={{
            opacity: currentPatient.status === "approved" ? 0.5 : 1, // Apply opacity to indicate disabled state
          }}
        />
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
     
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
      borderBottomWidth: 2,
      borderBottomColor: '#FFA500', // Orange line
      paddingBottom: 5,
    },
    tagContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },
    tag: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#e8f1fe',

      borderWidth: 1,
      borderColor: '#007AFF',
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 15,
      marginRight: 10,
      marginBottom: 10,
    },
    disabledText: {
      color: '#999999', // Disabled text color
    },
    disabledButton: {
      backgroundColor: '#cccccc', // Disabled background color
      opacity: 0.5, // Visually indicate that the button is disabled
    },
    tagText: {
      color: '#007AFF',
      fontSize: 14,
      fontWeight: '500',
      marginLeft: 5,
    },
    container: {
      padding: 16,
    },
    checkboxGroup: {
      marginBottom: 20,
    },
    inputGroup: {
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      padding: 8,
      borderRadius: 4,
      marginVertical: 10,
    },
    buttonGroup: {
      marginBottom: 20,
      flexDirection: 'row',
      width:"100%"
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',

    },
    button: {
      padding: 10,
      borderWidth: 1,
      borderRadius: 4,
      width: 80,
      alignItems: 'center',
      marginLeft:10,

    },
    selectedButton: {
      backgroundColor: '#007bff',
      borderColor: '#007bff',
    },
  });

export default Airway
