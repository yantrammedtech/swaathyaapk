import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState  } from "react";
import {
  View,
  Text,
  StyleSheet,
    Modal
} from "react-native";
import Footer from "./Footer";
import { Calendar  } from 'react-native-calendars';
import { useSelector } from "react-redux";
import { authFetch } from "../../axios/authFetch";

const CalendarComponent = () => {

  const user = useSelector((state) => state.currentUserData);
  const currentPatient = useSelector((state) => state.currentPatientData);
  const patientTimeLineID = currentPatient?.patientTimeLineID;
  const [selectedDate, setSelectedDate] = useState('');
  const navigation = useNavigation();


  const [events, setEvents] = useState([]);

  const getAllEvents = async () => {
    try {
      const response = await authFetch(
        `schedule/${user.hospitalID}/${user.id}/viewSchedule`,
        user.token
      );
      if (response.status == 200) {
        const arr = response.data.map((eventData) => {
          const newEvent = {
            id: eventData.pID,
            title:
              `PatientName: ${eventData.pName}\n` +
              `PatientId: ${eventData.pID}\n` +
              `Attendees: ${eventData.attendees}\n` +
              `Room Number: ${eventData.roomID}\n` +
              `Surgery Type: ${eventData.surgeryType}`,
            start: eventData.startTime,
            end: eventData.endTime,
            extendedProps: {
              patientId: eventData.pID,
              patientName: eventData.pName,
              attendees: eventData.attendees,
              surgeryType: eventData.surgeryType,
              roomNumber: eventData.roomNumber,
            },
          };
          return newEvent;
        });
        setEvents(arr);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getAllEvents()
  },[user])

 


  const [modalVisible, setModalVisible] = useState(false);
  const [eventDetails, setEventDetails] = useState('');

  const markedDates = events.reduce((acc, event) => {
    const eventDate = event.start.split('T')[0]; // Get the date part
    acc[eventDate] = {
      selected: true,
      marked: true,
      dotColor: 'orange',
      color: 'orange', // Sets the background color
    };
    return acc;
  }, {})

  const handleDayPress = (day) => {
    const date = day.dateString;
    setSelectedDate(date);

    // Check if there are events for the selected date
    const eventsForDay = events.filter(event => {
      const eventDate = event.start.split('T')[0];
    
      return eventDate === date;
    });

    if (eventsForDay.length > 0) {
      setEventDetails(eventsForDay.map(event => event.title).join('\n\n'));
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  return (
    
    <View style={styles.container}>
      <Text style={styles.header}>Select a Date</Text>
     
      <View style={styles.circlecontainer}>
  <View style={styles.circle} />
  <Text style={styles.labelText}>Locked for Surgery</Text>
</View>

  <Calendar
        markingType={'multi-dot'}
        markedDates={markedDates}
        onDayPress={handleDayPress}
        theme={{
          selectedDayBackgroundColor: '#2196F3',
          todayTextColor: '#2196F3',
          arrowColor: '#2196F3',
        }}
      />

    
    

      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={closeModal}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalView}>
      <Text style={styles.modalText}>Events on {selectedDate}:</Text>
      <Text style={styles.eventText}>
        {eventDetails.split('\n').map((line, index) => {
          const [label, value] = line.split(': '); // Split label and value
          return (
            <Text key={index}>
              <Text style={styles.boldText}>{label}: </Text>
              {value}
              {'\n'}
            </Text>
          );
        })}
      </Text>
      <Text style={styles.closeButton} onPress={closeModal}>Close</Text>
    </View>
  </View>
</Modal>

{/* <Footer activeRoute="Calendar" navigation={navigation} /> */}

    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  dateText: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center'
  },
  eventContainer: {
    backgroundColor: '#2196F3',
    color: '#ffffff',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
    width: '100%',
},
eventText: {
    color: '#ffffff',
    whiteSpace: 'pre-wrap', // This will ensure the text wraps properly

},
dayContainer: {
    alignItems: 'center',
    padding: 5,
},
dayText: {
    fontSize: 16,
    fontWeight: 'bold',
},

modalText: {
  marginBottom: 15,
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 'bold',
},
eventText: {
  marginBottom: 15,
  textAlign: 'center',
  fontSize: 14,
  lineHeight: 22, // Adjust line spacing for better readability
  textAlign: 'left', // Align text to the left
  paddingHorizontal: 10,
  paddingVertical: 8, 
},
closeButton: {
  color: '#2196F3',
  fontWeight: 'bold',
},

circlecontainer: {
  flexDirection: 'row',
  alignItems: 'center', // Align items vertically center
},
circle: {
  width: 12, // Circle width
  height: 12, // Circle height
  borderRadius: 6, // Half of width/height for a circle
  backgroundColor: '#2196F3', // Circle color
  marginRight: 5, // Space between circle and text
},
labelText: {
  fontSize: 16, // Adjust the font size as needed
  color: '#000', // Text color
  fontWeight:'bold',
},
boldText: {
  fontWeight: 'bold',
  color: '#000',
},

modalContent: {
  width: '80%', // Adjust width as necessary
  backgroundColor: 'white', // Modal background color
  borderRadius: 20, // Rounded corners
  padding: 20, // Padding inside the modal
  elevation: 5, // Android shadow
  shadowColor: '#000', // iOS shadow color
  shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
  shadowOpacity: 0.25, // iOS shadow opacity
  shadowRadius: 4, // iOS shadow radius
},
modalView: {
  margin: 0, // No margin to take full width
  backgroundColor: 'white',
  borderTopLeftRadius: 20, // Rounded top corners
  borderTopRightRadius: 20,
  padding: 35,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: -2, // Change to negative to enhance shadow at the bottom
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
modalContainer: {
  flex: 1,
  justifyContent: 'flex-end', 
  backgroundColor: 'rgba(0, 0, 0, 0.5)', 
},

});

export default CalendarComponent;


