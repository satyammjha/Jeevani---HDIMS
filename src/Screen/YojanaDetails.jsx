import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const YojanaDetails = ({ route }) => {
    const { scheme } = route.params;

    // Dummy Data
    const genderData = [
        { name: "Men", population: 65, color: "#388E3C" },
        { name: "Women", population: 35, color: "#81C784" }
    ];

    const stateParticipation = {
        labels: ["Maharashtra", "UP", "Bihar", "West Bengal", "Tamil Nadu"],
        datasets: [{
            data: [120, 90, 75, 60, 45]
        }]
    };

    const fundUtilization = {
        labels: ["Q1", "Q2", "Q3", "Q4"],
        datasets: [{
            data: [25, 45, 60, 80],
            color: (opacity = 1) => `rgba(56, 142, 60, ${opacity})`
        }]
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Icon name={scheme.icon} size={60} color="#2E7D32" />
                <Text style={styles.title}>{scheme.name}</Text>
                <Text style={styles.description}>{scheme.description}</Text>
            </View>

            {/* Gender Distribution Pie Chart */}
            <View style={styles.chartCard}>
                <Text style={styles.chartTitle}>Gender Distribution</Text>
                <View style={styles.row}>
                    <PieChart
                        data={genderData}
                        width={screenWidth - 40}
                        height={150}
                        chartConfig={chartConfig}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="0"
                        absolute
                    />
                    <View style={styles.legend}>
                        <View style={styles.legendItem}>
                            <Icon name="gender-male" size={20} color="#388E3C" />
                            <Text style={styles.legendText}>Men: 65%</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <Icon name="gender-female" size={20} color="#81C784" />
                            <Text style={styles.legendText}>Women: 35%</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* State-wise Participation Bar Chart */}
            <View style={styles.chartCard}>
                <Text style={styles.chartTitle}>State-wise Participation</Text>
                <BarChart
                    data={stateParticipation}
                    width={screenWidth - 40}
                    height={220}
                    yAxisSuffix="k"
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                />
            </View>

            {/* Fund Utilization Line Chart */}
            <View style={styles.chartCard}>
                <Text style={styles.chartTitle}>Fund Utilization Progress</Text>
                <LineChart
                    data={fundUtilization}
                    width={screenWidth - 40}
                    height={200}
                    chartConfig={chartConfig}
                    bezier
                />
            </View>

            {/* Key Metrics */}
            <View style={styles.metricsContainer}>
                <View style={styles.metricCard}>
                    <Icon name="account-group" size={24} color="#388E3C" />
                    <Text style={styles.metricValue}>{scheme.registeredIndividuals}</Text>
                    <Text style={styles.metricLabel}>Registered Users</Text>
                </View>
                <View style={styles.metricCard}>
                    <Icon name="currency-inr" size={24} color="#388E3C" />
                    <Text style={styles.metricValue}>₹{scheme.funds}cr</Text>
                    <Text style={styles.metricLabel}>Total Funds</Text>
                </View>
                <View style={styles.metricCard}>
                    <Icon name="progress-check" size={24} color="#388E3C" />
                    <Text style={styles.metricValue}>82%</Text>
                    <Text style={styles.metricLabel}>Utilization</Text>
                </View>
            </View>
        </ScrollView>
    );
};

// Chart configuration
const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(56, 142, 60, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: { r: "4", strokeWidth: "2", stroke: "#388E3C" }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 15,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        elevation: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#1B5E20',
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#4CAF50',
        textAlign: 'center',
        lineHeight: 22,
    },
    chartCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1B5E20',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legend: {
        marginLeft: 20,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    legendText: {
        marginLeft: 8,
        color: '#1B5E20',
    },
    metricsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    metricCard: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        width: '30%',
        elevation: 2,
    },
    metricValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1B5E20',
        marginVertical: 5,
    },
    metricLabel: {
        fontSize: 12,
        color: '#4CAF50',
        textAlign: 'center',
    },
});

export default YojanaDetails;