import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HospitalHome from '../Screen/HospitalHome';
import HospitalChatScreen from '../Screen/HospitalChatScreen';
import QRScannerScreen from '../Screen/QrCodeScanner'; // Import the QR Scanner screen
import AddPatient from '../Screen/AddPatient'; // Import the AddPatient screen

const Tab = createBottomTabNavigator();

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
                        if (route.name === 'HospitalHome') {
                            iconName = 'home';
                        } else if (route.name === 'HospitalChat') {
                            iconName = 'chat'; // Use a chat icon for the chat screen
                        } else if (route.name === 'QRScanner') {
                            iconName = 'qrcode-scan'; // Use a QR code icon for the scanner screen
                        } else if (route.name === 'AddPatient') {
                            iconName = 'account-plus'; // Use an icon for the AddPatient screen
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
                <Tab.Screen name="HospitalHome" component={HospitalHome} options={{ title: 'Home' }} />
                <Tab.Screen
                    name="HospitalChat"
                    component={HospitalChatScreen}
                    options={{ title: 'Chat' }} // Set the title for the chat screen
                />
                <Tab.Screen
                    name="QRScanner"
                    component={QRScannerScreen}
                    options={{ title: 'Scan QR' }} // Set the title for the QR scanner screen
                />
                <Tab.Screen
                    name="AddPatient"
                    component={AddPatient}
                    options={{ title: 'Add Patient' }} // Set the title for the AddPatient screen
                />
            </Tab.Navigator>

            {/* Reuse the same notifications modal */}
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