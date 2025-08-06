import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppColors } from '../hooks/useAppColors';
import ScreenContainer from '../components/screencontainer';
import BottomMenuBar from '../components/BottomMenuBar';
import TopBar from '../components/TopBar';
import SettingsCard from '../components/SettingsCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useTheme } from '../constants/ThemeContext';

type MoreScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const MoreScreen: React.FC<MoreScreenProps> = ({ navigation }) => {
  const colors = useAppColors();
  const { theme, setThemeMode } = useTheme();
  const isDark = theme === 'dark';

  const handleThemeToggle = (value: boolean) => {
    setThemeMode(value ? 'dark' : 'light');
  };

  const menuItems = [
    {
      title: 'Account Settings',
      subtitle: 'Manage email, password, linked org...',
      onPress: () => navigation.navigate('AccountSettings'),
    },
    {
      title: 'Geofence Settings',
      subtitle: 'Configure location tracking',
      onPress: () => navigation.navigate('Geofence'),
    },
    {
      title: 'Notification Preferences',
      subtitle: 'Customize push and email notifications...',
      onPress: () => navigation.navigate('NotificationSetting'),
    },
    {
      title: 'App Appearance',
      subtitle: 'Theme Selection - Toggle Light / Dark mode',
      isSwitch: true,
    },
    {
      title: 'History',
      subtitle: 'View usage history and logs',
      onPress: () =>navigation.navigate('History'),
    },
    {
      title: 'Help & Support',
      subtitle: 'FAQs, contact support, and feedback',
      onPress: () => navigation.navigate('Help'),
    },
    {
      title: 'About FlexFence',
      subtitle: 'App version, terms and developer info',
      onPress: () => navigation.navigate('About'),
    },
  ];

  return (
    <ScreenContainer style={{ flex: 1, backgroundColor: colors.background, paddingHorizontal: 16 }}>
      <TopBar title="More" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 60 }} />

        {menuItems.map((item, index) => (
          <View key={index}>
            {item.isSwitch ? (
              <SettingsCard
                title={item.title}
                subtitle={item.subtitle}
                rightIcon={
                  <Switch
                    value={isDark}
                    onValueChange={handleThemeToggle}
                    thumbColor={isDark ? colors.primary : '#f4f3f4'}
                    trackColor={{ false: '#ccc', true: colors.primary }}
                  />
                }
              />
            ) : (
              <SettingsCard
                title={item.title}
                subtitle={item.subtitle}
                onPress={item.onPress}
                rightIcon={<Ionicons name="chevron-forward" size={20} color="#888" />}
              />
            )}
          </View>
        ))}
      </ScrollView>

      <BottomMenuBar navigation={navigation} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({});

export default MoreScreen;
