import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../Screen/Home';
import ReportsScreen from '../Screen/ReportsScreen';
import ReportDetailsScreen from '../Screen/ReportDetailsScreen';
import YojanaDetailsScreen from '../Screen/YojanaDetails';
import RegisterHospital from '../Screen/RegisterHospital';
import Analytics from '../Screen/Analytics';
import ChatBot from '../Screen/AdminChatBot';
import HospitalsListScreen from '../Screen/HospitalsList';

const HomeStack = createStackNavigator();
const ReportsStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="YojanaDetails" component={YojanaDetailsScreen} />
    </HomeStack.Navigator>
  );
}

function ReportsStackScreen() {
  return (
    <ReportsStack.Navigator screenOptions={{ headerShown: false }}>
      <ReportsStack.Screen name="ReportsMain" component={ReportsScreen} />
      <ReportsStack.Screen name="ReportDetails" component={ReportDetailsScreen} />
    </ReportsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const [notificationsVisible, setNotificationsVisible] = useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'HomeTab') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'ReportsTab') iconName = focused ? 'file-document' : 'file-document-outline';
            else if (route.name === 'Analytics') iconName = focused ? 'chart-line' : 'chart-line';
            else if (route.name === 'RegisterHospitalTab') iconName = focused ? 'hospital-building' : 'hospital-building';
            else if (route.name === 'HospitalListTab') iconName = focused ? 'hospital-marker' : 'hospital-marker';
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#00796B',
          tabBarInactiveTintColor: '#90A4AE',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            paddingBottom: 8,
            height: 60,
            borderTopWidth: 0,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitle: () => (
            <Image
              source={require('../Assets/jeevanilogo.png')}
              style={{ width: 120, height: 40 }}
              resizeMode="contain"
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => setNotificationsVisible(true)}
              style={{ marginRight: 16 }}
            >
              <Icon name="bell-outline" size={24} color="#00796B" />
            </TouchableOpacity>
          ),
        })}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStackScreen}
          options={{ title: 'Home' }}
        />
        <Tab.Screen
          name="ReportsTab"
          component={ReportsStackScreen}
          options={{ title: 'Reports' }}
        />
        <Tab.Screen
          name="RegisterHospitalTab"
          component={RegisterHospital}
          options={{ title: 'Add Hospital' }} // Updated title
        />
        <Tab.Screen
          name="HospitalListTab"
          component={HospitalsListScreen}
          options={{ title: 'Hospitals' }} // New tab for Hospital List
        />
        <Tab.Screen
          name="Analytics"
          component={Analytics}
          options={{ title: 'Analytics' }}
        />
      </Tab.Navigator>

      <ChatBot />

      {/* Notifications Modal */}
      <Modal
        visible={notificationsVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setNotificationsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Notifications</Text>
              <TouchableOpacity onPress={() => setNotificationsVisible(false)}>
                <Icon name="close" size={24} color="#00796B" />
              </TouchableOpacity>
            </View>
            <Text>Notifications will be displayed here</Text>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    minHeight: '40%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#00796B',
  },
});

export default TabNavigator;