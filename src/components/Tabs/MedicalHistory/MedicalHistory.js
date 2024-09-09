import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  TextInput,
  FlatList,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { Chip, Button, Checkbox } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import Icon from 'react-native-vector-icons/MaterialIcons';


const MedicalHistoryScreen = () => {
  const [medicalHistoryData, setMedicalHistory] =
  React.useState({
    patientID: 0,
    userID: 0,
    givenName: '',
    givenPhone: '',
    givenRelation: '',
    bloodGroup: '',
    bloodPressure: '',
    disease: '',
    foodAllergy: '',
    medicineAllergy: '',
    anaesthesia: '',
    meds: '',
    selfMeds: '',
    chestCondition: '',
    neurologicalDisorder: '',
    heartProblems: '',
    infections: '',
    mentalHealth: '',
    drugs: '',
    pregnant: '',
    hereditaryDisease: '',
    lumps: '',
    cancer: '',
    familyDisease:'',
  });
  const [answers, setAnswers] = useState({
    bloodPressure: null,
    alteredSensorium: null,
    cancer: null,
    chestCondition: null,
    pregnant: null,
    allergy: null,
    lumps: null,
    neurological: null,
    infections: null,
    addiction: null,
    family: null,
    mentalHealth: null,
    prescribedMedicines: null,
    selfPrescribedMedicines: null,
    heartProblems: null,
    foodAllergy: null,
  });

  const handleAnswerChange = (field, value) => {
    setAnswers({ ...answers, [field]: value });
  };

  const [bloodTypeChecked, setBloodTypeChecked] = useState(false);
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [errors, setErrors] = useState({});

  // Example options for blood types
  const responseOptions = {
    bloodTypes: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  };

  const renderToggleButton = (label, field) => (
    <View style={styles.toggleContainer}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <View style={styles.toggleButtons}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
              medicalHistoryData[field] === "Yes"
              ? styles.toggleButtonSelected
              : styles.toggleButtonUnselected,
          ]}
        onPress={() =>
          setMedicalHistory((prev) => ({
            ...prev,
            [field]: "Yes",
          }))
        }
        >
          <Text
            style={[
              styles.toggleButtonText,
              // state === "yes" && styles.toggleButtonTextSelected,
                medicalHistoryData[field] === "Yes" && styles.toggleButtonTextSelected,
            ]}
          >
            Yes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={[
          styles.toggleButton,
          medicalHistoryData[field] === "No"
            ? styles.toggleButtonSelected
            : styles.toggleButtonUnselected,
        ]}
        onPress={() =>
          setMedicalHistory((prev) => ({
            ...prev,
            [field]: "No",
          }))
        }
      >
        <Text
          style={[
            styles.toggleButtonText,
            medicalHistoryData[field] === "No" && styles.toggleButtonTextSelected,
          ]}
        >
          No
        </Text>
      </TouchableOpacity>
  
      </View>
    </View>
  );

  const locations = [
    "Thyroid",
    "Lymph nodes - neck",
    "Lymph nodes - jaw",
    "Lymph nodes - ear",
    "Salivary glands",
    "Breast",
    "Lung",
    "Liver",
    "Spleen",
    "Kidneys",
    "Ovaries",
    "Lymph nodes - abdominal",
    "Lymph nodes - axillary",
    "Arms",
    "Legs",
  ];

  const sizes = ["Small", "Medium", "Large"];
  const consistencies = ["Soft", "Firm", "Hard"];
  const [lumps, setLumps] = useState({
    istrue: false,
    details: { location: "", size: "", consistency: "" },
  });
  const [formDisabled, setFormDisabled] = useState(false);
 
  const [foodAllergyList] = useState([
    'Peanuts',
    'Tree nuts',
    'Milk',
    'Eggs',
    'Wheat',
    'Soy',
    'Fish',
    'Shellfish',
  ]);

  // const addFoodAllergy = () => {
  //   if (foodAlergy.search && !foodAlergy.selectedList.includes(foodAlergy.search)) {
  //     setFoodAllergy((prev) => ({
  //       ...prev,
  //       selectedList: [...prev.selectedList, foodAlergy.search],
  //       search: '',
  //     }));
  //   }
  // };

  // const removeFoodAllergy = (item) => {
  //   setFoodAllergy((curr) => ({
  //     ...curr,
  //     selectedList: curr.selectedList.filter((val) => val !== item),
  //   }));
  // };
  const heartProblemList = ['Cardiomegaly', 'Arrhythmia', 'Heart Valve Disease', 'abc'];

  const [heartProblem, setHeartProblem] = useState({
    searchedList: [],
    selectedList: medicalHistoryData?.heartProblems
      ? medicalHistoryData.heartProblems.split(',')
      : [],
    search: '',
    istrue: !!medicalHistoryData?.heartProblems,
  });

  // Update searchedList based on search input
  // useEffect(() => {
  //   if (!heartProblem.search) {
  //     setHeartProblem((prevValue) => ({
  //       ...prevValue,
  //       searchedList: [...heartProblemList],
  //     }));
  //   } else {
  //     setHeartProblem((prevValue) => ({
  //       ...prevValue,
  //       searchedList: heartProblemList.filter((el) =>
  //         el.toLowerCase().includes(heartProblem.search.toLowerCase())
  //       ),
  //     }));
  //   }
  //   // No dependency on heartProblemList since it's static
  // }, []);


  //mental health======================
  const mentalProblemList = [
    "Anxiety Disorders",
    "Mood Disorders",
    "Schizophrenia Spectrum and Other Psychotic Disorders",
    "Obsessive-Compulsive and Related Disorders",
    "Trauma- and Stressor-Related Disorders",
    "Dissociative Disorders",
    "Somatic Symptom and Related Disorders",
    "Feeding and Eating Disorders",
    "Sleep-Wake Disorders",
    "Substance-Related and Addictive Disorders",
    "Personality Disorders",
    "Neurodevelopmental Disorders",
    "Neurocognitive Disorders",
    "Impulse Control Disorders",
  ];

  const [mentalProblem, setMentalProblem] = useState({
    search: '',
    selectedList: [],
    istrue: false,
    showDropdown: false,
  });

  const handleAddProblem = () => {
    if (
      mentalProblem.search &&
      !mentalProblem.selectedList.includes(mentalProblem.search)
    ) {
      setMentalProblem((prev) => ({
        ...prev,
        selectedList: [...prev.selectedList, prev.search],
        search: '',
        showDropdown: false,
      }));
    }
  };

  const handleSelectOption = (item) => {
    setMentalProblem((prev) => ({
      ...prev,
      selectedList: [...prev.selectedList, item],
      search: '',
      showDropdown: false,
    }));
  };


  // =============addiction================
  const addictionList = ["Alcohol", "Tobacco", "Drugs"];
  const [addiction, setAddiction] = useState({
    searchedList: addictionList, // Assuming all options are displayed initially
    selectedList: medicalHistoryData?.drugs
      ? medicalHistoryData?.drugs.split(",")
      : [],
    search: "",
    istrue: medicalHistoryData?.drugs ? true : false,
  });

  const handleAddictionChange = (value) => {
    if (addiction.selectedList.includes(value)) {
      setAddiction((prev) => ({
        ...prev,
        selectedList: prev.selectedList.filter((item) => item !== value),
      }));
    } else {
      setAddiction((prev) => ({
        ...prev,
        selectedList: [...prev.selectedList, value],
      }));
    }
  };

  //====================infection====================
  const infectionList = ["HIV", "Hepatitis B", "Hepatitis C"];
  const [infection, setInfection] = useState({
    searchedList: infectionList, // List of infections
    selectedList: medicalHistoryData?.infections
      ? medicalHistoryData?.infections.split(",")
      : [],
    search: "",
    istrue: medicalHistoryData?.infections ? true : false,
  });

  const handleInfectionChange = (value) => {
    setInfection((prev) => {
      const isSelected = prev.selectedList.includes(value);
      return {
        ...prev,
        selectedList: isSelected
          ? prev.selectedList.filter((item) => item !== value)
          : [...prev.selectedList, value],
      };
    });
  };

  //=========================heriditary============================
  const heriditaryList = ["Father", "Mother", "Siblings"];
  const [heriditary, setHeriditary] = useState({
    searchedList: heriditaryList,
    selectedList: medicalHistoryData?.hereditaryDisease
      ? medicalHistoryData?.hereditaryDisease.split(",")
      : [],
    search: "",
    istrue: medicalHistoryData?.hereditaryDisease ? true : false,
    diseaseNames: {}, // State to hold disease names
  })

  const handleHeriditaryChange = (value) => {
    setHeriditary((prev) => {
      const isSelected = prev.selectedList.includes(value);
      return {
        ...prev,
        selectedList: isSelected
          ? prev.selectedList.filter((item) => item !== value)
          : [...prev.selectedList, value],
      };
    });
  }


  const handleDiseaseNameChange = (key, value) => {
    setHeriditary((prev) => ({
      ...prev,
      diseaseNames: {
        ...prev.diseaseNames,
        [key]: value,
      },
    }));
  };

  //=========================pregnant============================
  const [isPregnant, setIsPregnant] = useState(
    medicalHistoryData?.pregnant ? true : false
  );
  const [pregnancyDetails, setPregnancyDetails] = useState({
    numberOfPregnancies: "",
    liveBirths: "",
  });

  const handleNumberOfPregnanciesChange = (value) => {
    setPregnancyDetails((prev) => ({
      ...prev,
      numberOfPregnancies: value,
    }));
  };

  const handleLiveBirthsChange = (value) => {
    setPregnancyDetails((prev) => ({
      ...prev,
      liveBirths: value,
    }));
  };

  //=========================cancer============================

