// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { View, Platform, StatusBar as RNStatusBar } from 'react-native';
import Constants from 'expo-constants';

import HomeScreen from './src/screens/HomeScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import OnboardScreen from './src/screens/OnboardScreen';
import { RootStackParamList } from './src/types/navigation';
import { ThemeProvider, useTheme } from './src/constants/ThemeContext';
import { useAppColors } from './src/hooks/useAppColors';
import Button from './src/components/Button';
import RegScreen from './src/screens/RegScreen';
import VerifyPhoneScreen from './src/screens/VerifyPhoneScreen';
import VerifyEmailScreen from './src/screens/VerifyEmailScreen';
import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import VerifyScreen from './src/screens/VerifySuccessScreen';
import InvitationScreen from './src/screens/InvitationScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import SelfieScreen from './src/screens/SelfieScreen';
import ScanQRCodeScreen from './src/screens/ScanQRCodeScreen';
import LinkedOrganizationScreen from './src/screens/LinkedOrganizationScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContent = () => {
  const { theme, setThemeMode } = useTheme();
  const colors = useAppColors();

  return (
    <>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
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
        <Button text="Light" onPress={() => setThemeMode('light')} />
        <Button text="Dark" onPress={() => setThemeMode('dark')} />
        <Button text="System" onPress={() => setThemeMode('system')} />
      </View> */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" id={undefined}>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Onboard" component={OnboardScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Reg" component={RegScreen} options={{ headerShown: false }} />
          <Stack.Screen name="VerifyPhone" component={VerifyPhoneScreen} options={{ headerShown: false }} />
          <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Verify" component={VerifyScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Invitation" component={InvitationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Selfie" component={SelfieScreen} options={{ headerShown: false }} />
          <Stack.Screen name="QrCode" component={ScanQRCodeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LinkedOrganization" component={LinkedOrganizationScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    'DMSans-Regular': require('./src/assets/fonts/DMSans-Regular.ttf'),
    'DMSans-Bold': require('./src/assets/fonts/DMSans-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
