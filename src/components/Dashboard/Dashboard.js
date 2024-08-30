import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sidebar from './Sidebar';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';

const Dashboard = ({ onNotificationPress }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigation = useNavigation();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <View style={styles.container}>
      <Header toggleSidebar={toggleSidebar} onNotificationPress={onNotificationPress} />

      <Image 
        source={require('../../assets/imge.png')} 
        style={styles.image} 
        resizeMode="contain" // Use resizeMode as a prop
      />

      <Text style={styles.dashboardText}>Dashboard</Text>

      <View style={styles.boxContainer}>
        <View style={styles.row}>
          <Pressable style={[styles.box, styles.outPatient]}>
            <View style={styles.boxContent}>
              <Image
                source={require('../../assets/Clip path group.png')}
                style={styles.boxImage}
                resizeMode="contain" // Use resizeMode as a prop
              />
              <Text style={styles.boxText}>Out Patient</Text>
            </View>
            <View style={[styles.arrowContainer,styles.rotatedIcon2]}>
           
           <Icon name="arrow-upward" size={24} color="#fff" />
        
           </View>
          </Pressable>

          <Pressable style={[styles.box, styles.inPatient]}>
            <View style={styles.boxContent}>
              <Image
                source={require('../../assets/Clip path group.png')}
                style={styles.boxImage}
                resizeMode="contain" // Use resizeMode as a prop
              />
              <Text style={styles.boxText}>In Patient</Text>
            </View>
            <View style={[styles.arrowContainer,styles.rotatedIcon2]}>
           
            <Icon name="arrow-upward" size={24} color="#fff" />
         
            </View>
          </Pressable>
        </View>

        <View style={styles.row}>
          <Pressable style={[styles.box, styles.otPatient]}>
            <View style={styles.boxContent}>
              <Image
                source={require('../../assets/Clip path group-3.png')}
                style={styles.boxImage}
                resizeMode="contain" // Use resizeMode as a prop
              />
              <Text style={styles.boxText}>OT</Text>
            </View>
            <View style={[styles.arrowContainer,styles.rotatedIcon2]}>
           
            <Icon name="arrow-upward" size={24} color="#fff" />
         
            </View>
          </Pressable>

          <Pressable style={[styles.box, styles.emergencyPatient]}>
            <View style={styles.boxContent}>
              <Image
                source={require('../../assets/Clip path group-2.png')}
                style={styles.boxImage}
                resizeMode="contain" // Use resizeMode as a prop
              />
              <Text style={styles.boxText}>Emergency</Text>
            </View>
            <View style={[styles.arrowContainer,styles.rotatedIcon2]}>
           
           <Icon name="arrow-upward" size={24} color="#fff" />
        
           </View>
          </Pressable>
        </View>

        <View style={styles.row}>
          <Pressable 
            style={[styles.box, styles.triagePatient]} 
            onPress={() => navigation.navigate('TriageDashboard')}
          >
            <View style={styles.boxContent}>
              <Image
                source={require('../../assets/Clip path group.png')}
                style={styles.boxImage}
                resizeMode="contain" // Use resizeMode as a prop
              />
              <Text style={styles.boxText}>Triage</Text>
            </View>
            <View style={[styles.arrowContainer,styles.rotatedIcon2]}>
           
           <Icon name="arrow-upward" size={24} color="#fff" />
        
           </View>
          </Pressable>

          <Pressable style={[styles.box, styles.recordPatient]}>
            <View style={styles.boxContent}>
              <Image
                source={require('../../assets/Clip path group-1.png')}
                style={styles.boxImage}
                resizeMode="contain" // Use resizeMode as a prop
              />
              <Text style={styles.boxText}>Record</Text>
            </View>
            <View style={[styles.arrowContainer,styles.rotatedIcon2]}>
           
            <Icon name="arrow-upward" size={24} color="#fff" />
         
            </View>
          </Pressable>
        </View>
      </View>

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
    paddingHorizontal: 20,
  },
  rotatedIcon2: {
    transform: [{ rotate: '90deg' }],
    textAlign:"right",
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  box: {
    flexDirection: 'column', 
    alignItems: 'flex-start',
    backgroundColor: '#f8f8f8', 
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '48%',
  },
  boxContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  boxImage: {
    width: 40,
    height: 40,
    marginRight: 15,
    resizeMode: 'contain',
  },
  boxText: {
    fontSize: 18,
    fontWeight: '500',
    color:"#fff"
  },
  arrowContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  outPatient: {
    backgroundColor:"#FFC0CB",
  },
  inPatient: {
    backgroundColor:"#ADD8E6",
  },
  otPatient: {
    backgroundColor:"#4792f5",
  },
  emergencyPatient: {
    backgroundColor:"#f78e8e",
  },
  triagePatient: {
    backgroundColor:"#FFA07A",
  },
  recordPatient: {
    backgroundColor:"#D8BFD8",
  },
});

export default Dashboard;
