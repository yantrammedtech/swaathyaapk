import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView,Text } from 'react-native';
import { RadioButton, TextInput, Button, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { authFetch } from '../../axios/authFetch';
import { useSelector } from 'react-redux';
import { Role_NAME } from '../../utility/role';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import { authPatch } from '../../axios/usePatch';

const TransferPatientForm = () => {
  const user = useSelector((state) => state.currentUserData);
  const currentPatient = useSelector((state) => state.currentPatientData);
  const patientTimeLineID = currentPatient?.patientTimeLineID;

    const navigation = useNavigation();

  const [transferType, setTransferType] = useState('internal');
  const [ward, setWard] = useState('');
  const [reason, setReason] = useState('');
  const [oxygen, setOxygen] = useState('');
  const [bpHigh, setBpHigh] = useState('');
  const [bpLow, setBpLow] = useState('');
  const [temperature, setTemperature] = useState('');
  const [pulse, setPulse] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [relativeName, setRelativeName] = useState('');

  const [doctor, setDoctor] = useState('Ravindra');
  const [open, setOpen] = useState(false);

  const [doctorList, setDoctorList] = React.useState([]);

  const [wardOpen, setWardOpen] = useState(false);

  const [wardList, setWardList] = React.useState([]);

  const [vitals,setVitals] = useState([])


  const getWardData = async () => {
    const wardResonse = await authFetch(`ward/${user.hospitalID}`, user.token);
    if (wardResonse.message == "success") {
      setWardList(wardResonse.wards);
    }
  };

  const getAllDepartment = async () => {
   
    const doctorResponse = await authFetch(
      `user/${user.hospitalID}/list/${Role_NAME.doctor}`,
      user.token
    );
    if (doctorResponse.message == "success") {
      setDoctorList(doctorResponse.users);
    }
  };
  const getAllVitals = async () => {
    const response = await authFetch(
      `vitals/${user.hospitalID}/${patientTimeLineID}`,
      user.token
    );
    // console.log("vitals", response);
    if (response.message == "success") {
      setVitals(response.vitals);
    }
  };

  React.useEffect(() => {
    if (user.token) {
      getWardData();
      getAllVitals();
      getAllDepartment();
    }
  }, [user]);

  
  const initialState = {
    oxygen: 0,
    pulse: 0,
    temp: 0,
    respiratoryRate:0,
    bpH: "",
    bpL: "",
  };
  
  React.useEffect(() => {
    let vitalObj = initialState;
    vitals.reverse().forEach((el) => {
      vitalObj = {
        oxygen: vitalObj.oxygen ? vitalObj.oxygen : el.oxygen,
        pulse: vitalObj.pulse ? vitalObj.pulse : el.pulse,
        respiratoryRate: vitalObj.respiratoryRate ? vitalObj.respiratoryRate : el.respiratoryRate,

        temp: vitalObj.temp ? vitalObj.temp : el.temperature,
        bpH: vitalObj.bpH ? vitalObj.bpH : el.bp?.split("/")[0],
        bpL: vitalObj.bpL ? vitalObj.bpL : el.bp?.split("/")[1],
      };
    });
    formData.bpH.value = vitalObj.bpH;
    formData.oxygen.value = vitalObj.oxygen;
    formData.respiratoryRate.value = vitalObj.respiratoryRate;
    formData.pulse.value = vitalObj.pulse;
    formData.temp.value = vitalObj.temp;
    formData.bpL.value = vitalObj.bpL;
  }, [vitals]);


  const [formData, setFormData] = React.useState({
    transferType: {
      valid: false,
      message: "",
      value: 0,
      showError: false,
      name: "transferType",
    },
    wardID: {
      valid: false,
      message: "",
      value: 0,
      showError: false,
      name: "wardID",
    },
    userID: {
      valid: false,
      message: "",
      value: 0,
      showError: false,
      name: "userID",
    },
    departmentID: {
      valid: false,
      message: "",
      value: 0,
      showError: false,
      name: "departmentID",
    },
    reason: {
      valid: false,
      message: "",
      value: "",
      showError: false,
      name: "reason",
    },
    bpL: {
      valid: true,
      message: "",
      value: "",
      showError: false,
      name: "bpL",
    },
    bpH: {
      valid: true,
      message: "",
      value: "",
      showError: false,
      name: "bpH",
    },
    oxygen: {
      valid: true,
      message: "",
      value: 0,
      showError: false,
      name: "oxygen",
    },
    temp: {
      valid: true,
      message: "",
      value: 0,
      showError: false,
      name: "temp",
    },
    pulse: {
      valid: true,
      message: "",
      value: 0,
      showError: false,
      name: "pulse",
    },
    respiratoryRate: {
      valid: true,
      message: "",
      value: "",
      showError: false,
      name: "respiratoryRate",
    },
    hospitalName: {
      valid: true,
      message: "",
      value: "",
      showError: false,
      name: "hopitalName",
    },
    relativeName: {
      valid: false,
      message: "",
      value: "",
      showError: false,
      name: "relativeName",
    },
  });

  const handleChange = (name, value) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: {
          ...prevData[name],
          value: value,
        },
      };
    });
    
    // Validate inputs immediately after changing the value
    validateInputs(name, value);
};

