import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { authFetch } from '../../axios/authFetch';


const EmergencyPatientList = ({ navigation }) => {

  const  userType=useSelector((state)  => state.userType)  
const user = useSelector((state) => state.currentUserData)

  const [allPatient, setAllPatients] = React.useState([]);


  
  let screenType='Emergency'

  useEffect(() => {
    if(userType){
      setAllPatients([]);
      const getAllPatient = async () => {
        try {
          const response = await authFetch(
            `ot/${user.hospitalID}/${
              user.id
              }/getPatient/${userType.toLowerCase()}/${screenType.toLowerCase()}`,
              user.token
            );
            if (response.status == 200) {
                const uniquePatients = response.patients.filter(
                    (patient, index, self) => 
                      index === self.findIndex(p => p.id === patient.id)
                  );
                  
                  setAllPatients(uniquePatients);
             // setAllPatients(response.patients);
            } else {
              setAllPatients([]);
            }
          } catch (error) {
            setAllPatients([]);
          }
          
        };
        getAllPatient();
      }
  }, [ screenType, user.hospitalID, user.id, user.token, userType]);



const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const renderPatient = ({ item }) => {
  const backgroundColor = getRandomColor();
  return (
    <TouchableOpacity
      style={styles.recentPatientContainer}
      onPress={() =>
        navigation.navigate('PreOpRecord', {
          patientId: item.id,
        })
      }
    >
      <View style={styles.recentPatientRow}>
        {item.imageURL ? (
          <Image source={{ uri: item.imageURL }} style={styles.profileimage} />
        ) : (
          <View style={[styles.placeholderImage, { backgroundColor }]}>
            <Text style={styles.placeholderText}>
              {item.pName ? item.pName.charAt(0).toUpperCase() : ''}
            </Text>
          </View>
        )}
        <View style={styles.recentPatientInfoContainer}>
          {/* Combine Text properly */}
          <Text style={styles.recentPatient}>
            Patient Name: <Text style={styles.recentPatientName}>{item.pName.trim()}</Text>
          </Text>
          <Text style={styles.recentPatient}>
            Doctor Name: <Text style={styles.recentPatientDateText}>{item.doctorName}</Text>
          </Text>
          {/* <View style={styles.recentPatientDateRow}>
            <Icon name="access-time" size={20} color="#666" />
            <Text style={styles.recentPatientDateText}>
              {new Date(item.startTime).toDateString()} 
            </Text>
          </View> */}
          <Text style={styles.recentPatient}>
            Status: <Text style={styles.status}>APPROVED</Text>
          </Text>
        </View>
      </View>
      <View style={styles.recentPatientRow}>
        <Text style={styles.recentPatientUhidText}>UHID: {item.pUHID}</Text>
        <TouchableOpacity style={styles.recentPatientCloseButton}>
          <Icon name="arrow-upward" size={24} color="#FFA500" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};


  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={allPatient}
        renderItem={renderPatient}
        keyExtractor={(item) => item.id}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 15,
    margin: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bebebe',
    // elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  patient: {
    fontSize: 14,
  },
  patientName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 2,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  uhidText: {
    fontSize: 13,
    color: '#333',
  },
  closeButton: {
    width: 36,
    height: 36,
    backgroundColor: '#fff',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '90deg' }],
  },
  recentPatientContainer: {
    padding: 15,
    margin: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bebebe',
  
  },
  recentPatientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  recentPatientImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  recentPatientInfoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  recentPatient: {
    fontSize: 15,
    fontWeight:"semibold",
  },
  recentPatientName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 2,
  },
  recentPatientDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentPatientDateText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
    fontWeight:"bold",
  },
  recentPatientUhidText: {
    fontSize: 13,
    color: '#333',
  },
  recentPatientCloseButton: {
    width: 36,
    height: 36,
    backgroundColor: '#fff',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '90deg' }],
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
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  status:{
    color:"green",
    fontSize:12,
    fontWeight:"bold"
  }
});

export default EmergencyPatientList;
