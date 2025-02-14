import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, TextInput, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const ViewPatients = ({ navigation }) => {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Fetch patients from the API
    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await axios.get('http://192.168.31.16:5000/api/patients');
            setPatients(response.data);
            setFilteredPatients(response.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
            showModal('Failed to fetch patients. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle delete patient
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://192.168.31.16:5000/api/patients/${id}`);
            showModal('Patient deleted successfully!');
            fetchPatients(); // Refresh the list
        } catch (error) {
            console.error('Error deleting patient:', error);
            showModal('Failed to delete patient. Please try again.');
        }
    };

    const navigateToUpdate = (patientId) => {
        navigation.navigate('UpdatePatient', { patientId });
    };

    // Show modal with a message
    const showModal = (message) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    // Handle search
    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = patients.filter(
            (patient) =>
                patient.firstName.toLowerCase().includes(query.toLowerCase()) ||
                patient.lastName.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredPatients(filtered);
    };

    // Navigate to patient details
    const navigateToDetails = (patient) => {
        navigation.navigate('PatientDetails', { patient });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Patient List</Text>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Icon name="magnify" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search patients..."
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>

            {/* Patient List */}
            <FlatList
                data={filteredPatients}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigateToDetails(item)}>
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
                                <View style={styles.actions}>
                                    <TouchableOpacity onPress={() => navigateToUpdate(item._id)}>
                                        <Icon name="pencil" size={24} color="#4CAF50" style={styles.icon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDelete(item._id)}>
                                        <Icon name="delete" size={24} color="#FF3B30" style={styles.icon} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text>Age: {item.age}</Text>
                            <Text>Gender: {item.gender}</Text>
                            <Text>Contact: {item.contactNumber}</Text>
                            <Text>Address: {item.address}</Text>
                            <Text>Blood Group: {item.bloodGroup}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* Modal for Messages */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{modalMessage}</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#4CAF50' },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    searchIcon: { marginRight: 10 },
    searchInput: { flex: 1, paddingVertical: 12, fontSize: 16, color: '#333' },
    card: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    actions: { flexDirection: 'row', gap: 10 },
    icon: { marginHorizontal: 5 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: { fontSize: 18, fontWeight: 'bold', marginVertical: 10, color: '#333' },
    modalButton: {
        marginTop: 10,
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    modalButtonText: { color: 'white', fontSize: 16 },
});

export default ViewPatients;