import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import HeadingText from '../components/HeadingText';
import ScreenContainer from '../components/screencontainer';
import InputField from '../components/InputField';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAppColors } from '../hooks/useAppColors';
import { registerUser } from '../api/auth';
import { getDeviceId } from '../utils/getDeviceId';

type RegScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'VerifyPhone'>;
};

const RegScreen: React.FC<RegScreenProps> = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  // 🔥 NEW: dynamic country code from InputField
  const [phoneCode, setPhoneCode] = useState('+234');
  const [phone, setPhone] = useState('');

  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const colors = useAppColors();

  const handleRegister = async () => {
    if (!fullName || !email || !phone || !password || !confirm_password) {
      Alert.alert('Missing fields', 'Please fill in all fields.');
      return;
    }

    if (password !== confirm_password) {
      Alert.alert('Password mismatch', 'Passwords do not match.');
      return;
    }

    // Password validation rules
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
      Alert.alert(
        'Weak Password',
        'Password must contain:\n• 1 uppercase\n• 1 lowercase\n• 1 number\n• 1 special character'
      );
      return;
    }

    // 🔥 FINALLY: Format phone properly using selected country code
    const formattedPhone = `${phoneCode}${phone}`;

    const nameParts = fullName.trim().split(' ');
    const first_name = nameParts[0];
    const last_name = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    try {
      setLoading(true);

      const deviceId = await getDeviceId();

      console.log("📤 Sending registration payload:", {
        first_name,
        last_name,
        email,
        phone_number: formattedPhone,
        password,
        confirm_password,
        imei: deviceId
      });

      const result = await registerUser({
        first_name,
        last_name,
        email,
        phone_number: formattedPhone,
        password,
        confirm_password,
        imei: deviceId
      });

      console.log("🚀 SUCCESS:", result);

      setLoading(false);

      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('VerifyPhone') },
      ]);

    } catch (error: any) {
      setLoading(false);
      console.log("❌ Registration ERROR", error);

      const message = error?.response?.data?.message
        ? error.response.data.message.join(', ')
        : 'Something went wrong';

      Alert.alert('Error', message);
    }
  };

  return (
    <ScreenContainer scrollable extraBottomPadding={320}
      style={{ paddingHorizontal: 15, paddingVertical: 30, backgroundColor: colors.background }}
    >
      <View style={{ flex: 1 }}>

      <HeadingText>Create Account</HeadingText>

      <View style={styles.authSection}>
        <Text style={[styles.continueText, { color: colors.text }]}>
          Continue with
        </Text>

        <View style={styles.imageRow}>
          <View style={styles.imageWrapper}>
            <Image source={require('../assets/Googlee.png')} style={styles.authImage} />
          </View>
          <View style={styles.imageWrapper}>
            <Image source={require('../assets/Applee.png')} style={styles.authImage} />
          </View>
        </View>

        <Text style={[styles.continueText, { color: colors.text }]}>Or</Text>
      </View>

      <InputField
        placeholder="Full name"
        spacing={16}
        value={fullName}
        onChangeText={setFullName}
      />

      <InputField
        placeholder="Email"
        spacing={16}
        value={email}
        onChangeText={setEmail}
      />

      {/* 🔥 PHONE FIELD WITH DYNAMIC COUNTRY CODE SELECTOR */}
      <InputField
        spacing={16}
        variant="phone"
        placeholder="Enter phone number"
        phoneValue={phone}
        onChangePhoneNumber={setPhone}
        onSelectCountryCode={setPhoneCode}   // 👈 IMPORTANT
      />

      <InputField
        spacing={16}
        variant="password"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />

      <InputField
        spacing={16}
        variant="password"
        placeholder="Confirm password"
        value={confirm_password}
        onChangeText={setConfirmPassword}
      />


      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setIsChecked((prev) => !prev)} style={styles.checkbox}>
          <Ionicons
            name={isChecked ? 'checkbox' : 'square-outline'}
            size={24}
            color={isChecked ? '#007bff' : '#666666'}
          />
        </TouchableOpacity>

        <Text style={[styles.checkboxText, { color: colors.reggy }]}>
          I agree to the Flexfence's<Text style={styles.link}> Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Button
          text={loading ? 'Creating Account...' : 'Create Account'}
          variant="full"
          onPress={handleRegister}
          disabled={loading}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          <Text style={{ color: colors.reggy, fontFamily: 'DMSans-Regular' }}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  authSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  continueText: {
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    marginBottom: 20,
  },
  imageRow: {
    flexDirection: 'row',
    gap: 16,
  },
  imageWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
  authImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 10,
  },
  checkbox: {
    padding: 4,
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
  },
  link: {
    color: '#007bff',
  },
});

export default RegScreen;