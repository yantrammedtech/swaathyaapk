import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { authFetch } from '../../axios/authFetch';
import { useSelector } from 'react-redux';
import TriageFormContext, { GetTriageFormDataObject } from './Context/TriageFormContext';
import { zoneType } from '../../utility/role';
import { authPost } from '../../axios/authPost';
import Toast from 'react-native-toast-message';


const RedZonePage = ({ route }) => {
  const {   condition } = route.params;
  const patientImage=''
  const user = useSelector((state) => {
    return state.currentUserData
  })
  const currentPatientData = useSelector((state) => state.currentPatientData)
  const triageData = useSelector((state) => state.triageData)
  console.log("triag", triageData)
  
  // Get the navigation object
  const navigation = useNavigation();
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [wards, setWards] = useState([]);
  const { formData, setFormData } = useContext(TriageFormContext);


  const getWardData = async () => {
    const wardResonse = await authFetch(
      `ward/${user.hospitalID}`,
      user.token
    );
    if (wardResonse.message == "success") {
      setWards(wardResonse.wards);
    }
  };

  useEffect(() => {
    getWardData()
  },[])
 
  const handleCriticalCondition = (selectedWard) => {
    if (!condition) return;
    setFormData((prev) => ({
      ...prev,
      criticalCondition: condition,
      ward: selectedWard,
      zone: zoneType.red,
    }));
    navigate("./zone");
  };

  
  useEffect(() => {
    setFormData((p) => ({ ...p, lastKnownSequence: "criticalCondition" }));
  }, [setFormData]);


  const getBackgroundColor = () => {
    switch (selectedZone) {
      case 'red':
        return '#F65555';
      case 'yellow':
        return '#F7AC38'; 
      case 'green':
        return '#1DDD8D'; 
      default:
        return 'white'; // Default background color
    }
  };
  let zone;

  useEffect(() => {
    // Determine the zone value based on selectedZone
     if(selectedZone === "red"){
      zone = "1"
     }
    else if (selectedZone === "yellow"){
     zone='2'
    }
    else {
    zone ='3'
    }
    
  
    setFormData((prev) => ({
      ...prev,
      criticalCondition: condition,
      ward: selectedWard,
      zone: zoneValue,
    }));
  }, [condition, selectedWard, selectedZone]);

  const handleSubmit = async() => {
    const data = GetTriageFormDataObject(formData) ;
    if (!selectedWard) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please select a ward.',
      });
      return;
    }
    
    if (!zone) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please select a zone.',
      });
      return;
    }
    data.ward = selectedWard;
    data.zone = zone;
    data.hospitalID = user.hospitalID;
    data.userID = user.id;
    console.log("data===",data)
    console.log("currentPatientData===", currentPatientData); 
    try {
      const res = await authPost(
        `triage/${user.hospitalID}/${currentPatientData.id}`,
        data,
        user.token
      );
      if (res.message === "success") {
        console.log("res==",res)
        setIsLoading(false);
      } else console.log("Error", res);
    } catch (error) {
      console.log("triage error", error);
    }

    // Navigate to the TriageDashboard screen
    navigation.navigate('TriageDashboard');
  };
  const getPickerBackgroundColor = () => {
    return selectedWard ? '#4792f5' : 'white'; // Change color based on selection
  };
  const getTextColor = () => {
    return getPickerBackgroundColor() === '#4792f5' ? 'white' : 'black'; // White text on blue, black otherwise
  };

  console.log("selectwar",selectedWard)
  console.log("zone===",selectedZone)
  console.log("currentdata==",currentPatientData)

  
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const backgroundColor = getRandomColor();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.patientInfo}>
        <Text style={styles.patientText}>{currentPatientData.pName} is under {selectedZone}</Text>
        {currentPatientData.imageURL ? (
          <Image source={{ uri: currentPatientData.imageURL }} style={styles.profileImage} />
        ) : (
          <View style={[styles.placeholderImage, { backgroundColor }]}>
            <Text style={styles.placeholderText}>
              {currentPatientData.pName ? currentPatientData.pName.charAt(0).toUpperCase() : ''}
            </Text>
          </View>
        )}
      </View>
{/* 
      <View style={[styles.zoneContainer, { backgroundColor: getBackgroundColor() }]}>
        <DropDownPicker
          open={open}
          value={selectedZone}
          items={items}
          setOpen={setOpen}
          setValue={setSelectedZone}
          setItems={setItems}
          placeholder="Select Zone"
          style={[styles.dropdown, { backgroundColor: getBackgroundColor() }]}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View> */}

<View style={[styles.pickerWrapper, { backgroundColor: getBackgroundColor() }]}>
        <Picker
          selectedValue={selectedZone}
          style={[styles.picker, { backgroundColor: 'transparent' }]} // Transparent Picker for color
          onValueChange={(itemValue) => setSelectedZone(itemValue)}
        >
          <Picker.Item label="Select Zone" value={null} />
          <Picker.Item label="Red Zone" value="red" />
          <Picker.Item label="Yellow Zone" value="yellow" />
          <Picker.Item label="Green Zone" value="green" />
        </Picker>
      </View>

      <View style={styles.dropdownContainer}>
      <View style={[styles.pickerWrapper, { backgroundColor: getPickerBackgroundColor() }]}>
        <Picker
          selectedValue={selectedWard}
          style={[styles.picker, { backgroundColor: 'transparent' }]} // Transparent Picker for color
          onValueChange={(itemValue) => setSelectedWard(itemValue)}
        >
           <Picker.Item label="Select Ward" value="" />
          {wards.map((el, index) => (
            <Picker.Item key={index} label={el.name} value={el.name} />
          ))}
        </Picker>
      </View>
    </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  patientInfo: {
    marginBottom: 20,
    alignItems: 'center',
  },
  patientText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  patientImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  zoneContainer: {
    marginBottom: 20,
    borderRadius: 5,
  },
  dropdown: {
    height: 50,
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  
  pickerContainer: {
    borderRadius: 5,
    borderWidth: 1,
  
  },
  pickerWrapper: {
    borderRadius: 5,
    borderWidth: 1,
   margin:10,
  },
 
  picker: {
    height: 50,
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: '#1977f3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 20,
  },
  placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
  },
  placeholderText: {
    fontSize: 24,
    color: '#fff',
    fontWeight:"bold",
  },
});

export default RedZonePage;
