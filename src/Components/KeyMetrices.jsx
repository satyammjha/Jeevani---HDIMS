import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;
const dataFilters = ['daily', 'weekly', 'monthly'];

function KeyMetrics() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const data = {
    daily: {
      totalPatients: 1234,
      percentage: 5,
      chartData: [45, 68, 72, 58, 81, 63, 49]
    },
    weekly: {
      totalPatients: 8540,
      percentage: 12,
      chartData: [120, 145, 132, 158, 142, 165, 180]
    },
    monthly: {
      totalPatients: 32100,
      percentage: 20,
      chartData: [450, 480, 510, 490, 530, 560, 600]
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true
      }).start(() => {
        const nextIndex = (activeIndex + 1) % dataFilters.length;
        setActiveIndex(nextIndex);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true
        }).start();
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const currentData = data[dataFilters[activeIndex]];

  return (
    <View style={styles.metricsContainer}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Card style={styles.metricCard}>
          <Card.Content>
            <Title style={styles.metricTitle}>
              Total Patients: {currentData.totalPatients.toLocaleString()}
            </Title>
            <Title style={styles.metricSubtitle}>
              ▲ {currentData.percentage}% from last period
            </Title>

            <LineChart
              data={{
                labels: [],
                datasets: [{ data: currentData.chartData }]
              }}
              width={screenWidth - 70}
              height={180}
              withDots={false}
              withShadow={false}
              withInnerLines={false}
              chartConfig={{
                backgroundGradientFrom: '#E0F2F1',
                backgroundGradientTo: '#B2DFDB',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 121, 107, ${opacity})`,
                strokeWidth: 3,
                propsForBackgroundLines: {
                  strokeDasharray: '',
                  stroke: '#E0F2F1'
                }
              }}
              bezier
              style={styles.chart}
            />
          </Card.Content>
        </Card>
      </Animated.View>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {dataFilters.map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.dot,
              activeIndex === idx && styles.activeDot
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  metricsContainer: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  metricCard: {
    borderRadius: 16,
    backgroundColor: '#00796B',
    elevation: 0,
    shadowColor: '#004D40',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  metricTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  metricSubtitle: {
    fontSize: 14,
    color: '#B2DFDB',
    marginBottom: 20,
  },
  chart: {
    marginTop: 12,
    borderRadius: 12,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#B2DFDB',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#00796B',
    width: 16,
  },
});

export default KeyMetrics;