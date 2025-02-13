import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, useTheme, Button } from 'react-native-paper';

function KeyMetrics() {
  const theme = useTheme();
  const [filter, setFilter] = useState('daily');

  const data = {
    daily: { totalPatients: '1,234', activePrograms: '5', facilitiesCovered: '23', percentage: '+5%' },
    weekly: { totalPatients: '8,540', activePrograms: '5', facilitiesCovered: '23', percentage: '+12%' },
    monthly: { totalPatients: '32,100', activePrograms: '5', facilitiesCovered: '23', percentage: '+20%' },
  };

  return (
    <View style={[styles.metricsContainer, { backgroundColor: '#ffffff' }]}>      
      <Card style={[styles.metricCard, { backgroundColor: '#ffffff', elevation: 4 }]}>
        <Card.Content>
          <View style={styles.filterContainer}>
            <Button mode={filter === 'daily' ? 'contained' : 'outlined'} onPress={() => setFilter('daily')}>
              Daily
            </Button>
            <Button mode={filter === 'weekly' ? 'contained' : 'outlined'} onPress={() => setFilter('weekly')}>
              Weekly
            </Button>
            <Button mode={filter === 'monthly' ? 'contained' : 'outlined'} onPress={() => setFilter('monthly')}>
              Monthly
            </Button>
          </View>
          
          <Title style={[styles.metricTitle, { color: theme.colors.primary }]}>Total Patients: {data[filter].totalPatients} ({data[filter].percentage})</Title>
          <Title style={[styles.metricSubtitle, { color: theme.colors.text }]}>Active Programs: {data[filter].activePrograms}</Title>
          <Title style={[styles.metricSubtitle, { color: theme.colors.text }]}>States Covered: {data[filter].facilitiesCovered}</Title>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  metricsContainer: {
    flexDirection: 'column',
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    borderRadius:2
  },
  metricCard: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  metricTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  metricSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 4,
  },
});

export default KeyMetrics;