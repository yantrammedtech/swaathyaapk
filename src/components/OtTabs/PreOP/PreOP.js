import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView , Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { authFetch } from '../../../axios/authFetch';
import { useSelector } from 'react-redux';
import { authPost } from '../../../axios/authPost';
import Toast from 'react-native-toast-message';
import PostOpMedication from './PostOpMedication';



const reports = [];

// const medicineList = [{"addedOn": "2024-09-25T10:48:36.000Z", "daysCount": 5, "doseCount": 100, "doseTimings": "16:18", "id": 1871, "lastModified": "2024-09-25T10:48:36.000Z", "medicationTime": "After Breakfast", "medicineName": "mnil 10mg tablet", "medicineType": 2, "notes": "", "timeLineID": 2404, "userID": 378},]

const medicineList = []
const PreOp = () => {
  const user = useSelector((state) =>state.currentUserData)
  const currentPatient = useSelector((state) => state.currentPatientData);
  const patientTimeLineID = currentPatient?.patientTimeLineID;
  const  userType=useSelector((state)  => state.userType)

  const navigation = useNavigation()

    const [arrangeBlood, setArrangeBlood] = useState(false);
    const [riskConsent, setRiskConsent] = useState(false)
    const [selectedTab, setSelectedTab] = useState("Tests");
    const [rejectReason, setRejectReason] = React.useState("");
const [visible, setVisible] = useState(false);
const [notes, setNotes] = useState('');
const [patientStage, setPatientStage]=useState(0)

const [modalVisible, setModalVisible] = useState(false);
const  [medicineList, setMedicineList] = useState([])

const [medications, setMedications] = useState({
    capsules: [],
    syrups: [],
    tablets: [],
    injections: [],
    ivLine: [],
    tubing: [],
    topical: [],
    drop: [],
    spray: [],
  });




 // Function to categorize the received medication data
 const categorizeMedication = (medData) => {
  const updatedMedications = { ...medications };
  medData.forEach((item) => {
    // Find the correct category based on the medicineType
    const category = Object.keys(medicineCategory).find(
      (key) => medicineCategory[key] === item.medicineType
    );

    if (category && medications[category]) {
      // Push the medication data into the corresponding category array
      updatedMedications[category].push(item);
    }
  });
  setMedications(updatedMedications); 
};

const handleCloseModal = () => {
  setModalVisible(false);
};

const handleSaveMed = () => {
  setModalVisible(false);
};


const handleMedData  = (data) => {
  const receivedMedData = data
categorizeMedication(receivedMedData);
setMedicineList(receivedMedData)

}

const medicineCategory = {
  capsules: 1,
  syrups: 2,
  tablets: 3,
  injections: 4,
  ivLine: 5,
  Tubing: 6,
  Topical: 7,
  Drops: 8,
  Spray: 9,
};

    // Toggle function for button click
    const handleArrangeBloodClick = () => {
      setArrangeBlood(!arrangeBlood);
    };

    const handleRiskClick = () => {
      setRiskConsent(!riskConsent);
    };

  const renderItem = ({ item }) => (
    <View style={styles.reportItem}>
      <View style={styles.fileIconContainer}>
        <Icon name={item.fileIcon} size={30} color={item.fileColor} />
      </View>
      <View style={styles.reportDetails}>
        <Text style={styles.reportTitle}>{item.title}</Text>
        <Text style={styles.reportSubtitle}>ICD Code: {item.icdCode}</Text>
        <Text style={styles.reportSubtitle}>{item.submittedBy}</Text>
      </View>
      <TouchableOpacity style={styles.downloadIcon}>
        <Icon name="download" size={24} color="blue" />
      </TouchableOpacity>
    </View>
  );


  
    
  const handleReasonData = (text) => {
    setRejectReason(text);
  };


  const onClose = () => {
    setVisible(false);
    setRejectReason(""); 
  };

  
  const OTPatientStages = {
    PENDING: 1,
    APPROVED: 2,
    SCHEDULED: 3,
    OPERATED: 4,
  };

  
const OTUserTypes = {
  ANESTHETIST: "ANESTHETIST",
  SURGEON: "SURGEON",
};

useEffect(() => {
  async function getPatientStatus() {
    try {
      
      const res = await authFetch(
        `ot/${user.hospitalID}/${patientTimeLineID}/getStatus`,
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
  if (user.token && user.hospitalID &&  patientTimeLineID) {
    getPatientStatus();
  }
}, [setPatientStage, user.token, user.hospitalID, currentPatient,patientTimeLineID]);



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
          notes,  
          tests: [],  
          medications:medications,
          arrangeBlood,
          riskConsent,
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
              `ot/${user.hospitalID}/${patientTimeLineID}/${user.id}/preopRecord`,
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
      },[patientTimeLineID, user.hospitalID,
        user.id,
        isInitialTabsAPICallAllowed,
        rejectReason,
      user.token, navigation ])

  const handleNext = () => {
    navigation.navigate("PreOpRecordAfterSchedule")
  }

  
  const handleScheduleNext = () => {
    navigation.navigate("Schedule")
  }

  const getOTData = async () => {
    try {
      const response = await authFetch(
        `ot/${user.hospitalID}/${patientTimeLineID}/getOTData`,
        user.token
      );
      if (response.status == 200) {
        const physicalExaminationData = response.data[0].physicalExamination;
      
        const preOPData = response.data[0].preopRecord;
        setArrangeBlood(preOPData.arrangeBlood)
        setRiskConsent(preOPData.riskConsent)
        setNotes(preOPData.notes)
        
      }
    } catch (error) {
      // console.log("error");
    }
  };

  React.useEffect(() => {
    getOTData()
  },[patientTimeLineID,currentPatient ])



   
const isAnesthesiaFormVisible = () => {
  if (
    patientStage > OTPatientStages.APPROVED &&
    userType === OTUserTypes.ANESTHETIST
  )
    return true;
  if (
    patientStage >= OTPatientStages.SCHEDULED &&
    userType === OTUserTypes.SURGEON
  )
    return true;
  return false;
};

  useEffect(() => {
    isAnesthesiaFormVisible()

  },[patientStage, userType, user, currentPatient])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
       
        <View style={styles.lastFeedContainer}>
          <Icon name="access-time" size={18} color="gray" />
          <Text style={styles.lastFeedText}>Last Feed at 01:30</Text>
        </View>
       <TouchableOpacity
        style={[
          styles.arrangeBloodButton,
          arrangeBlood && styles.arrangedBloodButton, // Apply blue border if toggled
          currentPatient.status === 'approved' && styles.disabledButton
        ]}
        onPress={handleArrangeBloodClick}
        disabled={currentPatient.status === 'approved'}
      >
        {arrangeBlood ? (
          <Icon name="check" size={20} color="blue" style={styles.arrangeBloodIcon} />
        ) : null}
        <Text
          style={[
            styles.arrangeBloodText,
            arrangeBlood && { color: 'blue' }, // Change text color to blue if toggled
          ]}
          disabled={currentPatient.status === 'approved'}
        >
          Arrange Blood
        </Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={[
          styles.arrangeBloodButton2,
          riskConsent && styles.arrangedBloodButton, // Apply blue border if toggled
        ]}
        onPress={handleRiskClick}
      >
        {riskConsent ? (
          <Icon name="check" size={20} color="blue" style={styles.arrangeBloodIcon} />
        ) : null}
        <Text
          style={[
            styles.arrangeBloodText,
            riskConsent && { color: 'blue' }, // Change text color to blue if toggled
          ]}
        >
         Written Informed Consent/High Risk Consent

        </Text>
      </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "Tests" ? styles.activeTab : styles.inactiveTab,
            styles.categoryButton,
          ]}
          onPress={() => setSelectedTab("Tests")}
        >
          <Text style={selectedTab === "Tests" ? styles.activeTabText : styles.inactiveTabText}>
            Tests
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "Pre medication" ? styles.activeTab : styles.inactiveTab,
            styles.categoryButton,
          ]}
          onPress={() => setSelectedTab("Pre medication")}
        >
          <Text
            style={selectedTab === "Pre medication" ? styles.activeTabText : styles.inactiveTabText}
          >
            Pre medication
          </Text>
        </TouchableOpacity>
      </View>

    
    {selectedTab === 'Tests' ? (
        <>
        <FlatList
        data={reports}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.reportList}
      />

      <View style={styles.noteContainer}>
        <TextInput
          placeholder="Note"
          style={styles.noteInput}
          value={notes}  // Bind the value of the input to the state
          onChangeText={(text) => setNotes(text)}
          editable={currentPatient.status !== "approved"} 
        />
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={() => setSelectedTab('Pre medication')}>
      <Text style={styles.nextButtonText}>NEXT</Text>
      </TouchableOpacity>
        </>
    ):(
        <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContentContainer}
      >
       

        
       <View style={styles.imgcontainer}>
  <TouchableOpacity onPress={() => setModalVisible(true)}>
    <Image
      source={require('../../../assets/Frame 3473.png')} // Make sure this path is correct
      style={styles.botIcon}
    />
  </TouchableOpacity>
