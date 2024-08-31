import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icon for eye visibility
import CheckBox from 'react-native-check-box'
const { height } = Dimensions.get('window'); // Get screen height
import logo from '../../assets/logo_apk.png';
import tweenFrame from '../../assets/tween-frame.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postAxios } from '../../axios/usePost';
import { useDispatch } from 'react-redux'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        paddingTop: 10
    },
    logo: {
        width: 140,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    title: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#0057FF',
        letterSpacing: 8,
    },
    doctorImage: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
        marginBottom: 30,
    },
    bgminputContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: "#1977f3",
        padding: 10,
        height: height * 0.5,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        justifyContent: 'center',
    },
    inputContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        justifyContent: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
    },
    passwordInput: {
        flex: 1,
        height: 50,
        paddingHorizontal: 10,
    },
    eyeIcon: {
        padding: 10,
    },
    forgotPassword: {
        alignSelf: 'flex-start',
        marginBottom: 15,
        color: '#0057FF',
        paddingLeft: 5,
        fontWeight: "bold"
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    label: {
        margin: 8,
        color: '#000000',
    },
    button: {
        backgroundColor: '#1977f3',
        width: '100%',
        padding: 15,
        alignItems: 'center',
        borderRadius: 25,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});




// Existing styles code...

const LoginScreen = ({ navigation }) => { // Receive navigation prop here
    const dispatch = useDispatch()
    // State to manage form data
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        keepSignedIn: true,
    });
    const [isSelected, setSelection] = useState(true);

    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async () => {
        const response = await postAxios('user/emailLogin', {
            email: formData.email,
            password: formData.password,
        });
        // console.log("response", response)
        const key = "Token"
        if (response.message == "success") {
            await AsyncStorage.setItem(key, response.token);
            dispatch({ type: "currentUserData", payload: response })
            navigation.navigate('dashboard');
        }
    }

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.title}>Swaasthya</Text>
            <Image source={tweenFrame} style={styles.doctorImage} />
            <View style={styles.bgminputContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        keyboardType="email-address"
                        value={formData.email}
                        onChangeText={(value) => handleInputChange('email', value)}
                    />
                    <View style={styles.passwordInputContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Password"
                            secureTextEntry={!showPassword}
                            value={formData.password}
                            onChangeText={(value) => handleInputChange('password', value)}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Icon
                                name={showPassword ? 'eye-slash' : 'eye'}
                                size={20}
                                color="#000"
                                style={styles.eyeIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Forgot Password</Text>
                    </TouchableOpacity>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            isChecked={isSelected}
                            onClick={() => setSelection(!isSelected)}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>Keep me signed in</Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;
