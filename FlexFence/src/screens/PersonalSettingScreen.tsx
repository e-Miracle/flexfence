import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppColors } from '../hooks/useAppColors';
import SignOutModal from '../components/SignOutModal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type PersonalSettingScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const PersonalSettingsScreen: React.FC<PersonalSettingScreenProps> = ({ navigation }) => {
  const colors = useAppColors();
  const [signOutVisible, setSignOutVisible] = useState(false);

  const menuItems = [
    {
      title: 'History',
      icon: 'time-outline',
      onPress: () => console.log('Go to History'),
    },
    {
      title: 'Notification',
      icon: 'notifications-outline',
      onPress: () => console.log('Go to Notifications'),
    },
    {
      title: 'Help & Support',
      icon: 'help-circle-outline',
      onPress: () => console.log('Go to Help & Support'),
    },
    {
        title: 'Signout',
        icon: 'log-out-outline',
        onPress: () => setSignOutVisible(true),
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}  style={styles.profileContainer}>
        <Image
          source={require('../assets/Profilephoto.png')}
          style={styles.avatar}
        />
        <View>
          <Text style={[styles.name, {color:colors.text}]}>Judah David</Text>
          <Text style={[styles.role, {color:colors.text}]}>Member</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#888" style={styles.forwardIcon} />
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Menu Items */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem} onPress={item.onPress}>
            <Ionicons name={item.icon as any} size={20} color={colors.text} />
            <Text style={[styles.menuText, {color: colors.text}]}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#888" style={styles.forwardIcon} />
          </TouchableOpacity>
        )}
      />
      <SignOutModal
                visible={signOutVisible}
                onCancel={() => setSignOutVisible(false)}
                onConfirm={() => {
                    setSignOutVisible(false);
                    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
                }}
            />
    </View>
  );
};

export default PersonalSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30

  },
  topBar: {
    marginTop: 12,
    marginBottom: 12,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'DMSans-Bold',
  },
  role: {
    fontSize: 14,
    color: '#777',
    fontFamily: 'DMSans-Regular',
  },
  forwardIcon: {
    marginLeft: 'auto',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 12,
    fontFamily: 'DMSans-Regular',
  },
});
