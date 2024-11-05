import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet, Dimensions, Button, FlatList,Alert } from 'react-native';


import Icon from 'react-native-vector-icons/MaterialIcons'; // You can use other icon sets if needed
import { Picker } from '@react-native-picker/picker';
import SymptomItem from './SymptomItem';
import { authPost } from '../../../axios/authPost';
import { useSelector } from 'react-redux';
import { authFetch } from '../../../axios/authFetch';

const SymptomsTab = () => {
  const Storedata = useSelector((state) => {
    return state
  })


  const currentUserData = Storedata.currentUserData
  const currentPatientData = Storedata.currentPatientData

  const [modalVisible, setModalVisible] = useState(false);
  const [symptom, setSymptom] = useState('');
  const [duration, setDuration] = useState('');
  const [durationType, setDurationType] = useState('Days');
  const [symptomList, setSymptomsList] = useState([]);
  const [symptomsData, setSymptomsData] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [textErrorMsg, setTextErrorMsg] = useState('');
  const [durationErrorMsg, setDurationErrorMsg] = useState('');

 

  const removeDuplicatesAndFilter = (symptoms, prefix) => {
    const uniqueSymptomsMap = new Map();
    symptoms.forEach((symptom) => {
      uniqueSymptomsMap.set(symptom.term.toLowerCase(), symptom);
    });
    const uniqueSymptoms = Array.from(uniqueSymptomsMap.values());
    return uniqueSymptoms.filter((symptom) =>
      symptom.term.toLowerCase().startsWith(prefix.toLowerCase())
    );
  };

  const fetchSymptomsList = async (text) => {
    if (text.length >= 1) {
      const response = await authPost("data/symptoms", { text }, currentUserData.token);
      if (response.message === "success") {
        const uniqueSortedSymptoms = removeDuplicatesAndFilter(
          response.symptoms,
          text
        );

        setSymptomsList(uniqueSortedSymptoms);
      }
    }
  };




  // Trigger API call when typing in the symptom input field
  const handleSymptomInput = (text) => {
    setSymptom(text);

    if (text?.length == 0) {
      setDropdownVisible(false);
      setSymptomsList([])
      return
    }
    fetchSymptomsList(text);
    setDropdownVisible(true);
  };

  // Handle selection of symptom from dropdown
  const selectSymptom = (selectedSymptom) => {
    setSymptom(selectedSymptom);
    setDropdownVisible(false); // Hide dropdown after selection
  };

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


  const handleChangeText = (text) => {
    const regex = /^\d*$/; // Regex to allow only numeric values
    // Check if input length is within 2 characters and matches the regex
    if ((regex.test(text) || text === '') && text.length <= 2) {
      setDuration(text);
    }
  };
  const handleAddSymptom= async()  => {
    let conceptId = "";
    if ((!symptom || !duration) ) {
      if (!symptom) {
        setTextErrorMsg(true);
        return;
      } else {
        setTextErrorMsg(false);
      }

      if (!duration) {
        setDurationErrorMsg(true);
        return;
      } else {
        setDurationErrorMsg(false);
      }

      return;
    }
      const filterConceptID = symptomList.filter((each) => each.term === symptom);
      if(filterConceptID.length===0) {
        Alert.alert("Error", "Please select from dropdown list");
        return
      }
      

      conceptId = filterConceptID[0].concept_id;
    
    let symptomps =[]
    if (symptom && duration) {
      if (durationType === "Year" && parseInt(duration) > 5) {
        Alert.alert("Error", "Year should be less than or equal to 5");

        return;
      } else {
        symptomps.push({
          symptom: symptom,
          duration: duration,
          durationParameter: durationType,
          conceptID: conceptId,
        });
      }
    }

    const body = {
      timeLineID: currentPatientData.patientTimeLineID,
      userID: currentUserData.id,
      symptoms: symptomps,
    };
    const response = await authPost(`symptom`, body, currentUserData.token);
    if (response.message == "success") {
      Alert.alert("Success", "symptom added successfully");
      setModalVisible(false)
    }

    setDurationErrorMsg(false);
    setTextErrorMsg(false);


  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>

        <Icon name="add" size={20} color="#fff" />
        <Text style={styles.buttonText}>Add Symptoms</Text>
      </TouchableOpacity>

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

<Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Symptoms</Text>

          <View style={styles.formContainer}>
            {/* Symptom input with dropdown */}
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Symptom*"
                value={symptom}
                onChangeText={handleSymptomInput}
              />
              {textErrorMsg && (
                <Text style={styles.errorText}>Please select Symptom</Text>
              )}

              {/* Dropdown list to show symptoms based on input */}
              {dropdownVisible && (
                <View style={styles.dropdown}>
                  <FlatList
                    data={symptomList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => selectSymptom(item.term)} // Set symptom on selection
                      >
                        <Text style={styles.dropdownText}>{item.term}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </View>

            {/* Duration input */}
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Duration*"
                value={duration}
                onChangeText={handleChangeText}
                keyboardType="numeric" // Ensures numeric keyboard is shown
              />
              {durationErrorMsg && (
                <Text style={styles.errorText}>Please select duration</Text>
              )}
            </View>

            {/* Duration Type Picker */}
            <View style={styles.inputGroup}>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={durationType}
                  style={styles.picker}
                  onValueChange={(itemValue) => setDurationType(itemValue)}
                >
                  {/* <Picker.Item label="Duration Type*" value="" /> */}
                  <Picker.Item label="Week" value="Week" />
                  <Picker.Item label="Days" value="Days" />
                  <Picker.Item label="Month" value="Month" />
                  <Picker.Item label="Year" value="Year" />
                  <Picker.Item label="Hour" value="Hour" />
                </Picker>
              </View>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#999' }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#007bff' }]}
              onPress={handleAddSymptom}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>


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
