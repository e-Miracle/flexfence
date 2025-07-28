// components/TopBar.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface TopBarProps {
  title: string;
  onBack?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ title, onBack }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Feather name="chevron-left" size={24} color="#1F229A" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {/* Placeholder for spacing symmetry */}
      <View style={{ width: 24 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F229A',
  },
});

export default TopBar;
