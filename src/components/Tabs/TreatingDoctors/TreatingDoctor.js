import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { authFetch } from '../../../axios/authFetch';

const TreatingDoctor = () => {
    const user = useSelector((state) => state.currentUserData);
    const currentPatient = useSelector((state) => state.currentPatientData);
    const patientTimeLineID = currentPatient?.patientTimeLineID;

  const [selectedList, setSelectedList] = React.useState([]);


  const getAllDoctors = useCallback(async () => {
    const patientDoctorResponse = await authFetch(
      `doctor/${user.hospitalID}/${patientTimeLineID}/all`,
      user.token
    );
    if (patientDoctorResponse.message == 'success') {
      setSelectedList(patientDoctorResponse.data);
    }
  }, [patientTimeLineID, user.hospitalID, user.token]);

  React.useEffect(() => {
    if (user.token && patientTimeLineID ) {
      getAllDoctors();
    }
  }, [user, patientTimeLineID, getAllDoctors]);

  
function compareDates(a, b) {
    return (
      new Date(b.addedOn || "").valueOf() - new Date(a.addedOn || "").valueOf()
    );
  }
  console.log("selectedList==",selectedList)

  return (
    <ScrollView style={styles.container}>
    
      {/* Doctor Card */}
      {selectedList.sort(compareDates).map((each) => (
        <>
         <View style={styles.doctorCard}>
        <View style={styles.doctorInfo}>
         
          <View style={styles.doctorDetails}>
            <Text style={styles.specialty}>{each.department}</Text>
            <Text style={styles.doctorName}>{each.firstName}</Text>
          </View>
        </View>

        <View style={styles.doctorMeta}>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>Category: {each.category}</Text>
          </View>
         {each?.purpose && (
             <View style={styles.metaRow}>
             <Text style={styles.metaText}>Reason: {each?.purpose}</Text>
           </View>
         )}
          <View style={styles.metaRow}>
            <Text style={styles.metaText}> {new Date(each.assignedDate || "").toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: false,
                      month: "short",
                      year: "2-digit",
                      day: "numeric",
                    })}</Text>
          </View>
        </View>

        {/* Active Status */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}> {each.active ? "Active" : "Inactive"}</Text>
          {/* <Ionicons name="md-checkmark-circle" size={20} color="green" /> */}
        </View>
      </View>

        </>
      ))}
     

      
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Doctor</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginHorizontal: 20,
  },
  activeTab: {
    borderBottomColor: '#007bff',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  doctorCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  doctorDetails: {
    flexDirection: 'column',
  },
  specialty: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  doctorName: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',

  },
  doctorMeta: {
    marginTop: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  metaText: {
    fontSize: 14,
    marginLeft: 5,
    color: 'gray',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  statusText: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TreatingDoctor;
