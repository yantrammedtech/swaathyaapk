import React, { useState } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet, Dimensions, Button ,FlatList } from 'react-native';


import Icon from 'react-native-vector-icons/MaterialIcons'; // You can use other icon sets if needed
import { Picker } from '@react-native-picker/picker';
import SymptomItem from './SymptomItem';

const SymptomsTab = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [symptom, setSymptom] = useState('');
    const [duration, setDuration] = useState('');
    const [durationType, setDurationType] = useState('Week');

    const symptomsData = [
        {
          id: 1,
          symptomName: 'Sertoli-cell-only syndrome',
          addedBy: '442',
          updatedTime: 'Sep 4, 24, 17:55',
          duration: '7 Days',
        },
        {
          id: 2,
          symptomName: 'Abdominal pain',
          addedBy: '123',
          updatedTime: 'Sep 3, 24, 10:30',
          duration: '24 Hours',
        },
    ]
    return (
        <View style={styles.container}>
           <FlatList
        data={symptomsData}
        renderItem={({ item }) => (
          <SymptomItem
            symptomName={item.symptomName}
            addedBy={item.addedBy}
            updatedTime={item.updatedTime}
            duration={item.duration}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                
                <Icon name="add" size={20} color="#fff" />
                <Text style={styles.buttonText}>Add Symptoms</Text>
            </TouchableOpacity>

            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Symptoms</Text>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Symptom*"
                value={symptom}
                onChangeText={setSymptom}
              />
              <TextInput
                style={styles.input}
                placeholder="Duration*"
                value={duration}
                onChangeText={setDuration}
              />
            </View>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={durationType}
                style={styles.picker}
                onValueChange={(itemValue) => setDurationType(itemValue)}
              >
                <Picker.Item label="Duration Type" value="" />
                <Picker.Item label="Week" value="Week" />
                <Picker.Item label="Days" value="Days" />
                <Picker.Item label="Month" value="Month" />
                <Picker.Item label="Year" value="Year" />
                <Picker.Item label="Hour" value="Hour" />
              </Picker>
            </View>

            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} color="#999" />
              <Button title="Add" onPress={() => { /* Handle Add logic */ }} color="#007bff" />
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
        padding: 16,
        // backgroundColor:"red",
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"center",
        backgroundColor: '#1977f3',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#fff',
        marginLeft: 10,
        fontSize: 16,
    },
    
   
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      inputContainer: {
        width: '100%',
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: '48%',
      },
      durationTypeText: {
        color: '#007bff',
        marginBottom: 5,
      },
      durationTypeValue: {
        color: '#000',
        fontSize: 16,
        marginBottom: 20,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      pickerContainer: {  // New style to wrap the Picker
        width: '48%',
        height: 50,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        justifyContent: 'center',
      },
      picker: {
        width: '100%',
        height: '100%',
      },
});

export default SymptomsTab;
