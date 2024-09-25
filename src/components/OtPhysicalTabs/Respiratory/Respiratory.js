import React from 'react'
import { View, Text, StyleSheet , Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Respiratory = () => {
    return (
        <View style={styles.container}>
          
        
          {/* Symptoms Tags */}
          <View style={styles.tagContainer}>
            
           
            <View style={styles.tag}>
              <Icon name="check" size={24} color="#007AFF" />
              <Text style={styles.tagText}>Breathlessness</Text>
            </View>
    
           
            <View style={styles.tag}>
              <Icon name="check" size={24} color="#007AFF" />
    
              <Text style={styles.tagText}>Asthama</Text>
            </View>
    
           
            <View style={styles.tag}>
              <Icon name="check" size={24} color="#007AFF" />
    
              <Text style={styles.tagText}>Dry Cough</Text>
            </View>
            <View style={styles.tag}>
              <Icon name="check" size={24} color="#007AFF" />
    
              <Text style={styles.tagText}>Productive Cough</Text>
            </View>
            
          </View>

<Text style={styles.heading} >Mallampati Grade</Text>
<Image source={require("../../../assets/tongue.jpeg")} style={styles.image} />

        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#FFA500', // Orange line
        paddingBottom: 5,
      },
      tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
      },
      tag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e8f1fe',
        borderWidth: 1,
        borderColor: '#007AFF',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginRight: 10,
        marginBottom: 10,
      },
      tagText: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 5,
      },
      heading:{
        color:"#000",
        fontSize:18,
        fontWeight:'bold',
        marginTop:10,
        marginBottom:20,
      },
      image:{
        height:150,
        width:100,
      }
    });

export default Respiratory
