import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const manuals = [
  {
    title: 'NV-CORE',
    imageUrl: require('../../../assets/help/nv_core.png'),
  },
  {
    title: 'V-TRACK',
    imageUrl: require('../../../assets/help/v_track.png'),
  },
  {
    title: 'Vitals',
    imageUrl:  require('../../../assets/help/vitals.png'), 
  },
];

const ManualsScreen = () => {
  return (
    <ScrollView style={styles.container}>
    
      {manuals.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
             <Text style={styles.title}>{item.title}</Text>
          <Image 
                        source={item.imageUrl} 
                        style={styles.image} 
                    />
         
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  itemContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  image: {
    width: 150,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  viewButton: {
    backgroundColor: '#1A73E8',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ManualsScreen;
