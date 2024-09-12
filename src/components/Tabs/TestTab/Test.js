import { useState } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet, Dimensions, Button ,FlatList } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'; 
import TestItem from './TestItem';

const TestTab = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [testName, setTestName] = useState('');

  const testData = [
    {
      id: 1,
      ionicCode: "102589-9",
      test: "Sericin ige ab in serum by  (RAST)",
      time: "Sep 5, 24, 11:09",
      addedBy: 442,
      action: ""
    },
    {
      id: 2,
      ionicCode: "105321-3",
      test: "Hemoglobin A1c [m/v] in Blood",
      time: "Sep 5, 24, 12:15",
      addedBy: 876,
      action: ""
    }
  ];
  
    return(
        <View style={styles.container}>
           <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                
                <Icon name="add" size={20} color="#fff" />
                <Text style={styles.buttonText}>Add Tests</Text>
            </TouchableOpacity>

         <FlatList
        data={testData}
        renderItem={({ item }) => (
          <TestItem
            test={item.test}
            addedBy={item.addedBy}
            updatedTime={item.time}
            ionicCode={item.ionicCode}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    
           

            <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalBackground}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Add Test</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Test Name*"
          value={testName}
          onChangeText={setTestName}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={() => setModalVisible(false)} color="#999" />
        <Button title="Add" onPress={() => { /* Handle Add Test logic */ }} color="#007bff" />
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
      padding: 3,
      // backgroundColor:"red",
      width:"100%"
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
    backgroundColor: '#1977f3',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'flex-end',
    marginBottom:10,
},
buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
},

modalBackground: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContainer: {
  width: '90%',
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 20,
  alignItems: 'center',
},
modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 20,
},
inputContainer: {
  width: '100%',
  marginBottom: 20,
  flexDirection: 'row',
  justifyContent: 'center',
},
input: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  padding: 10,
  width: '48%',
},
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
},
})

export default TestTab;
