import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const Resources = () => {
  const resources = {
    staff: [
      { id: 1, name: 'Doctors', count: 45, icon: 'doctor' },
      { id: 2, name: 'Nurses', count: 120, icon: 'nurse' },
      { id: 3, name: 'Technicians', count: 35, icon: 'account-wrench' },
      { id: 4, name: 'Support Staff', count: 80, icon: 'account-hard-hat' },
    ],
    facilities: [
      { id: 5, name: 'General Beds', count: 300, icon: 'bed' },
      { id: 6, name: 'ICU Beds', count: 50, icon: 'hospital-box' },
      { id: 7, name: 'Operation Theaters', count: 15, icon: 'hospital-building' },
      { id: 8, name: 'Emergency Rooms', count: 20, icon: 'ambulance' },
    ],
    equipment: [
      { id: 9, name: 'Ventilators', count: 40, icon: 'lungs' },
      { id: 10, name: 'ECG Machines', count: 25, icon: 'heart-pulse' },
      { id: 11, name: 'X-Ray Machines', count: 12, icon: 'radiology-box' },
      { id: 12, name: 'Dialysis Machines', count: 18, icon: 'kidney' },
    ],
    supplies: [
      { id: 13, name: 'Oxygen Cylinders', count: 200, icon: 'gas-cylinder' },
      { id: 14, name: 'Ambulances', count: 10, icon: 'ambulance' },
      { id: 15, name: 'Pharmacy Stock', count: 5000, icon: 'pill' },
      { id: 16, name: 'Diagnostic Facilities', count: 8, icon: 'flask' },
      { id: 17, name: 'Medical Waste Disposal', count: 3, icon: 'delete-circle' },
    ]
  };

  const icuUtilizationData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [30, 35, 40, 38, 42, 45, 50],
        color: (opacity = 1) => `rgba(0, 121, 107, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const ResourceCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardIconContainer}>
        <Icon name={item.icon} size={28} color="#00796B" />
      </View>
      <Text style={styles.cardCount}>{item.count}</Text>
      <Text style={styles.cardLabel}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hospital Resources</Text>
        <Text style={styles.updateText}>Last updated: 1 hour ago</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ICU Bed Utilization</Text>
        <LineChart
          data={icuUtilizationData}
          width={width - 32}
          height={200}
          chartConfig={{
            backgroundColor: 'transparent',
            backgroundGradientFrom: 'transparent',
            backgroundGradientTo: 'transparent',
            color: (opacity = 1) => `rgba(0, 121, 107, ${opacity})`,
            labelColor: () => '#00796B',
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#00796B',
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Resources</Text>
        {Object.values(resources).flat().map((item) => (
          <ResourceCard key={item.id} item={item} />
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8FAFB',
    padding: 20,
  },
  header: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E7ED',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A2E35',
    marginBottom: 4,
    fontFamily: 'System', // Use actual font if available
  },
  updateText: {
    color: '#8A9BA8',
    fontSize: 13,
    fontWeight: '500',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A2E35',
    marginBottom: 20,
    paddingLeft: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#00796B',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: width / 2 - 28,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#396B9D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F4F8',
  },
  cardIconContainer: {
    backgroundColor: '#E8F4F3',
    padding: 14,
    borderRadius: 14,
    marginBottom: 16,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardCount: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A2E35',
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 14,
    color: '#5A6B7A',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    padding: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#396B9D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
export default Resources;