import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

const validateFields = (fieldName, value, range) => {
  switch (fieldName) {
    case 'painScale':
      if (value === '' || isNaN(Number(value))) {
        return 'Please enter a valid number.';
      }
      if (range) {
        const painValue = parseFloat(value);
        if (painValue < range[0] || painValue > range[1]) {
          return `Pain scale should be between ${range[0]} and ${range[1]}.`;
        }
      }
      return '';

    case 'eyeMovement':
    case 'motorResponse':
    case 'verbalResponse':
      if (value === null) {
        return 'This field is required.';
      }
      return '';

    default:
      return '';
  }
};

const NextScreen = () => {
  const triageDataFromStore = useSelector((state) => state.triageData);
  const [gcs, setGcs] = useState(triageDataFromStore.gcs);
  const dispatch = useDispatch();
  const user = useSelector((state) => {return state.currentUserData})
  const [gcsScore, setGcsScore] = useState(0);
  const [eyeMovementChecked, setEyeMovementChecked] = useState(false);
  const [motorResponseChecked, setMotorResponseChecked] = useState(false);
  const [verbalResponseChecked, setVerbalResponseChecked] = useState(false);
  const [painScale, setPainScale] = useState('');
  const [selectedEyeMovement, setSelectedEyeMovement] = useState(null);
  const [selectedMotorResponse, setSelectedMotorResponse] = useState(null);
  const [selectedVerbalResponse, setSelectedVerbalResponse] = useState(null);
  const [errors, setErrors] = useState({});

  const responseOptions = {
    eye: ["Spontaneous", "To Sound", "To Pressure", "None"],
    motor: ["Obey Commands", "Localising", "Extension", "Abnormal Flexion", "Normal Flexion", "None"],
    verbal: ["Oriented", "Confused", "Words", "Sounds", "None"],
  };

  const navigation = useNavigation();
 
  const handleNextPress = () => {
    const errs = {
      painScale: validateFields('painScale', painScale, [1, 10]),
      eyeMovement: validateFields('eyeMovement', selectedEyeMovement),
      motorResponse: validateFields('motorResponse', selectedMotorResponse),
      verbalResponse: validateFields('verbalResponse', selectedVerbalResponse),
    };

    setErrors(errs);

    const hasErrors = Object.values(errs).some(error => error !== '');

    if (hasErrors) {
      return;
    }

    dispatch({
      type: 'updateTriageData',
      payload: {
        ...triageDataFromStore,
        gcs: {
          gcsScore,
          eyeMovement: selectedEyeMovement,
          motorResponse: selectedMotorResponse,
          verbalResponse: selectedVerbalResponse,
          painScale,
        },
      },
    });

    navigation.navigate('Trauma');
  };

// ===============web socket start===============
const [socket, setSocket] = useState(null);
const [receivedMessage, setReceivedMessage] = useState(null);
const [isMessageConsumed, setIsMessageConsumed] = useState(false);

const delay = 10000;

  const formdata = {
    eyeMovement: selectedEyeMovement, 
    verbalResponse: selectedVerbalResponse, 
    motorResponse: selectedMotorResponse, 
    painScale,
  }
  const sendMessage = useCallback(
    (data) => {
      console.log("data===",data)
      console.log("socket===",socket)
      if (socket) socket.send(JSON.stringify(data));
    },
    [socket]
  );

  useEffect(() => {
    sendMessage({
      type: 'GCS',
      data: formdata,
    });
  }, []);


  useEffect(() => {
    if (user.token) {
      let intervalId;
      const ws = new WebSocket(
        "ws://hospitaldashboard-env.eba-mqytecux.ap-south-1.elasticbeanstalk.com/api/v1/triage",
        user.token
      );
console.log("object", ws)
      const ping = () => {
        console.log("ping")
        ws.send(JSON.stringify({ type: "ping" }));
        console.log("ping ws", ws)
      };

      const wsOpenHandler = () => {
        console.log("WebSocket connection established.");
        intervalId = setInterval(ping, delay);
        console.log("wsOpenHandler intervalId", intervalId)
        setSocket(ws);
        console.log("wsOpenHandler ws", ws)

      };

      const wsMessageHandler = (event) => {
        console.log("wsMessageHandler", event)
        const data = JSON.parse(event.data);
        setReceivedMessage(data);
        console.log("Received message:", data);
      };

      const wsCloseHandler = (event) => {
        console.log("wsCloseHandler")
        if (intervalId) clearInterval(intervalId);
        setSocket(null);
        console.log("WebSocket connection closed", event);
      };

      const wsErrorHandler = (error) => {
        console.error("WebSocket error: ", error);
      };

      ws.addEventListener("open", wsOpenHandler);
      ws.addEventListener("message", wsMessageHandler);
      ws.addEventListener("close", wsCloseHandler);
      ws.addEventListener("error", wsErrorHandler);

      return () => {
        if (intervalId) clearInterval(intervalId);
        ws.removeEventListener("open", wsOpenHandler);
        ws.removeEventListener("message", wsMessageHandler);
        ws.removeEventListener("close", wsCloseHandler);
        ws.removeEventListener("error", wsErrorHandler);
        console.log("Closing socket connection.");
        ws.close();
      };
    }
  }, [user.token]);

  
// ===============web socket end===============

const scoreList = {
  eyeMovement: {
    spontaneous: 4,
    'to sound': 3,
    'to pressure': 2,
    none: 1,
  },
  verbalResponse: {
    oriented: 5,
    confused: 4,
    words: 3,
    sounds: 2,
    none: 1,
  },
  motorResponse: {
    'obey commands': 6,
    localising: 5,
    'normal flexion': 4,
    'abnormal flexion': 3,
    extension: 2,
    none: 1,
  },
};

  const calculateGcsScore = () => {
    const eyeScore = scoreList.eyeMovement[selectedEyeMovement?.toLowerCase()] || 0;
    const motorScore = scoreList.motorResponse[selectedMotorResponse?.toLowerCase()] || 0;
    const verbalScore = scoreList.verbalResponse[selectedVerbalResponse?.toLowerCase()] || 0;
    
    return eyeScore + motorScore + verbalScore;
  };

  useEffect(() => {
    setGcsScore(calculateGcsScore());
  }, [selectedEyeMovement, selectedMotorResponse, selectedVerbalResponse]);


  console.log("gcsScore==",formdata, gcsScore)
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>GCS score: {gcsScore}</Text>
      </View>

      {/* Eye Movement Section */}
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

      {/* Motor Response Section */}
      <View style={motorResponseChecked && styles.section}>
        <CheckBox
          title="Motor Response *"
          checked={motorResponseChecked}
          onPress={() => setMotorResponseChecked(!motorResponseChecked)}
          containerStyle={styles.checkBoxRow}
        />
        {motorResponseChecked && (
          <View style={styles.optionsContainer}>
            {responseOptions.motor.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedMotorResponse === option && styles.selectedOption,
                ]}
                onPress={() => setSelectedMotorResponse(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {errors.motorResponse && <Text style={styles.errorText}>{errors.motorResponse}</Text>}
      </View>

      {/* Verbal Response Section */}
      <View style={verbalResponseChecked && styles.section}>
        <CheckBox
          title="Verbal response *"
          checked={verbalResponseChecked}
          onPress={() => setVerbalResponseChecked(!verbalResponseChecked)}
          containerStyle={styles.checkBoxRow}
        />
        {verbalResponseChecked && (
          <View style={styles.optionsContainer}>
            {responseOptions.verbal.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedVerbalResponse === option && styles.selectedOption,
                ]}
                onPress={() => setSelectedVerbalResponse(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {errors.verbalResponse && <Text style={styles.errorText}>{errors.verbalResponse}</Text>}
      </View>

      {/* Pain Scale Input */}
      <TextInput
        style={styles.input}
        placeholder="Pain scale"
        value={painScale}
        onChangeText={setPainScale}
        keyboardType="numeric"
      />
      {errors.painScale && <Text style={styles.errorText}>{errors.painScale}</Text>}

      {/* Next Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleNextPress}>
        <Text style={styles.skipButtonText}>Next</Text>
        <TouchableOpacity style={styles.closeButton}>
          <Icon name="arrow-upward" size={24} color="#1977F3" />
        </TouchableOpacity>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scoreContainer: {
    backgroundColor: '#d4edda',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  scoreText: {
    color: '#155724',
    fontSize: 18,
    fontWeight: 'bold',
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
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1977f3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 30, // Adjust as needed
  },
  skipButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 10,
  },
  closeButton: {
    width: 36,
    height: 36,
    backgroundColor: '#fff',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '90deg' }],
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default NextScreen;
