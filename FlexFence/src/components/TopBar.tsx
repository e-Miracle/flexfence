// components/TopBar.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppColors } from '../hooks/useAppColors';

interface TopBarProps {
  title: string;
  onBack?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ title, onBack }) => {
  const colors = useAppColors();

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Feather name="chevron-left" size={24} color={colors.primary} />
      </TouchableOpacity>
      <Text style={[styles.title, {color:colors.primary}]}>{title}</Text>
      {/* Placeholder for spacing symmetry */}
      <View style={{ width: 24 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    zIndex: 10, // Ensures it's above other components
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TopBar;
