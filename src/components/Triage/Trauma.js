import React, { useState } from 'react';
import { View, Text, StyleSheet,TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { RadioButton, Button } from 'react-native-paper';

const Trauma = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Trauma');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedTraumaType, setSelectedTraumaType] = useState('');
    const [selectedFracture, setSelectedFracture] = useState('');
    const [selectedFall, setSelectedFall] = useState('');
    const [selectedStabWound, setSelectedStabWound] = useState({ severity: '', location: '' });

    const [selectedTab, setSelectedTab] = useState('Non-Trauma');

    const handleTabChange = (tab) => {
      setSelectedTab(tab);
    };

    const traumaOptions = [
        'Gun shot', 'Vehicle', 'Chest', 'Significant Assault', 
        'Multiple Injuries', 'Sexual assault', 'Major vascular injury'
    ];

    const fractureOptions = [
        'Pelvic fracture', 'Multiple fracture', 'Open fracture of hand feet', 
        'Isolated long bone facture', 'Isolated small bone facture', 
        'Closed facture excluding of hand and feet', 
        'Open facture excluding of hand and feet'
    ];

    const fallOptions = [
        '>3 times height of person', '<3 times height of person', 
        '>5 Stars', '<5 Stars'
    ];

    const stabWoundSeverityOptions = [
        'Superficial Wound', 'Organ Injury', 'Deep Wound', 
        'Penetrating Wound', 'Major Blood Vessels Injury'
    ];

    const stabWoundLocationOptions = [
        'Head', 'Chest', 'Extremity', 'Abdomen', 'Groin'
    ];

    // Array of options to display
    const options = [
        'Amputation', 'Neck Swelling', 'Suspected Abuse', 
        'Minor Head Injury', 'Abrasions/Lacerations/Contusions/Bruises'
    ];

    // Handle option selection
    const handleOptionPress = (option) => {
        setSelectedOptions((prev) =>
            prev.includes(option) 
                ? prev.filter((item) => item !== option) 
                : [...prev, option]
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            
<View style={styles.categoryContainer}>
                <TouchableOpacity
                    style={[
                        styles.categoryButton,
                        selectedCategory === 'Trauma' 
                            ? styles.activeTraumaButton 
                            : styles.inactiveTraumaButton,
                        styles.tabButton,
                    ]}
                    onPress={() => setSelectedCategory('Trauma')}
                >
                    <Text style={styles.categoryText}>Trauma</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.categoryButton,
                        selectedCategory === 'Non-Trauma' 
                            ? styles.activeNonTraumaButton 
                            : styles.inactiveNonTraumaButton,
                        styles.tabButton,
                    ]}
                    onPress={() => setSelectedCategory('Non-Trauma')}
                >
                    <Text style={styles.categoryText}>Non-Trauma</Text>
                </TouchableOpacity>
            </View>

            
            {  selectedCategory === 'Trauma' ? (
                <>

              


            {/* Options */}
            <View style={styles.optionsContainer}>
                {options.map((option, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={[
                            styles.optionButton,
                            selectedOptions.includes(option) ? styles.selectedOptionButton : null
                        ]}
                        onPress={() => handleOptionPress(option)}
                    >
                        <Text style={styles.optionText}>
                            {option}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Trauma Types */}
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <RadioButton
                        value="traumaTypes"
                        status={selectedSection === 'traumaTypes' ? 'checked' : 'unchecked'}
                        onPress={() => setSelectedSection('traumaTypes')}
                    />
                    <Text style={styles.sectionTitle}>Trauma Types</Text>
                </View>
                {selectedSection === 'traumaTypes' && (
                    <View style={styles.sectionOptions}>
                        {traumaOptions.map((option, index) => (
                            <TouchableOpacity 
                                key={index} 
                                style={[
                                    styles.tagButton,
                                    selectedTraumaType === option ? styles.selectedTagButton : null
                                ]}
                                onPress={() => setSelectedTraumaType(option)}
                            >
                                <Text style={styles.tagText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

             {/* Fracture */}
             <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <RadioButton
                        value="fracture"
                        status={selectedSection === 'fracture' ? 'checked' : 'unchecked'}
                        onPress={() => setSelectedSection('fracture')}
                    />
                    <Text style={styles.sectionTitle}>Fracture</Text>
                </View>
                {selectedSection === 'fracture' && (
                    <View style={styles.sectionOptions}>
                        {fractureOptions.map((option, index) => (
                            <TouchableOpacity 
                                key={index} 
                                style={[
                                    styles.tagButton,
                                    selectedFracture === option ? styles.selectedTagButton : null
                                ]}
                                onPress={() => setSelectedFracture(option)}
                            >
                                <Text style={styles.tagText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            {/* Fall */}
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <RadioButton
                        value="fall"
                        status={selectedSection === 'fall' ? 'checked' : 'unchecked'}
                        onPress={() => setSelectedSection('fall')}
                    />
                    <Text style={styles.sectionTitle}>Fall</Text>
                </View>
                {selectedSection === 'fall' && (
                    <View style={styles.sectionOptions}>
                        {fallOptions.map((option, index) => (
                            <TouchableOpacity 
                                key={index} 
                                style={[
                                    styles.tagButton,
                                    selectedFall === option ? styles.selectedTagButton : null
                                ]}
                                onPress={() => setSelectedFall(option)}
                            >
                                <Text style={styles.tagText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            {/* Stab Wound */}
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <RadioButton
                        value="stabwound"
                        status={selectedSection === 'stabwound' ? 'checked' : 'unchecked'}
                        onPress={() => setSelectedSection('stabwound')}
                    />
                    <Text style={styles.sectionTitle}>Stab Wound</Text>
                </View>
                {selectedSection === 'stabwound' && (
                    <>
                        <Text style={styles.sectionsubTitle}>Stab Injury Severity</Text>
                        <View style={styles.sectionOptions}>
                            {stabWoundSeverityOptions.map((option, index) => (
                                <TouchableOpacity 
                                    key={index} 
                                    style={[
                                        styles.tagButton,
                                        selectedStabWound.severity === option ? styles.selectedTagButton : null
                                    ]}
                                    onPress={() => setSelectedStabWound(prev => ({ ...prev, severity: option }))}
                                >
                                    <Text style={styles.tagText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Text style={styles.sectionsubTitle}>Stab Injury Location</Text>
                        <View style={styles.sectionOptions}>
                            {stabWoundLocationOptions.map((option, index) => (
                                <TouchableOpacity 
                                    key={index} 
                                    style={[
                                        styles.tagButton,
                                        selectedStabWound.location === option ? styles.selectedTagButton : null
                                    ]}
                                    onPress={() => setSelectedStabWound(prev => ({ ...prev, location: option }))}
                                >
                                    <Text style={styles.tagText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                )}
            </View>

            </>
            ) : (
                <View style={styles.nonTraumaContainer}>
               
               
                <ScrollView contentContainerStyle={styles.nonTraumaScrollView}>
                  {/* List of conditions */}
                  <View style={styles.nonTraumaConditionsContainer}>
                    {['Edema', 'Breathlessness', 'Hanging', 'Heat stroke', 'Drowning', 'Cough or Cold', 'Drug Overdose', 'Stool pass', 'Swelling or Wound', 'Skin Rash', 'Electrocution', 'Urine pass', 'Dizziness', 'Headache', 'For Medico-Legal Examination'].map((condition, index) => (
                      <TouchableOpacity key={index} style={styles.nonTraumaConditionButton}>
                        <Text style={styles.nonTraumaConditionText}>{condition}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
              
                  {/* Burn Input */}
                  <Text style={styles.nonTraumaBurnLabel}>Burn *</Text>
                  <TextInput style={styles.nonTraumaInput} placeholder="Enter in percentage" keyboardType="numeric" />
              
                  {/* Other conditions */}
                  <View style={styles.nonTraumaCheckboxContainer}>
          {['Pregnancy', 'Internal Bleeding', 'Poisoning', 'Fever'].map((checkbox, index) => (
            <View key={index} style={styles.nonTraumaCheckboxOption}>
              <TouchableOpacity
                style={[
                  styles.nonTraumaCheckboxButton,
                  selectedCheckbox === checkbox && styles.activeCheckboxButton,
                ]}
                onPress={() => handleCheckboxChange(checkbox)}
              />
              <Text style={styles.nonTraumaCheckboxText}>{checkbox}</Text>
            </View>
          ))}
        </View>

        {/* Options based on selected checkbox */}
        {selectedCheckbox && (
          <View style={styles.optionsContainer}>
            <Text style={styles.optionsLabel}>Select an option:</Text>
            {renderOptions()}
          </View>
        )}
              
                  {/* Submit Button */}
                  <TouchableOpacity style={styles.nonTraumaSubmitButton}>
                    <Text style={styles.nonTraumaSubmitText}>Submit</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
              
            )}

            {/* Submit Button */}
            <Button mode="contained" style={styles.submitButton} onPress={() => console.log('Submit')}>
                Submit
            </Button>
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#1a1a1a',
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
      
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '100%',
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
      width:"50%"
       
      },
      activeTraumaButton: {
        backgroundColor: '#ff6961',
    },
    inactiveTraumaButton: {
        backgroundColor: '#ccc',
    },
    activeNonTraumaButton: {
        backgroundColor: '#4caf50', // Green color for Non-Trauma
    },
    inactiveNonTraumaButton: {
        backgroundColor: '#ccc',
    },
    activeButton: {
        backgroundColor: '#ff6961', 
    },
    inactiveButton: {
        backgroundColor: '#ccc',
    },
    categoryText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
        justifyContent: 'center',
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    optionButton: {
        backgroundColor: '#e0e0e0',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        margin: 5,
    },
    selectedOptionButton: {
        backgroundColor: '#007bff',//007bff
    },
    optionText: {
        color: '#000',
    },
    optionButton: {
        backgroundColor: '#e0e0e0',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        margin: 5,
    },
    optionText: {
        color: '#000',
    },
    sectionContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    sectionOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tagButton: {
        backgroundColor: '#e0e0e0',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        margin: 5,
    },
    tagText: {
        color: '#000',
    },
    submitButton: {
        backgroundColor: '#2196f3',
        paddingVertical: 10,
    },
    sectionsubTitle:{
        color:"orange",
    },
    selectedTagButton: {
        backgroundColor: '#007bff',//007bff
    },
    tagText: {
        color: '#000',
    },
    nonTraumaContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
      nonTraumaHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
      },
      nonTraumaTabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
      },
      nonTraumaTabButton: {
        flex: 1,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 5,
      },
      nonTraumaActiveTab: {
        backgroundColor: '#8FD59F',
      },
      nonTraumaTabText: {
        fontSize: 16,
        color: '#333',
      },
      nonTraumaScrollView: {
        flexGrow: 1,
      },
      nonTraumaConditionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      nonTraumaConditionButton: {
        backgroundColor: '#E3F1FF',
        padding: 10,
        borderRadius: 20,
        marginVertical: 5,
        width: '48%',
        alignItems: 'center',
      },
      nonTraumaConditionText: {
        fontSize: 14,
        color: '#333',
      },
      nonTraumaBurnLabel: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 10,
      },
      nonTraumaInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 20,
      },
      nonTraumaRadioContainer: {
        marginVertical: 20,
      },
      nonTraumaRadioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
      },
      nonTraumaRadioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#333',
        marginRight: 10,
      },
      nonTraumaRadioText: {
        fontSize: 16,
        color: '#333',
      },
      nonTraumaSubmitButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
      },
      nonTraumaSubmitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
});

export default Trauma;
