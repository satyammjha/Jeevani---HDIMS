import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Add icons
import axios from 'axios';

const UpdatePatient = ({ route, navigation }) => {
    const { patientId } = route.params;
    const [patient, setPatient] = useState({
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        contactNumber: '',
        address: '',
        medicalHistory: '',
        allergies: '',
        bloodGroup: '',
        emergencyContact: '',
    });

    // Fetch patient details
    useEffect(() => {
        fetchPatient();
    }, []);

    const fetchPatient = async () => {
        try {
            console.log('Fetching patient with ID:', patientId); // Log the patient ID
            const response = await axios.get(`http://192.168.117.108:5000/api/patients/${patientId}`);
            console.log('API Response:', response.data); // Log the response
            setPatient(response.data);
        } catch (error) {
            console.error('Error fetching patient:', error);
            Alert.alert('Error', 'Failed to fetch patient details. Please try again.');
        }
    };

    // Handle input changes
    const handleInputChange = (field, value) => {
        setPatient((prev) => ({ ...prev, [field]: value }));
    };

    // Handle update
    const handleUpdate = async () => {
        try {
            await axios.put(`http://192.168.117.108:5000/api/patients/${patientId}`, patient);
            Alert.alert('Success', 'Patient updated successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error updating patient:', error);
            Alert.alert('Error', 'Failed to update patient. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* First Name */}
                <View style={styles.inputContainer}>
                    <Icon name="account" size={20} color="#4CAF50" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={patient.firstName}
                        onChangeText={(text) => handleInputChange('firstName', text)}
                    />
                </View>

                {/* Last Name */}
                <View style={styles.inputContainer}>
                    <Icon name="account" size={20} color="#4CAF50" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={patient.lastName}
                        onChangeText={(text) => handleInputChange('lastName', text)}
                    />
                </View>

                {/* Age */}
                <View style={styles.inputContainer}>
                    <Icon name="numeric" size={20} color="#4CAF50" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Age"
                        value={patient.age}
                        onChangeText={(text) => handleInputChange('age', text)}
                        keyboardType="numeric"
                    />
                </View>

                {/* Gender */}
                <View style={styles.inputContainer}>
                    <Icon name="gender-male-female" size={20} color="#4CAF50" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Gender"
                        value={patient.gender}
                        onChangeText={(text) => handleInputChange('gender', text)}
                    />
                </View>

                {/* Contact Number */}
                <View style={styles.inputContainer}>
                    <Icon name="phone" size={20} color="#4CAF50" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Contact Number"
                        value={patient.contactNumber}
                        onChangeText={(text) => handleInputChange('contactNumber', text)}
                        keyboardType="phone-pad"
                    />
                </View>

                {/* Address */}
                <View style={styles.inputContainer}>
                    <Icon name="home" size={20} color="#4CAF50" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={patient.address}
                        onChangeText={(text) => handleInputChange('address', text)}
                        multiline
                    />
                </View>

                {/* Medical History */}
                <View style={styles.inputContainer}>
                    <Icon name="medical-bag" size={20} color="#4CAF50" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Medical History"
                        value={patient.medicalHistory}
                        onChangeText={(text) => handleInputChange('medicalHistory', text)}
                        multiline
                    />
                </View>

                {/* Allergies */}
                <View style={styles.inputContainer}>
                    <Icon name="allergy" size={20} color="#4CAF50" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Allergies"
                        value={patient.allergies}
                        onChangeText={(text) => handleInputChange('allergies', text)}
                        multiline
                    />
                </View>

                {/* Blood Group */}
                <View style={styles.inputContainer}>
                    <Icon name="water" size={20} color="#4CAF50" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Blood Group"
                        value={patient.bloodGroup}
                        onChangeText={(text) => handleInputChange('bloodGroup', text)}
                    />
                </View>

                {/* Emergency Contact */}
                <View style={styles.inputContainer}>
                    <Icon name="phone-alert" size={20} color="#4CAF50" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Emergency Contact"
                        value={patient.emergencyContact}
                        onChangeText={(text) => handleInputChange('emergencyContact', text)}
                        keyboardType="phone-pad"
                    />
                </View>
            </ScrollView>

            {/* Update Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleUpdate}>
                <Text style={styles.submitButtonText}>Update Patient</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 80, // Add padding for the button
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        elevation: 0,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
    },
    submitButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        padding: 16,
        alignItems: 'center',
        elevation: 0,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default UpdatePatient;