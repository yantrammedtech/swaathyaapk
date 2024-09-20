import React from 'react';
import { View, Text, Pressable, StyleSheet, Image, Dimensions,Alert  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const { height: screenHeight } = Dimensions.get('window');

const Sidebar = ({ isVisible, onClose }) => {

  if (!isVisible) return null;
  const navigation = useNavigation();
  const user = useSelector((state) => state.currentUserData);
 
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const backgroundColor = getRandomColor();

  const handleLogout = async () => {
    try {
      // Remove token and scope from AsyncStorage
      await AsyncStorage.removeItem('Token');
      await AsyncStorage.removeItem('scope');

      // Navigate to the login 
      navigation.navigate('Login'); 
      
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Something went wrong while logging out.');
    }
  };
  return (
    <View style={styles.sidebar}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
        {user.imageURL ? (
          <Image source={{ uri: user.imageURL }} style={styles.profileimage} />
        ) : (
          <View style={[styles.placeholderImage, { backgroundColor }]}>
            <Text style={styles.placeholderText}>
              {user.firstName ? user.firstName.charAt(0).toUpperCase() : ''}
            </Text>
          </View>
        )}
          <View>
          <Text style={styles.profileName}>{user.firstName + ' ' + user.lastName}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
        </View>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <Icon name="close" size={30} color="#000" />
        </Pressable>
      </View>
      <View style={styles.menuContainer}>
        <Pressable style={styles.menuItem}  onPress={() => navigation.navigate('Profile')}>
          <Icon name="person" size={25} color="#000" />
          <Text style={styles.menuText}>View Profile</Text>
        </Pressable>
        <Pressable style={styles.menuItem} onPress={() => navigation.navigate('Hub')}>
          <Icon name="hub" size={25} color="#000" />
          <Text style={styles.menuText}>Hub</Text>
        </Pressable>
        <Pressable style={styles.menuItem} onPress={() => navigation.navigate("helpScreen")}>
          <Icon name="help" size={25} color="#000" />
          <Text style={styles.menuText}>Help</Text>
        </Pressable>
        <Pressable style={[styles.menuItem, styles.logoutButton]} onPress={handleLogout}>
          <Text style={styles.menuText}>Logout</Text>
          <Icon name="logout" size={25} color="#000" />
        </Pressable>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 20,
    left: 0,
    width: '80%',
    height: screenHeight,
    backgroundColor: '#fff',
    padding: 20,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 5,
    borderRadius: 24,
    zIndex: 1000, // Add zIndex here

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
 
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  closeButton: {
    padding: 10,
  },
  menuContainer: {
    flex: 1, // This makes the menu items container take up the available space
    width:"100%",
    flexDirection: 'column', 
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
    marginTop: 'auto', 
    justifyContent:"space-between",
    alignItems: 'flex-end',
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:15,
  },
  placeholderText: {
    fontSize: 24,
    color: '#fff',
    fontWeight:"bold",
  },
  profileimage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default Sidebar;
