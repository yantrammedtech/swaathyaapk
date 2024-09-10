import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Icon from 'react-native-vector-icons/MaterialIcons';
import { authFetch } from "../../axios/authFetch";
import { useEffect } from "react";
import BasicTabs from "../Emergency/BasicTabs";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');


const PatientProfile = ({ route }) => {
    const dispatch = useDispatch()
    const { patientId } = route.params;
    const navigation = useNavigation()

    const user = useSelector((state) => {
        return state.currentUserData
    })
    const currentPatientData = useSelector((state) => {
        return state.currentPatientData
    })

    const handleBackPress = () => {
        console.log("Can go back:", navigation.canGoBack()); // Check if it returns true or false
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate('EmergencyDashboard');
        }
    };



    const getCurrentPatient = async () => {
        const response = await authFetch(
            `patient/${user.hospitalID}/patients/single/${patientId}`,
            user.token
        );
        if (response.message == "success") {
            dispatch({ type: "currentPatientData", payload: response.patient })
        }
    }

    useEffect(() => {
        getCurrentPatient()
    }, [])


    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    const backgroundColor = getRandomColor();
    console.log("patietdata==", currentPatientData)
    return (
        <View style={styles.container}>


            {/* Patient Information Section */}
            <View style={styles.patientInfoContainer}>
                {currentPatientData?.imageURL ? (
                    <Image source={{ uri: currentPatientData.imageURL }} style={styles.profileImage} />
                ) : (
                    <View style={[styles.placeholderImage, { backgroundColor }]}>
                        <Text style={styles.placeholderText}>
                            {currentPatientData?.pName ? currentPatientData.pName.charAt(0).toUpperCase() : ''}
                        </Text>
                    </View>
                )}
                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Name</Text>
                        <Text style={styles.colon}>:</Text>
                        <Text style={styles.value}>{currentPatientData?.pName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>ID</Text>
                        <Text style={styles.colon}>:</Text>
                        <Text style={styles.value}>{currentPatientData?.id}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Doctor Name</Text>
                        <Text style={styles.colon}>:</Text>
                        <Text style={styles.value}>
                            {currentPatientData?.doctorName ? currentPatientData.doctorName : 'Unassigned'}
                        </Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Admit Date</Text>
                        <Text style={styles.colon}>:</Text>
                        <Text style={styles.value}>
                            {currentPatientData?.addedOn ? new Date(currentPatientData.startTime).toLocaleDateString() : 'Not Available'}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.tabsContainer}>
                <BasicTabs />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1977f3',
        paddingTop: 1, // Adjust for header height
        // paddingHorizontal: 20,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#1977f3',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    backIcon: {
        position: 'absolute',
        left: 10,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    patientInfoContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginBottom: 20,
    },
    infoContainer: {
        width: '100%', // Ensures that the container takes full width
        alignItems: 'center', // Center-aligns the content horizontally
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '80%',
    },
    label: {
        fontSize: 18,
        color: '#fff',
        width: 120, // Adjust width as needed to align labels
    },
    colon: {
        fontSize: 18,
        color: '#fff',
        paddingHorizontal: 5, // Adjust the spacing around the colon
    },
    value: {
        fontSize: 18,
        color: '#fff',
        flex: 1,
    },
    placeholderImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    placeholderText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: "bold",
    },
    tabsContainer: {
        backgroundColor: '#fff',//#fff
        borderRadius: 24,
        padding: 10,
        marginTop: 20,
        height: height * 0.7,
        alignItems: 'center',
        width: "100%",
    }
})
export default PatientProfile