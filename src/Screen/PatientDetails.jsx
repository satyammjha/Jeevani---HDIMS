import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PatientDetails = ({ route }) => {
    const { patient } = route.params;

<<<<<<< HEAD
    const renderDetailRow = (iconName, label, value) => (
        <View style={styles.detailRow}>
            <Icon name={iconName} size={24} color="#2196F3" style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
        </View>
    );

=======
>>>>>>> a9003460f3e98b947669ee0cd939132fcb16b40f
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Patient Details</Text>
            <View style={styles.detailsContainer}>
<<<<<<< HEAD
                {renderDetailRow('account', 'Name', `${patient.firstName} ${patient.lastName}`)}
                {renderDetailRow('calendar', 'Age', patient.age)}
                {renderDetailRow('gender-male-female', 'Gender', patient.gender)}
                {renderDetailRow('phone', 'Contact', patient.contactNumber)}
                {renderDetailRow('home', 'Address', patient.address)}
                {renderDetailRow('water', 'Blood Group', patient.bloodGroup)}
                {renderDetailRow('history', 'Medical History', patient.medicalHistory)}
                {renderDetailRow('alert', 'Allergies', patient.allergies)}
                {renderDetailRow('alert-circle', 'Emergency Contact', patient.emergencyContact)}
=======
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
>>>>>>> a9003460f3e98b947669ee0cd939132fcb16b40f
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
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
=======
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#2196F3' },
    detailsContainer: { backgroundColor: 'white', padding: 15, borderRadius: 8, elevation: 3 },
    label: { fontSize: 16, fontWeight: 'bold', marginTop: 10, color: '#333' },
    value: { fontSize: 16, marginBottom: 10, color: '#666' },
>>>>>>> a9003460f3e98b947669ee0cd939132fcb16b40f
});

export default PatientDetails;