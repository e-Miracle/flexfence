import React, { useState } from 'react';
import { ScrollView, Switch, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/screencontainer';
import TopBar from '../components/TopBar';
import SettingsCard from '../components/SettingsCard';
import { useAppColors } from '../hooks/useAppColors';

const GeofenceSettings: React.FC = () => {
  const navigation = useNavigation();
  const colors = useAppColors();

  const [geofenceEnabled, setGeofenceEnabled] = useState(true);
  const [manualOverride, setManualOverride] = useState(true);

  return (
    <ScreenContainer style={{ backgroundColor: colors.background }}>
      <TopBar title="Geofence Settings" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ marginTop: 60 }} />
        
        <SettingsCard
          title="Geofence Permissions"
          subtitle="Allow/Disallow location tracking"
          rightIcon={
            <Switch
              value={geofenceEnabled}
              onValueChange={setGeofenceEnabled}
              thumbColor={geofenceEnabled ? colors.primary : '#f4f3f4'}
              trackColor={{ false: '#ccc', true: colors.primary }}
            />
          }
        />

        <SettingsCard
          title="Manual Check–in/Check–out"
          subtitle="Allow Manual Override"
          rightIcon={
            <Switch
              value={manualOverride}
              onValueChange={setManualOverride}
              thumbColor={manualOverride ? colors.primary : '#f4f3f4'}
              trackColor={{ false: '#ccc', true: colors.primary }}
            />
          }
        />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
});

export default GeofenceSettings;
