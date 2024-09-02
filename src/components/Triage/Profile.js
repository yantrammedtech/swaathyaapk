import React, { useState } from 'react';
import { View, Text, TextInput, Image, Pressable, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Profile = () => {
  const [profileImage, setProfileImage] = useState(require('../../assets/person.avif')); // Default image
  const navigation = useNavigation();

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const source = { uri: response.assets[0].uri };
        setProfileImage(source);
      }
    });
  };

  const hamdleSave = () => {
    navigation.navigate('TriageDashboard')
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('TriageDashboard')}>
        <Text style={styles.cancelButton}>Cancel</Text>
      </Pressable>

      <View style={styles.profileContainer}>
        <Image
          source={profileImage}
          style={styles.profileImage}
        />
        <Pressable style={styles.editIcon} onPress={selectImage}>
         
          {/* <Text style={styles.editIconText}>✏️</Text> */}
          <Icon name="camera-alt" size={20} color="#000" /> {/* Camera icon */}
        </Pressable>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value="Olivia Rhye"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value="olivia@"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value="+916788989003"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Mail"
          value="olivia@untitledui.com"
          keyboardType="email-address"
        />
      </View>

      <Pressable style={styles.saveButton} onPress={hamdleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  cancelButton: {
    color: '#FF0000',
    fontSize: 18,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative', // Position relative to allow absolute positioning within it
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 15, // Adjust size to match design
    padding: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:100,
  },
  editIconText: {
    fontSize: 14, // Size of the edit icon text
    color: '#000000',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#0A84FF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
