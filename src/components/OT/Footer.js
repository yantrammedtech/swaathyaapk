import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet ,Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
// import Icon from 'react-native-vector-icons/FontAwesome'; 

const Footer = ({ activeRoute, navigation }) => {
  const  userType=useSelector((state)  => state.userType)  

  const getIconColor = (routeName) => activeRoute === routeName ? '#FFA500' : '#000';
  const [modalVisible, setModalVisible] = useState(false);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const isSurgeon =  userType === "SURGEON"

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.iconContainer}
        onPress={() => navigation.navigate('dashboard')} >
        <Icon name="dashboard" size={24} color={getIconColor('dashboard')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}
        onPress={() => navigation.navigate('OtDashboard')} >
        <Icon name="home" size={28} color={getIconColor('home')} />
      
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}
        onPress={() => navigation.navigate('OtDataVisualization')}
         >
        <Icon name="bar-chart" size={30} color={getIconColor('bar-chart')} />

      </TouchableOpacity>
      {isSurgeon && (
 <TouchableOpacity style={styles.iconContainer}
 onPress={() => navigation.navigate('Calendar')} >
 <Icon name="calendar-today" size={28} color={getIconColor('Calendar')} />
</TouchableOpacity>
      )}
     
    
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
