import { View, Text, Image,Modal, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import {  useSelector } from "react-redux"
import Icon from 'react-native-vector-icons/MaterialIcons';
import {  useState } from "react";
import { useNavigation } from "@react-navigation/native";
import OtBasicTabs from './OtBasicTabs'
const { height } = Dimensions.get('window');


const OtPatientProfile = () => {
   
    const navigation = useNavigation()

    const [modalVisible, setModalVisible] = useState(false);

   
    const currentPatientData = useSelector((state) => {
        return state.currentPatientData
    })

   




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
                    {/* <View  style={styles.shakecontainer}>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconContainer}>
       
                    <Image source={require("../../assets/transfer/X.png")} style={styles.reverseImage} />
      </TouchableOpacity>
                    </View> */}
                </View>
            </View>

            <View style={styles.tabsContainer}>
                <OtBasicTabs />
            </View>

            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Icon name="close" size={30} color="black" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Select Options</Text>
            
            {/* Options */}
            <View style={styles.optionContainer}>
  <View style={styles.row}>
  <TouchableOpacity
      style={styles.option}
      onPress={() => navigation.navigate('Handshake')} 
    >
      <Image source={require("../../assets/transfer/Transfer.png")} style={styles.optionIcon} />
      <Text style={styles.optionText}>Hand Shake</Text>
    </TouchableOpacity>

    <TouchableOpacity 
    style={styles.option}
    onPress={() => navigation.navigate('TransferPatient')} 

    >
      <Image source={require("../../assets/transfer/Twotransfer.png")} style={styles.optionIcon} />
      <Text style={styles.optionText}>Transfer</Text>
    </TouchableOpacity>
  </View>

  <View style={styles.row}>
    <TouchableOpacity
     style={styles.option}
    onPress={() => navigation.navigate('RequestSurgery')} 

     >
      <Image source={require("../../assets/transfer/Threerequest.png")} style={styles.optionIcon} />
      <Text style={styles.optionText}>Request</Text>
    </TouchableOpacity>

    <TouchableOpacity 
    style={styles.option}
    onPress={() => navigation.navigate('DischargePatient')} 

    >
      <Image source={require("../../assets/transfer/medical-icon_i-outpatient.png")} style={styles.optionIcon} />
      <Text style={styles.optionText}>Discharge</Text>
    </TouchableOpacity>
  </View>
</View>

          </View>
        </View>
      </Modal>

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
    },
    shakecontainer: {
        flexDirection: 'row', // Ensure child elements are aligned horizontally
        justifyContent: 'flex-end', // Align elements to the right
        alignItems: 'center', // Center align vertically
        width: '100%', // Ensure the container takes the full width
      },
      iconContainer: {
        flexDirection: 'row', // Ensure icon and text are aligned horizontally
        alignItems: 'center',
        marginRight:20,
      },
      modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
      },
      closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
      },
      option: {
        alignItems: 'center',
        marginVertical: 15,
      },
      optionIcon: {
        width: 50,
        height: 50,
        marginBottom: 10,
      },
      optionText: {
        fontSize: 16,
        textAlign: 'center',
      },
      reverseImage:{
        height:30,
        width:30,
        resizeMode: 'contain',
      }
})
export default OtPatientProfile