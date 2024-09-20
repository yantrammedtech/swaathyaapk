import React from 'react';
import { View, Text, StyleSheet, Button, Alert, Linking ,Image,TouchableOpacity } from 'react-native';
const VideosScreen = () => {
    const url = 'https://www.youtube.com/embed/JtjKnw9wNuY'
    const url2 = 'https://www.youtube.com/embed/KmHqIfE3J4I'

    const handlePress = async () => {
        try {
          const supported = await Linking.canOpenURL(url);
    
          if (supported) {
            await Linking.openURL(url);
          } else {
            Alert.alert(`Unable to open this URL: ${url}`);
          }
        } catch (error) {
          Alert.alert('Error', 'Unable to open URL');
        }
      };

      
    const handlePress2 = async () => {
        try {
          const supported = await Linking.canOpenURL(url);
    
          if (supported) {
            await Linking.openURL(url2);
          } else {
            Alert.alert(`Unable to open this URL: ${url}`);
          }
        } catch (error) {
          Alert.alert('Error', 'Unable to open URL');
        }
      };

  return (
     <View style={styles.container}>
   
    <TouchableOpacity onPress={handlePress} style={styles.touchable}>
        <Text  style={styles.text}>NV-CORE</Text>
        <Image 
          source={require('../../../assets/help/help_2.png')} 
          style={styles.profileimage} 
        />
      </TouchableOpacity>

       
    <TouchableOpacity onPress={handlePress2} style={styles.touchable}>
    <Text  style={styles.text} >V-TRACK</Text>
        
        <Image 
          source={require('../../../assets/help/help_1.png')} 
          style={styles.profileimage} 
        />
      </TouchableOpacity>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#fff",
    padding: 10,
  },
 
  touchable: {
    width: "100%",  // Set width for the TouchableOpacity
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    padding: 2,

},
 
  text:{
    fontSize:13,
    fontWeight:"bold",
    marginBottom: 3,
  },
  profileimage :{
    width:"100%",
    height: 100,
    resizeMode: 'contain',
  }
});

export default VideosScreen;
