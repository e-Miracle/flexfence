import React, { useState } from 'react';
import SignOutModal from '../components/SignOutModal'; // 👈 import modal
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAppColors } from '../hooks/useAppColors';

import ScreenContainer from '../components/screencontainer';
import SettingsCard from '../components/SettingsCard';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import TopBar from '../components/TopBar';
type OnboardScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const AccountSettingsScreen: React.FC<OnboardScreenProps> = ({ navigation }) => {
    const colors = useAppColors();
    const [signOutVisible, setSignOutVisible] = useState(false);

    const settings = [
        {
            title: 'Linked organizations',
            onPress: () => console.log('LinkedOrgs'),
        },
        {
            title: 'Change email',
            onPress: () => console.log('ChangeEmail'),
        },
        {
            title: 'Change password',
            onPress: () => navigation.navigate('ChangePass'),
        },
        {
            title: 'Initiate KYC',
            onPress: () => navigation.navigate('InitiateKyc'),
        },
        {
            title: 'Time Zone',
            subtitle: 'Africa/Lagos GMT +01:00',
            onPress: () => console.log('TimeZone'),
        },
        {
            title: 'Face Data',
            subtitle: 'Configure face data',
            onPress: () => navigation.navigate('PersonalSettings'),
        },
        {
            title: 'History',
            subtitle: 'Configure face data',
            onPress: () => console.log('History'),
        },
    ];

    const handleSignOut = () => {
        console.log('Signing out...');
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    };

    return (
        <ScreenContainer style={{ flex: 1, backgroundColor: colors.background, paddingHorizontal: 16 }}>
            <TopBar title="Account Settings" onBack={() => navigation.goBack()} />

            <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 60 }}></View>

                {settings.map((item, index) => (
                    <SettingsCard
                        key={index}
                        title={item.title}
                        subtitle={item.subtitle}
                        onPress={item.onPress}
                        rightIcon={<Ionicons name="chevron-forward" size={20} color="#888" />}

                    />
                ))}

                <SettingsCard
                    title="Sign out"
                    onPress={() => setSignOutVisible(true)}
                    rightIcon={
                        <Ionicons name="log-out-outline" size={20} color="#888" />
                    }
                />
            </ScrollView>
            <SignOutModal
                visible={signOutVisible}
                onCancel={() => setSignOutVisible(false)}
                onConfirm={() => {
                    setSignOutVisible(false);
                    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
                }}
            />

        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
});

export default AccountSettingsScreen;
