import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import MedicineForm from "./MedicineForm";
import { useSelector } from "react-redux";
import { authFetch } from "../../../axios/authFetch";

const TreatmentPlanScreen = () => {
  const user = useSelector((state) => state.currentUserData);
  const currentPatient = useSelector((state) => state.currentPatientData);
  const patientTimeLineID = currentPatient?.patientTimeLineID;

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [usermodalVisible, setUserModalVisible] = useState(false);
  const [medicineList, setMedicineList] = useState([]);
  const [viewDepartment, setViewDepartment] = useState(null);

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

  const handleMenuClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleMenuClose = () => {
    setIsMenuVisible(false);
  };

  const handleDelete = () => {
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

  const getAllMedicine = async () => {
    const response = await authFetch(
      `medicine/${patientTimeLineID}`,
      user.token
    );

    if (response.message === "success") {
      setMedicineList(response.medicines);
    }
  };

  React.useEffect(() => {
    if (user.token && patientTimeLineID) {
      getAllMedicine();
    }
  }, [user, currentPatient]);

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContentContainer}
    >
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Treatment</Text>
      </TouchableOpacity>

      {/* Treatment Card */}

      {medicineList?.map((medicine) => (
        <View style={styles.card} key={medicine.id}>
          <View style={styles.headerRow}>
            <Icon name="medication" size={30} color="orange" />
            <View style={styles.medicineInfo}>
              {/* Medicine Name */}
              <Text style={styles.medicineName}>{medicine.medicineName}</Text>

              {/* Duration */}
              <View style={styles.detailRow}>
                <Text style={styles.detailText}>
                  Duration:
                  <Text style={styles.boldText}>
                    {" "}
                    {medicine.daysCount} day{medicine.daysCount > 1 ? "s" : ""}
                  </Text>
                </Text>
              </View>

              {/* No. of Doses */}
              <View style={styles.detailRow}>
                <Text style={styles.detailText}>
                  No. of Doses:
                  <Text style={styles.boldText}>
                    {medicine.doseCount} {medicine.doseUnit}
                  </Text>
                </Text>
              </View>

              {/* Medication Time */}
              <View style={styles.detailRow}>
                <Icon name="schedule" size={20} color="grey" />
                <Text style={styles.detailText}>
                  Time:{" "}
                  <Text style={styles.boldText}>{medicine.medicationTime}</Text>
                </Text>
              </View>
            </View>

            {/* Prescribed By Section */}
            <View style={styles.prescribedByContainer}>
              <Text style={styles.prescribedText}>Prescribed by</Text>
              <TouchableOpacity onPress={() => setUserModalVisible(true)}>
                <Text style={styles.doctorName}>{medicine.userID}</Text>
              </TouchableOpacity>
            </View>

            {/* More Icon Section */}
            <View style={styles.moreIconContainer}>
              <TouchableOpacity style={styles.moreIcon} onPress={() => {}}>
                {/* <TouchableOpacity style={styles.moreIcon} onPress={handleMenuClick}> */}

                <Icon name="more-vert" size={24} color="grey" />
              </TouchableOpacity>
              {isMenuVisible && (
                <TouchableOpacity
                  onPress={() => handleDelete(medicine.id)}
                  style={styles.deleteOption}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      ))}

      {/* Add Treatment Button */}

      <MedicineForm
        visible={modalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveVitals}
      />

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
                  {user.dob.split("T")[0]}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: "center", // Align items vertically
    alignItems: "center", // Align items horizontally
    padding: 20, // Add padding if necessary
  },
  card: {
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: "100%",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1977f3",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  addButtonText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Modal background overlay
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    // padding: 20,
    width: "90%",
    elevation: 5,
  },
  popupcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
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
});

export default TreatmentPlanScreen;
