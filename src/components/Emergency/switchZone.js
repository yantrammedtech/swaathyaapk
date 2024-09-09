import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const EmergencyZoneSelector = () => {
    const navigation = useNavigation(); 
    const handlePress = () => {
        navigation.navigate('EmergencyDashboard'); // Navigate to EmergencyDashboard
      };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Emergency Red Zone */}
      <TouchableOpacity style={styles.redZone} onPress={handlePress}>
        <Text style={styles.zoneTitle}>Emergency Red Zone</Text>
        <Text style={styles.zoneDescription}>
          "Critical condition: Immediate medical attention required."
        </Text>
      </TouchableOpacity>

      {/* Emergency Yellow Zone */}
      <TouchableOpacity style={styles.yellowZone}>
        <Text style={styles.zoneTitle}>Emergency Yellow Zone</Text>
        <Text style={styles.zoneDescription}>
          "Stable but monitored: Medical supervision needed."
        </Text>
      </TouchableOpacity>

      {/* Emergency Green Zone */}
      <TouchableOpacity style={styles.greenZone}>
        <Text style={styles.zoneTitle}>Emergency Green Zone</Text>
        <Text style={styles.zoneDescription}>
          "Non-critical: Routine care and monitoring."
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  redZone: {
    width: '90%',
    padding: 20,
    backgroundColor: '#ff6b6b',
    borderRadius: 10,
    marginVertical: 10,
    borderLeftWidth: 10,
    borderColor: 'red',
  },
  yellowZone: {
    width: '90%',
    padding: 20,
    backgroundColor: '#ffe66d',
    borderRadius: 10,
    marginVertical: 10,
    borderLeftWidth: 10,
    borderColor: 'yellow',
  },
  greenZone: {
    width: '90%',
    padding: 20,
    backgroundColor: '#6fffa3',
    borderRadius: 10,
    marginVertical: 10,
    borderLeftWidth: 10,
    borderColor: 'green',
  },
  zoneTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  zoneDescription: {
    fontSize: 14,
  },
});

export default EmergencyZoneSelector;