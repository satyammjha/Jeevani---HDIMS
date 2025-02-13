import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Charts } from '../Components/Charts';

const screenWidth = Dimensions.get('window').width;

const YojanaDetails = ({ route }) => {
    const { scheme } = route.params;
    
    const randomData = Array.from({ length: 5 }, (_, i) => ({
        id: (i + 1).toString(),
        state: `State ${i + 1}`,
        newCases: Math.floor(Math.random() * 200) + 50,
    }));

    return (
        <View style={styles.container}>
            <Icon name={scheme.icon} size={60} color="#2E7D32" style={styles.icon} />
            <Text style={styles.title}>{scheme.name}</Text>
            <Text style={styles.description}>{scheme.description}</Text>

            <View style={styles.chartContainer}>
                <Charts
                    reports={randomData}
                    title="Current Statistics"
                    yAxisSuffix=""
                    barColor="#388E3C"
                    chartWidth={screenWidth - 40}
                    chartHeight={220}
                />
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.detail}><Text style={styles.label}>Registered Individuals:</Text> {scheme.registeredIndividuals}</Text>
                <Text style={styles.detail}><Text style={styles.label}>Men:</Text> {scheme.men}</Text>
                <Text style={styles.detail}><Text style={styles.label}>Women:</Text> {scheme.women}</Text>
                <Text style={styles.detail}><Text style={styles.label}>Funds Allocated:</Text> ₹{scheme.funds}</Text>
                <Text style={styles.detail}><Text style={styles.label}>Region:</Text> {scheme.region}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#E8F5E9',
    },
    icon: {
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1B5E20',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#2E7D32',
    },
    chartContainer: {
        width: '100%',
        backgroundColor: '#A5D6A7',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#1B5E20',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    detailsContainer: {
        width: '100%',
        padding: 12,
        backgroundColor: '#C8E6C9',
        borderRadius: 12,
        shadowColor: '#1B5E20',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
    },
    detail: {
        fontSize: 16,
        marginBottom: 8,
        color: '#1B5E20',
    },
    label: {
        fontWeight: 'bold',
        color: '#004D40',
    },
});

export default YojanaDetails;