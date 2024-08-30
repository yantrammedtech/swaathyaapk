import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 280,
    height: 161,
    marginBottom: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1977f3",
    letterSpacing: 8,
  },
});

const Home = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleLogin}>
      <Image
        source={require("../../assets/logo_apk.png")}
        style={styles.logo}
      />
      <Text style={styles.text}>Swaasthya</Text>
    </TouchableOpacity>
  );
};

export default Home;