const validateInputs = (changedField, newValue) => {
    const newErrors = {};

    // Parse values as integers
    const oxygenValue = parseInt(newValue || formData.oxygen.value, 10);
    const bpHighValue = parseInt(formData.bpH.value, 10);
    const bpLowValue = parseInt(formData.bpL.value, 10);
    const temperatureValue = parseInt(formData.temp.value, 10);
    const pulseValue = parseInt(formData.pulse.value, 10);
    const respiratoryRateValue = parseInt(formData.respiratoryRate.value, 10);

    // Oxygen validation
    if (changedField === 'oxygen' && (oxygenValue < 50 || oxygenValue > 100)) {
        newErrors.oxygen = "Oxygen should be between 50 and 100.";
    }

    // Temperature validation
    if (changedField === 'temp' && (temperatureValue < 20 || temperatureValue > 45)) {
        newErrors.temp = "Temperature should be between 20°C and 45°C.";
    }

    // Blood Pressure High validation
    if (changedField === 'bpH' && bpHighValue) {
        if (bpHighValue > 200 || bpHighValue < 50) {
            newErrors.bpH = `BP High should be between ${bpLowValue || 50} and 200 mm Hg.`;
        } else if (bpHighValue < bpLowValue) {
            newErrors.bpH = 'Blood Pressure High cannot be less than Blood Pressure Low.';
        }
    }

    // Blood Pressure Low validation
    if (changedField === 'bpL' && bpLowValue) {
        if (bpLowValue < 30 || bpLowValue > 200) {
            newErrors.bpL = 'BP Low should be between 30 and 200 mm Hg.';
        } else if (bpLowValue > bpHighValue) {
            newErrors.bpL = 'Blood Pressure Low cannot be greater than Blood Pressure High.';
        }
    }

    // Pulse validation
    if (changedField === 'pulse' && (pulseValue < 30 || pulseValue > 200)) {
        newErrors.pulse = "Pulse should be between 30 and 200 bpm.";
    }

    // Respiratory Rate validation
    if (changedField === 'respiratoryRate' && (respiratoryRateValue < 1 || respiratoryRateValue > 40)) {
        newErrors.respiratoryRate = "Respiratory Rate should be between 1 and 40 breaths per minute.";
    }

    // Update state with new errors
    setErrors(newErrors);

    // Update formData to reflect errors
    setFormData((prevData) => {
        return {
            ...prevData,
            oxygen: {
                ...prevData.oxygen,
                showError: !!newErrors.oxygen,
                message: newErrors.oxygen || "",
                valid: !newErrors.oxygen,
            },
            temp: {
                ...prevData.temp,
                showError: !!newErrors.temp,
                message: newErrors.temp || "",
                valid: !newErrors.temp,
            },
            bpH: {
                ...prevData.bpH,
                showError: !!newErrors.bpH,
                message: newErrors.bpH || "",
                valid: !newErrors.bpH,
            },
            bpL: {
                ...prevData.bpL,
                showError: !!newErrors.bpL,
                message: newErrors.bpL || "",
                valid: !newErrors.bpL,
            },
            pulse: {
                ...prevData.pulse,
                showError: !!newErrors.pulse,
                message: newErrors.pulse || "",
                valid: !newErrors.pulse,
            },
            respiratoryRate: {
                ...prevData.respiratoryRate,
                showError: !!newErrors.respiratoryRate,
                message: newErrors.respiratoryRate || "",
                valid: !newErrors.respiratoryRate,
            },
        };
    });
};

