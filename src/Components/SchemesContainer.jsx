import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const COLORS = {
  primary: '#00796B',
  secondary: '#004D40',
  accent: '#B2DFDB',
  background: '#FFFFFF',
  text: '#263238',
  textSecondary: '#607D8B',
};

const schemes = [
    { id: 1, name: 'Ayushman Bharat', icon: 'hospital-box', description: 'Health insurance up to ₹5 lakh/year' },
    { id: 2, name: 'Janani Suraksha', icon: 'baby', description: 'Maternal & infant health program' },
    { id: 3, name: 'National AIDS Control', icon: 'ribbon', description: 'HIV/AIDS prevention & treatment' },
    { id: 4, name: 'PM Dialysis Program', icon: 'heart-pulse', description: 'Free dialysis services' },
    { id: 5, name: 'Bal Swasthya', icon: 'account-child', description: 'Child health screening' },
    { id: 6, name: 'Mission Indradhanush', icon: 'needle', description: 'Immunization program' },
];

const SchemesContainer = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Government Health Schemes</Text>
            <View style={styles.grid}>
                {schemes.map((scheme) => (
                    <TouchableOpacity
                        key={scheme.id}
                        style={styles.schemeCard}
                        onPress={() => navigation.navigate('YojanaDetails', { scheme })}
                    >
                        <View style={styles.iconContainer}>
                            <Icon 
                                name={scheme.icon} 
                                size={32} 
                                color={COLORS.primary} 
                            />
                        </View>
                        <Text style={styles.schemeName}>{scheme.name}</Text>
                        <Text style={styles.schemeDescription}>{scheme.description}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.primary,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    schemeCard: {
        width: '48%',
        backgroundColor: COLORS.background,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 0,
        shadowColor: COLORS.secondary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    iconContainer: {
        backgroundColor: '#E0F2F1',
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    schemeName: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 4,
    },
    schemeDescription: {
        fontSize: 12,
        color: COLORS.textSecondary,
        lineHeight: 16,
    },
});

export default SchemesContainer;