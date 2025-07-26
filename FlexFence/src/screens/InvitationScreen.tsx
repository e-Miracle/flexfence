import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import HeadingText from '../components/HeadingText';
import ScreenContainer from '../components/screencontainer';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAppColors } from '../hooks/useAppColors';
import { useTheme } from '../constants/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
type InvitationScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Reg'>;
};

const InvitationScreen: React.FC<InvitationScreenProps> = ({ navigation }) => {

    const colors = useAppColors();
    const { theme } = useTheme();

    const logoSource =
        theme === 'dark'
            ? require('../assets/logohh.png')
            : require('../assets/logoh.png');

    return (
        <ScreenContainer style={{ paddingHorizontal: 15, paddingVertical: 30, backgroundColor: colors.background }}>
            <View style={styles.centered}>
                <Image
                    source={logoSource}
                    style={styles.image}
                    resizeMode="contain"
                />

            </View>
            <HeadingText>Hi, Judah David</HeadingText>
            <Text style={{ textAlign: 'center', marginTop: 10, fontFamily: 'DMSans-Regular', fontSize: 12, color: colors.text }}>Join an Organization to keep track of{'\n'}your attendance</Text>
            <View style={styles.centered}>
                <Image
                    source={require('../assets/bellIcon.png')}
                    style={styles.imagetwo}
                    resizeMode="contain"
                />
            </View>

            <View style={{ marginTop: '5%' }}>
                <Button text="You have one pending Invitation" variant="full" onPress={() => navigation.navigate('Welcome')} />
                <View
                    style={{
                        marginTop: 20,
                        backgroundColor:' #fff',
                        borderRadius: 10,
                        borderBottomWidth:1,
                        borderColor:'#ccc',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        width: '100%',
                    }}
                >
                    {/* Left image */}
                    <Image
                        source={require('../assets/Organization.png')}
                        style={{ height: 30, width: 130 }}
                        resizeMode="contain"
                    />

                    {/* Right buttons */}
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        <TouchableOpacity onPress={() => console.log('Accepted')}>
                            <LinearGradient
                                colors={['#1F229A', '#0BC1D8']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{
                                    paddingVertical: 6,
                                    paddingHorizontal: 10,
                                    borderRadius: 6,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 60,
                                    height: 40,
                                }}
                            >
                                <Text style={{ color: '#fff', fontSize: 10, fontWeight: '600', fontFamily: 'DMSans-Bold' }}>
                                    Accept
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => console.log('Declined')}
                            style={{
                                backgroundColor: '#f2f2f2',
                                paddingVertical: 4,
                                paddingHorizontal: 12,
                                borderRadius: 6,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: '#333', fontSize: 10, fontWeight: '600', fontFamily: 'DMSans-Bold' }}>
                                Decline
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={{color:colors.text, fontFamily:'DMSans-Regular', marginVertical: 20}}>Your Organizations (0)</Text>
                <Text style={{color:colors.text, fontSize:12, fontFamily:'DMSans-Regular'}}>Accept the invitation to become a part of{'\n'}the organization</Text>

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
    imagetwo: {
        width: '100%',
        height: 250,
    },
});

export default InvitationScreen;
