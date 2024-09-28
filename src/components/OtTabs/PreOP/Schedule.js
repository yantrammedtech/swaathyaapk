import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Switch, Button, ScrollView, StyleSheet, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from "react-native-vector-icons/MaterialIcons";
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { authFetch } from '../../../axios/authFetch';
import { Role_NAME } from '../../../utility/role';
import { Checkbox } from 'react-native-paper';
import { color } from 'react-native-elements/dist/helpers';
import { authPost } from '../../../axios/authPost';
const addAttendeesStyles = {
  addAttendeesLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    fontWeight: 'bold',
  },
  addAttendeesInput: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    color: 'black'
  },
  addAttendeesModalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  addAttendeesModalTitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  addAttendeesItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  addAttendeesItemText: {
    fontSize: 16,
    marginLeft: 10,
  },
  addAttendeesCloseButton: {
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    marginTop: 20,
  },
  addAttendeesCloseButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
};

import { BASE_URL } from '@env';


export default function ScheduleScreen() {

  const currentPatientData = useSelector((state) => state.currentPatientData);
  const currentUserData = useSelector((state) => state.currentUserData);
  const [showDatePicker, setShowDatePicker] = React.useState(false);

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
  const [selectDate, setselectDate] = useState(null);

  const [fromtime, setFromTime] = useState(null);
  const [fromshowPicker, setfromshowPicker] = useState(false);
  const [totime, setToTime] = useState(null);
  const [toshowPicker, setToshowPicker] = useState(false);
  const [dates, setDates] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [attendeesList, setAttendeesList] = useState([]);
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const [addAttendeesModalVisible, setAddAttendeesModalVisible] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Ensure the date picker closes after selection
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
      setselectDate(dateString)
    }
  };

  const onFromTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setFromTime(selectedTime);
    }
    setfromshowPicker(false); // Close the picker after selecting the time
  };

  const onToTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setToTime(selectedTime);
    }
    setToshowPicker(false); // Close the picker after selecting the time
  };

  const showTimePicker = () => {
    setfromshowPicker(true);
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

    //fill currentPatientData 
    // console.log("currentPatientData=========schedule============",currentPatientData)
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
    const date = selectDate ? new Date(selectDate) : new Date();

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

  const validateForm = () => {

    if (!room) {
      Alert.alert("Room Number is required");
      return false
    }
    if (!fromtime) {
      Alert.alert("From Time is required");
      return false
    }
    if (!totime) {
      Alert.alert("To Time is required");
      return false
    }
    if (selectedAttendees?.length === 0) {
      Alert.alert("At least one attendee is required");
      return false
    }

    return true
  };


  const handleSubmit = async () => {
    if (validateForm()) {
      const fromTimeUpdate = fromtime.toString().split(" ")[4];
      const endTimeUpdate = totime.toString().split(" ")[4];



      // Construct startTime and endTime in the format 'YYYY-MM-DDTHH:MM'
      const startTime = `${selectDate}T${fromTimeUpdate}`;
      const endTime = `${selectDate}T${endTimeUpdate}`;


      const attendeesString = selectedAttendees
        .map((attendee) => {
          const firstName = attendee.firstName || ''; // Ensure first name is defined
          const lastName = attendee.lastName || '';   // Ensure last name is defined
          return `${firstName} ${lastName}`.trim();   // Combine and trim spaces
        })
        .join(", "); // Join names with commas



      const scheduleData = {
        startTime: startTime,
        endTime: endTime,
        roomId: room,
        attendees: attendeesString,
        baseURL: BASE_URL,
      };


      try {
        const response = await authPost(
          `schedule/${currentUserData.hospitalID}/${currentUserData.id}/${currentPatientData.patientTimeLineID}/${currentPatientData.id}/addSchedule`,
          scheduleData,
          currentUserData.token,
          
        );

        console.log("success=============================res", response);
        if (response.status === 201) {
          setModalVisible(true);
          Alert.alert("Success", "Schedule added successfully!");
        } else if (response.status === 403) {
          console.log("Already Scheduled");
          Alert.alert("Error", "This schedule has already been made.");
        } else {
          console.log("Scheduled Failed");
          Alert.alert("Error", "Scheduling failed. Please try again.");
        }
      } catch (err) {
        console.log(err);
        Alert.alert("Error", "An error occurred while scheduling.");
      }

      setModalVisible(false);
    }
  };








  // ==================before schedule get data===================
  useEffect(() => {
    const getAllAttendees = async () => {
      const doctorResponse = await authFetch(
        `user/${currentUserData.hospitalID}/list/${Role_NAME.doctor}`,
        currentUserData.token
      );

      // console.log("doctorResponse=========", doctorResponse)
      if (doctorResponse.message == "success") {
        setAttendeesList(doctorResponse.users);
      }
    };

    // const getAllEvents = async () => {
    //   try {
    //     const response = await authFetch(
    //       `schedule/${user.hospitalID}/${user.id}/viewSchedule`,
    //       user.token
    //     );
    //     if (response.status == 200) {
    //       const arr = response.data.map((eventData: any) => {
    //         const newEvent: Event = {
    //           id: eventData.pID,
    //           title:
    //             `PatientName: ${eventData.pName}\n` +
    //             `PatientId: ${eventData.pID}\n` +
    //             `Attendees: ${eventData.attendees}\n` +
    //             `Room Number: ${eventData.roomID}\n` +
    //             `Surgery Type: ${eventData.surgeryType}`,
    //           start: eventData.startTime,
    //           end: eventData.endTime,
    //           extendedProps: {
    //             patientId: eventData.pID,
    //             patientName: eventData.pName,
    //             attendees: eventData.attendees,
    //             surgeryType: eventData.surgeryType,
    //             roomNumber: eventData.roomNumber,
    //           },
    //         };
    //         return newEvent;
    //       });
    //       setEvents(arr);
    //     }
    //   } catch (error) {
    //     // console.log(error);
    //   }
    // };

    getAllAttendees();
    // getAllEvents();
  }, [currentUserData]);

  // Function to toggle selection of a single attendee
  const toggleAttendantSelection = (doctor) => {
    if (selectedAttendees.includes(doctor)) {
      setSelectedAttendees(selectedAttendees.filter((attendee) => attendee !== doctor));
    } else {
      setSelectedAttendees([...selectedAttendees, doctor]);
    }
  };

  // Function to toggle "Select All" option
  const toggleSelectAll = () => {
    if (selectedAttendees.length === attendeesList.length) {
      // Deselect all if all are selected
      setSelectedAttendees([]);
    } else {
      // Select all attendees if not already selected
      setSelectedAttendees(attendeesList);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => { setShowDatePicker(true); }}>
        <Text style={styles.headerText}>{formatDate()}</Text>
        <Icon name="calendar-today" size={25} color="#1E90FF" style={styles.icon} />
      </TouchableOpacity>



      <View style={styles.timePickerContainer}>
        {/* ===============from time==================== */}
        <View style={styles.timePicker}>
          <Text style={styles.timelabel}>From Time</Text>
          <TouchableOpacity
            style={styles.timeBox}
            onPress={() => setfromshowPicker(true)}
          >
            <Text style={styles.timeText}>{formatTime(fromtime)}</Text>
          </TouchableOpacity>

          {fromshowPicker && (
            <DateTimePicker
              value={fromtime || new Date()}
              mode="time"
              display="default"
              onChange={onFromTimeChange}
            />
          )}
        </View>

        {/* =====================to time=============== */}
        <View style={styles.timePicker}>
          <Text style={styles.timelabel}>To Time</Text>
          <TouchableOpacity
            style={styles.timeBox}
            onPress={() => setToshowPicker(true)}
          >
            <Text style={styles.timeText}>{formatTime(totime)}</Text>
          </TouchableOpacity>

          {toshowPicker && (
            <DateTimePicker
              value={totime || new Date()}
              mode="time"
              display="default"
              onChange={onToTimeChange}
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


        <View>
          <Text style={addAttendeesStyles.addAttendeesLabel}>Attendee (Doctor)</Text>

          {/* TextInput to display selected attendees */}
          <TouchableOpacity onPress={() => setAddAttendeesModalVisible(true)}>
            <TextInput
              style={addAttendeesStyles.addAttendeesInput}
              value={selectedAttendees.length > 0 ? selectedAttendees.map((doctor) => doctor.firstName).join(', ') : 'Select Doctors'}
              placeholder="Select Doctors"
              editable={false} // Disable manual input, modal opens on TouchableOpacity press
            />
          </TouchableOpacity>

          {/* Modal for multi-selection */}
          <Modal
            animationType="slide"
            transparent={false}
            visible={addAttendeesModalVisible}
            onRequestClose={() => setAddAttendeesModalVisible(false)}
          >
            <View style={addAttendeesStyles.addAttendeesModalContainer}>
              <Text style={addAttendeesStyles.addAttendeesModalTitle}>Select Doctors</Text>

              {/* "Select All" option */}
              <View style={addAttendeesStyles.addAttendeesItem}>
                <Checkbox
                  status={selectedAttendees.length === attendeesList.length ? 'checked' : 'unchecked'}
                  onPress={toggleSelectAll}
                />
                <Text style={addAttendeesStyles.addAttendeesItemText}>Select All</Text>
              </View>

              <FlatList
                data={attendeesList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={addAttendeesStyles.addAttendeesItem}>
                    <Checkbox
                      status={selectedAttendees.includes(item) ? 'checked' : 'unchecked'}
                      onPress={() => toggleAttendantSelection(item)}
                    />
                    <Text style={addAttendeesStyles.addAttendeesItemText}>{item.firstName}</Text>
                  </View>
                )}
              />

              <TouchableOpacity
                style={addAttendeesStyles.addAttendeesCloseButton}
                onPress={() => setAddAttendeesModalVisible(false)}
              >
                <Text style={addAttendeesStyles.addAttendeesCloseButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>





        {/* <Text style={styles.label}>Add Required Attendance</Text>
        <TextInput
          style={styles.input}
          value={attendant}
          onChangeText={setAttendant}
        /> */}

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
            { backgroundColor: (fromtime && totime) ? '#1E90FF' : '#A9A9A9' }, // Change color based on time selection
          ]}
          onPress={handleSubmit} disabled={!fromtime && !totime} >
          <Text style={styles.buttonText}>Confirm Schedule..</Text>
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
        {showDatePicker && (
          <DateTimePicker
            value={selectDate ? new Date(selectDate) : new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: 8,
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
  timePickerContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: "space-between",
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
  timelabel: {
    fontSize: 16,
    marginRight: 10, // Space between "Set Time" and the box
    fontWeight: '600'
  },
  alert: {
    color: '#1E90FF'
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
  inputGroup: {
    marginBottom: 15,
  },
});
