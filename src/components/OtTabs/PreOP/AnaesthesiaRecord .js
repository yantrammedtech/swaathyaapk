import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';


const AnaesthesiaRecord = () => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (item) => {
    setSelected(item);
  };

  return (
    <ScrollView style={styles.container}>

<View style={eyeMovementChecked && styles.section}>
        <CheckBox
          title="Eye movement *"
          checked={eyeMovementChecked}
          onPress={() => setEyeMovementChecked(!eyeMovementChecked)}
          containerStyle={styles.checkBoxRow}
        />
        {eyeMovementChecked && (
          <View style={styles.optionsContainer}>
            {responseOptions.eye.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedEyeMovement === option && styles.selectedOption,
                ]}
                onPress={() => setSelectedEyeMovement(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {errors.eyeMovement && <Text style={styles.errorText}>{errors.eyeMovement}</Text>}
      </View>
    
      <View style={styles.section}>
        <TouchableOpacity style={styles.option} onPress={() => handleSelect('Airway Size')}>
          <Text style={selected === 'Airway Size' ? styles.selectedOption : styles.optionText}>Airway Size</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handleSelect('Airway Management')}>
          <Text style={selected === 'Airway Management' ? styles.selectedOption : styles.optionText}>Airway Management</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handleSelect('Vascular Access')}>
          <Text style={selected === 'Vascular Access' ? styles.selectedOption : styles.optionText}>Vascular Access</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handleSelect('Laryngoscopy')}>
          <Text style={selected === 'Laryngoscopy' ? styles.selectedOption : styles.optionText}>Laryngoscopy</Text>
        </TouchableOpacity>
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