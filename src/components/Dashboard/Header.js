// import { Header } from '@react-navigation/stack';
import React from 'react';
import { View, Image, Pressable , StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Or any other icon set you prefer

const Header = ({ toggleSidebar, onNotificationPress }) => {
  return (
    <View style={styles.header}>
        <Pressable onPress={toggleSidebar} style={styles.iconContainer}>
          <Icon name="menu" size={30} color="#000" />
        </Pressable>
        <Image
          source={require('../../assets/logo_apk.png')} 
          style={styles.logo}
        />
        <Pressable onPress={onNotificationPress} style={styles.iconContainer}>
          <Icon name="notifications" size={30} color="#000" />
        </Pressable>
      </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff', // Change to your preferred background color
    top:20,
    marginBottom:10,
  },
  iconContainer: {
    padding: 10,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
});

export default Header;
