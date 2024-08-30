import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function Page2({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to Page 2</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Page1')}>
        <Text style={styles.buttonText}>Go to Page 1</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});