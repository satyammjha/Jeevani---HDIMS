import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HospitalHome from '../Screen/HospitalHome';
import HospitalChatScreen from '../Screen/HospitalChatScreen';
import AddPatient from '../Screen/AddPatient';
import ViewPatients from '../Screen/ViewPatients';
import Reports from '../Screen/Reorts';
import PatientDetails from '../Screen/PatientDetails';
import UpdatePatient from '../Screen/UpdatePatient';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Colors constant
const COLORS = {
    primary: '#2A86FF',
    secondary: '#F0F5FF',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#7F8FA6',
    success: '#4CAF50',
    danger: '#FF5252',
};

// Home Stack Navigator
function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: COLORS.white,
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerTitleStyle: {
                    color: COLORS.primary,
                    fontSize: 20,
                    fontWeight: 'bold',
                },
                headerTintColor: COLORS.primary,
            }}
        >
            <Stack.Screen
                name="HospitalHome"
                component={HospitalHome}
                options={{ title: 'Dashboard' }}
            />
            <Stack.Screen
                name="ViewPatients"
                component={ViewPatients}
                options={{ title: 'Patient List' }}
            />
            <Stack.Screen
                name="PatientDetails"
                component={PatientDetails}
                options={{ title: 'Patient Profile' }}
            />
            <Stack.Screen
                name="UpdatePatient"
                component={UpdatePatient}
                options={{ title: 'Edit Patient' }}
            />
            <Stack.Screen
                name="Reports"
                component={Reports}
                options={{ title: 'Medical Reports' }}
            />
        </Stack.Navigator>
    );
}

function HospitalTabNavigator() {
    const [notificationsVisible, setNotificationsVisible] = useState(false);
    const [notifications] = useState([
        { id: 1, title: 'New patient registered', time: '2 min ago' },
        { id: 2, title: 'Lab results available', time: '1 hour ago' },
        { id: 3, title: 'System update available', time: '4 hours ago' },
    ]);

    const animatedValue = new Animated.Value(0);

    const toggleNotifications = () => {
        setNotificationsVisible(!notificationsVisible);
        Animated.timing(animatedValue, {
            toValue: notificationsVisible ? 0 : 1,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
    };

    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-500, 0],
    });

    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'HospitalChat') {
                            iconName = focused ? 'message-text' : 'message-text-outline';
                        } else if (route.name === 'AddPatient') {
                            iconName = focused ? 'account-plus' : 'account-plus-outline';
                        }
                        return (
                            <View style={styles.tabIconContainer}>
                                <Icon name={iconName} size={28} color={color} />
                                {focused && <View style={styles.activeTabIndicator} />}
                            </View>
                        );
                    },
                    tabBarActiveTintColor: COLORS.primary,
                    tabBarInactiveTintColor: COLORS.gray,
                    tabBarStyle: {
                        backgroundColor: COLORS.white,
                        height: 70,
                        paddingBottom: 10,
                        borderTopWidth: 0,
                        elevation: 10,
                        shadowColor: COLORS.black,
                        shadowOffset: { width: 0, height: -5 },
                        shadowOpacity: 0.1,
                        shadowRadius: 10,
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: '500',
                        marginTop: 4,
                    },
                    headerTitle: () => (
                        <View style={styles.headerContainer}>
                            <Image
                                source={require('../Assets/jeevanilogo.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={toggleNotifications}
                            style={styles.notificationButton}
                        >
                            <Icon name="bell" size={24} color={COLORS.primary} />
                            <View style={styles.notificationBadge} />
                        </TouchableOpacity>
                    ),
                    headerStyle: {
                        backgroundColor: COLORS.white,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                })}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeStack}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="HospitalChat"
                    component={HospitalChatScreen}
                    options={{ title: 'Messages' }}
                />
                <Tab.Screen
                    name="AddPatient"
                    component={AddPatient}
                    options={{ title: 'New Patient' }}
                />
            </Tab.Navigator>

            {/* Notifications Modal */}
            <Modal
                visible={notificationsVisible}
                transparent
                animationType="none"
                onRequestClose={toggleNotifications}
            >
                <Animated.View style={[styles.modalContainer, { transform: [{ translateY }] }]}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Notifications</Text>
                        <TouchableOpacity onPress={toggleNotifications}>
                            <Icon name="close" size={24} color={COLORS.gray} />
                        </TouchableOpacity>
                    </View>

                    {notifications.length === 0 ? (
                        <View style={styles.emptyNotification}>
                            <Icon name="bell-off" size={40} color={COLORS.gray} />
                            <Text style={styles.emptyNotificationText}>No new notifications</Text>
                        </View>
                    ) : (
                        notifications.map((notification) => (
                            <TouchableOpacity
                                key={notification.id}
                                style={styles.notificationItem}
                            >
                                <View style={styles.notificationIcon}>
                                    <Icon name="alert-circle" size={24} color={COLORS.primary} />
                                </View>
                                <View style={styles.notificationContent}>
                                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                                    <Text style={styles.notificationTime}>{notification.time}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    )}
                </Animated.View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 40,
    },
    tabIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 8,
    },
    activeTabIndicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.primary,
        marginTop: 4,
    },
    notificationButton: {
        marginRight: 20,
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        right: -4,
        top: -2,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.danger,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: 50,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    emptyNotification: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
    },
    emptyNotificationText: {
        fontSize: 16,
        color: COLORS.gray,
        marginTop: 10,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F5FF',
    },
    notificationIcon: {
        backgroundColor: '#E8F3FF',
        padding: 10,
        borderRadius: 12,
        marginRight: 15,
    },
    notificationContent: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 16,
        color: COLORS.black,
        marginBottom: 4,
    },
    notificationTime: {
        fontSize: 12,
        color: COLORS.gray,
    },
});

export default HospitalTabNavigator;