import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { Button } from 'react-native-paper';

const HospitalHome = ({ navigation }) => {
    const { user, logout } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome, {user?.id}</Text>

            <View style={styles.content}>
                <Text style={styles.title}>Hospital Dashboard</Text>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('Patients')}>
                    <Text style={styles.cardText}>View Patients</Text>
                    <Text style={styles.cardSubtext}>Manage patient records</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('AddPatient')}>
                    <Text style={styles.cardText}>Add New Patient</Text>
                    <Text style={styles.cardSubtext}>Register new patient</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('Reports')}>
                    <Text style={styles.cardText}>Generate Reports</Text>
                    <Text style={styles.cardSubtext}>Create daily/monthly reports</Text>
                </TouchableOpacity>
            </View>

            <Button
                mode="contained"
                style={styles.logoutButton}
                onPress={logout}>
                Logout
            </Button>

            <Text style={styles.footer}>Developed by Team Square</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2196F3',
        marginBottom: 30,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
        elevation: 3,
    },
    cardText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
    },
    cardSubtext: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: '#2196F3',
    },
    footer: {
        textAlign: 'center',
        color: '#666',
        marginTop: 20,
        paddingVertical: 10,
    },
});

export default HospitalHome;