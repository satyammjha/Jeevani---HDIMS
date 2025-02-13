import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

function QuickActions() {
  const theme = useTheme();

  return (
    <View style={styles.actionsContainer}>
      <Button
        mode="contained"
        onPress={() => console.log('Add Patient')}
        style={[
          styles.actionButton,
          { backgroundColor: theme.colors.primary, marginRight: 8 },
        ]}
        labelStyle={{ color: theme.colors.onPrimary }}
      >
        Add Patient
      </Button>
      <Button
        mode="contained"
        onPress={() => console.log('Sync Data')}
        style={[
          styles.actionButton,
          { backgroundColor: theme.colors.accent, marginLeft: 8 },
        ]}
        labelStyle={{ color: theme.colors.onAccent }}
      >
        Sync Data
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    borderRadius: 8, // Rounded corners
    elevation: 2, // Add shadow
  },
});

export default QuickActions;