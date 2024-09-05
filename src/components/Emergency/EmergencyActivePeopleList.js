import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Footer from './Footer';

const patientlist = [
  {
    id: '2345',
    name: 'Jones Doe',
    image: require('../../assets/person.avif'),
  },
  {
    id: '2346',
    name: 'Jane Smith',
    image: require('../../assets/person.avif'),
  },
  {
    id: '2347',
    name: 'Michael Johnson',
    image: require('../../assets/person.avif'),
  },
  {
    id: '2348',
    name: 'Emily Davis',
    image: require('../../assets/person.avif'),
  },
];

const EmergencyActivePeopleList = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('PatientProfile', {
          patientId: item.id,
          patientName: item.name,
          patientImage: item.image,
        })
      }
    >
      <View style={styles.row}>
        <Image
          source={require('../../assets/pp1.png')}
          style={styles.profileImage}
          resizeMode="contain"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.patient}>
            Patient Name:
            <Text style={styles.patientName}> {item.name}</Text>
          </Text>
          <View style={styles.dateRow}>
            <Icon name="access-time" size={20} color="#666" />
            <Text style={styles.dateText}>April 10, 2024 | 10:00 AM</Text>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.uhidText}>UHID: {item.id}</Text>
        <TouchableOpacity style={styles.closeButton}>
          <Icon name="arrow-upward" size={24} color="#FFA500" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={patientlist}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Footer activeRoute="peopleList" navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 15,
    margin: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bebebe',
    // elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  patient: {
    fontSize: 14,
  },
  patientName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 2,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  uhidText: {
    fontSize: 13,
    color: '#333',
  },
  closeButton: {
    width: 36,
    height: 36,
    backgroundColor: '#fff',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '90deg' }],
  },
});

export default EmergencyActivePeopleList;
