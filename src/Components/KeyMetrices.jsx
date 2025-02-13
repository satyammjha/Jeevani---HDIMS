import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, Title, useTheme, Button } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

function KeyMetrics() {
  const theme = useTheme();
  const [filter, setFilter] = useState('daily');

  const data = {
    daily: { totalPatients: 1234, activePrograms: 5, facilitiesCovered: 23, percentage: 5 },
    weekly: { totalPatients: 8540, activePrograms: 5, facilitiesCovered: 23, percentage: 12 },
    monthly: { totalPatients: 32100, activePrograms: 5, facilitiesCovered: 23, percentage: 20 },
  };

  const chartData = {
    labels: ['Daily', 'Weekly', 'Monthly'],
    datasets: [
      {
        data: [data.daily.totalPatients, data.weekly.totalPatients, data.monthly.totalPatients],
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.metricsContainer}>
      <Card style={styles.metricCard}>
        <Card.Content>
          {/* Filter Buttons */}
          <View style={styles.filterContainer}>
            <Button
              mode={filter === 'daily' ? 'contained' : 'outlined'}
              onPress={() => setFilter('daily')}
              style={styles.filterButton}
              labelStyle={styles.filterButtonLabel}
            >
              Daily
            </Button>
            <Button
              mode={filter === 'weekly' ? 'contained' : 'outlined'}
              onPress={() => setFilter('weekly')}
              style={styles.filterButton}
              labelStyle={styles.filterButtonLabel}
            >
              Weekly
            </Button>
            <Button
              mode={filter === 'monthly' ? 'contained' : 'outlined'}
              onPress={() => setFilter('monthly')}
              style={styles.filterButton}
              labelStyle={styles.filterButtonLabel}
            >
              Monthly
            </Button>
          </View>

          {/* Metrics */}
          <Title style={styles.metricTitle}>Total Patients: {data[filter].totalPatients}</Title>
          <Title style={styles.metricSubtitle}>+{data[filter].percentage}%</Title>
          <Title style={styles.metricSubtitle}>Active Programs: {data[filter].activePrograms}</Title>
          <Title style={styles.metricSubtitle}>States Covered: {data[filter].facilitiesCovered}</Title>

          {/* Line Chart */}
          {/* <LineChart
            data={chartData}
            width={screenWidth - 40}
            height={120}
            chartConfig={{
              backgroundGradientFrom: '#FFFFFF',
              backgroundGradientTo: '#FFFFFF',
              color: (opacity = 1) => `rgba(56, 142, 60, ${opacity})`,
              strokeWidth: 2,
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#388E3C',
              },
              propsForBackgroundLines: {
                stroke: '#E0E0E0',
              },
              propsForLabels: {
                fontSize: 10,
                color: '#757575',
              },
            }}
            bezier
            withHorizontalLabels={true}
            withVerticalLabels={true}
            withInnerLines={true}
            withOuterLines={false}
            style={styles.chart}
          /> */}
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  metricsContainer: {
    marginBottom: 16,
  },
  metricCard: {
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    padding: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  filterButtonLabel: {
    fontSize: 12,
  },
  metricTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
    color: '#212121',
  },
  metricSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
    color: '#757575',
  },
  chart: {
    marginTop: 12,
    borderRadius: 8,
  },
});

export default KeyMetrics;