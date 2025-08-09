import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useAppColors } from '../hooks/useAppColors';

interface HistoryCardProps {
  date: string;
  location: string;
  clockIn: string;
  clockOut: string;
  duration: string;
  status: 'Verified' | 'Incomplete';
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  date,
  location,
  clockIn,
  clockOut,
  duration,
  status,
}) => {
    const colors = useAppColors();

  const statusIcon =
    status === 'Verified' ? (
      <MaterialIcons name="verified" size={20} color="green" />
    ) : (
      <Ionicons name="alert-circle-outline" size={20} color="orange" />
    );

  const statusTextStyle = {
    color: status === 'Verified' ? 'green' : 'orange',
    fontSize: 14,
    marginLeft: 8,
    fontFamily:'DMSans-Bold'
  };

  return (
    <View style={[styles.card,{backgroundColor:colors.background}]}>
      <Text style={[styles.dateText, {color: colors.text}]}>{date}</Text>
      <Text style={[styles.fenceText, {color: colors.text}]}>Fence: {location}</Text>

      <View style={styles.infoRow}>
        <Ionicons name="time-outline" size={18} color={colors.text} />
        <Text style={[styles.infoText, {color: colors.text}]}>Clock-In: {clockIn}</Text>
      </View>

      <View style={styles.infoRow}>
        {clockOut === 'Missed' ? (
          <>
            <Ionicons name="close-circle-outline" size={18} color={colors.text} />
            <Text style={[styles.infoText, {color: colors.text}]}>Clock-Out: Missed</Text>
          </>
        ) : (
          <>
            <Ionicons name="time-outline" size={18} color={colors.text} />
            <Text style={[styles.infoText, {color: colors.text}]}>Clock-Out: {clockOut}</Text>
          </>
        )}
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="time-outline" size={18} color={colors.text} />
        <Text style={[styles.infoText, {color: colors.text}]}>Duration: {duration}</Text>
      </View>

      <View style={styles.infoRow}>
        {statusIcon}
        <Text style={statusTextStyle}>Status: {status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  dateText: {
    fontFamily:'DMSans-Bold',
    fontSize: 16,
    marginBottom: 6,
  },
  fenceText: {
    fontSize: 14,
    marginBottom: 16,
    fontFamily:'DMSans-Bold'

  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily:'DMSans-Regular'

  },
});

export default HistoryCard;
