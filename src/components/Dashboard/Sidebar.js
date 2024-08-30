import React from 'react';
import { View, Text, Pressable, StyleSheet, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { height: screenHeight } = Dimensions.get('window');

const Sidebar = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.sidebar}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/logo_apk.png')}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <View>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
          </View>
        </View>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <Icon name="close" size={30} color="#000" />
        </Pressable>
      </View>
      <View style={styles.menuContainer}>
        <Pressable style={styles.menuItem}>
          <Icon name="person" size={25} color="#000" />
          <Text style={styles.menuText}>View Profile</Text>
        </Pressable>
        <Pressable style={styles.menuItem}>
          <Icon name="hub" size={25} color="#000" />
          <Text style={styles.menuText}>Hub</Text>
        </Pressable>
        <Pressable style={styles.menuItem}>
          <Icon name="help" size={25} color="#000" />
          <Text style={styles.menuText}>Help</Text>
        </Pressable>
        <Pressable style={[styles.menuItem, styles.logoutButton]}>
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
    top: 0,
    left: 0,
    width: '80%',
    height: screenHeight,
    backgroundColor: '#fff',
    padding: 20,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 5,
    borderRadius: 24,
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
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
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
    marginTop: '97%',
    justifyContent:"space-between"
  },
});

export default Sidebar;
