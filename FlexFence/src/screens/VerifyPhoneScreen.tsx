// src/screens/VerifyPhoneScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenContainer from '../components/screencontainer';
import OtpInput from '../components/OtpInput';

const VerifyPhoneScreen: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 minutes

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

  return (
    <ScreenContainer style={styles.container}>
      <Image
        source={require('../assets/Phonee.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.heading}>
        Verify your{'\n'}Phone Number
      </Text>
      <Text style={styles.subtext}>
        A six digit code has been sent to
      </Text>
      <Text style={styles.phone}>+668754322</Text>

      <OtpInput />

      <Text style={styles.expiryText}>
        The OTP will expire in {formatTime(secondsLeft)}
      </Text>

      <Text style={styles.resendContainer}>
        Didn’t get the OTP?{' '}
        <Text style={styles.resendAction}>Resend</Text> or{' '}
        <Text style={styles.resendAction}>Send to Email</Text>
      </Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  heading: {
    fontSize: 30,
    fontFamily: 'DMSans-Bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  subtext: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    fontFamily: 'DMSans-Regular',
  },
  phone: {
    fontWeight: '600',
    color: '#000',
    marginBottom: 30,
  },
  expiryText: {
    marginTop: 20,
    fontSize: 14,
    color: '#999',
    fontFamily: 'DMSans-Regular',
  },
  resendContainer: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    fontFamily: 'DMSans-Regular',
    width:'70%'
  },
  resendAction: {
    color: '#007BFF',
    fontWeight: '600',
  },
});

export default VerifyPhoneScreen;
