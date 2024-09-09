import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, Button, TouchableOpacity, Image } from 'react-native';

const timelineData = [
  { date: '02 July 2024', diagnosis: 'Diagnosis Data not available', tag: 'Emergency' },
  { date: '02 July 2024', diagnosis: 'Diagnosis Data not available', tag: 'Emergency' },
  { date: '02 July 2024', diagnosis: 'Diagnosis Data not available', tag: 'Emergency' },
  { date: '02 July 2024', diagnosis: 'Diagnosis Data not available', tag: 'Emergency' },
];

const TimelineItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
    <View style={styles.timeline}>
      <View style={styles.dot} />
      <View style={styles.line} />
    </View>
    <View style={styles.content}>
    <View style={styles.subContent}>


      <Text style={styles.dateText}>{item.date}</Text>
      <Text style={styles.diagnosisText}>{item.diagnosis}</Text>
        </View>
      <View style={styles.tag}>
        <Text style={styles.tagText}>{item.tag}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const PatientTimeline = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={timelineData}
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
