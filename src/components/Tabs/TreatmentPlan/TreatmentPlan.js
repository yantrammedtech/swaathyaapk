import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity , Modal} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import MedicineForm from "./MedicineForm";

const TreatmentPlanScreen = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
            <Text style={styles.doctorName}>Laxmi</Text>
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
    padding: 20,
    width: '90%',
    elevation: 5,
  },
});

export default TreatmentPlanScreen;
