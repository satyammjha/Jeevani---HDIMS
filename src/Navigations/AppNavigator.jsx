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

const ReportsStack = createStackNavigator();

function ReportsStackScreen() {
  return (
    <ReportsStack.Navigator>
      <ReportsStack.Screen name="ReportsMain" component={ReportsScreen} options={{ headerShown: false }} />
      <ReportsStack.Screen name="ReportDetails" component={ReportDetailsScreen} options={{ headerShown: false }} />
    </ReportsStack.Navigator>
  );
}

const MainStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <MainStack.Screen name="YojanaDetails" component={YojanaDetailsScreen} options={{ headerShown: false }} />
    </MainStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function TabNavigator() {
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
            } else if (route.name === 'ReportsTab') {
              iconName = 'file-document';
            } else if (route.name === 'HospitalRegister') {
              iconName = 'hospital';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: '#fff', paddingBottom: 5 },
          headerTitle: () => (
            <TouchableOpacity onPress={() => console.log('Navigate to Home')}>
              <Image source={require('../Assets/jeevanilogo.png')} style={{ width: 100, height: 180 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={toggleNotifications} style={{ marginRight: 15 }}>
              <Icon name="bell" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      >
        <Tab.Screen name="HomeStack" component={MainStackScreen} options={{ title: 'Home' }} />
        <Tab.Screen name="ReportsTab" component={ReportsStackScreen} options={{ title: 'Reports' }} />
        <Tab.Screen 
          name="HospitalRegister" 
          component={RegisterHospital} 
          options={{ title: 'Register Hospital' }} 
        />
      </Tab.Navigator>

      {/* Notifications Modal */}
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

export default TabNavigator;

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