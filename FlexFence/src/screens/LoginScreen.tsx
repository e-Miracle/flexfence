import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import HeadingText from '../components/HeadingText';
import ScreenContainer from '../components/screencontainer';
import InputField from '../components/InputField';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAppColors } from '../hooks/useAppColors';
type LoginScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Reg'>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [phone, setPhone] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const colors = useAppColors();

    return (
        <ScreenContainer style={{ paddingHorizontal: 15, paddingVertical: 30, backgroundColor: colors.background }}>
            <View style={styles.centered}>
                <Image
                    source={require('../assets/logoh.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <HeadingText>Welcome back!</HeadingText>
            <Text style={{ textAlign: 'center', fontFamily: 'DMSans-Regular', fontSize: 18 }}>Login to continue</Text>
            <View style={styles.authSection}>
                <Text style={[styles.continueText, { color: colors.text }]}>Continue with</Text>

                <View style={styles.imageRow}>
                    <View style={styles.imageWrapper}>
                        <Image
                            source={require('../assets/Googlee.png')}
                            style={styles.authImage}
                        />
                    </View>
                    <View style={styles.imageWrapper}>
                        <Image
                            source={require('../assets/Applee.png')}
                            style={styles.authImage}
                        />
                    </View>
                </View>
                <Text style={[styles.continueText, , { color: colors.text }]}>Or</Text>

            </View>
            <InputField placeholder="Email" spacing={16} />
            <InputField
                spacing={16}
                variant="password"
                placeholder="Password"
            />

            <TouchableOpacity onPress={() => console.log('forgot')}>
                <Text style={[styles.forgotPassword, { color: colors.primary }]}>
                    Forgot Password?
                </Text>
            </TouchableOpacity>

            <View style={{ marginTop: '20%' }}>
                <Button text="Login" variant="full" onPress={() => navigation.navigate('Welcome')} />
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    <Text style={{ color: colors.reggy, fontFamily: 'DMSans-Regular' }}>
                        Dont have an account?{' '}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Reg')}>
                        <Text style={styles.link}>Sign Up</Text>
                    </TouchableOpacity>
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
    centered: {
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 60,
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
    forgotPassword: {
        alignSelf: 'flex-start',
        marginTop: -10,
        marginBottom: 20,
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
    },

});

export default LoginScreen;