const cancerTypes = [
  "Breast Cancer",
  "Lung Cancer",
  "Prostate Cancer",
  "Colorectal Cancer",
  "Leukemia",
  "Lymphoma",
  "Other",
];

const [isCancer, setIsCancer] = useState(
  medicalHistoryData?.cancer ? true : false
);
const [cancerDetails, setCancerDetails] = useState({
  type: "",
  stage: "",
});

const handleTypeChange = (itemValue) => {
  setCancerDetails((prev) => ({
    ...prev,
    type: itemValue,
  }));
};

const handleStageChange = (value) => {
  setCancerDetails((prev) => ({
    ...prev,
    stage: value,
  }));
};


//===========================Self Prescribed Medicine=========================== 
const fetchMedicineList = (query) => {
  // Dummy function for fetching medicine list
  // Replace with actual API call
  return [
    "Aspirin",
    "Ibuprofen",
    "Paracetamol",
    "Metformin",
    "Lisinopril",
    "Losartan",
  ].filter(med => med.toLowerCase().includes(query.toLowerCase()));
};
const [selfPrescribed, setSelfPrescribed] = useState({
  searchedList: [],
  selectedList: medicalHistoryData?.selfMeds
    ? medicalHistoryData.selfMeds.split(",").map(med => ({ name: med }))
    : [],
  search: "",
  istrue: medicalHistoryData?.selfMeds ? true : false,
  text: "",
  dosage: "",
  frequency: "",
  duration: {
    number: "",
    unit: "month",
  },
});

const handleTypeSelfPrescribedChange = (itemValue) => {
  setSelfPrescribed((prev) => ({
    ...prev,
    duration: {
      ...prev.duration,
      unit: itemValue,
    },
  }));
};

const handleAddMedicine = () => {
  if (selfPrescribed.search && !selfPrescribed.selectedList.some(med => med.name === selfPrescribed.search)) {
    setSelfPrescribed((prev) => ({
      ...prev,
      selectedList: [
        ...prev.selectedList,
        {
          name: `${selfPrescribed.search} (Dosage: ${selfPrescribed.dosage} | Frequency: ${selfPrescribed.frequency} | Duration: ${selfPrescribed.duration.number} ${selfPrescribed.duration.unit})`,
        },
      ],
      search: "",
      dosage: "",
      frequency: "",
      duration: {
        number: "",
        unit: "month",
      },
    }));
  }
};

useEffect(() => {
  if (selfPrescribed.search) {
    const medicines = fetchMedicineList(selfPrescribed.search);
    setSelfPrescribed((prev) => ({
      ...prev,
      searchedList: medicines,
    }));
  }
}, [selfPrescribed.search]);


//=========================== Prescribed Medicine=========================== 

const [prescribedMedicine, setPrescribedMedicine] = useState({
  searchedList: [],
  selectedList: medicalHistoryData?.meds
    ? medicalHistoryData.meds.split(",").map(med => ({ name: med }))
    : [],
  search: "",
  istrue: medicalHistoryData?.meds ? true : false,
  dosage: "",
  frequency: "",
  duration: {
    number: "",
    unit: "month",
  },
});

const handleTypePrescribedMedicineChange = (itemValue) => {
  setPrescribedMedicine((prev) => ({
    ...prev,
    duration: {
      ...prev.duration,
      unit: itemValue,
    },
  }));
};

const handlePrescribedMedicineAddMedicine = () => {
  if (prescribedMedicine.search && !prescribedMedicine.selectedList.some(med => med.name === prescribedMedicine.search)) {
    setPrescribedMedicine((prev) => ({
      ...prev,
      selectedList: [
        ...prev.selectedList,
        {
          name: `${prescribedMedicine.search} (Dosage: ${prescribedMedicine.dosage} | Frequency: ${prescribedMedicine.frequency} | Duration: ${prescribedMedicine.duration.number} ${prescribedMedicine.duration.unit})`,
        },
      ],
      search: "",
      dosage: "",
      frequency: "",
      duration: {
        number: "",
        unit: "month",
      },
    }));
  }
};

