import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import CustomSlider from '../Components/CustomSlider';
import LineChartComponent from '../Components/HospitalHomeChart';

const { width } = Dimensions.get('window');

const HospitalHome = ({ navigation }) => {
    const { user, logout } = useContext(AuthContext);

    // Sample data for patient admissions
    const patientFlowData = [
        { date: 'Mon', value: 45 },
        { date: 'Tue', value: 68 },
        { date: 'Wed', value: 72 },
        { date: 'Thu', value: 58 },
        { date: 'Fri', value: 81 },
        { date: 'Sat', value: 63 },
        { date: 'Sun', value: 49 }
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header Banner */}
            <LinearGradient colors={['#00796B', '#004D40']} style={styles.banner}>
                <Icon name="hospital-building" size={30} color="#fff" />
                <Text style={styles.bannerText}>Welcome to Jeevani, {user?.id}</Text>
            </LinearGradient>

            {/* Custom Slider */}
            <CustomSlider />

            {/* Patient Admissions Chart */}
            <View style={styles.chartContainer}>
                <LineChartComponent
                    reports={patientFlowData}
                    title="Weekly Patient Admissions"
                    yAxisSuffix=" pts"
                    chartWidth={width - 40}
                    chartHeight={220}
                />
            </View>

            {/* Quick Actions Grid */}
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.gridContainer}>
                <TouchableOpacity
                    style={styles.squareBox}
                    onPress={() => navigation.navigate('ViewPatients')}>
                    <Icon name="account-group" size={26} color="#00796B" />
                    <Text style={styles.boxText}>View Patients</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.squareBox}
                    onPress={() => navigation.navigate('AddPatient')}>
                    <Icon name="account-plus" size={26} color="#00796B" />
                    <Text style={styles.boxText}>Add New Patient</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.squareBox}
                    onPress={() => navigation.navigate('Reports')}>
                    <Icon name="file-chart" size={26} color="#00796B" />
                    <Text style={styles.boxText}>Generate Reports</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.squareBox}
                    onPress={() => navigation.navigate('Resources')}>
                    <Icon name="medical-bag" size={26} color="#00796B" />
                    <Text style={styles.boxText}>Resources</Text>
                </TouchableOpacity>
            </View>

            {/* Resources Status */}
            <Text style={styles.sectionTitle}>Resources Available</Text>
            <View style={styles.resourcesContainer}>
                <View style={styles.resourceItem}>
                    <Icon name="bed" size={24} color="#00796B" />
                    <Text style={styles.resourceText}>Beds: 120</Text>
                </View>
                <View style={styles.resourceItem}>
                    <Icon name="doctor" size={24} color="#00796B" />
                    <Text style={styles.resourceText}>Doctors: 25</Text>
                </View>
                <View style={styles.resourceItem}>
                    <Icon name="medical-bag" size={24} color="#00796B" />
                    <Text style={styles.resourceText}>Equipment: 50</Text>
                </View>
            </View>

            {/* Logout Button */}
            <Button
                mode="contained"
                style={styles.logoutButton}
                labelStyle={styles.buttonLabel}
                icon="logout"
                onPress={logout}>
                Logout
            </Button>

            {/* Footer */}
            <Text style={styles.footer}>Developed by Team Square</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    banner: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    bannerText: {
        fontSize: 18,
        color: '#fff',
        marginLeft: 10,
        fontWeight: 'bold',
    },
    chartContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20, // Reduced padding for a more compact look
        marginVertical: 8, // Slightly smaller margin
        elevation: 0, // Light elevation for depth
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        alignItems: 'center', // Centers content horizontally
        justifyContent: 'center', // Centers content vertically
    }
    ,
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00796B',
        marginTop: 20,
        marginBottom: 15,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    squareBox: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    boxText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginTop: 10,
        textAlign: 'center',
    },
    resourcesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        elevation: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    resourceItem: {
        alignItems: 'center',
        flex: 1,
    },
    resourceText: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    logoutButton: {
        marginTop: 30,
        backgroundColor: '#00796B',
        borderRadius: 8,
        paddingVertical: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
    },
    footer: {
        textAlign: 'center',
        color: '#666',
        marginTop: 30,
        paddingVertical: 10,
        fontSize: 12,
    },
});

export default HospitalHome;