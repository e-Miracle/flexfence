// components/DashboardHeader.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppColors } from '../hooks/useAppColors';

const DashboardHeader: React.FC = () => {
  const colors = useAppColors();
  const navigation = useNavigation();

  const handleNavigateToProfile = () => {
    navigation.navigate('PersonalSettings' as never);
  };

  return (
    <View style={styles.header}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Image
            source={require('../assets/cee.png')}
            style={{ width: 40, height: 40 }}
          />
        
        <View>
          <Text style={{ color: colors.primary, fontFamily: 'DMSans-Bold', fontSize: 18 }}>
            Central Park
          </Text>
          <Text style={{ fontSize: 8, color: colors.reggy }}>Owerri, Garden Park</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleNavigateToProfile}>
      <Image
        source={require('../assets/profile.png')}
        style={{ width: 40, height: 40 }}
      />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
});

export default DashboardHeader;
