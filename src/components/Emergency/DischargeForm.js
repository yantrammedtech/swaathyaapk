import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet ,FlatList} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Chip } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';

const DischargeForm = () => {
  const [openReason, setOpenReason] = useState(false);
  const [reason, setReason] = useState(null);
  const [reasonItems, setReasonItems] = useState([
    { label: 'Medical Recovery', value: 'medical' },
    { label: 'Transfer', value: 'transfer' },
    { label: 'Others', value: 'others' },
  ]);

  const [advice, setAdvice] = useState('');
  const [finalDiagnosis, setFinalDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');
  const [followUp, setFollowUp] = useState('yes');

  const [selectedList, setSelectedList] = useState([]); // State for the list of items
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
    dischargeType: 1,
    advice: "",
    followUp: 0,
    followUpDate: "",
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
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
      setFormData((data) => ({ ...data, followUpDate: dateString }));
    }
  };

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

      
     
     

      {/* Other Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Advice on discharge"
        onChange={(event) => {
          setFormData((data) => {
            return { ...data, advice: event.target.value };
          });
        }}
        value={formData.advice}
      />
      <TextInput
        style={styles.input}
        placeholder="Final Diagnosis"
        value={finalDiagnosis}
        onChangeText={setFinalDiagnosis}
      />
      <TextInput
        style={styles.input}
        placeholder="Prescription"
        value={prescription}
        onChangeText={setPrescription}
      />

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
            { backgroundColor: formData.followUp ? '#fff' : '#e0e0e0' }, // Conditional background color
          ]}
          onPress={() => {
            if (formData.followUp) {
              setShowDatePicker(true);
            }
          }}
          disabled={!formData.followUp} // Conditionally disable TouchableOpacity
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

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Cancel" color="red" onPress={() => {}} />
        <Button title="Submit" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
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