</View>

  <PostOpMedication
        visible={modalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveMed}
        medData={handleMedData}
      />
  
        {/* Treatment Card */}
  
        {medicineList?.map((medicine) => (
          <View style={styles.card} key={medicine.id}>
            <View style={styles.headerRow}>
              <Icon name="medication" size={30} color="orange" />
              <View style={styles.medicineInfo}>
                {/* Medicine Name */}
                <Text style={styles.medicineName}>{medicine.medicineName}</Text>
  
                {/* Duration */}
                <View style={styles.detailRow}>
                  <Text style={styles.detailText}>
                    Duration:
                    <Text style={styles.boldText}>
                      {" "}
                      {medicine.daysCount} day{medicine.daysCount > 1 ? "s" : ""}
                    </Text>
                  </Text>
                </View>
  
                {/* No. of Doses */}
                <View style={styles.detailRow}>
                  <Text style={styles.detailText}>
                    No. of Doses:
                    <Text style={styles.boldText}>
                      {medicine.doseCount} {medicine.doseUnit}
                    </Text>
                  </Text>
                </View>
  
                {/* Medication Time */}
                <View style={styles.detailRow}>
                  <Icon name="schedule" size={20} color="grey" />
                  <Text style={styles.detailText}>
                    Time:{" "}
                    <Text style={styles.boldText}>{medicine.medicationTime}</Text>
                  </Text>
                </View>
              </View>
  
              {/* Prescribed By Section */}
              <View style={styles.prescribedByContainer}>
                <Text style={styles.prescribedText}>Prescribed by</Text>
                <TouchableOpacity onPress={() =>{} }>
                  <Text style={styles.doctorName}>{medicine.userID}</Text>
                </TouchableOpacity>
              </View>
  
             
            </View>
          </View>
        ))}

