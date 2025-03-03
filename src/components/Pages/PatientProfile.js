import { View, Text, Image,Modal, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Icon from 'react-native-vector-icons/MaterialIcons';
import { authFetch } from "../../axios/authFetch";
import { useEffect, useState } from "react";
import BasicTabs from "../Emergency/BasicTabs";
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import Scanner from "../Scanner/Scanner";
import BleManager from 'react-native-ble-manager';


const { height } = Dimensions.get('window');

const PatientProfile = ({ route }) => {
    const dispatch = useDispatch()
    const { patientId } = route.params;
    const navigation = useNavigation()
    const [allHubs,setAllHubs] = useState([])

    const [modalVisible, setModalVisible] = useState(false);
    const [hubmodalVisible, setHubModalVisible] = useState(false);
  const [selectedHub, setSelectedHub] = useState('');
  const [hubId,setHubId] = useState(null)
  const [hubData, setHubData] = useState(null)

    const user = useSelector((state) => {
        return state.currentUserData
    })
    const currentPatientData = useSelector((state) => {
        return state.currentPatientData
    })

    const isRequestSurgeryDisabled = currentPatientData?.status !== null 

    const handleBackPress = () => {
        console.log("Can go back:", navigation.canGoBack()); // Check if it returns true or false
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate('EmergencyDashboard');
        }
    };



    const getCurrentPatient = async () => {
        const response = await authFetch(
            `patient/${user.hospitalID}/patients/single/${patientId}`,
            user.token
        );
        if (response.message == "success") {
            dispatch({ type: "currentPatientData", payload: response.patient })
        }
    }
// console.log("currentPatientData",currentPatientData)
    useEffect(() => {
        getCurrentPatient()
    }, [])

    const getAllHubs = async() => {
        const response = await authFetch(`hub/${user.hospitalID}`, user.token)
        console.log("getAllHubs========================",response.hubs)
        setAllHubs(response.hubs)
    }
    useEffect(() => {
      getAllHubs()
    },[user])


    const handleAddDevice = () => {
        console.log('Selected Hub:', selectedHub);
        setIsQROpen(true);
        setHubModalVisible(false);
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


    console.log("currentPatientData=====================================",currentPatientData)

    const writePatientIdToDevice = async (hubProtocolAddress, param1, param2, param3) => {
        try {
            // Convert the patient ID to a byte array using Buffer
          //  const data = Buffer.from(patientId, 'utf-8'); // Converts string to a buffer (byte array)

            // Write data to the characteristic
            await BleManager.write(hubProtocolAddress, param1, param2, param3); // Convert Buffer to an array

            console.log('Patient ID sent to the device successfully');
        } catch (error) {
            console.error('Error writing to device:', error);
        }
    };

    
const [isQROpen,setIsQROpen] = useState(false)
const handleScanComplete = (data) => {
  // setIsQROpen(false);
  console.log("Scanned Data:", data); // You can use this to handle scanned data as needed
  const hubProtocolAddress = hubData.hubProtocolAddress
  const param1 = currentPatientData.id
  const deviceid = data.split(',')[1];
  const param2= deviceid
const param3 = Math.floor(Math.random() * 1000);

  writePatientIdToDevice(hubProtocolAddress, param1, param2, param3);
};

const handleHubSelection = (itemValue) => {
    const selectedHubData = allHubs.find((hub) => hub.hubName === itemValue);  
    // Set the hub id and hub name
    setSelectedHub(itemValue);
    setHubId(selectedHubData ? selectedHubData.id : null); // Set hub id if found
  };


const getHubData = async() => {
    const response = await authFetch(`hub/${user.hospitalID}/${hubId}`,user.token)
    console.log("getHubData=============================",response.hub)
    setHubData(response.hub)
}

useEffect(() => {
    getHubData()
},[selectedHub])

console.log("setSelectedHub=======",selectedHub)
console.log("hubData=======",hubData)
    return (
       <>
       {isQROpen ? (
      <Scanner onScanComplete={handleScanComplete} />
       ) : (
         <View style={styles.container}>



         {/* Patient Information Section */}
         <View style={styles.patientInfoContainer}>
             {currentPatientData?.imageURL ? (
                 <Image source={{ uri: currentPatientData.imageURL }} style={styles.profileImage} />
             ) : (
                 <View style={[styles.placeholderImage, { backgroundColor }]}>
                     <Text style={styles.placeholderText}>
                         {currentPatientData?.pName ? currentPatientData.pName.charAt(0).toUpperCase() : ''}
                     </Text>
                 </View>
             )}
             <View style={styles.infoContainer}>
                 <View style={styles.infoRow}>
                     <Text style={styles.label}>Name</Text>
                     <Text style={styles.colon}>:</Text>
                     <Text style={styles.value}>{currentPatientData?.pName}</Text>
                 </View>
                 <View style={styles.infoRow}>
                     <Text style={styles.label}>ID</Text>
                     <Text style={styles.colon}>:</Text>
                     <Text style={styles.value}>{currentPatientData?.id}</Text>
                 </View>
                 <View style={styles.infoRow}>
                     <Text style={styles.label}>Doctor Name</Text>
                     <Text style={styles.colon}>:</Text>
                     <Text style={styles.value}>
                         {currentPatientData?.doctorName ? currentPatientData.doctorName : 'Unassigned'}
                     </Text>
                 </View>
                 <View style={styles.infoRow}>
                     <Text style={styles.label}>Admit Date</Text>
                     <Text style={styles.colon}>:</Text>
                     <Text style={styles.value}>
                         {currentPatientData?.startTime ? new Date(currentPatientData.startTime).toLocaleDateString() : 'Not Available'}
                     </Text>
                 </View>
                 <View  style={styles.shakecontainer}>
                 <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconContainer}>
    
                 <Image source={require("../../assets/transfer/X.png")} style={styles.reverseImage} />
   </TouchableOpacity>
   <TouchableOpacity style={styles.buttonContainer} onPress={() => setHubModalVisible(true)}>
    
    <Text style={styles.buttonText}>+ Add Device</Text>
</TouchableOpacity>
                 </View>
             </View>
         </View>

         <View style={styles.tabsContainer}>
             <BasicTabs />
         </View>

         <Modal
     animationType="slide"
     transparent={true}
     visible={modalVisible}
     onRequestClose={() => setModalVisible(false)}
   >
     <View style={styles.modalBackground}>
       <View style={styles.modalContainer}>
         <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
           <Icon name="close" size={30} color="black" />
         </TouchableOpacity>

         <Text style={styles.modalTitle}>Select Options</Text>
         
         {/* Options */}
         <View style={styles.optionContainer}>
<View style={styles.row}>
<TouchableOpacity
   style={styles.option}
   onPress={() => navigation.navigate('Handshake')} 
 >
   <Image source={require("../../assets/transfer/Transfer.png")} style={styles.optionIcon} />
   <Text style={styles.optionText}>Hand Shake</Text>

{currentPatientData?.ptype !== 1 && (
 <View style={styles.row}>
 <TouchableOpacity
  style={styles.option}
//  onPress={() => navigation.navigate('RequestSurgery')}
 onPress={isRequestSurgeryDisabled ? null : () => navigation.navigate('RequestSurgery')} 

  >
    {isRequestSurgeryDisabled  ? (
   <Image source={require("../../assets/transfer/Threerequestdisable.png")} style={styles.optionIcon} />

    ):(
   <Image source={require("../../assets/transfer/Three request.png")} style={styles.optionIcon} />

    )}
   <Text style={styles.optionText}>Request</Text>

 </TouchableOpacity>

 <TouchableOpacity 
 style={styles.option}
 onPress={() => navigation.navigate('TransferPatient')} 

 >
   <Image source={require("../../assets/transfer/Two transfer.png")} style={styles.optionIcon} />
   <Text style={styles.optionText}>Transfer</Text>
 </TouchableOpacity>
</View>


{currentPatientData?.ptype !== 1 && (
<View style={styles.row}>
<TouchableOpacity
style={styles.option}
onPress={() => navigation.navigate('RequestSurgery')} 

>
<Image source={require("../../assets/transfer/Three request.png")} style={styles.optionIcon} />
<Text style={styles.optionText}>Request</Text>
</TouchableOpacity>

<TouchableOpacity 
style={styles.option}
onPress={() => navigation.navigate('DischargePatient')} 

>
<Image source={require("../../assets/transfer/medical-icon_i-outpatient.png")} style={styles.optionIcon} />
<Text style={styles.optionText}>Discharge</Text>
</TouchableOpacity>
</View>
)}

</View>

       </View>
     </View>
   </Modal>

   {/* Modal with dropdown to select a hub */}
   <Modal
     animationType="slide"
     transparent={true}
     visible={hubmodalVisible}
     onRequestClose={() => setHubModalVisible(false)}
   >
     <View style={styles.modalOverlay}>
       <View style={styles.modalContent}>
         <Text style={styles.modalTitle}>Select a Hub</Text>

         {/* Dropdown (Picker) for selecting a hub */}
         <View style={styles.pickerContainer}>
         <Picker
           selectedValue={selectedHub}
           style={styles.picker}
           onValueChange={handleHubSelection}
         >
           <Picker.Item label="Select Hub" value="" />
           {allHubs.map((hub) => (
 <Picker.Item key={hub.id} label={hub.hubName} value={hub.hubName} />
))}
         </Picker>
         </View>
        

         {/* Submit and Cancel buttons */}
         <View style={styles.buttonContainer2}>
           <TouchableOpacity style={styles.submitButton} onPress={handleAddDevice}>
             <Text style={styles.buttonText}>Add</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.cancelButton} onPress={() => setHubModalVisible(false)}>
             <Text style={styles.buttonText}>Cancel</Text>
           </TouchableOpacity>
         </View>
       </View>
     </View>
   </Modal>

     </View>
       )}
       </>

       
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1977f3',
        paddingTop: 1, // Adjust for header height
        // paddingHorizontal: 20,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#1977f3',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    backIcon: {
        position: 'absolute',
        left: 10,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    patientInfoContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginBottom: 20,
    },
    infoContainer: {
        width: '100%', // Ensures that the container takes full width
        alignItems: 'center', // Center-aligns the content horizontally
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '80%',
    },
    label: {
        fontSize: 18,
        color: '#fff',
        width: 120, // Adjust width as needed to align labels
    },
    colon: {
        fontSize: 18,
        color: '#fff',
        paddingHorizontal: 5, // Adjust the spacing around the colon
    },
    value: {
        fontSize: 18,
        color: '#fff',
        flex: 1,
    },
    placeholderImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    placeholderText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: "bold",
    },
    tabsContainer: {
        backgroundColor: '#fff',//#fff
        borderRadius: 24,
        padding: 10,
        marginTop: 20,
        height: height * 0.7,
        alignItems: 'center',
        width: "100%",
    },
    shakecontainer: {
        flexDirection: 'row', // Ensure child elements are aligned horizontally
        justifyContent: 'flex-end', // Align elements to the right
        alignItems: 'center', // Center align vertically
        width: '100%', // Ensure the container takes the full width
      },
      iconContainer: {
        flexDirection: 'row', // Ensure icon and text are aligned horizontally
        alignItems: 'center',
        marginRight:20,
      },
      modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
      },
      closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
      },
      option: {
        alignItems: 'center',
        marginVertical: 15,
      },
      optionIcon: {
        width: 50,
        height: 50,
        marginBottom: 10,
      },
      optionText: {
        fontSize: 16,
        textAlign: 'center',
      },
      reverseImage:{
        height:30,
        width:30,
        resizeMode: 'contain',
      },
      buttonContainer: {
        backgroundColor: 'orange', // Set your preferred background color
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 18,
        alignItems: 'center',
        marginRight:5,
      },
      buttonText: {
        color: '#fff', // White text color for contrast
        fontSize: 16,
        fontWeight: 'bold',
      },
      modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignItems: 'center',
      },
      picker: {
        width: '100%',
        height: 30,
        marginBottom: 20,
      },
      submitButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
       margin:10,
        alignItems: 'center',
      },
      cancelButton: {
        backgroundColor: '#FF3B30',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        margin:10,
        alignItems: 'center',
      },
      buttonContainer2: {
       flexDirection:'row',
        padding: 15,
        borderRadius: 10,
      },
      pickerContainer: {
        width: '100%',
        borderWidth: 1, // Add border width
        borderColor: '#ccc', // Add border color
        borderRadius: 5, // Optional: add rounded corners
        overflow: 'hidden', // Keeps the rounded border clean
        marginBottom: 20,
      },
})
export default PatientProfile