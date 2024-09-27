import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert ,TextInput,TouchableOpacity, ScrollView,Pressable,Dimensions, FlatList ,Modal} from 'react-native'; // Added Image import
import Header from '../Dashboard/Header';
import Sidebar from '../Dashboard/Sidebar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Footer from './Footer';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {  SCOPE_LIST } from '../../utility/role';
import { authFetch } from '../../axios/authFetch';
import { authPost } from '../../axios/authPost';
const { height } = Dimensions.get('window'); // Get screen height
import Toast from 'react-native-toast-message';


const OtDashboard = ({ onNotificationPress }) => {
  const user = useSelector((state) =>state.currentUserData)
  const currentPatient = useSelector((state) => state.currentPatientData);

  const  userType=useSelector((state)  => state.userType)
  const dispatch = useDispatch()

  const navigation = useNavigation();
  const [sidebarVisible, setSidebarVisible] = useState(false);
 
const [alertsData, setAlertsData] = React.useState([]);
const [rejectReason, setRejectReason] = React.useState("");
const [visible, setVisible] = useState(false);
const [patientStage, setPatientStage]=useState(0)
const [currentPatientTimelineId,setCurrentPatientTimelineId]=useState(null)

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

 


  const OTUserTypes = {
    ANESTHETIST: "ANESTHETIST",
    SURGEON: "SURGEON",
  };

  const OTPatientStages = {
    PENDING: 1,
    APPROVED: 2,
    SCHEDULED: 3,
    OPERATED: 4,
  };
 
  useEffect(() => {
    const userScopes = user?.scope?.split("#");
    if (userScopes) {
      const scopes = userScopes.map((n) => Number(n));
      if (scopes.includes(SCOPE_LIST.anesthetist)) {
        dispatch({type:"userType", payload:OTUserTypes.ANESTHETIST})
      } else if (scopes.includes(SCOPE_LIST.surgeon)) {
        dispatch({type:"userType", payload:OTUserTypes.SURGEON})

      }
    }
  }, [userType, user?.scope]);


  useEffect(() => {
    let status = "";
    if (userType === OTUserTypes.ANESTHETIST) {
      status = "pending";
    } else {
      status = "approved";
    }
    if (user.token) {
      async function getAlertsData() {
        try {
          const res = await authFetch(
            `ot/${user.hospitalID}/${status}/getAlerts`,
            user.token
          );
          if (res.status === 200) setAlertsData(res.data);
        } catch (err) {
          // console.log(err);
        }
      }
      getAlertsData();
    }
  }, [user.hospitalID, user.token, userType]);


    const currentDate = new Date();

    // Format the date as 'MMM DD, YYYY' (e.g., 'Oct 10, 2024')
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  
    // Format the time as 'hh:mm AM/PM' (e.g., '10:00 AM')
    const formattedTime = currentDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const handlePress = () => {
      navigation.navigate('Profile'); // Navigates to the "Profile" screen
    };



    //=====getPatientStatus========
    useEffect(() => {
      async function getPatientStatus() {
        try {
          
          const res = await authFetch(
            `ot/${user.hospitalID}/${currentPatientTimelineId}/getStatus`,
            user.token
          );
          if (res.status === 200) {
            const patientStatus =
              res.data[0].status.toUpperCase()   ;
            setPatientStage(OTPatientStages[patientStatus]);
          }
        } catch (err) {
          // console.log(err);
        }
      }
      if (user.token && user.hospitalID &&  currentPatientTimelineId) {
        getPatientStatus();
      }
    }, [setPatientStage, user.token, user.hospitalID, currentPatient,currentPatientTimelineId]);
  

    const isInitialTabsAPICallAllowed = () => {
      //const { patientStage, userType } = get();
      return (
        patientStage === OTPatientStages.PENDING &&
        userType === OTUserTypes.ANESTHETIST
      );
    };
    
   
    const submitHandler =  useCallback(
    (status) => {
       
        const preopRecordData = {
          notes: "",  
          tests: [],  
          medications: {         
            capsules: [],
            syrups: [],
            tablets: [],
            injections: [],
            ivLine: []
          },
          arrangeBlood: false,
          riskConsent:false,
        };
  
        if (status == "rejected" && rejectReason.length == 0) {
          Alert.alert(
            "Error",                  
            "Please Enter reason",     
            [{ text: "OK" }]          
          );
          return 
        }
  
        const postPreOpRecord = async () => {
          try {
           
            const response = await authPost(
              `ot/${user.hospitalID}/${currentPatientTimelineId}/${user.id}/preopRecord`,
              {
                preopRecordData: preopRecordData,
                status: status,
                rejectReason: rejectReason,
              },
              user.token
            );
            if (response.status === 201) {
             
              Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Success',
                text2: `Successfully Surgery ${status}`,
                visibilityTime: 4000,
                autoHide: true,
                bottomOffset: 40,
              });
              
             // navigate("/hospital-dashboard/ot");
            } else {
              Alert.alert(
                "Error",                  
                "PreOpRecord Failed",     
                [{ text: "OK" }]          
              );
            }
          } catch (err) {
            // console.log(err);
          }
          setVisible(false); // Close the modal after submission
          setRejectReason("");
        };
        if (isInitialTabsAPICallAllowed()) { 
          postPreOpRecord();
        }
      },[currentPatientTimelineId, user.hospitalID,
        user.id,
        isInitialTabsAPICallAllowed,
        rejectReason,
      user.token, navigation ])
     



    
  const handleReasonData = (text) => {
    setRejectReason(text);
  };

 

  const onClose = () => {
    setVisible(false);
    setRejectReason(""); 
  };
  
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const backgroundColor = getRandomColor();

  const renderPatient = ({ item }) => {
    const backgroundColor = getRandomColor();
    return (
      <TouchableOpacity
        style={styles.recentPatientContainer}
        onPress={() =>
          navigation.navigate('PreOpRecord', {
            patientId: item.patientID,
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
              <Text style={styles.recentPatientDateText}>
  {new Date(item.addedOn).toDateString()}   {new Date(item.addedOn).toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true,
     timeZone: 'UTC'
   
  })}
</Text>

            </View>
            <Text style={styles.recentPatient}>
               Surgery Type:
              <Text style={styles.recentPatientName}> {item.surgeryType}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.recentPatientRow}>
          <Text style={styles.recentPatientUhidText}>{item.pUHID}</Text>
          <TouchableOpacity style={styles.recentPatientCloseButton}>
            <Icon name="arrow-upward" size={24} color="#FFA500" />
          </TouchableOpacity>
        </View>
        <View style={styles.btncontainer}>
      {/* Reject Button */}
      <TouchableOpacity 
  style={styles.rejectButton} 
  onPress={() => {
    setVisible(true); 
    setCurrentPatientTimelineId(item.patientTimeLineID);
  }}
> 
  <Text style={styles.rejectbuttonText}>Reject</Text>
</TouchableOpacity>


      {/* Accept Button */}
      <TouchableOpacity style={styles.acceptButton}>
        <Text style={styles.acceptButtonText} onPress={() => {
          setCurrentPatientTimelineId(item.patientTimeLineID);
    submitHandler("approved");
  }} >Accept</Text>
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
      
      <View style={styles.card}>
      {/* Doctor and Specialist Info */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Good morning</Text>
          <Text style={styles.name}>DR. {user.firstName}</Text>
        </View>
        <View style={styles.imageContainer}>
      <TouchableOpacity onPress={handlePress}>
        {user.imageURL ? (
          <Image source={{ uri: user.imageURL }} style={styles.profileImage} />
        ) : (
          <View style={[styles.placeholderImage, { backgroundColor }]}>
            <Text style={styles.placeholderText}>
              {user.firstName ? user.firstName.charAt(0).toUpperCase() : ''}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.specialist}>Surgeon Specialist</Text>
    </View>
      </View>

      {/* Surgery Info */}
      <View style={styles.section}>
        <Icon name="calendar-today" size={24} color="dodgerblue" />
        <Text style={styles.sectionText}>Today Surgery</Text>
      </View>

      {/* Patient Info */}
      <View style={styles.topContainer}>
      <View style={styles.patientInfo}>
        {/* <View style={styles.patientRow}>
          <Icon name="person" size={20} color="black" />
          <Text style={styles.patientText}>Patient: John Doe</Text>
        </View> */}
        <Text style={styles.surgeryType}>Neuro Surgery</Text>
      </View>

      {/* Time and Date Info */}
      <View style={styles.timeInfo}>
      <View style={styles.dateRow}>
        <Icon name="access-time" size={20} color="dodgerblue" />
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      <Text style={styles.time}>{formattedTime}</Text>
    </View>
      </View>
     
    </View>
        

        <View style={styles.boxContainer}>
        
        <Pressable
            style={[styles.box, styles.outPatient]}
            onPress={() => navigation.navigate('EmergencyPatientList')}
          >
            <View style={styles.boxContent}>
              <Image
                source={require('../../assets/plus.svg')}
                style={styles.boxImage}
                resizeMode="contain"
              />
              <Text style={styles.boxText}>Emergency {'\n'}Patient List</Text>
              <TouchableOpacity style={[styles.closeButton, styles.rotatedIcon2]}>
                <Icon name="arrow-upward" size={24} color="#FFA500" />
              </TouchableOpacity>
            </View>
          </Pressable>

       
          <Pressable style={[styles.box, styles.inPatient]}
            onPress={() => navigation.navigate('ElectivePatientList')}

          >
            <View style={styles.boxContent}>
            <Image
                source={{}}
                style={styles.boxImage}
                resizeMode="contain"
              />
              <Text style={styles.boxText}>Elective {'\n'}Patient List</Text>
              <View style={styles.moveEnd}>

              <TouchableOpacity style={[styles.closeButton, styles.rotatedIcon2]}>
                <Icon name="arrow-upward" size={24} color="#FFA500" />
              </TouchableOpacity>
              </View>
            </View>
            
          </Pressable>
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.headingText}>Proposed Surgery Alert</Text>
          <Text style={styles.seeAllText}>See All</Text>
        </View>

      
        
    <FlatList
      data={alertsData}
      renderItem={renderPatient}
      keyExtractor={(item) => item.id.toString()}
    />



 {/* ====================dailog box for reject============== */}
 <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.dialogContainer}>
          <Text style={styles.title}>Write a Reason for Rejection</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Reason"
            multiline
            numberOfLines={4}
            value={rejectReason}
            onChangeText={handleReasonData}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={() => submitHandler("rejected")}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
  <Text style={styles.buttonText}>Cancel</Text>
</TouchableOpacity>

          </View>
        </View>
      </View>
    </Modal>


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
 
 
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    margin:15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,

  },
  greeting: {
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
    marginBottom: 5,

  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  imageContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  specialist: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  sectionText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'dodgerblue',
  },
  patientInfo: {
    marginBottom: 10,
  },
  patientRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  patientText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#000',
  },
  surgeryType: {
    color: 'orange',
    fontWeight: 'bold',
    marginTop: 3,
    fontSize: 16,
  },
 
 
  timeInfo: {
    flexDirection: 'column', // Ensures dateRow and time are stacked vertically
    alignItems: 'flex-start', // Aligns items to the left
  },
  dateRow: {
    flexDirection: 'row', // Icon and date are in a row
    alignItems: 'center',
  },
  date: {
    marginLeft: 10,
    fontSize: 17,
    color: '#95c0f9',
    fontWeight: 'bold',
  },
  time: {
    marginTop: 5, // Adds space between date row and time
    fontSize: 16,
    color: '#95c0f9',
    fontWeight: 'bold',
  },
  topContainer: {
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-between', // Space between items
    alignItems: 'center', // Center items vertically
    marginBottom: 10, // Optional: space below the container
  },
  btncontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  rejectButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth:1,
    borderBlockColor:'red'
  },
  acceptButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  rejectbuttonText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  acceptButtonText: {
    color: 'white', // White text color for accept button
    fontSize: 16,
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  dialogContainer: {
    width: '80%', // Adjust width as needed
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5, // For Android shadow
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'lightgray', // Example background color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center', // Center text horizontally
    marginLeft: 10, // Space between buttons if in a row
  },
 
 
});

export default OtDashboard;
