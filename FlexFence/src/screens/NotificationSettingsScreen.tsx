import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useAppColors } from '../hooks/useAppColors';
import ScreenContainer from '../components/screencontainer';
import TopBar from '../components/TopBar';
import Button from '../components/Button';

const NotificationSettingsScreen = () => {
  const navigation = useNavigation();
  const colors = useAppColors();

  const [geoFence, setGeoFence] = useState(true);
  const [missedCheckIn, setMissedCheckIn] = useState(true);
  const [vibration, setVibration] = useState(false);
  const [emailNotify, setEmailNotify] = useState(true);
  const [pushNotify, setPushNotify] = useState(false);

  return (
    <ScreenContainer style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar title="Notifications" onBack={() => navigation.goBack()} />
        <View style={{marginTop: 40}}/>
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Geofenced Zone Notification */}
        <View style={styles.settingItem}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.settingTitle,{color:colors.text}]}>
              Notify me when I enter or leave a geofenced zone
            </Text>
            <Text style={[styles.settingDescription,{color:colors.reggy}]}>
              To enable GPS reminders, please assure that FlexFence App permissions for location access is set to “Always Allowed” in application settings.
            </Text>
          </View>
          <Switch value={geoFence} onValueChange={setGeoFence} />
        </View>

        {/* Missed check-in/out */}
        <View style={styles.settingItem}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.settingTitle, {color: colors.text}]}>Missed check-in/out</Text>
            <Text style={[styles.settingDescription, {color: colors.reggy}]}>
              Alert me if I forget to clock in within 5 minutes of entering a fence and if I forget to clock out after leaving a fence
            </Text>
          </View>
          <Switch value={missedCheckIn} onValueChange={setMissedCheckIn} />
        </View>

        {/* Vibration Toggle */}
        <View style={styles.settingItem}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.settingTitle,{color:colors.text}]}>App sound & Vibration</Text>
            <Text style={[styles.settingDescription, {color:colors.reggy}]}>
              Vibration on entry/exit of fence
            </Text>
          </View>
          <Switch value={vibration} onValueChange={setVibration} />
        </View>

        {/* Checkbox Settings */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setEmailNotify(!emailNotify)}
        >
          <Ionicons
            name={emailNotify ? 'checkbox-outline' : 'square-outline'}
            size={22}
            color={colors.text}
          />
          <Text style={[styles.checkboxLabel, {color:colors.text}]}>Email notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setPushNotify(!pushNotify)}
        >
          <Ionicons
            name={pushNotify ? 'checkbox-outline' : 'square-outline'}
            size={22}
            color={colors.text}
          />
          <Text style={[styles.checkboxLabel, {color:colors.text}]}>Push notifications</Text>
        </TouchableOpacity>

        {/* Save Button */}
        <Button text="Save" variant="full" onPress={() => console.log('VerifyPhone')} />

      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily:'DMSans-Bold'
  },
  settingDescription: {
    fontSize: 13,
    fontFamily:'DMSans-Regular'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 15,
    fontFamily:'DMSans-Regular'
  },
  saveButton: {
    marginTop: 30,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NotificationSettingsScreen;
