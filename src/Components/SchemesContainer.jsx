import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const schemes = [
    { id: 1, name: 'Ayushman Bharat', icon: 'hospital-box', description: 'Provides health insurance up to ₹5 lakh per family per year.' },
    { id: 2, name: 'Janani Suraksha Yojana', icon: 'baby', description: 'Aimed at reducing maternal and infant mortality rates.' },
    { id: 3, name: 'National AIDS Control Program', icon: 'ribbon', description: 'Focused on HIV/AIDS prevention, treatment, and awareness.' },
    { id: 4, name: 'PM National Dialysis Program', icon: 'heart-pulse', description: 'Provides free dialysis services to poor patients.' },
    { id: 5, name: 'Rashtriya Bal Swasthya Karyakram', icon: 'account-child', description: 'Comprehensive child health screening program.' },
    { id: 6, name: 'Mission Indradhanush', icon: 'needle', description: 'Universal immunization program for children and pregnant women.' },
];

const SchemesContainer = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {schemes.map((scheme, index) => (
                    <TouchableOpacity
                        key={scheme.id}
                        style={styles.schemeItem}
                        onPress={() => navigation.navigate('YojanaDetails', { scheme })}
                    >
                        <Icon name={scheme.icon} size={40} color="#007bff" />
                        <Text style={styles.text}>{scheme.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        elevation: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    schemeItem: {
        width: '30%',
        alignItems: 'center',
        marginVertical: 10,
    },
    text: {
        fontSize: 14,
        marginTop: 8,
        textAlign: 'center',
    },
});

export default SchemesContainer;