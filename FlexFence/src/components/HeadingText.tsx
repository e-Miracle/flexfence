import React from 'react';
import { Text, StyleSheet, TextStyle, ViewStyle, View } from 'react-native';
import { useAppColors } from '../hooks/useAppColors';

interface HeadingTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  containerStyle?: ViewStyle;
}

const HeadingText: React.FC<HeadingTextProps> = ({ children, style, containerStyle }) => {
  const colors = useAppColors();

  return (
    <View style={containerStyle}>
      <Text style={[styles.heading, { color: colors.primary }, style]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontFamily: 'DMSans-Bold',
    textAlign: 'center',
  },
});

export default HeadingText;
