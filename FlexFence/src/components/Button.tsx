import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'skip' | 'next' | 'full' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  variant = 'next',
  style,
  textStyle,
}) => {
  if (variant === 'skip') {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.skipButton, style]}>
        <Text style={[styles.skipText, textStyle]}>{text}</Text>
      </TouchableOpacity>
    );
  }

  if (variant === 'outline') {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.outlineButton, style]}>
        <Text style={[styles.outlineText, textStyle]}>{text}</Text>
      </TouchableOpacity>
    );
  }

  const gradientStyle = variant === 'full' ? styles.fullButton : styles.nextButton;

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <LinearGradient
        colors={['#1F229A', '#0BC1D8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={gradientStyle}
      >
        <Text style={[styles.nextText, textStyle]}>{text}</Text>
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
    color: '#6B7280', // Tailwind gray-500
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
    borderColor: '#1F229A',
    alignItems: 'center',
  },
  outlineText: {
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
    color: '#1F229A',
    textAlign: 'center',
  },
});

export default Button;
