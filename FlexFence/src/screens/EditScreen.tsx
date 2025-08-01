import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAppColors } from '../hooks/useAppColors';
import ScreenContainer from '../components/screencontainer';
import TopBar from '../components/TopBar';
import Button from '../components/Button';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const EditProfileScreen: React.FC<Props> = ({ navigation }) => {
  const colors = useAppColors();
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [fullName, setFullName] = useState('Judah David');
  const [role, setRole] = useState('Member');
  const [email, setEmail] = useState('address@example.com');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need media permissions to make this work!');
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

  const handleSave = () => {
    console.log('Saving profile changes...');
    console.log({ fullName, role, email, avatarUri });
    // TODO: Add your API call or local storage logic here
  };

  return (
    <ScreenContainer style={[styles.container, { backgroundColor: colors.background }]}>
      <TopBar title="Edit Profile" onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
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

        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[styles.input, {color: colors.text}]}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter full name"
              placeholderTextColor="#aaa"
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>Role</Text>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              value={role}
              onChangeText={setRole}
              placeholder="Enter role"
              placeholderTextColor="#aaa"
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

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