<View style={styles.noteContainer}>
        <TextInput
          placeholder="Note"
          style={styles.noteInput}
          value={notes}  // Bind the value of the input to the state
          onChangeText={(text) => setNotes(text)}
          editable={currentPatient.status !== "approved"} 
        />
      </View>


{  patientStage === OTPatientStages.PENDING &&
          userType === OTUserTypes.ANESTHETIST && (
            <View style={styles.btncontainer}>
            {/* Reject Button */}
            <TouchableOpacity 
        style={styles.rejectButton} 
        onPress={() => {
          setVisible(true); 
        }}
      > 
        <Text style={styles.rejectbuttonText}>Reject</Text>
      </TouchableOpacity>
      
      
            {/* Accept Button */}
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.acceptButtonText} onPress={() => {
                submitHandler("approved");
                // navigation.navigate("ConsentForm")
        }} >Accept</Text>
            </TouchableOpacity>
          </View>
          )}

    {/* SURGEON to schedule surgery  */}
    {patientStage === OTPatientStages.APPROVED &&
  userType === OTUserTypes.SURGEON && (
    <TouchableOpacity style={styles.nextButton} onPress={handleScheduleNext}>
      <Text style={styles.nextButtonText}>NEXT</Text>
    </TouchableOpacity>
)}


