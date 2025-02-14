import React from 'react';
import { ScrollView, StyleSheet, View, Text, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import KeyMetrics from '../Components/KeyMetrices';
import QuickActions from '../Components/QuickActions';
import { Charts } from '../Components/Charts';
import SchemesContainer from '../Components/SchemesContainer';

const screenWidth = Dimensions.get('window').width;

function HomeScreen() {
    const theme = useTheme();
    const newCasesData = [
        { id: '1', state: 'DEL', newCases: 120 },
        { id: '2', state: 'HR', newCases: 95 },
        { id: '3', state: 'CHD', newCases: 110 }
    ];

    const recoveryRateData = [
        { id: '1', state: 'DEL', recoveryRate: 85 },
        { id: '2', state: 'HR', recoveryRate: 90 },
        { id: '3', state: 'CHD', recoveryRate: 88 }
    ];

    const dummyScheme = {
        name: "Pradhan Mantri Awas Yojana",
        description: "A government initiative to provide affordable housing.",
        icon: "home-city",
        registeredPeople: 50000,
        men: 25000,
        women: 25000,
        fundsAllocated: "₹500 Crore",
        region: "All India"
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.bannerContainer}>
                    <Icon name="hospital-building" size={24} color="#FFFFFF" style={styles.bannerIcon} />
                    <Text style={styles.bannerText}>Welcome to Jeevani</Text>
                </View>
                <KeyMetrics />
                <View style={styles.rowContainer}>
                    <View style={styles.chartContainer}>
                        <Charts
                            reports={newCasesData}
                            title="New Cases"
                            yAxisSuffix=""
                            barColor="#4CAF50"
                            chartWidth={screenWidth / 2 - 24}
                            chartHeight={200}
                        />
                    </View>
                    <View style={styles.chartContainer}>
                        <Charts
                            reports={recoveryRateData}
                            title="Recovery Rate"
                            yAxisSuffix="%"
                            barColor="#388E3C"
                            chartWidth={screenWidth / 2 - 24}
                            chartHeight={200}
                        />
                    </View>
                </View>

                <SchemesContainer route={{ params: { scheme: dummyScheme } }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    scrollContainer: {
        paddingBottom: 32,
    },
    bannerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    bannerIcon: {
        marginRight: 10,
    },
    bannerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        gap: 16,
    },
    chartContainer: {
        width: screenWidth / 2 - 24,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
        alignItems: 'center',
    },
});

export default HomeScreen;