import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Linking,
  FlatList,
  Modal,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // For icons
import PdfIcon from "react-native-vector-icons/FontAwesome"; // PDF icon from FontAwesome
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import { authFetch } from "../../../axios/authFetch";

const Report = () => {
  const user = useSelector((state) => state.currentUserData);
  const currentPatient = useSelector((state) => state.currentPatientData);
  const patientTimeLineID = currentPatient?.patientTimeLineID;

  
  const [reports, setReports] = useState([]);

 
  const getAllReports = async () => {
    const response = await authFetch(
      `attachment/${user.hospitalID}/all/${patientTimeLineID}`,
      user.token
    );
    console.log("getAllReports===", response);
    if (response.message == "success") {
      setReports(response.attachments);
    }
  };

  useEffect(() => {
    getAllReports();
  }, [patientTimeLineID, user]);




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
            {new Date(item.addedOn).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </Text>
          <Text style={styles.fileSubmitter}>Submitted by: {item.userID}</Text>
        </View>

        {/* Download and Delete Icons */}
        <View style={styles.actionIcons}>
          <TouchableOpacity
            onPress={() => handleViewPress(item.fileURL)}
            style={styles.iconButton}
          >
            <Icon name="visibility" size={20} color="#000" />
          </TouchableOpacity>

         
        </View>
      </View>
    );
  };

  

  return (
    <View style={styles.container}>
   
    {reports.length=== 0 ? (
         <Text style={styles.noReportsText}>No reports added</Text>
    ) : (
        
      <FlatList
      data={reports}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderReportItem}
    />
    )}

     

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    marginBottom:60,
  },
  uploadContainer: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "dashed",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalText: {
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttonSpacing: {
    width: 10, // Space between buttons
  },
  cameraButton: {
    backgroundColor: "#ccc",
    padding: 6,
    borderRadius: 3,
    marginLeft: 10,
  },
  noReportsText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  }
  
});

export default Report;
