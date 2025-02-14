import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const Resources = () => {
  // Dummy data - replace with actual data
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
    ]
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

  const ResourceSection = ({ title, data }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.grid}>
        {data.map((item) => (
          <ResourceCard key={item.id} item={item} />
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hospital Resources</Text>
        <Text style={styles.updateText}>Last updated: 1 hour ago</Text>
      </View>

      <ResourceSection title="Medical Staff" data={resources.staff} />
      <ResourceSection title="Facilities" data={resources.facilities} />
      <ResourceSection title="Medical Equipment" data={resources.equipment} />

      <View style={styles.statusContainer}>
        <Icon name="alert-circle" size={24} color="#00796B" />
        <Text style={styles.statusText}>All systems operational</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 8,
  },
  updateText: {
    color: '#666',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00796B',
    marginBottom: 16,
    paddingLeft: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: width / 2 - 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardIconContainer: {
    backgroundColor: '#E0F2F1',
    padding: 12,
    borderRadius: 50,
    marginBottom: 12,
  },
  cardCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#E0F2F1',
    borderRadius: 8,
    marginTop: 16,
  },
  statusText: {
    color: '#00796B',
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default Resources;