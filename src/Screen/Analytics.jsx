import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const COLORS = {
    primary: '#00796B',
    secondary: '#004D40',
    accent: '#B2DFDB',
    background: '#F5F5F5',
    text: '#263238',
};

const Analytics = () => {
    const [selectedFilter, setSelectedFilter] = useState('monthly');

    // Time-based data variations
    const data = {
        monthly: {
            line: [65000, 59000, 80000, 81000, 56000, 55000],
            bar: [45000, 38000, 42000, 32000, 41000],
            progress: [0.72, 0.65, 0.83]
        },
        weekly: {
            line: [15000, 18000, 22000, 21000, 19000, 20000],
            bar: [12000, 15000, 13000, 14000, 11000],
            progress: [0.68, 0.72, 0.79]
        },
        yearly: {
            line: [720000, 680000, 750000, 790000, 820000, 800000],
            bar: [520000, 480000, 510000, 490000, 530000],
            progress: [0.81, 0.78, 0.85]
        }
    };

    const chartConfig = {
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 121, 107, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(38, 50, 56, ${opacity})`,
        propsForDots: { r: '4', strokeWidth: '2', stroke: '#004D40' },
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header with Filters */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Icon name="chart-areaspline" size={24} color={COLORS.primary} />
                    <Text style={styles.headerTitle}>Health Analytics</Text>
                </View>
                <View style={styles.filterContainer}>
                    {['weekly', 'monthly', 'yearly'].map((filter) => (
                        <TouchableOpacity
                            key={filter}
                            style={[
                                styles.filterButton,
                                selectedFilter === filter && styles.activeFilter
                            ]}
                            onPress={() => setSelectedFilter(filter)}
                        >
                            <Text style={[
                                styles.filterText,
                                selectedFilter === filter && styles.activeFilterText
                            ]}>
                                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Line Chart Card */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Icon name="chart-line" size={20} color={COLORS.primary} />
                    <Text style={styles.cardTitle}>Disease Trend</Text>
                </View>
                <LineChart
                    data={{
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        datasets: [{ data: data[selectedFilter].line, ...chartConfig }]
                    }}
                    width={width - 40}
                    height={200}
                    chartConfig={chartConfig}
                    bezier
                />
            </View>

            {/* Bar Chart Card */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Icon name="chart-bar" size={20} color={COLORS.primary} />
                    <Text style={styles.cardTitle}>Regional Comparison</Text>
                </View>
                <BarChart
                    data={{
                        labels: ['Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Bengaluru'],
                        datasets: [{ data: data[selectedFilter].bar }]
                    }}
                    width={width - 40}
                    height={200}
                    yAxisLabel=""
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                />
            </View>

            {/* Progress Chart Card */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Icon name="progress-check" size={20} color={COLORS.primary} />
                    <Text style={styles.cardTitle}>Prevention Progress</Text>
                </View>
                <ProgressChart
                    data={{
                        labels: ['Vaccinations', 'Screenings', 'Checkups'],
                        data: data[selectedFilter].progress,
                        colors: ['#00796B', '#004D40', '#689F38']
                    }}
                    width={width - 40}
                    height={140}
                    chartConfig={chartConfig}
                />
            </View>

            {/* Data Source */}
            <View style={styles.dataSource}>
                <Icon name="database" size={14} color={COLORS.text} />
                <Text style={styles.dataSourceText}>Source: National Health Registry</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        paddingHorizontal: 8,
    },
    headerLeft: {
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: COLORS.primary,
        marginLeft: 12,
    },
    filterContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#E0F2F1',
    },
    activeFilter: {
        backgroundColor: COLORS.primary,
    },
    filterText: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '500',
    },
    activeFilterText: {
        color: '#FFFFFF',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
        marginLeft: 12,
    },
    dataSource: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        padding: 12,
    },
    dataSourceText: {
        fontSize: 12,
        color: '#607D8B',
        marginLeft: 8,
    },
});

export default Analytics;