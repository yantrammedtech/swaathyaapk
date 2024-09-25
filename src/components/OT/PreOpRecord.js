import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { authFetch } from '../../axios/authFetch';
import { useNavigation } from '@react-navigation/native';


const PreOpRecord = ({route}) => {
    const user = useSelector((state) => state.currentUserData);
    const currentPatient = useSelector((state) => state.currentPatientData);
    const patientTimeLineID = currentPatient?.patientTimeLineID;

    const { patientId } = route.params;
    const dispatch  =useDispatch()
    const navigation = useNavigation();

    const getCurrentPatient = async () => {
        const response = await authFetch(
            `patient/${user.hospitalID}/patients/single/${patientId}`,
            user.token
        );
        if (response.message == "success") {
            dispatch({ type: "currentPatientData", payload: response.patient })
        }
    }

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

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    
    const yearDiff = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
  
    let ageString = '';
  
    if (yearDiff > 0) {
      ageString = `${yearDiff} year${yearDiff > 1 ? 's' : ''}`;
    } else {
      const totalMonths = monthDiff + (yearDiff * 12);
      if (totalMonths > 0) {
        ageString = `${totalMonths} month${totalMonths > 1 ? 's' : ''}`;
      } else {
        ageString = `${dayDiff} day${dayDiff !== 1 ? 's' : ''}`;
      }
    }
  
    return ageString;
  };

  let genderText = '';

if (currentPatient?.gender === 1) {
  genderText = "Male";
} else if (currentPatient?.gender === 2) {
  genderText = "Female";
} else {
  genderText = "Other"; 
}

console.log("patientId===",patientId)
  return (
    <ScrollView style={styles.container}   contentContainerStyle={styles.scrollViewContent}>
     

      <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
        {currentPatient?.imageURL ? (
          <Image source={{ uri: currentPatient?.imageURL }} style={styles.profileimage} />
        ) : (
          <View style={[styles.placeholderImage, { backgroundColor }]}>
            <Text style={styles.placeholderText}>
              {currentPatient?.pName ? currentPatient?.pName.charAt(0).toUpperCase() : ''}
            </Text>
          </View>
        )}
          
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>{currentPatient?.pName}</Text>
            <Text style={styles.infoValue}>{genderText}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Icon name="edit" size={20} color="#4A90E2" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoContainer}>
      <View style={styles.subcontainer}>
  <Text style={styles.infoText}>Name</Text>
  <Text style={styles.infoValue}>{currentPatient?.pName}</Text>
</View>

      <View style={styles.infoRow}>
        <Text style={styles.infoText}>Date of Birth</Text>
        <Text style={styles.infoValue}> {new Date(currentPatient?.dob).toLocaleDateString()}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>Age</Text>
        <Text style={styles.infoValue}>{calculateAge(currentPatient?.dob)}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>HUID</Text>
        <Text style={styles.infoValue}>{currentPatient?.pUHID}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>Admit date</Text>
        <Text style={styles.infoValue}>
      {new Date(currentPatient?.startTime).toLocaleDateString()}
    </Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>Treating Doctor</Text>
        
        <Text style={styles.infoValue}>Dr. {currentPatient?.doctorName}</Text>
        </View>
        
<View style={styles.infoRow}>
        <Text style={styles.infoText}>Departmet</Text>
        <Text style={styles.infoValue}>{currentPatient?.department}</Text>
      </View>
      </View>

    

      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate("OtPatientProfile") }>
        <Text style={styles.nextButtonText}>NEXT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9F9F9',
    },
    scrollViewContent: {
        alignItems: 'center', // or 'flex-start' depending on your layout preference
        paddingBottom: 20, // Add some padding at the bottom for better spacing
      },
   
    profileContainer: {
      backgroundColor: '#E0E7FF',
      padding: 15,
      marginTop: 10,
      marginHorizontal: 15,
      borderRadius: 10,
      width:"80%",
    },
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
   
    profileDetails: {
      marginLeft: 15,
      flex: 1,
    },
    subcontainer:{
            flexDirection: 'row', // Align items in a row
            justifyContent: 'space-around', 
            alignItems: 'center', // Center items vertically
            padding: 10, // Optional padding
          
    },
    profileName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    profileGender: {
      fontSize: 14,
      color: '#666',
    },
    editButton: {
      padding: 5,
    },
    infoContainer: {
      backgroundColor: '#fff',
      padding: 20,
      marginTop: 20,
      marginHorizontal: 15,
      borderRadius: 10,
      width:"90%",
    },
    infoText: {
      fontSize: 14,
      color: '#333',
      width: 150,
      marginLeft: 10,
      fontWeight: '500',
    },
    infoValue: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 5,
      marginLeft: 10, // Add some spacing between the label and value
      flex: 1, // All
    },
    documentImage: {
      width: 100,
      height: 100,
      alignSelf: 'center',
      marginVertical: 20,
    },
    nextButton: {
      backgroundColor: '#4A90E2',
      paddingVertical: 15,
      marginHorizontal: 20,
      borderRadius: 10,
      alignItems: 'center',
      padding:20,
      marginTop:30,
    },
    nextButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      placeholderImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
      },
      placeholderText: {
        fontSize: 24,
        color: '#fff',
        fontWeight:"bold",
      },
      profileimage: {
        width: 80,
        height: 80,
        borderRadius: 40,
      },
  });

  export default PreOpRecord