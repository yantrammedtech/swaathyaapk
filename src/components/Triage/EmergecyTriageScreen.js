import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';



const EmergencyTriageScreen = () => {
  // State variables for each input field
  const [oxygen, setOxygen] = useState('');
  const [bpHigh, setBpHigh] = useState('');
  const [bpLow, setBpLow] = useState('');
  const [temperature, setTemperature] = useState('');
  const [pulse, setPulse] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [observationTime, setObservationTime] = useState('');

  const navigation = useNavigation();


  // Handler for form submission
  const handleNextPress = () => {
    // Create an object with the form data
    const formData = {
      oxygen,
      bpHigh,
      bpLow,
      temperature,
      pulse,
      respiratoryRate,
      observationTime
    };

    // You can then use this formData to submit to an API or perform other actions
    console.log('Form Data:', formData);
    navigation.navigate('EmergencyTriageNextScreen', { formData });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Oxygen</Text>
        <TextInput
          style={styles.input}
          value={oxygen}
          onChangeText={setOxygen}
        />
      </View>

      <View style={styles.bpContainer}>
        <View style={styles.bpInputContainer}>
          <Text style={styles.label}>Blood Pressure High [mm]</Text>
          <TextInput
            style={styles.bpInput}
            value={bpHigh}
            onChangeText={setBpHigh}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.bpInputContainer}>
          <Text style={styles.label}>Low [mm Hg]</Text>
          <TextInput
            style={styles.bpInput}
            value={bpLow}
            onChangeText={setBpLow}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.bpContainer}>
        <View style={styles.bpInputContainer}>
          <Text style={styles.label}>Temperature (°C or °F)</Text>
          <TextInput
            style={styles.bpInput}
            value={temperature}
            onChangeText={setTemperature}
          />
        </View>

        <View style={styles.bpInputContainer}>
          <Text style={styles.label}>Pulse (bpm)</Text>
          <TextInput
            style={styles.bpInput}
            value={pulse}
            onChangeText={setPulse}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Respiratory Rate (per min)</Text>
        <TextInput
          style={styles.input}
          value={respiratoryRate}
          onChangeText={setRespiratoryRate}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Time of observation</Text>
        <TextInput
          style={styles.input}
          value={observationTime}
          onChangeText={setObservationTime}
        />
      </View>

      {/* Add image if needed */}
      {/* <Image source={{ uri: 'https://example.com/your-image-url.png' }} style={styles.image} /> */}

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
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  bpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  bpInputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 13,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 5,
  },
  bpInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 5,
    width: '100%',
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 20,
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

export default EmergencyTriageScreen;
