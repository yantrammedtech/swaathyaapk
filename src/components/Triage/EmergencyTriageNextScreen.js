import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const EmergencyTriageNextScreen = () => {
    const navigation = useNavigation(); 

  const [activeBleeding, setActiveBleeding] = useState('yes');
  const [stridor, setStridor] = useState('yes');
  const [cSpineInjury, setCSpineInjury] = useState('yes');
  const [talkingInIncompleteSentence, setTalkingInIncompleteSentence] = useState('yes');
  const [alteredSensorium, setAlteredSensorium] = useState('yes');
  const [noisyBreathing, setNoisyBreathing] = useState('yes');
  const [activeBreathing, setActiveBreathing] = useState('yes');
  const [angioedema, setAngioedema] = useState('yes');
  const [capillaryRefill, setCapillaryRefill] = useState(null);
  const [radioPulse, setRadioPulse] = useState('present'); 
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Less than 2 seconds', value: 'less than 2 seconds' },
    { label: 'More than 2 seconds', value: 'more tha 2 seconds' },
  ]);

  const renderToggleButton = (label, state, setState) => (
    <View style={styles.toggleContainer}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <View style={styles.toggleButtons}>
        <TouchableOpacity
          style={[styles.toggleButton, state === 'yes' ? styles.toggleButtonSelected : styles.toggleButtonUnselected]}
          onPress={() => setState('yes')}
        >
          <Text style={[styles.toggleButtonText, state === 'yes' && styles.toggleButtonTextSelected]}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, state === 'no' ? styles.toggleButtonSelected : styles.toggleButtonUnselected]}
          onPress={() => setState('no')}
        >
          <Text style={[styles.toggleButtonText, state === 'no' && styles.toggleButtonTextSelected]}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleNextPress = () => {
    // Create an object with the form data
    const formData = {
      activeBleeding,
      stridor,
      cSpineInjury,
      talkingInIncompleteSentence,
      alteredSensorium,
      noisyBreathing,
      activeBreathing,
      angioedema,
      capillaryRefill,
      radioPulse,
    };
  
    console.log('Form Data:', formData);
  
    // Navigate to the next screen, passing the formData as a parameter
    navigation.navigate('NextScreen', { formData });
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
     

      <View style={styles.row}>
        <View style={styles.column}>
          {renderToggleButton('Active Bleeding', activeBleeding, setActiveBleeding)}
          {renderToggleButton('Stridor', stridor, setStridor)}
          {renderToggleButton('C Spine Injury', cSpineInjury, setCSpineInjury)}
          {renderToggleButton('Talking In Incomplete Sentence', talkingInIncompleteSentence, setTalkingInIncompleteSentence)}
          <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Radio Pulse</Text>
<View style={styles.toggleButtons}>
  <TouchableOpacity
    style={[styles.toggleButton, radioPulse === 'absent' ? styles.toggleButtonSelected : styles.toggleButtonUnselected]}
    onPress={() => setRadioPulse('absent')}
  >
    <Text style={[styles.toggleButtonText, radioPulse === 'absent' && styles.toggleButtonTextSelected]}>Absent</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={[styles.toggleButton, radioPulse === 'present' ? styles.toggleButtonSelected : styles.toggleButtonUnselected]}
    onPress={() => setRadioPulse('present')}
  >
    <Text style={[styles.toggleButtonText, radioPulse === 'present' && styles.toggleButtonTextSelected]}>Present</Text>
  </TouchableOpacity>
</View>

          </View>
        </View>
        <View style={styles.column}>
          {renderToggleButton('Altered Sensorium', alteredSensorium, setAlteredSensorium)}
          {renderToggleButton('Noisy Breathing', noisyBreathing, setNoisyBreathing)}
          {renderToggleButton('Active Breathing', activeBreathing, setActiveBreathing)}
          {renderToggleButton('Angioedema', angioedema, setAngioedema)}
        </View>
      </View>

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
      />

<TouchableOpacity style={styles.skipButton} onPress={handleNextPress}>
          <Text style={styles.skipButtonText}>Next</Text>
          <TouchableOpacity style={styles.closeButton}>
            <Icon name="arrow-upward" size={24} color="#1977f3" />
          </TouchableOpacity>
        </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
 
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
  },
  toggleContainer: {
    marginBottom: 20,
  },
  toggleLabel: {
    fontSize: 13,
    marginBottom: 5,
  },
  toggleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toggleButton: {
    flex: 1,
    padding: 7,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  toggleButtonUnselected: {
    backgroundColor: '#e8f1fe',
    borderRadius:24,
  },
  toggleButtonSelected: {
    backgroundColor: '#007AFF',
    borderRadius:24,

  },
  toggleButtonText: {
    color: '#000',
    fontSize: 16,
  },
  toggleButtonTextSelected: {
    color: '#ffffff',
  },
  dropdown: {
    width: '90%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  dropdownContainer: {
    width: '90%',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1977f3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 30, // Adjust as needed
  },
  skipButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 10,
  },
  closeButton: {
    width: 36,
    height: 36,
    backgroundColor: '#fff',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '90deg' }],
  },
});

export default EmergencyTriageNextScreen;
