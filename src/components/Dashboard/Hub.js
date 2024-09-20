import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const hubs = [
  { id: '1', name: 'HUB 23', status: 'Online' },
  { id: '2', name: 'HuB 24', status: 'Online' },
  { id: '3', name: 'HUB5', status: 'Online' },
  { id: '4', name: 'HUB2', status: 'Online' },
];

const HubScreen = () => {
  const renderHub = ({ item }) => (
    <View style={styles.hubCard}>
      <Image source={{}} style={styles.hubIcon} />
      <Text style={styles.hubName}>{item.name}</Text>
      <View style={styles.statusButton}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={hubs}
        renderItem={renderHub}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.hubList}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Hub</Text>
      </TouchableOpacity>
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
});

export default HubScreen;
