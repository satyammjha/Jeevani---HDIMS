import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { Picker } from '@react-native-picker/picker';

function ReportDetailsScreen({ route }) {
    const { report } = route.params || {};
    const [selectedDisease, setSelectedDisease] = useState('dengue');

    const stateData = report || {
        state: 'Unknown',
        totalReportedCases: {},
        hospitals: [],
        activeCases: 0,
        vaccinationRate: 'N/A',
        recoveryRate: 'N/A',
        testRate: 'N/A'
    };

    return (
        <ScrollView style={styles.container}>
            {/* Disease Picker */}
          
            {/* Header Section */}
            <View style={styles.headerContainer}>
                <Text style={styles.stateText}>
                    <FontAwesome6 name="location-dot" style={styles.icon} /> 
                    {stateData.state}
                </Text>
                <TouchableOpacity 
                    style={styles.downloadButton} 
                    onPress={() => console.log('Download pressed')}
                >
                    <FontAwesome6 name="download" style={styles.downloadIcon} />
                </TouchableOpacity>
            </View>

            {/* Total Reported Cases */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    <FontAwesome6 name="virus" style={styles.icon} /> Total Cases
                </Text>
               
            </View>

            {/* Hospitals Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    <FontAwesome6 name="hospital" style={styles.icon} /> Hospitals
                </Text>
                {stateData.hospitals.map((hospital, index) => (
                    <View key={index} style={styles.hospitalCard}>
                        <Text style={styles.hospitalName}>{hospital.name}</Text>
                        <Text style={styles.hospitalInfo}>
                            <FontAwesome6 name="bed" /> Beds: {hospital.bedsAvailable}
                        </Text>
                        <Text style={styles.hospitalInfo}>
                            <FontAwesome6 name="exclamation-triangle" /> Needs: {hospital.needs?.join(', ')}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Additional Data */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    <FontAwesome6 name="chart-simple" style={styles.icon} /> Statistics
                </Text>
                <View style={styles.dataContainer}>
                    <Text style={styles.dataText}>
                        <FontAwesome6 name="heart-pulse" /> Active Cases: {stateData.activeCases}
                    </Text>
                    <Text style={styles.dataText}>
                        <FontAwesome6 name="syringe" /> Vaccination: {stateData.vaccinationRate}
                    </Text>
                    <Text style={styles.dataText}>
                        <FontAwesome6 name="check" /> Recovery Rate: {stateData.recoveryRate}
                    </Text>
                    <Text style={styles.dataText}>
                        <FontAwesome6 name="vial" /> Tests: {stateData.testRate}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    pickerContainer: {
        margin: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    stateText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    icon: {
        color: '#666',
        marginRight: 8,
    },
    downloadButton: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    downloadIcon: {
        color: '#333',
        fontSize: 20,
    },
    section: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
    },
    dataContainer: {
        gap: 8,
    },
    dataText: {
        color: '#666',
        fontSize: 16,
    },
    hospitalCard: {
        backgroundColor: '#f8f8f8',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    hospitalName: {
        fontWeight: '500',
        marginBottom: 4,
    },
    hospitalInfo: {
        color: '#666',
        fontSize: 14,
    },
});

export default ReportDetailsScreen;