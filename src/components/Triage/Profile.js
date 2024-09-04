import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, Pressable, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { authPatch } from '../../axios/usePatch';

const Profile = () => {
  const currentUserData = useSelector((state) => state.currentUserData);
  const [profileImage, setProfileImage] = useState(require('../../assets/person.avif')); // Default image
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    firstName: currentUserData.firstName,
    lastName: currentUserData.lastName,
    phoneNo: currentUserData.phoneNo,
    imageUri: currentUserData.imageURL || null,
  });

  const navigation = useNavigation();

  useEffect(() => {
    if (currentUserData.imageURL) {
      setProfileImage({ uri: currentUserData.imageURL });
    }
  }, [currentUserData]);

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
        setEditedData((prevData) => ({
          ...prevData,
          imageUri: response.assets[0].uri,
        }));
      }
    });
  };

  const handleSave = async() => {
    const dataToSubmit = {
      firstName: editedData.firstName || currentUserData.firstName,
      lastName: editedData.lastName || currentUserData.lastName,
      phoneNo: editedData.phoneNo || currentUserData.phoneNo,
      gender: currentUserData.gender,
      dob: currentUserData.dob,
      city: currentUserData.city,
      state: currentUserData.state,
      pinCode: currentUserData.pinCode,
      address: currentUserData.address,
      image: editedData.imageUri || currentUserData.imageURL, // Updated image URI or existing one
    };
    console.log('Data to submit:', dataToSubmit);
    
    const data = await authPatch(
      `user/${currentUserData.hospitalID}/${currentUserData.id}`,
      dataToSubmit,
      currentUserData.token
    );
  console.log("data==",data)
    if (data.message == "success") {
      console.log(data);      
      dispatch({ type: "currentUserData", payload: data.data })
    } 
    navigation.navigate('TriageDashboard');
  };

  const handleChange = (field, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('TriageDashboard')}>
        <Text style={styles.cancelButton}>Cancel</Text>
      </Pressable>

      <View style={styles.profileContainer}>
        <Image source={profileImage} style={styles.profileImage} />
        {isEditing && (
          <Pressable style={styles.editIcon} onPress={selectImage}>
            <Icon name="camera-alt" size={20} color="#000" />
          </Pressable>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={editedData.firstName}
          onChangeText={(text) => handleChange('firstName', text)}
          editable={isEditing}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={editedData.lastName}
          onChangeText={(text) => handleChange('lastName', text)}
          editable={isEditing}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={editedData.phoneNo}
          onChangeText={(text) => handleChange('phoneNo', text)}
          keyboardType="phone-pad"
          editable={isEditing}
        />
      </View>

      {!isEditing ? (
        <Pressable style={styles.editButton} onPress={() => setIsEditing(true)}>
          <Text style={styles.editButtonText}>Edit</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
      )}
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
    position: 'relative',
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
    borderRadius: 15,
    padding: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
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
  editButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
