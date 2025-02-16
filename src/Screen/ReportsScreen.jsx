import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Feather';
import SeverityBadge from '../Components/SeverityBadge';

function ReportsScreen() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('none');

    const reports = [
        { 
            id: '1', 
            state: 'Delhi', 
            title: 'Monthly Report', 
            description: 'Delhi Monthly Analysis.', 
            severity: 'high', 
            date: '2023-10-01',
            totalReportedCases: {
                dengue: 1200,
                malaria: 900,
                covid: 5000,
            },
            hospitals: [
                {
                    name: 'Apollo Hospital',
                    bedsAvailable: 15,
                    needs: ['Oxygen', 'Ventilators'],
                },
                {
                    name: 'Fortis Hospital',
                    bedsAvailable: 8,
                    needs: ['PPE Kits', 'ICU Beds'],
                },
            ],
            activeCases: 300,
            vaccinationRate: '75%',
            recoveryRate: '88%',
            testRate: '1200/day',
        },
        { 
            id: '2', 
            state: 'Delhi', 
            title: 'Weekly Report', 
            description: 'Delhi Weekly Overview.', 
            severity: 'medium', 
            date: '2023-10-08',
            totalReportedCases: {
                dengue: 1000,
                malaria: 800,
                covid: 4500,
            },
            hospitals: [
                {
                    name: 'Max Hospital',
                    bedsAvailable: 10,
                    needs: ['Oxygen', 'Ventilators'],
                },
            ],
            activeCases: 250,
            vaccinationRate: '70%',
            recoveryRate: '85%',
            testRate: '1000/day',
        },
        // Add more reports as needed
    ];

    const severityOrder = { high: 3, medium: 2, low: 1 };

    const filteredReports = reports.filter(report =>
        report.state.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filter === 'all' || report.title.toLowerCase().includes(filter))
    );

    const sortedReports = [...filteredReports].sort((a, b) => {
        if (sort === 'highest') return severityOrder[b.severity] - severityOrder[a.severity];
        if (sort === 'lowest') return severityOrder[a.severity] - severityOrder[b.severity];
        return 0;
    });

    return (
        <View style={styles.container}>
            
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#555" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search by state..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <View style={styles.filterSortContainer}>
                <View style={styles.dropdownContainer}>
                    <Icon name="filter" size={18} color="#555" style={styles.dropdownIcon} />
                    <Picker
                        selectedValue={filter}
                        onValueChange={setFilter}
                        style={styles.dropdown}
                        dropdownIconColor="#555"
                    >
                        <Picker.Item label="All Reports" value="all" />
                        <Picker.Item label="Monthly" value="monthly" />
                        <Picker.Item label="Weekly" value="weekly" />
                        <Picker.Item label="Yearly" value="yearly" />
                    </Picker>
                </View>

                <View style={styles.dropdownContainer}>
                    <Icon name="bar-chart-2" size={18} color="#555" style={styles.dropdownIcon} />
                    <Picker
                        selectedValue={sort}
                        onValueChange={setSort}
                        style={styles.dropdown}
                        dropdownIconColor="#555"
                    >
                        <Picker.Item label="Sort By" value="none" />
                        <Picker.Item label="High Severity" value="highest" />
                        <Picker.Item label="Low Severity" value="lowest" />
                    </Picker>
                </View>
            </View>

            <FlatList
                data={sortedReports}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Icon name="file-text" size={40} color="#ccc" />
                        <Text style={styles.emptyText}>No reports found</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('ReportDetails', { report: item })}
                    >
                        <View style={styles.reportItem}>
                            <View style={styles.reportHeader}>
                                <Text style={styles.reportState}>{item.state}</Text>
                                <SeverityBadge severity={item.severity} />
                            </View>
                            <Text style={styles.reportTitle}>{item.title}</Text>
                            <Text style={styles.reportDescription}>{item.description}</Text>
                            <View style={styles.reportMeta}>
                                <Icon name="calendar" size={12} color="#888" />
                                <Text style={styles.reportDate}>{item.date}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.divider} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa'
    },
    header: {
        marginBottom: 24
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1a1a1a'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.1,
                shadowRadius: 1
            },
            android: {
                elevation: 0
            }
        })
    },
    searchIcon: {
        marginRight: 12
    },
    searchBar: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingVertical: 0
    },
    filterSortContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 16
    },
    dropdownContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingLeft: 12,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.1,
                shadowRadius: 6
            },
            android: {
                elevation: 0
            }
        })
    },
    dropdownIcon: {
        marginRight: 8
    },
    dropdown: {
        flex: 1,
        height: Platform.OS === 'ios' ? 30 : 50,
        fontSize: 14,
        color: '#333'
    },
    listContainer: {
        paddingBottom: 20
    },
    reportItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 18,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 6
            },
            android: {
                elevation: 0
            }
        })
    },
    reportHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },
    reportState: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50'
    },
    reportTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#34495e',
        marginBottom: 4
    },
    reportDescription: {
        fontSize: 13,
        color: '#7f8c8d',
        marginBottom: 12,
        lineHeight: 20
    },
    reportMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    reportDate: {
        fontSize: 12,
        color: '#95a5a6'
    },
    divider: {
        height: 16
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40
    },
    emptyText: {
        fontSize: 16,
        color: '#bdc3c7',
        marginTop: 12
    }
});

export default ReportsScreen;