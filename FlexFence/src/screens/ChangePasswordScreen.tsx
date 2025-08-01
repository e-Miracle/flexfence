import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/screencontainer';
import TopBar from '../components/TopBar';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useAppColors } from '../hooks/useAppColors';

const ChangePasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const colors = useAppColors();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    // Add password change logic here
    console.log('Passwords submitted:', { currentPassword, newPassword, confirmPassword });
  };

  return (
    <ScreenContainer style={{ backgroundColor: colors.background }}>
      <TopBar title="Change Password" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.label, {color:colors.text}]}>Current password</Text>
        <InputField
          placeholder="Current Password"
          variant="password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          spacing={12}
        />
        <TouchableOpacity>
          <Text style={[styles.forgotText, {color:colors.text}]}>Forgot Password?</Text>
        </TouchableOpacity>

        <Text style={[styles.label, { marginTop: 28, color:colors.text }]}>Enter your new password</Text>
        <InputField
          placeholder="New Password"
          variant="password"
          value={newPassword}
          onChangeText={setNewPassword}
          spacing={12}
        />
        <InputField
          placeholder="Confirm Password"
          variant="password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          spacing={24}
        />

        <Button text="Save" onPress={handleSave} variant="full" />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 100,
  },
  label: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
    marginBottom: 6,
    color: '#000',
  },
  forgotText: {
    fontSize: 13,
    fontFamily: 'DMSans-Regular',
    marginTop: 6,
  },
});

export default ChangePasswordScreen;