useEffect(() => {
  if (prescribedMedicine.search) {
    const medicines = fetchMedicineList(prescribedMedicine.search);
    setPrescribedMedicine((prev) => ({
      ...prev,
      searchedList: medicines,
    }));
  }
}, [prescribedMedicine.search]);

//==============================neurologicalDisorders==============================
const neurologicalDisordersList = [
  "Migraine",
  "Diabetic neuropathy",
  "Guillain-Barré syndrome",
  "Tension headache",
  "Cluster headache",
  "Epilepsy",
  "Febrile seizures",
  "Parkinson's disease",
  "Huntington's disease",
  "Dystonia",
  "Tremor",
  "Dementia",
  "Alzheimer's disease",
  "Delirium",
  "Learning disabilities",
  "Depression",
  "Bipolar disorder",
  "Anxiety disorders",
  "Insomnia",
  "Sleep apnea",
  "Narcolepsy",
  "Multiple Sclerosis",
  "Brain Tumors",
  "Stroke",
  "Meningitis",
  "Encephalitis",
  "Muscular dystrophy",
  "Myasthenia gravis",
  "Neuralgia",
  "Fibromyalgia",
  "Autism Spectrum Disorder (ASD)",
  "Attention Deficit Hyperactivity Disorder (ADHD)",
  "Amyotrophic Lateral Sclerosis (ALS)",
  "Chronic pain",
  "Back pain",
];

const [neurologicalDisorder, setNeurologicalDisorder] = useState({
  searchedList: neurologicalDisordersList,
  selectedList: medicalHistoryData?.neurologicalDisorder
    ? medicalHistoryData?.neurologicalDisorder.split(",")
    : [],
  search: "",
  istrue: medicalHistoryData?.neurologicalDisorder ? true : false,
});

const [showDropdown, setShowDropdown] = useState(false);

const handleAddDisorder = () => {
  if (
    neurologicalDisorder.search &&
    !neurologicalDisorder.selectedList.includes(neurologicalDisorder.search)
  ) {
    setNeurologicalDisorder((prev) => ({
      ...prev,
      selectedList: [...prev.selectedList, neurologicalDisorder.search],
      search: "",
    }));
    setShowDropdown(false);
  }
};

const handleSearchChange = (text) => {
  setNeurologicalDisorder((prev) => ({
    ...prev,
    search: text,
    searchedList: neurologicalDisordersList.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    ),
  }));
  setShowDropdown(true);
};

//==============================chestConditions==============================
const chestConditionsList = [
  "Asthma",
  "Chronic Obstructive Pulmonary Disease (COPD)",
  "Pneumonia",
  "Bronchitis",
  "Tuberculosis",
  "Pulmonary Embolism",
  "Pleural Effusion",
  "Pneumothorax",
  "Lung Cancer",
  "Chest Pain (unspecified)",
  "Cough",
  "Shortness of breath",
  "Wheezing",
  "Hemoptysis",
  "Chest Wall Pain",
];

const [chestCondition, setChestCondition] = useState({
  searchedList: chestConditionsList,
  selectedList: medicalHistoryData?.chestCondition
    ? medicalHistoryData?.chestCondition.split(",")
    : [],
  search: "",
  istrue: medicalHistoryData?.chestCondition ? true : false,
});

const filteredList = chestCondition.searchedList.filter(item =>
  item.toLowerCase().includes(chestCondition.search.toLowerCase())
);

const handlechestConditionSearchChange = (text) => {
  setChestCondition((prev) => ({
    ...prev,
    search: text,
  }));
};

const handleAddCondition = () => {
  if (
    chestCondition.search &&
    !chestCondition.selectedList.includes(chestCondition.search)
  ) {
    setChestCondition((prev) => ({
      ...prev,
      selectedList: [...prev.selectedList, chestCondition.search],
      search: "",
    }));
  }
};

const handleRemoveCondition = (item) => {
  setChestCondition((prev) => ({
    ...prev,
    selectedList: prev.selectedList.filter((val) => val !== item),
  }));
};

const renderOption = ({ item }) => (
  <TouchableOpacity
    style={styles.optionItem}
    onPress={() => setChestCondition((prev) => ({
      ...prev,
      search: item,
    }))}
  >
    <Text>{item}</Text>
  </TouchableOpacity>
);

const renderSelectedItem = ({ item }) => (
  <View style={styles.selectedItems}>
    <Text style={styles.selectedItemText}>{item}</Text>
    <TouchableOpacity
      onPress={() => handleRemoveCondition(item)}
      style={styles.removeButton}
      disabled={formDisabled}
    >
      <Text style={styles.removeButtonText}>X</Text>
    </TouchableOpacity>
  </View>
);

//=======================disease==========================
const [disease, setDisease] = useState([]);

const handleCheckboxChange = (diseaseName) => {
  if (disease.includes(diseaseName)) {
    setDisease(disease.filter((dis) => dis !== diseaseName));
  } else {
    setDisease([...disease, diseaseName]);
  }
};

//========================food================
 const [foodAlergy, setFoodAlergy] = useState({
    searchedList: [],
    selectedList: medicalHistoryData?.foodAllergy
      ? medicalHistoryData?.foodAllergy.split(",")
      : [],
    search: "",
    istrue: medicalHistoryData?.foodAllergy ? true : false,
  });

 const removeChip = (item) => {
    setFoodAlergy((prev) => ({
      ...prev,
      selectedList: prev.selectedList.filter((chip) => chip !== item),
    }));
  };



//===============================medicineAllergy=====================
 const [medicineAllergy, setMedicineAllergy] = useState({
    searchedList: [],
    selectedList: medicalHistoryData?.medicineAllergy
      ? medicalHistoryData?.medicineAllergy.split(",")
      : [],
    search: "",
    istrue: medicalHistoryData?.medicineAllergy ? true : false,
  });

   const removeMedChip = (item) => {
    setMedicineAllergy((prev) => ({
      ...prev,
      selectedList: prev.selectedList.filter((chip) => chip !== item),
    }));
  };

