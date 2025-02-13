import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import KeyMetrics from '../Components/KeyMetrices';
import QuickActions from '../Components/QuickActions';
import { Charts } from '../Components/Charts';
// import Slider, { MyCarousel } from '../Components/Slides';

const screenWidth = Dimensions.get('window').width;

function HomeScreen() {
    const theme = useTheme();

    // Dummy data for new reported cases
    const newCasesData = [
        { id: '1', state: 'DEL', newCases: 120 },
        { id: '2', state: 'HR', newCases: 95 },
        { id: '3', state: 'CHD', newCases: 110 }
    ];

    // Dummy data for recovery rate
    const recoveryRateData = [
        { id: '1', state: 'DEL', recoveryRate: 85 },
        { id: '2', state: 'HR', recoveryRate: 90 },
        { id: '3', state: 'CHD', recoveryRate: 88 }
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* <MyCarousel /> */}
                <KeyMetrics />
                <QuickActions />

                <View style={styles.rowContainer}>
                    <View style={styles.chartContainer}>
                        <Charts
                            reports={newCasesData}
                            title="New Cases"
                            yAxisSuffix=""
                            barColor="#FF9800"
                            chartWidth={screenWidth / 2 - 24}
                            chartHeight={200}
                        />
                    </View>
                    <View style={styles.chartContainer}>
                        <Charts
                            reports={recoveryRateData}
                            title="Recovery Rate"
                            yAxisSuffix="%"
                            barColor="#4CAF50"
                            chartWidth={screenWidth / 2 - 24}
                            chartHeight={200}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    scrollContainer: {
        paddingBottom: 32,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    chartContainer: {
        width: screenWidth / 2 - 24,
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
});

export default HomeScreen;