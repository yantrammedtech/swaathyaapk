import React from "react";
import { View, Text, Image,Modal, StyleSheet, TouchableOpacity, Dimensions ,} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { authFetch } from "../../axios/authFetch";
import DischargeBasicTabs from "./tabs";
import { RadioButton } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { patientStatus, Role_NAME } from "../../utility/role";
import { authPost } from "../../axios/authPost";
import Toast from 'react-native-toast-message';
const { height } = Dimensions.get('window');



const DischargePatientProfile = ({ route }) => {
    const dispatch = useDispatch()
    const { patientId } = route.params;
    const navigation = useNavigation()

    const [modalVisible, setModalVisible] = useState(false);
 const [patientType, setPatientType] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [wardID, setWardID] = useState('');

  const [wardList, setWardList] = React.useState([]);
  const [doctorList, setDoctorList] = React.useState([]);
  const [departmentID, setDepartmentID] = React.useState(0);
  const [userID, setUserID] = React.useState(0);


    const user = useSelector((state) => {
        return state.currentUserData
    })
    const currentPatientData = useSelector((state) => {
        return state.currentPatientData
    })

    const handleBackPress = () => {
        console.log("Can go back:", navigation.canGoBack()); // Check if it returns true or false
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate('EmergencyDashboard');
        }
    };



    const getCurrentPatient = async () => {
        const response = await authFetch(
            `patient/${user.hospitalID}/patients/single/${patientId}`,
            user.token
        );
        if (response.message == "success") {
            dispatch({ type: "currentPatientData", payload: response.patient })
        }
    }
