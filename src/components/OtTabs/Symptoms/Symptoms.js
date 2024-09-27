import React, { useEffect, useState } from 'react';
import { View, Text,  TouchableOpacity, StyleSheet, Dimensions, Button, FlatList } from 'react-native';


import Icon from 'react-native-vector-icons/MaterialIcons'; // You can use other icon sets if needed
import SymptomItem from './SymptomItem';
import { useSelector } from 'react-redux';
import { authFetch } from '../../../axios/authFetch';

const SymptomsTab = () => {
  const Storedata = useSelector((state) => {
    return state
  })


  const currentUserData = Storedata.currentUserData
  const currentPatientData = Storedata.currentPatientData

 
  const [symptomsData, setSymptomsData] = useState([]);
  

  const getAllSymptomps = async () => {
    const response = await authFetch(`symptom/${currentPatientData.patientTimeLineID}`, currentUserData.token);

    if (response.message == "success") {
      setSymptomsData (response.symptoms);
    }
  };

  useEffect(() => {
    if (currentUserData?.token && currentPatientData?.patientTimeLineID) {
      getAllSymptomps()
    }
  }, [currentUserData,currentPatientData])


 

  return (
    <View style={styles.container}>
     

      <FlatList
        data={symptomsData}
        renderItem={({ item }) => (
          <SymptomItem
          id={item.id}
            symptomName={item.symptom}
            addedBy={item.userID}
            updatedTime={item.addedOn}
            duration={item.duration}
            durationType={item.durationParameter}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />


    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    backgroundColor: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    maxHeight: 150,
    position: 'absolute',
    top: 50,  // Adjust to place below the input
    width: '100%',
    zIndex: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: '#1977f3',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});



export default SymptomsTab;
