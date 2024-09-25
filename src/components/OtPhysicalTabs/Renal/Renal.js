import React from 'react'
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Renal = () => {
    return (
        <View style={styles.container}>
          <View style={styles.tagContainer}>
            <View style={styles.tag}>
              <Icon name="check" size={24} color="#007AFF" />
              <Text style={styles.tagText}>Renal Insufficiency</Text>
            </View>
    
            <View style={styles.tag}>
              <Icon name="check" size={24} color="#007AFF" />
    
              <Text style={styles.tagText}>UTI</Text>
            </View>
    
            <View style={styles.tag}>
              <Icon name="check" size={24} color="#007AFF" />
    
              <Text style={styles.tagText}>Haemateria</Text>
            </View>
    
            <View style={styles.tag}>
              <Icon name="check" size={24} color="#007AFF" />
    
              <Text style={styles.tagText}>Pituitary Disorder
              </Text>
            </View>
    
            <View style={styles.tag}>
              <Icon name="check" size={24} color="#007AFF" />
    
              <Text style={styles.tagText}>Aorenocortical Insuff
              </Text>
            </View>
          </View>
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
    });

export default Renal
