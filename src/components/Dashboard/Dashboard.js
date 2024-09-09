import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Dimensions ,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sidebar from './Sidebar';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SCOPE_LIST } from '../../utility/scopes';
const { height } = Dimensions.get('window'); // Get screen height


const Dashboard = ({ onNotificationPress }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigation = useNavigation();
  const [hasInpatient, setHasInpatient] = useState(false);
  const [hasOutpatient, setHasOutpatient] = useState(false);
  const [hasTriage, setHasTriage] = useState(false);
  const [hasEmergencyRedZone, setHasEmergencyRedZone] = useState(false);
  const [hasEmergencyYellowZone, setHasEmergencyYellowZone] = useState(false);
  const [hasEmergencyGreenZone, setHasEmergencyGreenZone] = useState(false);
  const [hasSurgeon, setHasSurgeon] = useState(false);
  const [hasAnesthesia, setHasAnesthesia] = useState(false);
  
  const userData = useSelector((state) => {
    return state
  })

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };




  useEffect(() => {
    console.log("userData", userData)

    async function getLocalData() {
      const token = await AsyncStorage.getItem('Token')
      const scope = await AsyncStorage.getItem('scope')
      const userScopes = scope?.split('#');

      if (userScopes) {
        const scopes = userScopes.map((n) => Number(n));
        setHasOutpatient(scopes.includes(SCOPE_LIST.outpatient));
        setHasInpatient(scopes.includes(SCOPE_LIST.inpatient));
        setHasSurgeon(scopes.includes(SCOPE_LIST.surgeon));
        setHasAnesthesia(scopes.includes(SCOPE_LIST.anesthetist));
        setHasTriage(scopes.includes(SCOPE_LIST.triage));
        setHasEmergencyRedZone(scopes.includes(SCOPE_LIST.emergency_red_zone));
        setHasEmergencyYellowZone(scopes.includes(SCOPE_LIST.emergency_yellow_zone));
        setHasEmergencyGreenZone(scopes.includes(SCOPE_LIST.emergency_green_zone));
      }
      console.log("token", token)
      console.log("scope", scope)

    }
    getLocalData()
  }, [])





  console.log("hasInpatient", hasInpatient)



  return (
    <View style={styles.container}>
      <Header toggleSidebar={toggleSidebar} onNotificationPress={onNotificationPress} />

      <Image
        source={require('../../assets/imge.png')}
        style={styles.image}
        resizeMode="contain" // Use resizeMode as a prop
      />

      <Text style={styles.dashboardText}>Dashboard</Text>

      <ScrollView contentContainerStyle={styles.boxContainer}>
        {/* Out Patient */}
        {hasOutpatient &&
          <Pressable style={[styles.box, styles.outPatient]}>
            <View style={styles.boxContent}>
              <Image
                source={require('../../assets/Clip path group.png')}
                style={styles.boxImage}
                resizeMode="contain"
              />
              <Text style={styles.boxText}>Out Patient</Text>
            </View>
            <View style={[styles.arrowContainer, styles.rotatedIcon2]}>
              <Icon name="arrow-upward" size={24} color="#fff" />
            </View>
          </Pressable>
        }

        {/* In Patient */}
        {hasInpatient === true &&
          <Pressable style={[styles.box, styles.inPatient]}>
            <View style={styles.boxContent}>
              <Image
                source={require('../../assets/Clip path group.png')}
                style={styles.boxImage}
                resizeMode="contain"
              />
              <Text style={styles.boxText}>In Patient</Text>
            </View>
            <View style={[styles.arrowContainer, styles.rotatedIcon2]}>
              <Icon name="arrow-upward" size={24} color="#fff" />
            </View>
          </Pressable>
        }

        {/* OT */}
        {(hasSurgeon || hasAnesthesia) &&
        <Pressable style={[styles.box, styles.otPatient]}>
          <View style={styles.boxContent}>
            <Image
              source={require('../../assets/Clip path group-3.png')}
              style={styles.boxImage}
              resizeMode="contain"
            />
            <Text style={styles.boxText}>OT</Text>
          </View>
          <View style={[styles.arrowContainer, styles.rotatedIcon2]}>
            <Icon name="arrow-upward" size={24} color="#fff" />
          </View>
        </Pressable>
        }

        {/* Emergency */}
        {(hasEmergencyRedZone || hasEmergencyYellowZone || hasEmergencyGreenZone) &&
        <Pressable style={[styles.box, styles.emergencyPatient]}
        onPress={() => navigation.navigate('EmergencyDashboard')}
        
        >
          <View style={styles.boxContent}>
            <Image
              source={require('../../assets/Clip path group-2.png')}
              style={styles.boxImage}
              resizeMode="contain"
            />
            <Text style={styles.boxText}>Emergency</Text>
          </View>
          <View style={[styles.arrowContainer, styles.rotatedIcon2]}>
            <Icon name="arrow-upward" size={24} color="#fff" />
          </View>
        </Pressable>
        }

        {/* Triage */}
        {hasTriage &&
          <Pressable
            style={[styles.box, styles.triagePatient]}
            onPress={() => navigation.navigate('TriageDashboard')}
          >
            <View style={styles.boxContent}>
              <Image
                source={require('../../assets/Clip path group.png')}
                style={styles.boxImage}
                resizeMode="contain"
              />
              <Text style={styles.boxText}>Triage</Text>
            </View>
            <View style={[styles.arrowContainer, styles.rotatedIcon2]}>
              <Icon name="arrow-upward" size={24} color="#fff" />
            </View>
          </Pressable>
        }

        {/* Record */}
        <Pressable style={[styles.box, styles.recordPatient]}>
          <View style={styles.boxContent}>
            <Image
              source={require('../../assets/Clip path group-1.png')}
              style={styles.boxImage}
              resizeMode="contain"
            />
            <Text style={styles.boxText}>Record</Text>
          </View>
          <View style={[styles.arrowContainer, styles.rotatedIcon2]}>
            <Icon name="arrow-upward" size={24} color="#fff" />
          </View>
        </Pressable>
      </ScrollView>

      <Sidebar isVisible={sidebarVisible} onClose={toggleSidebar} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  image: {
    width: 350,
    height: 150,
  },
  dashboardText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 8,
  },
  box: {
    width: '45%', // Adjust width as needed
    marginBottom: 20,
    height: height * 0.2,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3, // For shadow effect on Android
    backgroundColor: '#fff',
    padding:5
  },
  boxContent: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  boxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  boxImage: {
    width: 100,
    height: 100,
  },
  arrowContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  rotatedIcon2: {
    transform: [{ rotate: '45deg' }],
  },
  outPatient: {
    backgroundColor: '#f6a8b5',
  },
  inPatient: {
    backgroundColor: '#9eb2fb',
  },
  otPatient: {
    backgroundColor: '#65a4f7',
  },
  emergencyPatient: {
    backgroundColor: '#fda3a3',
  },
  triagePatient: {
    backgroundColor: '#97e0f7',
  },
  recordPatient: {
    backgroundColor: '#bca0f9',
  },
});



export default Dashboard;




