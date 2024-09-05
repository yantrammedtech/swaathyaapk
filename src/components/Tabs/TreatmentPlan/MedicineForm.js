import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';

const MedicineForm = ({ visible, onClose }) => {
    const [selectedMedicine, setSelectedMedicine] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedDays, setSelectedDays] = useState('');
    const [frequency, setFrequency] = useState(1);
    const [dosage, setDosage] = useState(1);
    const [dose, setDose] = useState(1);
    const [note, setNote] = useState('');
    const [selectedTiming, setSelectedTiming] = useState('');
    const timings = ['Before Breakfast', 'After Breakfast', 'Before Lunch', 'After Lunch', 'Before Dinner', 'After Dinner'];
    
    const handleFrequencyDecrease = () => {
        if (frequency > 1) {
            setFrequency(frequency - 1);
        }
    };

    const handleFrequencyIncrease = () => {
        if (frequency < 6) {
            setFrequency(frequency + 1);
        }
    };

    const handleDosageDecrease = () => {
        if (dosage > 1) {
            setDosage(dosage - 1);
        }
    };

    const handleDosageIncrease = () => {
        setDosage(dosage + 1);
    };

    
    
    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose}>
                            <Icon name="close" size={24} color="#fff" style={styles.closeIcon} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Tablet</Text>
                        <View style={styles.pills}>
                            {/* <Icon name="pill" type="material-community" size={40} color="#fff" /> */}
                        </View>
                    </View>

                    <View style={styles.form}>
                        {/* Select Medicine */}
                        <View style={styles.dropdownContainer}>
                            <Picker
                                selectedValue={selectedMedicine}
                                onValueChange={(itemValue) => setSelectedMedicine(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Select medicine" value="" />
                                <Picker.Item label="Paracetamol" value="paracetamol" />
                                <Picker.Item label="Ibuprofen" value="ibuprofen" />
                            </Picker>
                        </View>

                        {/* Select Medicine Type */}
                        <View style={styles.dropdownContainer}>
                            <Picker
                                selectedValue={selectedType}
                                onValueChange={(itemValue) => setSelectedType(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Select Medicine type" value="" />
                                <Picker.Item label="Tablet" value="tablet" />
                                <Picker.Item label="Capsule" value="capsule" />
                            </Picker>
                        </View>

                        {/* Select Days */}
                        <View style={styles.dropdownContainer}>
                            <Picker
                                selectedValue={selectedDays}
                                onValueChange={(itemValue) => setSelectedDays(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Select days" value="" />
                                <Picker.Item label="1 day" value="1day" />
                                <Picker.Item label="3 days" value="3days" />
                            </Picker>
                        </View>

                        {/* Meal Timing Buttons */}
                        <View style={styles.mealTimingsContainer}>
            {timings.map((time) => (
                <TouchableOpacity
                    key={time}
                    style={[
                        styles.mealButton,
                        selectedTiming === time && styles.mealButtonActive
                    ]}
                    onPress={() => setSelectedTiming(time)}
                >
                    <Text style={[
                        styles.mealButtonText,
                        selectedTiming === time && styles.mealButtonTextActive
                    ]}>
                        {time}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>

                        {/* Add Note */}
                        <TextInput
                            placeholder="Add note"
                            style={styles.noteInput}
                            value={note}
                            onChangeText={setNote}
                        />

                        {/* Frequency and Dose */}
                        <View style={styles.frequencyContainer}>
                            <View style={styles.counter}>
                                <Text style={styles.counterText}>Frequency</Text>
                                <View style={styles.counterControls}>
                                    <TouchableOpacity onPress={() => setFrequency(frequency > 1 ? frequency - 1 : 1)}>
                                        <Image
          source={require('../../../assets/treatmentplan/minus.png')}
          style={styles.image}
          resizeMode="contain"
        />
                                    </TouchableOpacity>
                                    <Text style={styles.counterNumber}>{frequency}</Text>
                                    <TouchableOpacity onPress={() => setFrequency(frequency + 1)}>
                                        <Image
          source={require('../../../assets/treatmentplan/pluse.png')}
          style={styles.image}
          resizeMode="contain"
        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <Text>No  ofDosage</Text>
                            </View>
                        </View>

                       
                    </View>
                </View>
            </View>
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
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    closeIcon: {
        marginRight: 10,
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
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
        marginBottom: 10,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#d9d9d9',
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
        backgroundColor: '#1977f3', // Active background color
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
    },
    counter: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    counterText: {
        fontSize: 16,
    
    },
    counterControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    counterNumber: {
        marginHorizontal: 10,
        fontSize: 18,
    },
    image:{
        width:30,
        height:30,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    frequencyContainer: {
        marginTop: 10,
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
    },
    image: {
        width: 30,
        height: 30,
        marginHorizontal: 10,
    },
    counterNumber: {
        fontSize: 18,
    },
});

export default MedicineForm
