// src/components/ScreenContainer.tsx
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  StyleProp,
  ViewStyle,
  Dimensions,
} from 'react-native';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  scrollable?: boolean;
  extraBottomPadding?: number;   // <-- NEW PROP
}

const screenHeight = Dimensions.get('screen').height;

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
  scrollable = false,
  extraBottomPadding = 0,  // default = 0
}) => {
  return (
    <SafeAreaView style={[styles.safeArea, { height: screenHeight }]}>
        {scrollable ? (
          <ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              style,
              { paddingBottom: extraBottomPadding }, // <-- ADD CUSTOM BOTTOM PADDING
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
            overScrollMode="never"
          >
            {children}
          </ScrollView>
        ) : (
          <View
            style={[
              styles.container,
              style,
              { paddingBottom: extraBottomPadding }, // <-- Works for non-scroll screens too
            ]}
          >
            {children}
          </View>
        )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
  },
});

export default ScreenContainer;
