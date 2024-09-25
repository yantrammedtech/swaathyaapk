import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, Text, StyleSheet ,TextInput, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Other = () => {
    const [text, setText] = useState('');
    const navigation = useNavigation()

    const handleNext = () => {
        navigation.navigate("OtPreOP")
      }
    return (
        <View style={styles.container}>
          <View style={styles.tagContainer}>
            <View style={styles.tag}>
              <Icon name="check" size={24} color="#007AFF" />
              <Text style={styles.tagText}>Hemat Disorder </Text>
            </View>
    
            <View style={styles.tag}>
              <Icon name="check" size={24} color="#007AFF" />
    
              <Text style={styles.tagText}>Steroid use</Text>
            </View>
    
            <View style={styles.tag}>
              <Icon name="check" size={24} color="#007AFF" />
    
              <Text style={styles.tagText}>Radiotherapy</Text>
            </View>
    
            <View style={styles.tag}>
              <Icon name="check" size={24} color="#007AFF" />
    
              <Text style={styles.tagText}>Pregnant 
              </Text>
            </View>
    
            <View style={styles.tag}>
              <Icon name="check" size={24} color="#007AFF" />
    
              <Text style={styles.tagText}>Chemotherapy 
              </Text>
            </View>

            <View style={styles.tag}>
              <Icon name="check" size={24} color="#007AFF" />
    
              <Text style={styles.tagText}>Intraop urine output
 
              </Text>
            </View>

           
           
          </View>

          <Text  style={styles.heading}>Examination Finding Notes</Text>
            <View>
            <TextInput
        style={styles.textInput}
        placeholder="Type here"
        value={text}
        onChangeText={(value) => setText(value)}
      />
            </View>
            
<TouchableOpacity style={styles.savebutton} onPress={handleNext}>
 <Text style={styles.buttonText}>Next</Text>
</TouchableOpacity>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
      },
      title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: "#FFA500", // Orange line
        paddingBottom: 5,
      },
      tagContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
      },
      tag: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e8f1fe",
    
        borderWidth: 1,
        borderColor: "#007AFF",
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginRight: 10,
        marginBottom: 10,
      },
      tagText: {
        color: "#007AFF",
        fontSize: 14,
        fontWeight: "500",
        marginLeft: 5,
      },
      heading:{
        color:"#000",
        fontSize:18,
        fontWeight:'bold',
        marginTop:10,
        marginBottom:20,
      },
      textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 16,
      },
      savebutton: {
        backgroundColor: "#007BFF", // Blue background color
        paddingVertical: 12, // Vertical padding for the button
        paddingHorizontal: 24, // Horizontal padding for the button
        borderRadius: 4, // Rounded corners
        alignItems: "center", // Center the text horizontally
        justifyContent: "center", // Center the text vertically
        elevation: 3, // Add shadow for Android
        shadowColor: "#000", // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
        shadowOpacity: 0.2, // Shadow opacity for iOS
        shadowRadius: 4, // Shadow blur radius for iOS
        marginBottom: 25,
      },
      buttonText: {
        color: "#FFFFFF", // White text color
        fontSize: 16, // Font size
        fontWeight: "bold", // Bold text
      },
    });

export default Other
