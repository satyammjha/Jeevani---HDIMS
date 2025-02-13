import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SeverityBadge = ({ severity }) => {
  let backgroundColor, textColor;

  switch (severity) {
    case 'high':
      backgroundColor = '#ff4444'; // Red
      textColor = '#fff';
      break;
    case 'medium':
      backgroundColor = '#ffbb33'; // Yellow
      textColor = '#000';
      break;
    case 'low':
      backgroundColor = '#00C851'; // Green
      textColor = '#fff';
      break;
    default:
      backgroundColor = '#ccc'; // Gray
      textColor = '#000';
  }

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={[styles.badgeText, { color: textColor }]}>{severity.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default SeverityBadge;