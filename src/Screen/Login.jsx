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

        const user = { id: loginId, role };
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
            <View>

                <Image source={require('../Assets/jeevanilogo.png')} style={styles.logo} />

            </View>

            {/* Login Form */}
            <View style={styles.formContainer}>
                <Text style={styles.title}>Login</Text>

                {/* Role Selection */}
                <View style={styles.inputContainer}>
                    <Icon name="account-key" size={20} color="#4CAF50" style={styles.icon} />
                    <Picker selectedValue={role} style={styles.picker} onValueChange={setRole}>
                        <Picker.Item label="Hospital" value="hospital" />
                        <Picker.Item label="Admin" value="admin" />
                    </Picker>
                </View>

                {/* Login ID */}
                <View style={styles.inputContainer}>
                    <Icon name="account" size={20} color="#4CAF50" style={styles.icon} />
                    <TextInput style={styles.input} placeholder="Login ID" placeholderTextColor="#666" value={loginId} onChangeText={setLoginId} />
                </View>

                {/* Password */}
                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color="#4CAF50" style={styles.icon} />
                    <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#666" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.passwordIcon}>
                        <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#4CAF50" />
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
        backgroundColor: '#E8F5E9',
        padding: 20,
        height: '100vh',
    },
    logoTag: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 0,
    },
    logo: {
        width: 120,
        height: 120,
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 0,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#388E3C',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#A5D6A7',
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
        backgroundColor: '#00796B',
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