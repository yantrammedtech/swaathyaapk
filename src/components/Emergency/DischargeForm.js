import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet ,FlatList} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Chip } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import { authPost } from '../../axios/authPost';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import Toast from 'react-native-toast-message';

import { useNavigation } from '@react-navigation/native'; 

const DischargeForm = () => {
  const user = useSelector((state) => state.currentUserData);
  const currentPatient = useSelector((state) => state.currentPatientData);
  const patientTimeLineID = currentPatient?.patientTimeLineID;
const allPatient = useSelector((state) => state.allPatientsList)

  const dispatch = useDispatch()
  const navigation = useNavigation(); 

  const [openReason, setOpenReason] = useState(false);
  const [reason, setReason] = useState(1);
  const [reasonItems, setReasonItems] = useState([
    { label: 'Discharge Success', value: 1 },
    { label: 'DOPR', value: 2 },
    { label: 'Absconded', value: 3 },
    { label: 'Left Against Medical Advice', value: 4 },
    { label: 'Death', value: 5 },
  ]);
  

 
  const dietList = ["Pinapple", "Miannoase"];

  const [diet, setDiet] = React.useState({
    searchedList: [],
    selectedList: [],
    search: "",
    istrue: false,
  });

  React.useEffect(() => {
    if (!diet.search) {
      setDiet((prevvalue) => {
        return { ...prevvalue, searchedList: [...dietList] };
      });
    } else {
      setDiet((prevValue) => {
        return {
          ...prevValue,
          searchedList: [
            ...dietList.filter((el) =>
              el.toLowerCase().includes(diet?.search?.toLowerCase())
            ),
          ],
        };
      });
    }
  }, [diet.search]);

  const [formData, setFormData] = React.useState({
    dischargeType: 0,
    advice: "",
    followUp: 0,
    followUpDate: "",
    diagnosis: "",
    prescription: "",
  });

  const handleAdd = () => {
    if (diet.search && !diet.selectedList.includes(diet.search)) {
      setDiet((prevValue) => {
        return {
          ...prevValue,
          selectedList: [...prevValue.selectedList, diet.search],
          search: "", // Clear the search field after adding
        };
      });
    }
  };

  // Handle removing selected diet item
  const removeChip = (item) => {
    setDiet((prevValue) => {
      return {
        ...prevValue,
        selectedList: prevValue.selectedList.filter((chip) => chip !== item),
      };
    });
  };

  // Format date (optional utility function)
  const formatDate = (date) => {
    return date.toISOString().split('T')[0]; // Returns 'YYYY-MM-DD'
  };

  const handleFollowUpChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      followUp: value,
    }));
  };


  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Ensure the date picker closes after selection
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
      setFormData((data) => ({
        ...data,
        followUpDate: dateString, // Update the followUpDate in formData
      }));
    }
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      dischargeType: reason, // Update formData's dischargeType with the selected value
    }));
  }, [reason]); 



  const validateForm = () => {
    // Check dischargeType first
    if (!formData.dischargeType || formData.dischargeType === 0) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please select a reason for Discharge.',
      });
      return false;
    }
  
    // Check diet selection if dischargeType is not "Death"
    if (diet.selectedList.length === 0 && formData.dischargeType !== 5) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'At least one diet must be selected.',
      });
      return false;
    }
  
    // Check advice if dischargeType is not "Death"
    if (!formData.advice.trim() && formData.dischargeType !== 5) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Advice on discharge is required.',
      });
      return false;
    }
  
    // Check followUpDate if followUp is required
    if (formData.followUp === 1 && !formData.followUpDate.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Follow-up date is required.',
      });
      return false;
    }
  
    // Check prescription if dischargeType is not "Death"
    if (!formData.prescription.trim() && formData.dischargeType !== 5) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Prescription is required.',
      });
      return false;
    }
  
    // Check diagnosis
    if (!formData.diagnosis.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Final diagnosis is required.',
      });
      return false;
    }
  
    return true; // If all validations pass
  };

 const handleDischarge = async () => {

  if (!validateForm()) {
    return; 
  }
   
    const response = await authPost(
      `patient/${user.hospitalID}/patients/discharge/${currentPatient.id}`,
      {
        dischargeType: formData.dischargeType,
        advice: formData.advice,
        followUpDate: formData.followUpDate,
        followUp: formData.followUp,
        diagnosis:formData.diagnosis,
        prescription:formData.prescription,
        diet: diet.selectedList.join(","),
      },
      user.token
    );
    if (response.message == "success") {
      // const newPatientList = allPatient.filter(
      //   (patient) => patient.id != currentPatient.id
      // );
      // dispatch({ type: "allPatientsList", payload: newPatientList })
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Patient successfully discharched.',
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 40,
      });
      navigation.goBack();
     
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: response.message,
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 40,
      });
    }
  };
 
