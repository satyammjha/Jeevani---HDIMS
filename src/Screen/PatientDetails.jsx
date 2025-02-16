import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PatientDetails = ({ route }) => {
    const { patient } = route.params;

    const renderDetailRow = (iconName, label, value) => (
        <View style={styles.detailRow}>
            <Icon name={iconName} size={24} color="#2196F3" style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Patient Details</Text>
            <View style={styles.detailsContainer}>
                {renderDetailRow('account', 'Name', `${patient.firstName} ${patient.lastName}`)}
                {renderDetailRow('calendar', 'Age', patient.age)}
                {renderDetailRow('gender-male-female', 'Gender', patient.gender)}
                {renderDetailRow('phone', 'Contact', patient.contactNumber)}
                {renderDetailRow('home', 'Address', patient.address)}
                {renderDetailRow('water', 'Blood Group', patient.bloodGroup)}
                {renderDetailRow('history', 'Medical History', patient.medicalHistory)}
                {renderDetailRow('alert', 'Allergies', patient.allergies)}
                {renderDetailRow('alert-circle', 'Emergency Contact', patient.emergencyContact)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 25,
        color: '#2196F3',
        textAlign: 'center'
    },
    detailsContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8
    },
    icon: {
        width: 40,
        marginRight: 10
    },
    textContainer: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 8
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#555',
        marginBottom: 2
    },
    value: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500'
    }
});

export default PatientDetails;