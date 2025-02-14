import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HospitalHome = ({ navigation }) => {
    const { user, logout } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            {/* Welcome Banner */}
            <View style={styles.banner}>
                <Icon name="hospital-building" size={30} color="#fff" />
                <Text style={styles.bannerText}>Welcome to Jeevani, {user?.id}</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Hospital Dashboard</Text>

                {/* Cards with Icons */}
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('ViewPatients')}>
                    <Icon name="account-group" size={26} color="#00796B" />
                    <View>
                        <Text style={styles.cardText}>View Patients</Text>
                        <Text style={styles.cardSubtext}>Manage patient records</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('AddPatient')}>
                    <Icon name="account-plus" size={26} color="#00796B" />
                    <View>
                        <Text style={styles.cardText}>Add New Patient</Text>
                        <Text style={styles.cardSubtext}>Register new patient</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('Reports')}>
                    <Icon name="file-chart" size={26} color="#00796B" />
                    <View>
                        <Text style={styles.cardText}>Generate Reports</Text>
                        <Text style={styles.cardSubtext}>Create daily/monthly reports</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Logout Button */}
            <Button
                mode="contained"
                style={styles.logoutButton}
                icon="logout"
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
    banner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00796B',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    bannerText: {
        fontSize: 18,
        color: '#fff',
        marginLeft: 10,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00796B',
        marginBottom: 30,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 3,
        gap: 10,
    },
    cardText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
    },
    cardSubtext: {
        fontSize: 14,
        color: '#666',
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: '#00796B',
    },
    footer: {
        textAlign: 'center',
        color: '#666',
        marginTop: 20,
        paddingVertical: 10,
    },
});

export default HospitalHome;