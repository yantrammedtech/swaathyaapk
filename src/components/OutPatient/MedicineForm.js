import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal,Image ,FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { authPost } from '../../axios/authPost';

const MedicineForm = ({ visible, onClose ,updateLatestData}) => {
    const user = useSelector((state) => state.currentUserData);
    const currentPatient = useSelector((state) => state.currentPatientData);
    const patientTimeLineID = currentPatient?.patientTimeLineID;
  
    const [frequency, setFrequency] = useState(1);
    const timings = ['Before Breakfast', 'After Breakfast', 'Before Lunch', 'After Lunch', 'Before Dinner', 'After Dinner','As Per Need'];
    const [medicationTime, setMedicationTime] = React.useState([]);
    const [mealIndex, setMealIndex] = useState(0)
    const [errorMessage, setErrorMessage] = useState(null);

    const [medArr, setMedArr] = useState([])
  

   
    
    const medicineTypeImages = {
        1: require('../../assets/treatmentplan/image 50.png'), // capsule
        2: require('../../assets/treatmentplan/image 53.png'), // syrup
        3: require('../../assets/treatmentplan/tablet.png'),   // tablet
        4: require('../../assets/treatmentplan/image 51.png'), // injection
        5: require('../../assets/treatmentplan/image 52.png'), // iv_line
        6: require('../../assets/treatmentplan/image 56.png'), // tubing
        7: require('../../assets/treatmentplan/image 55.png'), // spray
        8: require('../../assets/treatmentplan/image 54.png'), // drops
       // 9: require('../../../assets/treatmentplan/image 57.png'), // topical (you can replace with the correct path)
      };
   
  

    const showErrorToast = (message) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: message,
          position: 'top',
          visibilityTime: 4000,
        });
      };

    const handleSubmit = async() => {

          const getCurrentDate = () => {
            const now = new Date();
            return now.toISOString().split("T")[0];
          };


          const medicineNamesInArray = medArr.map((item) => item.Medicine_Name);

          // Check if each medicineName in medicineData exists in the medicineNamesInArray
          const medicineNameExists = medicineData.some(each => 
            !medicineNamesInArray.includes(each?.medicineName)
          );
          
          // Handle the case where a medicineName does not exist in the options
          if (medicineNameExists) {
            // Dispatch error or handle it as needed
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Select a medicine name from the options',
                position: 'top', // 'top', 'bottom', 'center'
              });
              Alert.alert("Error", "Select a medicine name from the options");
            return 
          }
      
          const finalData = medicineData.map((el) => ({
            timeLineID: patientTimeLineID,
            userID: user.id,
            medicineType: el.medicineType?.toString(),
            medicine: el.medicineName,
            medicineDuration: el.daysCount?.toString(),
            meddosage: el.doseCount ||0,
            medicineFrequency: el.Frequency.toString(),
            medicineTime: el.medicationTime,
            test:el.test,
            advice:el.notes,
            followUp:0,
            followUpDate:'',
            // followUp:el.followUp,
            // followUpDate:el.followUpDate,
            medicineStartDate: el?.medicineStartDate || getCurrentDate(),

          }));

        
         
          if (finalData[0]?.medicineType == 0) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please select MedicineType',
                position: 'top', // 'top', 'bottom', 'center'
              });
              Alert.alert("Error", "Please select MedicineType");

            return;
          }
          if (finalData[0]?.medicine === "") {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please select medicineName',
                position: 'top', // 'top', 'bottom', 'center'
              });
              Alert.alert("Error", "Please select medicineName");

            return;
          }
          // Check if doseCount is less than 1
  if (finalData[0]?.doseCount < 1) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Dose count must be at least 1',
      position: 'top',
    });
    Alert.alert("Error", "Dose count must be at least 1");

    return;
  }
  if (finalData[0]?.daysCount < 1) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Please select Days count',
      position: 'top',
    });
    Alert.alert("Error", "'Please select Days count");

    return;
  }
          if (
            !finalData[0] ||
            finalData[0].medicineTime.split(",").length <
              (finalData[0].Frequency ?? 0)
          ) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please select Time of Medication',
                position: 'top', // 'top', 'bottom', 'center'
              });
    Alert.alert("Error", "Please selectTime of Medication");

            return;
          }
      
          if (!finalData[0] || finalData[0].medicineTime.split(',').length > (finalData[0].medicineFrequency ?? 0)) {
            if(!finalData[0].medicineTime.includes("As Per Need")){
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: `Please Select ${finalData[0].medicineFrequency} Time of Medication`,
                position: 'top',
                visibilityTime: 4000,
              });
    Alert.alert("Error", `Please Select ${finalData[0].medicineFrequency} Time of Medication`);

              return;
            }
          }



         

          const response = await authPost(
            `prescription/${user.hospitalID}`,
            {finalData},
            user.token
          )
    updateLatestData("update")
          
          if (response.message === "success") {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Medicine successfully added',
                position: 'top', // or 'bottom' or 'center'
                visibilityTime: 4000, // how long the toast will be visible (in milliseconds)
              });
        Alert.alert("Success", "Medicine successfully added");

            setMedicineData([medicineInitialState]);
            // setNewMedicineList(response.medicines);
            onClose();
          } else {
            
            showErrorToast(response.message); // Show toast for error
    Alert.alert("Error",response.message);

          }
        // onClose()
    }




    const medicineInitialState = {
        timeLineID: 0,
        userID: 0,
        medicineType: 0,
        medicineName: "",
        daysCount: 0,
        doseCount: 0,
        Frequency: 1,
        medicationTime: "",
        doseUnit:"",
        doseTimings: "",
        notes: "",
        isOther: false,
        medicineList: [],
      };
    
      const [medicineData, setMedicineData] = React.useState([
        medicineInitialState,
      ]);
  const [dropdownVisible, setDropdownVisible] = useState(false);


    const fetchMedicineList = async (text, index) => {
        if (text.length >= 1) {
          const response = await authPost("data/medicines", { text }, user.token);
          if (response.message === "success") {
        setMedArr(response.medicines)

            setMedicineData((prev) => {
              const newData = [...prev];
              newData[index].medicineList = response.medicines?.map(
                (medicine) => medicine.Medicine_Name
              );
              return newData;
            });
          }
        }
      };

     
      
      const handleMedicineInput = (text, index) => {
        // Update the specific medicine's name in medicineData
        setMedicineData((prev) => {
          const newData = [...prev];
          newData[index].medicineName = text;
          return newData;
        });
      
        if (text?.length === 0) {
          setDropdownVisible(false);
          setMedicineData((prev) => {
            const newData = [...prev];
            newData[index].medicineList = [];
            return newData;
          });
          return;
        }
        fetchMedicineList(text, index);
        setDropdownVisible(true);
      };

      const selectMedicine = (medicineName, index) => {
      
        setMedicineData((prev) => {
          const newData = [...prev];
          newData[index].medicineName = medicineName;
          newData[index].medicineList = []; // Clear the medicine list for this entry
          return newData;
        });
        setDropdownVisible(false);
      };

      const medicineCategory = {
        capsules: 1,
        syrups: 2,
        tablets: 3,
        injections: 4,
        ivLine: 5,
        Tubing: 6,
        Topical: 7,
        Drops: 8,
        Spray: 9,
      };

    const selectedType = medicineData[0].medicineType;

      const handlePickerChange = (itemValue, index) => {
        setMedicineData((prev) => {
          const newData = [...prev];
          newData[index].medicineType = Number(itemValue); // Convert value to number
          return newData;
        });
        //updateDosageUnit(); // Ensure this function is defined
      };

      useEffect(() => {
        const  index = mealIndex
        setMedicineData((prevData) => {
          const newData = [...prevData];
          if (newData[index] && medicationTime.includes("As Per Need")) {
            newData[index] = {
              ...newData[index],
              Frequency: 1,
              daysCount: 0,
              medicationTime: "As Per Need"
            };
          } else {
            newData[index] = {
              ...newData[index],
              medicationTime: medicationTime.join(","),
            };
          }
          return newData;
        });
      }, [medicationTime]);
    
      const handleMedicationTimeClick = (each,index) => {
        if (medicineData && medicineData[index] && typeof medicineData[index].Frequency === "number") {
          const maxSelectable = medicineData[index].Frequency;
    
          setMedicationTime((prev) => {
            const newMedicationTime = [...prev];
            const itemIndex = newMedicationTime.indexOf(each);
    
            if (itemIndex === -1) {
              // 'each' is not in the array, so add it if not exceeding the frequency limit
              if (newMedicationTime.length < maxSelectable) {
                newMedicationTime.push(each);
              }
            } else {
              // 'each' is in the array, so remove it
              newMedicationTime.splice(itemIndex, 1);
            }
    
            return newMedicationTime;
          });
        } else {
          console.error("Invalid medicine data or frequency");
        }
      };
    
    
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        {medicineData.map((medicine, index) => (
          <View key={index} style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.header}>
                {/* Close Icon at the top-left */}
                <TouchableOpacity onPress={onClose} style={styles.closeIconContainer}>
                  <Icon name="close" size={24} color="#fff" style={styles.closeIcon} />
                </TouchableOpacity>
      
                {/* Medicine image and text in the center */}
                <View style={styles.centerContent}>
                  {selectedType !== '' && (
                    <Image
                      source={medicineTypeImages[selectedType]}
                      style={styles.medicineImage}
                      resizeMode="contain"
                    />
                  )}
                 <Text style={styles.headerText}>
    {selectedType
      ? Object.keys(medicineCategory).find(key => medicineCategory[key] === selectedType) // Get the label
      : 'No type selected'}
  </Text>
                </View>
              </View>
      
              {/* Form for Selecting Medicine and Type */}
              <View style={styles.form}>
                {/* Medicine Selection with TextInput-based Dropdown */}
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Medicine Name*"
                    value={medicine.medicineName}
                    onChangeText={(text) => handleMedicineInput(text, index)} // Function to handle text input for medicine
                  />
      
                  {/* Dropdown list to show medicines based on input */}
                  {dropdownVisible && (
      <View style={styles.dropdown}>
        <FlatList
        data={
            medicine.medicineName && medicine.medicineList
              ? medicine.medicineList.filter((e) =>
                  e.toLowerCase().startsWith(medicine.medicineName.toLowerCase())
                )
              : []
          } // Filtered options based on the medicine name input
          keyExtractor={(item) => item} 
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => selectMedicine(item, index)} // Pass index to select the specific medicine
            >
              <Text style={styles.dropdownText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    )}
                </View>
      
                {/* Medicine Type Selection */}
               
                 <View style={styles.dropdownContainer}>
      <Picker
        selectedValue={String(medicineData[0].medicineType)} // Convert to string for Picker
        onValueChange={(itemValue) => handlePickerChange(itemValue, 0)} // Update state on change
        style={styles.picker}
      >
        <Picker.Item label="Select Medicine Type" value="" />
        {Object.keys(medicineCategory).map((key) => (
          <Picker.Item
            key={medicineCategory[key]}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            value={medicineCategory[key ].toString()} // Convert to string for Picker
          />
        ))}
      </Picker>
    </View>

      
                {/* Select Days */}
                <View style={styles.inputContainer}>
  <TextInput
    value={medicineData[index]?.daysCount?.toString() || ''}  // Fetch value from state
    onChangeText={(text) => {
      const newValue = parseInt(text, 10);
      if (newValue.toString().length <= 3 && !isNaN(newValue)) {
        setMedicineData((prev) => {
          const newData = [...prev];
          newData[index].daysCount = newValue;
          return newData;
        });
      } else if (text === '') {
        setMedicineData((prev) => {
          const newData = [...prev];
          newData[index].daysCount = null;
          return newData;
        });
      }
    }}
    keyboardType="numeric"
    placeholder="Enter number of days"
    style={styles.textInput}
    maxLength={3}  // Set a limit to how many digits can be entered
  />
</View>
      
                {/* Meal Timing Buttons */}
                <View style={styles.mealTimingsContainer}>
  {timings.map((time) => (
    <TouchableOpacity
      key={time}
      style={[
        styles.mealButton,
        medicationTime.includes(time) && styles.mealButtonActive,
        medicationTime.length >= medicineData[index]?.Frequency && !medicationTime.includes(time) && styles.disabledButton,
      ]}
      onPress={() => {
        handleMedicationTimeClick(time,index);
        setMealIndex(index); // Set the meal index on click
      }}
      disabled={
        medicationTime.length >= medicineData[index]?.Frequency &&
        !medicationTime.includes(time)
      }
    >
      <Text
        style={[
          styles.mealButtonText,
          medicationTime.includes(time) && styles.mealButtonTextActive,
        ]}
      >
        {time}
      </Text>
    </TouchableOpacity>
  ))}
</View>
      
                {/* Add Note */}
                <TextInput
  placeholder="Add advice"
  style={styles.noteInput}
  value={medicineData[index]?.notes || ''}  // Fetch value from state
  onChangeText={(text) => {
    setMedicineData((prev) => {
      const newData = [...prev];
      newData[index].notes = text;
      return newData;
    });
  }}
/>

      
                {/* Frequency and Dose */}
                <View style={styles.frequencyContainer}>
                <View style={styles.counter}>
      <Text style={styles.counterText}>Frequency</Text>
      <View style={styles.counterControls}>
        <TouchableOpacity
          onPress={() => {
            const currentValue = medicineData[index]?.Frequency || 0;
            const newValue = Math.max(currentValue - 1, 0); // Decrease frequency

            if (newValue < 1) {
              setErrorMessage("Frequency must be at least 1");
              return;
            }

            setMedicineData((prev) => {
              const newData = [...prev];
              newData[index].Frequency = newValue;
              return newData;
            });
          }}
        >
          <Image
            source={require('../../assets/treatmentplan/minus.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.counterNumber}>{medicineData[index]?.Frequency}</Text>
        <TouchableOpacity
          onPress={() => {
            const currentValue = medicineData[index]?.Frequency || 0;
            const newValue = currentValue + 1; // Increment frequency

            if (newValue > 6) {
              setErrorMessage("Frequency cannot exceed 6");
              return;
            }

            setMedicineData((prev) => {
              const newData = [...prev];
              newData[index].Frequency = newValue;
              return newData;
            });
          }}
        >
          <Image
            source={require('../../assets/treatmentplan/pluse.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  <View style={styles.counter}>
  <Text style={styles.counterText}>No of Dosage</Text>
  <View style={styles.counterControls}>
    <TouchableOpacity
      onPress={() => {
        const currentValue = medicineData[index]?.doseCount || 0;
        const newValue = Math.max(currentValue - 1, 0); // Decrease dosage

        if (newValue < 1) {
          setErrorMessage("Dose count must be at least 1");
          return;
        }

        if (!isNaN(newValue)) {
          setMedicineData((prev) => {
            const newData = [...prev];
            newData[index].doseCount = newValue;
            return newData;
          });
        } else {
          setMedicineData((prev) => {
            const newData = [...prev];
            newData[index].doseCount = null;
            return newData;
          });
        }
      }}
    >
      <Image
        source={require('../../assets/treatmentplan/minus.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </TouchableOpacity>

    <Text style={styles.counterNumber}>{medicineData[index]?.doseCount}</Text>

    <TouchableOpacity
      onPress={() => {
        const currentValue = medicineData[index]?.doseCount || 0;
        const newValue = currentValue + 1; // Increment dosage

        if (newValue > 999) {
          setErrorMessage("Maximum dose count is 999");
          return;
        }

        if (!isNaN(newValue)) {
          setMedicineData((prev) => {
            const newData = [...prev];
            newData[index].doseCount = newValue;
            return newData;
          });
        } else {
          setMedicineData((prev) => {
            const newData = [...prev];
            newData[index].doseCount = null;
            return newData;
          });
        }
      }}
    >
      <Image
        source={require('../../assets/treatmentplan/pluse.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </TouchableOpacity>
  </View>
  {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
</View>

</View>
      
                {/* Add Button */}
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Modal>
      
    );
};


const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 50,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Modal background overlay
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        elevation: 5,
    },
    header: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    closeIconContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    centerContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    
    pills: {
        marginLeft: 'auto',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    form: {
        marginTop: 10,
    },
    dropdownContainer: {
        marginTop: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#d9d9d9',
        width:"100%",
    },
    button: {
        backgroundColor: '#007bff',  // Blue background
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 20,
        width: '40%',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
   
   
    mealTimingsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    mealButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 20,
        marginVertical: 5,
    },
    mealButtonActive: {
        backgroundColor: '#007bff', // Active background color
    },
    mealButtonText: {
        fontSize: 14,
        color: '#000', // Default text color
    },
    mealButtonTextActive: {
        color: '#fff', // Text color when active
    },
    noteInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        height: 50,
    },
    frequencyContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent:"space-between",
        width:"100%"
    },
    counter: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    counterText: {
        fontSize: 16,
        margin:10,
    },
    counterControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:"red",
    },
    counterNumber: {
        marginHorizontal: 10,
        fontSize: 18,
    },
   
    container: {
        // flex: 3,
        padding: 20,
        backgroundColor: '#fff',
    },
   
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        flex: 1,
    },
    counterControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#fff",
        borderRadius: 16,
        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        // Android Shadow
        elevation: 5,
    },
    
    image: {
        width: 20,
        height: 30,
        marginHorizontal: 10,
    },
    counterNumber: {
        fontSize: 18,
    },
    inputContainer: {
        width: '100%',
        marginTop: 20,
        alignSelf: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        textAlign: 'center',
    },
    medicineImage: {
        width: 100,
        height: 70,
        marginTop: 10,
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
      errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 10,
      },
    
});

export default MedicineForm
