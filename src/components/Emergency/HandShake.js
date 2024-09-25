import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal, Button ,TextInput} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'; 
import { useSelector } from 'react-redux';
import { Role_NAME } from '../../utility/role';
import { authFetch } from '../../axios/authFetch';
import Toast from 'react-native-toast-message';
import { authPost } from '../../axios/authPost';


const HandshakeModal = () => {
  const user = useSelector((state) => state.currentUserData);
  const currentPatient = useSelector((state) => state.currentPatientData);
  const patientTimeLineID = currentPatient?.patientTimeLineID;

  const [visible, setVisible] = useState(true); // Initially false so modal is hidden
  const [selectedDoctor1, setSelectedDoctor1] = useState('Ravindra');
  const [selectedDoctor2, setSelectedDoctor2] = useState('Amar');
  const [doctorList, setDoctorList] = React.useState([]);
  const [reason, setReason] = useState("");
  const [doctorToID, setDoctorToID] = React.useState();

  const openModal = () => setVisible(true);
  const navigation = useNavigation(); // Initialize navigation


  
const reasons = [
  "Patient Request",
  "Patient Preference",
  "Retirement",
  "Relocation",
  "Termination",
  "Vacation",
  "Sick Leave",
  "Maternity/Paternity Leave",
  "Sabbatical",
  "Continuing Medical Education (CME)",
  "Conference or Seminar",
  "Personal Reasons",
  "Medical Leave",
  "Bereavement Leave",
  "Off-Duty"
];


  const getAllList = async () => {
    const doctorResponse = await authFetch(
      `user/${user.hospitalID}/list/${Role_NAME.doctor}`,
      user.token
    );
   
    if (doctorResponse.message == "success") {
      setDoctorList(doctorResponse.users.filter((each)=> each.id !== user.id));
    }
    
  };
  React.useEffect(() => {
    
      getAllList();
  }, [user]);

  const closeModal = () => {
    setVisible(false);
    navigation.goBack(); // Navigate back to the previous page
  };

  const handleSubmit = async() => {

      const response = await authPost(
        `doctor/${user.hospitalID}/${currentPatient.patientTimeLineID}/transfer`,
        {
          handshakingTo: doctorToID,
          handshakingfrom: user.id,
          handshakingBy: user.id,
          reason: reason,
        },
        user.token
      );
      if (response.message == "success") {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Patient successfully handshaked.',
          visibilityTime: 3000,
          autoHide: true,
          bottomOffset: 40,
        });
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: response.message,
          visibilityTime: 3000,
          autoHide: true,
          bottomOffset: 40,
        });
      }
    setVisible(false);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={visible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Handshake Patient</Text>

            <TextInput
        style={styles.input}
        placeholder="Enter surgeryType"
        editable={false}  // Disable input (equivalent to disabled in Material-UI)
        value={user.firstName}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={doctorToID}
          onValueChange={(itemValue) => setDoctorToID(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Doctor" value="" />
          {doctorList.map((doc) => (
            <Picker.Item
              key={doc.id}
              label={`${doc.firstName ? doc.firstName : ''} ${doc.lastName ? doc.lastName : ''}`}
              value={doc.id}
            />
          ))}
        </Picker>
      </View>

      {/* Reason Picker */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={reason}
          onValueChange={(itemValue) => setReason(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Reason" value="" />
          {reasons.map((each, index) => (
            <Picker.Item key={index} label={each} value={each} />
          ))}
        </Picker>
      </View>

           
            {/* Buttons */}
            <View style={styles.buttonRow}>
              <Button title="Cancel" onPress={closeModal} />
              <Button title="Submit" onPress={handleSubmit} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background

  },
  modalView: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pickerContainer: {
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    width:"100%"
  },
});

export default HandshakeModal;
