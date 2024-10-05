import React, { useEffect } from "react";
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

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 2000); // 2000 milliseconds = 2 seconds

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [navigation]);

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
