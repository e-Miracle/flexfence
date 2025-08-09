import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppColors } from '../hooks/useAppColors';
import ScreenContainer from '../components/screencontainer';
import BottomMenuBar from '../components/BottomMenuBar';
import TopBar from '../components/TopBar';
import NotificationList from '../components/NotificationList';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type NotificationScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Notification'>;
};

const NotificationScreen: React.FC<NotificationScreenProps> = ({ navigation }) => {
  const colors = useAppColors();

  const showNotifications = true;

  return (
    <ScreenContainer style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar
        title="Notifications"
        onBack={() => navigation.goBack()}
        rightIcon={
          <Ionicons
            name="settings-outline"
            size={24}
            color={colors.text}
            onPress={() => navigation.navigate('NotificationSetting')}
          />
        }
      />
        <View style={{marginTop:40}}/>
      {showNotifications ? (
        <NotificationList />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off-outline" size={64} color="#aaa" />
          <Text style={styles.emptyText}>You do not have any notifications yet</Text>
        </View>
      )}

      <BottomMenuBar navigation={navigation} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
});

export default NotificationScreen;
