import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Image } from 'react-native';

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import VitalCard from './vitalCard';
import { authFetch } from '../../../axios/authFetch';
import { useDispatch, useSelector } from 'react-redux';

const VitalsTab = () => {
  const user = useSelector((state) => state.currentUserData);
  const currentPatient = useSelector((state) => state.currentPatientData);
  const patientTimeLineID = currentPatient?.patientTimeLineID;
  const vitalsData = useSelector((state) => state.vitals[0])
const dispatch= useDispatch()
  const [modalVisible, setModalVisible] = useState(false);
  const [vitals, setVitals ] = useState([]);
const latestOxygen = vitalsData?.oxygen[0]?.oxygen;
const latestTemperature = vitalsData?.temperature[0]?.temperature;
const latestPulse = vitalsData?.pulse[0]?.pulse;

const [latestOxygenNumber, setLatestOxygenNumber] = useState(0);

useEffect(() => {
  if (!isNaN(latestOxygen)) {
    setLatestOxygenNumber(Number(latestOxygen));
  }
}, [latestOxygen]);



const latestBp = vitalsData?.bp[0]?.bp;

const bpData = latestBp ? latestBp.split('/') : [];
     
let diastolic;
let systolic
if (Array.isArray(bpData) && bpData.length === 2) {
     systolic = parseInt(bpData[0].trim(), 10);
     diastolic = parseInt(bpData[1].trim(), 10);

} else {
    console.error("bpData does not have the expected format:", bpData);
}

  const handleAddVitalsPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSaveVitals = (vitals) => {
    console.log('Vitals saved:', vitals);
    // Save vitals data or perform any actions needed
  };

  const getAllVitals = async () => {
    const response = await authFetch(
      `vitals/${user.hospitalID}/${patientTimeLineID}`,
      user.token
    );
    // console.log("getAllVitals=====",response)
    if (response.message == "success") {
      const allVitals = response.vitals
      const oxygenFilteredAndSortedVitals = allVitals.filter(vital => vital.oxygen > 0).sort((a, b) => new Date(b.addedOn) - new Date(a.addedOn));
      const oxygenValues = oxygenFilteredAndSortedVitals.map(vital => vital.oxygen);
      // console.log("o2" ,oxygenFilteredAndSortedVitals);
    const pulseFilteredAndSortedVitals = allVitals.filter(vital => vital.pulse > 0).sort((a, b) => new Date(b.addedOn) - new Date(a.addedOn));
    // console.log("pulse" ,pulseFilteredAndSortedVitals);
    const temperatureFilteredAndSortedVitals = allVitals.filter(vital => vital.temperature > 0).sort((a, b) => new Date(b.addedOn) - new Date(a.addedOn));
    // console.log("temperatureFilteredAndSortedVitals" ,temperatureFilteredAndSortedVitals);
    
    const bpFilteredAndSortedVitals = allVitals.filter(vital => vital.bp !== '').sort((a, b) => new Date(b.addedOn) - new Date(a.addedOn));
    // console.log("bpFilteredAndSortedVitals" ,bpFilteredAndSortedVitals);
    
    const respiratoryRateFilteredAndSortedVitals = allVitals.filter(vital => vital.respiratoryRate > 0).sort((a, b) => new Date(b.addedOn) - new Date(a.addedOn));
    // console.log("respiratoryRateFilteredAndSortedVitals" ,respiratoryRateFilteredAndSortedVitals);
    console.log("Dispatching Vitals Data:", {
      oxygen: oxygenFilteredAndSortedVitals,
      pulse: pulseFilteredAndSortedVitals,
      temperature: temperatureFilteredAndSortedVitals,
      respiratoryRate: respiratoryRateFilteredAndSortedVitals,
      bp: bpFilteredAndSortedVitals
    });
     
    const data = {
      oxygen: oxygenFilteredAndSortedVitals,
      pulse: pulseFilteredAndSortedVitals,
      temperature: temperatureFilteredAndSortedVitals,
      respiratoryRate: respiratoryRateFilteredAndSortedVitals,
      bp: bpFilteredAndSortedVitals,
    };
    dispatch({
      type: "updateVitals",
      payload:data
      
    });
      setVitals(response.vitals);

    }
  };
  useEffect(() => {
    getAllVitals()
  },[user, currentPatient])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
      <View style={styles.vitalCard}>
      {/* Row for Image and Title */}
      <View style={styles.rowOxygen}>
      <View style={styles.row}>
        <Image
          source={require('../../../assets/vitals/heart.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Blood Pressure</Text>
      </View>
      <Image
          source={require('../../../assets/vitals/graph.png')}
          style={styles.image2}
          resizeMode="contain"
        />
      </View>
     
      
      <View style={styles.minMax} >
        <Text style={styles.text}>Max:        
          <Text style={styles.textValue}> {systolic} bpm</Text>
          </Text>
        <Text style={styles.text}>Min: 
        <Text style={styles.textValue}> {diastolic} bpm</Text>
          </Text>
      </View>
    </View>


        <View style={styles.vitalCard}>
          {/* <Icon name="thermostat" size={30} color="orange" /> */}
         <View  style={styles.rowOxygen}>
         <View style={styles.row}>
        <Image
          source={require('../../../assets/vitals/tem.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}> Temperature</Text>
      </View>
      <Image
          source={require('../../../assets/vitals/char.png')}
          style={styles.image}
          resizeMode="contain"
        />
         </View>
      <View style={styles.minMax} >
          <Text style={styles.textValue}> {latestTemperature} °C</Text>
        
        {/* <Text style={styles.textValue}> 98 °F</Text> */}
      </View>
         
        </View>

        <View style={styles.vitalCard}>
          {/* <Icon name="bloodtype" size={30} color="red" /> */}
          <View style={styles.rowOxygen}>
       <View  style={styles.row}>
       <Image
          source={require('../../../assets/vitals/blod.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}> Oxygen Saturation</Text>
       </View>
        <View style={styles.circularProgressContainer}>
        <AnimatedCircularProgress
          size={50} // Adjusted size
          width={6} // Adjusted width
          fill={latestOxygenNumber}
          tintColor="#dc5c5c"
          backgroundColor="#eaeaea"
        >
          {(fill) => <Text style={styles.circleText}>{`${fill}%`}</Text>}
        </AnimatedCircularProgress>
      </View>
      </View>
     

        
        </View>

        <View style={styles.vitalCard}>
          {/* <Icon name="favorite" size={30} color="blue" /> */}
          <View style={styles.rowOxygen}>
       <View style = {styles.row}>
       <Image
          source={require('../../../assets/vitals/pulse.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}> Pulse Rate</Text>

       </View>
        <Image
          source={require('../../../assets/vitals/whitePulse.png')}
          style={styles.image2}
          resizeMode="contain"
        />

      </View>
        <Text style={styles.textValue}> {latestPulse} bpm</Text>

         
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddVitalsPress}>
        <Text style={styles.addButtonText}>+ Add Vitals</Text>
      </TouchableOpacity>

      <VitalCard visible={modalVisible} onClose={handleCloseModal} onSave={handleSaveVitals} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom:80,
  },
  section: {
    alignItems: 'center',
  },
  vitalCard: {
    padding: 20,
    marginVertical: 10,
    width: '90%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#d9d9d9',
  },
  row: {
    flexDirection: 'row', // Arrange items in a row
    alignItems: 'center', // Align items vertically center
    marginBottom: 2, // Add space between rows
  },
  rowOxygen:{
    flexDirection: 'row', // Arrange items in a row
    justifyContent:"space-between",
    marginBottom: 2, 
  },
  minMax:{
      flexDirection: 'row', // Arrange items in a row
      alignItems: 'center',
      justifyContent:"space-between",
      width:'60%'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    // marginBottom: 5,
  },
  textValue:{
   fontWeight:'500'
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 40,
    width: '80%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  circleText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  image:{
    width:30,
    height:30,
    marginRight:10,
  },
  image2:{
    width:60,
    height:40,
    marginRight:10,
  },
  circularProgressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VitalsTab;
