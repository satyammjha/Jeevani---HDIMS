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
import Resources from '../Screen/HospitalResources';  // Imported Resources screen

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const COLORS = {
    primary: '#2A86FF',
    secondary: '#F0F5FF',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#7F8FA6',
    success: '#4CAF50',
    danger: '#FF5252',
};

// Updated HomeStack with Resources screen
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
            <Stack.Screen name="HospitalHome" component={HospitalHome} options={{ title: 'Dashboard' }} />
            <Stack.Screen name="ViewPatients" component={ViewPatients} options={{ title: 'Patient List' }} />
            <Stack.Screen name="PatientDetails" component={PatientDetails} options={{ title: 'Patient Profile' }} />
            <Stack.Screen name="UpdatePatient" component={UpdatePatient} options={{ title: 'Edit Patient' }} />
            <Stack.Screen name="Reports" component={Reports} options={{ title: 'Medical Reports' }} />
            <Stack.Screen name="Resources" component={Resources} options={{ title: 'Resources' }} />  
        </Stack.Navigator>
    );
}

function HospitalTabNavigator() {
    const [notificationsVisible, setNotificationsVisible] = useState(false);

    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color }) => {
                        let iconName;
                        if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
                        else if (route.name === 'HospitalChat') iconName = focused ? 'message-text' : 'message-text-outline';
                        else if (route.name === 'AddPatient') iconName = focused ? 'account-plus' : 'account-plus-outline';
                        else if (route.name === 'Resources') iconName = focused ? 'folder' : 'folder-outline';  

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
                })}
            >
                <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
                <Tab.Screen name="HospitalChat" component={HospitalChatScreen} options={{ title: 'Messages' }} />
                <Tab.Screen name="AddPatient" component={AddPatient} options={{ title: 'New Patient' }} />
                <Tab.Screen name="Resources" component={Resources} options={{ title: 'Resources' }} />  
            </Tab.Navigator>
        </>
    );
}

const styles = StyleSheet.create({
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
});

export default HospitalTabNavigator;