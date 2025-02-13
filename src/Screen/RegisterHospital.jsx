import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RegisterHospital = () => {
    const [hospitalName, setHospitalName] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [pin, setPin] = useState('');
    const [head, setHead] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [departments, setDepartments] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {
        console.log({
            hospitalName,
            district,
            state,
            pin,
            head,
            contact,
            email,
            address,
            departments,
            id,
            password,
        });
        alert('Hospital Registered Successfully!');
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Register a Hospital</Text>

            {/* Hospital Name */}
            <View style={styles.inputContainer}>
                <Icon name="hospital-building" size={20} color="#2196F3" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Hospital Name"
                    placeholderTextColor="#999"
                    value={hospitalName}
                    onChangeText={setHospitalName}
                />
            </View>

            <View style={styles.rowContainer}>
                <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                    <Icon name="map-marker" size={20} color="#2196F3" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="District"
                        placeholderTextColor="#999"
                        value={district}
                        onChangeText={setDistrict}
                    />
                </View>
                <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                    <Icon name="map-marker-radius" size={20} color="#2196F3" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="State"
                        placeholderTextColor="#999"
                        value={state}
                        onChangeText={setState}
                    />
                </View>
            </View>

            {/* PIN Code */}
            <View style={styles.inputContainer}>
                <Icon name="map-marker-radius" size={20} color="#2196F3" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="PIN Code"
                    placeholderTextColor="#999"
                    value={pin}
                    onChangeText={setPin}
                    keyboardType="numeric"
                />
            </View>

            {/* Head/Dean Name */}
            <View style={styles.inputContainer}>
                <Icon name="account" size={20} color="#2196F3" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Head/Dean Name"
                    placeholderTextColor="#999"
                    value={head}
                    onChangeText={setHead}
                />
            </View>

            {/* Contact Number */}
            <View style={styles.inputContainer}>
                <Icon name="phone" size={20} color="#2196F3" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Contact Number"
                    placeholderTextColor="#999"
                    value={contact}
                    onChangeText={setContact}
                    keyboardType="phone-pad"
                />
            </View>

            {/* Email Address */}
            <View style={styles.inputContainer}>
                <Icon name="email" size={20} color="#2196F3" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>

            {/* Full Address */}
            <View style={styles.inputContainer}>
                <Icon name="home" size={20} color="#2196F3" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Full Address"
                    placeholderTextColor="#999"
                    value={address}
                    onChangeText={setAddress}
                    multiline
                />
            </View>

            {/* Departments Available */}
            <View style={styles.inputContainer}>
                <Icon name="stethoscope" size={20} color="#2196F3" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Departments Available"
                    placeholderTextColor="#999"
                    value={departments}
                    onChangeText={setDepartments}
                    multiline
                />
            </View>

            {/* ID */}
            <View style={styles.inputContainer}>
                <Icon name="identifier" size={20} color="#2196F3" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Hospital ID"
                    placeholderTextColor="#999"
                    value={id}
                    onChangeText={setId}
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
                <TouchableOpacity onPress={toggleShowPassword} style={styles.passwordIcon}>
                    <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#2196F3" />
                </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Add Hospital</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default RegisterHospital;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#2196F3',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
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
    passwordIcon: {
        padding: 10,
    },
    submitButton: {
        backgroundColor: '#2196F3',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 16,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});