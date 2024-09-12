import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity ,Image, Modal} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import MedicineForm from "./MedicineForm";

const TreatmentPlanScreen = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [usermodalVisible, setUserModalVisible] = useState(false);

  const handleMenuClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleMenuClose = () => {
    setIsMenuVisible(false);
  };

  const handleDelete = () => {
    // Handle Delete action
    console.log("Delete action selected");
    handleMenuClose();
  };
  const handleCloseModal = () => {
    setModalVisible(false);
};

const handleSaveVitals = () => {
    // Add your save logic here
    setModalVisible(false);
};

  return (
    <View style={styles.container}>
      {/* Treatment Card */}
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Icon name="medication" size={30} color="orange" />
          <View style={styles.medicineInfo}>
            <Text style={styles.medicineName}>Alfacalcidol</Text>

            <View style={styles.detailRow}>
              {/* <Icon name="schedule" size={20} color="grey" /> */}
              <Text style={styles.detailText}>
                Duration:
                <Text style={styles.boldText}> 1 day</Text>
              </Text>
            </View>

            <View style={styles.detailRow}>
              {/* <Icon name="layers" size={20} color="grey" /> */}
              <Text style={styles.detailText}>
                No. of Doses:
                <Text style={styles.boldText}>2mg</Text>
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="schedule" size={20} color="grey" />
              <Text style={styles.detailText}>
                Time: <Text style={styles.boldText}>Before Meal</Text>
              </Text>
            </View>
          </View>
          <View style={styles.prescribedByContainer}>
            <Text style={styles.prescribedText}>Prescribed by</Text>
            <TouchableOpacity onPress={() => setUserModalVisible(true)}>
        <Text style={styles.doctorName}>Laxmi</Text>
      </TouchableOpacity>

          </View>
          <View style={styles.moreIconContainer}>
            <TouchableOpacity style={styles.moreIcon} onPress={handleMenuClick}>
              <Icon
                name="more-vert" 
                size={24}
                color="grey"
              />
            </TouchableOpacity>
            {isMenuVisible && (
              <TouchableOpacity
                onPress={handleDelete}
                style={styles.deleteOption}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* Add Treatment Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Treatment</Text>
      </TouchableOpacity>
      
      <MedicineForm visible={modalVisible} onClose={handleCloseModal} onSave={handleSaveVitals} />

{/* Modal component */}
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
              <Image
                source={require('../../../assets/person.avif')} // Replace with the actual image URL
                style={styles.profileImage}
              />
              <Text style={styles.doctorNameModal}>Laxmi</Text>
              <Text style={styles.doctorID}>ID: 566</Text>
              <Text style={styles.gender}>F</Text>
            </View>

            {/* Doctor Details */}
            <View style={styles.detailsContainer}>
    <View style={styles.detailsRow}>
        <Text style={styles.labelText}>DOB</Text>
        <Text style={styles.colonText}>:</Text>
        <Text style={styles.detailsValue}>16-08-1987</Text>
    </View>
    <View style={styles.detailsRow}>
        <Text style={styles.labelText}>Dpt</Text>
        <Text style={styles.colonText}>:</Text>
        <Text style={styles.detailsValue}>Emergency Department</Text>
    </View>
    <View style={styles.detailsRow}>
        <Text style={styles.labelText}>Role</Text>
        <Text style={styles.colonText}>:</Text>
        <Text style={styles.detailsValue}>Doctor</Text>
    </View>
    <View style={styles.detailsRow}>
        <Text style={styles.labelText}>Mobile No</Text>
        <Text style={styles.colonText}>:</Text>
        <Text style={styles.detailsValue}>9876665753</Text>
    </View>
    <View style={styles.detailsRow}>
        <Text style={styles.labelText}>Address</Text>
        <Text style={styles.colonText}>:</Text>
        <Text style={styles.detailsValue}>HYD</Text>
    </View>
</View>


            {/* Close Button */}
            <TouchableOpacity onPress={() => setUserModalVisible(false)} style={styles.closeButton}>
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
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: "90%",
    elevation: 5,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  medicineInfo: {
    flex: 1,
    marginLeft: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 5,
  },
  prescribedByContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: 10,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detailText: {
    fontSize: 14,
    marginLeft: 0,
    color: "grey",
  },
  boldText: {
    fontWeight: "bold", // Applies bold to the inner text
  },
  prescribedText: {
    fontSize: 12,
    color: "grey",
    textAlign: "right",
  },
  doctorName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 50,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  moreIconContainer: {
    position: "relative",
  },
  moreIcon: {
    padding: 5,
  },
  deleteOption: {
    position: "absolute",
    right: 0,
    top: 30, // Adjust the top position as needed
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    zIndex: 1,
    width: "150%",
  },
  deleteText: {
    fontSize: 14,
    color: "#d9534f",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Modal background overlay
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    // padding: 20,
    width: '90%',
    elevation: 5,
  },
  popupcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    // padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor:"#98cc94",
    width:"100%"
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  doctorNameModal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  doctorID: {
    fontSize: 16,
    color: '#666',
  },
  gender: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 20,
    padding:10
  },
  detailsText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  closeButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
 
detailsRow: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center', // Ensures that all text is vertically aligned
},
labelText: {
    fontWeight: 'bold',
    width: 100, // Ensure consistent alignment across labels
    textAlign: 'right',
    paddingRight: 10,
    color: '#000',
},
colonText: {
    width: 10, // Width for colon to align correctly
    textAlign: 'center', // Ensures the colon stays centered between label and value
},
detailsValue: {
    color: '#555',
    flexShrink: 1, // Allows wrapping if needed for long text
},
});

export default TreatmentPlanScreen;
