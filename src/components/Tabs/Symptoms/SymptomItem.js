




import React, { useEffect, useState } from 'react';
  
  import { View, Text, StyleSheet, TouchableOpacity,Alert ,Modal,Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { authDelete } from '../../../axios/authDelete';
import { useSelector } from 'react-redux';
import { authFetch } from '../../../axios/authFetch';

const SymptomItem = ({ id, symptomName, addedBy, updatedTime, duration,durationType }) => {
  const user = useSelector((state) => state.currentUserData);
  const currentPatient = useSelector((state) => state.currentPatientData);
  const patientTimeLineID = currentPatient?.patientTimeLineID;

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [usermodalVisible, setUserModalVisible] = useState(false);


  const handleMenuClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleMenuClose = () => {
    setIsMenuVisible(false);
  };

  

  
  const deleteSymptom = async (code) => {
    try {
      const response = await authDelete(
        `symptom/${patientTimeLineID}/${code}`,
        user.token
      );
      if (response.message === "success") {
        
    handleMenuClose();
    Alert.alert(
      "Success",
      "Symptom has been deleted successfully.",
      [{ text: "OK" }]
    );

      }
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  };

  const RoleList = {
    10007: "sAdmin",
    9999: "admin",
    4001: "doctor",
    2003: "nurse",
    1003: "staff",
    3001: "management",
    6001: "reception",
  };

  const ViewRole = RoleList[user.role];
  const [viewDepartment, setViewDepartment] = useState(null);

  
  const department = async () => {
    const id = user.departmentID;
    const departmentData = await authFetch(
      `department/singledpt/${id}`,
      user.token
    );
    setViewDepartment(departmentData.department[0].name);
  };
  useEffect(() => {
    department();
  }, []);

  let gender;
  if (user.gender === 1) {
    gender = "Male";
  } else if (user.gender === 2) {
    gender = "Female";
  } else {
    gender = "others";
  }

   
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};
const backgroundColor = getRandomColor();


  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.symptomName}>{symptomName}</Text>
        <Text style={styles.addedBy}>Added by:
        <TouchableOpacity onPress={() => setUserModalVisible(true)}>
                <Text style={styles.doctorName}>{addedBy}</Text>
              </TouchableOpacity>
        </Text>
        
        <View style={styles.moreIconContainer}>
          <TouchableOpacity style={styles.moreIcon} onPress={handleMenuClick}>
            <Icon
              name="more-vert" // Icon for action (vertical ellipsis)
              size={24}
              color="#000"
            />
          </TouchableOpacity>
          {isMenuVisible && (
            <TouchableOpacity 
            onPress={() => deleteSymptom(id)}
            style={styles.deleteOption}>
               <Icon
        name="delete" // Icon for delete action
        size={24}
        color="red" // Color of the delete icon
      />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.detailRow}>
  <Text style={styles.updatedTime}>
    Updated time: 
    <Text style={styles.semiBoldText}> { updatedTime &&
                    new Date(updatedTime).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: false,
                      month: "short",
                      year: "2-digit",
                      day: "numeric",
                    })}</Text>
  </Text>
  <Text style={styles.duration}>Duration:
  <Text style={styles.semiBoldText}> {duration} {durationType}</Text> 
  </Text>
</View>


<Modal
        animationType="slide"
        transparent={true}
        visible={usermodalVisible}
        onRequestClose={() => setUserModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {/* Doctor Profile */}
            <View style={styles.profileHeader}>
              {user?.imageURL ? (
                <Image
                  source={{ uri: user.imageURL }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={[styles.placeholderImage, { backgroundColor }]}>
                  <Text style={styles.placeholderText}>
                    {user?.pName ? user.pName.charAt(0).toUpperCase() : ""}
                  </Text>
                </View>
              )}
              <Text style={styles.doctorNameModal}>{user.firstName}</Text>
              <Text style={styles.doctorID}>ID: {user.id}</Text>
              <Text style={styles.gender}>{gender}</Text>
            </View>

            {/* Doctor Details */}
            <View style={styles.detailsContainer}>
              <View style={styles.detailsRow}>
                <Text style={styles.labelText}>DOB</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.detailsValue}>
                  {user?.dob?.split("T")[0]}
                </Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.labelText}>Dpt</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.detailsValue}>{viewDepartment}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.labelText}>Role</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.detailsValue}>{ViewRole}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.labelText}>Mobile No</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.detailsValue}>{user.phoneNo}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.labelText}>Address</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.detailsValue}>{user.address}</Text>
              </View>
            </View>

            {/* Close Button */}
            <TouchableOpacity
              onPress={() => setUserModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  symptomName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
 
  moreIcon: {
    marginLeft: 'auto',
    padding: 5,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    width:"80%"
  },
  updatedTime: {
    fontSize: 14, // You can adjust this based on your design
    color: '#777', // Example text color
  },
  semiBoldText: {
    fontWeight: '500', // Semi-bold font weight for the time
  },
  duration: {
    fontSize: 12,
    color: '#777',
  },
  moreIconContainer: {
    position: 'relative',
  },
  moreIcon: {
    padding: 5,
  },
  deleteOption: {
    position: 'absolute',
    right: 0,
    top: 30, // Adjust the top position as needed
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    zIndex: 1,
    width: '150%',
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    // padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#98cc94",
    width: "100%",
    padding: 5,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  doctorNameModal: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  doctorID: {
    fontSize: 16,
    color: "#666",
    fontWeight: "bold",
  },
  gender: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
    fontWeight: "bold",
  },
  detailsContainer: {
    width: "100%",
    marginBottom: 20,
    padding: 10,
  },
  detailsText: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
  closeButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  detailsRow: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center", // Ensures that all text is vertically aligned
  },
  labelText: {
    fontWeight: "bold",
    width: 100, // Ensure consistent alignment across labels
    textAlign: "right",
    paddingRight: 10,
    color: "#000",
  },
  colonText: {
    width: 10, // Width for colon to align correctly
    textAlign: "center", // Ensures the colon stays centered between label and value
  },
  detailsValue: {
    color: "#555",
    flexShrink: 1, // Allows wrapping if needed for long text
  },
  placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  addedBy: {
    fontSize: 15,
    color: '#555',
    marginLeft: 10,
    marginTop: 10,
    flexDirection: 'row', // Ensures the text and button align in a row
    alignItems: 'center', // Vertically aligns the text and button
  },
  doctorName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#007bff',
    marginLeft: 5, // Adds space between "Added by:" and the doctor's name
    lineHeight: 15, // Match the line height to the parent text's line height for alignment
  },
});

export default SymptomItem;
