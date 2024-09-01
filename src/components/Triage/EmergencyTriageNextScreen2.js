import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const NextScreen = () => {
  const [gcsScore, setGcsScore] = useState(11);
  const [eyeMovementChecked, setEyeMovementChecked] = useState(false);
  const [motorResponseChecked, setMotorResponseChecked] = useState(false);
  const [verbalResponseChecked, setVerbalResponseChecked] = useState(false);
  const [painScale, setPainScale] = useState('');
  const [selectedEyeMovement, setSelectedEyeMovement] = useState(null);
  const [selectedMotorResponse, setSelectedMotorResponse] = useState(null);
  const [selectedVerbalResponse, setSelectedVerbalResponse] = useState(null);

  const responseOptions = {
    eye: ["Spontaneous", "To Sound", "To Pressures", "None"],
    motor: ["Obey Commands", "Localising", "Extension", "Abnormal Flexions", "Normal Flexion", "None"],
    verbal: ["Oriented", "Confused", "Words", "Sounds", "None"],
  };

  const navigation = useNavigation();

  const handleNextPress = () => {
    // Create an object with the form data
    const formData = {
      gcsScore,
      eyeMovement: selectedEyeMovement,
      motorResponse: selectedMotorResponse,
      verbalResponse: selectedVerbalResponse,
      painScale,
    };

    console.log('Form Data:', formData);

    // Navigate to the next screen, passing the formData as a parameter
    navigation.navigate('Trauma', { formData });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>GCS score: {gcsScore}</Text>
      </View>

      {/* Eye Movement Section */}
      <View style={styles.section}>
        <CheckBox
          title="Eye movement *"
          checked={eyeMovementChecked}
          onPress={() => setEyeMovementChecked(!eyeMovementChecked)}
          containerStyle={styles.checkBoxRow}
        />
        {eyeMovementChecked && (
          <View style={styles.optionsContainer}>
            {responseOptions.eye.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedEyeMovement === option && styles.selectedOption,
                ]}
                onPress={() => setSelectedEyeMovement(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Motor Response Section */}
      <View style={styles.section}>
        <CheckBox
          title="Motor Response *"
          checked={motorResponseChecked}
          onPress={() => setMotorResponseChecked(!motorResponseChecked)}
          containerStyle={styles.checkBoxRow}
        />
        {motorResponseChecked && (
          <View style={styles.optionsContainer}>
            {responseOptions.motor.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedMotorResponse === option && styles.selectedOption,
                ]}
                onPress={() => setSelectedMotorResponse(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Verbal Response Section */}
      <View style={styles.section}>
        <CheckBox
          title="Verbal response *"
          checked={verbalResponseChecked}
          onPress={() => setVerbalResponseChecked(!verbalResponseChecked)}
          containerStyle={styles.checkBoxRow}
        />
        {verbalResponseChecked && (
          <View style={styles.optionsContainer}>
            {responseOptions.verbal.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedVerbalResponse === option && styles.selectedOption,
                ]}
                onPress={() => setSelectedVerbalResponse(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Pain Scale Input */}
      <TextInput
        style={styles.input}
        placeholder="Pain scale"
        value={painScale}
        onChangeText={setPainScale}
        keyboardType="numeric"
      />

      {/* Next Button */}
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
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  scoreContainer: {
    backgroundColor: '#d4edda',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  scoreText: {
    color: '#155724',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  checkBoxRow: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    color: '#000',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#ffffff',
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

export default NextScreen;
