import React from 'react';
import { ScrollView, StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { LineChart } from 'react-native-chart-kit';
import KeyMetrics from '../Components/KeyMetrices';
import SchemesContainer from '../Components/SchemesContainer';

const { width } = Dimensions.get('window');
const COLORS = {
    primary: '#00796B',
    secondary: '#004D40',
    accent: '#B2DFDB',
    background: '#F5F5F5',
    text: '#263238',
};

function HomeScreen() {
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            data: [120, 150, 180, 160, 140, 170],
            color: (opacity = 1) => COLORS.primary,
            strokeWidth: 3,
        }],
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Header Banner */}

                <LinearGradient
                    colors={[COLORS.primary, COLORS.secondary]}
                    style={styles.header}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <View style={styles.headerContent}>
                        <Icon name="hospital-box" size={32} color="#fff" />
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerTitle}>Jeevani HDIMS</Text>
                        </View>
                    </View>
                </LinearGradient>
                {/* Key Metrics */}
                <KeyMetrics />

                {/* Quick Actions Row */}
                <View style={styles.actionsRow}>
                    {[
                        { icon: 'plus-circle', label: 'New Patient' },
                        { icon: 'calendar-clock', label: 'Appointments' },
                        { icon: 'file-document', label: 'Reports' },
                        { icon: 'chart-areaspline', label: 'Analytics' },
                    ].map((action, index) => (
                        <TouchableOpacity key={index} style={styles.actionCard}>
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

                {/* Schemes Container */}
                <SchemesContainer />
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

    header: {
        padding: 24,
        margin: 16,
        borderRadius: 16,
        elevation: 0,
        shadowColor: COLORS.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#fff',
        marginTop: 12,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#B2DFDB',
        marginTop: 4,
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
    header: {
        padding: 24,
        margin: 16,
        borderRadius: 16,
        elevation: 8,
        shadowColor: COLORS.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTextContainer: {
        marginLeft: 16,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#fff',
        letterSpacing: 0.5,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#B2DFDB',
        marginTop: 4,
        fontWeight: '500',
    },
});

export default HomeScreen;