{/* after surgery schedule  navigato to pre-op(consent-form, anesthesia record, postop) */}
{isAnesthesiaFormVisible()  && (
    <TouchableOpacity style={styles.nextButton2} onPress={handleNext}>
      <Text style={styles.nextButtonText}>NEXT</Text>
    </TouchableOpacity>
)}



 {/* ====================dailog box for reject============== */}
 <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.dialogContainer}>
          <Text style={styles.modaltitle}>Write a Reason for Rejection</Text>
          <TextInput
            style={styles.modaltextInput}
            placeholder="Enter Reason"
            multiline
            numberOfLines={4}
            value={rejectReason}
            onChangeText={handleReasonData}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={() => submitHandler("rejected")}>
              <Text style={styles.modalbuttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
  <Text style={styles.modalbuttonText}>Cancel</Text>
</TouchableOpacity>

          </View>
        </View>
      </View>
    </Modal>

      </ScrollView>
    )}

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004A9F',
    marginBottom: 10,
  },
  lastFeedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  lastFeedText: {
    marginLeft: 5,
    color: 'gray',
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,

    borderWidth: 1,
    borderColor: "#cccccc",
    width: "100%",
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
 
  tabButton: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    width: "48%",
    margin:5,
  },
  activeTabText :{
    color:'#fff',
    fontWeight:'bold',
  },
  inactiveTabText:{
    color:"#000",
  },
  activeTab: {
    backgroundColor: '#FF9800',
  },
  tabText: {
    color: 'white',
  },
  reportList: {
    marginBottom: 20,
  },
  reportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  fileIconContainer: {
    marginRight: 10,
  },
  reportDetails: {
    flex: 1,
  },
  reportTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  reportSubtitle: {
    color: 'gray',
  },
  downloadIcon: {
    paddingLeft: 10,
  },
  noteContainer: {
    marginBottom: 20,
    width:"100%",
  },
  noteInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent:'center',
    width:"30%",
   
  },
  nextButton2: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    width:"30%",

  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  arrangeBloodButton: {
    // backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row', // For icon and text alignment
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width:"40%",
     borderWidth: 1,
    borderColor: "gray",
  },
  arrangeBloodButton2: {
    // backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 8,
    flexDirection: 'row', // For icon and text alignment
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width:"100%",
     borderWidth: 1,
    borderColor: "gray",
  },
  arrangedBloodButton: {
    backgroundColor: "#e8f1fe",

    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 20,
  },
  arrangeBloodText: {
    color: '#000',
    fontSize: 16,
    marginLeft: 2, // Add spacing between icon and text if icon is shown
  },
  arrangeBloodIcon: {
    marginRight: 5,
  },
  scrollContentContainer: {
    flexGrow: 1,
    alignItems: "center", // Align items horizontally
  },
  card: {
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: "100%",
    elevation: 5,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  medicineInfo: {
    flex: 1,
    marginLeft: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 5,
  },
  prescribedByContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: 10,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detailText: {
    fontSize: 14,
    marginLeft: 0,
    color: "grey",
  },
  boldText: {
    fontWeight: "bold", // Applies bold to the inner text
  },
  prescribedText: {
    fontSize: 12,
    color: "grey",
    textAlign: "right",
  },
  doctorName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
  },
  btncontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    width:"100%",
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
  modaltitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modaltextInput: {
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
  modalbuttonText: {
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
  botIcon :{
    height:30,
    width:30,
  },
  imgcontainer:{
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems: 'center', 
    width: '100%',
    marginBottom:10,
  }

});

export default PreOp;
