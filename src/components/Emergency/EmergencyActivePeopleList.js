import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Footer from './Footer';
import { authFetch } from '../../axios/authFetch';
import { useSelector } from 'react-redux';
import { patientStatus } from '../../utility/role';


const EmergencyActivePeopleList = ({ navigation }) => {
  const [allPatient, setAllPatients] = React.useState([]);

const currentZone = useSelector((state) =>state.currentZone)
const user = useSelector((state) => state.currentUserData)

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
        navigation.navigate('CommonPatientProfile', {
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
          <View style={styles.recentPatientDateRow}>
            <Icon name="access-time" size={20} color="#666" />
            <Text style={styles.recentPatientDateText}>
              {new Date(item.startTime).toDateString()} 
            </Text>
          </View>
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


  let zoneType=''
  if (currentZone === 'red') {
   zoneType = '1';
 } else if (currentZone === 'yellow') {
   zoneType = '2';
 } else if (currentZone === 'green') {
   zoneType = '3';
 }

  const getAllPatient = async () => {
    const response = await authFetch(
      `patient/${user.hospitalID}/patients/${patientStatus.emergency}?zone=${zoneType}&userID=${user.id}`,
      user.token
    );
    if (response.message == 'success') {
      setAllPatients(response.patients);
    }
  }

  useEffect(() => {
    getAllPatient()
  },[])

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={allPatient}
        renderItem={renderPatient}
        keyExtractor={(item) => item.id}
      />
      <Footer activeRoute="peopleList" navigation={navigation} />
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
    fontSize: 14,
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
});

export default EmergencyActivePeopleList;
