// VitalsGraphs.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VitalsGraphs = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholderText}>Chart will be shown here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  placeholderText: { fontSize: 16, color: '#555' },
});

export default VitalsGraphs;
