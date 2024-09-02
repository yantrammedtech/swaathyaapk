import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const RedZonePage = ({ route }) => {
  const { patientName, patientImage } = route.params;
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  
  // Get the navigation object
  const navigation = useNavigation();

  // Define background colors based on the selected zone
  const getBackgroundColor = () => {
    switch (selectedZone) {
      case 'Red Zone':
        return '#F65555'; // Red
      case 'Yellow Zone':
        return '#F7AC38'; // Yellow
      case 'Green Zone':
        return '#1DDD8D'; // Green
      default:
        return '#fff'; // Default background color
    }
  };

  const handleZoneChange = (index, value) => {
    setSelectedZone(value);
  };

  const handleWardChange = (index, value) => {
    setSelectedWard(value);
  };

  // Function to handle submit button press
  const handleSubmit = () => {
    // Navigate to the TriageDashboard screen
    navigation.navigate('TriageDashboard');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.patientInfo}>
        <Text style={styles.patientText}>{patientName} is under {selectedZone}</Text>
        <Image source={patientImage} style={styles.patientImage} />
      </View>

      <View style={[styles.zoneContainer, { backgroundColor: getBackgroundColor() }]}>
        <ModalDropdown
          options={['Red Zone', 'Yellow Zone', 'Green Zone']}
          defaultValue="Select Zone"
          onSelect={handleZoneChange}
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownMenu}
          renderRow={(option, _, isSelected) => (
            <View
              style={[
                styles.dropdownRow,
                { backgroundColor: isSelected ? '#ddd' : '#fff' }
              ]}
            >
              <Text
                style={[
                  styles.dropdownRowText,
                  { color: isSelected ? '#000' : '#666' }
                ]}
              >
                {option}
              </Text>
            </View>
          )}
        />
{/* 
<DropDownPicker
        open={open}
        value={capillaryRefill}
        items={items}
        setOpen={setOpen}
        setValue={setCapillaryRefill}
        setItems={setItems}
        placeholder="Capillary Refill *"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      /> */}
      </View>

      <ModalDropdown
        options={['General Ward', 'ICU', 'Emergency']}
        defaultValue="Select Ward"
        onSelect={handleWardChange}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        dropdownStyle={styles.dropdownMenu}
        renderRow={(option, _, isSelected) => (
          <View
            style={[
              styles.dropdownRow,
              { backgroundColor: isSelected ? '#ddd' : '#fff' }
            ]}
          >
            <Text
              style={[
                styles.dropdownRowText,
                { color: isSelected ? '#000' : '#666' }
              ]}
            >
              {option}
            </Text>
          </View>
        )}
      />

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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdown: {
    height: 50,
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
    padding: 10,
  },
  dropdownMenu: {
    width: '100%',
    backgroundColor: '#fff',
  },
  dropdownRow: {
    padding: 10,
  },
  dropdownRowText: {
    fontSize: 16,
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
