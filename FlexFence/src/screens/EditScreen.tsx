import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAppColors } from '../hooks/useAppColors';
import ScreenContainer from '../components/screencontainer';
import TopBar from '../components/TopBar';
import Button from '../components/Button';
import { useLoadProfile } from '../hooks/useLoadProfile';
import { updateProfile } from '../api/auth'; // You need to implement this API call

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const EditProfileScreen: React.FC<Props> = ({ navigation }) => {
  const colors = useAppColors();
  const { profile, loading, error, reloadProfile } = useLoadProfile();
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  // Load profile data when component mounts
  useEffect(() => {
    if (profile) {
      const name = `${profile.first_name} ${profile.last_name}`.trim();
      setFullName(name);
      setRole(profile.role || '');
      setEmail(profile.email || '');
      setAvatarUri(profile.avatar || null); // Assuming profile.avatar exists
    }
  }, [profile]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'We need media permissions to select an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    const [first_name, ...lastNameParts] = fullName.trim().split(' ');
    const last_name = lastNameParts.join(' ');

    const updatePayload = {
      first_name: first_name || '',
      last_name: last_name || '',
    };

    try {
      await updateProfile(updatePayload);
      Alert.alert('Success', 'Profile updated successfully!');
      reloadProfile(); // Refresh profile data
    } catch (err: any) {
      console.error('Profile update error:', err);
      Alert.alert('Error', err.message || 'Failed to update profile.');
    }
  };

  if (loading) return <Text style={{ textAlign: 'center', marginTop: 50 }}>Loading...</Text>;
  if (error) return <Text style={{ textAlign: 'center', marginTop: 50 }}>Error: {error}</Text>;

  return (
    <ScreenContainer style={[styles.container, { backgroundColor: colors.background }]}>
      <TopBar title="Edit Profile" onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <Image
              source={avatarUri ? { uri: avatarUri } : require('../assets/Profilephoto.png')}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
              <Ionicons name="pencil" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Information Fields */}
        <View style={styles.infoSection}>
          {/* Full Name (Editable) */}
          <View style={styles.infoItem}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter full name"
              placeholderTextColor="#aaa"
            />
          </View>

          {/* Role (READ ONLY) */}
          <View style={styles.infoItem}>
            <Text style={styles.label}>Role</Text>
            <TextInput
              style={[styles.input, { color: '#999' }]}
              value={role}
              editable={false}
            />
          </View>

          {/* Email (READ ONLY) */}
          <View style={styles.infoItem}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, { color: '#999' }]}
              value={email}
              editable={false}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Save Button */}
        <View style={{ marginTop: 40 }}>
          <Button text="Save Changes" variant="full" onPress={handleSave} />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  avatarWrapper: {
    position: 'relative',
    borderWidth: 2,
    borderColor: '#1F229A',
    borderRadius: 999,
    padding: 4,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1F229A',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoSection: {
    marginTop: 40,
    paddingHorizontal: 8,
  },
  infoItem: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'DMSans-Bold',
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    paddingVertical: 4,
  },
});
