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
type RegScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'VerifyPhone'>;
  };
  
const RegScreen: React.FC<RegScreenProps> = ({navigation}) => {
    const [phone, setPhone] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const colors = useAppColors();

    return (
        <ScreenContainer style={{  paddingHorizontal: 15, paddingVertical: 30, backgroundColor: colors.background }}>
            <HeadingText>Create Account</HeadingText>
            <View style={styles.authSection}>
                <Text style={[styles.continueText,{color:colors.text}]}>Continue with</Text>
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
                <Text style={[styles.continueText, {color:colors.text}]}>Or</Text>

            </View>
            <InputField placeholder="Full name" spacing={16} />
            <InputField placeholder="Email" spacing={16} />
            <InputField
                spacing={16}
                variant="phone"
                placeholder="Enter phone number"
                phoneValue={phone}
                onChangePhoneNumber={setPhone}
            />
            <InputField
                spacing={16}
                variant="password"
                placeholder="Password"
            />
            <InputField
                spacing={16}
                variant="password"
                placeholder="Confirm password"
            />
            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    onPress={() => setIsChecked((prev) => !prev)}
                    style={styles.checkbox}
                >
                    <Ionicons
                        name={isChecked ? 'checkbox' : 'square-outline'}
                        size={24}
                        color={isChecked ? '#007bff' : '#666666'}
                    />
                </TouchableOpacity>

                <Text style={[styles.checkboxText,{color:colors.reggy}]}>
                    I agree to the Flexfence’s<Text style={styles.link}> Terms of Service</Text> and <Text style={styles.link}>Privacy Policy</Text>
                </Text>
            </View>
            <View style={{marginTop:'auto'}}>
                <Button text="Create Account" variant="full" onPress={() => navigation.navigate('VerifyPhone')} />
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    <Text style={{ color: colors.reggy, fontFamily: 'DMSans-Regular' }}>
                        Already have an account?{' '}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.link}>Login</Text>
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
