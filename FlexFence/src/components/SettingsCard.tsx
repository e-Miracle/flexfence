import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ✅ or 'react-native-vector-icons/Ionicons'
import { useAppColors } from '../hooks/useAppColors';

interface SettingsCardProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightIcon?: React.ReactNode;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ title, subtitle, onPress, rightIcon }) => {
  const colors = useAppColors();

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: colors.text }]}>{subtitle}</Text>
        ) : null}
      </View>

      <View style={styles.iconContainer}>
        {rightIcon || (
          <Ionicons name="chevron-forward" size={20} color={colors.text} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SettingsCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
    height: 70
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'RobotoMedium',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'RobotoRegular',
    marginTop: 2,
  },
  iconContainer: {
    marginLeft: 10,
  },
});
