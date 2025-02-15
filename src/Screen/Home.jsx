import React from 'react';
import { ScrollView, StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { LineChart } from 'react-native-chart-kit';
import KeyMetrics from '../Components/KeyMetrices';
import SchemesContainer from '../Components/SchemesContainer';
import DiseaseHeatMap from '../Components/HeatMap';

const { width } = Dimensions.get('window');

const COLORS = {
    primary: '#00796B',
    secondary: '#004D40',
    accent: '#B2DFDB',
    background: '#F5F5F5',
    text: '#263238',
};

function HomeScreen({ navigation }) {
    // Ensure navigation is available
    const nav = useNavigation(); 

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            data: [120, 150, 180, 160, 140, 170],
            color: (opacity = 1) => COLORS.primary,
            strokeWidth: 3,
        }],
    };

    // Navigation handlers
    const handleQuickActionPress = (action) => {
        switch (action.label) {
            case 'Add Hospital':
                nav.navigate('HospitalTab');
                break;
            case 'Appointments':
                nav.navigate('Appointments');
                break;
            case 'Reports':
                nav.navigate('ReportsTab');
                break;
            case 'Analytics':
                nav.navigate('Analytics');
                break;
            case 'View Hospitals':
                nav.navigate('HospitalsList');
                break;
            default:
                break;
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                {/* Key Metrics */}
                <KeyMetrics />

                {/* Quick Actions Row */}
                <View style={styles.actionsRow}>
                    {[
                        { icon: 'plus-circle', label: 'Add Hospital' },
                        { icon: 'file-document', label: 'Reports' },
                        { icon: 'hospital-building', label: 'View Hospitals' },
                        { icon: 'chart-areaspline', label: 'Analytics' },
                    ].map((action, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.actionCard}
                            onPress={() => handleQuickActionPress(action)}
                        >
                            <LinearGradient
                                colors={['#E0F2F1', '#B2DFDB']}
                                style={styles.actionIconContainer}
                            >
                                <Icon name={action.icon} size={28} color={COLORS.primary} />
                            </LinearGradient>
                            <Text style={styles.actionLabel}>{action.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Main Chart */}
                <View style={styles.chartContainer}>
                    <Text style={styles.sectionTitle}>Patient Admissions Trend</Text>
                    <LineChart
                        data={chartData}
                        width={width - 40}
                        height={220}
                        chartConfig={{
                            backgroundGradientFrom: '#FFFFFF',
                            backgroundGradientTo: '#FFFFFF',
                            decimalPlaces: 0,
                            color: (opacity = 1) => COLORS.primary,
                            labelColor: (opacity = 1) => COLORS.text,
                            propsForDots: {
                                r: '5',
                                strokeWidth: '2',
                                stroke: COLORS.secondary,
                            },
                            propsForBackgroundLines: {
                                stroke: '#E0E0E0',
                            },
                        }}
                        bezier
                        style={styles.chart}
                    />
                </View>

                {/* Disease HeatMap */}
                <DiseaseHeatMap />

                {/* Schemes Container */}
                <SchemesContainer navigation={nav} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContainer: {
        paddingBottom: 24,
    },
    actionsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginBottom: 24,
    },
    actionCard: {
        width: (width - 64) / 2,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    actionIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    actionLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
    },
    chartContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 24,
        elevation: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.primary,
        marginBottom: 16,
        textAlign: 'center',
    },
    chart: {
        borderRadius: 12,
    },
});

export default HomeScreen;
