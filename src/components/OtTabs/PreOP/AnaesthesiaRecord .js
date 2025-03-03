import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { authPost } from '../../../axios/authPost';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';



const AnaesthesiaRecord = () => {

  const user = useSelector((state) => state.currentUserData);
  const currentPatient = useSelector((state) => state.currentPatientData);
  const patientTimeLineID = currentPatient?.patientTimeLineID;
  const navigation = useNavigation()

  const [airwayChecked, setAirwayChecked] = useState(false); // Checkbox state for Airway Size
  const [selectedAirwaySize, setSelectedAirwaySize] = useState(''); // Track selected Airway Size option

  const [airwayManagementChecked, setAirwayManagementChecked] = useState(false);
  const [vascularAccessChecked, setVascularAccessChecked] = useState(false);
  const [laryngoscopyChecked, setLaryngoscopyChecked] = useState(false);

  const [selectedAirwayOption, setSelectedAirwayOption] = useState('');
  const [selectedVascularOption, setSelectedVascularOption] = useState('');
  const [selectedLaryngoscopyOption, setSelectedLaryngoscopyOption] = useState('');

  const responseOptions = {
    airway: ['Size 1', 'Size 2', 'Size 3'],
    airwayManagement: ['Oral', 'Nasal', 'ETT', 'SGD', 'Tracheostomy'],
    vascularAccess:['IV', 'Central'],
    laryngoscopy:['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4'],
    ventilation: ['Spont Vent', 'IPPV', 'CPAP', 'PEEP'],
    breathingSystem: ['Circle', 'Other', 'T-Pipe', 'Bain'],
    filter:  ['Filter', 'HME', 'Active Humidifier', 'Bain'],
  };

  const [ventilationChecked, setVentilationChecked] = useState(false);
  const [selectedVentilationOption, setSelectedVentilationOption] = useState('');
  const [breathingSystemChecked, setBreathingSystemChecked] = useState(false);
  const [selectedBreathingSystem, setSelectedBreathingSystem] = useState('');
  const [filterChecked, setFilterChecked] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
 
  const [breathingForm, setBreathingForm] = useState({
    breathingSystem:selectedBreathingSystem,
    filter:selectedFilter,
    ventilation:selectedVentilationOption,
    vt: '',
    rr: '',
    vm: '',
    pressure: '',
  });


  const [monitors, setMonitors] = useState({
    spo2: false,
    nbp: false,
    temp: false,
    etco2: false,
    ventAlarm: false,
    ibp: false,
    fio2: false,
    anesAgent: false,
    nerveStim: false,
    paw: false,
    paCathCVP: false,
    oesophPrecordSteth: false,
    ecg: false,
    hourlyUrine: false,
  });

  const handleCheckboxChange = (name) => {
    setMonitors((prevMonitors) => ({
      ...prevMonitors,
      [name]: !prevMonitors[name],
    }));
  };


  const handleTextFieldChange = (field, value) => {
    setBreathingForm((prevState) => ({
      ...prevState,    // Spread the previous state to keep the other fields intact
      [field]: value,  // Update the specific field that was changed
    }));
  };


  const anesthesiaRecordForm = {
    airwayManagement: selectedAirwayOption,
    airwaySize: selectedAirwaySize,
    laryngoscopy: selectedLaryngoscopyOption,
    vascularAccess: selectedVascularOption
  }

  const saveHandler = async () => {
    const anesthesiaRecordData = {
      anesthesiaRecordForm: anesthesiaRecordForm,
      breathingForm: breathingForm,
      monitors: monitors,
    };
    try {
      const response = await authPost(
        `ot/${user.hospitalID}/${patientTimeLineID}/anesthesiaRecord`,
        { anesthesiaRecordData: anesthesiaRecordData },
        user.token
      );
      if (response.status === 201) {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Anaesthesia form added',
          visibilityTime: 3000,
          autoHide: true,
          bottomOffset: 40,
        });
        
      navigation.navigate('PostOpRecord')
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Anaesthesia form update Failed',
          visibilityTime: 3000,
          autoHide: true,
          bottomOffset: 40,
        });
      }
    } catch (err) {
      // console.log(err);
    }
  };

 

  return (
    <ScrollView style={styles.container}>

<View style={airwayChecked && styles.section}>
      {/* CheckBox for Airway Size */}
      <CheckBox
        title="Airway Size *"
        checked={airwayChecked}
        onPress={() => setAirwayChecked(!airwayChecked)}
        containerStyle={styles.checkBoxRow}
      />

      {/* Display Airway Size options if checkbox is checked */}
      {airwayChecked && (
        <View style={styles.optionsContainer}>
          {responseOptions.airway.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAirwaySize === option && styles.selectedOption,
              ]}
              onPress={() => setSelectedAirwaySize(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

   
    </View>

    <View style={airwayManagementChecked && styles.section}>
        <CheckBox
          title="Airway Management *"
          checked={airwayManagementChecked}
          onPress={() => setAirwayManagementChecked(!airwayManagementChecked)}
          containerStyle={styles.checkBoxRow}
        />

        {airwayManagementChecked && (
          <View style={styles.optionsContainer}>
            {responseOptions.airwayManagement.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAirwayOption === option && styles.selectedOption,
                ]}
                onPress={() => setSelectedAirwayOption(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* {errors.airwayManagement && <Text style={styles.errorText}>{errors.airwayManagement}</Text>} */}
      </View>

      {/* Section for Vascular Access */}
      <View style={vascularAccessChecked && styles.section}>
        <CheckBox
          title="Vascular Access *"
          checked={vascularAccessChecked}
          onPress={() => setVascularAccessChecked(!vascularAccessChecked)}
          containerStyle={styles.checkBoxRow}
        />

        {vascularAccessChecked && (
          <View style={styles.optionsContainer}>
            {responseOptions.vascularAccess.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedVascularOption === option && styles.selectedOption,
                ]}
                onPress={() => setSelectedVascularOption(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* {errors.vascularAccess && <Text style={styles.errorText}>{errors.vascularAccess}</Text>} */}
      </View>

      {/* Section for Laryngoscopy */}
      <View style={laryngoscopyChecked && styles.section}>
        <CheckBox
          title="Laryngoscopy *"
          checked={laryngoscopyChecked}
          onPress={() => setLaryngoscopyChecked(!laryngoscopyChecked)}
          containerStyle={styles.checkBoxRow}
        />

        {laryngoscopyChecked && (
          <View style={styles.optionsContainer}>
            {responseOptions.laryngoscopy.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedLaryngoscopyOption === option && styles.selectedOption,
                ]}
                onPress={() => setSelectedLaryngoscopyOption(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* {errors.laryngoscopy && <Text style={styles.errorText}>{errors.laryngoscopy}</Text>} */}
      </View>


      

      <Text style={styles.subHeader}>Breathing/Ventilation</Text>

        <View style={ventilationChecked && styles.section}>
        <CheckBox
          title="Ventilation *"
          checked={ventilationChecked}
          onPress={() => setVentilationChecked(!ventilationChecked)}
          containerStyle={styles.checkBoxRow}
        />

        {/* Display Ventilation options if checkbox is checked */}
        {ventilationChecked && (
          <View style={styles.optionsContainer}>
            {responseOptions.ventilation.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedVentilationOption === option && styles.selectedOption,
                ]}
                onPress={() => setSelectedVentilationOption(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Error message if there's a validation error */}
        {/* {errors.ventilation && <Text style={styles.errorText}>{errors.ventilation}</Text>} */}
      </View>

       <View style={breathingSystemChecked && styles.section}>
        <CheckBox
          title="Breathing System *"
          checked={breathingSystemChecked}
          onPress={() => setBreathingSystemChecked(!breathingSystemChecked)}
          containerStyle={styles.checkBoxRow}
        />

        {/* Display Breathing System options if checkbox is checked */}
        {breathingSystemChecked && (
          <View style={styles.optionsContainer}>
            {responseOptions.breathingSystem.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedBreathingSystem === option && styles.selectedOption,
                ]}
                onPress={() => setSelectedBreathingSystem(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* {errors.breathingSystem && <Text style={styles.errorText}>{errors.breathingSystem}</Text>} */}
      </View>


       <View style={filterChecked && styles.section}>
        <CheckBox
          title="Filter *"
          checked={filterChecked}
          onPress={() => setFilterChecked(!filterChecked)}
          containerStyle={styles.checkBoxRow}
        />

        {/* Display Filter options if checkbox is checked */}
        {filterChecked && (
          <View style={styles.optionsContainer}>
            {responseOptions.filter.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedFilter === option && styles.selectedOption,
                ]}
                onPress={() => setSelectedFilter(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* {errors.filter && <Text style={styles.errorText}>{errors.filter}</Text>} */}
      </View>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="VT"
          value={breathingForm.vt}
          onChangeText={(text) => handleTextFieldChange('vt', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="RR"
          value={breathingForm.rr}
          onChangeText={(text) => handleTextFieldChange('rr', text)}
        />
      </View>

       <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="VM"
          value={breathingForm.vm}
          onChangeText={(text) => handleTextFieldChange('vm', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Pressure"
          value={breathingForm.pressure}
          onChangeText={(text) => handleTextFieldChange('pressure', text)}
        />
      </View>

      <Text style={styles.subHeader}>Monitors</Text>

      <View style={styles.checkboxGroup}>
      <CheckBox
        title="SPO2"
        checked={monitors.spo2}
        onPress={() => handleCheckboxChange('spo2')}
      />
      <CheckBox
        title="NBP"
        checked={monitors.nbp}
        onPress={() => handleCheckboxChange('nbp')}
      />
      <CheckBox
        title="Temp"
        checked={monitors.temp}
        onPress={() => handleCheckboxChange('temp')}
      />
      <CheckBox
        title="ETCO2"
        checked={monitors.etco2}
        onPress={() => handleCheckboxChange('etco2')}
      />
      <CheckBox
        title="Vent Alarm"
        checked={monitors.ventAlarm}
        onPress={() => handleCheckboxChange('ventAlarm')}
      />
      <CheckBox
        title="IBP"
        checked={monitors.ibp}
        onPress={() => handleCheckboxChange('ibp')}
      />
      <CheckBox
        title="FIO2"
        checked={monitors.fio2}
        onPress={() => handleCheckboxChange('fio2')}
      />
      <CheckBox
        title="Anes Agent"
        checked={monitors.anesAgent}
        onPress={() => handleCheckboxChange('anesAgent')}
      />
      <CheckBox
        title="Nerve Stim"
        checked={monitors.nerveStim}
        onPress={() => handleCheckboxChange('nerveStim')}
      />
      <CheckBox
        title="PAW"
        checked={monitors.paw}
        onPress={() => handleCheckboxChange('paw')}
      />
      <CheckBox
        title="PA Cath/CVP"
        checked={monitors.paCathCVP}
        onPress={() => handleCheckboxChange('paCathCVP')}
      />
      <CheckBox
        title="Oesoph/Precord steth"
        checked={monitors.oesophPrecordSteth}
        onPress={() => handleCheckboxChange('oesophPrecordSteth')}
      />
      <CheckBox
        title="ECG"
        checked={monitors.ecg}
        onPress={() => handleCheckboxChange('ecg')}
      />
      <CheckBox
        title="Hourly Urine"
        checked={monitors.hourlyUrine}
        onPress={() => handleCheckboxChange('hourlyUrine')}
      />
    </View>

    <View  style={styles.btnContainer}>
    <TouchableOpacity style={styles.button} onPress={saveHandler}>
      <Text style={styles.buttonText}>Save</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.nextButton} onPress={() =>   navigation.navigate('PostOpRecord')}>
      <Text style={styles.buttonText}>Next</Text>
    </TouchableOpacity>
    </View>

   


     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  option: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,

  },
  optionText: {
    fontSize: 16,
  },
  selectedOption: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    width: '48%',
    marginBottom: 10,
  },
  gridItemText: {
    fontSize: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  checkBoxRow: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    color: '#000',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
    marginRight: 8,
    marginBottom:5,
  },
  button: {
    backgroundColor: '#4CAF50', 
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom:30,
  },
  buttonText: {
    color: '#fff', // White text
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#007AFF', // Blue color for Next button
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
    marginBottom:30,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  btnContainer:{
    flexDirection: 'row',
   
    justifyContent: 'space-between',
  }
});

export default AnaesthesiaRecord;


// const isAnesthesiaFormVisible = React.useMemo(() => {
//     if (
//       patientStage > OTPatientStages.APPROVED &&
//       userType === OTUserTypes.ANESTHETIST
//     )
//       return true;
//     if (
//       patientStage >= OTPatientStages.SCHEDULED &&
//       userType === OTUserTypes.SURGEON
//     )
//       return true;
//     return false;
//   }, [patientStage, userType]);

