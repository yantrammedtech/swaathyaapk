import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView ,TextInput, Modal} from 'react-native';
import { useSelector } from 'react-redux';
import { authFetch } from '../../../axios/authFetch';
import Toast from 'react-native-toast-message';

// import { Dropdown } from 'react-native-paper-dropdown';
import { Picker } from '@react-native-picker/picker';

import { Button } from 'react-native-paper';
import { Role_NAME } from '../../../utility/role';
import { authPost } from '../../../axios/authPost';

const TreatingDoctor = () => {
    const user = useSelector((state) => state.currentUserData);
    const currentPatient = useSelector((state) => state.currentPatientData);
    const patientTimeLineID = currentPatient?.patientTimeLineID;

  const [selectedList, setSelectedList] = React.useState([]);
  const [doctor, setDoctor] = useState('');
  const [category, setCategory] = useState('');
  const [reason, setReason] = useState('');
  const [doctorModel, setDoctorModel] = useState(false);
  const [doctorList, setDoctorList] = React.useState([]);
  const [doctorID, setDoctorID] = React.useState(null);





  const categories = [
    { label: 'Primary', value: 'primary' },
    { label: 'Secondary', value: 'secondary' },
  ];

  


  const getAllDoctors = useCallback(async () => {
    const patientDoctorResponse = await authFetch(
      `doctor/${user.hospitalID}/${patientTimeLineID}/all`,
      user.token
    );
    if (patientDoctorResponse.message == 'success') {
      setSelectedList(patientDoctorResponse.data);
    }
  }, [patientTimeLineID, user.hospitalID, user.token]);

  React.useEffect(() => {
    if (user.token && patientTimeLineID ) {
      getAllDoctors();
    }
  }, [user, patientTimeLineID, getAllDoctors]);

  
function compareDates(a, b) {
    return (
      new Date(b.addedOn || "").valueOf() - new Date(a.addedOn || "").valueOf()
    );
  }

 

  const onClose = () => {
    setDoctorModel(false)
    setDoctorID('');
    setCategory('');
    setReason('');
  }

  const getAllList = async () => {
    const doctorResponse = await authFetch(
      `user/${user.hospitalID}/list/${Role_NAME.doctor}`,
      user.token
    );
    if (doctorResponse.message == "success") {
      setDoctorList(doctorResponse.users);
    }
  };
  React.useEffect(() => {
  
      getAllList();
    
  }, [user, patientTimeLineID]);

  const handleSave = async () => {
    const body = {
      patientTimeLineId: patientTimeLineID,
      doctorId: doctorID,
      category: category,
      purpose:reason,
      scope: "doctor",
    };
    const response = await authPost(
      `doctor/${user.hospitalID}`,
      body,
      user.token
    );
    console.log("response==================",response)
    if (response.message == "success") {
      setSelectedList((prevList) => {
        return [...prevList, ...response.doctor];
      });
      setDoctorID('');
      setCategory('');
      setReason('');
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Doctor added successfully.',
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 40,
      });
    }else{
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
    onClose();
   
  };



  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
    
      {/* Doctor Card */}
      {selectedList.sort(compareDates).map((each) => (
        <>
         <View style={styles.doctorCard}>
        <View style={styles.doctorInfo}>
         
          <View style={styles.doctorDetails}>
            <Text style={styles.specialty}>{each.department}</Text>
            <Text style={styles.doctorName}>{each.firstName}</Text>
          </View>
        </View>

        <View style={styles.doctorMeta}>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>Category: {each.category}</Text>
          </View>
         {each?.purpose && (
             <View style={styles.metaRow}>
             <Text style={styles.metaText}>Reason: {each?.purpose}</Text>
           </View>
         )}
          <View style={styles.metaRow}>
            <Text style={styles.metaText}> {new Date(each.assignedDate || "").toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: false,
                      month: "short",
                      year: "2-digit",
                      day: "numeric",
                    })}</Text>
          </View>
        </View>

        {/* Active Status */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}> {each.active ? "Active" : "Inactive"}</Text>
          {/* <Ionicons name="md-checkmark-circle" size={20} color="green" /> */}
        </View>
      </View>

        </>
      ))}
     

      
      <TouchableOpacity style={styles.addButton} onPress={()=> setDoctorModel(true)}>
        <Text style={styles.addButtonText}>+ Add Doctor</Text>
      </TouchableOpacity>

      <Modal
      animationType="slide"
      transparent={true}
      visible={doctorModel}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Add Doctor</Text>
          <View style={styles.pickerContainer}>
          <Picker
            selectedValue={doctorID}
            onValueChange={(itemValue) => setDoctorID(Number(itemValue))}  
            style={styles.picker}
          >
            {doctorList.map((doc, index) => {
      return (
        <Picker.Item
          key={index}
          label={
            (doc.firstName ? doc.firstName : "") +
            (doc.lastName ? " " + doc.lastName : "")
          }
          value={doc.id}
        />
      );
    })}
          </Picker>

          </View>
         

          <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
          >
            {categories.map((category, index) => (
              <Picker.Item label={category.label} value={category.value} key={index} />
            ))}
          </Picker>
</View>
        

          <TextInput
            style={styles.input}
            multiline
            placeholder="Enter Reason"
            value={reason}
            onChangeText={setReason}
          />

          <View style={styles.buttonContainer}>
            <Button mode="text" onPress={onClose}>
              Cancel
            </Button>
            <Button mode="contained" onPress={handleSave} style={styles.modelAddButton}>
              Submit
            </Button>
          </View>
        </View>
      </View>
    </Modal>
     

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24, // Adjust if content is clipped
  },

  doctorCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
 
  doctorDetails: {
    flexDirection: 'column',
  },
  specialty: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  doctorName: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',

  },
  doctorMeta: {
    marginTop: 0,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  metaText: {
    fontSize: 12,
    marginLeft: 5,
    color: 'gray',
    fontWeight:'bold'
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  statusText: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom:100,
    
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
 
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dropdown: {
    marginBottom: 20,
  },
  
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Modal background with transparency
  },
  modalContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    height: 30,
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modelAddButton: {
    backgroundColor: '#6200EE',
  },
  pickerContainer: {
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default TreatingDoctor;
