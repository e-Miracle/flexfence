import React, { useState } from 'react';
import { ScrollView, Switch, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/screencontainer';
import TopBar from '../components/TopBar';
import { useAppColors } from '../hooks/useAppColors';

const InitiateKycScreen: React.FC = () => {
  const navigation = useNavigation();
  const colors = useAppColors();


  return (
    <ScreenContainer style={{ backgroundColor: colors.background }}>
      <TopBar title="Initiate KYC" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ marginTop: 60 }} />
        
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

export default InitiateKycScreen;
