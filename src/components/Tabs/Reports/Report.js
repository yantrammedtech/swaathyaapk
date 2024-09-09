import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, Linking,FlatList  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For icons
import PdfIcon from 'react-native-vector-icons/FontAwesome'; // PDF icon from FontAwesome
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';


const Report = () => {
    const navigation = useNavigation()
    const [reports, setReports] = useState([
        {
          id: 1,
          fileName: 'CRP test report.pdf',
          mimeType: 'application/pdf',
          addedOn: new Date(),
          fileURL: 'https://example.com/crp-test-report.pdf',
          userID: 'Laxmi',
        },
      ]);
      
      const handleUploadPress = async () => {
        try {
          const res = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
          console.log("res=======", res);
          
          // Check if the user cancelled the selection
          if (res.canceled) {
            Alert.alert('Cancelled', 'File selection was cancelled');
            return;
          }
          
          // Extract file details from the assets array
          const { assets } = res;
          if (assets.length > 0) {
            const file = assets[0]; // Assuming single file selection
            const newReport = {
              id: reports.length + 1,
              fileName: file.name,
              mimeType: file.mimeType,
              addedOn: new Date(),
              fileURL: file.uri,
              userID: 'User', // Example user ID
            };
      
            setReports([...reports, newReport]);
            Alert.alert('Success', 'File uploaded successfully');
          } else {
            Alert.alert('Error', 'No file selected');
          }
        } catch (err) {
          Alert.alert('Error', 'An error occurred: ' + err);
        }
      };
      
     
const handleDownloadPress = async (fileURL) => {
    try {
      // Show an alert indicating that the download button was pressed
      Alert.alert('Download', 'Download button pressed');
      
      // Attempt to open the file URL
      const supported = await Linking.canOpenURL(fileURL);
  
      if (supported) {
        await Linking.openURL(fileURL);
      } else {
        Alert.alert('Error', 'No application found to handle this file');
      }
    } catch (error) {
      // Handle any errors that occurred during URL 
      console.error('Failed to open URL:', error); 
      Alert.alert('Error', `Failed to open URL: ${error.message}`);
    }
  };
    
      const handleDeletePress = (reportId) => {
        // Function to handle file deletion
        Alert.alert(
          'Delete Report',
          'Are you sure you want to delete this report?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => {
                setReports(reports.filter((report) => report.id !== reportId)); // Remove the report from the state
                Alert.alert('Deleted', 'Report deleted successfully');
              },
            },
          ]
        );
      };
      const handleViewPress = (fileURL) => {
        console.log("fileURL===",fileURL)
        navigation.navigate('PDFViewer', { fileURL });
      };
      

      const renderReportItem = ({ item }) => {
        console.log('File name:', item.fileName);  // Check the fileName
      
        return (
          <View style={styles.fileContainer}>
            <PdfIcon name="file-pdf-o" size={50} color="#e74c3c" />
            <View style={styles.fileInfo}>
              <Text style={styles.fileName}>{item.fileName ? item.fileName : 'No file name'}</Text>
              <Text style={styles.fileDetails}>ICD Code: ICD-10</Text>
              <Text style={styles.fileSubmitter}>Submitted by: {item.userID}</Text>
            </View>
      
            {/* Download and Delete Icons */}
            <View style={styles.actionIcons}>
            <TouchableOpacity onPress={() => handleViewPress(item.fileURL)}>
            <Icon name="visibility" size={20} color="#000" /> 
          </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDownloadPress(item.fileURL)}>
                <Icon name="file-download" size={20} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeletePress(item.id)}>
                <Icon name="delete" size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        );
      };
      
      

  return (
    <View style={styles.container}>
      {/* Upload Section */}
      <View style={styles.uploadContainer}>
        <Icon name="cloud-upload" size={50} color="#ccc" />
        <Text style={styles.uploadText}>Browse and choose the files you want to upload from your computer</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={handleUploadPress}>
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>



      {/* Display list of uploaded reports */}
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderReportItem}
      />

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  uploadContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    padding: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  uploadText: {
    textAlign: 'center',
    color: '#777',
    marginVertical: 10,
  },
  uploadButton: {
    backgroundColor: '#3e83ff',
    padding: 10,
    borderRadius: 50,
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  fileInfo: {
    flex: 1,
    marginLeft: 10,
  },
  fileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fileDetails: {
    fontSize: 14,
    color: '#555',
  },
  fileSubmitter: {
    fontSize: 14,
    color: '#888',
  },
  actionIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 70,
  },
});

export default Report;

//pending download button and view button due  to package