import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Button,
  FlatList,
} from "react-native";
import Toast from 'react-native-toast-message';

import Icon from "react-native-vector-icons/MaterialIcons";
import TestItem from "./TestItem";
import { authPost } from "../../../axios/authPost";
import { useSelector } from "react-redux";
import { authFetch } from "../../../axios/authFetch";

const TestTab = () => {
  const user = useSelector((state) => state.currentUserData);
  const currentPatient = useSelector((state) => state.currentPatientData);
  const patientTimeLineID = currentPatient?.patientTimeLineID;

  const [modalVisible, setModalVisible] = useState(false);
  const [testName, setTestName] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newSelectedList, setNewSelectedList] = useState([]);
  const [selectedList, setSelectedList] = React.useState([]);


  const [testList, setTestsList] = React.useState([]);
  
  const removeDuplicatesAndFilter = (tests, prefix) => {
    const uniqueSymptomsMap = new Map();
    tests.forEach((test) => {
      uniqueSymptomsMap.set(test.LOINC_Name.toLowerCase(), test);
    });
    const uniqueSymptoms = Array.from(uniqueSymptomsMap.values());
    return uniqueSymptoms.filter((test) =>
      test.LOINC_Name.toLowerCase().startsWith(prefix.toLowerCase())
    );
  };

  const getTestsData = async (text) => {
    // Convert selectedItem to a string and lowercase it
    const searchText = selectedItem
      ? selectedItem.toString().toLowerCase()
      : "";

    // Send the request with the correct payload format
    const response = await authPost(
      `data/lionicCode/${user.hospitalID}`,
      { text: searchText }, // Sends { text: "de" } if searchText is "de"
      user.token
    );
  
    console.log("response===", response);

    if (response.message === "success") {
      const testData = response.data;
     const uniqueTests =  removeDuplicatesAndFilter(testData, text)
      setTestsList(uniqueTests);
    } else {
      setTestsList([]);
    }
  };

 

  
  const handleTestInput = (text) => {
    setSelectedItem(text);

    // setTestName(text);
    if (text.length === 0) {
      setSelectedItem([]);
    setDropdownVisible(false);
    return
    }
    getTestsData(text)
    setDropdownVisible(text.length > 0);

  };

  const selectTest = (name) => {
    setSelectedItem(name)
    setDropdownVisible(false);
  };

  const handleAddTest = async() => {
    if (selectedItem && testList.some((test) => test.LOINC_Name === selectedItem)) {
      const tests =
      selectedItem && testList.some((test) => test.LOINC_Name === selectedItem)
        ? testList
            .filter((test) => test.LOINC_Name === selectedItem)
            .map((test) => ({ testID:test.id, loinc_num_: test.LOINC_Code, test: selectedItem, department: test.Department }))
        : [];
    
      const body = {
        timeLineID: patientTimeLineID,
        userID: user.id,
        tests: tests,
        patientID: currentPatient.id,
      };
  
      const response = await authPost(`test/${user.hospitalID}`, body, user.token);
      console.log("response=========test==========",response)


      if (response.message === "success") {
        // setSelectedList((prevList) => [...prevList, ...response.tests]);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Test added successfully.',
          visibilityTime: 3000,
          autoHide: true,
          bottomOffset: 40,
        });
      setSelectedItem([]);
      setModalVisible(false)
        console.log("res=====",response)
      }
      else {
        // Error toast
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: response.message || 'Failed to add the test.',
          visibilityTime: 3000,
          autoHide: true,
          bottomOffset: 40,
        });
      }
      setSelectedItem(null);
    } else {
      alert("Please select a valid test from the list.");
    }
  };


  const getAllTests = async () => {
    const response = await authFetch(`test/${currentPatient.id}`, user.token);
    console.log("getAllTests==",response)
    if (response.message == "success") {
      setSelectedList(response.tests);
    }
  };
  useEffect(() => {
    getAllTests()
  },[user, patientTimeLineID, modalVisible])

  const mappedTestList = selectedList.map(item => ({
    id: item.id,
    test: item.test,
    addedBy: item.userID, // Assuming `addedBy` comes from `userID` or another field
    updatedTime: item.addedOn, // Assuming `addedOn` is the time you want to display
    ionicCode: item.loinc_num_, // Assuming `loinc_num_` is the ionic code
  }));

  console.log("selectedList====", selectedList);
  console.log("selectedItem====", selectedItem);
  console.log("selectTest====", selectTest);

  return (
    <View style={styles.container}>
      {currentPatient?.ptype !== 21 && (

        <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
        >
        <Icon name="add" size={20} color="#fff" />
        <Text style={styles.buttonText}>Add Tests</Text>
      </TouchableOpacity>
      )}

      <FlatList
    data={mappedTestList}
    renderItem={({ item }) => (
      <TestItem
      id={item.id}
        test={item.test}
        addedBy={item.addedBy}
        updatedTime={item.updatedTime}
        ionicCode={item.ionicCode}
      />
    )}
    keyExtractor={(item) => item.id.toString()}
    contentContainerStyle={{ paddingBottom: 60 }}
  />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Test</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Test Name*"
                value={selectedItem}
                // value={selectedItem?.name || ''} 
                onChangeText={handleTestInput}
              />

              {dropdownVisible && (
                <View style={styles.dropdown}>
                  <FlatList
                    data={testList}
                    keyExtractor={(item) => item.LOINC_Code}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => selectTest(item.LOINC_Name)}
                      >
                        <Text style={styles.dropdownText}>{item.LOINC_Name}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="#999"
              />
              <Button title="Add" onPress={handleAddTest} color="#007bff" />
            </View>

            <View style={styles.selectedListContainer}>
              {newSelectedList.map((test) => (
                <View key={test.LOINC_Code} style={styles.selectedItem}>
                  <Text>{test.name}</Text>
                  <Button
                    title="Remove"
                    onPress={() =>
                      setNewSelectedList((prev) =>
                        prev.filter((t) => t.LOINC_Code !== test.LOINC_Code)
                      )
                    }
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    marginBottom: 10,
    width: "100%",
    marginBottom: 10,
    
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1977f3",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "88%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    maxHeight: 150,
    position: "absolute",
    top: 50, 
    width: "100%",
    zIndex: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dropdownText: {
    fontSize: 16,
    color: "#000",
  },
});

export default TestTab;
