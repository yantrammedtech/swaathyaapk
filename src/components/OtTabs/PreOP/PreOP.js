import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView , Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const reports = [
  {
    id: '1',
    type: 'PDF',
    title: 'CBP test report',
    icdCode: 'ICD - 10',
    submittedBy: 'Submitted by Laxmi',
    fileIcon: 'file-pdf',
    fileColor: 'red',
  },
  {
    id: '2',
    type: 'JPG',
    title: 'Blood test report',
    icdCode: 'ICD - 10',
    submittedBy: 'Submitted by Laxmi',
    fileIcon: 'file-image',
    fileColor: 'orange',
  },
  {
    id: '3',
    type: 'PDF',
    title: 'Fever test report',
    icdCode: 'ICD - 10',
    submittedBy: 'Submitted by Laxmi',
    fileIcon: 'file-pdf',
    fileColor: 'blue',
  },
  {
    id: '4',
    type: 'PDF',
    title: 'CRP test report',
    icdCode: 'ICD - 10',
    submittedBy: 'Submitted by Laxmi',
    fileIcon: 'file-pdf',
    fileColor: 'red',
  },
];

const medicineList = [{"addedOn": "2024-09-25T10:48:36.000Z", "daysCount": 5, "doseCount": 100, "doseTimings": "16:18", "id": 1871, "lastModified": "2024-09-25T10:48:36.000Z", "medicationTime": "After Breakfast", "medicineName": "mnil 10mg tablet", "medicineType": 2, "notes": "", "timeLineID": 2404, "userID": 378},]

const PreOp = () => {
    const [isBloodArranged, setIsBloodArranged] = useState(false);
    const [selectedTab, setSelectedTab] = useState("Tests");
    const [rejectReason, setRejectReason] = React.useState("");
const [visible, setVisible] = useState(false);

const navigation = useNavigation()

    // Toggle function for button click
    const handleArrangeBloodClick = () => {
      setIsBloodArranged(!isBloodArranged);
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

  const submitHandler = (status) => {
    console.log("status",status)
  }

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
          isBloodArranged && styles.arrangedBloodButton, // Apply blue border if toggled
        ]}
        onPress={handleArrangeBloodClick}
      >
        {isBloodArranged ? (
          <Icon name="check" size={20} color="blue" style={styles.arrangeBloodIcon} />
        ) : null}
        <Text
          style={[
            styles.arrangeBloodText,
            isBloodArranged && { color: 'blue' }, // Change text color to blue if toggled
          ]}
        >
          Arrange Blood
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
        />
      </View>


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
          navigation.navigate("ConsentForm")
  }} >Accept</Text>
      </TouchableOpacity>
    </View>



    

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
    backgroundColor: '#F5F5F5',
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
  arrangedBloodButton: {
    backgroundColor: "#e8f1fe",

    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 20,
  },
  arrangeBloodText: {
    color: '#000',
    fontSize: 16,
    marginLeft: 5, // Add spacing between icon and text if icon is shown
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
 

});

export default PreOp;
