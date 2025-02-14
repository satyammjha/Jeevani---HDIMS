import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const AddPatient = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [allergies, setAllergies] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [emergencyContact, setEmergencyContact] = useState('');

    const handleSubmit = async () => {
        if (
            firstName === '' ||
            lastName === ''
        ) {
            Alert.alert('Error', 'Please fill in all required fields.');
            return;
        }

        // Prepare the data to send
        const patientData = {
            firstName,
            lastName,
            age: parseInt(age, 10),
            gender,
            contactNumber,
            address,
            medicalHistory: medicalHistory.split(',').map(item => item.trim()),
            allergies: allergies.split(',').map(item => item.trim()),
            bloodGroup,
            emergencyContact,
        };

        try {
            const response = await axios.post('http://192.168.125.108:5000/api/addPatient', patientData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (response.status === 201) {
                Alert.alert('Success', 'Patient added successfully!');
                setFirstName('');
                setLastName('');
                setAge('');
                setGender('');
                setContactNumber('');
                setAddress('');
                setMedicalHistory('');
                setAllergies('');
                setBloodGroup('');
                setEmergencyContact('');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            Alert.alert('Error', 'Failed to add patient. Please try again.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add Patient</Text>

            {/* First Name */}
            <View style={styles.inputContainer}>
                <Icon name="account" size={20} color="#2196F3" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="#999"
                    value={firstName}
                    onChangeText={setFirstName}
                />
            </View>

            {/* Last Name */}
            <View style={styles.inputContainer}>
                <Icon name="account" size={20} color="#2196F3" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="#999"
                    value={lastName}
                    onChangeText={setLastName}
                />
            </View>

            {/* Age */}
            <View style={styles.inputContainer}>
                <Icon name="numeric" size={20} color="#2196F3" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Age"
                    placeholderTextColor="#999"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                />
            </View>

            {/* Gender */}
            <View style={styles.inputContainer}>
                <Icon name="gender-male-female" size={20} color="#2196F3" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Gender"
                    placeholderTextColor="#999"
                    value={gender}
                    onChangeText={setGender}
                />
            </View>

            {/* Contact Number */}
            <View style={styles.inputContainer}>
                <Icon name="phone" size={20} color="#2196F3" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Contact Number"
                    placeholderTextColor="#999"
                    value={contactNumber}
                    onChangeText={setContactNumber}
                    keyboardType="phone-pad"
                />
            </View>

            {/* Address */}
            <View style={styles.inputContainer}>
                <Icon name="home" size={20} color="#2196F3" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    placeholderTextColor="#999"
                    value={address}
                    onChangeText={setAddress}
                    multiline
                />
            </View>

            {/* Medical History */}
            <View style={styles.inputContainer}>
                <Icon name="medical-bag" size={20} color="#2196F3" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Medical History (comma-separated)"
                    placeholderTextColor="#999"
                    value={medicalHistory}
                    onChangeText={setMedicalHistory}
                    multiline
                />
            </View>

            {/* Allergies */}
            <View style={styles.inputContainer}>
                <Icon name="allergy" size={20} color="#2196F3" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Allergies (comma-separated)"
                    placeholderTextColor="#999"
                    value={allergies}
                    onChangeText={setAllergies}
                    multiline
                />
            </View>

            {/* Blood Group */}
            <View style={styles.inputContainer}>
                <Icon name="water" size={20} color="#2196F3" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Blood Group"
                    placeholderTextColor="#999"
                    value={bloodGroup}
                    onChangeText={setBloodGroup}
                />
            </View>

            {/* Emergency Contact */}
            <View style={styles.inputContainer}>
                <Icon name="phone-alert" size={20} color="#2196F3" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Emergency Contact"
                    placeholderTextColor="#999"
                    value={emergencyContact}
                    onChangeText={setEmergencyContact}
                    keyboardType="phone-pad"
                />
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Add Patient</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AddPatient;

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
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: '#000',
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