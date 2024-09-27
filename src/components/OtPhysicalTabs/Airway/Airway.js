import React, { useState } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';


const Airway = () => {
  const mainData =   useSelector((state) => state.otPhysicalExamination.mainFormFields);


  const dispatch = useDispatch()

  const [mainFormFields, setMainFormFields] = useState({
    mp1: false,
    mp2: false,
    mp3: false,
    mp4: false,
    tmDistance: '',
    mouthOpening: '',
    neckRotation: '',
    morbidObesity: false,
    difficultAirway: false,
    teethPoorRepair: false,
    micrognathia: false,
    edentulous: false,
    beard: false,
    shortMuscularNeck: false,
    prominentIncisors: false,
  });

  const handleCheckboxChange = (field, value) => {
    setMainFormFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));

  

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
    setMainFormFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));

    dispatch({
      type: "updateOtPhysicalExamination",
      payload: {
        ...mainFormFields,
        [field]: value,
      }
    });
  };

  const handleTextFieldInput = (text) => {
    setMainFormFields((prevFields) => ({
      ...prevFields,
      tmDistance: text,
    }));

    dispatch({
      type: "updateOtPhysicalExamination",
      payload: {
        ...mainFormFields,
        [field]: value,
      }
    });
  };

  console.log("mainFormFields=====",mainFormFields)
  console.log("maindata=======", mainData)
  return (
    <ScrollView style={styles.container}>
      {/* Checkbox Group */}
      <View style={styles.checkboxGroup}>
        <CheckBox
          title="MP 1"
          checked={mainFormFields.mp1}
          onPress={() => handleCheckboxChange('mp1', !mainFormFields.mp1)}
        />
        <CheckBox
          title="MP 2"
          checked={mainFormFields.mp2}
          onPress={() => handleCheckboxChange('mp2', !mainFormFields.mp2)}
        />
        <CheckBox
          title="MP 3"
          checked={mainFormFields.mp3}
          onPress={() => handleCheckboxChange('mp3', !mainFormFields.mp3)}
        />
        <CheckBox
          title="MP 4"
          checked={mainFormFields.mp4}
          onPress={() => handleCheckboxChange('mp4', !mainFormFields.mp4)}
        />
      </View>

      {/* Text Input */}
      <View style={styles.inputGroup}>
        <Text>TM Distance</Text>
        <TextInput
          style={styles.input}
          value={mainFormFields.tmDistance}
          onChangeText={handleTextFieldInput}
          editable={true}
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
            ]}
            onPress={() => handleButtonGroupChange('mouthOpening', 'yes')}
          >
            <Text>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              mainFormFields.mouthOpening === 'no' && styles.selectedButton,
            ]}
            onPress={() => handleButtonGroupChange('mouthOpening', 'no')}
          >
            <Text>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Button Group for Neck Rotation */}
      <View style={styles.buttonGroup}>
        <Text>Neck Rotation:</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              mainFormFields.neckRotation === 'full' && styles.selectedButton,
            ]}
            onPress={() => handleButtonGroupChange('neckRotation', 'full')}
          >
            <Text>Full</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              mainFormFields.neckRotation === 'limited' && styles.selectedButton,
            ]}
            onPress={() => handleButtonGroupChange('neckRotation', 'limited')}
          >
            <Text>Limited</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              mainFormFields.neckRotation === 'no' && styles.selectedButton,
            ]}
            onPress={() => handleButtonGroupChange('neckRotation', 'no')}
          >
            <Text>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Additional Checkboxes */}
      <View style={styles.checkboxGroup}>
        <CheckBox
          title="Morbid obesity"
          checked={mainFormFields.morbidObesity}
          onPress={() => handleCheckboxChange('morbidObesity', !mainFormFields.morbidObesity)}
        />
        <CheckBox
          title="H/o difficult airway"
          checked={mainFormFields.difficultAirway}
          onPress={() => handleCheckboxChange('difficultAirway', !mainFormFields.difficultAirway)}
        />
        <CheckBox
          title="Teeth poor repair/loose"
          checked={mainFormFields.teethPoorRepair}
          onPress={() => handleCheckboxChange('teethPoorRepair', !mainFormFields.teethPoorRepair)}
        />
        <CheckBox
          title="Micrognathia"
          checked={mainFormFields.micrognathia}
          onPress={() => handleCheckboxChange('micrognathia', !mainFormFields.micrognathia)}
        />
        <CheckBox
          title="Edentulous"
          checked={mainFormFields.edentulous}
          onPress={() => handleCheckboxChange('edentulous', !mainFormFields.edentulous)}
        />
        <CheckBox
          title="Beard"
          checked={mainFormFields.beard}
          onPress={() => handleCheckboxChange('beard', !mainFormFields.beard)}
        />
        <CheckBox
          title="Short muscular neck"
          checked={mainFormFields.shortMuscularNeck}
          onPress={() => handleCheckboxChange('shortMuscularNeck', !mainFormFields.shortMuscularNeck)}
        />
        <CheckBox
          title="Prominent incisors"
          checked={mainFormFields.prominentIncisors}
          onPress={() => handleCheckboxChange('prominentIncisors', !mainFormFields.prominentIncisors)}
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