const handleCancel = () => {
  navigation.goBack();
}
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Discharge</Text>

      <DropDownPicker
        open={openReason}
        value={reason}
        items={reasonItems}
        setOpen={setOpenReason}
        setValue={setReason}
        setItems={setReasonItems}
        placeholder="Reason for discharge"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      {/* Date Input */}
     
       
         <TextInput
        label="Date"
          style={styles.dateInput}
          value={formatDate(new Date())}
          editable={false} // Disable the input
        />
   

   {formData.dischargeType !== 5 && (
    <>
 {/* Diet Input with ADD Button */}
 <View style={styles.dietContainer}>
        <TextInput
          style={styles.dietinput}
          placeholder="Diet"
          label='Diet'
          value={diet.search} 
          onChangeText={(text) =>
            setDiet((prevValue) => ({ ...prevValue, search: text }))
          }
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
      </View>

      {/* Chip List for Selected Diets */}
      <FlatList
        data={diet.selectedList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Chip
          
            style={styles.chip}
            onClose={() => removeChip(item)}
          >
            {item}
          </Chip>
        )}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
       {/* Advice and Prescription */}
       <TextInput
            style={styles.input}
            placeholder="Advice on Discharge"
            value={formData.advice}
            onChangeText={(text) =>
              setFormData((data) => ({ ...data, advice: text }))
            }
          />
           <TextInput
            style={styles.input}
            placeholder="Prescription"
            value={formData.prescription}
            onChangeText={(text) =>
              setFormData((data) => ({ ...data, prescription: text }))
            }
          />
    </>
   )}
     
     {formData.dischargeType !== 5 && (
      <>
  {/* Follow-up Radio Button */}
  <View style={styles.followUpContainer}>
        <Text style={styles.followUpText}>Follow up required?</Text>
        <RadioButton.Group
          onValueChange={handleFollowUpChange}
          value={formData.followUp}
        >
          <View style={styles.radioButtonContainer}>
          <RadioButton value="1" />
          <Text>Yes</Text>
          </View>
          <View style={styles.radioButtonContainer}>
          <RadioButton value="0" />
            <Text>No</Text>
          </View>
        </RadioButton.Group>
      </View>

      <View style={styles.inputContainer}>
  <Text style={styles.label}>Follow up Date</Text>
  <TouchableOpacity
    style={[
      styles.input,
      { backgroundColor:formData.followUp == '1' ? '#fff' : '#e0e0e0' }, // Conditional background color
    ]}
    onPress={() => {
      if (formData.followUp == '1') {
        setShowDatePicker(true);
      }
    }}
    disabled={formData.followUp !== "1"}
  >
    <Text style={styles.inputText}>
      {formData.followUpDate || 'Select date'}
    </Text>
  </TouchableOpacity>
  {showDatePicker && (
    <DateTimePicker
      value={formData.followUpDate ? new Date(formData.followUpDate) : new Date()}
      mode="date"
      display="default"
      onChange={handleDateChange}
    />
  )}
</View>
      </>
     )}

    

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Cancel" color="red" onPress={handleCancel} />
        <Button title="Submit" onPress={handleDischarge} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    top:20,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  dropdown: {
    marginBottom: 12,
    borderColor: '#ccc',
    height: 40,
  },
  dropdownContainer: {
    backgroundColor: '#f4f4f4',
    borderColor: '#ccc',
  },
  dietContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 8,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  followUpContainer: {
    marginBottom: 12,
  },
  followUpText: {
    fontSize: 16,
    marginBottom: 4,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  dietContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dietinput: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  chip: {
    marginBottom: 8,
    backgroundColor: '#e8f1fe',
    width: '50%',
  },
 dateInput:{
  marginBottom: 15,
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 5,
  width: "100%",
  padding:10,
  marginTop:10,
 }, 
 
  
});

export default DischargeForm;