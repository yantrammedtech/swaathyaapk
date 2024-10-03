import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet ,TextInput, TouchableOpacity, ScrollView} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from 'react-redux';
import { CheckBox } from 'react-native-elements';
import { authPost } from '../../../axios/authPost';
import Toast from 'react-native-toast-message';
import { authFetch } from '../../../axios/authFetch';



const Other = () => {

  const others =   useSelector((state) => state.otPhysicalExamination.others);
  const data =  useSelector((state) => state.otPhysicalExamination);
  const  userType=useSelector((state)  => state.userType)

  const user = useSelector((state) => state.currentUserData);
  const currentPatient = useSelector((state) => state.currentPatientData);
  const patientTimeLineID = currentPatient?.patientTimeLineID;
  const dispatch = useDispatch()

const [patientStage, setPatientStage]=useState(0)

  
  const handleCheckboxChange = (field, value) => {
   
    dispatch({
      type: 'updateOtPhysicalExamination',
      payload: {
        others: {
          ...others,
          [field]: value,
        },
      },
    });
  };
  
  console.log("others=======",others)

    const [text, setText] = useState('');
    const navigation = useNavigation()

    const OTPatientStages = {
      PENDING: 1,
      APPROVED: 2,
      SCHEDULED: 3,
      OPERATED: 4,
    };

    
  const OTUserTypes = {
    ANESTHETIST: "ANESTHETIST",
    SURGEON: "SURGEON",
  };

  useEffect(() => {
    async function getPatientStatus() {
      try {
        
        const res = await authFetch(
          `ot/${user.hospitalID}/${patientTimeLineID}/getStatus`,
          user.token
        );
        if (res.status === 200) {
          const patientStatus =
            res.data[0].status.toUpperCase()   ;
          setPatientStage(OTPatientStages[patientStatus]);
        }
      } catch (err) {
        // console.log(err);
      }
    }
    if (user.token && user.hospitalID &&  patientTimeLineID) {
      getPatientStatus();
    }
  }, [setPatientStage, user.token, user.hospitalID, currentPatient,patientTimeLineID]);



    const isInitialTabsAPICallAllowed = () => {
      //const { patientStage, userType } = get();
      return (
        patientStage === OTPatientStages.PENDING &&
        userType === OTUserTypes.ANESTHETIST
      );
    };

    const handleNext = () => {

      const physicalExaminationData = {
        mainFormFields :data.mainFormFields,
        examinationFindingNotes : data.examinationFindingNotes,
        generalphysicalExamination :data.generalphysicalExamination,
        mallampatiGrade: data.mallampatiGrade,
        respiratory : data.respiratory,
        hepato :data.hepato,
        cardioVascular : data.cardioVascular,
        neuroMuscular: data.neuroMuscular,
        renal : data.renal,
        others : data.others,
      };

      const postPhysicalExamination = async () => {
        try {
          const response = await authPost(
            `ot/${user.hospitalID}/${patientTimeLineID}/physicalExamination`,
            { physicalExaminationData: physicalExaminationData },
            user.token
          );
          if (response.status === 201) {
            navigation.navigate("OtPreOP")
          } else {

            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Error',
              text2: 'Physical Examination Failed',
              visibilityTime: 3000,
              autoHide: true,
              bottomOffset: 40,
            });
          }
        } catch (err) {
          // console.log(err);
        }
      };

      if (isInitialTabsAPICallAllowed()) { 
        postPhysicalExamination();
      }
      }

      const handleNextNavigate = () =>{
        navigation.navigate("OtPreOP")
      }

    return (
        <ScrollView style={styles.container}>
          <View style={styles.checkboxGroup}>
      <CheckBox
        title="Hemat Disorder"
        checked={others.hematDisorder}
        onPress={() => handleCheckboxChange('hematDisorder', !others.hematDisorder)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Pregnant"
        checked={others.pregnant}
        onPress={() => handleCheckboxChange('pregnant', !others.pregnant)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Radiotherapy"
        checked={others.radiotherapy}
        onPress={() => handleCheckboxChange('radiotherapy', !others.radiotherapy)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Chemotherapy"
        checked={others.chemotherapy}
        onPress={() => handleCheckboxChange('chemotherapy', !others.chemotherapy)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Immune suppressed"
        checked={others.immuneSuppressed}
        onPress={() => handleCheckboxChange('immuneSuppressed', !others.immuneSuppressed)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Steroid use"
        checked={others.steroidUse}
        onPress={() => handleCheckboxChange('steroidUse', !others.steroidUse)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Cervical spine movement"
        checked={others.cervicalSpineMovement}
        onPress={() => handleCheckboxChange('cervicalSpineMovement', !others.cervicalSpineMovement)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Intraop urine output"
        checked={others.intraopUrineOutput}
        onPress={() => handleCheckboxChange('intraopUrineOutput', !others.intraopUrineOutput)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
      <CheckBox
        title="Blood loss to be recorded"
        checked={others.bloodLossToBeRecorded}
        onPress={() => handleCheckboxChange('bloodLossToBeRecorded', !others.bloodLossToBeRecorded)}
        disabled={currentPatient.status !== "pending"}
        containerStyle={{
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
        }}
      />
    </View>

          <Text  style={styles.heading}>Examination Finding Notes</Text>
            <View>
            <TextInput
        style={[styles.textInput, {
          opacity: currentPatient.status !== "pending" ? 0.5 : 1, // Apply opacity to indicate disabled state
          backgroundColor: currentPatient.status !== "pending" ? '#e0e0e0' : '#fff', // Change background color to indicate disabled
        }]}
        placeholder="Type here"
        value={text}
        onChangeText={(value) => setText(value)}
        editable={currentPatient.status === "pending"}
      />
            </View>

            {isInitialTabsAPICallAllowed() && (  // Check the condition
        <TouchableOpacity style={styles.savebutton} onPress={handleNext}> 
          <Text style={styles.buttonText}>Next</Text> 
        </TouchableOpacity>
      )}

{!isInitialTabsAPICallAllowed() && (  
        <TouchableOpacity style={styles.savebutton} onPress={handleNextNavigate}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      )}
   
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        marginBottom:100,
      },
      title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: "#FFA500", // Orange line
        paddingBottom: 5,
      },
      tagContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
      },
      tag: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e8f1fe",
    
        borderWidth: 1,
        borderColor: "#007AFF",
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginRight: 10,
        marginBottom: 10,
      },
      disabledText: {
        color: '#999999', // Disabled text color
      },
      disabledButton: {
        backgroundColor: '#cccccc', // Disabled background color
        opacity: 0.5, // Visually indicate that the button is disabled
      },
      tagText: {
        color: "#007AFF",
        fontSize: 14,
        fontWeight: "500",
        marginLeft: 5,
      },
      heading:{
        color:"#000",
        fontSize:18,
        fontWeight:'bold',
        marginTop:10,
        marginBottom:20,
      },
      textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 20,
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
    });

export default Other
