import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal , TextInput} from 'react-native';
import { authFetch } from '../../axios/authFetch';
import { useSelector } from 'react-redux';
import { authPost } from '../../axios/authPost';



const HubScreen = () => {
const user = useSelector((state) => state.currentUserData)
const [allHubs,setAllHubs] = useState([])
const [modalVisible, setModalVisible] = useState(false);
const [hubName, setHubName] = useState('');
const [hubCustomName, setHubCustomName] = useState('');
const [hubAddress, setHubAddress] = useState('');
const [hubProtocolAddress, setHubProtocolAddress] = useState('');


  const renderHub = ({ item }) => (
    <View style={styles.hubCard}>
      <Image source={require('../../assets/medicalhistory/streamline_wifi-router.png')} style={styles.hubIcon} />
      <Text style={styles.label}>Hub Name: <Text style={styles.value}>{item.hubName}</Text></Text>
<Text style={styles.label}>Hub Custom Name: <Text style={styles.value}>{item.hubCustomName}</Text></Text>

      {/* <View style={styles.statusButton}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View> */}
    </View>
  );


  const getAllHubs = async() => {
      const response = await authFetch(`hub/${user.hospitalID}`, user.token)
      console.log("getAllHubs========================",response.hubs)
      setAllHubs(response.hubs)
  }
  useEffect(() => {
    getAllHubs()
  },[user])

 
  return (
    <View style={styles.container}>
      <FlatList
        data={allHubs}
        renderItem={renderHub}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.hubList}
      />
      {/* <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Hub</Text>
      </TouchableOpacity> */}

       {/* Modal for entering hub details */}
       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Hub Details</Text>

            {/* Input fields for hub details */}
            <TextInput
              style={styles.input}
              placeholder="Hub Name"
              value={hubName}
              onChangeText={setHubName}
            />
            {/* <TextInput
              style={styles.input}
              placeholder="Hub Custom Name"
              value={hubCustomName}
              onChangeText={setHubCustomName}
            /> */}
            <TextInput
              style={styles.input}
              placeholder="Hub Address"
              value={hubAddress}
              onChangeText={setHubAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="Hub Protocol Address"
              value={hubProtocolAddress}
              onChangeText={setHubProtocolAddress}
            />

            {/* Submit and Cancel buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.submitButton} onPress={handleAddHub}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  hubList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  hubCard: {
    flex: 1,
    margin: 10,
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    alignItems: 'center',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  hubIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  hubName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  statusButton: {
    backgroundColor: '#36B37E',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',  // Darker color for labels
  },
  value: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#666',  // Lighter color for values
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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default HubScreen;
