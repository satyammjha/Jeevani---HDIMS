import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export function Charts({ reports, title, yAxisSuffix, barColor, chartWidth, chartHeight }) {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const data = {
        labels: reports.map(report => report.state),
        datasets: [
            {
                data: reports.map(report => report.newCases || report.recoveryRate),
            },
        ],
    };

    const handleBarPress = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <BarChart
                data={data}
                width={chartWidth}
                height={chartHeight}
                yAxisLabel=""
                yAxisSuffix={yAxisSuffix}
                fromZero
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Axis and label color
                    barPercentage: 0.6,
                    propsForBackgroundLines: {
                        strokeWidth: 0.5,
                        strokeDasharray: '0',
                    },
                    propsForLabels: {
                        fontSize: 10,
                    },
                }}
                style={styles.chart}
                onDataPointClick={handleBarPress}
                withHorizontalLabels={true}
                withVerticalLabels={true}
                withInnerLines={true}
                segments={4}
                showBarTops={false}
                flatColor={true}
                withCustomBarColorFromData={true}
                getBarColor={(data, index) =>
                    index === selectedIndex ? '#FF6F61' : barColor
                }
            />
            {selectedIndex !== null && (
                <View style={styles.tooltip}>
                    <Text style={styles.tooltipText}>
                        {reports[selectedIndex].state}: {reports[selectedIndex].newCases || reports[selectedIndex].recoveryRate}{yAxisSuffix}
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
        textAlign: 'center',
    },
    chart: {
        borderRadius: 4,
    },
    tooltip: {
        marginTop: 12,
        padding: 8,
        backgroundColor: '#2196F3',
        borderRadius: 2,
    },
    tooltipText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '500',
    },
});

export default Charts;