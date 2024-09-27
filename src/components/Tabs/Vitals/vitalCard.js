import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal,Platform ,Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { authPost } from '../../../axios/authPost';
import { authFetch } from '../../../axios/authFetch';
import { useSelector } from 'react-redux';

const VitalCard =({ visible, onClose, onSave }) => {

  const user = useSelector((state) => state.currentUserData);
  const currentPatient = useSelector((state) => state.currentPatientData);
  const patientTimeLineID = currentPatient?.patientTimeLineID;

  const [wardList, setWardList] = React.useState([]);


    const [vitals, setVitals] = useState({
        oxygen: 0,
        bpH: '',
        bpL: '',
        temperature: 0,
        pulse: 0,
        respiratoryRate: 0,
        time: '',
        bpTime: "",
        oxygenTime: "",
        temperatureTime: "",
        pulseTime: "",
        respiratoryRateTime: "",
        errors: {},
      });
    
     const handleChange = (field, value) => {
  let updatedValue = value;

  // Ensure numeric fields are treated as numbers
  const intFields = ["pulse", "temperature", "oxygen", "bpH", "bpL", "respiratoryRate"];
  if (intFields.includes(field)) {
    updatedValue = Number(value);
  }

  // Validation logic
  const newErrors = { ...vitals.errors };

  if (field === "oxygen") {
    if (updatedValue > 100 || updatedValue < 50) {
      newErrors.oxygen = "Oxygen should be between 50 and 100.";
    } else {
      delete newErrors.oxygen;
    }
    setVitals((prevVitals) => ({
      ...prevVitals,
      oxygen: updatedValue,
      // oxygenTime: prevVitals.time,
      errors: newErrors,
    }));
  } else if (field === "temperature") {
    if (updatedValue > 45 || updatedValue < 20) {
      newErrors.temperature = "Temperature should be between 20°C and 45°C.";
    } else {
      delete newErrors.temperature;
    }
    setVitals((prevVitals) => ({
      ...prevVitals,
      temperature: updatedValue,
      // temperatureTime: vitals.time,
      errors: newErrors,
    }));
  } else if (field === "bpH") {
    if (updatedValue > 200 || updatedValue < vitals.bpL || updatedValue < 50) {
      newErrors.bpH = `BP High should be between ${vitals.bpL || 50} and 200 mm Hg.`;
    } else {
      delete newErrors.bpH;
    }
   
    setVitals((prevVitals) => ({
      ...prevVitals,
      bpH: updatedValue,
      // bpTime: prevVitals.time,
      errors: newErrors,
    }));
  } else if (field === "bpL") {
    if (updatedValue < 30 || updatedValue > vitals.bpH) {
      newErrors.bpL = 'BP Low should be between 30 and 200 mm Hg.';
    } else {
      delete newErrors.bpL;
    }
   
    setVitals((prevVitals) => ({
      ...prevVitals,
      bpL: updatedValue,
      // bpTime: vitals.time,
      errors: newErrors,
    }));
  } else if (field === "pulse") {
    if (updatedValue > 200 || updatedValue < 30) {
      newErrors.pulse = "Pulse should be between 30 and 200 bpm.";
    } else {
      delete newErrors.pulse;
    }
    setVitals((prevVitals) => ({
      ...prevVitals,
      pulse: updatedValue,
      // pulseTime: vitals.time,
      errors: newErrors,
    }));
  } else if (field === "respiratoryRate") {
    if (updatedValue < 1 || updatedValue > 40) {
      newErrors.respiratoryRate = "Respiratory Rate should be between 1 and 40 breaths per minute.";
    } else {
      delete newErrors.respiratoryRate;
    }
    setVitals((prevVitals) => ({
      ...prevVitals,
      respiratoryRate: updatedValue,
      // respiratoryRateTime: vitals.time,
      errors: newErrors,
    }));
  }
};


// Convert time to a Date object
const convertTimeToISO = (time) => {
  console.log("time 123====", time);

  const timeParts = time.match(/(\d{1,2}):(\d{2}):(\d{2})\s*(am|pm)/i);
  if (timeParts) {
    let [_, hours, minutes, seconds, period] = timeParts;

    // Convert hours to 24-hour format
    hours = parseInt(hours, 10);
    if (period.toLowerCase() === 'pm' && hours < 12) {
      hours += 12;
    } else if (period.toLowerCase() === 'am' && hours === 12) {
      hours = 0;
    }

    // Create a Date object with the current date and the parsed time
    const now = new Date();
    const dateWithTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds);

    // Convert Date object to ISO 8601 format
    const isoString = dateWithTime.toISOString();

    console.log("time2 ===", isoString); // Output: 2024-09-14T13:00:00.000Z (example)
    return isoString;
  } else {
    console.log("Invalid time format");
  }
};


      
      const [showTimePicker, setShowTimePicker] = useState(false);
      const [selectedTime, setSelectedTime] = useState(new Date());

      const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || new Date();
        const formattedTime = currentTime.toLocaleTimeString(); // Adjust formatting as needed
        setShowTimePicker(Platform.OS === 'ios'); 
        setVitals((prevVitals) => ({
          ...prevVitals,
          time: formattedTime,
        }));
      };
      
      

  const showTimepicker = () => {
    setShowTimePicker(true); // Show the time picker when the clock icon is clicked
  };

  function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // If birth month is greater than the current month or the same month but birth date is greater, decrease age by 1
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
    
      const handleSavePress = async() => {
        const wardName = currentPatient?.wardID ? wardList.find((ward) => ward.id == currentPatient.wardID)?.name : ''
      const patientAge = calculateAge(user.dob)
      // console.log("oxytime===",vitals.time, vitals.temperatureTime)
      console.log("object",vitals.oxygenTime ? convertTimeToISO(vitals.time) : "")
        const response = await authPost(
          `vitals/${user.hospitalID}/${patientTimeLineID}`,
          {
            userID: user.id,
            oxygen: vitals.oxygen,
            respiratoryRate: vitals.respiratoryRate,
            pulse: vitals.pulse,
            temperature: vitals.temperature,
            bp: vitals.bpH ? vitals.bpH + "/" + vitals.bpL : "",
            bpTime: vitals.bpTime ? convertTimeToISO(vitals.time) : "",
            oxygenTime: vitals.oxygenTime ? convertTimeToISO(vitals.time) : "",
            respiratoryRateTime: vitals.respiratoryRateTime ? convertTimeToISO(vitals.time) : "",
            temperatureTime: vitals.temperatureTime
              ? convertTimeToISO(vitals.time)
              : "",
            pulseTime: vitals.pulseTime ? convertTimeToISO(vitals.time) : "",
            ward: wardName,
            age: patientAge,
          },
          user.token
        );
        console.log("response vitals====",response)
        if (response.message === "success") {
        Alert.alert("Success", "Vital added successfully!");

        } 
        onSave(vitals);
        onClose();
      };

      React.useEffect(() => {
        async function wardsData() {
          const wardResonse = await authFetch(
            `ward/${user.hospitalID}`,
            user.token
          );
          if (wardResonse.message == "success") {
            setWardList(wardResonse.wards);
          }
        }
        wardsData();
      }, []);

      React.useEffect(() => {
        if (vitals?.time) {
          if(vitals?.oxygen){
            setVitals((prevVitals) => ({
              ...prevVitals,
             
              oxygenTime: vitals.time,
             
            }));
          }
          if(vitals?.temperature){
            setVitals((prevVitals) => ({
              ...prevVitals,
             
              temperatureTime: vitals.time,
             
            }));
          }
          if(vitals?.bpH || vitals?.bpL){
            setVitals((prevVitals) => ({
              ...prevVitals,
             
              bpTime: vitals.time,
             
            }));
          }
          if(vitals?.pulse){
            setVitals((prevVitals) => ({
              ...prevVitals,
             
              pulseTime: vitals.time,
             
            }));
          }
          if(vitals?.respiratoryRate){
            setVitals((prevVitals) => ({
              ...prevVitals,
             
              respiratoryRateTime: vitals.time,
             
            }));
          }
          
         
        }
      }, [vitals?.time]);


      console.log("time===",vitals.time, selectedTime)
      console.log("ox",vitals.temperatureTime)

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
                     keyboardType="numeric"
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
                     keyboardType="numeric"
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
                   keyboardType="numeric"
                />
                {vitals.errors.respiratoryRate && (
                  <Text style={styles.errorText}>{vitals.errors.respiratoryRate}</Text>
                )}
              </View>
    
              <View style={styles.inputContainer}>
      <Text style={styles.label}>Time of observation</Text>
      <View style={styles.timeInputContainer}>
        <TextInput
          style={[styles.input, vitals.errors.time ? styles.inputError : null, { flex: 1 }]} // Flex to take remaining space
          value={vitals.time}
          editable={false} // Prevent manual typing, use the picker
        />
       <TouchableOpacity onPress={showTimepicker}>
  <Text>
    <Icon name="access-time" size={24} color="gray" style={styles.icon} />
  </Text>
</TouchableOpacity>

      </View>
      {vitals.errors.time && (
        <Text style={styles.errorText}>{vitals.errors.time}</Text> 
      )}

{showTimePicker && (
  <DateTimePicker
    value={new Date()}
    mode="time"
    display="default"
    onChange={onChangeTime}
  />
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
          timeInputContainer: {
            flexDirection: 'row', // Align elements in a row
            alignItems: 'center', // Vertically align items
            width: '100%', // Full width of the container
            justifyContent: 'space-between', // Space between input and icon
          },
      });
      
export  default VitalCard