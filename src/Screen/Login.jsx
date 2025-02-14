import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../Context/AuthContext';

const LoginScreen = ({ navigation }) => {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('hospital');
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useContext(AuthContext);

    const handleLogin = () => {
        if (!loginId || !password) {
            Alert.alert('Error', 'Please enter both login ID and password');
            return;
        }

        // Create a user object
        const user = {
            id: loginId,
            role: role,
        };

        // Call the login function from AuthContext
        login(user);

        if (role === 'admin') {
            navigation.navigate('AdminHome');
        } else {
            navigation.navigate('HospitalHome');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Logo Section */}
            <Image
                source={require('../Assets/jeevanilogo.png')} // Replace with your logo path
                style={styles.logo}
            />

            {/* Login Form */}
            <View style={styles.formContainer}>
                <Text style={styles.title}>Login</Text>

                {/* Role Selection */}
                <View style={styles.inputContainer}>
                    <Icon name="account-key" size={20} color="#2196F3" style={styles.icon} />
                    <Picker
                        selectedValue={role}
                        style={styles.picker}
                        onValueChange={(itemValue) => setRole(itemValue)}>
                        <Picker.Item label="Hospital" value="hospital" />
                        <Picker.Item label="Admin" value="admin" />
                    </Picker>
                </View>

                {/* Login ID */}
                <View style={styles.inputContainer}>
                    <Icon name="account" size={20} color="#2196F3" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Login ID"
                        placeholderTextColor="#999"
                        value={loginId}
                        onChangeText={setLoginId}
                    />
                </View>

                {/* Password */}
                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color="#2196F3" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.passwordIcon}>
                        <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#2196F3" />
                    </TouchableOpacity>
                </View>

                {/* Login Button */}
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <Text style={styles.footerText}>Developed by Team Square</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    logo: {
        width: 150,
        height: 250,
        alignSelf: 'center',
        marginVertical: 30,
    },
    formContainer: {
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2196F3',
        textAlign: 'center',
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: '#000',
    },
    picker: {
        flex: 1,
        height: 50,
        color: '#000',
    },
    passwordIcon: {
        padding: 10,
    },
    loginButton: {
        backgroundColor: '#2196F3',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footerText: {
        textAlign: 'center',
        color: '#666',
        marginTop: 30,
        fontSize: 12,
    },
});

export default LoginScreen;