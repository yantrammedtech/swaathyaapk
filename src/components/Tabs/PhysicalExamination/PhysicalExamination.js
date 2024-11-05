import React, { useState } from 'react';
import { View, Text, TextInput,  StyleSheet, ScrollView,TouchableOpacity,Image,Alert  } from 'react-native';
import { authPost } from '../../../axios/authPost';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useNavigation } from "@react-navigation/native";



const INITIAL_STATE = {
    general: "",
    head: "",
    ent: "",
    neuroPsych: "",
    neckSpine: "",
    respiratory: "",
    cardiac: "",
    abdominal: "",
    pelvis: "",
    guRectal: "",
    musculoskeletal: "",
    skin: "",
  };

const PhysicalExamination = ()  => {
  const user = useSelector((state) => state.currentUserData)
  const currentPatient  = useSelector((state) => state.currentPatientData)
    const [formData, setFormData] = useState(INITIAL_STATE);
    const navigation = useNavigation()


    const handleChange = (name, value) => {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const PhysicalExaminationFormRedZone = async () => {
      const response = await authPost(
        `ot/${user.hospitalID}/${currentPatient.patientTimeLineID}/redzone/physicalExamination`,
        { physicalExaminationData: formData },
        user.token
      );
      if (response.status === 201) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Physical Examination data saved successfully.',
        });
        // Show success alert
      Alert.alert(
        'Success',
        'Physical Examination data saved successfully.',
        [{ text: 'OK' }] // You can customize this button as needed
      );
      navigation.navigate('CommonPatientProfile', {
        patientId: currentPatient.id,
      })

      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Physical Examination failed. Please try again.',
        });
      }
    };
  
    const handleSubmit = () => {
      console.log('Form Submitted:', formData);
      PhysicalExaminationFormRedZone()
      // Handle form submission logic here
    };
    
    return(
        <ScrollView style={styles.container}>
             <View style={styles.imgcontainer}>
      <Image
        source={require('../../../assets/human body.png')}
        style={styles.image}
        resizeMode="contain" // Ensures the image scales properly within its container
      />
    </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>General</Text>
        <TextInput
          style={styles.textInput}
          value={formData.general}
          onChangeText={(value) => handleChange('general', value)}
          placeholder="Enter General"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Head</Text>
        <TextInput
          style={styles.textInput}
          value={formData.head}
          onChangeText={(value) => handleChange('head', value)}
          placeholder="Enter Head"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>ENT</Text>
        <TextInput
          style={styles.textInput}
          value={formData.ent}
          onChangeText={(value) => handleChange('ent', value)}
          placeholder="Enter ENT"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Neuro/Psych</Text>
        <TextInput
          style={styles.textInput}
          value={formData.neuroPsych}
          onChangeText={(value) => handleChange('neuroPsych', value)}
          placeholder="Enter Neuro/Psych"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Neck/Spine</Text>
        <TextInput
          style={styles.textInput}
          value={formData.neckSpine}
          onChangeText={(value) => handleChange('neckSpine', value)}
          placeholder="Enter Neck/Spine"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Respiratory</Text>
        <TextInput
          style={styles.textInput}
          value={formData.respiratory}
          onChangeText={(value) => handleChange('respiratory', value)}
          placeholder="Enter Respiratory"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cardiac</Text>
        <TextInput
          style={styles.textInput}
          value={formData.cardiac}
          onChangeText={(value) => handleChange('cardiac', value)}
          placeholder="Enter Cardiac"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Abdominal</Text>
        <TextInput
          style={styles.textInput}
          value={formData.abdominal}
          onChangeText={(value) => handleChange('abdominal', value)}
          placeholder="Enter Abdominal"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pelvis</Text>
        <TextInput
          style={styles.textInput}
          value={formData.pelvis}
          onChangeText={(value) => handleChange('pelvis', value)}
          placeholder="Enter Pelvis"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>GU/Rectal</Text>
        <TextInput
          style={styles.textInput}
          value={formData.guRectal}
          onChangeText={(value) => handleChange('guRectal', value)}
          placeholder="Enter GU/Rectal"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Musculoskeletal Survey</Text>
        <TextInput
          style={styles.textInput}
          value={formData.musculoskeletal}
          onChangeText={(value) => handleChange('musculoskeletal', value)}
          placeholder="Enter Musculoskeletal Survey"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Skin</Text>
        <TextInput
          style={styles.textInput}
          value={formData.skin}
          onChangeText={(value) => handleChange('skin', value)}
          placeholder="Enter Skin"
        />
      </View>

      <TouchableOpacity style={styles.button}  onPress={handleSubmit}>
                
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 8,
      borderRadius: 4,
    },
    buttonContainer: {
      marginTop: 16,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"center",
        backgroundColor: '#1977f3',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignSelf: 'center',
        marginBottom:80,
        bottom:30,
    },
    buttonText: {
        color: '#fff',
        marginLeft: 10,
        fontSize: 16,
    },
    imgcontainer: {
        flex: 1, // Takes up the full screen
        justifyContent: 'center', 
        alignItems: 'center', 
      },
      image: {
        width: 200,
        height: 200,
      },
  });
  
export default PhysicalExamination