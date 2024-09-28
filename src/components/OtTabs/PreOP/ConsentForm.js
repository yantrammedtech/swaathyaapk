import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView , Modal, Alert} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from '@react-navigation/native';

const ConsentForm = () => {

    const [reports, setReports] = useState([]);
    const navigation = useNavigation()
    
  const handleUploadPress = async () => {
    try {
      // Launch the Document Picker for PDF files
      const res = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "audio/*", "video/*"],  // Allow PDF, audio, and video files
      copyToCacheDirectory: true,  // Keep the file in cache
      });
  
      // Log the response for debugging
      console.log("Document Picker Response:", res);
  
      // Check if the user canceled the selection
      if (res.canceled) {
        Alert.alert("Cancelled", "File selection was cancelled");
        return;
      }
  
      // Check if assets are available
      const { assets } = res;
  
      if (!assets || assets.length === 0) {
        Alert.alert("Error", "No file selected");
        return;
      }
  
      // Extract file details from the first asset
      const { uri, name, mimeType } = assets[0];
  
      // Log the file details
      console.log("File details:", { uri, name, mimeType });
  
      // Validate if the file URI is present
      if (!uri) {
        Alert.alert("Error", "No file selected");
        return;
      }
  
//temporary----------------
      const newReport = { uri, name, type: mimeType };
      setReports(prevReports => [...prevReports, newReport]);


      // Prepare form data for the file upload
      const form = new FormData();
  
      // Create a file object with URI, name, and MIME type
      const file = {
        uri: uri,  // File URI from Document Picker
        name: name || "document.pdf",  // Default name if not available
        type: mimeType || "application/octet-stream", 
      };
  
      // Append the file to the form data
      form.append("files", file);
  
      // Add category field (as per the requirement)
      const category = 1;
      form.append("category", String(category));
  
      // Perform the API call for file upload
      return
      const reportResponse = await authPostAttachments(
`attachment/${user.hospitalID}/${patientTimeLineID}/${user.id}`,
        form,
        user.token
      );
  
      // Handle the response from the server
      if (reportResponse.message === "success") {
        Alert.alert("Success", "Report successfully uploaded");
      } else {
        Alert.alert("Error", "An error occurred: " + reportResponse.message);
      }
    } catch (err) {
      Alert.alert("Error", "An error occurred: " + err.message);
      console.error("Upload Error:", err);
    }
  };
  const handleViewPress = async (fileURL) => {
    try {
      // Open URL in a web browser
      await Linking.openURL(fileURL);
    } catch (error) {
      Alert.alert("Error", "Unable to open URL");
    }
  };

  const renderReportItem = ({ item }) => {
    console.log("File name:", item.fileName);

    return (
      <View style={styles.fileContainer}>
        {/* File Type Icon */}
        <View style={styles.fileIcon}>
          {item.mimeType === "application/pdf" ? (
            <PdfIcon name="file-pdf-o" size={40} color="#e74c3c" />
          ) : item.mimeType === "audio/mpeg" ? (
            <Icon name="audio-file" size={50} color="#3498db" />
          ) : item.mimeType === "video/mp4" ? (
            <Icon name="videocam" size={50} color="#f39c12" />
          ) : (
            <Icon name="image" size={50} color="#2ecc71" />
          )}
        </View>
        <View style={styles.fileInfo}>
          <Text style={styles.fileName}>
            {item.fileName ? item.fileName : "No file name"}
          </Text>
          <Text style={styles.fileDetails}>
            {" "}
            Added on:
            {new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </Text>
          <Text style={styles.fileSubmitter}>Submitted by: 123</Text>
        </View>

        {/* Download and Delete Icons */}
        <View style={styles.actionIcons}>
          <TouchableOpacity
            onPress={() => handleViewPress(item.fileURL)}
            style={styles.iconButton}
          >
            <Icon name="visibility" size={20} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            // onPress={() => handleOpenModal(item.id)}
            style={styles.iconButton}
          >
            <Icon name="delete" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handlePress = () => {
    console.log("Add Schedule button pressed");
    navigation.navigate("Schedule")
    // navigate to anesthesiarecord
  };

  return (
   <View style={styles.container}>
    <View style={styles.subcontainer}>
    <Text style={styles.uploadText}>Upload Consent Form</Text>
        <View style={styles.uploadContainer}>
        <Icon name="cloud-upload" size={50} color="#ccc" />
        <Text style={styles.uploadText}>
          Browse and choose the files you want to upload from your computer
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleUploadPress}
          >
            <Icon name="add" size={30} color="#fff" />
          </TouchableOpacity>
         
        </View>
      </View>
    </View>
    

      <FlatList
        data={reports}
        // keyExtractor={(item) => item.id.toString()}
        renderItem={renderReportItem}
      />

<View style={styles.btncontainer}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
   </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
      marginBottom:1,
    },
    subcontainer:{
        borderWidth: 1,
      borderColor: "#ccc", 
      padding: 10,
      margin:5,
      marginBottom: 20,
      borderRadius: 20,
    },
    uploadContainer: {
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ccc",
      borderStyle: "dashed",
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
    },
    uploadText: {
      textAlign: "center",
      color: "#777",
      marginVertical: 10,
    },
    uploadButton: {
      backgroundColor: "#3e83ff",
      padding: 10,
      borderRadius: 50,
    },
    fileContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f9f9f9",
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#e0e0e0",
      marginBottom: 5,
    },
    fileIcon: {
        marginRight: 10,
      },
      fileInfo: {
        flex: 1,
        marginLeft: 10,
      },
      fileName: {
        fontSize: 16,
        fontWeight: "bold",
      },
      fileDetails: {
        fontSize: 14,
        color: "#555",
      },
      fileSubmitter: {
        fontSize: 14,
        color: "#888",
      },
      actionIcons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 70,
      },
      iconButton: {
        marginRight: 10, // Adjust spacing between icons
      },
      btncontainer: {
        flex: 1,
        justifyContent: 'center', // Center vertically
        alignItems: 'center',      // Center horizontally
      },
      button: {
        backgroundColor: '#1E90FF', // DodgerBlue color
        paddingVertical: 15,        // Padding for height
        paddingHorizontal: 30,      // Padding for width
        borderRadius: 5,            // Rounded corners
      },
      buttonText: {
        color: '#fff',              // White text color
        fontSize: 16,               // Font size
        textAlign: 'center',        // Center text
        fontWeight: 'bold',         // Bold text
      }
})

export default ConsentForm
