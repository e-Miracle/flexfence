import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import ScreenContainer from '../components/screencontainer';
import { useAppColors } from '../hooks/useAppColors';
import TimeTracker from '../components/TimeTracker';
import FenceMap from '../components/FenceMap';
import LinkedOrganizations from '../components/LinkedOrganization';
import TrackedHoursChart from '../components/TrackedHoursChart';
import Button from '../components/Button'; // 👈 make sure you import it
import BottomMenuBar from '../components/BottomMenuBar';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen: React.FC = () => {
    const colors = useAppColors();
    const navigation = useNavigation();

    const handleFloatingPress = () => {
        console.log('Floating Button Pressed!');
        // Add your navigation or action here
    };

    return (
        <ScreenContainer style={{ padding: 15, flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Image
                            source={require('../assets/cee.png')}
                            style={{ width: 40, height: 40 }}
                        />
                        <View>
                            <Text style={{ color: colors.primary, fontFamily: 'DMSans-Bold', fontSize: 18 }}>Central Park</Text>
                            <Text style={{ fontSize: 8, color: colors.reggy }}>Owerri, Garden Park</Text>
                        </View>
                    </View>
                    <Image
                        source={require('../assets/profile.png')}
                        style={{ width: 40, height: 40 }}
                    />
                </View>

                <TimeTracker />
                <FenceMap />
                <LinkedOrganizations />
                <TrackedHoursChart />
            </ScrollView>
            <BottomMenuBar navigation={navigation} />

            {/* ✅ Floating Button */}
            <View style={styles.floatingButton}>
                <Button
                    text="+"
                    variant="next"
                    onPress={handleFloatingPress}
                    style={{ borderRadius: 30, width: 60, height: 60, justifyContent: 'center' }}
                    textStyle={{ fontSize: 28, fontWeight: 'bold', marginTop: -2 }}
                />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    floatingButton: {
        position: 'absolute',
        right: 20,
        bottom: 90,
        zIndex: 999,
        elevation: 5,
    },
});

export default DashboardScreen;
