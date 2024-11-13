import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { authPost } from '../../axios/authPost';
import Toast from 'react-native-toast-message';


const RequestSurgeryForm = () => {
  const user = useSelector((state) => state.currentUserData);
  const currentPatient = useSelector((state) => state.currentPatientData);
  const patientTimeLineID = currentPatient?.patientTimeLineID;

  const [patientType, setPatientType] = React.useState("");
  const [surgeryType, setSurgeryType] = React.useState("");
  const [manualSurgeryType, setManualSurgeryType] = React.useState("");
  const navigation = useNavigation();

  const surgeryTypeItems =[
    { label: 'elective', value: 'elective' },
    { label: 'emergency', value: 'emergency' },
  ];


  const surgeryTypesData = [
    { label: "Orthopedic Surgery", value: "Orthopedic Surgery" },
    { label: "Spine Surgery", value: "Spine Surgery" },
    { label: "Cataract Surgery", value: "Cataract Surgery" },
    { label: "Neuro Surgery", value: "Neuro Surgery" },
    { label: "General Surgery", value: "General Surgery" },
    { label: "Transplantation", value: "Transplantation" },
    { label: "Endocrine Surgery", value: "Endocrine Surgery" },
    { label: "Arthroscopy", value: "Arthroscopy" },
    { label: "Others", value: "Others" },
  ];
  
  

  
  const handleCancel = () => {
    navigation.goBack(); // Navigate to the previous page
  };
  const handleSubmit = async () => {
    const selectedsurgeryType =
      surgeryType === "Others" ? manualSurgeryType : surgeryType;

    try {
      const data = {
        patientType: patientType,
        surgeryType: selectedsurgeryType,
      };
      const res = await authPost(
        `ot/${user.hospitalID}/${patientTimeLineID}`,
        data,
        user.token
      );
      if (res.status === 201) {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Request Raised Successfully',
          visibilityTime: 3000,
          autoHide: true,
          bottomOffset: 40,
        });
        navigation.goBack(); 
      }
      if (res.status === "error") {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2:res.message ,
          visibilityTime: 3000,
          autoHide: true,
          bottomOffset: 40,
        });
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  console.log("=================",currentPatient)
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Request for surgery</Text>

    
      {/* <Text style={styles.para}>Surgery urgency</Text> */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={patientType}
          onValueChange={(itemValue) => setPatientType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Surgery urgency" value="" />
          {surgeryTypeItems.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
      {/* <Text style={styles.para}>Type Of Surgery</Text> */}

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={surgeryType}
          onValueChange={(itemValue) => setSurgeryType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Type Of Surgery" value="" />
          {surgeryTypesData.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>

      {surgeryType === "others" && (
        <View style={styles.formControl}>
          <TextInput
            style={styles.input}
            placeholder="Enter Surgery Type"
            onChangeText={(text) => setManualSurgeryType(text)}
            value={manualSurgeryType}
          />
        </View>
      )}

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.buttonTextCancel} onPress={handleCancel}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  para: {
    fontSize: 15,
    textAlign: 'left',
    marginBottom: 16,
  },
  image: {
    height: 120,
    width: 120,
    alignSelf: 'center',
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: '#f4f4f4',
    marginBottom: 12,
    borderColor: '#ccc',
    height: 40,
    paddingHorizontal: 8,
  },
  dropdownContainer: {
    backgroundColor: '#f4f4f4',
    borderColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonTextCancel: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  
  pickerContainer: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "100%",
  },
});

export default RequestSurgeryForm;