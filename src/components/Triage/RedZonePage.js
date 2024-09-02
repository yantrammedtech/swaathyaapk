import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const RedZonePage = ({ route }) => {
  const { patientName, patientImage } = route.params;
  
  // Get the navigation object
  const navigation = useNavigation();
  const [selectedZone, setSelectedZone] = useState(null);
  

  const [selectedWard, setSelectedWard] = useState(null);
 

  const getBackgroundColor = () => {
    switch (selectedZone) {
      case 'red':
        return '#F65555';
      case 'yellow':
        return '#F7AC38'; 
      case 'green':
        return '#1DDD8D'; 
      default:
        return 'white'; // Default background color
    }
  };

  const handleSubmit = () => {
    // Navigate to the TriageDashboard screen
    navigation.navigate('TriageDashboard');
  };
  const getPickerBackgroundColor = () => {
    return selectedWard ? '#4792f5' : 'white'; // Change color based on selection
  };
  const getTextColor = () => {
    return getPickerBackgroundColor() === '#4792f5' ? 'white' : 'black'; // White text on blue, black otherwise
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.patientInfo}>
        <Text style={styles.patientText}>{patientName} is under {selectedZone}</Text>
        <Image source={patientImage} style={styles.patientImage} />
      </View>
{/* 
      <View style={[styles.zoneContainer, { backgroundColor: getBackgroundColor() }]}>
        <DropDownPicker
          open={open}
          value={selectedZone}
          items={items}
          setOpen={setOpen}
          setValue={setSelectedZone}
          setItems={setItems}
          placeholder="Select Zone"
          style={[styles.dropdown, { backgroundColor: getBackgroundColor() }]}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View> */}

<View style={[styles.pickerWrapper, { backgroundColor: getBackgroundColor() }]}>
        <Picker
          selectedValue={selectedZone}
          style={[styles.picker, { backgroundColor: 'transparent' }]} // Transparent Picker for color
          onValueChange={(itemValue) => setSelectedZone(itemValue)}
        >
          <Picker.Item label="Select Zone" value={null} />
          <Picker.Item label="Red Zone" value="red" />
          <Picker.Item label="Yellow Zone" value="yellow" />
          <Picker.Item label="Green Zone" value="green" />
        </Picker>
      </View>

      <View style={styles.dropdownContainer}>
        <View style={[styles.pickerWrapper, { backgroundColor: getPickerBackgroundColor() }]}>
          <Picker
            selectedValue={selectedWard}
            style={[styles.picker, { backgroundColor: 'transparent' }]} // Transparent Picker for color
            onValueChange={(itemValue) => setSelectedWard(itemValue)}
          >
            <Picker.Item label="Select Ward" value={null} />
            <Picker.Item label="General Ward" value="generalWard" />
            <Picker.Item label="ICU" value="icu" />
            <Picker.Item label="Emergency" value="emergency" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  patientInfo: {
    marginBottom: 20,
    alignItems: 'center',
  },
  patientText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  patientImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  zoneContainer: {
    marginBottom: 20,
    borderRadius: 5,
  },
  dropdown: {
    height: 50,
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  
  pickerContainer: {
    borderRadius: 5,
    borderWidth: 1,
  
  },
  pickerWrapper: {
    borderRadius: 5,
    borderWidth: 1,
   margin:10,
  },
 
  picker: {
    height: 50,
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: '#1977f3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RedZonePage;
