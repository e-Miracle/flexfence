import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppColors } from '../hooks/useAppColors';
import { ReactNode } from 'react';

interface ButtonProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'skip' | 'next' | 'full' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: ReactNode; // 👈 Accepts JSX icon element
  iconPosition?: 'left' | 'right'; // Optional, default to left
  disabled?: boolean; // 👈 New prop
}

const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  variant = 'next',
  style,
  textStyle,
  icon,
  iconPosition = 'left',
  disabled = false, // default
}) => {
  const colors = useAppColors();

  const renderContent = (textColor: string = '#fff') => (
    <View
      style={[
        styles.contentWrapper,
        iconPosition === 'right' && { flexDirection: 'row-reverse' },
      ]}
    >
      {icon && <View style={styles.iconWrapper}>{icon}</View>}
      <Text style={[styles.nextText, textStyle, { color: textColor }]}>{text}</Text>
    </View>
  );

  // 🧩 Skip Button
  if (variant === 'skip') {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.skipButton, style, disabled && styles.disabledButton]}
        disabled={disabled}
      >
        <Text style={[styles.skipText, textStyle, { color: colors.text }]}>{text}</Text>
      </TouchableOpacity>
    );
  }

  // 🧩 Outline Button
  if (variant === 'outline') {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.outlineButton,
          style,
          { borderColor: colors.primary },
          disabled && styles.disabledButton,
        ]}
        disabled={disabled}
      >
        {renderContent(disabled ? '#aaa' : colors.primary)}
      </TouchableOpacity>
    );
  }

  // 🧩 Gradient Button (full or next)
  const gradientStyle = variant === 'full' ? styles.fullButton : styles.nextButton;
  const gradientColors = disabled ? ['#ccc', '#ccc'] : ['#1F229A', '#0BC1D8'];

  return (
    <TouchableOpacity onPress={onPress} style={style} disabled={disabled}>
      <LinearGradient
        colors={['#1F229A', '#0BC1D8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[gradientStyle, disabled && styles.disabledButton]}
      >
        {renderContent()}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  skipButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  skipText: {
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
  },
  nextButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  fullButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  nextText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'DMSans-Bold',
    textAlign: 'center',
  },
  outlineButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 25,
    borderWidth: 1,
    alignItems: 'center',
  },
  outlineText: {
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
    textAlign: 'center',
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 🧩 Disabled style
  disabledButton: {
    opacity: 0.6,
  },
});

export default Button;

