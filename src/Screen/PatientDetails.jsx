import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PatientDetails = ({ route }) => {
    const { patient } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Patient Details</Text>
            <View style={styles.detailsContainer}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{patient.firstName} {patient.lastName}</Text>
                <Text style={styles.label}>Age:</Text>
                <Text style={styles.value}>{patient.age}</Text>
                <Text style={styles.label}>Gender:</Text>
                <Text style={styles.value}>{patient.gender}</Text>
                <Text style={styles.label}>Contact:</Text>
                <Text style={styles.value}>{patient.contactNumber}</Text>
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.value}>{patient.address}</Text>
                <Text style={styles.label}>Blood Group:</Text>
                <Text style={styles.value}>{patient.bloodGroup}</Text>
                <Text style={styles.label}>Medical History:</Text>
                <Text style={styles.value}>{patient.medicalHistory}</Text>
                <Text style={styles.label}>Allergies:</Text>
                <Text style={styles.value}>{patient.allergies}</Text>
                <Text style={styles.label}>Emergency Contact:</Text>
                <Text style={styles.value}>{patient.emergencyContact}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#2196F3' },
    detailsContainer: { backgroundColor: 'white', padding: 15, borderRadius: 8, elevation: 3 },
    label: { fontSize: 16, fontWeight: 'bold', marginTop: 10, color: '#333' },
    value: { fontSize: 16, marginBottom: 10, color: '#666' },
});

export default PatientDetails;