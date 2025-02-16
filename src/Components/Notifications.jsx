import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { List, useTheme } from 'react-native-paper';

function Notifications() {
    const theme = useTheme();

    const notifications = [
        { id: '1', title: 'Data Sync Successful', description: 'All data has been synced with Google Health.' },
        { id: '2', title: 'New Patient Added', description: 'A new patient has been registered.' },
        { id: '3', title: 'Abnormal Pattern Detected', description: 'An unusual health pattern was detected.' },
    ];

    return (
        <View style={styles.container}>
            {notifications.map((notification) => (
                <List.Item
                    key={notification.id}
                    title={notification.title}
                    description={notification.description}
                    left={props => <List.Icon {...props} icon="bell" color={theme.colors.primary} />}
                    style={styles.notificationItem}
                    titleStyle={styles.title}
                    descriptionStyle={styles.description}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5', // Light gray background for better contrast
    },
    notificationItem: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        marginVertical: 6,
        paddingVertical: 12,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    title: {
        color: '#2d3436',
        fontWeight: '600',
        fontSize: 16,
    },
    description: {
        color: '#636e72',
        fontSize: 14,
        marginTop: 4,
    },
});

export default Notifications;