import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity ,ScrollView,FlatList } from 'react-native'; // Added Image import
import Header from '../Dashboard/Header';
import Sidebar from '../Dashboard/Sidebar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import Footer from './Footer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { authFetch } from '../../axios/authFetch';
import { patientStatus } from '../../utility/role';

const TriageDashboard = ({ onNotificationPress }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const [recentPatient, setRecentPatient] = useState([])
  
  const user = useSelector((state) => {
    return state.currentUserData
    
  })
  console.log("user==",user)

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const navigateToVisualization = () => {
    navigation.navigate('DataVisualization'); 
  };

  const getRecentData = async () => {

    const response = await authFetch(
      `patient/${user.hospitalID}/patients/recent/${patientStatus.emergency}?userID=${user.id}&role=${user.role}&category=triage`,
      user.token
    );
    if (response.message == "success") {
      setRecentPatient(response.patients);
    }
  }
  useEffect(() => {
    getRecentData()
  },[])
  console.log("recentPatient===", recentPatient)

  
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
          navigation.navigate('EmergencyTriage', {
            patientId: item.id,
            patientName: item.pName,
            patientImage: item.photo,
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
            <Text style={styles.recentPatient}>
              Patient Name:
              <Text style={styles.recentPatientName}> {item.pName.trim()}</Text>
            </Text>
            <View style={styles.recentPatientDateRow}>
              <Icon name="access-time" size={20} color="#666" />
              <Text style={styles.recentPatientDateText}>{new Date(item.dob).toDateString()} | 10:00 AM</Text>
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
  

  return (
    <View style={styles.container}>
      <Header toggleSidebar={toggleSidebar} onNotificationPress={onNotificationPress} />
      <Sidebar isVisible={sidebarVisible} onClose={toggleSidebar} />
      
      {/* Adjusted to center the image and added a welcome message */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imgcontent}>

        <Image source={require('../../assets/imge.png')} style={styles.image} />
        </View>
        <TouchableOpacity style={styles.cardContainer} onPress={navigateToVisualization}>
      <View style={styles.header}>
        <Text style={styles.numberText}>400 +</Text>
        <TouchableOpacity style={[styles.closeButton, styles.rotatedIcon]}>
          <Icon name="arrow-upward" size={24} color="#FFA500" />
        </TouchableOpacity>
      </View>

      <Text style={styles.subText}>People visited by in month and zone</Text>

      <View style={styles.imageContainer}>
        <Image source={{}} style={styles.images} />
        <Image source={{}} style={styles.images} />
        <Image source={{}} style={styles.images} />
      </View>
    </TouchableOpacity>

    <View style={styles.headerContainer}>
      <Text style={styles.headingText}>Latest Patient Data</Text>
      <Text style={styles.seeAllText}>See All</Text>
    </View>

    <FlatList
      data={recentPatient}
      renderItem={renderPatient}
      keyExtractor={(item) => item.id.toString()}
    />

      </ScrollView>
    <Footer activeRoute="home" navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    flexGrow: 1,
 
  },
  imgcontent:{
    justifyContent: 'center', 
    alignItems: 'center',
  },
  image: {
    width: 350, //350 
    height: 150,//150
    marginBottom: 8,
    marginTop:5,
  },
 
  cardContainer: {
    backgroundColor: "#b8d5fb",
    borderRadius: 24,
    padding: 14,
    margin: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft:'20px'
  },
  closeButton: {
    width: 36,
    height: 36,
    backgroundColor: '#fff',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  rotatedIcon: {
    transform: [{ rotate: '30deg' }],
  },
  rotatedIcon2: {
    transform: [{ rotate: '90deg' }],
    textAlign:"right",
  },
  subText: {
    marginTop: 8,
    fontSize: 16,
    width:"180px",
    color: '#fff',
  },
  imageContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  images: {
    width: 20,
    height: 20,
    borderRadius: 25,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  seeAllText: {
    fontSize: 14,
    color: '#007BFF', // This color can be adjusted as needed
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    borderColor: '#bebebe',
    borderRadius: 16,
    marginVertical: 8,
    margin:"15px"
  },
  personImage: {
    width: 70,
    height: 70,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    marginTop:"-50px"
  },
  patientText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',

    flex: 1,
  },
  clockIcon: {
    marginRight: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#555',
  },
  subimageContainer: {
    alignItems: 'center',
    marginRight: 16,
    
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

export default TriageDashboard;