React.useEffect(() => {
  setMedicalHistory({
    patientID: 0,
    // userID: user.id,
    userID:0,
    // givenName: giveBy,
    // givenPhone: String(phoneNumber),
    // givenRelation: relation,
     bloodGroup: bloodTypeChecked ? selectedBloodType : '',
    bloodPressure: medicalHistoryData.bloodPressure ? "Yes" : "No",
    disease: disease.join(","),
    foodAllergy: foodAlergy.selectedList.join(","),
    medicineAllergy: medicineAllergy?.selectedList.join(","),
    // anaesthesia: isAnethesia ? "Yes" : "No",
     anaesthesia: medicalHistoryData.anaesthesia,
    meds: prescribedMedicine.selectedList.map((med) => med.name)
    .join(", "),
    selfMeds: selfPrescribed.selectedList
    .map((med) => med.name)
    .join(", "),
  
    chestCondition: chestCondition.selectedList.join(","),
    neurologicalDisorder: neurologicalDisorder?.selectedList.join(","),
    heartProblems: heartProblem.selectedList.join(","),
    infections: infection.istrue ? infection.selectedList.join(",") : "",
    mentalHealth: mentalProblem.selectedList.join(","), 
    drugs: addiction.selectedList.join(","),
    pregnant: isPregnant
      ? `Number of Pregnancies: ${pregnancyDetails.numberOfPregnancies}, Live Births: ${pregnancyDetails.liveBirths}`
      : "No",
    hereditaryDisease: heriditary.istrue
      ? heriditary.selectedList.join(",")
      : "",
    lumps: lumps.istrue
      ? `Location: ${lumps?.details.location}, Size: ${lumps?.details.size}, Consistency: ${lumps?.details.consistency}`
      : "",

    cancer: isCancer
      ? `Type: ${cancerDetails.type}, Stage: ${cancerDetails.stage}`
      : "",
    familyDisease: Object.entries(heriditary.diseaseNames)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", "),
  });
}, [
  // user,===
  // giveBy,==
  // phoneNumber,===
  // relation,===
  disease,
  foodAlergy,
  medicineAllergy,
  prescribedMedicine,
  selfPrescribed,
  chestCondition,
  infection,
  heriditary,
  lumps,
  cancerDetails,
  addiction,
  neurologicalDisorder,
  pregnancyDetails,
  // setMedicalHistoryData,
  heartProblem.selectedList,
  mentalProblem.selectedList,
  // diseaseNames,===
  heriditary.diseaseNames,
   medicalHistoryData.anaesthesia,
   selectedBloodType,
   medicalHistoryData.bloodPressure,
]);

