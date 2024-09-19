import React, { useEffect, useState } from "react";

import MedicalHistoryScreen from "./MedicalHistory";
import { View,Text ,StyleSheet,TouchableOpacity, Alert} from "react-native"
import { authFetch } from "../../../axios/authFetch";
import { useSelector } from "react-redux";
import { authPatch } from "../../../axios/usePatch";


const MedicalHistoryForm =() => {
    const user = useSelector((state) => state.currentUserData);
    const currentPatient = useSelector((state) => state.currentPatientData);
    const patientTimeLineID = currentPatient?.patientTimeLineID;

    const [flag, setFlag] = useState(true)
    
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

            {!flag && (

            <MedicalHistoryScreen  medicalHistoryData={medicalHistoryData} setMedicalHistory={setMedicalHistory}/>
            )}
          
            
      <TouchableOpacity style={styles.savebutton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
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
})



export default MedicalHistoryForm