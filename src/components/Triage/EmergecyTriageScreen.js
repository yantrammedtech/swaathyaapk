import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";



const validateForm = ({
  vitals: data,
  isSubmission = false,
}) => {
  const errors = {
    oxygen: "",
    pulse: "",
    temperature: "",
    respiratoryRate: "",
    bpH: "",
    bpL: "",
  };

  if (data.oxygen || isSubmission) {
    if (data.oxygen < 50) errors.oxygen = "Oxygen value should be >= 50";
    else if (data.oxygen > 100) errors.oxygen = "Oxygen value should be <= 100";
  }

  if (data.bpH || isSubmission) {
    if (data.bpL && data.bpH <= data.bpL) {
      errors.bpH = "High BP value should be greater than the low BP value";
    } else if (data.bpH > 200) {
      errors.bpH = "High BP value should be <= 200";
    } else if (data.bpH < 50) {
      errors.bpH = "High BP value should be >= 50";
    }
  }
  

  if (data.bpL || isSubmission) {
    if (data.bpH && data.bpL >= data.bpH) {
      errors.bpL = "Low BP value should be less than the high BP value";
    } else if (data.bpL > 200) {
      errors.bpL = "Low BP value should be <= 200";
    } else if (data.bpL < 30) {
      errors.bpL = "Low BP value should be >= 30";
    }
  }
  

  if (data.pulse || isSubmission) {
    if (data.pulse < 30) errors.pulse = "Pulse value should be >= 30";
    else if (data.pulse > 200) errors.pulse = "Pulse value should be <= 200";
  }

  if (data.temperature || isSubmission) {
    if (data.temperature < 20)
      errors.temperature = "Temperature value should be >= 20";
    else if (data.temperature > 45)
      errors.temperature = "Temperature value should be <= 45";
  }

  if (data.respiratoryRate || isSubmission) {
    if (data.respiratoryRate < 1)
      errors.respiratoryRate = "Respiratory Rate value should be >= 1";
    else if (data.respiratoryRate > 40)
      errors.respiratoryRate = "Respiratory Rate value should be <= 40";
  }

  const hasErrors = Object.entries(errors).some(([, value]) => !!value);

  return { errors, hasErrors };
};


const EmergencyTriageScreen = () => {
  // Get initial vitals data from Redux store
  const dispatch = useDispatch();
  const triageDataFromStore = useSelector((state) => state.triageData);

  // Set local state for vitals
  const [vitals, setVitals] = React.useState(triageDataFromStore.vitals);

  // Handle change for each field
  const handleChange = (key, value) => {
    setVitals((prevVitals) => ({
      ...prevVitals,
      [key]: value.replace(/[^0-9]/g, ""),
    }));
  };

  
  const navigation = useNavigation();

  // Handler for form submission
  const handleNextPress = () => {
    const { errors, hasErrors } = validateForm({ vitals, isSubmission: true });

  if (hasErrors) {
   
    setVitals((prevVitals) => ({
      ...prevVitals,
      errors, 
    }));
    return;
  }
    
    dispatch({
      type: "updateTriageData",
      payload: {
        ...triageDataFromStore,
        vitals,
      },
    });
  
    navigation.navigate("EmergencyTriageNextScreen");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
       <View style={styles.inputContainer}>
      <Text style={styles.label}>Oxygen</Text>
      <TextInput
        style={[styles.input, vitals?.errors?.oxygen ? styles.inputError : null]}
        value={vitals?.oxygen}
        onChangeText={(value) => handleChange("oxygen", value)}
        keyboardType="numeric"
      />
      {vitals?.errors?.oxygen && (
        <Text style={styles.errorText}>{vitals.errors.oxygen}</Text>
      )}
    </View>

    <View style={styles.bpContainer}>
      <View style={styles.bpInputContainer}>
        <Text style={styles.label}>Blood Pressure High [mm]</Text>
        <TextInput
          style={[styles.bpInput, vitals?.errors?.bpH ? styles.inputError : null]}
          value={vitals?.bpH}
          onChangeText={(value) => handleChange("bpH", value)}
          keyboardType="numeric"
        />
        {vitals?.errors?.bpH && (
          <Text style={styles.errorText}>{vitals.errors.bpH}</Text>
        )}
      </View>
      <View style={styles.bpInputContainer}>
        <Text style={styles.label}>Low [mm Hg]</Text>
        <TextInput
          style={[styles.bpInput, vitals?.errors?.bpL ? styles.inputError : null]}
          value={vitals?.bpL}
          onChangeText={(value) => handleChange("bpL", value)}
          keyboardType="numeric"
        />
        {vitals?.errors?.bpL && (
          <Text style={styles.errorText}>{vitals.errors.bpL}</Text>
        )}
      </View>
    </View>

      <View style={styles.bpContainer}>
      <View style={styles.bpInputContainer}>
        <Text style={styles.label}>Temperature (°C or °F)</Text>
        <TextInput
          style={[styles.bpInput, vitals?.errors?.temperature ? styles.inputError : null]}
          value={vitals?.temperature}
          onChangeText={(value) => handleChange("temperature", value)}
        />
        {vitals?.errors?.temperature && (
          <Text style={styles.errorText}>{vitals.errors.temperature}</Text>
        )}
      </View>

      <View style={styles.bpInputContainer}>
        <Text style={styles.label}>Pulse (bpm)</Text>
        <TextInput
          style={[styles.bpInput, vitals?.errors?.pulse ? styles.inputError : null]}
          value={vitals?.pulse}
          onChangeText={(value) => handleChange("pulse", value)}
        />
        {vitals?.errors?.pulse && (
          <Text style={styles.errorText}>{vitals.errors.pulse}</Text>
        )}
      </View>
    </View>

      <View style={styles.inputContainer}>
      <Text style={styles.label}>Respiratory Rate (per min)</Text>
      <TextInput
        style={[styles.input, vitals?.errors?.respiratoryRate ? styles.inputError : null]}
        value={vitals?.respiratoryRate}
        onChangeText={(value) => handleChange("respiratoryRate", value)}
      />
      {vitals?.errors?.respiratoryRate && (
        <Text style={styles.errorText}>{vitals.errors.respiratoryRate}</Text>
      )}
    </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Time of observation</Text>
        <TextInput
        style={[styles.input, vitals?.errors?.time ? styles.inputError : null]}
      
          value={vitals?.time}
          onChangeText={(value) => handleChange("time", value)}
        />
         {vitals?.errors?.time && (
        <Text style={styles.errorText}>{vitals.errors.time}</Text>
      )}
      </View>

     
      {/* Add image if needed */}
      {/* <Image source={{ uri: 'https://example.com/your-image-url.png' }} style={styles.image} /> */}

      <TouchableOpacity style={styles.skipButton} onPress={handleNextPress}>
        <Text style={styles.skipButtonText}>Next</Text>
        <TouchableOpacity style={styles.closeButton}>
          <Icon name="arrow-upward" size={24} color="#1977f3" />
        </TouchableOpacity>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
  },
  bpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  bpInputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 13,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 5,
  },
  bpInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 5,
    width: "100%",
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
  },
  skipButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1977f3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 30, // Adjust as needed
  },
  skipButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 10,
  },
  closeButton: {
    width: 36,
    height: 36,
    backgroundColor: "#fff",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "90deg" }],
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});

export default EmergencyTriageScreen;
