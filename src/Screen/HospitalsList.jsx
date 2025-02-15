import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const COLORS = {
    primary: '#00796B',
    secondary: '#004D40',
    accent: '#B2DFDB',
    background: '#F5F5F5',
    text: '#263238',
    error: '#D32F2F',
};

const HospitalsListScreen = () => {
    const navigation = useNavigation();
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchHospitals = async () => {
        try {
            const response = await fetch('http://192.168.117.108:5000/api/hospitals');
            if (!response.ok) {
                throw new Error('Failed to fetch hospitals');
            }
            const data = await response.json();
            setHospitals(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch hospitals');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchHospitals();
        });

        return unsubscribe;
    }, [navigation]);

    const HospitalCard = ({ hospital }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('HospitalDetail', { hospital })}
        >
            <LinearGradient
                colors={['#E0F2F1', '#B2DFDB']}
                style={styles.gradient}
            >
                <Icon name="hospital-building" size={24} color={COLORS.primary} />
            </LinearGradient>

            <View style={styles.cardContent}>
                <Text style={styles.hospitalName}>{hospital.name}</Text>
                <Text style={styles.hospitalAddress}>{hospital.address}</Text>

                <View style={styles.detailsRow}>
                    <Icon name="phone" size={16} color={COLORS.text} />
                    <Text style={styles.detailText}>{hospital.contact}</Text>
                </View>
                <View style={styles.detailsRow}>
                    <Icon name="bed" size={16} color={COLORS.text} />
                    <Text style={styles.detailText}>
                        {hospital.beds} Beds Available
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.emptyContainer}>
                <Icon name="alert-circle" size={48} color={COLORS.error} />
                <Text style={styles.emptyText}>{error}</Text>
                <TouchableOpacity
                    style={styles.retryButton}
                    onPress={fetchHospitals}
                >
                    <Text style={styles.retryText}>Try Again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Registered Hospitals</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('HospitalTab')}
                >
                    <Icon name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {hospitals.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Icon name="hospital" size={48} color={COLORS.primary} />
                    <Text style={styles.emptyText}>No hospitals found</Text>
                    <Text style={styles.emptySubtext}>Add a new hospital to get started</Text>
                    <TouchableOpacity
                        style={styles.addHospitalButton}
                        onPress={() => navigation.navigate('HospitalTab')}
                    >
                        <Text style={styles.addHospitalText}>Add Hospital</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={hospitals}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <HospitalCard hospital={item} />}
                    contentContainerStyle={styles.listContent}
                    scrollEnabled={false}
                />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.background,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        paddingHorizontal: 8,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.primary,
    },
    addButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 50,
        padding: 12,
        elevation: 2,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    gradient: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    cardContent: {
        flex: 1,
    },
    hospitalName: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 4,
    },
    hospitalAddress: {
        fontSize: 14,
        color: '#607D8B',
        marginBottom: 8,
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    detailText: {
        fontSize: 14,
        color: COLORS.text,
        marginLeft: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: '600',
        color: COLORS.text,
        marginTop: 16,
        textAlign: 'center',
    },
    emptySubtext: {
        fontSize: 16,
        color: '#607D8B',
        marginTop: 8,
        textAlign: 'center',
    },
    addHospitalButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginTop: 24,
    },
    addHospitalText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    retryButton: {
        backgroundColor: COLORS.error,
        borderRadius: 8,
        padding: 12,
        marginTop: 16,
    },
    retryText: {
        color: 'white',
        fontWeight: '600',
    },
    listContent: {
        paddingBottom: 24,
    },
});

export default HospitalsListScreen;