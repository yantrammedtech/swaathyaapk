import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EmergencyTriage = ({ route, navigation }) => {
  const { patientId, patientName, patientImage } = route.params;

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('PeopleList'); // Navigate to "PeopleList" if no back action is possible
    }
  };
  const handleImagePress = (patientImage) => {
    navigation.navigate('RedZonePage', { 
      patientName,
      patientImage,  // Pass the patient image to the next screen
    });
  };
  const handleSkipPress = () => {
    navigation.navigate('EmergencyTriageScreen'); // Navigate to AlertTriage page
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
      <TouchableOpacity style={styles.skipButton} onPress={handleBackPress}>
          <Icon
            name="chevron-left"
            size={24}
            color="#fff"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Triage</Text>
      </View>

      {/* Patient Information Section */}
      <View style={styles.patientInfoContainer}>
        <Image source={patientImage} style={styles.profileImage} />
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>{patientName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>ID</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>{patientId}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Doctor Name</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>Unassigned</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Admit Date</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>Not Available</Text>
        </View>
      </View>

      {/* Critical Condition Section */}
      <View style={styles.criticalConditionContainer}>
        <Text style={styles.criticalConditionText}>Select a Critical Condition</Text>
        <View style={styles.imageRow}>
        <TouchableOpacity onPress={() => handleImagePress(patientImage)}>
            <Image source={require('../../assets/Frame 3547.png')} style={styles.criticalImage} />
          </TouchableOpacity>
          <Image source={require('../../assets/Frame 3546.png')} style={styles.criticalImage} />
        </View>
        <Image source={require('../../assets/Frame 3548.png')} style={styles.centerImage} />

        {/* Skip Button */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkipPress}>
          <Text style={styles.skipButtonText}>Skip</Text>
          <TouchableOpacity style={styles.closeButton}>
            <Icon name="arrow-upward" size={24} color="#1977f3" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1977f3',
    paddingTop: 60, // Adjust for header height
    // paddingHorizontal: 20,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#1977f3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backIcon: {
    position: 'absolute',
    left: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  patientInfoContainer: {
    alignItems: 'center',
    marginTop: 10, 
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    color: '#fff',
    width: 120, // Adjust width as needed to align labels
  },
  colon: {
    fontSize: 18,
    color: '#fff',
    paddingHorizontal: 5, // Adjust the spacing around the colon
  },
  value: {
    fontSize: 18,
    color: '#fff',
    flex: 1,
  },
  criticalConditionContainer: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
    width:"100%",
  },
  criticalConditionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
    paddingLeft: 20,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  criticalImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  centerImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1977f3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 30, // Adjust as needed
  },
  skipButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 10,
  },
  closeButton: {
    width: 36,
    height: 36,
    backgroundColor: '#fff',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '90deg' }],
  },
});

export default EmergencyTriage;
