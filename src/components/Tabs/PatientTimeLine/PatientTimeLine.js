import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, Button, TouchableOpacity, Image } from 'react-native';
import { authFetch } from '../../../axios/authFetch';
import { useSelector } from 'react-redux';

const timelineData = [
  { date: '02 July 2024', diagnosis: 'Diagnosis Data not available', tag: 'Emergency' },
  { date: '02 July 2024', diagnosis: 'Diagnosis Data not available', tag: 'Emergency' },
  { date: '02 July 2024', diagnosis: 'Diagnosis Data not available', tag: 'Emergency' },
  { date: '02 July 2024', diagnosis: 'Diagnosis Data not available', tag: 'Emergency' },
];
const patientStatus = {
  outpatient: 1,
  inpatient: 2,
  emergency: 3,
  operationTheatre: 4,
  discharged: 21,
};

const colorObj = {
  [patientStatus.inpatient]: "#FFA07A",
  [patientStatus.outpatient]: "#ADD8E6",
  [patientStatus.emergency]: "#98FB98",
};

const TimelineItem = ({ item, onPress }) => {
  // Get the status label based on patientStartStatus
  const statusLabel = Object.keys(patientStatus).find(
    key => patientStatus[key] === item.patientStartStatus
  );

  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
      <View style={styles.timeline}>
        <View
          style={[
            styles.dot,
            { backgroundColor: colorObj[item.patientStartStatus] || '#ccc' }
          ]}
        />
        <View style={styles.line} />
      </View>
      <View style={styles.content}>
        <View style={styles.subContent}>
          <Text style={styles.dateText}>
            {String(new Date(item.startTime || "").toLocaleDateString('en-GB')) +
              " - " +
              (item.patientEndStatus
                ? String(new Date(item.endTime).toLocaleDateString('en-GB'))
                : "Present")}
          </Text>
          <Text style={styles.diagnosisText}>
            {item.diagnosis ? (
              item.diagnosis.length > 40 ? (
                `${item.diagnosis.substring(0, 40)}... view`
              ) : (
                item.diagnosis
              )
            ) : (
              "Diagnosis data not available"
            )}
          </Text>
        </View>
        <View
          style={[
            styles.tag,
            { backgroundColor: colorObj[item.patientStartStatus] || '#ccc' }
          ]}
        >
          <Text style={styles.tagText}>
            {statusLabel ? statusLabel.charAt(0).toUpperCase() + statusLabel.slice(1) : 'Unknown'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PatientTimeline = () => {

  const user = useSelector((state) => state.currentUserData)
  const currentPatient  = useSelector((state) => state.currentPatientData)

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [timelines, setTimelines] = React.useState([]);


  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const getAllTimeline = async () => {
    const res = await authFetch(
      `patientTimeLine/hospital/${user.hospitalID}/patient/${currentPatient.id}`,
      user.token
    );
    console.log("res----timeline", res);

    if (res.message == "success") {
      setTimelines(res.patientTimeLines);
    }
  };
  useEffect(() => {
    getAllTimeline()
  },[currentPatient,user])

  return (
    <View style={styles.container}>
      <FlatList
        data={timelines}
        renderItem={({ item }) => (
          <TimelineItem item={item} onPress={() => handleItemPress(item)} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Modal for the Timeline Summary */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Patient Timeline Summary</Text>
            <View style={styles.modalBody}>
              <View style={styles.diagnosisBox}>
                <Text style={styles.diagnosisTextModal}>
                  {selectedItem ? selectedItem.diagnosis : ''}
                </Text>
              </View>
              {/* <Image
                source={{ uri: 'https://example.com/doctor_image.png' }} // Replace with your local image or URL
                style={styles.doctorImage}
              /> */}
            </View>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timeline: {
    alignItems: 'center',
    marginRight: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#673ab7',
    marginBottom: 5,
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: '#ffa500',
  },
  content: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection:"row",
    justifyContent:"space-between",
  },
  subContent :{
    flexDirection:"column",

  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  diagnosisText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  tag: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#ff3b30',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  tagText: {
    color: '#ff3b30',
    fontSize: 12,
  },
  
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  diagnosisBox: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 15,
    width: '70%',
    borderRadius: 5,
  },
  diagnosisTextModal: {
    color: '#666',
  },
  doctorImage: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
});

export default PatientTimeline;
