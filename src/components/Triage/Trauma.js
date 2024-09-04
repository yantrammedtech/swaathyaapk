import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";


const Trauma = () => {
  const condition = "Stroke"
  const data = useSelector((state) => state.triageData)
  console.log("data==",data)

  const triageDataFromStore = useSelector((state) => state.triageData);
  const [trauma, setTrauma] = useState(triageDataFromStore.trauma);
  const [nonTrauma, setNonTrauma] = useState(triageDataFromStore.nonTrauma);
  
  
  const dispatch = useDispatch();

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Trauma");
 

  // States for Checkboxes and Selected Options
const [traumaChecked, setTraumaChecked] = useState(false);
const [selectedTraumaOption, setSelectedTraumaOption] = useState(null);

const [fractureChecked, setFractureChecked] = useState(false);
const [selectedFractureOption, setSelectedFractureOption] = useState(null);

const [fallChecked, setFallChecked] = useState(false);
const [selectedFallOption, setSelectedFallOption] = useState(null);

const [stabWoundChecked, setStabWoundChecked] = useState(false);
const [selectedStabWoundOption, setSelectedStabWoundOption] = useState({
  severity: null,
  location: null,
});

const [errors, setErrors] = useState({
  options: '',
  traumaType: '',
  fractureRegion: '',
  fallHeight: '', // Add this if you are validating fall height
});


  const [pregnancyChecked, setPregnancyChecked] = useState(false);
  const [selectedPregnancyOption, setSelectedPregnancyOption] = useState(null);
  const [bleedingChecked, setBleedingChecked] = useState(false);
  const [selectedBleedingOption, setSelectedBleedingOption] = useState(null);
  const [poisoningChecked, setPoisoningChecked] = useState(false);
  const [selectedPoisoningOption, setSelectedPoisoningOption] = useState(null);
  const [feverChecked, setFeverChecked] = useState(false);
  const [selectedFeverOption, setSelectedFeverOption] = useState(null);

  const [selectedConditions, setSelectedConditions] = useState([]);
  const [burnPercentage, setBurnPercentage] = useState('');
  const navigation = useNavigation();

  const [formErrors, setFormErrors] = useState({
    burnPercentage: "",
    pregnancy: "",
    internalBleeding: "",
    poisoning: "",
    fever: "",
    otherConditions: "",
  });
  


  const traumaOptions = [
    "Gun shot",
    "Vehicle",
    "Chest",
    "Significant Assault",
    "Multiple Injuries",
    "Sexual assault",
    "Major vascular injury",
  ];

  const fractureOptions = [
    "Pelvic fracture",
    "Multiple fracture",
    "Open fracture of hand feet",
    "Isolated long bone facture",
    "Isolated small bone facture",
    "Closed facture excluding of hand and feet",
    "Open facture excluding of hand and feet",
  ];

  const fallOptions = [
    ">3 times height of person",
    "<3 times height of person",
    ">5 Stars",
    "<5 Stars",
  ];

  const stabWoundSeverityOptions = [
    "Superficial Wound",
    "Organ Injury",
    "Deep Wound",
    "Penetrating Wound",
    "Major Blood Vessels Injury",
  ];

  const stabWoundLocationOptions = [
    "Head",
    "Chest",
    "Extremity",
    "Abdomen",
    "Groin",
  ];

  // Array of options to display
  const options = [
    "Amputation",
    "Neck Swelling",
    "Suspected Abuse",
    "Minor Head Injury",
    "Abrasions/Lacerations/Contusions/Bruises",
  ];

  // Handle option selection
  const handleOptionPress = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const nonTraumaOptions = {
    pregnancy: ["First", "Second", "Third"],
    bleeding: ["Nose & ENT", "Active", "P/R"],
    poisoning: ["Snake", "Scorpion", "Other"],
    fever: [
      "Headache",
      "Chest Pain",
      "Jaundice",
      "Chemotherapy",
      "HIV",
      "Diabetes",
      "None",
    ],
  };

  const handleSubmitPress = () => {
    const formData = {
      burnPercentage,
      pregnancy: pregnancyChecked ? selectedPregnancyOption : null,
      internalBleeding: bleedingChecked ? selectedBleedingOption : null,
      poisoning: poisoningChecked ? selectedPoisoningOption : null,
      fever: feverChecked ? selectedFeverOption : null,
      otherConditions: selectedConditions.length > 0 ? selectedConditions : null,
    };
  
    const errors = validateNonTraumaForm(formData);
  
    if (Object.values(errors).some((error) => error !== '')) {
      setFormErrors(errors); // Set errors to state
      return; // Stop form submission if there are validation errors
    }
  
    console.log("formdata==",formData)
    // Dispatch the data if no errors
    dispatch({
      type: 'updateTriageData',
      payload: {
        ...triageDataFromStore,
        nonTrauma: formData,
      },
    });
  
    // Navigate to the next page
    navigation.navigate('RedZonePage',{condition});
  };
  
  const validateNonTraumaForm = (data) => {
    const errors = {
      burnPercentage: "",
      pregnancy: "",
      internalBleeding: "",
      poisoning: "",
      fever: "",
      otherConditions: "",
    };
  
    if (pregnancyChecked && !data.pregnancy)
      errors.pregnancy = "Pregnancy option is required.";
  
    if (bleedingChecked && !data.internalBleeding)
      errors.internalBleeding = "Internal bleeding option is required.";
  
    if (poisoningChecked && !data.poisoning)
      errors.poisoning = "Poisoning option is required.";
  
    if (feverChecked && !data.fever)
      errors.fever = "Fever option is required.";

    if (!data.burnPercentage) {
      errors.burnPercentage = 'Burn percentage is required.';
    } else if (isNaN(parseFloat(data.burnPercentage))) {
      errors.burnPercentage = 'Burn percentage should be a numeric value.';
    } else if (
      parseFloat(data.burnPercentage) < 0 ||
      parseFloat(data.burnPercentage) > 100
    ) {
      errors.burnPercentage = 'Burn percentage must be between 0 and 100.';
    }
    if (!data.otherConditions  || data.otherConditions.length === 0)
      errors.otherConditions = "At least one condition must be selected.";
  
    return errors;
  };
  


  const handleTraumaSubmit = () => {
    const formData = {
      options: selectedOptions, 
      traumaType: traumaChecked ? selectedTraumaOption : null,
      fracture: fractureChecked ? selectedFractureOption : null,
      fall: fallChecked ? selectedFallOption : null,
      stabWound: stabWoundChecked
        ? {
            severity: selectedStabWoundOption.severity,
            location: selectedStabWoundOption.location,
          }
        : null,
    };
  
    // Validate form data
    const errs = validateForm(formData);
  
    if (Object.values(errs).some((error) => error !== '')) {
      setErrors(errs);
      return; 
    }
    // Dispatch the data if no errors
    dispatch({
      type: 'updateTriageData',
      payload: {
        ...triageDataFromStore,
        trauma: formData,
      },
    });
  
    // Navigate to the next page
    navigation.navigate('RedZonePage',{condition});
  };
  
  const validateForm = (formData) => {
    const errs = {
      options: formData.options.length === 0 ? 'At least one option must be selected.' : '',
      traumaType: traumaChecked && !formData.traumaType ? 'This field is required.' : '',
      fractureRegion: fractureChecked && !formData.fracture ? 'This field is required.' : '',
      fallHeight: fallChecked && !formData.fall ? 'This field is required.' : '',
      stabWoundSeverity: stabWoundChecked && !formData.stabWound?.severity ? 'Severity is required.' : '',
      stabWoundLocation: stabWoundChecked && !formData.stabWound?.location ? 'Location is required.' : '',
    };
  
    setErrors(errs);
    return errs;
  };
  
  
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Trauma"
              ? styles.activeTraumaButton
              : styles.inactiveTraumaButton,
            styles.tabButton,
          ]}
          onPress={() => setSelectedCategory("Trauma")}
        >
          <Text style={styles.categoryText}>Trauma</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Non-Trauma"
              ? styles.activeNonTraumaButton
              : styles.inactiveNonTraumaButton,
            styles.tabButton,
          ]}
          onPress={() => setSelectedCategory("Non-Trauma")}
        >
          <Text style={styles.categoryText}>Non-Trauma</Text>
        </TouchableOpacity>
      </View>

      {selectedCategory === "Trauma" ? (
        <>
          {/* Options */}
          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedOptions.includes(option)
                    ? styles.selectedOptionButton
                    : null,
                ]}
                onPress={() => handleOptionPress(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.options ? <Text style={styles.errorText}>{errors.options}</Text> : null}

          {/* // JSX for Trauma Types */}
<View style={traumaChecked && styles.section}>
  <CheckBox
    title="Trauma Types *"
    checked={traumaChecked}
    onPress={() => setTraumaChecked(!traumaChecked)}
    containerStyle={styles.checkBoxRow}
  />
  {traumaChecked && (
    <View style={styles.optionsContainer}>
      {traumaOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedTraumaOption === option && styles.selectedOption,
          ]}
          onPress={() => setSelectedTraumaOption(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

    {errors.traumaType ? <Text style={styles.errorText}>{errors.traumaType}</Text> : null}
</View>
  )}
</View>

{/* // JSX for Fracture */}
<View style={fractureChecked && styles.section}>
  <CheckBox
    title="Fracture *"
    checked={fractureChecked}
    onPress={() => setFractureChecked(!fractureChecked)}
    containerStyle={styles.checkBoxRow}
  />
  {fractureChecked && (
    <View style={styles.optionsContainer}>
      {fractureOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedFractureOption === option && styles.selectedOption,
          ]}
          onPress={() => setSelectedFractureOption(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )}
 {errors.fractureRegion ? <Text style={styles.errorText}>{errors.fractureRegion}</Text> : null}
 </View>
{/* // JSX for Fall */}
<View style={fallChecked && styles.section}>
  <CheckBox
    title="Fall *"
    checked={fallChecked}
    onPress={() => setFallChecked(!fallChecked)}
    containerStyle={styles.checkBoxRow}
  />
  {fallChecked && (
    <View style={styles.optionsContainer}>
      {fallOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedFallOption === option && styles.selectedOption,
          ]}
          onPress={() => setSelectedFallOption(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )}
 {errors.fallHeight ? <Text style={styles.errorText}>{errors.fallHeight}</Text> : null}
 </View>

{/* // JSX for Stab Wound */}
<View style={stabWoundChecked && styles.section}>
  <CheckBox
    title="Stab Wound *"
    checked={stabWoundChecked}
    onPress={() => setStabWoundChecked(!stabWoundChecked)}
    containerStyle={styles.checkBoxRow}
  />
  {stabWoundChecked && (
    <>
      <Text style={styles.sectionsubTitle}>Stab Injury Severity</Text>
      <View style={styles.optionsContainer}>
        {stabWoundSeverityOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedStabWoundOption.severity === option &&
                styles.selectedOption,
            ]}
            onPress={() =>
              setSelectedStabWoundOption((prev) => ({
                ...prev,
                severity: option,
              }))
            }
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionsubTitle}>Stab Injury Location</Text>
      <View style={styles.optionsContainer}>
        {stabWoundLocationOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedStabWoundOption.location === option &&
                styles.selectedOption,
            ]}
            onPress={() =>
              setSelectedStabWoundOption((prev) => ({
                ...prev,
                location: option,
              }))
            }
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      </>
  )}
</View>

          {/* Submit Button */}
     
      <TouchableOpacity style={styles.submitButton} onPress={handleTraumaSubmit}>
              <Text style={styles.nonTraumaSubmitText}>Submit</Text>
            </TouchableOpacity>
        </>
      ) : (
        <View style={styles.nonTraumaContainer}>
          <ScrollView contentContainerStyle={styles.nonTraumaScrollView}>
            {/* List of conditions */}
            <View style={styles.nonTraumaConditionsContainer}>
  {[
    "Edema",
    "Breathlessness",
    "Hanging",
    "Heat stroke",
    "Drowning",
    "Cough or Cold",
    "Drug Overdose",
    "Stool pass",
    "Swelling or Wound",
    "Skin Rash",
    "Electrocution",
    "Urine pass",
    "Dizziness",
    "Headache",
    "For Medico-Legal Examination",
  ].map((condition, index) => {
    const isSelected = selectedConditions.includes(condition);

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.nonTraumaConditionButton,
          isSelected && styles.selectedOptionButton, // Add selected style
        ]}
        onPress={() => {
          setSelectedConditions((prev) =>
            isSelected
              ? prev.filter((c) => c !== condition) // Deselect
              : [...prev, condition] // Select
          );
        }}
      >
        <Text
          style={[
            styles.nonTraumaConditionText,
            isSelected && { color: 'white' }, // Change text color when selected
          ]}
        >
          {condition}
        </Text>
      </TouchableOpacity>
    );
  })}
