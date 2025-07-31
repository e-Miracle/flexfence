import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/screencontainer';
import FenceMap from '../components/FenceMap';
import BottomMenuBar from '../components/BottomMenuBar';
import FloatingMenu from '../components/FloatingMenu';
import Button from '../components/Button'; // Assuming this is your custom styled button
import { useAppColors } from '../hooks/useAppColors';
import { Ionicons } from '@expo/vector-icons';
import TopBar from '../components/TopBar';

const TimeClockScreen = () => {
  const navigation = useNavigation();
  const colors = useAppColors();

  const currentTime = '08:21 AM';
  const clockInTime = '08:15 AM';
  const totalTime = '4h 25m';
  const lastClockOut = '-';

  return (
    <ScreenContainer style={{ flex: 1, backgroundColor: colors.background, paddingHorizontal: 16 }}>
                    <TopBar title="Time Clock" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>


        {/* Time Info */}
        <Text style={styles.clockTime}>{currentTime}</Text>
        <View style={styles.statusRow}>
          <View style={styles.greenDot} />
          <Text style={styles.clockStatus}>You are clocked in</Text>
        </View>

        {/* Map + Fence Status */}
        <View style={styles.mapCard}>
          <FenceMap />
          <View style={styles.fenceLabel}>
            <Text style={styles.fenceText}>Inside fence: FUTO Studio Block</Text>
          </View>
        </View>

        {/* Clock Out Button */}
        <View style={styles.buttonWrapper}>
          <Button text="Clock Out" onPress={() => console.log('Clocked out')} />
        </View>

        {/* Time Details */}
        <View style={styles.timeDetails}>
          <View style={styles.timeRow}>
            <Text style={styles.timeLabel}>Total Time</Text>
            <Text style={styles.timeValue}>{totalTime}</Text>
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.timeLabel}>Clocked In</Text>
            <Text style={styles.timeValue}>{clockInTime}</Text>
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.timeLabel}>Last Clocked Out</Text>
            <Text style={styles.timeValue}>{lastClockOut}</Text>
          </View>
        </View>
      </ScrollView>

      <BottomMenuBar navigation={navigation} />
      <FloatingMenu />
    </ScreenContainer>
  );
};
const styles = StyleSheet.create({
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    screenTitle: {
      fontSize: 18,
      fontFamily: 'DMSans-Bold',
      marginLeft: 8,
    },
    clockTime: {
      fontSize: 34,
      fontFamily: 'DMSans-Bold',
      textAlign: 'center',
      marginVertical: 6,
    },
    statusRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    greenDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#00C851',
      marginRight: 6,
    },
    clockStatus: {
      fontSize: 14,
      color: '#444',
      fontFamily: 'DMSans-Regular',
    },
    mapCard: {
      backgroundColor: '#fff',
      borderRadius: 12,
      overflow: 'hidden',
      elevation: 1,
      marginVertical: 10,
    },
    fenceLabel: {
      padding: 10,
      backgroundColor: '#fff',
    },
    fenceText: {
      fontSize: 14,
      fontFamily: 'DMSans-Regular',
    },
    buttonWrapper: {
      marginTop: 16,
      marginBottom: 10,
    },
    timeDetails: {
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 12,
      elevation: 1,
      marginTop: 10,
    },
    timeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 6,
    },
    timeLabel: {
      fontSize: 14,
      color: '#555',
      fontFamily: 'DMSans-Regular',
    },
    timeValue: {
      fontSize: 14,
      fontFamily: 'DMSans-Bold',
      color: '#000',
    },
  });
  
export default TimeClockScreen;