// Call validateInputs initially or based on effect dependencies if needed
useEffect(() => {
    validateInputs(); // Ensure all fields are validated on load
}, []);

 

  const handleCancel = () => {
    navigation.goBack(); // Navigate to the previous page
  };
  const handleSubmit = async () => {
    let valid = true;


    const newFormData = { ...formData };
    if (!formData.transferType.value) {
      newFormData.transferType.showError = true;
      newFormData.transferType.message = 'This field is required';
      valid = false;
    }

    if (formData.transferType.value === transferType.internal) {
      Object.keys(formData).forEach((el) => {
        if (
          !formData[el].valid &&
          el !== 'wardID' &&
          el !== 'departmentID'
        ) {
          newFormData[el].showError = true;
          newFormData[el ].message = 'This field is required';
          isValid = false;
        }
        if (
          (el === 'wardID' || el === 'departmentID') &&
          formData.transferType.value === transferType.internal &&
          !formData[el].value
        ) {
          newFormData[el].showError = true;
          isValid = false;
        }
      });
    } else {
      Object.keys(formData).forEach((el) => {
        if (
          (el === 'reason' || el === 'relativeName') &&
          formData.transferType.value === transferTypeValue.external &&
          !formData[el].value
        ) {
          newFormData[el].showError = true;
          valid = false;
        }
      });
    }
    setFormData(newFormData);
   
    if (!valid) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please complete all required fields.",
        visibilityTime: 3000,
      });
      return;
    }

    const reqObj = {
      wardID: formData.wardID.value,
      transferType: formData.transferType.value,
      bp: formData.bpH.value
        ? formData.bpH.value + "/" + formData.bpL.value
        : null,
      temp: formData.temp.value || null,
      oxygen: formData.oxygen.value || null,
      pulse: formData.pulse.value || null,
      hospitalName: formData.hospitalName.value || null,
      reason: formData.reason.value,
      relativeName: formData.relativeName.value,
      departmentID: formData.departmentID.value,
      userID: formData.userID.value,
    };
    
    const response = await authPatch(
      `patient/${user.hospitalID}/patients/${currentPatient.id}/transfer`,
      reqObj,
      user.token
    );
    if (response.message == "success") {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Patient successfully transferred.',
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 40,
      });
      if (formData.transferType.value == transferType.internal){
        navigation.goBack(); 
      }
      else  navigation.goBack(); ;
      handleClose();
    } else {
    // Show the error toast
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Error',
      text2: response.message,
      visibilityTime: 3000,
      autoHide: true,
      bottomOffset: 40,
    });
    }
  };

  const [errors, setErrors] = useState({});
  // Validate inputs
 

  

 const transferTypeValue = {
  internal: 1,
  external: 2,
};

const doctorOptions = doctorList.map(doc => ({
  label: `${doc.firstName || ''} ${doc.lastName || ''}`,
  value: doc.id,
}));



