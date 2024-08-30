import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function Page1({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to Page 1</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Splash')}>
        <Text style={styles.buttonText}>Go to Page 2</Text>
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
    backgroundColor: 'green',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});