console.log("medicalHistoryData==============",medicalHistoryData)
  return (
    <ScrollView style={styles.container}>
      <View style={styles.column}>
        {/* Blood Type Selector */}
        <View style={styles.section}>
          <CheckBox
            title="Select Blood Type"
            checked={bloodTypeChecked}
            onPress={() => setBloodTypeChecked(!bloodTypeChecked)}
            containerStyle={styles.checkBoxRow}
          />
          {bloodTypeChecked && (
            <View style={styles.optionsContainer}>
              {responseOptions.bloodTypes.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedBloodType === option && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedBloodType(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {errors.bloodType && (
            <Text style={styles.errorText}>{errors.bloodType}</Text>
          )}
        </View>

        {/* Questions with Yes/No Options */}
        {[
          { question: "Blood pressure?", field: "bloodPressure" },
          { question: "Altered Sensorium?", field: "alteredSensorium" },
          // { question: "Been through Cancer?", field: "cancer" },
          // { question: "Any chest condition?", field: "chestCondition" },
          // { question: "Pregnant/ Been pregnant?", field: "pregnant" },
          { question: "Any known anaesthesia allergy?", field: "anaesthesia" },
          // {
          //   question: "Any lumps found in physical examination*",
          //   field: "lumps",
          // },
          // {
          //   question: "Epilepsy or other Neurological disorder?",
          //   field: "neurological",
          // },
          // {
          //   question:
          //     "Do you have/had infections Hepatitis B, Hepatitis C or HIV?",
          //   field: "infections",
          // },
          // {
          //   question: "Drug, Tobacco or Alcohol addiction?",
          //   field: "addiction",
          // },
          // { question: "Any known disease in Family?", field: "family" },
          // { question: "Any Mental health problems?*", field: "mentalHealth" },
          // {
          //   question: "Taking any prescribed medicines?",
          //   field: "prescribedMedicines",
          // },
          // {
          //   question: "Taking any Self prescribed medicines?",
          //   field: "selfPrescribedMedicines",
          // },
          // { question: "Any Heart problems?", field: "heartProblems" },
          // { question: "Any food allergy?", field: "foodAllergy" },   
          { question: "", field: "" },
        ].map(
          (item, index) =>
            item.question &&
            item.field &&
            renderToggleButton(item.question, item.field)
          
        )}
      </View>
{/* =======================Diseases=================== */}

      <View style={styles.container}>

      <CheckBox
        title="Diabetes"
        checked={disease.includes("diabetes")}
        onPress={() => handleCheckboxChange("diabetes")}
        disabled={formDisabled}
        containerStyle={styles.checkBoxRow}

      />
      
      <CheckBox
        title="Been through any Surgery"
        checked={disease.includes("Been through any Surgery")}
        onPress={() => handleCheckboxChange("Been through any Surgery")}
        disabled={formDisabled}
        containerStyle={styles.checkBoxRow}

      />

      <CheckBox
        title="Hyper Lipidaemia / Dyslipidaemia"
        checked={disease.includes("Hyper Lipidaemia / Dyslipidaemia")}
        onPress={() => handleCheckboxChange("Hyper Lipidaemia / Dyslipidaemia")}
        disabled={formDisabled}
        containerStyle={styles.checkBoxRow}

      />
    </View>


{/* =======================lumps=================== */}
      <View style={styles.subcontainer}>
      <Text style={styles.label}>Any lumps found in physical examination*</Text>
      <View style={styles.chipContainer}>
        <TouchableOpacity
          style={[
            styles.chip,
            lumps.istrue ? styles.selectedChip : styles.defaultChip,
          ]}
          onPress={() => setLumps((prev) => ({ ...prev, istrue: true }))}
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.chip,
            !lumps.istrue ? styles.selectedChip : styles.defaultChip,
          ]}
          onPress={() =>
            setLumps((prev) => ({
              ...prev,
              istrue: false,
              details: { location: "", size: "", consistency: "" },
            }))
          }
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>No</Text>
        </TouchableOpacity>
      </View>
      {lumps.istrue && (
        <View>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={lumps.details.location}
              onValueChange={(itemValue) =>
                setLumps((prev) => ({
                  ...prev,
                  details: { ...prev.details, location: itemValue },
                }))
              }
              enabled={!formDisabled}
            >
                <Picker.Item  label='Location' value='' />

              {locations.map((location) => (
                <Picker.Item key={location} label={location} value={location} />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={lumps.details.size}
              onValueChange={(itemValue) =>
                setLumps((prev) => ({
                  ...prev,
                  details: { ...prev.details, size: itemValue },
                }))
              }
              enabled={!formDisabled}
            >
                <Picker.Item  label='Size' value='' />

              {sizes.map((size) => (
                <Picker.Item key={size} label={size} value={size} />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={lumps.details.consistency}
              onValueChange={(itemValue) =>
                setLumps((prev) => ({
                  ...prev,
                  details: { ...prev.details, consistency: itemValue },
                }))
              }
              enabled={!formDisabled}
            >
                <Picker.Item  label='Consistency' value='' />

              {consistencies.map((consistency) => (
                <Picker.Item key={consistency} label={consistency} value={consistency} />
              ))}
            </Picker>
          </View>
        </View>
      )}

    </View>
      

      {/* ===================foodAllergy=============================== */}
     
    <View style={styles.subcontainer}>
      <Text style={styles.label}>Any food allergy?</Text>
      <View style={styles.chipContainer}>
       <TouchableOpacity
          style={[
            styles.chip,
            foodAlergy.istrue ? styles.selectedChip : styles.defaultChip,
          ]}
          onPress={() => setFoodAlergy((prev) => ({ ...prev, istrue: true }))}
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.chip,
            !foodAlergy.istrue ? styles.selectedChip : styles.defaultChip,
          ]}
           onPress={() =>
            setFoodAlergy((pre) => {
              return { ...pre, istrue: false, selectedList: [] };
            })
          }
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>No</Text>
        </TouchableOpacity>
       
      </View>

      {foodAlergy.istrue && (
        <View>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
            <TextInput
              style={{
                borderColor: "#ccc",
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                flex: 1,
                marginRight: 8,
              }}
              placeholder="Food Name"
              value={foodAlergy.search}
              onChangeText={(text) =>
                setFoodAlergy((prev) => ({
                  ...prev,
                  search: text,
                }))
              }
              editable={!formDisabled}
            />
            <Button
              mode="contained"
              onPress={() => {
                if (
                  foodAlergy.search &&
                  !foodAlergy.selectedList.includes(foodAlergy.search)
                ) {
                  setFoodAlergy((prev) => ({
                    ...prev,
                    selectedList: [...prev.selectedList, foodAlergy.search],
                  }));
                }
                setFoodAlergy((prev) => ({ ...prev, search: "" }));
              }}
              disabled={formDisabled}
              icon={({ size }) => (
                <Icon name="add" size={size} color="#fff" />
              )}
            >
              Add
            </Button>
          </View>

        <FlatList
            data={foodAlergy.selectedList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Chip
                style={{ marginBottom: 8 }}
                onClose={() => removeChip(item)} // Add onClose to remove item
              >
                {item}
              </Chip>
            )}
          />
        </View>
      )}
    </View>

      {/* ===================medicineAllergy=============================== */}

     <View style={styles.subcontainer}>
      <Text style={styles.label}>Any medicine allergy?</Text>
      <View style={styles.chipContainer}>
       <TouchableOpacity
          style={[
            styles.chip,
            medicineAllergy.istrue ? styles.selectedChip : styles.defaultChip,
          ]}
          onPress={() => setMedicineAllergy((prev) => ({ ...prev, istrue: true }))}
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.chip,
            !medicineAllergy.istrue ? styles.selectedChip : styles.defaultChip,
          ]}
          onPress={() =>
            setMedicineAllergy((prev) => ({
              ...prev,
              istrue: false,
              selectedList: [],
            }))
          }
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>No</Text>
        </TouchableOpacity>
       
      </View>
     

      {medicineAllergy.istrue && (
        <View>
          <View style={{ flexDirection: "row", marginBottom: 16 }}>
            <TextInput
              style={{
                borderColor: "#ccc",
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                flex: 1,
                marginRight: 8,
              }}
              placeholder="Enter 3 letters for Search"
              value={medicineAllergy.search}
              onChangeText={(text) => {
                setMedicineAllergy((prev) => ({ ...prev, search: text }));
                fetchMedicineList(text); // Fetch the medicine list based on input
              }}
              editable={!formDisabled}
            />
            <Button
              mode="contained"
              onPress={() => {
                if (
                  medicineAllergy.search &&
                  !medicineAllergy.selectedList.includes(medicineAllergy.search)
                ) {
                  setMedicineAllergy((prev) => ({
                    ...prev,
                    selectedList: [...prev.selectedList, medicineAllergy.search],
                  }));
                }
                setMedicineAllergy((prev) => ({ ...prev, search: "" }));
              }}
              disabled={formDisabled}
              icon={({ size }) => <Icon name="add" size={size} color="#fff" />}
            >
              Add
            </Button>
          </View>

          <FlatList
            data={medicineAllergy.selectedList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Chip
                onClose={() => removeChip(item)} // Enable removing items
                style={{ marginBottom: 8 }}
              >
                {item}
              </Chip>
            )}
            numColumns={2} // Adjust layout for multiple columns
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
        </View>
      )}
    </View>

     {/* =======================heartProblems================= */}
     <View style={styles.subcontainer}>
      <Text style={styles.label}>Any Heart problems?</Text>
      <View style={styles.chipContainer}>
        <TouchableOpacity
          style={[
            styles.chip,
            heartProblem.istrue ? styles.selectedChip : styles.defaultChip,
          ]}
          onPress={() => setHeartProblem((prev) => ({ ...prev, istrue: true }))}
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.chip,
            !heartProblem.istrue ? styles.selectedChip : styles.defaultChip,
          ]}
          onPress={() =>
            setHeartProblem((prev) => ({
              ...prev,
              istrue: false,
              selectedList: [],
            }))
          }
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>No</Text>
        </TouchableOpacity>
      </View>

      {heartProblem.istrue && (
        <>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search for Heart Problem"
              value={heartProblem.search}
              onChangeText={(text) =>
                setHeartProblem((prev) => ({ ...prev, search: text }))
              }
            />
            <TouchableOpacity
    style={styles.addButton}
    onPress={() => {
      if (
        heartProblem.search &&
        !heartProblem.selectedList.includes(heartProblem.search)
      ) {
        setHeartProblem((prev) => ({
          ...prev,
          selectedList: [...prev.selectedList, heartProblem.search],
          search: '', // Clear search after adding
        }));
      }
    }}
    disabled={formDisabled} // Ensure formDisabled is correctly set
  >
    <Text style={styles.addButtonText}>Add</Text>
  </TouchableOpacity>
          </View>

          {/* Display the filtered options below the TextInput */}
          <ScrollView contentContainerStyle={styles.chipContainer}>
            {heartProblem.searchedList.map((el) => (
              <TouchableOpacity
                key={el}
                style={styles.chip}
                onPress={() => {
                  if (!heartProblem.selectedList.includes(el)) {
                    setHeartProblem((prev) => ({
                      ...prev,
                      selectedList: [...prev.selectedList, el],
                      search: '', // Clear search input after selection
                    }));
                  }
                }}
              >
                <Text style={styles.chipText}>{el}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Display the selected heart problems */}
          <ScrollView horizontal contentContainerStyle={styles.chipContainer}>
            {heartProblem.selectedList.map((el) => (
              <Chip
                key={el}
                style={styles.chip}
                onClose={() =>
                  setHeartProblem((curr) => ({
                    ...curr,
                    selectedList: curr.selectedList.filter((val) => val !== el),
                  }))
                }
              >
                {el}
              </Chip>
            ))}
          </ScrollView>
        </>
      )}
    </View>

    {/* =================================mentalHealth============================= */}
    <View style={styles.subcontainer}>
      <Text style={styles.label}>Any Mental health problems?*</Text>

      {/* Yes/No Toggle */}
      <View style={styles.chipContainer}>
        <TouchableOpacity
          style={[
            styles.chip,
            mentalProblem.istrue ? styles.selectedChip : styles.defaultChip,
          ]}
          onPress={() => setMentalProblem((prev) => ({ ...prev, istrue: true }))}
        >
          <Text style={styles.chipText}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.chip,
            !mentalProblem.istrue ? styles.selectedChip : styles.defaultChip,
          ]}
          onPress={() =>
            setMentalProblem((prev) => ({
              ...prev,
              istrue: false,
              selectedList: [],
            }))
          }
        >
          <Text style={styles.chipText}>No</Text>
        </TouchableOpacity>
      </View>

      {mentalProblem.istrue && (
        <>
          {/* Search Input and Add Button */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search for Mental Problem"
              value={mentalProblem.search}
              onFocus={() =>
                setMentalProblem((prev) => ({ ...prev, showDropdown: true }))
              }
              onChangeText={(text) =>
                setMentalProblem((prev) => ({
                  ...prev,
                  search: text,
                  showDropdown: text.length > 0,
                }))
              }
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddProblem}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          {/* Display Suggestions */}
          {mentalProblem.showDropdown && (
            <FlatList
              data={mentalProblemList.filter((item) =>
                item.toLowerCase().includes(mentalProblem.search.toLowerCase())
              )}
              keyExtractor={(item) => item}
              style={styles.dropdown}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => handleSelectOption(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          )}

          {/* Display Selected Items */}
          <FlatList
            horizontal
            contentContainerStyle={styles.selectedContainer}
            data={mentalProblem.selectedList}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View style={styles.selectedItem}>
                <Text>{item}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => {
                    setMentalProblem((prev) => ({
                      ...prev,
                      selectedList: prev.selectedList.filter(
                        (el) => el !== item
                      ),
                    }));
                  }}
                >
                  <Text style={styles.removeButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}
    </View>

    {/* ===================================addiction======================================= */}
    <View style={styles.subcontainer}>
      <Text style={styles.label}>Drug, Tobacco or Alcohol addiction?</Text>

      {/* Yes/No Buttons */}
      <View style={styles.chipContainer}>
        <TouchableOpacity
          style={[
            styles.chip,
            addiction.istrue ? styles.selectedChip : styles.defaultChip,
          ]}
          onPress={() =>
            setAddiction((prev) => ({
              ...prev,
              istrue: true,
            }))
          }
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.chip,
            !addiction.istrue ? styles.selectedChip : styles.defaultChip,
          ]}
          onPress={() =>
            setAddiction((prev) => ({
              ...prev,
              istrue: false,
              selectedList: [], // Clear selected list when "No" is selected
            }))
          }
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>No</Text>
        </TouchableOpacity>
      </View>

      {/* List of Addictions */}
      {addiction.istrue && (
        <View>
          {addiction.searchedList?.map((element) => (
            <View key={element} style={styles.subcheckBoxRow}>
              <CheckBox
                title={element}
                checked={addiction.selectedList.includes(element)}
                onPress={() => handleAddictionChange(element)}
                containerStyle={styles.checkBoxContainer}
              />
            </View>
          ))}
        </View>
      )}
    </View>

    {/* ===============================infection=============================== */}
    <View style={styles.subcontainer}>
      <Text style={styles.label}>Do you have/had infections Hepatitis B, Hepatitis C or HIV?</Text>

      {/* Yes/No Buttons */}
      <View style={styles.chipContainer}>
        <TouchableOpacity
          style={[
            styles.chip,
            infection.istrue ? styles.selectedChip : styles.defaultChip,
          ]}
          onPress={() =>
            setInfection((prev) => ({
              ...prev,
              istrue: true,
            }))
          }
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.chip,
            !infection.istrue ? styles.selectedChip : styles.defaultChip,
          ]}
          onPress={() =>
            setInfection((prev) => ({
              ...prev,
              istrue: false,
              selectedList: [], // Clear selected list when "No" is selected
            }))
          }
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>No</Text>
        </TouchableOpacity>
      </View>

      {/* List of Infections */}
      {infection.istrue && (
        <View style={styles.checkboxContainer}>
          {infection.searchedList?.map((element) => (
            <View key={element} style={styles.checkboxRow}>
              <CheckBox
                title={element}
                checked={infection.selectedList.includes(element)}
                onPress={() => handleInfectionChange(element)}
                containerStyle={styles.checkBoxContainer}
              />
            </View>
          ))}
        </View>
      )}
    </View>