const wardOptions = wardList.map(ward => ({
  label: ward.name.charAt(0).toUpperCase() +  ward.name.slice(1).toLowerCase(),
  value: ward.id,
}));

  console.log("formData===================",formData)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Transfer patient</Title>

      <RadioButton.Group
        onValueChange={(value) => handleChange("transferType", value)} // Update the value of transferType using handleChange
        value={formData.transferType.value} 
      >
       <View style={styles.radioGroup}>
    <RadioButton.Item label="Internal" value={transferTypeValue.internal} />
    <RadioButton.Item label="External" value={transferTypeValue.external} />
  </View>
      </RadioButton.Group>
      {formData.transferType.showError && <Text style={{ color: 'red' }}>{formData.transferType.message}</Text>}
      {formData.transferType.value === transferTypeValue.internal ? (
        <>
          <View style={styles.gridItem}>
            <Text>Select a ward</Text>
            <View style={styles.textInput}>

           
            <Picker
              selectedValue={ward}
              onValueChange={(value) => {
                setWard(value);
                handleChange('wardID', value);
              }}
            >
                <Picker.Item label='Select Ward' value='' />
              {wardOptions.map(option => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
            </View>
            {formData.wardID.showError && (
              <Text style={styles.errorText}>{formData.wardID.message}</Text>
            )}
          </View>

          <View style={styles.gridItem}>
            <Text>Select a doctor</Text>
            <View style={styles.textInput}>


           
            <Picker
              selectedValue={doctor}
              onValueChange={(value) => {
                setDoctor(value);
                const departmentID = doctorList.find(el => el.id === value)?.departmentID || 0;
                setFormData(prevData => ({
                  ...prevData,
                  userID: {
                    value,
                    showError: false,
                    message: '',
                    valid: true,
                    name: 'userID',
                  },
                  departmentID: {
                    value: departmentID,
                    showError: false,
                    message: '',
                    valid: true,
                    name: 'departmentID',
                  },
                }));
                handleChange('userID', value);
              }}
            >
                <Picker.Item label='Select Doctor ' value='' />
              {doctorOptions.map(option => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
            </View>
            {formData.departmentID.showError && (
              <Text style={styles.errorText}>{formData.departmentID.message}</Text>
            )}
          </View>
        </>
      ) : (
        <View style={styles.gridItem}>
          <TextInput
            placeholder="Hospital Name"
            value={formData.hospitalName.value}
            onChangeText={text => handleChange('hospitalName', text)}
            style={styles.textInput}
          />
          {formData.hospitalName.showError && (
            <Text style={styles.errorText}>{formData.hospitalName.message}</Text>
          )}
        </View>
      )}
     
       
     <TextInput
        label="Reason"
        value={formData.reason.value}
        onChangeText={(text) => handleChange('reason', text)}
        style={styles.input}
      />
      {formData?.reason?.showError && (
        <Text style={styles.errorText}>{formData.reason.message}</Text>
      )}
     <TextInput
        label="Oxygen"
        value={formData?.oxygen?.value.toString()}
        onChangeText={(text) => handleChange('oxygen', text)}
        keyboardType="numeric"
        mode="outlined"
        style={styles.input}
      />
      {formData?.oxygen?.showError && <Text style={styles.errorText}>{formData.oxygen.message}</Text>}

      <View style={styles.row}>
        <View style={styles.halfInputContainer}>
          <TextInput
            label="Blood Pressure High (mm Hg)"
            value={formData?.bpH?.value}
            onChangeText={(text) => handleChange('bpH', text)}
            keyboardType="numeric"
            mode="outlined"
            style={styles.halfInput}
          />
          {formData?.bpH?.showError && <Text style={styles.errorText}>{formData.bpH.message}</Text>}
        </View>
        <View style={styles.halfInputContainer}>
          <TextInput
            label="Blood Pressure Low (mm Hg)"
            value={formData?.bpL?.value}
            onChangeText={(text) => handleChange('bpL', text)}
            keyboardType="numeric"
            mode="outlined"
            style={styles.halfInput}
          />
          {formData?.bpL?.showError && <Text style={styles.errorText}>{formData.bpL.message}</Text>}
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.halfInputContainer}>
          <TextInput
            label="Temperature (°C or °F)"
            value={formData?.temp?.value.toString()}
            onChangeText={(text) => handleChange('temp', text)}
            keyboardType="numeric"
            mode="outlined"
            style={styles.halfInput}
          />
          {formData?.temp?.showError && <Text style={styles.errorText}>{formData.temp.message}</Text>}
        </View>
        <View style={styles.halfInputContainer}>
          <TextInput
            label="Pulse (bpm)"
            value={formData?.pulse?.value.toString()}
            onChangeText={(text) => handleChange('pulse', text)}
            keyboardType="numeric"
            mode="outlined"
            style={styles.halfInput}
          />
          {formData?.pulse?.showError && <Text style={styles.errorText}>{formData.pulse.message}</Text>}
        </View>
      </View>

      <TextInput
        label="Respiratory Rate (per min)"
        value={formData?.respiratoryRate?.value.toString()}
        onChangeText={(text) => handleChange('respiratoryRate', text)}
        keyboardType="numeric"
        mode="outlined"
        style={styles.input}
      />
      {formData?.respiratoryRate?.showError && <Text style={styles.errorText}>{formData.respiratoryRate.message}</Text>}

      <TextInput
        label="Relative Name"
        value={formData.relativeName.value}
        onChangeText={(text) => handleChange('relativeName', text)}
        mode="outlined"
        style={styles.input}
      />
      {formData?.relativeName?.showError && <Text style={styles.errorText}>{formData.relativeName.message}</Text>}
      
      <View style={styles.buttonContainer}>
      <Button mode="outlined" onPress={handleCancel} style={styles.button}>
          Cancel
        </Button>
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Submit
        </Button>
       
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor:"#fff",
    height:"100%",
top:20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#007AFF',
    fontWeight:'bold',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  // input: {
  //   borderWidth: 1,
  //   marginBottom: 10,
  //   paddingHorizontal: 8,
  //   color:"red",
  // },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
 
  pickerContainer: {
    width: '100%',
    marginTop: 10,
  },
 
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  halfInput: {
    width: '100%',
  },
  halfInputContainer: {
    width: '48%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,

  },
  button: {
    marginHorizontal: 10,
  },
  gridItem: {
    marginVertical: 10,
  },

  textInput: {
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "100%",
    backgroundColor:"#fafafa"
  },
});

export default TransferPatientForm;
