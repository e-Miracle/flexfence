import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/screencontainer';
import OtpInput from '../components/OtpInput';
import styles from '../styles/VerifyEmailStyles';
import { useAppColors } from '../hooks/useAppColors';

const VerifyEmailScreen: React.FC = () => {
    const [secondsLeft, setSecondsLeft] = useState(300);
    const navigation = useNavigation();
    const colors = useAppColors();

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
        <ScreenContainer style={[styles.container, { backgroundColor: colors.background }]}>
            <Image
                source={require('../assets/Email.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={[styles.heading, { color: colors.text }]}>Verify your Email</Text>
            <Text style={[styles.subtext, { color: colors.text }]}>A six digit code has been sent to</Text>
            <Text style={[styles.phone, { color: colors.text }]}>example@gmail.com</Text>

            <OtpInput
                onCodeFilled={(code) => {
                    console.log('OTP entered:', code);
                    navigation.navigate('Verify' as never);
                }}
            />

            <Text style={[styles.expiryText, { color: colors.reggy }]}>
                The OTP will expire in {formatTime(secondsLeft)}
            </Text>

            <Text style={[styles.resendContainer, { color: colors.reggy }]}>
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
