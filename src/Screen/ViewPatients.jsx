
// screens/ViewPatients.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const patients = [
    { id: '1', name: 'John Doe', age: 30, condition: 'Flu' },
    { id: '2', name: 'Jane Smith', age: 25, condition: 'Cold' },
    { id: '3', name: 'Robert Brown', age: 40, condition: 'Diabetes' },
];

const ViewPatients = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={patients}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text>Age: {item.age}</Text>
                        <Text>Condition: {item.condition}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    card: { backgroundColor: 'white', padding: 15, marginBottom: 10, borderRadius: 8, elevation: 3 },
    name: { fontSize: 18, fontWeight: 'bold' },
});

export default ViewPatients;