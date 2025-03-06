// VitalsLogs.js
import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const logsData = [
  { id: '1', date: '10/21/2024', time: '11:14:20 AM', bpm: 102 },
  { id: '2', date: '10/21/2024', time: '11:15:20 AM', bpm: 102 },
  { id: '3', date: '10/21/2024', time: '11:16:20 AM', bpm: 100 },
  { id: '4', date: '10/21/2024', time: '11:17:20 AM', bpm: 90 },
  { id: '5', date: '10/21/2024', time: '11:18:20 AM', bpm: 80 },
  { id: '6', date: '10/21/2024', time: '11:19:20 AM', bpm: 56 },
  { id: '1', date: '10/21/2024', time: '11:14:20 AM', bpm: 102 },
  { id: '2', date: '10/21/2024', time: '11:15:20 AM', bpm: 102 },
  { id: '3', date: '10/21/2024', time: '11:16:20 AM', bpm: 100 },
  { id: '4', date: '10/21/2024', time: '11:17:20 AM', bpm: 90 },
  { id: '5', date: '10/21/2024', time: '11:18:20 AM', bpm: 80 },
  { id: '6', date: '10/21/2024', time: '11:19:20 AM', bpm: 56 },
  { id: '1', date: '10/21/2024', time: '11:14:20 AM', bpm: 102 },
  { id: '2', date: '10/21/2024', time: '11:15:20 AM', bpm: 102 },
  { id: '3', date: '10/21/2024', time: '11:16:20 AM', bpm: 100 },
  { id: '4', date: '10/21/2024', time: '11:17:20 AM', bpm: 90 },
  { id: '5', date: '10/21/2024', time: '11:18:20 AM', bpm: 80 },
  { id: '6', date: '10/21/2024', time: '11:19:20 AM', bpm: 56 },
];

const VitalsLogs = ({category,unit,user,patientTimeLineID}) => {


  const getFilteredData = async () => {
    const response = await authFetch(
      `vitals/${user.hospitalID}/${patientTimeLineID}/single?vital=${category}`,
      user.token
    );

    if (response.message == "success") {
      setRows(() => {
        if (response.vitals.length) {
          const timeVar = (category + "Time")
          return response.vitals?.map((vital) => {
            if (category == "temperature" && vital.device) {
              return createData(
                vital[category] || "",
                Number(vital.deviceTime) * 1000,
                vital.userID || ""
              );  
            } else {
              return createData(vital[category] || "", String(vital[timeVar]), vital.userID || "");
            }
          });
        } else return [];
      });
    }
  };

  useEffect(()=>{
    getFilteredData()
  },[])


  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <Text style={styles.bpmText}>{item.bpm}bpm</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text style={[styles.headerText, { flex: 1 }]}>Time</Text>
        <Text style={[styles.headerText, { flex: 1, textAlign: 'right' }]}>Blood Pressure</Text>
      </View>

      <FlatList
        data={logsData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  headerText: { fontSize: 14, fontWeight: 'bold', color: '#004E98' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  dateText: { fontSize: 14, color: '#000' },
  timeText: { fontSize: 12, color: '#666' },
  bpmText: { fontSize: 14, fontWeight: 'bold', color: '#000' },
});

export default VitalsLogs;
