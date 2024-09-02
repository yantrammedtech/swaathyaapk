import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Footer = ({ activeRoute, navigation }) => {
  const getIconColor = (routeName) => activeRoute === routeName ? '#FFA500' : '#000';

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.iconContainer}
        onPress={() => navigation.navigate('dashboard')} >
        <Icon name="dashboard" size={26} color={getIconColor('dashboard')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}
        onPress={() => navigation.navigate('TriageDashboard')} >
        <Icon name="home" size={28} color={getIconColor('home')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}
        onPress={() => navigation.navigate('PeopleList')} >
        <Icon name="add" size={28} color={getIconColor('peopleList')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}
        onPress={() => navigation.navigate('Profile')} >
        <Icon name="person" size={28} color={getIconColor('profile')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Footer;
