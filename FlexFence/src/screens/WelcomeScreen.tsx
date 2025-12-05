import React, { useEffect } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAppColors } from '../hooks/useAppColors';
import ScreenContainer from '../components/screencontainer';
import { useTheme } from '../constants/ThemeContext';
import Button from '../components/Button';
import { useLoadProfile } from '../hooks/useLoadProfile';


type WelcomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
    const colors = useAppColors();
    const { theme } = useTheme();
    const { profile, loading, error } = useLoadProfile();

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error}</Text>;

    const logoSource =
        theme === 'dark'
            ? require('../assets/whitelogo.png')
            : require('../assets/purplelogo.png');

    return (
        <ScreenContainer style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.centeredContent}>
                <Image source={logoSource} style={styles.image} resizeMode="contain" />
            </View>
            <View style={styles.bottomContent}>
                <Text style={[styles.welcomeTitle, { color: colors.primary }]}>
                    Hello {profile.first_name}!
                </Text>
                <Text style={[styles.welcomeTitle, { color: colors.primary }]}>
                    Welcome to Flexfence
                </Text>
                <Text style={[styles.welcomeSubtitle, { color: colors.text }]}>
                    Track attendance seamlessly with geofence-based locations and QR code scanning.
                </Text>
                <Button style={{width:'100%'}} text="Start" variant="full" onPress={() => navigation.navigate('Dashboard')} />

            </View>

        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15

    },
    centeredContent: {
        flex: 1,
        justifyContent: 'center',
    },
    bottomContent: {
        alignItems: 'center',
        paddingBottom: 40,
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: 'center',
    },
    fleximage: {
        width: 150,
        height: 40,
    },
    welcomeTitle: {
        fontSize: 24,
        fontFamily: 'DMSans-Bold',
        textAlign: 'center',
        marginBottom: 10,
    },

    welcomeSubtitle: {
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 30,
    },

    getStartedButton: {
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
    },

    getStartedText: {
        color: '#fff',
        fontFamily: 'DMSans-Bold',
        fontSize: 16,
        textAlign: 'center',
    },

});

export default WelcomeScreen;