{/* ===============================heriditary========================================= */}
<View style={styles.subcontainer}>
      <Text style={styles.label}>Any known disease in  family?</Text>

      {/* Yes/No Buttons */}
      <View style={styles.chipContainer}>
        <TouchableOpacity
          style={[
            styles.chip,
            heriditary.istrue ? styles.selectedChip : styles.defaultChip,
          ]}
          onPress={() =>
            setHeriditary((prev) => ({
              ...prev,
              istrue: true,
            }))
          }
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.chip,
            !heriditary.istrue ? styles.selectedChip : styles.defaultChip,
          ]}
          onPress={() =>
            setHeriditary((prev) => ({
              ...prev,
              istrue: false,
              selectedList: [], // Clear selected list when "No" is selected
              diseaseNames: {}, // Clear disease names when "No" is selected
            }))
          }
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>No</Text>
        </TouchableOpacity>
      </View>

      {/* List of Heriditary Diseases */}
      {heriditary.istrue && (
        <View style={styles.checkboxContainer}>
          {heriditary.searchedList?.map((element) => (
            <View key={element} style={styles.checkboxRow}>
              <CheckBox
                title={element}
                checked={heriditary.selectedList.includes(element)}
                onPress={() => handleHeriditaryChange(element)}
                containerStyle={styles.checkBoxContainer}
              />
              <View style={styles.textInputContainer}>
                {heriditary.selectedList.includes(element) && (
                  <TextInput
                    value={heriditary.diseaseNames[element] || ""}
                    onChangeText={(text) => handleDiseaseNameChange(element, text)}
                    placeholder="Disease Name"
                    style={styles.textInput}
                  />
                )}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>

{/* ===============================pregnent========================================= */}
<View style={styles.subcontainer}>
      <Text style={styles.label}>Pregnant/ Been pregnant?</Text>
      <View style={styles.chipContainer}>
        <TouchableOpacity
          style={[
            styles.chip,
            isPregnant ? styles.selectedChip : styles.defaultChip,
          ]}
          onPress={() => setIsPregnant(true)}
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.chip,
            !isPregnant ? styles.selectedChip : styles.defaultChip,
          ]}
          onPress={() => setIsPregnant(false)}
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>No</Text>
        </TouchableOpacity>
      </View>

      {isPregnant && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputPregnent}
            keyboardType="numeric"
            placeholder="Number of Pregnancies"
            value={pregnancyDetails.numberOfPregnancies}
            onChangeText={handleNumberOfPregnanciesChange}
          />
          <TextInput
            style={styles.inputPregnent}
            keyboardType="numeric"
            placeholder="Live Births"
            value={pregnancyDetails.liveBirths}
            onChangeText={handleLiveBirthsChange}
          />
        </View>
      )}
    </View>

{/* ===============================cancer========================================= */}
<View contentContainerStyle={styles.subcontainer}>
      <Text style={styles.label}>Been through Cancer?*</Text>
      <View style={styles.chipContainer}>
        <TouchableOpacity
          style={[
            styles.chip,
            isCancer ? styles.selectedChip : styles.defaultChip,
          ]}
          onPress={() => setIsCancer(true)}
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.chip,
            !isCancer ? styles.selectedChip : styles.defaultChip,
          ]}
          onPress={() => setIsCancer(false)}
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>No</Text>
        </TouchableOpacity>
      </View>

      {isCancer && (
        <View style={styles.detailsContainer}>
          <View style={styles.pickerContainer}>
            {/* <Text style={styles.label}>Type of Cancer</Text> */}
            <Picker
              selectedValue={cancerDetails.type}
              onValueChange={handleTypeChange}
              enabled={!formDisabled}
              style={styles.picker}
            >
                <Picker.Item  label='Type of Cancer' value='' />

              {cancerTypes.map((type) => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
            </Picker>
          </View>
          <View style={styles.inputContainer}>
            {/* <Text style={styles.label}>Stage of Cancer</Text> */}
            <TextInput
              style={styles.input}
              placeholder="Stage of Cancer"
              value={cancerDetails.stage}
              onChangeText={handleStageChange}
              editable={!formDisabled}
            />
          </View>
        </View>
      )}
    </View>
  
{/* ===============================Self Prescribed Medicine========================================= */}
<View contentContainerStyle={styles.subcontainer}>
      <Text style={styles.label}>Taking any Self prescribed medicines?</Text>
      <View style={styles.chipContainer}>
        <TouchableOpacity
          style={[styles.chip, selfPrescribed.istrue ? styles.selectedChip : styles.defaultChip]}
          onPress={() => setSelfPrescribed((pre) => ({ ...pre, istrue: true }))}
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.chip, !selfPrescribed.istrue ? styles.selectedChip : styles.defaultChip]}
          onPress={() => setSelfPrescribed((pre) => ({ ...pre, istrue: false, selectedList: [] }))}
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>No</Text>
        </TouchableOpacity>
      </View>

      {selfPrescribed.istrue && (
        <View style={styles.detailsContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type medicine name"
              value={selfPrescribed.search}
              onChangeText={(text) => setSelfPrescribed((prev) => ({ ...prev, search: text }))}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Dosage"
              keyboardType="numeric"
              value={selfPrescribed.dosage}
              onChangeText={(text) => setSelfPrescribed((prev) => ({ ...prev, dosage: text }))}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Frequency"
              keyboardType="numeric"
              value={selfPrescribed.frequency}
              onChangeText={(text) => setSelfPrescribed((prev) => ({ ...prev, frequency: text }))}
            />
          </View>
          <View style={styles.durationContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Duration"
                keyboardType="numeric"
                value={selfPrescribed.duration.number}
                onChangeText={(text) => setSelfPrescribed((prev) => ({
                  ...prev,
                  duration: { ...prev.duration, number: text },
                }))}
              />
            </View>
            <View style={styles.pickerContainer}>

            <Picker
              selectedValue={selfPrescribed.duration.unit}
              style={styles.picker}
              onValueChange={handleTypeSelfPrescribedChange}
            >
              <Picker.Item label="Month" value="month" />
              <Picker.Item label="Year" value="year" />
            </Picker>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={handleAddMedicine}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      )}

      {selfPrescribed.istrue && (
        <View style={styles.selectedListContainer}>
          <FlatList
            data={selfPrescribed.selectedList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Chip
                key={index}
                mode="outlined"
                onClose={() => {
                  setSelfPrescribed((curr) => ({
                    ...curr,
                    selectedList: curr.selectedList.filter((_, idx) => idx !== index),
                  }));
                }}
                disabled={formDisabled}
              >
                {item.name}
              </Chip>
            )}
          />
        </View>
      )}
    </View>
 
{/* =============================== Prescribed Medicine========================================= */}
<View contentContainerStyle={styles.subcontainer}>
        <Text style={styles.label}>Taking any prescribed medicines?</Text>
        <View style={styles.chipContainer}>
        <TouchableOpacity
          style={[styles.chip, prescribedMedicine.istrue ? styles.selectedChip : styles.defaultChip]}
          onPress={() => setPrescribedMedicine((pre) => ({ ...pre, istrue: true }))}
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.chip, !prescribedMedicine.istrue ? styles.selectedChip : styles.defaultChip]}
          onPress={() => setPrescribedMedicine((pre) => ({ ...pre, istrue: false, selectedList: [] }))}
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>No</Text>
        </TouchableOpacity>
         
          
        </View>
        {prescribedMedicine.istrue && (
          <View style={styles.detailsContainer}>
            <TextInput
              style={styles.input}
              placeholder="Medicine Name"
              value={prescribedMedicine.search}
              onChangeText={(text) => setPrescribedMedicine((prev) => ({ ...prev, search: text }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Dosage"
              keyboardType="numeric"
              value={prescribedMedicine.dosage}
              onChangeText={(text) => setPrescribedMedicine((prev) => ({ ...prev, dosage: text }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Frequency"
              keyboardType="numeric"
              value={prescribedMedicine.frequency}
              onChangeText={(text) => setPrescribedMedicine((prev) => ({ ...prev, frequency: text }))}
            />
            <View style={styles.durationContainer}>
              <TextInput
                style={styles.input}
                placeholder="Duration (Number)"
                keyboardType="numeric"
                value={prescribedMedicine.duration.number}
                onChangeText={(text) => setPrescribedMedicine((prev) => ({
                  ...prev,
                  duration: { ...prev.duration, number: text },
                }))}
              />
              <View style={styles.pickerContainer}>
              <Picker
                selectedValue={prescribedMedicine.duration.unit}
                style={styles.picker}
                onValueChange={handleTypePrescribedMedicineChange}
              >
                <Picker.Item label="Month" value="month" />
                <Picker.Item label="Year" value="year" />
              </Picker>
                </View>
             
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={handlePrescribedMedicineAddMedicine}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          </View>
        )}
        {prescribedMedicine.istrue && (
          <View style={styles.selectedListContainer}>
            {prescribedMedicine.selectedList.length > 0 && (
              <FlatList
                data={prescribedMedicine.selectedList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <Chip
                    key={index}
                    mode="outlined"
                    onClose={() => {
                      setPrescribedMedicine((curr) => ({
                        ...curr,
                        selectedList: curr.selectedList.filter((_, idx) => idx !== index),
                      }));
                    }}
                    // style={styles.selectedChip}
                    disabled={formDisabled}
                  >
                    {item.name}
                  </Chip>
                )}
              />
            )}
          </View>
        )}
      </View>

{/* ====================================neurologicalDisorder============================ */}
<View style={styles.subcontainer}>
      <Text  style={styles.label}>Epilepsy or other Neurological disorder?</Text>
      <View style={styles.chipContainer}>
        <TouchableOpacity
          style={[styles.chip, neurologicalDisorder.istrue ? styles.selectedChip : styles.defaultChip]}
          onPress={() => setNeurologicalDisorder((pre) => ({ ...pre, istrue: true }))}
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.chip, !neurologicalDisorder.istrue ? styles.selectedChip : styles.defaultChip]}
          onPress={() => setNeurologicalDisorder((pre) => ({ ...pre, istrue: false, selectedList: [] }))}
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>No</Text>
        </TouchableOpacity>
      </View>

      {neurologicalDisorder.istrue && (
        <>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search Neurological Disorder"
              value={neurologicalDisorder.search}
              onChangeText={handleSearchChange}
              onFocus={() => setShowDropdown(true)}
            />
             <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={handleAddDisorder}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          
          </View>

          {showDropdown && neurologicalDisorder.search && (
            <FlatList
              data={neurologicalDisorder.searchedList}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setNeurologicalDisorder((prev) => ({
                      ...prev,
                      search: item,
                    }));
                    setShowDropdown(false);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          )}

          <FlatList
            data={neurologicalDisorder.selectedList}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View style={styles.selectedItems}>
  <Text style={styles.selectedItemText}>{item}</Text>
  <TouchableOpacity
    onPress={() => setNeurologicalDisorder((curr) => ({
      ...curr,
      selectedList: curr.selectedList.filter((val) => val !== item),
    }))}
    style={styles.removeButton}
    disabled={formDisabled}
  >
    <Text style={styles.removeButtonText}>X</Text>
  </TouchableOpacity>
</View>

            )}
          />
        </>
      )}
    </View>


{/* ====================================chestCondition============================ */}

<View style={styles.subcontainer}>
      <Text style={styles.label}>Any chest condition?</Text>
      <View style={styles.chipContainer}>
        <TouchableOpacity
          style={[styles.chip, chestCondition.istrue ? styles.selectedChip : styles.defaultChip]}
          onPress={() => setChestCondition((pre) => ({ ...pre, istrue: true }))}
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.chip, !chestCondition.istrue ? styles.selectedChip : styles.defaultChip]}
          onPress={() => setChestCondition((pre) => ({ ...pre, istrue: false, selectedList: [] }))}
          disabled={formDisabled}
        >
          <Text style={styles.chipText}>No</Text>
        </TouchableOpacity>
      </View>
      {chestCondition.istrue && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={chestCondition.search}
            onChangeText={handlechestConditionSearchChange}
            placeholder="Enter chest condition"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddCondition}
            disabled={formDisabled}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      )}
      {chestCondition.istrue && filteredList.length > 0 && (
        <FlatList
          data={filteredList}
          renderItem={renderOption}
          keyExtractor={(item) => item}
          style={styles.optionList}
        />
      )}
      <FlatList
        data={chestCondition.selectedList}
        renderItem={renderSelectedItem}
        keyExtractor={(item) => item}
        style={styles.selectedList}
      />
    </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
  selectedChip: {
    backgroundColor: "#007AFF", // Adjust color if needed
  },
  chipContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    marginBottom:50,
  },
  column: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  checkBoxRow: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  optionButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    width: "48%",
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#007AFF",
  },
  optionText: {
    color: "#000",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  toggleContainer: {
    marginBottom: 20,
  },
  toggleLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  toggleButtons: {
    flexDirection: "row",
    width: "50%",
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleButtonSelected: {
    backgroundColor: "#007AFF", // Selected button background (blue)
    borderRadius: 24,
  },
  toggleButtonUnselected: {
    backgroundColor: "#e8f1fe", // Unselected button background
    borderRadius: 24,
  },
  toggleButtonText: {
    fontSize: 16,
    color: "#000",
  },
  toggleButtonTextSelected: {
    color: "#fff", // Text color for selected button
  },
  subcontainer: {
    padding: 20,
    paddingBottom:10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  chipContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
  },
  selectedChip: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  defaultChip: {
    backgroundColor: "#E0E0E0",
    borderColor: "#E0E0E0",
  },
  chipText: {
    color: "#fff",
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    width:'80%',
  },
  pickerContainer: {
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width:"80%"
  },
  inputContainer: {
    flexDirection: 'row',  // Aligns the input and button in a row
    justifyContent: 'space-between', // Space between the input and button
    alignItems: 'center', // Vertically center the input and button
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems:"center",
    justifyContent: 'center',
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    maxHeight: 150,
    marginTop: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  selectedItems: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginBottom: 8, // Add spacing between items if needed
  },
  selectedItemText: {
    flex: 1, // Allow text to take up available space
    flexShrink: 1, // Allow text to shrink if needed
    marginRight: 10,
  },
  removeButton: {
    marginLeft: 10,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 10,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  checkBoxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  subcheckBoxRow: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
  },
  textInputContainer: {
    flex: 1,
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 250,
  },
  inputPregnent: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginRight:10,
    fontSize: 16,
    width:'50%',
  },
  optionList: {
    maxHeight: 150,
  },
  optionItem: {
    padding: 5,
  },
  selectedList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default MedicalHistoryScreen;
