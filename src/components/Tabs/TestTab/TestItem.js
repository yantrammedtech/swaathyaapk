import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';

const TestItem = ({ ionicCode, test, updatedTime, addedBy }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleMenuClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleMenuClose = () => {
    setIsMenuVisible(false);
  };

  const handleDelete = () => {
    // Handle Delete action
    console.log('Delete action selected');
    handleMenuClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.serialNo}>{test}</Text>
        <Text style={styles.addedBy}>
          Added by: <Text style={styles.semiBoldText}>{addedBy}</Text>
        </Text>
        <View style={styles.moreIconContainer}>
          <TouchableOpacity style={styles.moreIcon} onPress={handleMenuClick}>
            <Icon
              name="more-vert" // Icon for action (vertical ellipsis)
              size={24}
              color="#000"
            />
          </TouchableOpacity>
          {isMenuVisible && (
            <TouchableOpacity onPress={handleDelete} style={styles.deleteOption}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.ionicCode}>
          Ionic Code: <Text style={styles.semiBoldText}>{ionicCode}</Text>
        </Text>
        <Text style={styles.time}>
          Time: <Text style={styles.semiBoldText}>{updatedTime}</Text>
        </Text>
      </View>

      {/* <Modal
        isVisible={isMenuVisible}
        onBackdropPress={handleMenuClose}
        style={styles.modal}
        onBackButtonPress={handleMenuClose}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={handleDelete} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleMenuClose} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serialNo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  addedBy: {
    fontSize: 14,
    color: '#555',
  },
  moreIconContainer: {
    position: 'relative',
  },
  moreIcon: {
    padding: 5,
  },
  deleteOption: {
    position: 'absolute',
    right: 0,
    top: 30, // Adjust the top position as needed
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    zIndex: 1,
    width: '150%',
  },
  deleteText: {
    fontSize: 14,
    color: '#d9534f',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    width: '80%',
  },
  ionicCode: {
    fontSize: 14,
    color: '#777',
  },
  time: {
    fontSize: 14,
    color: '#777',
  },
  semiBoldText: {
    fontWeight: '600', // Semi-bold font weight for the text
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  menuItem: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 18,
    color: '#007bff',
  },
});

export default TestItem;
