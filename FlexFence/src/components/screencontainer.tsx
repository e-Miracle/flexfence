// src/components/ScreenContainer.tsx
import React from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  ViewStyle,
  StyleProp,
} from 'react-native';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>; // ✅ Correct type
  scrollable?: boolean;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
  scrollable = false,
}) => {
  const Container = scrollable ? ScrollView : View;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Container style={[styles.container, style]}>
        {children}
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
});

export default ScreenContainer;
