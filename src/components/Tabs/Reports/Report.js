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
import { authPost } from "../../../axios/authPost";
import { authFetch } from "../../../axios/authFetch";
import { authDelete } from "../../../axios/authDelete";

const Report = () => {
  const user = useSelector((state) => state.currentUserData);
  const currentPatient = useSelector((state) => state.currentPatientData);
  const patientTimeLineID = currentPatient?.patientTimeLineID;

  const [modalVisible, setModalVisible] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);

  const [reports, setReports] = useState([
    {
      id: 1,
      fileName: "CRP test report.pdf",
      mimeType: "application/pdf",
      addedOn: new Date(),
      fileURL: "https://example.com/crp-test-report.pdf",
      userID: "Laxmi",
    },
  ]);

  //======for laptop=====

  // const handleUploadPress = async () => {
  //   try {
  //     const res = await DocumentPicker.getDocumentAsync({
  //       type: "application/pdf",
  //     });
  //     console.log("res=======", res);

  //     // Check if the user cancelled the selection
  //     if (res.canceled) {
  //       Alert.alert("Cancelled", "File selection was cancelled");
  //       return;
  //     }

  //     // Extract file details from the assets array
  //     const { assets } = res;
  //     if (assets.length > 0) {
  //       const file = assets[0]?.file; // Assuming single file selection

  //       const form = new FormData();
  //       console.log("file===", file);
  //       form.append("files", file);

  //       const category = 1;
  //       form.append("category", String(category));

  //       // Perform the API call for file upload
  //       const reportResponse = await authPost(
  //         `attachment/${user.hospitalID}/${patientTimeLineID}/${user.id}`,
  //         form,
  //         user.token
  //       );
  //       if (reportResponse.message == "success") {
  //         Alert.alert("Success", "Report successfully uploaded");
  //       } else {
  //         Alert.alert("Error", "An error occurred: " + reportResponse.message);
  //       }
  //     } else {
  //       Alert.alert("Error", "No file selected");
  //     }
  //   } catch (err) {
  //     Alert.alert("Error", "An error occurred: " + err);
  //   }
  // };

  //====for mobile==========
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
      const reportResponse = await authPost(
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

  const handleDeleteReport = async (id) => {
    try {
      await authDelete(`attachment/${user.hospitalID}/${id}`, user.token);
      // Optionally, update state or notify the user
      setModalVisible(false);
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const handleOpenModal = (id) => {
    setReportToDelete(id);
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
    setReportToDelete(null);
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

          <TouchableOpacity
            onPress={() => handleOpenModal(item.id)}
            style={styles.iconButton}
          >
            <Icon name="delete" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleCameraPress = async () => {
    try {
      // Request camera permissions
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      if (cameraPermission.status !== "granted") {
        Alert.alert("Error", "Camera permissions are required to take a photo");
        return;
      }

      // Open the camera for taking a photo
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      console.log("result=====", result);

      // Check if the user cancelled the selection
      if (result.canceled) {
        Alert.alert("Cancelled", "No image selected");
        return;
      }

      const { assets } = result;
      if (assets && assets.length > 0) {
        const { uri, fileName, mimeType, fileSize } = assets[0];
        console.log("uri====", uri);

        if (uri) {
          // Derive fileName and fileType if not provided
          const name = fileName || uri.split("/").pop();
          const type = mimeType || `image/${uri.split(".").pop()}`;

          console.log("name:", name);
          console.log("type:", type);
          console.log("size:", fileSize);

          // FormData setup
          const form = new FormData();
          form.append("files", {
            uri: uri,
            name: name,
            type: type,
            lastModified: new Date().getTime(),
            lastModifiedDate: new Date(),
            size: fileSize,
          });

          const category = 1;
          form.append("category", String(category));

          console.log("FormData cam===:", form);

          // Perform the API call for file upload
          const reportResponse = await authPost(
            `attachment/${user.hospitalID}/${patientTimeLineID}/${user.id}`,
            form,
            user.token
          );

          console.log("Report response:", reportResponse);

          if (reportResponse && reportResponse.message === "success") {
            Alert.alert("Success", "Photo successfully uploaded");
          } else {
            Alert.alert(
              "Error",
              "An error occurred: " +
                (reportResponse?.message || "Unknown error")
            );
          }
        } else {
          Alert.alert("Error", "Image URI is not valid");
        }
      } else {
        Alert.alert("Error", "No image selected");
      }
    } catch (err) {
      console.error("Error:", err);
      Alert.alert("Error", "An error occurred: " + err.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Upload Section */}
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
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={handleCameraPress}
          >
            <Icon name="camera-alt" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Display list of uploaded reports */}
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderReportItem}
      />

      {/* Confirmation delete Dialog */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete</Text>
            <Text style={styles.modalText}>
              Are you sure you want to permanently delete this file?
            </Text>
            <View style={styles.buttonContainer}>
              <Button title="No" onPress={handleClose} />
              <View style={styles.buttonSpacing} />
              <Button
                title="Yes"
                onPress={() => {
                  if (reportToDelete) {
                    handleDeleteReport(reportToDelete);
                  }
                }}
                color="#f00" // Optional: Red color for the "Yes" button
              />
            </View>
          </View>
        </View>
      </Modal>
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
});

export default Report;
