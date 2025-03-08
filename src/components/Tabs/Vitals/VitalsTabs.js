// VitalsTabs.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import VitalsLogs from './VitalsLogs';
import VitalsGraphs from './VitalsGraphs';
import { useSelector } from 'react-redux';

const VitalsTabs = ({route }) => {
  const [activeTab, setActiveTab] = useState('Logs');
  const user = useSelector((state) => state.currentUserData);
  const currentPatient = useSelector((state) => state.currentPatientData);
  return (
    <View style={styles.container}>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Logs' && styles.activeTab]}
          onPress={() => setActiveTab('Logs')}
        >
          <Text style={styles.tabText}>Logs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'Chart' && styles.activeTab]}
          onPress={() => setActiveTab('Chart')}
        >
          <Text style={styles.tabText}>Chart</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {activeTab === 'Logs' ? <VitalsLogs category={route.params.category} unit={route.params.unit} user={user} patientID={currentPatient.id} /> : <VitalsGraphs category={route.params.category} unit={route.params.unit} user={user} patientID={currentPatient.id} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#007bff', padding: 16, alignItems: 'center' },
  headerText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  tabsContainer: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ddd' },
  tab: { flex: 1, padding: 12, alignItems: 'center' },
  activeTab: { borderBottomWidth: 2, borderColor: '#f90' },
  tabText: { fontSize: 16, fontWeight: '600' },
});

export default VitalsTabs;
