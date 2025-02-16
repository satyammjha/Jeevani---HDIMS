import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const HeatMapChart = () => {
  // Dummy data for 6 states
  const stateData = [
    { state: 'MH', cases: 1500 },
    { state: 'TN', cases: 1200 },
    { state: 'DL', cases: 900 },
    { state: 'KA', cases: 800 },
    { state: 'GJ', cases: 700 },
    { state: 'UP', cases: 600 },
  ];

  // Generate color gradient based on case count
  const maxCases = Math.max(...stateData.map(item => item.cases));
  const getColor = (cases) => {
    const intensity = cases / maxCases;
    return `rgba(255, ${Math.round(100 - (intensity * 100))}, ${Math.round(100 - (intensity * 100))}, 1)`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>State-wise COVID Cases Heatmap</Text>

      <View style={styles.grid}>
        {stateData.map((item, index) => (
          <View
            key={index}
            style={[
              styles.cell,
              { backgroundColor: getColor(item.cases) }
            ]}
          >
            <Text style={styles.stateLabel}>{item.state}</Text>
            <Text style={styles.caseLabel}>{item.cases}</Text>
          </View>
        ))}
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendText}>Low</Text>
        <View style={styles.legendGradient} />
        <Text style={styles.legendText}>High</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 16,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cell: {
    width: Dimensions.get('window').width / 3.5,
    height: 80,
    margin: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stateLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  caseLabel: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  legendGradient: {
    height: 20,
    width: 150,
    marginHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#ffcccc',
    backgroundImage: 'linear-gradient(to right, #ffcccc, #d32f2f)',
  },
  legendText: {
    fontSize: 12,
    color: '#757575',
  },
});

export default HeatMapChart;