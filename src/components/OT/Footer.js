import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet ,Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import Icon from 'react-native-vector-icons/FontAwesome'; 

const Footer = ({ activeRoute, navigation }) => {
  const getIconColor = (routeName) => activeRoute === routeName ? '#FFA500' : '#000';
  const [modalVisible, setModalVisible] = useState(false);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.iconContainer}
        onPress={() => navigation.navigate('dashboard')} >
        <Image source={require('../../assets/Property 1=search 3.png')} style={styles.images} />

      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}
        onPress={() => navigation.navigate('TriageDashboard')} >
        <Icon name="home" size={28} color={getIconColor('home')} />
      
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}
        onPress={() => navigation.navigate('OtDataVisualization')}
         >
        <Icon name="bar-chart" size={30} color="#000" />

      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}
        onPress={() => navigation.navigate('Profile')} >
        <Icon name="person" size={28} color={getIconColor('profile')} />
      </TouchableOpacity>
      {/* <EmergencyZoneSelector    visible={modalVisible}
        onClose={handleCloseModal}/> */}
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
  images: {
    width: 59,
    height: 32,
    
  },
});

export default Footer;
