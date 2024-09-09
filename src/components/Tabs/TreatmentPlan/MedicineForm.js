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
    const [selectedTimings, setSelectedTimings] = useState([]);

    const handleInputChange = (text) => {
        // Ensure that the input is numeric and does not exceed a reasonable number of days
        const numericValue = text.replace(/[^0-9]/g, ''); // This ensures only numbers
        setSelectedDays(numericValue);
    };

    const handleTimingSelection = (time) => {
        if (selectedTimings.includes(time)) {
            // Remove timing if already selected (deselect)
            setSelectedTimings(selectedTimings.filter(t => t !== time));
        } else {
            // If less than frequency, add the timing
            if (selectedTimings.length < frequency) {
                setSelectedTimings([...selectedTimings, time]);
            }
        }
    };

    const medicineTypeImages = {
        tablet: require('../../../assets/treatmentplan/tablet.png'),
        capsule: require('../../../assets/treatmentplan/image 50.png'),
        syrup: require('../../../assets/treatmentplan/image 53.png'),
        injection: require('../../../assets/treatmentplan/image 51.png'),
        iv_line: require('../../../assets/treatmentplan/image 52.png'),
        drops: require('../../../assets/treatmentplan/image 54.png'),
        spray: require('../../../assets/treatmentplan/image 55.png'),
        tubing: require('../../../assets/treatmentplan/image 56.png'),
    };
    
    
   
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

    const onPress =() => {
        onClose()
    }
  
    
    
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
    {/* Close Icon at the top-left */}
    <TouchableOpacity onPress={onClose} style={styles.closeIconContainer}>
        <Icon name="close" size={24} color="#fff" style={styles.closeIcon} />
    </TouchableOpacity>

    {/* Medicine image and text in the center */}
    <View style={styles.centerContent}>
        {selectedType !== '' && (
            <Image
                source={medicineTypeImages[selectedType]}
                style={styles.medicineImage}
                resizeMode="contain"
            />
        )}
        <Text style={styles.headerText}>{selectedType}</Text>
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
        <Picker.Item label="Syrup" value="syrup" />
        <Picker.Item label="Injection" value="injection" />
        <Picker.Item label="IV Line" value="iv_line" />
        <Picker.Item label="Drops" value="drops" />
        <Picker.Item label="Spray" value="spray" />
        <Picker.Item label="Tubing" value="tubing" />
    </Picker>
</View>

                        {/* Select Days */}
                        <View style={styles.inputContainer}>
            <TextInput
                value={selectedDays}
                onChangeText={handleInputChange}
                keyboardType="numeric"
                placeholder="Enter number of days"
                style={styles.textInput}
                maxLength={3} // Set a limit to how many digits can be entered
            />
        </View>

                        {/* Meal Timing Buttons */}
                        <View style={styles.mealTimingsContainer}>
    {timings.map((time) => (
        <TouchableOpacity
            key={time}
            style={[
                styles.mealButton,
                selectedTimings.includes(time) && styles.mealButtonActive,
                selectedTimings.length >= frequency && !selectedTimings.includes(time) && styles.disabledButton // Disable unselected buttons if limit reached
            ]}
            onPress={() => handleTimingSelection(time)}
            disabled={selectedTimings.length >= frequency && !selectedTimings.includes(time)} // Disable button if frequency reached
        >
            <Text style={[
                styles.mealButtonText,
                selectedTimings.includes(time) && styles.mealButtonTextActive
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
                                <TouchableOpacity onPress={handleFrequencyDecrease}>
                            <Image
                                source={require('../../../assets/treatmentplan/minus.png')}
                                style={styles.image}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                                    <Text style={styles.counterNumber}>{frequency}</Text>
                                    <TouchableOpacity onPress={handleFrequencyIncrease}>
                            <Image
                                source={require('../../../assets/treatmentplan/pluse.png')}
                                style={styles.image}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.counter}>
                                <Text style={styles.counterText}>No of Dosage</Text>
                                <View style={styles.counterControls}>
                                <TouchableOpacity onPress={handleDosageDecrease}>
                            <Image
                                source={require('../../../assets/treatmentplan/minus.png')}
                                style={styles.image}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                                    <Text style={styles.counterNumber}>{dosage}</Text>
                                    <TouchableOpacity onPress={handleDosageIncrease}>
                            <Image
                                source={require('../../../assets/treatmentplan/pluse.png')}
                                style={styles.image}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                       
                        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
                      

                       
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
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    closeIconContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    centerContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
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
    button: {
        backgroundColor: '#007bff',  // Blue background
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 20,
        width: '40%',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
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
        justifyContent:"space-between",
        width:"100%"
    },
    counter: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    counterText: {
        fontSize: 16,
        margin:10,
    },
    counterControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:"red",
    },
    counterNumber: {
        marginHorizontal: 10,
        fontSize: 18,
    },
   
    container: {
        // flex: 3,
        padding: 20,
        backgroundColor: '#fff',
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
        backgroundColor: "#fff",
        borderRadius: 16,
        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        // Android Shadow
        elevation: 5,
    },
    
    image: {
        width: 20,
        height: 30,
        marginHorizontal: 10,
    },
    counterNumber: {
        fontSize: 18,
    },
    inputContainer: {
        width: '100%',
        marginTop: 20,
        alignSelf: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        textAlign: 'center',
    },
    medicineImage: {
        width: 100,
        height: 70,
        marginTop: 10,
    },
    
});

export default MedicineForm
