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

const PostOpRecord = () => {
  const user = useSelector((state) =>state.currentUserData)
  const currentPatient = useSelector((state) => state.currentPatientData);
  const patientTimeLineID = currentPatient?.patientTimeLineID;
  const  userType=useSelector((state)  => state.userType)


   
    const [selectedTab, setSelectedTab] = useState("Tests");
    const [rejectReason, setRejectReason] = React.useState("");
const [visible, setVisible] = useState(false);
const [notes, setNotes] = useState('');
const [patientStage, setPatientStage]=useState(0)
const [selectedType, setSelectedType] = useState('capsules')
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


const navigation = useNavigation()

   

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

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSaveMed = () => {
    setModalVisible(false);
  };
  
  

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


  // Function to categorize the received medication data
const categorizeMedication = (medData) => {
    const updatedMedications = { ...medications };
    medData.forEach((item) => {
      // Find the correct category based on the medicineType
      const category = Object.keys(medicineCategory).find(
        (key) => medicineCategory[key] === item.medicineType
      );
  
      if (category && medications[category]) {
      setSelectedType(category)

        // Push the medication data into the corresponding category array
        updatedMedications[category].push(item);
      }
    });
    setMedications(updatedMedications); 
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

  
  const saveHandler = async () => {
    const postopRecordData = {
      notes: notes,
      medications: medications,
      selectedType: selectedType,
    };
    try {
      const response = await authPost(
        `ot/${user.hospitalID}/${currentPatient.patientTimeLineID}/postopRecord`,
        { postopRecordData: postopRecordData },
        user.token
      );
      if (response.status === 201) {
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Success',
            text2: 'Postoprecord form added',
            visibilityTime: 3000,
            autoHide: true,
            bottomOffset: 40,
          });
       
      } else {
        Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: 'Postoprecord form update Failed',
            visibilityTime: 3000,
            autoHide: true,
            bottomOffset: 40,
          });
        
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const handleTransfer = () => {
     navigation.navigate('TransferPatient')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
       
        <View style={styles.lastFeedContainer}>
          {/* <Icon name="access-time" size={18} color="gray" /> */}
          {/* <Text style={styles.lastFeedText}>Last Feed at 01:30</Text> */}
        </View>
      


      
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
            selectedTab === "Post medication" ? styles.activeTab : styles.inactiveTab,
            styles.categoryButton,
          ]}
          onPress={() => setSelectedTab("Post medication")}
        >
          <Text
            style={selectedTab === "Post medication" ? styles.activeTabText : styles.inactiveTabText}
          >
            Post medication
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

     

<View style={styles.centerContainer}>
  <TouchableOpacity style={styles.nextButton1} onPress={() => setSelectedTab('Post medication')}>
    <Text style={styles.nextButtonText}>NEXT</Text>
  </TouchableOpacity>
</View>

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

      <TouchableOpacity style={styles.nextButton2} onPress={saveHandler}>
      <Text style={styles.nextButtonText}>Save</Text>
    </TouchableOpacity>


    <TouchableOpacity style={styles.transferbtn} onPress={handleTransfer}>
      <Text style={styles.nextButtonText}>Transfer</Text>
    </TouchableOpacity>


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
    width:"30%",
   
  },
  nextButton1: {
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
  transferbtn: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 25,
    width:"30%",
    alignItems: 'center',
    width: '30%',
    position: 'absolute',  // Position it absolutely
    bottom: 20,            // Distance from the bottom of the screen
    alignSelf: 'center',
  },
  centerContainer: {
    flex: 1,                 // Ensures it takes up the available space
    justifyContent: 'center', // Centers vertically
    alignItems: 'center',     // Centers horizontally
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
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

export default PostOpRecord;
