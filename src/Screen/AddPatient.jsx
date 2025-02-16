import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { Modal } from 'react-native';

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
    const [successModal, setSuccessModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (firstName === '' || lastName === '') {
            Alert.alert('Error', 'Please fill in all required fields.');
            return;
        }

        const patientData = {
            firstName,
            lastName,
            age: age.toString(),
            gender,
            contactNumber,
            address,
            medicalHistory,
            allergies,
            bloodGroup,
            emergencyContact,
        };

        console.log('Sending patient data:', patientData);

        setIsLoading(true);
        try {
            const response = await axios.post('http://192.168.117.108:5000/api/addPatient', patientData, { headers: { 'Content-Type': 'application/json' } });
            console.log('Response:', response.data);

            if (response.status === 201) {
                setSuccessModal(true);
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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add Patient</Text>
            {[
                { icon: 'account', placeholder: 'First Name', value: firstName, setter: setFirstName },
                { icon: 'account', placeholder: 'Last Name', value: lastName, setter: setLastName },
                { icon: 'numeric', placeholder: 'Age', value: age, setter: setAge, keyboard: 'numeric' },
                { icon: 'gender-male-female', placeholder: 'Gender', value: gender, setter: setGender },
                { icon: 'phone', placeholder: 'Contact Number', value: contactNumber, setter: setContactNumber, keyboard: 'phone-pad' },
                { icon: 'home', placeholder: 'Address', value: address, setter: setAddress, multiline: true },
                { icon: 'medical-bag', placeholder: 'Medical History (comma-separated)', value: medicalHistory, setter: setMedicalHistory, multiline: true },
                { icon: 'allergy', placeholder: 'Allergies (comma-separated)', value: allergies, setter: setAllergies, multiline: true },
                { icon: 'water', placeholder: 'Blood Group', value: bloodGroup, setter: setBloodGroup },
                { icon: 'phone-alert', placeholder: 'Emergency Contact', value: emergencyContact, setter: setEmergencyContact, keyboard: 'phone-pad' },
            ].map((field, index) => (
                <View key={index} style={styles.inputContainer}>
                    <Icon
                        name={field.icon}
                        size={20}
                        color="#00796B"
                        style={styles.icon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={field.placeholder}
                        placeholderTextColor="#90A4AE"
                        value={field.value}
                        onChangeText={field.setter}
                        keyboardType={field.keyboard || 'default'}
                        multiline={field.multiline || false}
                    />
                </View>
            ))}

            {/* Submit Button */}
            <TouchableOpacity
                style={[styles.submitButton, isLoading && styles.disabledButton]}
                onPress={handleSubmit}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.submitButtonText}>Add Patient</Text>
                )}
            </TouchableOpacity>

            {/* Success Modal */}
            <Modal
                visible={successModal}
                transparent
                animationType="fade"
                onRequestClose={() => setSuccessModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Icon name="check-circle" size={50} color="#00796B" />
                        <Text style={styles.modalText}>Patient added successfully!</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setSuccessModal(false)}
                        >
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F5F5F5',
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#00796B',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 16,
        color: '#263238',
    },
    submitButton: {
        backgroundColor: '#00796B',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    disabledButton: {
        backgroundColor: '#B0BEC5',
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 12,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#00796B',
        marginVertical: 16,
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: '#00796B',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
        marginTop: 16,
    },
    modalButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default AddPatient;