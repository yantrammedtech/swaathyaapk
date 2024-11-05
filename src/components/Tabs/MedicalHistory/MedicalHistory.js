import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { Chip, Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { authFetch } from "../../../axios/authFetch";
import { useSelector } from "react-redux";
import { authPost } from "../../../axios/authPost";

const MedicalHistoryScreen = ({medicalHistoryData, setMedicalHistory}) => {
  const user = useSelector((state) => state.currentUserData);
  const currentPatient = useSelector((state) => state.currentPatientData);
  const patientTimeLineID = currentPatient?.patientTimeLineID;

  const [medicineList, setMedicineList] = React.useState([]);


  const [giveBy, setGiveBy] = React.useState(medicalHistoryData?.givenName);
  const [phoneNumber, setPhoneNumber] = React.useState(
    medicalHistoryData?.givenPhone ? Number(medicalHistoryData.givenPhone) : null
  );
  

  React.useEffect(() => {
    if (giveBy && phoneNumber && relation) {
      setFormDisabled(false);
    } else {
      setFormDisabled(true);
    }
  }, [giveBy, phoneNumber, relation]);

const [selectedBloodType, setSelectedBloodType] = useState(medicalHistoryData?.bloodGroup || "");
  const [errors, setErrors] = useState({});

  const [bloodTypeChecked, setBloodTypeChecked] = useState(!!medicalHistoryData?.bloodGroup);
  const [bloodGrp, setBloodGrp] = useState(medicalHistoryData?.bloodGroup || "");

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
              medicalHistoryData[field] === "Yes" &&
                styles.toggleButtonTextSelected,
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
              medicalHistoryData[field] === "No" &&
                styles.toggleButtonTextSelected,
            ]}
          >
            No
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  
  useEffect(() => {
    if (
      medicalHistoryData.pregnant != "" &&
      medicalHistoryData?.pregnant !== "No"
    ) {
      // Extract number of pregnancies and live births from the data
      const pregnancyInfo = medicalHistoryData.pregnant.split(", ");
      const numberOfPregnancies = pregnancyInfo[0].split(": ")[1];
      const liveBirths = pregnancyInfo[1].split(": ")[1];

      // Update the state
      setPregnancyDetails({
        numberOfPregnancies,
        liveBirths,
      });
    }

    if (
      medicalHistoryData &&
      medicalHistoryData?.lumps != "" &&
      medicalHistoryData?.lumps !== "No"
    ) {
      // Extract lump details from the data
      const lumpsInfo = medicalHistoryData?.lumps.split(", ");
      const location = lumpsInfo[0].split(": ")[1].replace(/'/g, "");
      const size = lumpsInfo[1].split(": ")[1].replace(/'/g, "");
      const consistency = lumpsInfo[2].split(": ")[1].replace(/'/g, "");

      // Update the state
      setLumps({
        istrue: true,
        details: {
          location,
          size,
          consistency,
        },
      });
    } else {
      // Handle case where there are no lumps
      setLumps({
        istrue: false,
        details: {
          location: "",
          size: "",
          consistency: "",
        },
      });
    }
    if (
      medicalHistoryData?.cancer != "" &&
      medicalHistoryData?.cancer != "No"
    ) {
      // Extract cancer type and stage from the data
      const cancerInfo = medicalHistoryData?.cancer.split(", ");
      const type = cancerInfo[0].split(": ")[1];
      const stage = cancerInfo[1].split(": ")[1];

      // Update the state
      setCancerDetails({
        type,
        stage,
      });
    } else {
      // If no cancer information, ensure state reflects this
      setCancerDetails({
        type: "",
        stage: "",
      });
    }
    if (medicalHistoryData && medicalHistoryData?.familyDisease) {
      // Extract the family disease data
      const diseaseEntries = medicalHistoryData.familyDisease.split(", ").map((entry) => {
        const [key, value] = entry.split(": ");
        return { key, value };
      });
  
      // Create a new diseaseNames object
      const diseaseNames = diseaseEntries.reduce((acc, { key, value }) => {
        acc[key] = value;
        return acc;
      }, {});
  
      // Update heriditary state with diseaseNames
      setHeriditary((prev) => ({
        ...prev,
        diseaseNames,
        selectedList: Object.keys(diseaseNames), // Populate selectedList based on family members
        istrue: true, // Set istrue to true as there's family disease info
      }))}else {
      // Handle case where there is no disease information
      setHeriditary((prev) => ({
        ...prev,
        diseaseNames: {},
        selectedList: [],
        istrue: false,
      }));
    }
  }, []);

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

  

  //=======================heartProblem ======================

  const [heartProblem, setHeartProblem] = useState({
    searchedList: [],
    selectedList: medicalHistoryData?.heartProblems
      ? medicalHistoryData.heartProblems.split(",")
      : [],
    search: "",
    istrue: medicalHistoryData?.heartProblems ? true : false,
  });

  const [heartProblemList, setHeartProblemList] = React.useState([]);
  const [heartDropdownVisible, setHeartDropdownVisible] = useState(false);

  const getHeartList = async (text) => {
    const heartResponse = await authFetch(`data/heartProblems`, user.token);
    if (heartResponse.message == "success") {
      // Remove duplicates using Set and convert back to array
      const uniqueList = [...new Set(heartResponse.boneProblems)];
      const filteredList = uniqueList.filter(
        (each) =>
          typeof each === "string" &&
          each.toLowerCase().startsWith(text.toLowerCase())
      );

      setHeartProblemList(filteredList);
    }
  };

  React.useEffect(() => {
    if (!heartProblem.search) {
      setHeartProblem((prevvalue) => {
        return { ...prevvalue, searchedList: [...heartProblemList] };
      });
    } else {
      setHeartProblem((prevValue) => {
        return {
          ...prevValue,
          searchedList: [
            ...heartProblemList.filter((el) =>
              el.toLowerCase().includes(heartProblem.search.toLowerCase())
            ),
          ],
        };
      });
    }
  }, [heartProblem.search, heartProblemList]);

  const selectHeart = (med) => {
    setHeartProblem((prev) => ({
      ...prev,
      search: med || "",
    }));
    setHeartDropdownVisible(false); // Hide dropdown after selection
  };

  //=======================mental health======================
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

  const [mentalProblem, setMentalProblem] = React.useState({
    searchedList: [],
    selectedList: medicalHistoryData?.mentalHealth
      ? medicalHistoryData?.mentalHealth.split(",")
      : [],
    search: "",
    istrue: medicalHistoryData?.mentalHealth ? true : false,
  });

  const [mentalProblemDropdownVisible, setMentalProblemDropdownVisible] =
    useState(false);

  const selectMentalPrblm = (med) => {
    setMentalProblem((prev) => ({
      ...prev,
      search: med || "",
    }));
    setMentalProblemDropdownVisible(false); // Hide dropdown after selection
  };
  React.useEffect(() => {
    if (!mentalProblem.search) {
      setMentalProblem((prevvalue) => {
        return { ...prevvalue, searchedList: [...mentalProblemList] };
      });
    } else {
      setMentalProblem((prevValue) => {
        return {
          ...prevValue,
          searchedList: [
            ...mentalProblemList.filter((el) =>
              el.toLowerCase().includes(mentalProblem.search.toLowerCase())
            ),
          ],
        };
      });
    }
  }, [mentalProblem.search]);

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
  });

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
  };

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
  const [pregnancyDetailsErrors, setPregnancyDetailsErrors] = useState({
    numberOfPregnancies: "",
    liveBirths: "",
  });

  const validateField = (field) => {
    let error = "";
    if (field === "numberOfPregnancies" && isPregnant) {
      if (!pregnancyDetails.numberOfPregnancies) {
        error = "Number of pregnancies is required.";
      }
    } else if (field === "liveBirths" && isPregnant) {
      if (!pregnancyDetails.liveBirths) {
        error = "Live births is required.";
      }
    }

    setPregnancyDetailsErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));
  };

  const validatePregnancyDetails = () => {
    let valid = true;
    let errors = {};

    if (isPregnant) {
      if (!pregnancyDetails.numberOfPregnancies) {
        errors.numberOfPregnancies = "Number of pregnancies is required.";
        valid = false;
      }
      if (!pregnancyDetails.liveBirths) {
        errors.liveBirths = "Live births is required.";
        valid = false;
      }
    }

    setPregnancyDetailsErrors(errors);
    return valid;
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
  

  const [selfPrescribed, setSelfPrescribed] = useState({
    searchedList: [],
    selectedList: medicalHistoryData?.selfMeds
      ? medicalHistoryData.selfMeds.split(",").map((med) => ({ name: med }))
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

  const [selfPrescribedDropdownVisible, setSelfPrescribedDropdownVisible] =
    useState(false);

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
    if (
      selfPrescribed.search &&
      !selfPrescribed.selectedList.some(
        (med) => med.name === selfPrescribed.search
      )
    ) {
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

  React.useEffect(() => {
    const filteredList = selfPrescribed.search
      ? medicineList.filter((el) =>
          el.toLowerCase().startsWith(selfPrescribed.search.toLowerCase())
        )
      : [...medicineList];

    setSelfPrescribed((prevValue) => ({
      ...prevValue,
      searchedList: filteredList,
    }));
  }, [selfPrescribed.search, medicineList]);

  const selectSelfMedicine = (med) => {
    setSelfPrescribed((prev) => ({
      ...prev,
      search: med || "",
    }));
    setSelfPrescribedDropdownVisible(false); // Hide dropdown after selection
  };

  //=========================== Prescribed Medicine===========================

  const [prescribedMedicine, setPrescribedMedicine] = useState({
    searchedList: [],
    selectedList: medicalHistoryData?.meds
      ? medicalHistoryData.meds.split(",").map((med) => ({ name: med }))
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
  const [prescribedDropdownVisible, setPrescribedDropdownVisible] =
    useState(false);

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
    if (
      prescribedMedicine.search &&
      !prescribedMedicine.selectedList.some(
        (med) => med.name === prescribedMedicine.search
      )
    ) {
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
  React.useEffect(() => {
    const filteredList = prescribedMedicine.search
      ? medicineList.filter((el) =>
          el.toLowerCase().startsWith(prescribedMedicine.search.toLowerCase())
        )
      : [...medicineList];

    setPrescribedMedicine((prevValue) => ({
      ...prevValue,
      searchedList: filteredList,
    }));
  }, [prescribedMedicine.search, medicineList]);
  const selectPresMedicine = (med) => {
    setPrescribedMedicine((prev) => ({
      ...prev,
      search: med || "",
    }));
    setPrescribedDropdownVisible(false); // Hide dropdown after selection
  };
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
  const [neuroDropdownVisible, setNeuroDropdownVisible] = useState(false);
  const [neuroList, setNeuroList] = useState([]);

  const getNeuro = (text) => {
    const filteredList = neurologicalDisordersList.filter((each) =>
      each.toLowerCase().startsWith(text.toLowerCase())
    );
    setNeuroList(filteredList);
  };

  React.useEffect(() => {
    if (!neurologicalDisorder.search) {
      setNeurologicalDisorder((prevValue) => ({
        ...prevValue,
        searchedList: [...neuroList],
      }));
    } else {
      setNeurologicalDisorder((prevValue) => ({
        ...prevValue,
        searchedList: neuroList.filter((el) =>
          el.toLowerCase().includes(neurologicalDisorder.search.toLowerCase())
        ),
      }));
    }
  }, [neurologicalDisorder.search, neuroList]);

  const selectNeuro = (med) => {
    setNeurologicalDisorder((prev) => ({
      ...prev,
      search: med || "",
    }));
    setNeuroDropdownVisible(false); // Hide dropdown after selection
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

  const [chestDropdownVisible, setChestDropdownVisible] = useState(false);
  const [chestList, setChestList] = useState([]);

  const handleRemoveCondition = (item) => {
    setChestCondition((prev) => ({
      ...prev,
      selectedList: prev.selectedList.filter((val) => val !== item),
    }));
  };

 
  

  const selectChest = (med) => {
    setChestCondition((prev) => ({
      ...prev,
      search: med || "",
    }));
    setChestDropdownVisible(false); // Hide dropdown after selection
  };

  const getChest = (text) => {
    const filteredList = chestConditionsList.filter((each) =>
      each.toLowerCase().startsWith(text.toLowerCase())
    );
    setChestList(filteredList);
  };

  React.useEffect(() => {
    if (!chestCondition.search) {
      setChestCondition((prevValue) => ({
        ...prevValue,
        searchedList: [...chestList],
      }));
    } else {
      setChestCondition((prevValue) => ({
        ...prevValue,
        searchedList: chestList.filter((el) =>
          el.toLowerCase().includes(chestCondition.search.toLowerCase())
        ),
      }));
    }
  }, [chestCondition.search, chestList]);

  //=======================disease==========================
  const [disease, setDisease] = React.useState(
    medicalHistoryData?.disease ? medicalHistoryData?.disease.split(",") : []
  );

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
  const [foodAlergyList, setFoodAlergyList] = React.useState([]);
  const [foodDropdownVisible, setFoodDropdownVisible] = useState(false);

  const removeChip = (item) => {
    setFoodAlergy((prev) => ({
      ...prev,
      selectedList: prev.selectedList.filter((chip) => chip !== item),
    }));
  };

  const handleFoodSearchChange = (text) => {
    setFoodAlergy((prev) => ({
      ...prev,
      search: text,
    }));

    if (text.length === 0) {
      setFoodDropdownVisible(false);
      setFoodAlergyList([]); // Clear food allergy list when input is empty
      return;
    }

    fetchFoodList(text);
    setFoodDropdownVisible(true); // Show dropdown if text is not empty
  };

  const fetchFoodList = async (text) => {
    if (text.length >= 1) {
      const foodAllergyResponse = await authFetch(
        "data/foodAllergies",
        user.token
      );
      if (foodAllergyResponse.message === "success") {
        const filteredFoodList = foodAllergyResponse.foodAllergies.filter(
          (each) => each.toLowerCase().startsWith(text.toLowerCase())
        );
        setFoodAlergyList(filteredFoodList); // Update the food allergy list
      }
    }
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

  const [medicineAllergyDropdownVisible, setMedicineAllergyDropdownVisible] =
    useState(false);

  const selectMedicine = (med) => {
    setMedicineAllergy((prev) => ({
      ...prev,
      search: med || "",
    }));
    setMedicineAllergyDropdownVisible(false); // Hide dropdown after selection
  };

  React.useEffect(() => {
    const filteredList = medicineAllergy.search
      ? medicineList.filter((el) =>
          el.toLowerCase().startsWith(medicineAllergy.search.toLowerCase())
        )
      : [...medicineList];

    setMedicineAllergy((prevValue) => ({
      ...prevValue,
      searchedList: filteredList,
    }));
  }, [medicineAllergy.search, medicineList]);
  // const [medicineList, setMedicineList] = React.useState([]);

  const removeMedChip = (item) => {
    setMedicineAllergy((prev) => ({
      ...prev,
      selectedList: prev.selectedList.filter((chip) => chip !== item),
    }));
  };

  async function fetchMedicinesList(text) {
    if (text?.length >= 1) {
      try {
        const response = await authPost("data/medicines", { text }, user.token);
        if (response.message === "success") {
          const medList = response.medicines?.map(
            (medicine) => medicine.Medicine_Name
          );
          const uniqueMedList = Array.from(new Set(medList));
          const filteredList = uniqueMedList.filter((each) =>
            each.toLowerCase().startsWith(text.toLowerCase())
          );
          setMedicineList(filteredList || []);
        }
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    }
  }

  //===============================relationList=====================

  const [relationList, setRelationList] = React.useState([]);
  const [relation, setRelation] = React.useState(
    medicalHistoryData?.givenRelation
  );

  const getAllRelationList = React.useCallback(async () => {
    const relationResponse = await authFetch("data/relations", user.token);
    if (relationResponse.message == "success") {
      setRelationList(relationResponse.relations);
    }
  }, [user.token]);

  React.useEffect(() => {
    if (user.token) {
      getAllRelationList();
    }
  }, [user]);

  const handleChange = (text) => {
    const regex = /^[a-zA-Z][a-zA-Z\s]*$/;
    if (regex.test(text) || text === "") {
      // setGiveBy(text);
      setMedicalHistory((prevState) => ({
        ...prevState,
        givenName: text,
      }));
    }
  };

  const handlePhoneNumberChange = (text) => {
    // Remove non-digit characters
    const cleanedInput = text.replace(/\D/g, "");
    // Ensure the cleaned input does not exceed 10 digits
    if (cleanedInput.length <= 10) {
      setPhoneNumber(cleanedInput || null);
    }
  };


  const handleBloodGrp = (value) => {
    console.log("object=========================================================",value)
    setBloodGrp(value);
  };

  React.useEffect(() => {
    setMedicalHistory((prevState) => ({
      ...prevState,
      patientID: 0,
      userID: user.id,
      givenName: giveBy,
      givenPhone: String(phoneNumber),
      givenRelation: relation,
      // bloodGroup: bloodTypeChecked ? selectedBloodType : "",
      bloodGroup:bloodGrp,
      bloodPressure: medicalHistoryData.bloodPressure ? "Yes" : "No",
      disease: disease.join(","),
      foodAllergy: foodAlergy.selectedList.join(","),
      medicineAllergy: medicineAllergy?.selectedList.join(","),
      // anaesthesia: isAnethesia ? "Yes" : "No",
      anaesthesia: medicalHistoryData.anaesthesia,
      meds: prescribedMedicine.selectedList.map((med) => med.name).join(", "),
      selfMeds: selfPrescribed.selectedList.map((med) => med.name).join(", "),

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
    }));
  }, [
    user,
    giveBy,
    phoneNumber,
    relation,
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
    // setMedicalHistory,
    heartProblem.selectedList,
    mentalProblem.selectedList,
    // diseaseNames,===
    heriditary.diseaseNames,
    medicalHistoryData.anaesthesia,
    selectedBloodType,
    bloodGrp,
    medicalHistoryData.bloodPressure,
  ]);

  console.log("blood",bloodGrp,formDisabled)
  return (
    <ScrollView style={styles.container}>
      <View style={styles.column}>
      

        {/* ======================History  given by==================== */}

        <View style={styles.subcontainer}>
          <Text style={styles.label}>History given by</Text>
          <TextInput
            value={medicalHistoryData.givenName}
            onChangeText={handleChange}
            style={styles.cancerinput}
            name="givenName"
            maxLength={50}
            placeholder="Enter name"
          />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.cancerinput}
            placeholder="Mobile Number"
            keyboardType="numeric"
            maxLength={10}
            // value={phoneNumber !== null ? phoneNumber : 0}
            value={phoneNumber ? phoneNumber.toString() : ""}
            onChangeText={handlePhoneNumberChange}
          />
        </View>

        {/* ======================Relationship  with patients==================== */}

        <View style={styles.subcontainer}>
          <Text style={styles.label}>Relationship with patients</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={relation}
              onValueChange={(itemValue) => setRelation(itemValue)}
              style={styles.picker}
            >
              {relationList.map((el, index) => (
                <Picker.Item key={index} label={el} value={el} />
              ))}
            </Picker>
          </View>
        </View>

        {/* =======================================Blood Type Selector========================== */}
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
                    bloodGrp  === option && styles.selectedOption,
                    formDisabled && styles.disabled,
                  ]}
                  onPress={() =>  handleBloodGrp(option)}
                  // disabled={formDisabled}
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
          { question: "Any known anaesthesia allergy?", field: "anaesthesia" },
        ].map(
          (item, index) =>
            item.question &&
            item.field &&
            renderToggleButton(item.question, item.field)
        )}
      </View>
      {/* =======================Diseases=================== */}

      <View style={styles.subcontainer}>
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
          onPress={() =>
            handleCheckboxChange("Hyper Lipidaemia / Dyslipidaemia")
          }
          disabled={formDisabled}
          containerStyle={styles.checkBoxRow}
        />
      </View>

      {/* =======================lumps=================== */}
      <View style={styles.subcontainer}>
        <Text style={styles.label}>
          Any lumps found in physical examination*
        </Text>
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
                <Picker.Item label="Location" value="" />

                {locations.map((location) => (
                  <Picker.Item
                    key={location}
                    label={location}
                    value={location}
                  />
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
                <Picker.Item label="Size" value="" />

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
                <Picker.Item label="Consistency" value="" />

                {consistencies.map((consistency) => (
                  <Picker.Item
                    key={consistency}
                    label={consistency}
                    value={consistency}
                  />
                ))}
              </Picker>
            </View>
          </View>
        )}
      </View>

      {/* ===================foodAllergy=============done================== */}

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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
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
                onChangeText={handleFoodSearchChange}
                editable={!formDisabled}
              />
              <Button
                mode="contained"
                buttonColor="#007BFF"
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
            {foodDropdownVisible && (
              <View style={styles.dropdown}>
                <FlatList
                  data={foodAlergyList} // This should be the list of allergies from the API
                  keyExtractor={(item, index) => index.toString()} // Use index if there's no unique ID
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => {
                        setFoodAlergy((prev) => ({
                          ...prev,
                          search: item, // When clicked, set the selected item in the input field
                        }));
                        setFoodDropdownVisible(false); // Hide dropdown when item is selected
                      }}
                    >
                      <Text style={styles.dropdownText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}

            <FlatList
              data={foodAlergy.selectedList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Chip
                  style={{
                    marginBottom: 8,
                    backgroundColor: "#e8f1fe",
                    width: "auto",
                  }}
                  onClose={() => removeChip(item)} // Add onClose to remove item
                >
                  {item}
                </Chip>
              )}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
            />
          </View>
        )}
      </View>

      {/* ===================medicineAllergy======done========================= */}

      <View style={styles.subcontainer}>
        <Text style={styles.label}>Any medicine allergy?</Text>
        <View style={styles.chipContainer}>
          <TouchableOpacity
            style={[
              styles.chip,
              medicineAllergy.istrue ? styles.selectedChip : styles.defaultChip,
            ]}
            onPress={() =>
              setMedicineAllergy((prev) => ({ ...prev, istrue: true }))
            }
            disabled={formDisabled}
          >
            <Text style={styles.chipText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.chip,
              !medicineAllergy.istrue
                ? styles.selectedChip
                : styles.defaultChip,
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
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
                  fetchMedicinesList(text); // Fetch the medicine list based on input
                  setMedicineAllergyDropdownVisible(true);
                }}
                editable={!formDisabled}
              />
              <Button
                mode="contained"
                buttonColor="#007BFF"
                onPress={() => {
                  if (
                    medicineAllergy.search &&
                    !medicineAllergy.selectedList.includes(
                      medicineAllergy.search
                    )
                  ) {
                    setMedicineAllergy((prev) => ({
                      ...prev,
                      selectedList: [
                        ...prev.selectedList,
                        medicineAllergy.search,
                      ],
                    }));
                  }
                  setMedicineAllergy((prev) => ({ ...prev, search: "" }));
                }}
                disabled={formDisabled}
                icon={({ size }) => (
                  <Icon name="add" size={size} color="#fff" />
                )}
              >
                Add
              </Button>

              {/* Dropdown list to show medicines based on input */}
              {medicineAllergyDropdownVisible && (
                <View style={styles.dropdown}>
                  <FlatList
                    data={medicineAllergy.searchedList}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => selectMedicine(item)}
                      >
                        <Text style={styles.dropdownText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </View>

            <FlatList
              data={medicineAllergy.selectedList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Chip
                  onClose={() => removeMedChip(item)} // Enable removing items
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

      {/* =======================heartProblems====done============= */}
      <View style={styles.subcontainer}>
        <Text style={styles.label}>Any Heart problems?</Text>
        <View style={styles.chipContainer}>
          <TouchableOpacity
            style={[
              styles.chip,
              heartProblem.istrue ? styles.selectedChip : styles.defaultChip,
            ]}
            onPress={() =>
              setHeartProblem((prev) => ({ ...prev, istrue: true }))
            }
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
                onChangeText={(text) => {
                  setHeartProblem((prev) => ({ ...prev, search: text }));
                  getHeartList(text);
                  setHeartDropdownVisible(true);
                }}
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
                    }));
                  }
                  setHeartProblem((prev) => ({
                    ...prev,
                    search: "",
                  }));
                }}
                disabled={formDisabled} // Ensure formDisabled is correctly set
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>

              {heartDropdownVisible && (
                <View style={styles.dropdown}>
                  <FlatList
                    data={heartProblemList}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => selectHeart(item)}
                      >
                        <Text style={styles.dropdownText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </View>

            {/* Display the selected heart problems */}
            <FlatList
              data={heartProblem.selectedList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Chip
                  onClose={() =>
                    setHeartProblem((curr) => ({
                      ...curr,
                      selectedList: curr.selectedList.filter(
                        (val) => val !== el
                      ),
                    }))
                  } // Enable removing items
                  style={{ marginBottom: 8 }}
                >
                  {item}
                </Chip>
              )}
              numColumns={2} // Adjust layout for multiple columns
              columnWrapperStyle={{ justifyContent: "space-between" }}
            />
          </>
        )}
      </View>

      {/* =================================mentalHealth======done======================= */}
      <View style={styles.subcontainer}>
        <Text style={styles.label}>Any Mental health problems?*</Text>

        {/* Yes/No Toggle */}
        <View style={styles.chipContainer}>
          <TouchableOpacity
            style={[
              styles.chip,
              mentalProblem.istrue ? styles.selectedChip : styles.defaultChip,
            ]}
            onPress={() =>
              setMentalProblem((prev) => ({ ...prev, istrue: true }))
            }
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
                onChangeText={(text) => {
                  setMentalProblem((prev) => ({ ...prev, search: text }));
                  setMentalProblemDropdownVisible(true);
                }}
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  if (
                    mentalProblem.search &&
                    !mentalProblem.selectedList.includes(mentalProblem.search)
                  ) {
                    setMentalProblem((prev) => ({
                      ...prev,
                      selectedList: [
                        ...prev.selectedList,
                        mentalProblem.search,
                      ],
                    }));
                  }
                  setMentalProblem((prev) => ({ ...prev, search: "" }));
                }}
                disabled={formDisabled} // Ensure formDisabled is correctly set
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>

              {mentalProblemDropdownVisible && (
                <View style={styles.dropdown}>
                  <FlatList
                    data={mentalProblemList}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => selectMentalPrblm(item)}
                      >
                        <Text style={styles.dropdownText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </View>

            <FlatList
              data={mentalProblem.selectedList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Chip
                  onClose={() =>
                    setMentalProblem((curr) => ({
                      ...curr,
                      selectedList: curr.selectedList.filter(
                        (val) => val !== el
                      ),
                    }))
                  } // Enable removing items
                  style={{ marginBottom: 8 }}
                >
                  {item}
                </Chip>
              )}
              numColumns={2} // Adjust layout for multiple columns
              columnWrapperStyle={{ justifyContent: "space-between" }}
            />
          </>
        )}
      </View>

      {/* ===================================addiction======done================================= */}
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

      {/* ===============================infection========done======================= */}
      <View style={styles.subcontainer}>
        <Text style={styles.label}>
          Do you have/had infections Hepatitis B, Hepatitis C or HIV?
        </Text>

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

      {/* ===============================heriditary=======done================================== */}
      <View style={styles.subcontainer}>
        <Text style={styles.label}>Any known disease in family?</Text>

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
                      onChangeText={(text) =>
                        handleDiseaseNameChange(element, text)
                      }
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

      {/* ===============================pregnent=====done==================================== */}
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
              onBlur={() => validateField("numberOfPregnancies")}
            />
            {pregnancyDetailsErrors.numberOfPregnancies && (
              <Text style={styles.errorText}>
                {pregnancyDetailsErrors.numberOfPregnancies}
              </Text>
            )}
            <TextInput
              style={styles.inputPregnent}
              keyboardType="numeric"
              placeholder="Live Births"
              value={pregnancyDetails.liveBirths}
              onChangeText={handleLiveBirthsChange}
              onBlur={() => validateField("liveBirths")}
            />
            {pregnancyDetailsErrors.liveBirths && (
              <Text style={styles.errorText}>
                {pregnancyDetailsErrors.liveBirths}
              </Text>
            )}
          </View>
        )}
      </View>

      {/* ===============================cancer======done=================================== */}
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
                <Picker.Item label="Type of Cancer" value="" />

                {cancerTypes.map((type) => (
                  <Picker.Item key={type} label={type} value={type} />
                ))}
              </Picker>
            </View>
            <View style={styles.cancerinputContainer}>
              {/* <Text style={styles.label}>Stage of Cancer</Text> */}
              <TextInput
                style={styles.cancerinput}
                placeholder="Stage of Cancer"
                value={cancerDetails.stage}
                onChangeText={handleStageChange}
                editable={!formDisabled}
                keyboardType="numeric"
              />
            </View>
          </View>
        )}
      </View>

      {/* ===============================Self Prescribed Medicine=====done==================================== */}
      <View contentContainerStyle={styles.subcontainer}>
        <Text style={styles.label}>Taking any Self prescribed medicines?</Text>
        <View style={styles.chipContainer}>
          <TouchableOpacity
            style={[
              styles.chip,
              selfPrescribed.istrue ? styles.selectedChip : styles.defaultChip,
            ]}
            onPress={() =>
              setSelfPrescribed((pre) => ({ ...pre, istrue: true }))
            }
            disabled={formDisabled}
          >
            <Text style={styles.chipText}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.chip,
              !selfPrescribed.istrue ? styles.selectedChip : styles.defaultChip,
            ]}
            onPress={() =>
              setSelfPrescribed((pre) => ({
                ...pre,
                istrue: false,
                selectedList: [],
              }))
            }
            disabled={formDisabled}
          >
            <Text style={styles.chipText}>No</Text>
          </TouchableOpacity>
        </View>

        {selfPrescribed.istrue && (
          <>
            <View style={styles.detailsContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Type medicine name"
                  value={selfPrescribed.search}
                  onChangeText={(text) => {
                    setSelfPrescribed((prev) => ({ ...prev, search: text }));
                    fetchMedicinesList(text);
                    setSelfPrescribedDropdownVisible(true);
                  }}
                />
                {selfPrescribedDropdownVisible && (
                  <View style={styles.dropdown}>
                    <FlatList
                      data={selfPrescribed.searchedList}
                      keyExtractor={(item) => item}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.dropdownItem}
                          onPress={() => selectSelfMedicine(item)}
                        >
                          <Text style={styles.dropdownText}>{item}</Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                )}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Dosage"
                  keyboardType="numeric"
                  value={selfPrescribed.dosage}
                  onChangeText={(text) =>
                    setSelfPrescribed((prev) => ({ ...prev, dosage: text }))
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Frequency"
                  keyboardType="numeric"
                  value={selfPrescribed.frequency}
                  onChangeText={(text) =>
                    setSelfPrescribed((prev) => ({ ...prev, frequency: text }))
                  }
                />
              </View>
              <View style={styles.durationContainer}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Duration"
                    keyboardType="numeric"
                    value={selfPrescribed.duration.number}
                    onChangeText={(text) =>
                      setSelfPrescribed((prev) => ({
                        ...prev,
                        duration: { ...prev.duration, number: text },
                      }))
                    }
                  />
                </View>
                <View style={styles.selfpickerContainer}>
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
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAddMedicine}
                >
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
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
                      selectedList: curr.selectedList.filter(
                        (_, idx) => idx !== index
                      ),
                    }));
                  }}
                  disabled={formDisabled}
                  style={styles.selfchipStyle} // Apply styles to ensure wrapping
                >
                  <Text style={styles.selfchipText}>
                    {item?.name ? String(item.name) : ""}
                  </Text>
                </Chip>
              )}
            />
          </View>
        )}
      </View>

      {/* =============================== Prescribed Medicine=========done================================ */}
      <View contentContainerStyle={styles.subcontainer}>
        <Text style={styles.label}>Taking any prescribed medicines?</Text>
        <View style={styles.chipContainer}>
          <TouchableOpacity
            style={[
              styles.chip,
              prescribedMedicine.istrue
                ? styles.selectedChip
                : styles.defaultChip,
            ]}
            onPress={() =>
              setPrescribedMedicine((pre) => ({ ...pre, istrue: true }))
            }
            disabled={formDisabled}
          >
            <Text style={styles.chipText}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.chip,
              !prescribedMedicine.istrue
                ? styles.selectedChip
                : styles.defaultChip,
            ]}
            onPress={() =>
              setPrescribedMedicine((pre) => ({
                ...pre,
                istrue: false,
                selectedList: [],
              }))
            }
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
              onChangeText={(text) => {
                setPrescribedMedicine((prev) => ({ ...prev, search: text }));
                fetchMedicinesList(text);
                setPrescribedDropdownVisible(true);
              }}
            />
            {prescribedDropdownVisible && (
              <View style={styles.dropdown}>
                <FlatList
                  data={prescribedMedicine.searchedList}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => selectPresMedicine(item)}
                    >
                      <Text style={styles.dropdownText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
            <TextInput
              style={styles.input}
              placeholder="Dosage"
              keyboardType="numeric"
              value={prescribedMedicine.dosage}
              onChangeText={(text) =>
                setPrescribedMedicine((prev) => ({ ...prev, dosage: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Frequency"
              keyboardType="numeric"
              value={prescribedMedicine.frequency}
              onChangeText={(text) =>
                setPrescribedMedicine((prev) => ({ ...prev, frequency: text }))
              }
            />
            <View style={styles.durationContainer}>
              <TextInput
                style={styles.input}
                placeholder="Duration (Number)"
                keyboardType="numeric"
                value={prescribedMedicine.duration.number}
                onChangeText={(text) =>
                  setPrescribedMedicine((prev) => ({
                    ...prev,
                    duration: { ...prev.duration, number: text },
                  }))
                }
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
              <TouchableOpacity
                style={styles.addButton}
                onPress={handlePrescribedMedicineAddMedicine}
              >
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
                        selectedList: curr.selectedList.filter(
                          (_, idx) => idx !== index
                        ),
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
        <Text style={styles.label}>
          Epilepsy or other Neurological disorder?
        </Text>
        <View style={styles.chipContainer}>
          <TouchableOpacity
            style={[
              styles.chip,
              neurologicalDisorder.istrue
                ? styles.selectedChip
                : styles.defaultChip,
            ]}
            onPress={() =>
              setNeurologicalDisorder((pre) => ({ ...pre, istrue: true }))
            }
            disabled={formDisabled}
          >
            <Text style={styles.chipText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.chip,
              !neurologicalDisorder.istrue
                ? styles.selectedChip
                : styles.defaultChip,
            ]}
            onPress={() =>
              setNeurologicalDisorder((pre) => ({
                ...pre,
                istrue: false,
                selectedList: [],
              }))
            }
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
                onChangeText={(text) => {
                  setNeurologicalDisorder((prev) => ({
                    ...prev,
                    search: text,
                  }));
                  getNeuro(text);
                  setNeuroDropdownVisible(true);
                }}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => {
                    if (
                      neurologicalDisorder.search &&
                      !neurologicalDisorder.selectedList.includes(
                        neurologicalDisorder.search
                      )
                    ) {
                      setNeurologicalDisorder((prev) => ({
                        ...prev,
                        selectedList: [
                          ...prev.selectedList,
                          neurologicalDisorder.search,
                        ],
                      }));
                    }
                    setNeurologicalDisorder((prev) => ({
                      ...prev,
                      search: "",
                    }));
                  }}
                  disabled={formDisabled} // Ensure formDisabled is correctly set
                >
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>

              {neuroDropdownVisible && (
                <View style={styles.dropdown}>
                  <FlatList
                    data={neurologicalDisorder.searchedList}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => selectNeuro(item)}
                      >
                        <Text style={styles.dropdownText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </View>

            <FlatList
              data={neurologicalDisorder.selectedList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Chip
                  onClose={() =>
                    setNeurologicalDisorder((curr) => ({
                      ...curr,
                      selectedList: curr.selectedList.filter(
                        (val) => val !== el
                      ),
                    }))
                  } // Enable removing items
                  style={{ marginBottom: 8 }}
                >
                  {item}
                </Chip>
              )}
              numColumns={2} // Adjust layout for multiple columns
              columnWrapperStyle={{ justifyContent: "space-between" }}
            />
          </>
        )}
      </View>

      {/* ====================================chestCondition============================ */}

      <View style={styles.subcontainer}>
        <Text style={styles.label}>Any chest condition?</Text>
        <View style={styles.chipContainer}>
          <TouchableOpacity
            style={[
              styles.chip,
              chestCondition.istrue ? styles.selectedChip : styles.defaultChip,
            ]}
            onPress={() =>
              setChestCondition((pre) => ({ ...pre, istrue: true }))
            }
            disabled={formDisabled}
          >
            <Text style={styles.chipText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.chip,
              !chestCondition.istrue ? styles.selectedChip : styles.defaultChip,
            ]}
            onPress={() =>
              setChestCondition((pre) => ({
                ...pre,
                istrue: false,
                selectedList: [],
              }))
            }
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
              placeholder="Enter chest condition"
              onChangeText={(text) => {
                setChestCondition((prev) => ({ ...prev, search: text }));
                getChest(text);
                setChestDropdownVisible(true);
              }}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                if (
                  chestCondition.search &&
                  !chestCondition.selectedList.includes(chestCondition.search)
                ) {
                  setChestCondition((prev) => ({
                    ...prev,
                    selectedList: [...prev.selectedList, chestCondition.search],
                  }));
                }
                setChestCondition((prev) => ({ ...prev, search: "" }));
              }}
              disabled={formDisabled} // Ensure formDisabled is correctly set
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>

            {chestDropdownVisible && (
              <View style={styles.dropdown}>
                <FlatList
                  data={chestCondition.searchedList}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => selectChest(item)}
                    >
                      <Text style={styles.dropdownText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>
        )}

        <FlatList
          data={chestCondition.selectedList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Chip
              onClose={() =>
                setChestCondition((curr) => ({
                  ...curr,
                  selectedList: curr.selectedList.filter((val) => val !== el),
                }))
              } // Enable removing items
              style={{ marginBottom: 8 }}
            >
              {item}
            </Chip>
          )}
          numColumns={2} // Adjust layout for multiple columns
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 10, //temporary

  },
  column: {
    flex: 1,
  },
  selectedChip: {
    backgroundColor: "#007AFF", // Adjust color if needed
  },
  chipContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
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
    marginBottom: 15,
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
    padding: 10,
    paddingBottom: 10,
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
    width: "80%",
  },
  pickerContainer: {
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "100%",
  },
  selfpickerContainer: {
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "80%",
  },
  inputContainer: {
    flexDirection: "row", // Aligns the input and button in a row
    justifyContent: "space-between", // Space between the input and button
    alignItems: "center", // Vertically center the input and button
    marginBottom: 10,
  },
  cancerinputContainer: {
    width: "100%",
  },
  cancerinput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    width: "100%",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007bff",
    borderRadius: 5,
    marginBottom: 15,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdown: {
    borderColor: "#ccc",
    borderWidth: 1,
    maxHeight: 150,
    marginTop: 10,
  },

  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedContainer: {
    marginTop: 10,
    flexDirection: "row",
  },
  selectedItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  selectedItems: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    marginBottom: 8, // Add spacing between items if needed
  },
  selectedItemText: {
    flex: 1, // Allow text to take up available space
    flexShrink: 1, // Allow text to shrink if needed
    marginRight: 10,
  },
  removeButton: {
    marginLeft: 10,
    backgroundColor: "red",
    padding: 5,
    borderRadius: 10,
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  checkBoxContainer: {
    backgroundColor: "transparent",
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
    borderColor: "#ccc",
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
    marginRight: 10,
    fontSize: 16,
    width: "50%",
  },
  optionList: {
    maxHeight: 150,
  },
  optionItem: {
    padding: 5,
  },
  selectedList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  editIcon: {
    position: "absolute",
    top: 10, // Adjust the top position as needed
    right: 10, // Adjust the right position as needed
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dropdownText: {
    fontSize: 16,
    color: "#000",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    maxHeight: 150,
    position: "absolute",
    top: 50, // Adjust to place below the input
    width: "100%",
    zIndex: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dropdownText: {
    fontSize: 16,
    color: "#000",
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  selectedListContainer: {
    flexWrap: "wrap",
    width: "100%",
    padding: 0,
  },
  selfchipStyle: {
    // flexShrink: 1,            // Allows the Chip to shrink if needed
    // flexWrap: 'wrap',         // Wrap text if it exceeds the width
    minWidth: "100%", // Ensure the Chip stays within the container
    marginVertical: 5, // Space between chips
  },
  selfchipText: {
    // flexShrink: 1,            // Ensure text can shrink to fit
    // flexWrap: 'wrap',         // Wrap the text to the next line if needed
  },
  disabled: {
    opacity: 0.5,
  },
 
});

export default MedicalHistoryScreen;