// console.log("currentPatientData",currentPatientData)
    useEffect(() => {
        getCurrentPatient()
    }, [])


    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    const backgroundColor = getRandomColor();


    const getAllList = async () => {
        const doctorResponse = await authFetch(
          `user/${user.hospitalID}/list/${Role_NAME.doctor}`,
          user.token
        );
        const wardResonse = await authFetch(`ward/${user.hospitalID}`, user.token);
        if (wardResonse.message == "success") {
          setWardList(wardResonse.wards);
        }
        if (doctorResponse.message == "success") {
          setDoctorList(doctorResponse.users);
        }
      };

      useEffect(() => {
        getAllList()
      },[user])

      const handleSubmit = async () => {
       
        const response = await authPost(
          `patient/${user.hospitalID}/patients/revisit/${currentPatientData.id}`,
          {
            ptype: patientType,
            userID: userID,
            departmentID: departmentID,
            wardID: wardID,
          },
          user.token
        );
        console.log("res===============",response)
        if (response.message == "success") {
        
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Patient successfully added 👏',
            position: 'top',
            visibilityTime: 2000, // toast duration
          });
          setPatientType(''); // or set to default value if needed
    setUserID(''); // Reset userID if it's part of the form
    setDepartmentID(''); // Reset department
    setWardID(''); // Reset ward
          setModalVisible(false);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: response.message,
            position: 'top',
            visibilityTime: 2000,
          });
        }
      };
    return (
        <View style={styles.container}>


            {/* Patient Information Section */}
            <View style={styles.patientInfoContainer}>
                {currentPatientData?.imageURL ? (
                    <Image source={{ uri: currentPatientData.imageURL }} style={styles.profileImage} />
                ) : (
                    <View style={[styles.placeholderImage, { backgroundColor }]}>
                        <Text style={styles.placeholderText}>
                            {currentPatientData?.pName ? currentPatientData.pName.charAt(0).toUpperCase() : ''}
                        </Text>
                    </View>
                )}
                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Name</Text>
                        <Text style={styles.colon}>:</Text>
                        <Text style={styles.value}>{currentPatientData?.pName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>ID</Text>
                        <Text style={styles.colon}>:</Text>
                        <Text style={styles.value}>{currentPatientData?.id}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Doctor Name</Text>
                        <Text style={styles.colon}>:</Text>
                        <Text style={styles.value}>
                            {currentPatientData?.doctorName ? currentPatientData.doctorName : 'Unassigned'}
                        </Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>
                        Date of Discharge</Text>
                        <Text style={styles.colon}>:</Text>
                        <Text style={styles.value}>
                            {currentPatientData?.endTime ? new Date(currentPatientData.endTime).toLocaleDateString() : 'Not Available'}
                        </Text>
                    </View>

                    <View  style={styles.shakecontainer}>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.buttonContainer}>
       
                    <Text style={styles.buttonText}>+ Patient Revisit</Text>
      </TouchableOpacity>
                    </View>
                  
                </View>
            </View>

            <View style={styles.tabsContainer}>
                <DischargeBasicTabs />
            </View>

            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Subscribe</Text>

            <Text style={styles.label2}>Type of Transfer *</Text>
            <View style={styles.radioGroup}>
            <RadioButton.Group
                onValueChange={(value) => setPatientType(Number(value))} // Convert value to a number
                value={patientType}
              >
                <View style={styles.radioContainer}>
                  <RadioButton value={patientStatus.inpatient} />
                  <Text>Inpatient</Text>
                </View>
                <View style={styles.radioContainer}>
                  <RadioButton value={patientStatus.outpatient} />
                  <Text>Outpatient</Text>
                </View>
                <View style={styles.radioContainer}>
                  <RadioButton value={patientStatus.emergency} />
                  <Text>Emergency</Text>
                </View>
              </RadioButton.Group>
            </View>

           {/* Doctor Dropdown */}
           <Text style={styles.label2}>Doctor</Text>
           <RNPickerSelect
  onValueChange={(value) => {
    // Update selectedDoctor ID and userID
    setSelectedDoctor(value);
    setUserID(value);

    // Get the departmentID based on the selected doctor and update it
    const selectedDoctor = doctorList.find((doc) => doc.id === value);
    if (selectedDoctor) {
      setDepartmentID(selectedDoctor.departmentID);
    }
  }}
  items={doctorList.map((doc) => ({
    label: `${doc.firstName || ''} ${doc.lastName || ''}`.trim(),
    value: doc.id,
  }))}
  placeholder={{ label: 'Select Doctor', value: null }}
  style={{
    viewContainer: styles.viewContainer,
    inputAndroid: styles.inputAndroid,
    inputIOS: styles.inputIOS,
  }}
  value={userID ? String(userID) : null} // Set selected value based on userID
/>



              {/* Conditional Ward Dropdown */}
              {patientType === patientStatus.inpatient && (
                <>
                  <Text style={styles.label2}>Ward</Text>
                  <RNPickerSelect
                    onValueChange={(value) => setWardID(value)}
                    items={wardList.map(ward => ({ label: ward.name, value: ward.id }))}
                    placeholder={{ label: 'Select Ward', value: null }}
                    style={{
                        viewContainer: styles.viewContainer,
                        inputAndroid: styles.inputAndroid,
                        inputIOS: styles.inputIOS,
                      }}
                      
                    value={wardID}
                  />
                </>
              )}


            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // Handle form submission here
                  handleSubmit()
                  setModalVisible(false);
                }}
                style={[styles.submitButton, !selectedDoctor || !patientType ? styles.disabledButton : null]}
                disabled={!selectedDoctor || !patientType}
              >
                <Text style={styles.submitText}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1977f3',
        paddingTop: 1, // Adjust for header height
        // paddingHorizontal: 20,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#1977f3',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    backIcon: {
        position: 'absolute',
        left: 10,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    patientInfoContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginBottom: 20,
    },
    infoContainer: {
        width: '100%', // Ensures that the container takes full width
        alignItems: 'center', // Center-aligns the content horizontally
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '80%',
    },
    label: {
        fontSize: 18,
        color: '#fff',
        width: 120, // Adjust width as needed to align labels
    },
    colon: {
        fontSize: 18,
        color: '#fff',
        paddingHorizontal: 5, // Adjust the spacing around the colon
    },
    value: {
        fontSize: 18,
        color: '#fff',
        flex: 1,
    },
    placeholderImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    placeholderText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: "bold",
    },
    tabsContainer: {
        backgroundColor: '#fff',//#fff
        borderRadius: 24,
        padding: 10,
        marginTop: 20,
        height: height * 0.7,
        alignItems: 'center',
        width: "100%",
    },
    shakecontainer: {
        flexDirection: 'row', // Ensure child elements are aligned horizontally
        justifyContent: 'flex-end', // Align elements to the right
        alignItems: 'center', // Center align vertically
        width: '100%', // Ensure the container takes the full width
      },
      iconContainer: {
        flexDirection: 'row', // Ensure icon and text are aligned horizontally
        alignItems: 'center',
        marginRight:20,
      },
      modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
      },
      closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
      },
      option: {
        alignItems: 'center',
        marginVertical: 15,
      },
      optionIcon: {
        width: 50,
        height: 50,
        marginBottom: 10,
      },
      optionText: {
        fontSize: 16,
        textAlign: 'center',
      },
      reverseImage:{
        height:30,
        width:30,
        resizeMode: 'contain',
      },
      buttonContainer: {
        backgroundColor: 'orange', // Set your preferred background color
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 18,
        alignItems: 'center',
        marginRight:5,
      },
      buttonText: {
        color: '#fff', // White text color for contrast
        fontSize: 16,
        fontWeight: 'bold',
      },
      modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 30,
        borderRadius: 8,
        elevation: 5,
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
      },
      label2: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 5,
      },
      radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
      },
      dropdown: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        fontSize: 16,
      },
      buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      cancelButton: {
        padding: 10,
      },
      cancelText: {
        color: '#007AFF',
      },
      submitButton: {
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 5,
      },
      disabledButton: {
        backgroundColor: '#ccc',
      },
      submitText: {
        color: '#fff',
      },
      radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      viewContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        marginBottom: 10,
      },
      inputAndroid: { 
        padding: 10,
        fontSize: 16,
        color: 'black',    
       
      },
      inputIOS: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        padding: 10,
        fontSize: 16,
        color: 'black',
        marginBottom: 10,
        backgroundColor: '#f5f5f5',
      },
})

export default DischargePatientProfile