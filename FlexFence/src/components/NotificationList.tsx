import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useAppColors } from '../hooks/useAppColors';

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  buttonText?: string;
  section: string;
};

const DUMMY_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Zone Entry',
    message: "You've entered FUTO Main Library Fence. Tap to clock in your attendance.",
    time: 'Now',
    buttonText: 'Clock In',
    section: 'Today',
  },
  {
    id: '2',
    title: 'Zone Exit',
    message: "You've exited FUTO Main Library Fence. Don’t forget to clock out.",
    time: '1d',
    buttonText: 'Clock Out',
    section: 'Yesterday',
  },
  {
    id: '3',
    title: 'Missed Clock-in',
    message: "You entered the zone 5 minutes ago but haven’t clocked in.",
    time: '1d',
    buttonText: 'Clock Out',
    section: 'Yesterday',
  },
  {
    id: '4',
    title: 'Geofencing Service Error',
    message: "Geofencing paused; location permission or GPS is turned off. Please re-enable to continue attendance tracking.",
    time: '1d',
    section: 'Yesterday',
  },
  {
    id: '5',
    title: 'Missed Clock-in',
    message: "You entered the zone 5 minutes ago but haven’t clocked in.",
    time: '3d',
    buttonText: 'Clock Out',
    section: 'Last 5 days',
  },
  {
    id: '6',
    title: 'Missed Clock-in',
    message: "You entered the zone 5 minutes ago but haven’t clocked in.",
    time: '1d',
    buttonText: 'Clock Out',
    section: 'Last 5 days',
  },
  {
    id: '7',
    title: 'Geofencing Service Error',
    message: "Geofencing paused; location permission or GPS is turned off. Please re-enable to continue attendance tracking.",
    time: '1d',
    section: 'Last 5 days',
  },
  {
    id: '8',
    title: 'Missed Clock-in',
    message: "You entered the zone 5 minutes ago but haven’t clocked in.",
    time: '3d',
    buttonText: 'Clock Out',
    section: 'Last 5 days',
  },
];

const NotificationList = () => {
    const colors = useAppColors();
    const [notifications, setNotifications] = useState(DUMMY_NOTIFICATIONS);
    const [visibleCount, setVisibleCount] = useState(5); // Show first 5 notifications initially
    const [expanded, setExpanded] = useState(false);
  
    const handleDelete = (id: string) => {
      setNotifications(prev => prev.filter(item => item.id !== id));
    };
  
    const groupedNotifications = notifications.slice(0, visibleCount).reduce<Record<string, NotificationItem[]>>((acc, item) => {
      acc[item.section] = acc[item.section] || [];
      acc[item.section].push(item);
      return acc;
    }, {});
  
    const renderRightActions = (id: string) => (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(id)}
      >
        <Ionicons name="trash-outline" size={24} color="#fff" />
      </TouchableOpacity>
    );
  
    const renderItem = ({ item }: { item: NotificationItem }) => (
      <Swipeable renderRightActions={() => renderRightActions(item.id)}>
        <View style={styles.notificationCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={[styles.notificationMessage]}>
              {item.message} {item.time}
            </Text>
          </View>
          {item.buttonText && (
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>{item.buttonText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </Swipeable>
    );
  
    const handleSeeMore = () => {
      setVisibleCount(prev => prev + 5);
      setExpanded(true);
    };
  
    const hasMore = notifications.length > visibleCount;
  
    return (
      <FlatList
        data={Object.entries(groupedNotifications)}
        keyExtractor={([section]) => section}
        renderItem={({ item: [section, items] }) => (
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionHeader, { color: colors.text }]}>
              {section}
            </Text>
            {items.map(notification => (
              <View key={notification.id}>{renderItem({ item: notification })}</View>
            ))}
          </View>
        )}
        ListFooterComponent={
          hasMore ? (
            <TouchableOpacity style={styles.seeMoreButton} onPress={handleSeeMore}>
              <Text style={styles.seeMoreText}>See more</Text>
            </TouchableOpacity>
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />
    );
  };
  

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionHeader: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'DMSans-Bold'
  },
  seeMoreButton: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeMoreText: {
    color: '#007AFF',
    fontSize: 14,
    fontFamily: 'DMSans-Medium',
  },
  
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  notificationTitle: {
    fontFamily:'DMSans-Bold',
    fontSize: 14,
    marginBottom: 2,
  },
  notificationMessage: {
    fontSize: 13,
    fontFamily:'DMSans-Regular'
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
    marginLeft: 4,
  },
  actionButton: {
    backgroundColor: '#E0F0FF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 8,
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    borderRadius: 8,
    marginVertical: 4,
  },
});

export default NotificationList;
