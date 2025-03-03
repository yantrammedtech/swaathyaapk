import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'; // Added Image import

import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { authFetch } from '../../axios/authFetch';
import { patientStatus, Role_NAME } from '../../utility/role';
import BasicTabs from '../Emergency/BasicTabs';

const InPatientsList = () => {
    const navigation = useNavigation();
    const [recentPatient, setRecentPatient] = useState([])
    const [activeTab, setActiveTab] = useState('LatestPatients');

  const [allList, setAllList] = React.useState([]);
  const [search, setSearch] = React.useState("");



    const user = useSelector((state) => {
        return state.currentUserData

    })


    const getRecentData = async () => {

        const response = await authFetch(
            `patient/${user.hospitalID}/patients/recent/${patientStatus.inpatient}?userID=${user.id}&role=${user.role}`,
            user.token
        );
        if (response.message == "success") {
            setRecentPatient(response.patients);
        }
    }

    const getAllData = async () => {

        const response = await authFetch(
            `patient/${user.hospitalID}/patients/${patientStatus.inpatient}?role=${user.role}&userID=${user.id}`,
            user.token
        );
        if (response.message == "success") {
            // Assuming you are receiving response.patients as the patient list
            const sortedPatients = response.patients.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
            setRecentPatient(sortedPatients);
        }
    }

    useEffect(() => {
        if (activeTab == "LatestPatients") {
            getRecentData()
        } else {
            getAllData()
        }
    }, [activeTab])


    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const renderPatient = ({ item }) => {
        const backgroundColor = getRandomColor();
        return (
            <TouchableOpacity
                style={styles.recentPatientContainer}
                onPress={() =>
                    navigation.navigate('CommonPatientProfile', {
                        patientId: item.id,
                        patientName: item.pName,
                        patientImage: item.photo,
                    })
                }
            >
                <View style={styles.recentPatientRow}>
                    {item.imageURL ? (
                        <Image source={{ uri: item.imageURL }} style={styles.profileimage} />
                    ) : (
                        <View style={[styles.placeholderImage, { backgroundColor }]}>
                            <Text style={styles.placeholderText}>
                                {item.pName ? item.pName.charAt(0).toUpperCase() : ''}
                            </Text>
                        </View>
                    )}
                    <View style={styles.recentPatientInfoContainer}>
                        <Text style={styles.recentPatient}>
                            Patient Name:
                            <Text style={styles.recentPatientName}> {item.pName.trim()}</Text>
                        </Text>
                        <View style={styles.recentPatientDateRow}>
                            <Icon name="access-time" size={20} color="#666" />
                            <Text style={styles.recentPatientDateText}>
                                {new Date(item.startTime).toDateString()} {new Date(item.startTime).toLocaleTimeString()}
                            </Text>

                        </View>
                    </View>
                </View>
                <View style={styles.recentPatientRow}>
                    <Text style={styles.recentPatientUhidText}>UHID: {item.pUHID}</Text>
                    <TouchableOpacity style={styles.recentPatientCloseButton}>
                        <Icon name="arrow-upward" size={24} color="#FFA500" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };


    async function getAllPatient() {
        setAllList([]);
        const opdListResponse = await authFetch(
          `patient/${user.hospitalID}/patients/${
            String(patientStatus.outpatient) +
            '$' +
            String(patientStatus.discharged) +
            '$' +
            String(patientStatus.inpatient) +
            '$' +
            String(patientStatus.emergency)
          }?role=${Role_NAME.nurse}&userID=${user.id}`,
          user.token
        );
        if (opdListResponse.message == 'success') {
          setAllList(() => {
            return [...opdListResponse.patients];
          });
        }
      }
      React.useEffect(() => {
        if (user.token) getAllPatient();
      }, [user]);

    
const data = allList.filter((el) => String(el.phoneNumber).includes(search))
    

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.searchInputContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search patient data..."
                        value={search} 
                        onChangeText={text => setSearch(text)} 
                    />
                    <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
                </View>
            </View>

            {!search ? (
                <>
  <View style={styles.tabButtonContainer}>
                {/* Latest Patient List Tab */}
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        activeTab === 'LatestPatients' && styles.tabActiveButton
                    ]}
                    onPress={() => setActiveTab('LatestPatients')}
                >
                    <Text
                    style={[
                        styles.tabText,
                        activeTab === 'LatestPatients' && { color: 'white', fontWeight: 'bold' } // Set text color to white when active
                      ]}
                    >Latest Patient List</Text>
                </TouchableOpacity>

                {/* Active Patients List Tab */}
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        activeTab === 'ActivePatients' && styles.tabActiveButton
                    ]}
                    onPress={() => setActiveTab('ActivePatients')}
                >
                    <Text 
                    style={[
                        styles.tabText,
                        activeTab === 'ActivePatients' && { color: 'white', fontWeight: 'bold' } // Set text color to white when active
                      ]}
                    >Active Patients List</Text>
                </TouchableOpacity>
            </View>


            {/* Adjusted to center the image and added a welcome message */}
            <ScrollView contentContainerStyle={styles.content}>




                <FlatList
                    data={recentPatient}
                    renderItem={renderPatient}
                    keyExtractor={(item) => item.id.toString()}
                />

            </ScrollView>
                </>
            ) :(
                <>
                 <FlatList
                    data={data}
                    renderItem={renderPatient}
                    keyExtractor={(item) => item.id.toString()}
                />
                </>
            )}

          
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    content: {
        flexGrow: 1,

    },
    imgcontent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 350, //350 
        height: 150,//150
        marginBottom: 8,
        marginTop: 5,
    },

    cardContainer: {
        backgroundColor: "#b8d5fb",
        borderRadius: 24,
        padding: 14,
        margin: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    numberText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: '20px'
    },
    closeButton: {
        width: 36,
        height: 36,
        backgroundColor: '#fff',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',

    },
    rotatedIcon: {
        transform: [{ rotate: '30deg' }],
    },
    rotatedIcon2: {
        transform: [{ rotate: '90deg' }],
        textAlign: "right",
    },
    subText: {
        marginTop: 8,
        fontSize: 16,
        width: "180px",
        color: '#fff',
    },
    imageContainer: {
        flexDirection: 'row',
        marginTop: 16,
    },
    images: {
        width: 20,
        height: 20,
        borderRadius: 25,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    headingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    seeAllText: {
        fontSize: 14,
        color: '#007BFF', // This color can be adjusted as needed
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderWidth: 1,
        borderColor: '#bebebe',
        borderRadius: 16,
        marginVertical: 8,
        margin: "15px"
    },
    personImage: {
        width: 70,
        height: 70,
        borderRadius: 25,
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
        marginTop: "-50px"
    },
    patientText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    dateTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',

        flex: 1,
    },
    clockIcon: {
        marginRight: 8,
    },
    dateText: {
        fontSize: 14,
        color: '#555',
    },
    subimageContainer: {
        alignItems: 'center',
        marginRight: 16,

    },

    recentPatientContainer: {
        padding: 15,
        margin: 8,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#bebebe',

    },
    recentPatientRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    recentPatientImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    recentPatientInfoContainer: {
        flex: 1,
        marginLeft: 15,
    },
    recentPatient: {
        fontSize: 15,
        fontWeight: "semibold",
    },
    recentPatientName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 2,
    },
    recentPatientDateRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recentPatientDateText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 5,
    },
    recentPatientUhidText: {
        fontSize: 13,
        color: '#333',
    },
    recentPatientCloseButton: {
        width: 36,
        height: 36,
        backgroundColor: '#fff',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '90deg' }],
    },
    placeholderImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: "bold",
    },
    profileimage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    headerContainer: {
        padding: 10,
        backgroundColor: '#f8f8f8',
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    searchInput: {
        flex: 1,
        height: '100%',
        paddingLeft: 10,
    },
    searchIcon: {
        paddingLeft: 10,
    },
    tabContainer: {
        flex: 1,
        padding: 16,
    },
    tabButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        marginHorizontal: 5,
        borderRadius: 5,
    },
    tabActiveButton: {
        backgroundColor: '#1977f3', // Blue background for active tab
    },
    tabText: {
        color: 'black',
        fontSize: 16,
    },
    tabContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabContentText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});


export default InPatientsList
