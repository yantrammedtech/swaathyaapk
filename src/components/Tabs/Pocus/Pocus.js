import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView ,TouchableOpacity,Alert} from 'react-native';
import { CheckBox } from "react-native-elements";
import { Picker } from '@react-native-picker/picker'; 
import { authPost } from "../../../axios/authPost";
import { authFetch } from "../../../axios/authFetch";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { DataTable } from 'react-native-paper';


const Pocus = () => {
  const user = useSelector((state) => state.currentUserData)
  const currentPatient  = useSelector((state) => state.currentPatientData)
  const patientTimeLineID = currentPatient?.patientTimeLineID
  const navigation = useNavigation()
 

    const [pocusData, setPocusData] =useState([]); // Adjust type as needed
  const [formValues, setFormValues] = useState({
    rightPleuralEffusion: '',
    leftPleuralEffusion: '',
    leftPneumothorax: '',
    rightPneumothorax: '',
    heart: '',
    abdomen: '',
    ivc: '',
    abg: '',
    ecg: '',
    cxr: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [showFields, setShowFields] = useState({
    pleuralEffusion: false,
    pneumothorax: false,
    heart: false,
    abdomen: false,
  });

 
  const handleInputChange = (name, value) => {
    // Update form values
    setFormValues(prev => ({ ...prev, [name]: value }));
  
    // Update form errors
    setFormErrors(prev => ({
      ...prev,
      [name]: !value ? 'This field is required' : '',
    }));
  };
  

  const handleCheckboxChange = (field) => {
    setShowFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSelectionChange = (value) => {
    handleInputChange('heart', value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const errors = {};
  
    // Validate form values
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key]) {
        errors[key] = 'This field is required';
      }
    });
  
    // Remove fields from errors based on `showFields`
    if (!showFields.abdomen) delete errors.abdomen;
    if (!showFields.heart) delete errors.heart;
    if (!showFields.pneumothorax) {
      delete errors.leftPneumothorax;
      delete errors.rightPneumothorax;
    }
    if (!showFields.pleuralEffusion) {
      delete errors.leftPleuralEffusion;
      delete errors.rightPleuralEffusion;
    }
  
    setFormErrors(errors);
  
    // Submit the form if there are no errors
    if (Object.keys(errors).length === 0) {
     console.log("formValues==",formValues)
     try {
      const patientTimeLineID = currentPatient?.patientTimeLineID
      const response = await authPost(
        `pocus/${user.hospitalID}/${patientTimeLineID}`,
        {
          userID: user.id,
          ...formValues 
        },
        user.token
      );
      if (response.message =="success") {
        Alert.alert(
          'Success',
          'Pocus successfully added',
          [{ text: 'OK' }] 
        )
        navigation.navigate('CommonPatientProfile', {
          patientId: currentPatient.id,
        })
      } 
    }catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      }
    }
    
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await authFetch(
          `pocus/${user.hospitalID}/${patientTimeLineID}`,
          user.token
        );
        console.log("get pocus====",response)
        if (response.message === 'success') {
          setPocusData(response.pocus);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the async function
    fetchData();
  }, [user.hospitalID, patientTimeLineID, user.token]); 

  console.log("pocusData==",pocusData)

    return(
        <ScrollView contentContainerStyle={styles.container}>
{pocusData.length >= 1 && (
        <View style={{ marginVertical: 20 }}>
          <DataTable>
            {/* Table Header */}
            <DataTable.Header>
              <DataTable.Title>ID</DataTable.Title>
              <DataTable.Title>Abdomen</DataTable.Title>
              <DataTable.Title>ABG</DataTable.Title>
              <DataTable.Title>CXR</DataTable.Title>
              <DataTable.Title>ECG</DataTable.Title>
              <DataTable.Title>Heart</DataTable.Title>
              <DataTable.Title>IVC</DataTable.Title>
              <DataTable.Title>Left Pleural Effusion</DataTable.Title>
              <DataTable.Title>Left Pneumothorax</DataTable.Title>
              <DataTable.Title>Right Pleural Effusion</DataTable.Title>
              <DataTable.Title>Right Pneumothorax</DataTable.Title>
            </DataTable.Header>

            {/* Table Rows */}
            {pocusData.map((row) => (
              <DataTable.Row key={row.userID}>
                <DataTable.Cell>{row.userID}</DataTable.Cell>
                <DataTable.Cell>{row.abdomen}</DataTable.Cell>
                <DataTable.Cell>{row.abg}</DataTable.Cell>
                <DataTable.Cell>{row.cxr}</DataTable.Cell>
                <DataTable.Cell>{row.ecg}</DataTable.Cell>
                <DataTable.Cell>{row.heart}</DataTable.Cell>
                <DataTable.Cell>{row.ivc}</DataTable.Cell>
                <DataTable.Cell>{row.leftPleuralEffusion}</DataTable.Cell>
                <DataTable.Cell>{row.leftPneumothorax}</DataTable.Cell>
                <DataTable.Cell>{row.rightPleuralEffusion}</DataTable.Cell>
                <DataTable.Cell>{row.rightPneumothorax}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      )}



        <Text style={styles.heading}>Tests</Text>
        <View style={styles.inputContainer}>
  <Text style={styles.label}>IVC</Text>
  <TextInput
    style={styles.textInput}
    placeholder="Enter IVC value"
    value={formValues.ivc}
    onChangeText={(value) => handleInputChange('ivc', value)}
  />
  {formErrors.ivc && <Text style={styles.errorText}>{formErrors.ivc}</Text>}
</View>

  
        <View style={styles.inputContainer}>
          <Text style={styles.label}>ABG</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter ABG value"
            value={formValues.abg}
            onChangeText={(value) => handleInputChange('abg', value)}
          />
  {formErrors.abg && <Text style={styles.errorText}>{formErrors.abg}</Text>}

        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>CXR</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter CXR value"
            value={formValues.cxr}
            onChangeText={(value) => handleInputChange('cxr', value)}
          />
  {formErrors.cxr && <Text style={styles.errorText}>{formErrors.cxr}</Text>}

        </View>
  
        <View style={styles.inputContainer}>
          <Text style={styles.label}>ECG</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter ECG value"
            value={formValues.ecg}
            onChangeText={(value) => handleInputChange('ecg', value)}
          />
  {formErrors.ecg && <Text style={styles.errorText}>{formErrors.ecg}</Text>}

        </View>

        <View>
        <CheckBox
                title="Pleural Effusion"
                checked={showFields.pleuralEffusion}
                onPress={() =>  handleCheckboxChange('pleuralEffusion')}
                containerStyle={styles.checkBoxRow}
              />

{showFields.pleuralEffusion && (
    <>
    <View style={styles.pickerContainer}>
    <Text  style={styles.pickerText}>Left Pleural Effusion</Text>
    <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={formValues.leftPleuralEffusion}
                  onValueChange={(value) => handleInputChange('leftPleuralEffusion', value)}
                >
                  <Picker.Item label="Normal" value="normal" />
                  <Picker.Item label="Indeterminate" value="indeterminate" />
                  <Picker.Item label="Free fluid in Morrison's pouch" value="free fluid in morrison's pouch" />
                  <Picker.Item label="Free fluid in Perihepatic space" value="free fluid in perihepatic space" />
                  <Picker.Item label="Free Air" value="free air" />
                </Picker>
              </View>
    {formErrors.leftPleuralEffusion && <Text style={styles.errorText}>{formErrors.leftPleuralEffusion}</Text>}
  </View>
  <View style={styles.pickerContainer}>
    <Text style={styles.pickerText}>Right Pleural Effusion</Text>
    <View style={styles.pickerWrapper}>
    <Picker
      selectedValue={formValues.rightPleuralEffusion}
      onValueChange={(value) => handleInputChange('rightPleuralEffusion', value)}
    >
      <Picker.Item label="Normal" value="normal" />
      <Picker.Item label="Indeterminate" value="indeterminate" />
      <Picker.Item label="Free fluid in Morrison's pouch" value="free fluid in morrison's pouch" />
      <Picker.Item label="Free fluid in Perihepatic space" value="free fluid in perihepatic space" />
      <Picker.Item label="Free Air" value="free air" />
    </Picker>
   
    </View>
    {formErrors.rightPleuralEffusion && <Text style={styles.errorText}>{formErrors.rightPleuralEffusion}</Text>}
  </View>
  
    </>

)

              }
       
        </View>

        <View style={styles.checkboxContainer}>
        <CheckBox
          title="Pneumothorax"
          checked={showFields.pneumothorax}
          onPress={() => handleCheckboxChange('pneumothorax')}
          containerStyle={styles.checkBoxRow}
        />
        {showFields.pneumothorax && (
        <>
          <View style={styles.pickerContainer}>
    <Text  style={styles.pickerText}>Left Pneumothorax</Text>
    <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={formValues.leftPneumothorax}
                  onValueChange={(value) => handleInputChange('leftPneumothorax', value)}
                >
                  <Picker.Item label="Normal" value="normal" />
                  <Picker.Item label="Indeterminate" value="indeterminate" />
                  <Picker.Item label="Free fluid in Morrison's pouch" value="free fluid in morrison's pouch" />
                  <Picker.Item label="Free fluid in Perihepatic space" value="free fluid in perihepatic space" />
                  <Picker.Item label="Free Air" value="free air" />
                </Picker>
              </View>
    {formErrors.leftPneumothorax && <Text style={styles.errorText}>{formErrors.leftPneumothorax}</Text>}
  </View>
  <View style={styles.pickerContainer}>
    <Text style={styles.pickerText}>Right Pneumothorax </Text>
    <View style={styles.pickerWrapper}>
    <Picker
      selectedValue={formValues.rightPneumothorax}
      onValueChange={(value) => handleInputChange('rightPneumothorax', value)}
    >
      <Picker.Item label="Normal" value="normal" />
      <Picker.Item label="Indeterminate" value="indeterminate" />
      <Picker.Item label="Free fluid in Morrison's pouch" value="free fluid in morrison's pouch" />
      <Picker.Item label="Free fluid in Perihepatic space" value="free fluid in perihepatic space" />
      <Picker.Item label="Free Air" value="free air" />
    </Picker>
   
    </View>
    {formErrors.rightPneumothorax && <Text style={styles.errorText}>{formErrors.rightPneumothorax}</Text>}
  </View>
        </>
        )}
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          title="Heart"
          checked={showFields.heart}
          onPress={() => handleCheckboxChange('heart')}
          containerStyle={styles.checkBoxRow}
        />
        {showFields.heart && (
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerText}>Heart</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formValues.heart}
                onValueChange={handleSelectionChange}
              >
                <Picker.Item label="Normal" value="normal" />
                <Picker.Item label="Ejection Fraction" value="ejection fraction" />
                <Picker.Item label="Abnormal Wall Motion" value="abnormal wall motion" />
              </Picker>
              {formErrors.heart && <Text style={styles.errorText}>{formErrors.heart}</Text>}
            </View>
          </View>
        )}
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          title="Abdomen"
          checked={showFields.abdomen}
          onPress={() => handleCheckboxChange('abdomen')}
          containerStyle={styles.checkBoxRow}
        />
        {showFields.abdomen && (
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerText}>Abdomen</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Abdomen value"
              value={formValues.abdomen}
              onChangeText={(value) => handleInputChange('abdomen', value)}
            />
            {formErrors.abdomen && <Text style={styles.errorText}>{formErrors.abdomen}</Text>}
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.button}  onPress={handleSubmit}>
                
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

      </ScrollView>
  
    )
}
const styles = StyleSheet.create({
    container: {
      padding: 16,
      paddingBottom:30,
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'blue',
      marginBottom: 16,
    },
    inputContainer: {
      marginBottom: 10,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      padding: 8,
    },
    pickerContainer: {
        marginBottom: 20,
      },
      pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 1,
        overflow: 'hidden',
      },
      pickerText :{
        fontSize:15,
        color:"#000",
        fontWeight:"500"
      },
      checkBoxRow: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        marginBottom: 10,
      },
      errorText: {
        color: 'red',
        marginTop: 8,
      },
      button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"center",
        backgroundColor: '#1977f3',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignSelf: 'center',
        marginBottom:30,
    },
    buttonText: {
        color: '#fff',
        marginLeft: 10,
        fontSize: 16,
    },
  });

export default Pocus