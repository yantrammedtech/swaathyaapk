import React, { useEffect, useState } from "react";

import MedicalHistoryScreen from "./MedicalHistory";
import { View,Text ,StyleSheet,TouchableOpacity, Alert,ScrollView, Image} from "react-native"
import { authFetch } from "../../../axios/authFetch";
import { useSelector } from "react-redux";
import { authPatch } from "../../../axios/usePatch";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";



const MedicalHistoryForm =() => {
    const user = useSelector((state) => state.currentUserData);
    const currentPatient = useSelector((state) => state.currentPatientData);
    const patientTimeLineID = currentPatient?.patientTimeLineID;
    const navigation = useNavigation();


    const [flag, setFlag] = useState(true)
    const [isEdit, setisEdit] = useState(false)
    
  const [medicalHistoryData, setMedicalHistory] = React.useState({
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
    try {
      const response = await authFetch(
        `history/${user.hospitalID}/patient/${currentPatient.id}`,
        user.token
      );

      console.log("response=====hello", response);

      if (response.message === "success" && response.medicalHistory) {
        const medicalHistory = response.medicalHistory;

        setMedicalHistory({
          patientID: medicalHistory?.patientID,
          userID: medicalHistory?.userID,
          givenName: medicalHistory?.givenName,
          givenPhone: medicalHistory?.givenPhone,
          givenRelation: medicalHistory?.givenRelation,
          bloodGroup: medicalHistory?.bloodGroup,
          bloodPressure: medicalHistory?.bloodPressure,
          disease: medicalHistory?.disease,
          foodAllergy: medicalHistory?.foodAllergy,
          medicineAllergy: medicalHistory?.medicineAllergy,
          anaesthesia: medicalHistory?.anaesthesia,
          meds: medicalHistory?.meds,
          selfMeds: medicalHistory?.selfMeds,
          chestCondition: medicalHistory?.chestCondition,
          neurologicalDisorder: medicalHistory?.neurologicalDisorder,
          heartProblems: medicalHistory?.heartProblems,
          infections: medicalHistory?.infections,
          mentalHealth: medicalHistory?.mentalHealth,
          drugs: medicalHistory?.drugs,
          pregnant: medicalHistory?.pregnant,
          hereditaryDisease: medicalHistory?.hereditaryDisease,
          lumps: medicalHistory?.lumps,
          cancer: medicalHistory?.cancer,
          addedOn: medicalHistory.addedOn,
          lastModified: medicalHistory?.lastModified,
          familyDisease: medicalHistory?.familyDisease,
        });
      } 
      setFlag(false)
    } catch (error) {
      console.error("Error fetching medical history:", error);
    }
  };

  React.useEffect(() => {
    if (user.token && currentPatient.id) getMedicalHistory();
  }, [currentPatient.id, user]);


  
  const handleSave = async () => {
    
    const medicalResonse = await authPatch(
      `history/${user.hospitalID}/patient/${currentPatient.id}/${user.id}`,
      medicalHistoryData,
      user.token
    );
    if (medicalResonse.message == "success") {
      Alert.alert(
        "Update Status",
        "Medical successfully updated",
        [{ text: "OK" }],
        { cancelable: false }
      );
      setisEdit(false)
      
      // this will navigate previous path
      // navigate(-1);
    } else {
      Alert.alert("Error", medicalResonse.message, [{ text: "OK" }], {
        cancelable: false,
      });
    }
  };


  console.log("medical  data ===initial=====",medicalHistoryData)
    return(
        <View style={styles.container}>
          
<View style={styles.editcontainer}>
      <TouchableOpacity
        style={styles.editIcon}
        onPress={() => setisEdit(true)}
      >
        <Icon name="edit" size={24} color="#000" />
      </TouchableOpacity>
      </View>

{!isEdit && (
  

  
  <ScrollView contentContainerStyle={styles.scrollcontainer}>
  <View style={styles.card}>
    <View style={styles.row}>
      <Image 
         source={require('../../../assets/medicalhistory/Group.png')}// Add the appropriate icon URL
        style={styles.icon}
      />
      <Text style={styles.question}>Hepatitis C ?</Text>
      <Text style={styles.answer}> {medicalHistoryData?.infections
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
      <Text style={styles.answer}> {medicalHistoryData?.infections
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
      <Text style={styles.answer}>{medicalHistoryData?.infections
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
      <Text style={styles.answer}> {medicalHistoryData?.pregnant}</Text>
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
<Text style={styles.answer2}> {medicalHistoryData?.hereditaryDisease
                .split(",")
                .includes(heriditaryList[0])
                ? "Yes"
                : "No"}</Text>
  <View style={styles.horizontalLine} />

        </View>
        <View style={styles.col}>

<Text style={styles.question}>Mother</Text>
<Text style={styles.answer2}> {medicalHistoryData?.hereditaryDisease
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
<Text style={styles.answer2}> {medicalHistoryData?.hereditaryDisease
                .split(",")
                .includes(heriditaryList[2])
                ? "Yes"
                : "No"}</Text>
  <View style={styles.horizontalLine} />

        </View>

</View>
<View style={styles.row}>
<Text style={styles.answer2}>{medicalHistoryData?.familyDisease}</Text>
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
 <Text style={styles.answer}>{medicalHistoryData?.neurologicalDisorder}</Text>
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
 <Text style={styles.answer}>{medicalHistoryData?.heartProblems}</Text>
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
   <Text style={styles.answer}>{medicalHistoryData?.chestCondition}</Text>
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
<Text style={styles.answer}> {medicalHistoryData?.drugs}</Text>
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
 <Text style={styles.answer}>{medicalHistoryData?.mentalHealth}</Text>
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
   <Text style={styles.answer}> {medicalHistoryData?.cancer}</Text>
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
<Text style={styles.answer}> {medicalHistoryData?.lumps}</Text>
<View style={styles.horizontalLine} />
  </View>
</View>

</ScrollView>
)}



   
            {!flag && isEdit && (

            <MedicalHistoryScreen  medicalHistoryData={medicalHistoryData} setMedicalHistory={setMedicalHistory}/>
            )}
          

          {isEdit && (
 <TouchableOpacity style={styles.savebutton} onPress={handleSave}>
 <Text style={styles.buttonText}>Save</Text>
</TouchableOpacity>
          )}  
     
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
        marginBottom: 30, //temporary
      },
    savebutton: {
        backgroundColor: "#007BFF", // Blue background color
        paddingVertical: 12, // Vertical padding for the button
        paddingHorizontal: 24, // Horizontal padding for the button
        borderRadius: 4, // Rounded corners
        alignItems: "center", // Center the text horizontally
        justifyContent: "center", // Center the text vertically
        elevation: 3, // Add shadow for Android
        shadowColor: "#000", // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
        shadowOpacity: 0.2, // Shadow opacity for iOS
        shadowRadius: 4, // Shadow blur radius for iOS
        marginBottom: 25,
      },
      buttonText: {
        color: "#FFFFFF", // White text color
        fontSize: 16, // Font size
        fontWeight: "bold", // Bold text
      },
      editcontainer: {
        flexDirection: 'row', // Ensure the parent is a row
        justifyContent: 'flex-end', // Align child to the right
        padding: 10, // Add padding as needed
      },
      editIcon: {
        textAlign:"right",
        top: 10, // Adjust the top position as needed
        right: 10, // Adjust the right position as needed
      },

      scrollcontainer: {
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
    
})



export default MedicalHistoryForm