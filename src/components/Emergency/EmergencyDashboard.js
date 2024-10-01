import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView,Pressable,Dimensions, FlatList , TextInput} from 'react-native'; // Added Image import
import Header from '../Dashboard/Header';
import Sidebar from '../Dashboard/Sidebar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Footer from './Footer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { patientStatus } from '../../utility/role';
import { authFetch } from '../../axios/authFetch';
const { height } = Dimensions.get('window'); // Get screen height

const EmergencyDashboard = ({ onNotificationPress }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const [recentPatient, setRecentPatient] = useState([])
const user = useSelector((state) =>state.currentUserData)
const currentZone = useSelector((state) =>state.currentZone)

const [allList, setAllList] = React.useState([]);
const [search, setSearch] = React.useState("");


  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const navigateToVisualization = () => {
    navigation.navigate('EmergencyDataVisualization');
  };

  
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
          navigation.navigate('RedZonePatientProfile',{
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
  
  let zoneType=''
  if (currentZone === 'red') {
   zoneType = '1';
 } else if (currentZone === 'yellow') {
   zoneType = '2';
 } else if (currentZone === 'green') {
   zoneType = '3';
 }

  const getRecentData = async() => {
    const response = await authFetch(`patient/${user.hospitalID}/patients/recent/${patientStatus.emergency}?zone=${zoneType}`, user.token);
    if (response.message == "success") setRecentPatient(response.patients);
  }

  useEffect(()  => {
    getRecentData()
  },[currentZone])

    // background color based on the current zone
    const getBackgroundColor = () => {
      switch (currentZone) {
        case 'red':
          return 'red';
        case 'yellow':
          return 'yellow';
        case 'green':
          return 'green';
        default:
          return 'gray'; // Default color if no zone matches
      }
    };


     const getAllPatient = useCallback(
    async function () {
      setAllList([]);

      const opdListResponse = await authFetch(
        `patient/${user.hospitalID}/patients/${String(
          patientStatus.emergency
        )}?zone=${zoneType}`,
        user.token
      );
      if (opdListResponse.message == 'success') {
        setAllList(() => {
          return [...opdListResponse.patients];
        });
      }
    },
    [user.hospitalID, user.token]
  );

  React.useEffect(() => {
    if (user.token) getAllPatient();
  }, [getAllPatient, user, currentZone]);
  
  console.log("response===",recentPatient)
  const data = allList.filter((el) => String(el.phoneNumber).includes(search))

  return (
    <View style={styles.container}>
      <Header toggleSidebar={toggleSidebar} onNotificationPress={onNotificationPress} />
      <Sidebar isVisible={sidebarVisible} onClose={toggleSidebar} />

      {/* Adjusted to center the image and added a welcome message */}
      <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.redcontainer}>
      <View style={[styles.redbox, { backgroundColor: getBackgroundColor() }]}>
        <Text style={styles.redtext}>{currentZone} </Text>
      </View>
      <View style={styles.searchInputContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search patient data..."
                        value={search} 
                        onChangeText={text => setSearch(text)} 
                    />
                    <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
                </View>
    </View>

{!search ? (
  <>

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


<Pressable style={[styles.box, styles.inPatient]}
  onPress={() => navigation.navigate('EmergencyDischargePeopleList')}

>
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



<FlatList
data={recentPatient}
renderItem={renderPatient}
keyExtractor={(item) => item.id.toString()}
/>

  </>
) : (
  <>
  <FlatList
data={data}
renderItem={renderPatient}
keyExtractor={(item) => item.id.toString()}
/>
  </>
)}






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
    borderRadius: 22,
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
  redcontainer: {
    flex: 1, // Ensures the container takes up the full screen
    justifyContent: 'flex-start', // Aligns children to the top
    alignItems: 'flex-start', // Aligns children to the left
    flexDirection:'row',
    marginTop:10,
  },
  redbox: {
    margin:8,
    padding: 10, // Add some padding inside the box
    borderRadius: 5, // Optional: rounds the corners of the box
  },
  redtext: {
    color: '#000', // White text color
    fontSize: 16, // Adjust font size as needed
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    margin:8,
    width:'75%'
},
searchInput: {
    flex: 1,
    height: '100%',
    paddingLeft: 10,
},
searchIcon: {
    paddingLeft: 10,
},
 
});

export default EmergencyDashboard;
