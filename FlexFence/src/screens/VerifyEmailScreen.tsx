import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/screencontainer';
import OtpInput from '../components/OtpInput';
import styles from '../styles/VerifyEmailStyles';

const VerifyEmailScreen: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(300);
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSendToPhone = () => {
    navigation.navigate('VerifyPhone' as never);
  };

  return (
    <ScreenContainer style={styles.container}>
      <Image
        source={require('../assets/Email.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.heading}>Verify your Email</Text>
      <Text style={styles.subtext}>A six digit code has been sent to</Text>
      <Text style={styles.Email}>henrynzekwe25@gmail.com</Text>

      <OtpInput />

      <Text style={styles.expiryText}>
        The OTP will expire in {formatTime(secondsLeft)}
      </Text>

      <Text style={styles.resendContainer}>
        Didn’t get the OTP?{' '}
        <Text style={styles.resendAction}>Resend</Text> or{' '}
        <TouchableOpacity onPress={handleSendToPhone}>
          <Text style={styles.resendAction}>Send to Phone number</Text>
        </TouchableOpacity>
      </Text>
    </ScreenContainer>
  );
};

export default VerifyEmailScreen;
