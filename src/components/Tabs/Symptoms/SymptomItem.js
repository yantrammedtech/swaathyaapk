




import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SymptomItem = ({ symptomName, addedBy, updatedTime, duration }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.symptomName}>{symptomName}</Text>
        <Text style={styles.addedBy}>Added by: {addedBy}</Text>
        <TouchableOpacity style={styles.moreIcon}>
        <Icon
                name="more-vert" // This is the icon resembling a colon (vertical ellipsis)
                size={24}
                color="#000"
                style={{ marginRight: 15 }}
                onPress={() => {
                  // Handle press event here
                }}
              />
        </TouchableOpacity>
      </View>
      <View style={styles.detailRow}>
  <Text style={styles.updatedTime}>
    Updated time: 
    <Text style={styles.semiBoldText}> {updatedTime}</Text>
  </Text>
  <Text style={styles.duration}>Duration:
  <Text style={styles.semiBoldText}> {duration}</Text> 
  </Text>
</View>

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
  symptomName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  addedBy: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
  },
  moreIcon: {
    marginLeft: 'auto',
    padding: 5,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    width:"80%"
  },
  updatedTime: {
    fontSize: 14, // You can adjust this based on your design
    color: '#777', // Example text color
  },
  semiBoldText: {
    fontWeight: '500', // Semi-bold font weight for the time
  },
  duration: {
    fontSize: 12,
    color: '#777',
  },
});

export default SymptomItem;
