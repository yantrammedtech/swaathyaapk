import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView,Pressable,Dimensions } from 'react-native'; // Added Image import
import Header from '../Dashboard/Header';
import Sidebar from '../Dashboard/Sidebar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Footer from './Footer';
import { useNavigation, useRoute } from '@react-navigation/native';
const { height } = Dimensions.get('window'); // Get screen height

const EmergencyDashboard = ({ onNotificationPress }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();


  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const navigateToVisualization = () => {
    navigation.navigate('DataVisualization');
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
            <TouchableOpacity style={[styles.closeButton, styles.rotatedIcon]} onPress={navigateToVisualization}>
              <Icon name="arrow-upward" size={24} color="#FFA500" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subText}>People visited by in month and zone</Text>

          <View style={styles.imageContainer}>
            <Image source={require('../../assets/pp1.png')} style={styles.images} />
            <Image source={require('../../assets/pp3.png')} style={styles.images} />
            <Image source={require('../../assets/pp1.png')} style={styles.images} />
            <Image source={require('../../assets/pp3.png')} style={styles.images} />


          </View>
        </TouchableOpacity>

        <View style={styles.boxContainer}>
        
        <Pressable
            style={[styles.box, styles.outPatient]}
            onPress={() => navigation.navigate('EmergencyActivePeopleList')}
          >
            <View style={styles.boxContent}>
              <Image
                source={require('../../assets/plus.svg')}
                style={styles.boxImage}
                resizeMode="contain"
              />
              <Text style={styles.boxText}>Active {'\n'}Patient List</Text>
              <TouchableOpacity style={[styles.closeButton, styles.rotatedIcon2]}>
                <Icon name="arrow-upward" size={24} color="#FFA500" />
              </TouchableOpacity>
            </View>
          </Pressable>

       
          <Pressable style={[styles.box, styles.inPatient]}>
            <View style={styles.boxContent}>
            <Image
                source={require('../../assets/Clip path group.png')}
                style={styles.boxImage}
                resizeMode="contain"
              />
              <Text style={styles.boxText}>Discharge {'\n'}Patient List</Text>
              <View style={styles.moveEnd}>

              <TouchableOpacity style={[styles.closeButton, styles.rotatedIcon2]}>
                <Icon name="arrow-upward" size={24} color="#FFA500" />
              </TouchableOpacity>
              </View>
            </View>
            
          </Pressable>
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.headingText}>Latest Patient Data</Text>
          <Text style={styles.seeAllText}>See All</Text>
        </View>

        <View style={styles.subContainer}>
          <View style={styles.subimageContainer}>
            <Image
              source={require('../../assets/person.avif')} // Replace with your image path
              style={styles.personImage}
            />
            <View style={styles.iconContainer}>
              <Text style={styles.uhidText}>UH ID: 2456</Text>
              <TouchableOpacity style={[styles.closeButton, styles.rotatedIcon2]}>
                <Icon name="arrow-upward" size={24} color="#FFA500" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.uhidText}>
              Patient: <Text style={styles.patientText}>Jones Doe</Text>
            </Text>

            <View style={styles.dateTimeContainer}>
              <Icon name="access-time" size={16} color="#000" style={styles.clockIcon} />
              <Text style={styles.dateText}>April 10, 2024 | 10:00 AM</Text>
            </View>
          </View>

        </View>


        <View style={styles.subContainer}>
          <View style={styles.subimageContainer}>
            <Image
              source={require('../../assets/person3.avif')} // Replace with your image path
              style={styles.personImage}
            />
            <View style={styles.iconContainer}>
              <Text style={styles.uhidText}>UH ID: 2456</Text>
              <TouchableOpacity style={[styles.closeButton, styles.rotatedIcon2]}>
                <Icon name="arrow-upward" size={24} color="#FFA500" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.uhidText}>
              Patient: <Text style={styles.patientText}>Jones Doe</Text>
            </Text>

            <View style={styles.dateTimeContainer}>
              <Icon name="access-time" size={16} color="#000" style={styles.clockIcon} />
              <Text style={styles.dateText}>April 10, 2024 | 10:00 AM</Text>
            </View>
          </View>

        </View>


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
  imgcontent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 350, //350 
    height: 150,//150
    marginBottom: 8,
    marginTop: 5,
  },

  cardContainer: {
    backgroundColor: "#55abed",
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
    marginLeft: '20px'
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
    textAlign: "right",
  },
  subText: {
    marginTop: 8,
    fontSize: 16,
    width: "180px",
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
    margin: 15
  },
  personImage: {
    width: 70,
    height: 70,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    marginTop: "-50px"
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
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 5,
  },
  box: {
    width: '45%', // Adjust width as needed
    marginBottom: 20,
    height: height * 0.2,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3, // For shadow effect on Android
    backgroundColor: '#fff',
  },
  boxContent: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    
  },
  outPatient: {
    backgroundColor: '#69FFFF',
  },
  inPatient: {
    backgroundColor: '#FF69B4',
  },
  boxText:{
    fontSize:24,
    color:"white",
    fontWeight:"bold"
  },
  arrowContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  boxImage: {
    width: 50,
    height: 50,
  },
 
});

export default EmergencyDashboard;
