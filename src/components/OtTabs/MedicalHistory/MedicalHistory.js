import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { authFetch } from '../../../axios/authFetch';

const MedicalHistory = () => {

    const user = useSelector((state) => state.currentUserData);
    const currentPatient = useSelector((state) => state.currentPatientData);
    const patientTimeLineID = currentPatient?.patientTimeLineID;

  
    const [medicalHistory, setMedicalHistory] = React.useState({
        patientID: 0,
        userID: 0,
        givenName: "",
        givenPhone: "",
        givenRelation: "",
        bloodGroup: "",
        bloodPressure: "",
        disease: "",
        foodAllergy: "",
        medicineAllergy: "",
        anaesthesia: "",
        meds: "",
        selfMeds: "",
        chestCondition: "",
        neurologicalDisorder: "",
        heartProblems: "",
        infections: "",
        mentalHealth: "",
        drugs: "",
        pregnant: "",
        hereditaryDisease: "",
        lumps: "",
        cancer: "",
        familyDisease: "",
      });
    
  const infectionList = ["HIV", "Hepatitis B", "Hepatitis C"];
  const heriditaryList = ["Father", "Mother", "Siblings"];


    const getMedicalHistory = async () => {
        const response = await authFetch(
          `history/${user.hospitalID}/patient/${currentPatient.id}`,
          user.token
        );
        if (response.message == "success") {
          setMedicalHistory(response.medicalHistory);
        }
      };
      React.useEffect(() => {
        if (user.token && currentPatient.id ) {
          getMedicalHistory();
        }
      }, [currentPatient, user]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            <View style={styles.row}>
              <Image 
                 source={require('../../../assets/medicalhistory/Group.png')}// Add the appropriate icon URL
                style={styles.icon}
              />
              <Text style={styles.question}>Hepatitis C ?</Text>
              <Text style={styles.answer}> {medicalHistory?.infections
                        .split(",")
                        .includes(infectionList[2])
                        ? "Yes"
                        : "No"}</Text>
            </View>
            <View style={styles.row}>
              <Image 
               source={require('../../../assets/medicalhistory/hiv (1).png')}
                style={styles.icon}
              />
              <Text style={styles.question}>HIV ?</Text>
              <Text style={styles.answer}> {medicalHistory?.infections
                        .split(",")
                        .includes(infectionList[0])
                        ? "Yes"
                        : "No"}</Text>
            </View>
            <View style={styles.row}>
              <Image 
                 source={require('../../../assets/medicalhistory/hiv (2).png')}// Add the appropriate icon URL
                style={styles.icon}
              />
              <Text style={styles.question}>Hepatitis B ?</Text>
              <Text style={styles.answer}>{medicalHistory?.infections
                        .split(",")
                        .includes(infectionList[1])
                        ? "Yes"
                        : "No"}</Text>
            </View>
            <View style={styles.row}>
              <Image 
                 source={require('../../../assets/medicalhistory/pregnent.png')} // Add the appropriate icon URL
                style={styles.icon}
              />
              <Text style={styles.question}>Pregnant</Text>
              <Text style={styles.answer}> {medicalHistory?.pregnant}</Text>
            </View>
          </View>
          
          {/* Add additional sections as needed */}
          <View style={styles.familyCard}>
            <Image 
               source={require('../../../assets/medicalhistory/family.png')}// Add the appropriate family icon URL
              style={styles.familyIcon}
            />
            <View>
            <Text style={styles.sectionTitle}>Any Known Diseases In Family?</Text>
            <View style={styles.row}>
            <View style={styles.col}>

        <Text style={styles.question}>Father</Text>
        <Text style={styles.answer2}> {medicalHistory?.hereditaryDisease
                        .split(",")
                        .includes(heriditaryList[0])
                        ? "Yes"
                        : "No"}</Text>
          <View style={styles.horizontalLine} />

                </View>
                <View style={styles.col}>

<Text style={styles.question}>Mother</Text>
<Text style={styles.answer2}> {medicalHistory?.hereditaryDisease
                        .split(",")
                        .includes(heriditaryList[1])
                        ? "Yes"
                        : "No"}</Text>
<View style={styles.horizontalLine} />

        </View>
                
      </View>
     

        
      <View style={styles.row}>
            <View style={styles.col}>

        <Text style={styles.question}>Siblings</Text>
        <Text style={styles.answer2}> {medicalHistory?.hereditaryDisease
                        .split(",")
                        .includes(heriditaryList[2])
                        ? "Yes"
                        : "No"}</Text>
          <View style={styles.horizontalLine} />

                </View>

        </View>
        <View style={styles.row}>
<Text style={styles.answer2}>{medicalHistory?.familyDisease}</Text>
        </View>
            </View>
          </View>



           {/* Epilepsy or Neurological Disorder Card */}
      <View style={styles.neurologicalCard}>
        <View style={styles.row}>
          <Image 
             source={require('../../../assets/medicalhistory/fluent-emoji-flat_brain.png')}
            style={styles.icon}
          />
         <Text style={styles.question}>Epilepsy or Neurological disorder</Text>
       
        
        </View>
        <View style={styles.col}>
         <Text style={styles.answer}>{medicalHistory?.neurologicalDisorder}</Text>
         <View style={styles.horizontalLine} />
          </View>
        <View style={styles.neurorow}>
          <Image 
            source={require('../../../assets/medicalhistory/bi_heart-pulse-fill.png')}
            style={styles.icon}
          />
         <Text style={styles.question}>Heart</Text>
         
         
        </View>
        <View style={styles.col}>
         <Text style={styles.answer}>{medicalHistory?.heartProblems}</Text>
         <View style={styles.horizontalLine} />
          </View>
        <View style={styles.neurorow}>
          <Image 
           source={require('../../../assets/medicalhistory/clarity_heart-broken-solid.png')}
            style={styles.icon}
          />
           <Text style={styles.question}>Chest pain</Text>
          
         
        </View>
        <View style={styles.col}>
           <Text style={styles.answer}>{medicalHistory?.chestCondition}</Text>
           <View style={styles.horizontalLine} />
          </View>
        <View style={styles.neurorow}>
          <Image 
           source={require('../../../assets/medicalhistory/fluent_drink-bottle-off-32-filled.png')}
            style={styles.icon}
          />
        <Text style={styles.question}>Any Addictions</Text>
       
         
        </View>
        <View style={styles.col}>
        <Text style={styles.answer}> {medicalHistory?.drugs}</Text>
        <View style={styles.horizontalLine} />
          </View>
      </View>


      <View style={styles.healthCard}>
        <View style={styles.row}>
          <Image 
             source={require('../../../assets/medicalhistory/icon-park_brain.png')}
            style={styles.icon}
          />
         <Text style={styles.question}>Any Mental Health Problems?</Text>
       
        
        </View>
        <View style={styles.col}>
         <Text style={styles.answer}>{medicalHistory?.mentalHealth}</Text>
         <View style={styles.horizontalLine} />
          </View>
        <View style={styles.neurorow}>
          <Image 
            source={require('../../../assets/medicalhistory/solar_bone-broken-bold.png')}
            style={styles.icon}
          />
         <Text style={styles.question}>Any bone/Joint Disease?</Text>
         
         
        </View>
        <View style={styles.col}>
         <Text style={styles.answer}>NO</Text>
         <View style={styles.horizontalLine} />
          </View>
        <View style={styles.neurorow}>
          <Image 
           source={require('../../../assets/medicalhistory/Frame 3593.png')}
            style={styles.icon}
          />
           <Text style={styles.question}>Been through Cancer?</Text>
          
         
        </View>
        <View style={styles.col}>
           <Text style={styles.answer}> {medicalHistory?.cancer}</Text>
           <View style={styles.horizontalLine} />
          </View>
        <View style={styles.neurorow}>
          <Image 
           source={require('../../../assets/medicalhistory/image 16.png')}
            style={styles.icon}
          />
        <Text style={styles.question}>Lumps found ?</Text>
       
         
        </View>
        <View style={styles.col}>
        <Text style={styles.answer}> {medicalHistory?.lumps}</Text>
        <View style={styles.horizontalLine} />
          </View>
      </View>
      
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        padding: 10,
        alignItems: 'center',
      },
      card: {
        backgroundColor: '#95d5ea', // Light blue background color
        borderRadius: 10,
        padding: 20,
        width: '90%',
        marginBottom: 20,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        flexWrap: 'wrap', 
      },
      col:{
        flexDirection: 'column',
        alignItems: 'center',
      },
      neurorow:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
      },
      icon: {
        width: 30,
        height: 30,
        marginRight: 10,
      },
      question: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color:"#fff"
      },
      answer: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        color:"#fff"

      },
      answer2: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'right',
        color:"#fff"

      },
      familyCard: {
        backgroundColor: '#f2b5f4', // Light pink background color
        borderRadius: 10,
        padding: 20,
        width: '90%',
        alignItems: 'center',
        marginBottom: 20,
      },
      familyIcon: {
        width: 100,
        height: 100,
      },
      neurologicalCard: {
        backgroundColor: '#baa5f8', // Light purple background color
        borderRadius: 10,
        padding: 20,
        width: '90%',
        marginBottom: 20,
      },
      healthCard: {
        backgroundColor: '#67d1dd', // Light purple background color
        borderRadius: 10,
        padding: 20,
        width: '90%',
        marginBottom: 80,
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color:"white",
      },
    
  horizontalLine: {
    minWidth: '48%', // Line should be 45% of the parent width
    height: 1, // Height of the line
    backgroundColor: '#fff', // Line color
    marginTop: 1, // Space between the text and the line
    marginBottom:10,
    width:"100%"
  },
    
      
    });

export default MedicalHistory
