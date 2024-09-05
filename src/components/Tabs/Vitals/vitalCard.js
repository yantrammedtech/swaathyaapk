import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';

const VitalCard =({ visible, onClose, onSave }) => {
    const [vitals, setVitals] = useState({
        oxygen: '',
        bpH: '',
        bpL: '',
        temperature: '',
        pulse: '',
        respiratoryRate: '',
        time: '',
        errors: {},
      });
    
      const handleChange = (field, value) => {
        setVitals(prev => ({
          ...prev,
          [field]: value,
        }));
      };
    
      const handleSavePress = () => {
        // Validation logic can be added here
        onSave(vitals);
        onClose();
      };

      return (
        <Modal
          visible={visible}
          transparent={true}
          animationType="slide"
          onRequestClose={onClose}
        >
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.container}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Oxygen</Text>
                <TextInput
                  style={[styles.input, vitals.errors.oxygen ? styles.inputError : null]}
                  value={vitals.oxygen}
                  onChangeText={(value) => handleChange('oxygen', value)}
                  keyboardType="numeric"
                />
                {vitals.errors.oxygen && (
                  <Text style={styles.errorText}>{vitals.errors.oxygen}</Text>
                )}
              </View>
    
              <View style={styles.bpContainer}>
                <View style={styles.bpInputContainer}>
                  <Text style={styles.label}>Blood Pressure High [mm]</Text>
                  <TextInput
                    style={[styles.bpInput, vitals.errors.bpH ? styles.inputError : null]}
                    value={vitals.bpH}
                    onChangeText={(value) => handleChange('bpH', value)}
                    keyboardType="numeric"
                  />
                  {vitals.errors.bpH && (
                    <Text style={styles.errorText}>{vitals.errors.bpH}</Text>
                  )}
                </View>
                <View style={styles.bpInputContainer}>
                  <Text style={styles.label}>Low [mm Hg]</Text>
                  <TextInput
                    style={[styles.bpInput, vitals.errors.bpL ? styles.inputError : null]}
                    value={vitals.bpL}
                    onChangeText={(value) => handleChange('bpL', value)}
                    keyboardType="numeric"
                  />
                  {vitals.errors.bpL && (
                    <Text style={styles.errorText}>{vitals.errors.bpL}</Text>
                  )}
                </View>
              </View>
    
              <View style={styles.bpContainer}>
                <View style={styles.bpInputContainer}>
                  <Text style={styles.label}>Temperature (°C or °F)</Text>
                  <TextInput
                    style={[styles.bpInput, vitals.errors.temperature ? styles.inputError : null]}
                    value={vitals.temperature}
                    onChangeText={(value) => handleChange('temperature', value)}
                  />
                  {vitals.errors.temperature && (
                    <Text style={styles.errorText}>{vitals.errors.temperature}</Text>
                  )}
                </View>
                <View style={styles.bpInputContainer}>
                  <Text style={styles.label}>Pulse (bpm)</Text>
                  <TextInput
                    style={[styles.bpInput, vitals.errors.pulse ? styles.inputError : null]}
                    value={vitals.pulse}
                    onChangeText={(value) => handleChange('pulse', value)}
                  />
                  {vitals.errors.pulse && (
                    <Text style={styles.errorText}>{vitals.errors.pulse}</Text>
                  )}
                </View>
              </View>
    
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Respiratory Rate (per min)</Text>
                <TextInput
                  style={[styles.input, vitals.errors.respiratoryRate ? styles.inputError : null]}
                  value={vitals.respiratoryRate}
                  onChangeText={(value) => handleChange('respiratoryRate', value)}
                />
                {vitals.errors.respiratoryRate && (
                  <Text style={styles.errorText}>{vitals.errors.respiratoryRate}</Text>
                )}
              </View>
    
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Time of observation</Text>
                <TextInput
                  style={[styles.input, vitals.errors.time ? styles.inputError : null]}
                  value={vitals.time}
                  onChangeText={(value) => handleChange('time', value)}
                />
                {vitals.errors.time && (
                  <Text style={styles.errorText}>{vitals.errors.time}</Text>
                )}
              </View>
    
              <View style={styles.footer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
            </ScrollView>
          </View>
        </Modal>
      );
    };

    const styles = StyleSheet.create({
       
        modalContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        container: {
          padding: 20,
          backgroundColor: '#fff',
          borderRadius: 10,
          width: '90%',
          maxHeight: '80%',
        },
        inputContainer: {
          marginBottom: 15,
        },
        label: {
          fontSize: 14,
          fontWeight: 'bold',
          marginBottom: 5,
        },
        input: {
          height: 40,
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 10,
        },
        inputError: {
          borderColor: 'red',
        },
        errorText: {
          color: 'red',
          fontSize: 12,
          marginTop: 5,
        },
        bpContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 15,
        },
        bpInputContainer: {
          width: '48%',
        },
        bpInput: {
          height: 40,
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 10,
        },
        skipButton: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#007bff',
          padding: 10,
          borderRadius: 5,
        },
        skipButtonText: {
          color: '#fff',
          fontSize: 16,
          marginRight: 10,
        },
      
        circleText: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#fff',
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          },
          closeButton: {
            backgroundColor: '#d9534f',
            padding: 10,
            borderRadius: 5,
          },
          saveButton: {
            backgroundColor: '#5bc0de',
            padding: 10,
            borderRadius: 5,
          },
          buttonText: {
            color: '#fff',
            fontSize: 16,
          },
      });
      
export  default VitalCard