import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Reports = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Monthly Report</Text>
            <Text>Total Patients: 50</Text>
            <Text>New Admissions: 10</Text>
            <Text>Discharged: 8</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});

export default Reports;
