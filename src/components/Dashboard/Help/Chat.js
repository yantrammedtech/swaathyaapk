import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { authPost } from '../../../axios/authPost';
import Toast from 'react-native-toast-message';
import { authPostAttachments } from '../../../axios/authPostAttachments';
import { useNavigation } from '@react-navigation/native';



const ChatScreen = () => {
  const user = useSelector((state) => state.currentUserData);
    const navigation = useNavigation();

  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi👋', type: 'user' },
    {
      id: '2',
      text: 'Good Morning, my name is Prana bot😊 How can I help you?',
      type: 'bot',
    },
    { id: '3', text: 'I’m facing a problem with the patient.', type: 'user' },
  ]);

  const [inputText, setInputText] = useState('');
  const [type, setType] = useState("");
  const [module, setModule] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [showModuleOptions, setShowModuleOptions] = useState(false);
  const [showTypeOptions, setShowTypeOptions] = useState(false);

  const typeOptions =[
    "Bug",
    "Feature request",
    "Technical issue",
    "Support query",
  ]

  const moduleOptions =[
    "Inpatient",
    "OPD",
    "OT",
    "Triage",
    "Emergency Red zone",
    "Emergency Yellow zone",
    "Emergency Green zone",
  ]


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTypeOptions(true);
    }, 1000); // 1000 milliseconds = 1 seconds

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, []);


  const renderItem = ({ item }) => {
    if (item.type === 'user') {
      return (
        <View style={styles.userMessageContainer}>
            {item.text ? (
                <Text style={styles.userMessageText}>{item.text}</Text>
            ) : null}
            {item.file ? (
                <Image
                    source={{ uri: item.file }}
                    style={styles.previewImage}
                />
            ) : null}
        </View>
    );
    } else {
      return (
        <View style={styles.botMessageContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }} // Replace with actual bot icon URL
            style={styles.botIcon}
          />
          <Text style={styles.botMessageText}>{item.text}</Text>
        </View>
      );
    }
  };

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { id: Date.now().toString(), text: inputText, type: 'user' }]);
      setInputText('');
      setDescription(inputText)
    }
  };

  const handleOptionSelect = (option) => {
    setMessages([...messages, { id: Date.now().toString(), text: option, type: 'user' }]);
    setModule(option)
    setShowModuleOptions(false);
    setMessages([
      ...messages,
      { id: Date.now().toString(), text: option, type: 'user' },
      {
        id: (Date.now() + 1).toString(),
        text: 'Write a problem, take a screenshot, and upload an image.',
        type: 'bot',
      },
    ]);
  };

  const handleTypeOptionSelect = (option) => {
    setMessages([...messages, { id: Date.now().toString(), text: option, type: 'user' }]);
    setType(option)
    setShowTypeOptions(false);
    setShowModuleOptions(true); 

  };

 
  const handleRemoveImage = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      Alert.alert(
        'Permission Required',
        'Permission to access camera roll is required!',
        [{ text: 'OK' }]
      );
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync();
    const selectedFiles = result.assets.map(asset => ({
      uri: asset.uri,
    }));
    setFiles(prev => [...prev, ...selectedFiles]);
     // Update messages to include the file upload
     selectedFiles.forEach(file => {
      setMessages(prevMessages => [
          ...prevMessages,
          { id: String(prevMessages.length + 1), text: '', type: 'user', file: file.uri },
      ]);
  });
      // Add the bot message after file upload
      setMessages(prevMessages => [
        ...prevMessages,
        { id: String(prevMessages.length + 1), 
          text: "Issue received. Click Submit to create the ticket. Our team will resolve it within 24 hours.", 
          type: 'bot' 
         },
    ]);
    // handleSubmit()
  
    if (!result.canceled) {
      console.log(result.uri);
    }
  };

  const handleCancel = () => {
    navigation.goBack()
  };

  const handleSubmit = async () => {
   
console.log("file====",files)
    if (files.length > 3) {
      Alert.alert(
        "Limit Exceeded",
        "Maximum limit exceeded, cannot upload more than 3 images at a time",
        [{ text: "OK" }]
      );
    }
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('files', {
        uri: file.uri, 
        type: 'image/jpeg', 
        name: file.uri.split('/').pop(), 
      });
    });

    let userID = user.id;
    const res = await authPost(
      `ticket/hospital/${user.hospitalID}`,
      { userID, type, subject: description, createdBy: user.id, module },
      user.token
    );

    if (res.message === "success") {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Ticket successfully generated',
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 40,
      });
      if (files.length) {
        const attachmentRes = await authPostAttachments(
          `attachment/tickets/${user.hospitalID}/${res.ticket.id}`,
          formData,
          user.token
        );
        if (attachmentRes.message == "success") {
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Success',
            text2: 'Attachments successfully uploaded',
            visibilityTime: 3000,
            autoHide: true,
            bottomOffset: 40,
          });
         
        } else {
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: attachmentRes.message,
            visibilityTime: 3000,
            autoHide: true,
            bottomOffset: 40,
          });
         
        }
        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      } else {
        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      }

      setDescription("");
      setType("");
      setFiles([]);
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: res.message,
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 40,
      });
     
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.chatContainer}
        contentContainerStyle={{ padding: 10 }}
      />

      
{showTypeOptions && (
        <ScrollView style={styles.optionsContainer}>
          {typeOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleTypeOptionSelect(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

{showModuleOptions && (
        <ScrollView style={styles.optionsContainer}>
          {moduleOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleOptionSelect(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}


      {module && (
 <View style={styles.inputContainer}>
 <TextInput
   style={styles.input}
   placeholder="Type your message"
   value={inputText}
   onChangeText={setInputText}
 />
 <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
   <Text style={styles.sendButtonText}>➤</Text>
 </TouchableOpacity>
</View>
      )}

      {description && (
        <TouchableOpacity style={styles.addButton} onPress={pickImage}>
 <Icon name="upload" size={20} color="#65a4f7" />
      </TouchableOpacity>
      )}
 

      
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainer: {
    flex: 1,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#E0F7FA',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: '75%',
  },
  userMessageText: {
    color: '#000',
  },
  botMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    maxWidth: '75%',
  },
  botIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  botMessageText: {
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    padding: 10,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#1A73E8',
    borderRadius: 20,
    padding: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  optionsContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  optionButton: {
    backgroundColor: '#E7F0FF',
    borderRadius: 20,
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
  },
  optionText: {
    color: '#000',
    fontSize: 16,
  },
  addButton: {
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    fontSize: 24,
    color: '#000',
  },
  filePreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  previewItem: {
    position: 'relative',
    marginRight: 10,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  removeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
  },
  removeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between buttons
    marginTop: 20, // Adjust as needed
  },
  cancelButton: {
    backgroundColor: '#f44336', // Red background for Cancel button
    padding: 10,
    borderRadius: 5,
    flex: 1, // Take equal width
    marginRight: 5, // Space between buttons
  },
  submitButton: {
    backgroundColor: '#4CAF50', // Green background for Submit button
    padding: 10,
    borderRadius: 5,
    flex: 1, // Take equal width
    marginLeft: 5, // Space between buttons
  },
  buttonText: {
    color: '#fff', // White text color
    textAlign: 'center', // Center text
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginTop: 5,
},
});

export default ChatScreen;
