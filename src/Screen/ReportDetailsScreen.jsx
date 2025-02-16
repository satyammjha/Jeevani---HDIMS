import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { Picker } from '@react-native-picker/picker';

function ReportDetailsScreen({ route }) {
    const { report } = route.params || {};
    const [selectedDisease, setSelectedDisease] = useState('dengue');

    const stateData = report || {
        state: 'Maharashtra',
        totalReportedCases: {
            confirmed: 2450,
            active: 850,
            recovered: 1500,
            deaths: 100
        },
        hospitals: [
            { name: 'City General Hospital', bedsAvailable: 45, needs: ['Oxygen', 'PPE Kits'] },
            { name: 'Central Medical Center', bedsAvailable: 22, needs: ['Ventilators', 'Medicines'] }
        ],
        activeCases: 850,
        vaccinationRate: '68%',
        recoveryRate: '92%',
        testRate: '15k/day'
    };

    return (
        <ScrollView style={styles.container}>
            {/* Disease Picker */}
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedDisease}
                    onValueChange={(itemValue) => setSelectedDisease(itemValue)}
                    dropdownIconColor="#2E7D32"
                >
                    <Picker.Item label="Dengue" value="dengue" />
                    <Picker.Item label="Malaria" value="malaria" />
                    <Picker.Item label="Chikungunya" value="chikungunya" />
                </Picker>
            </View>

            {/* Header Section */}
            <View style={styles.headerContainer}>
                <View style={styles.locationContainer}>
                    <FontAwesome6 name="location-dot" size={20} color="#2E7D32" />
                    <Text style={styles.stateText}>{stateData.state}</Text>
                </View>
                <TouchableOpacity
                    style={styles.downloadButton}
                    onPress={() => console.log('Download pressed')}
                >
                    <FontAwesome6 name="file-pdf" size={16} color="#fff" />
                    <Text style={styles.downloadText}>Export Report</Text>
                </TouchableOpacity>
            </View>

            {/* Total Reported Cases */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    <FontAwesome6 name="virus" style={styles.icon} /> Disease Overview
                </Text>
                <View style={styles.statsGrid}>
                    <View style={[styles.statCard, styles.confirmedCard]}>
                        <FontAwesome6 name="biohazard" size={20} color="#d32f2f" />
                        <Text style={styles.statValue}>{stateData.totalReportedCases.confirmed}</Text>
                        <Text style={styles.statLabel}>Confirmed</Text>
                    </View>
                    <View style={[styles.statCard, styles.activeCard]}>
                        <FontAwesome6 name="heart-pulse" size={20} color="#f57c00" />
                        <Text style={styles.statValue}>{stateData.totalReportedCases.active}</Text>
                        <Text style={styles.statLabel}>Active</Text>
                    </View>
                    <View style={[styles.statCard, styles.recoveredCard]}>
                        <FontAwesome6 name="heart-circle-check" size={20} color="#2E7D32" />
                        <Text style={styles.statValue}>{stateData.totalReportedCases.recovered}</Text>
                        <Text style={styles.statLabel}>Recovered</Text>
                    </View>
                    <View style={[styles.statCard, styles.deathsCard]}>
                        <FontAwesome6 name="skull" size={20} color="#616161" />
                        <Text style={styles.statValue}>{stateData.totalReportedCases.deaths}</Text>
                        <Text style={styles.statLabel}>Deaths</Text>
                    </View>
                </View>
            </View>

            {/* Hospitals Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    <FontAwesome6 name="hospital" style={styles.icon} /> Healthcare Facilities
                </Text>
                {stateData.hospitals.map((hospital, index) => (
                    <View key={index} style={styles.hospitalCard}>
                        <View style={styles.hospitalHeader}>
                            <FontAwesome6 name="hospital-user" size={16} color="#2E7D32" />
                            <Text style={styles.hospitalName}>{hospital.name}</Text>
                        </View>
                        <View style={styles.hospitalStats}>
                            <View style={styles.statBadge}>
                                <FontAwesome6 name="bed" size={14} color="#2E7D32" />
                                <Text style={styles.badgeText}>{hospital.bedsAvailable} Beds Available</Text>
                            </View>
                            {hospital.needs?.length > 0 && (
                                <View style={styles.needsContainer}>
                                    {hospital.needs.map((need, i) => (
                                        <View key={i} style={styles.needTag}>
                                            <Text style={styles.needText}>{need}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>
                ))}
            </View>

            {/* Additional Data */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    <FontAwesome6 name="chart-simple" style={styles.icon} /> Key Metrics
                </Text>
                <View style={styles.metricsGrid}>
                    <View style={styles.metricItem}>
                        <FontAwesome6 name="heart-pulse" size={20} color="#f57c00" />
                        <Text style={styles.metricValue}>{stateData.activeCases}</Text>
                        <Text style={styles.metricLabel}>Active Cases</Text>
                    </View>
                    <View style={styles.metricItem}>
                        <FontAwesome6 name="syringe" size={20} color="#1976d2" />
                        <Text style={styles.metricValue}>{stateData.vaccinationRate}</Text>
                        <Text style={styles.metricLabel}>Vaccination Rate</Text>
                    </View>
                    <View style={styles.metricItem}>
                        <FontAwesome6 name="check" size={20} color="#2E7D32" />
                        <Text style={styles.metricValue}>{stateData.recoveryRate}</Text>
                        <Text style={styles.metricLabel}>Recovery Rate</Text>
                    </View>
                    <View style={styles.metricItem}>
                        <FontAwesome6 name="vial" size={20} color="#7b1fa2" />
                        <Text style={styles.metricValue}>{stateData.testRate}</Text>
                        <Text style={styles.metricLabel}>Testing Rate</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    pickerContainer: {
        margin: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 2,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stateText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2E7D32',
    },
    downloadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#2E7D32',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    downloadText: {
        color: '#fff',
        fontWeight: '500',
    },
    section: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 16,
        borderRadius: 12,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1B5E20',
        marginBottom: 16,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    statCard: {
        flex: 1,
        minWidth: '48%',
        alignItems: 'center',
        padding: 16,
        borderRadius: 8,
    },
    confirmedCard: { backgroundColor: '#ffebee' },
    activeCard: { backgroundColor: '#fff3e0' },
    recoveredCard: { backgroundColor: '#e8f5e9' },
    deathsCard: { backgroundColor: '#f5f5f5' },
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        marginVertical: 8,
    },
    statLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#616161',
    },
    hospitalCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    hospitalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    hospitalName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#2E7D32',
    },
    hospitalStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#e8f5e9',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    badgeText: {
        fontSize: 14,
        color: '#2E7D32',
    },
    needsContainer: {
        flexDirection: 'row',
        gap: 8,
        flexWrap: 'wrap',
    },
    needTag: {
        backgroundColor: '#fff3e0',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    needText: {
        fontSize: 12,
        color: '#f57c00',
    },
    metricsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    metricItem: {
        flex: 1,
        minWidth: '48%',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
    },
    metricValue: {
        fontSize: 20,
        fontWeight: '700',
        marginVertical: 4,
        color: '#2E7D32',
    },
    metricLabel: {
        fontSize: 12,
        color: '#616161',
        textAlign: 'center',
    },
});

export default ReportDetailsScreen;