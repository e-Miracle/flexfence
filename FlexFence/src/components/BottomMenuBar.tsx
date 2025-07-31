import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, Entypo, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppColors } from '../hooks/useAppColors';

const BottomMenuBar = ({ navigation }) => {
  const colors = useAppColors();

  return (
    <View style={[styles.container, {backgroundColor:colors.background}]}>
      {/* Home */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.menuItem}>
          <MaterialIcons name="home" size={24} color={colors.text}/>
        <Text style={[styles.label, { color: colors.text }]}>Home</Text>
      </TouchableOpacity>

      {/* Time Clock */}
      <TouchableOpacity onPress={() => navigation.navigate('TimeClock')} style={styles.menuItem}>
        <MaterialIcons name="timer" size={24} color={colors.text} />
        <Text style={[styles.label, { color: colors.text }]}>Time clock</Text>
      </TouchableOpacity>

      {/* Clock In/Out */}
      <TouchableOpacity onPress={() => navigation.navigate('ClockInOut')} style={styles.menuItem}>
        <LinearGradient colors={['#1FA2FF', '#12D8FA']} style={styles.iconCircle}>
          <MaterialIcons name="play-arrow" size={20} color="white" />
        </LinearGradient>
        <Text style={[styles.label, { color: colors.text }]}>Clock in/out</Text>
      </TouchableOpacity>

      {/* Notification */}
      <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.menuItem}>
        <View style={styles.notificationIcon}>
          <Feather name="bell" size={24} color={colors.text} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>1</Text>
          </View>
        </View>
        <Text style={[styles.label, { color: colors.text }]}>Notification</Text>
      </TouchableOpacity>

      {/* More */}
      <TouchableOpacity onPress={() => navigation.navigate('More')} style={styles.menuItem}>
        <Entypo name="dots-three-horizontal" size={24} color={colors.text} />
        <Text style={[styles.label, { color: colors.text }]}>More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 30,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    zIndex: 10,
  },
  
  menuItem: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
  iconCircle: {
    width: 25,
    height: 25,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default BottomMenuBar;
