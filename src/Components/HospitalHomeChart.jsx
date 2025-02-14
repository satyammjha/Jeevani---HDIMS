import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export function LineChartComponent({ reports, title, yAxisSuffix, chartWidth, chartHeight }) {
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const chartData = {
        labels: reports.map(report => report.date),
        datasets: [
            {
                data: reports.map(report => report.value),
                color: (opacity = 1) => `#00796B`,
                strokeWidth: 2
            }
        ],
    };

    const handleDataPointClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <LineChart
                data={chartData}
                width={chartWidth}
                height={chartHeight - 20}
                yAxisSuffix={yAxisSuffix}
                fromZero
                chartConfig={{
                    backgroundColor: '#fff',
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    propsForDots: {
                        r: "3",
                        strokeWidth: "1.5",
                        stroke: "#00796B"
                    },
                    propsForBackgroundLines: {
                        strokeWidth: 0.3,
                        strokeDasharray: '0',
                    },
                    propsForLabels: {
                        fontSize: 9
                    }
                }}
                bezier
                style={styles.chart}
                onDataPointClick={handleDataPointClick}
                withVerticalLines={false}
                withHorizontalLines
                withInnerLines
                withOuterLines
                segments={3}
            />
            {selectedIndex !== null && (
                <View style={styles.tooltip}>
                    <Text style={styles.tooltipText}>
                        {reports[selectedIndex].date}: {reports[selectedIndex].value}{yAxisSuffix}
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 10,
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    chart: {
        borderRadius: 6,
        paddingRight: 20,
    },
    tooltip: {
        marginTop: 8,
        padding: 6,
        backgroundColor: '#2196F3',
        borderRadius: 3,
    },
    tooltipText: {
        fontSize: 10,
        color: '#fff',
        fontWeight: '500',
    },
});

export default LineChartComponent;