</View>
{formErrors.otherConditions && (
      <Text style={styles.errorText}>{formErrors.otherConditions}</Text>
    )}


            {/* Burn Input */}
            <Text style={styles.nonTraumaBurnLabel}>Burn *</Text>
<TextInput
  style={styles.nonTraumaInput}
  placeholder="Enter in percentage"
  keyboardType="numeric"
  value={burnPercentage}
  onChangeText={setBurnPercentage}  // This will update the burnPercentage state
/>

{formErrors.burnPercentage && (
      <Text style={styles.errorText}>{formErrors.burnPercentage}</Text>
    )}
            {/* Checkboxes and Options */}
            <View style={ pregnancyChecked && styles.section}>
              <CheckBox
                title="Pregnancy *"
                checked={pregnancyChecked}
                onPress={() => setPregnancyChecked(!pregnancyChecked)}
                containerStyle={styles.checkBoxRow}
              />

              {pregnancyChecked && (
                <View style={styles.optionsContainer}>
                  {nonTraumaOptions.pregnancy.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionButton,
                        selectedPregnancyOption === option &&
                          styles.selectedOption,
                      ]}
                      onPress={() => setSelectedPregnancyOption(option)}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            {formErrors.pregnancy && (
      <Text style={styles.errorText}>{formErrors.pregnancy}</Text>
    )}

            <View style={ bleedingChecked && styles.section}>
              <CheckBox
                title="Internal Bleeding *"
                checked={bleedingChecked}
                onPress={() => setBleedingChecked(!bleedingChecked)}
                containerStyle={styles.checkBoxRow}
              />

              {bleedingChecked && (
                <View style={styles.optionsContainer}>
                  {nonTraumaOptions.bleeding.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionButton,
                        selectedBleedingOption === option &&
                          styles.selectedOption,
                      ]}
                      onPress={() => setSelectedBleedingOption(option)}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            {formErrors.internalBleeding && (
      <Text style={styles.errorText}>{formErrors.internalBleeding}</Text>
    )}

            <View style={ poisoningChecked && styles.section}>
              <CheckBox
                title="Poisoning *"
                checked={poisoningChecked}
                onPress={() => setPoisoningChecked(!poisoningChecked)}
                containerStyle={styles.checkBoxRow}
              />
              {poisoningChecked && (
                <View style={styles.optionsContainer}>
                  {nonTraumaOptions.poisoning.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionButton,
                        selectedPoisoningOption === option &&
                          styles.selectedOption,
                      ]}
                      onPress={() => setSelectedPoisoningOption(option)}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            {formErrors.poisoning && (
      <Text style={styles.errorText}>{formErrors.poisoning}</Text>
    )}

            <View style={ feverChecked && styles.section}>
              <CheckBox
                title="Fever *"
                checked={feverChecked}
                onPress={() => setFeverChecked(!feverChecked)}
                containerStyle={styles.checkBoxRow}
              />
              {feverChecked && (
                <View style={styles.optionsContainer}>
                  {nonTraumaOptions.fever.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionButton,
                        selectedFeverOption === option && styles.selectedOption,
                      ]}
                      onPress={() => setSelectedFeverOption(option)}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            {formErrors.fever && (
      <Text style={styles.errorText}>{formErrors.fever}</Text>
    )}

            {/* Submit Button */}
            <TouchableOpacity style={styles.nonTraumaSubmitButton} onPress={handleSubmitPress}>
              <Text style={styles.nonTraumaSubmitText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1a1a1a",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,

    borderWidth: 1,
    borderColor: "#cccccc",
    width: "100%",
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  tabButton: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    width: "50%",
  },
  activeTraumaButton: {
    backgroundColor: "#ff6961",
  },
  inactiveTraumaButton: {
    backgroundColor: "#ccc",
  },
  activeNonTraumaButton: {
    backgroundColor: "#4caf50", // Green color for Non-Trauma
  },
  inactiveNonTraumaButton: {
    backgroundColor: "#ccc",
  },
  activeButton: {
    backgroundColor: "#ff6961",
  },
  inactiveButton: {
    backgroundColor: "#ccc",
  },
  categoryText: {
    color: "#fff",
    fontWeight: "bold",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    justifyContent: "center",
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

  optionButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    margin: 5,
  },
  selectedOptionButton: {
    backgroundColor: "#007bff", //007bff
  },
  optionText: {
    color: "#000",
  },
  optionButton: {
    backgroundColor: "#e8f1fe",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 5,
  },
  optionText: {
    color: "#000",
  },
  sectionContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  sectionOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    margin: 5,
  },
  tagText: {
    color: "#000",
  },
  submitButton: {
    backgroundColor: "#2196f3",
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 24,
    alignSelf: 'center',
  },
  sectionsubTitle: {
    color: "orange",
  },
  selectedTagButton: {
    backgroundColor: "#007bff", //007bff
  },
  tagText: {
    color: "#000",
  },
  nonTraumaContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  nonTraumaHeader: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  nonTraumaTabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  nonTraumaTabButton: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  nonTraumaActiveTab: {
    backgroundColor: "#8FD59F",
  },
  nonTraumaTabText: {
    fontSize: 16,
    color: "#333",
  },
  nonTraumaScrollView: {
    flexGrow: 1,
  },
  nonTraumaConditionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  nonTraumaConditionButton: {
    backgroundColor: "#E3F1FF",
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    width: "48%",
    alignItems: "center",
  },
  nonTraumaConditionText: {
    fontSize: 14,
    color: "#333",
  },
  nonTraumaBurnLabel: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  nonTraumaInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  nonTraumaRadioContainer: {
    marginVertical: 20,
  },
  nonTraumaRadioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  nonTraumaRadioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
    marginRight: 10,
  },
  nonTraumaRadioText: {
    fontSize: 16,
    color: "#333",
  },
  nonTraumaSubmitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 24,
    alignSelf: 'center',
    
    
  },
 
  nonTraumaSubmitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedOption: {
    backgroundColor: "#007bff", // Blue background color for selected option
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default Trauma;
