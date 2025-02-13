import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import KeyMetrics from '../Components/KeyMetrices';
import QuickActions from '../Components/QuickActions';
import { Charts } from '../Components/Charts';
import SchemesContainer from '../Components/SchemesContainer';

const screenWidth = Dimensions.get('window').width;

function HomeScreen() {
    const theme = useTheme();
    const carouselData = [
        { id: '1', title: 'Slide 1', description: 'This is the first slide.' },
        { id: '2', title: 'Slide 2', description: 'This is the second slide.' },
        { id: '3', title: 'Slide 3', description: 'This is the third slide.' },
    ];

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
                <KeyMetrics />
                <QuickActions />

                {/* Charts Section */}
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

                {/* Schemes Section */}
                <SchemesContainer route={{ params: { scheme: dummyScheme } }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Changed to white for a clean look
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    scrollContainer: {
        paddingBottom: 32,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24, // Increased margin for better spacing
        gap: 16, // Added gap between charts
    },
    chartContainer: {
        width: screenWidth / 2 - 24,
        backgroundColor: '#FFFFFF', // Changed to white
        borderRadius: 12,
        padding: 16, // Increased padding
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1, // Subtle shadow
        shadowRadius: 8,
        elevation: 1,
    },
});

export default HomeScreen;