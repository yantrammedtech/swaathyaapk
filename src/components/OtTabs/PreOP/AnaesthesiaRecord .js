import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';


const AnaesthesiaRecord = () => {
  const [selected, setSelected] = useState(null);
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
  };

  const handleSelect = (item) => {
    setSelected(item);
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

      <View style={styles.section}>
        <TouchableOpacity style={styles.option} onPress={() => handleSelect('Ventilation')}>
          <Text style={selected === 'Ventilation' ? styles.selectedOption : styles.optionText}>Ventilation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handleSelect('Breathing System 1')}>
          <Text style={selected === 'Breathing System 1' ? styles.selectedOption : styles.optionText}>Breathing System 1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handleSelect('Breathing System 2')}>
          <Text style={selected === 'Breathing System 2' ? styles.selectedOption : styles.optionText}>Breathing System 2</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeader}>Monitors</Text>

      <View style={styles.grid}>
        {['FIO2', 'PAW', 'ECG', 'NIBP', 'SPO2', 'ETCO2', 'PA Cath/CVP', 'IBP', 'Hourly urine', 'Temp', 'Vent Alarm', 'Nerve Stim', 'Anes Agent'].map((monitor, index) => (
          <TouchableOpacity key={index} style={styles.gridItem}>
            <Text style={styles.gridItemText}>{monitor}</Text>
          </TouchableOpacity>
        ))}
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


//   const isConsentFormVisible = React.useMemo(() => {
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


//   const isPostOPFormVisible = React.useMemo(() => {
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