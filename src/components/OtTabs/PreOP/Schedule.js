import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Switch, Button, ScrollView, StyleSheet, TouchableOpacity,FlatList ,Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from "react-native-vector-icons/MaterialIcons";
import dayjs from 'dayjs';

export default function ScheduleScreen() {
  const [patientName, setPatientName] = useState('Joe');
  const [patientID, setPatientID] = useState('01678');
  const [gender, setGender] = useState('Female');
  const [age, setAge] = useState(24);
  const [room, setRoom] = useState('02');
  const [surgeryType, setSurgeryType] = useState('Neuro surgery');
  const [bloodRequirement, setBloodRequirement] = useState(true);
  const [attendant, setAttendant] = useState('Dr. Rajkumar');
  const [allDay, setAllDay] = useState(true);
  const [alert, setAlert] = useState(true);
  const [time, setTime] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [dates, setDates] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const onTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setTime(selectedTime);
    }
    setShowPicker(false); // Close the picker after selecting the time
  };

  const showTimePicker = () => {
    setShowPicker(true);
  };

// Function to generate dates from the selected date
const generateDates = (startIndex) => {
    const today = new Date();
    const daysArray = [];

    for (let i = startIndex; i < startIndex + 8; i++) {  // Display next 8 days starting from selected day
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayOfWeek = dayjs(date).format('ddd'); // Get day of the week, e.g., "Thu"
      const day = dayjs(date).format('DD'); // Get day, e.g., "26"
      daysArray.push({ dayOfWeek, day });
    }

    setDates(daysArray);
  };

  // Initially generate dates starting from today
  useEffect(() => {
    generateDates(0);  // Start from today
  }, []);

  const onDateSelect = (index) => {
    setSelectedDateIndex(index);  // Set the selected date index
    generateDates(index);  // Generate the next 8 days starting from selected index
  };

  const renderDateItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.dateItem,
        selectedDateIndex === index && styles.selectedDateItem, // Apply blue background if selected
      ]}
      onPress={() => onDateSelect(index)}  // Select the date
    >
      <Text style={[styles.dateText, selectedDateIndex === index && styles.selectedDateText]}>
        {item.day}
      </Text>
      <Text style={[styles.dayText, selectedDateIndex === index && styles.selectedDateText]}>
        {item.dayOfWeek}
      </Text>
    </TouchableOpacity>
  );
  
 // Function to format the date
const formatDate = () => {
    const date = new Date();
    
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
  
    // Extract day to add ordinal suffix (st, nd, rd, th)
    const day = date.getDate();
    let suffix = 'th';
    
    if (day === 1 || day === 21 || day === 31) {
      suffix = 'st';
    } else if (day === 2 || day === 22) {
      suffix = 'nd';
    } else if (day === 3 || day === 23) {
      suffix = 'rd';
    }
  
    return formattedDate.replace(/\d+/, `${day}${suffix}`);
  };

  const formatTime = (date) => {
    return date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select Time';
  };

  const formatDate2 = (date) => {
    // Get weekday, day, and month
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    const formattedDateParts = date.toLocaleDateString('en-US', options).split(' ');
  
    // Get the day and its suffix
    const day = date.getDate();
    const suffix = (day) => {
      if (day > 3 && day < 21) return 'th'; // Catch all 11-13 exceptions
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
  
    // Build final formatted string
    return `${formattedDateParts[0]}, ${day}${suffix(day)} ${formattedDateParts[1]}`;
  };
  

  const onPressConfirm = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 2000); // Close modal after 2 seconds
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{formatDate()}</Text>
      </View>

      <View style={styles.calendar}>
        <FlatList
          horizontal
          data={dates}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderDateItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.timePickerContainer}>
      <Text style={styles.labell}>Schedule</Text>
        <View style={styles.timePicker}>
          <Text style={styles.timelabel}>Set Time</Text>
          <TouchableOpacity
          style={styles.timeBox}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.timeText}>{formatTime(time)}</Text>
        </TouchableOpacity>

         {showPicker && (
          <DateTimePicker
          value={time || new Date()}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}
        </View>
      </View>

      <View style={styles.scheduleSection}>
        <Text style={styles.label}>Patient Name</Text>
        <TextInput
          style={styles.input}
          value={patientName}
          onChangeText={setPatientName}
        />

        <Text style={styles.label}>Patient ID</Text>
        <TextInput
          style={styles.input}
          value={patientID}
          onChangeText={setPatientID}
        />

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={styles.input}
              value={gender}
              onChangeText={setGender}
            />
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              value={age.toString()}
              keyboardType="numeric"
              onChangeText={(value) => setAge(parseInt(value))}
            />
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Room</Text>
            <TextInput
              style={styles.input}
              value={room}
              onChangeText={setRoom}
            />
          </View>
        </View>

        <Text style={styles.label}>Surgery Type</Text>
        <TextInput
          style={styles.input}
          value={surgeryType}
          onChangeText={setSurgeryType}
        />

        <Text style={styles.label}>Blood Requirement</Text>
        <Picker
          selectedValue={bloodRequirement}
          style={styles.input}
          onValueChange={(itemValue) => setBloodRequirement(itemValue)}
        >
          <Picker.Item label="Yes" value={true} />
          <Picker.Item label="No" value={false} />
        </Picker>

        <Text style={styles.label}>Add Required Attendance</Text>
        <TextInput
          style={styles.input}
          value={attendant}
          onChangeText={setAttendant}
        />

        <View style={styles.switchRow}>
         <View>
         <Text style={styles.label}>All Day</Text>
         <Text style={styles.alert}>{formatDate2(new Date())}</Text>
         </View>
          <Switch
            value={allDay}
            onValueChange={setAllDay}
          />
        </View>

        <View style={styles.switchRow}>
            <View>
            <Text style={styles.label}>Alert</Text>
            <Text style={styles.alert}>1 day before</Text>
            </View>
         
          <Switch
            value={alert}
            onValueChange={setAlert}
          />
        </View>

       

        <TouchableOpacity
         style={[
            styles.button,
            { backgroundColor: time ? '#1E90FF' : '#A9A9A9' }, // Change color based on time selection
          ]}
        onPress={onPressConfirm}  disabled={!time} >
          <Text style={styles.buttonText}>Confirm Schedule</Text>
        </TouchableOpacity>

        {/* <Text style={styles.errorText}>Please confirm time</Text> */}



        <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Icon name="calendar-today" size={50} color="#1E90FF" style={styles.icon} />
           
            <Text style={styles.modalText}>Your schedule confirmed!</Text>
          </View>
        </View>
      </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  headerText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendar: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  scheduleSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginRight: 8,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timePicker: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  calendar: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dateItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
  },
  selectedDateItem: {
    backgroundColor: '#1E90FF', // Highlight selected date
    borderRadius: 8,
    
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // Default text color for unselected
  },
  dayText: {
    fontSize: 14,
    color: '#666', // Default text color for unselected
  },
  selectedDateText: {
    color: 'white', // White text for selected date
    fontWeight: 'bold', // Bold text
  },
  timePickerContainer:{
    padding: 10,
    flexDirection: 'row',
    justifyContent:"space-between",
    alignItems: 'center',
  },
  labell: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10, // Space between "Schedule" and "Set Time"
  },
  timeBox: {
    width: 80,
    height: 30,
    borderColor: '#ccc', 
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  timeText: {
    fontSize: 16,
    color: '#1E90FF', // Blue text color
  },
  timelabel:{
        fontSize: 16,
        marginRight: 10, // Space between "Set Time" and the box
        fontWeight:'600'
  },
  alert:{
    color:'#1E90FF'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
