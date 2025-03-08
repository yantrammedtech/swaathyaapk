import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { authFetch } from '../../../axios/authFetch';

const VitalsLogs = ({ category, unit, user, patientID }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to create row data object
  const createData = (value, timeStamp, userID) => {
    return { value, timeStamp, userID };
  };

  // Fetch filtered data
  const getFilteredData = async () => {
    try {
      const response = await authFetch(
        `vitals/${user.hospitalID}/${patientID}/single?vital=${category}`,
        user.token
      );

      if (response.message === 'success') {
        const timeVar = `${category}Time`; // Dynamically form the time field name
        const formattedRows = response.vitals.map((vital) => {
          const value = vital[category] || '';
          const timeStamp = vital[timeVar] || '';
          const userID = vital.userID || '';
          return createData(value, timeStamp, userID);
        });

        // Sort rows by timestamp in descending order (latest first)
        formattedRows.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));

        setRows(formattedRows);
      } else {
        setError('Failed to fetch data');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFilteredData();
  }, [category]);

  // Format date and time from timestamp and add 5 hours and 30 minutes
  const formatDateTime = (timestamp) => {
    if (!timestamp) return { date: 'N/A', time: 'N/A' };

    const date = new Date(timestamp);
    date.setHours(date.getHours() + 5); // Add 5 hours
    date.setMinutes(date.getMinutes() + 30); // Add 30 minutes

    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
  };

  // Render each row item
  const renderItem = ({ item }) => {
    const { date, time } = formatDateTime(item.timeStamp);

    return (
      <View style={styles.row}>
        <View>
          <Text style={styles.dateText}>{date}</Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>
        <Text style={styles.bpmText}>
          {item.value} {unit}
        </Text>
      </View>
    );
  };

  // Show loading indicator
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#004E98" />
      </View>
    );
  }

  // Show error message
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text style={[styles.headerText, { flex: 1 }]}>Time</Text>
        <Text style={[styles.headerText, { flex: 1, textAlign: 'right' }]}>
          {category.charAt(0).toUpperCase() + category.slice(1)} ({unit})
        </Text>
      </View>

      {/* Data List */}
      <FlatList
        data={rows}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ListEmptyComponent={<Text style={styles.emptyText}>No data available</Text>}
      />
    </View>
  );
};

// Styles
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
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', fontSize: 16 },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#666' },
});

export default VitalsLogs;