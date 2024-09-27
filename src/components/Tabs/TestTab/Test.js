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
      uniqueSymptomsMap.set(test.long_common_name_.toLowerCase(), test);
    });
    const uniqueSymptoms = Array.from(uniqueSymptomsMap.values());
    return uniqueSymptoms.filter((test) =>
      test.long_common_name_.toLowerCase().startsWith(prefix.toLowerCase())
    );
  };

  const getTestsData = async (text) => {
    // Convert selectedItem to a string and lowercase it
    const searchText = selectedItem
      ? selectedItem.toString().toLowerCase()
      : "";

    // Send the request with the correct payload format
    const response = await authPost(
      `data/lionicCode`,
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
    if (selectedItem && testList.some((test) => test.long_common_name_ === selectedItem)) {
      const tests =
      selectedItem && testList.some((test) => test.long_common_name_ === selectedItem)
        ? testList
            .filter((test) => test.long_common_name_ === selectedItem)
            .map((test) => ({ loinc_num_: test.loinc_num_, test: selectedItem }))
        : [];
    
      const body = {
        timeLineID: patientTimeLineID,
        userID: user.id,
        tests: tests,
      };
  
      const response = await authPost(`test`, body, user.token);
      if (response.message === "success") {
        // setSelectedList((prevList) => [...prevList, ...response.tests]);
      setSelectedItem([]);

        console.log("res=====",response)
      }
      setSelectedItem(null);
    } else {
      alert("Please select a valid test from the list.");
    }
  };


  const getAllTests = async () => {
    const response = await authFetch(`test/${patientTimeLineID}`, user.token);
    console.log("getAllTests==",response)
    if (response.message == "success") {
      setSelectedList(response.tests);
    }
  };
  useEffect(() => {
    getAllTests()
  },[user, patientTimeLineID])

  const mappedTestList = selectedList.map(item => ({
    id: item.id,
    test: item.test,
    addedBy: item.userID, // Assuming `addedBy` comes from `userID` or another field
    updatedTime: item.addedOn, // Assuming `addedOn` is the time you want to display
    ionicCode: item.loinc_num_, // Assuming `loinc_num_` is the ionic code
  }));

  console.log("selectedList====", selectedList);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="add" size={20} color="#fff" />
        <Text style={styles.buttonText}>Add Tests</Text>
      </TouchableOpacity>

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
                    keyExtractor={(item) => item.loinc_num_}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => selectTest(item.long_common_name_)}
                      >
                        <Text style={styles.dropdownText}>{item.long_common_name_}</Text>
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
                <View key={test.loinc_num_} style={styles.selectedItem}>
                  <Text>{test.name}</Text>
                  <Button
                    title="Remove"
                    onPress={() =>
                      setNewSelectedList((prev) =>
                        prev.filter((t) => t.loinc_num_ !== test.loinc_num_)
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
    // backgroundColor:"red",
    width: "100%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1977f3",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
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
