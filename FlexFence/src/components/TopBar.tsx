// components/TopBar.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppColors } from '../hooks/useAppColors';

type TopBarProps = {
  title: string;
  onBack?: () => void;
  rightIcon?: React.ReactNode;
};

const TopBar: React.FC<TopBarProps> = ({ title, onBack, rightIcon  }) => {
  const colors = useAppColors();

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Feather name="chevron-left" size={24} color={colors.primary} />
      </TouchableOpacity>
      <Text style={[styles.title, {color:colors.primary}]}>{title}</Text>
      <View style={{ marginLeft: 'auto' }}>
        {rightIcon}
      </View>
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
    marginRight:'10%'
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TopBar;
