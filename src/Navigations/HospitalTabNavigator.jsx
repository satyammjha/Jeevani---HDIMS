import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HospitalHome from '../Screen/HospitalHome';
import HospitalChatScreen from '../Screen/HospitalChatScreen';
import AddPatient from '../Screen/AddPatient';
import ViewPatients from '../Screen/ViewPatients';
import Reports from '../Screen/Reorts';
import QRScannerScreen from '../Screen/QrCodeScanner';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HospitalHome" component={HospitalHome} options={{ title: 'Home' }} />
            <Stack.Screen name="ViewPatients" component={ViewPatients} options={{ title: 'Patients' }} />
            <Stack.Screen name="Reports" component={Reports} options={{ title: 'Reports' }} />
            <Stack.Screen name="QRScanner" component={QRScannerScreen} options={{ title: 'Scan QR Code' }} />
        </Stack.Navigator>
    );
}

function HospitalTabNavigator() {
    const [notificationsVisible, setNotificationsVisible] = useState(false);

    const toggleNotifications = () => {
        setNotificationsVisible(!notificationsVisible);
    };

    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'HomeStack') {
                            iconName = 'home';
                        } else if (route.name === 'HospitalChat') {
                            iconName = 'chat';
                        } else if (route.name === 'AddPatient') {
                            iconName = 'account-plus';
                        } else if (route.name === 'QRScanner') {
                            iconName = 'qrcode-scan';
                        }
                        return <Icon name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#2196F3',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: { backgroundColor: '#fff', paddingBottom: 5 },
                    headerTitle: () => (
                        <TouchableOpacity onPress={() => console.log('Navigate to Home')}>
                            <Image source={require('../Assets/jeevanilogo.png')} style={{ width: 100, height: 40 }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={toggleNotifications} style={{ marginRight: 15 }}>
                            <Icon name="bell" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                })}
            >
                <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: 'Home' }} />
                <Tab.Screen name="HospitalChat" component={HospitalChatScreen} options={{ title: 'Chat' }} />
                <Tab.Screen name="AddPatient" component={AddPatient} options={{ title: 'Add Patient' }} />
                <Tab.Screen name="QRScanner" component={QRScannerScreen} options={{ title: 'Scan QR' }} />
            </Tab.Navigator>

            <Modal visible={notificationsVisible} onRequestClose={toggleNotifications} transparent animationType="slide">
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={toggleNotifications}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Notifications</Text>
                        <Text>No new notifications</Text>
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 300,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default HospitalTabNavigator;