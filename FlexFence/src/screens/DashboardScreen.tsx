import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ScreenContainer from '../components/screencontainer';
import { useNavigation } from '@react-navigation/native';
import TimeTracker from '../components/TimeTracker';
import FenceMap from '../components/FenceMap';
import LinkedOrganizations from '../components/LinkedOrganization';
import TrackedHoursChart from '../components/TrackedHoursChart';
import BottomMenuBar from '../components/BottomMenuBar';
import DashboardHeader from '../components/DashboardHeader';
import FloatingMenu from '../components/FloatingMenu';
import { useAppColors } from '../hooks/useAppColors';

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation();
  const colors = useAppColors();


  return (
    <ScreenContainer style={{ padding: 15, flex: 1, backgroundColor:colors.background }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <DashboardHeader />
        <TimeTracker />
        <FenceMap />
        <LinkedOrganizations />
        <TrackedHoursChart />
      </ScrollView>

      <BottomMenuBar navigation={navigation} />
      <FloatingMenu />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({});

export default DashboardScreen;
