// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import { RootStackParamList } from './src/types/navigation';
import { ThemeProvider, useTheme } from './src/constants/ThemeContext';
import { useAppColors } from './src/hooks/useAppColors';
import { View, Platform, Button, StatusBar as RNStatusBar } from 'react-native';
import Constants from 'expo-constants';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContent = () => {
  const { theme, setThemeMode } = useTheme();
  const colors = useAppColors();

  return (
    <>
 {/* StatusBar style (text/icons color) */}
 <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

{/* Fake status bar background */}
<View
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'android' ? RNStatusBar.currentHeight : Constants.statusBarHeight,
    backgroundColor: colors.background,
    zIndex: 10,
  }}
/>
   {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 16 }}>
        <Button title="Light" onPress={() => setThemeMode('light')} />
        <Button title="Dark" onPress={() => setThemeMode('dark')} />
        <Button title="System" onPress={() => setThemeMode('system')} />
      </View> */}

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" id={undefined}>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
