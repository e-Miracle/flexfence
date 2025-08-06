import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useAppColors } from '../hooks/useAppColors';
import ScreenContainer from '../components/screencontainer';
import BottomMenuBar from '../components/BottomMenuBar';
import TopBar from '../components/TopBar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import HistoryCard from '../components/HistoryCard';

type HistoryScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'History'>;
};

const historyData = {
    Date: [
        {
            date: 'June 21, 2025',
            location: 'FUTO Studio Block',
            clockIn: '08:13 AM',
            clockOut: '04:44 PM',
            duration: '8h 31m',
            status: 'Verified',
        },
    ],
    'This Week': [
        {
            date: 'June 21, 2025',
            location: 'FUTO Senate Building',
            clockIn: '08:13 AM',
            clockOut: '04:44 PM',
            duration: '8h 31m',
            status: 'Verified',
        },
        {
            date: 'June 20, 2025',
            location: 'FUTO Library',
            clockIn: '08:23 AM',
            clockOut: 'Missed',
            duration: '5h 02m',
            status: 'Incomplete',
        },
        {
            date: 'June 19, 2025',
            location: 'FUTO Cafe',
            clockIn: '09:00 AM',
            clockOut: '04:00 PM',
            duration: '7h 00m',
            status: 'Verified',
        },
    ],
    'This Month': [
        {
            date: 'June 18, 2025',
            location: 'FUTO Workshop',
            clockIn: '08:45 AM',
            clockOut: '05:00 PM',
            duration: '8h 15m',
            status: 'Verified',
        },
        {
            date: 'June 15, 2025',
            location: 'FUTO Lab',
            clockIn: '09:10 AM',
            clockOut: 'Missed',
            duration: '4h 40m',
            status: 'Incomplete',
        },
        {
            date: 'June 13, 2025',
            location: 'FUTO Studio',
            clockIn: '08:00 AM',
            clockOut: '03:30 PM',
            duration: '7h 30m',
            status: 'Verified',
        },
    ],
    Custom: [
        {
            date: 'June 10, 2025',
            location: 'FUTO Hall A',
            clockIn: '08:30 AM',
            clockOut: '02:45 PM',
            duration: '6h 15m',
            status: 'Verified',
        },
        {
            date: 'June 8, 2025',
            location: 'FUTO Admin Block',
            clockIn: '09:00 AM',
            clockOut: 'Missed',
            duration: '3h 45m',
            status: 'Incomplete',
        },
        {
            date: 'June 6, 2025',
            location: 'FUTO Clinic',
            clockIn: '07:50 AM',
            clockOut: '04:10 PM',
            duration: '8h 20m',
            status: 'Verified',
        },
        {
            date: 'June 5, 2025',
            location: 'FUTO ICT Center',
            clockIn: '08:20 AM',
            clockOut: '03:45 PM',
            duration: '7h 25m',
            status: 'Verified',
        },
        {
            date: 'June 2, 2025',
            location: 'FUTO Staff School',
            clockIn: '08:10 AM',
            clockOut: '02:40 PM',
            duration: '6h 30m',
            status: 'Incomplete',
        },
    ],
};

const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
    const colors = useAppColors();
    const [selectedFilter, setSelectedFilter] = useState<'Date' | 'This Week' | 'This Month' | 'Custom'>('Date');

    return (
        <ScreenContainer style={{ flex: 1, backgroundColor: colors.background, paddingBottom: 50 }}>
            <TopBar title="History" onBack={() => navigation.goBack()} />
            <View style={{ marginTop: 40 }} />
            {/* Filter Buttons */}
            <View style={styles.filterContainer}>
                {(['Date', 'This Week', 'This Month', 'Custom'] as const).map((label) => (
                    <TouchableOpacity
                        key={label}
                        onPress={() => setSelectedFilter(label)}
                        style={[
                            styles.filterButton,
                            {
                                borderColor: selectedFilter === label ? colors.text : colors.card,
                                borderWidth: 1.5,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                { color: selectedFilter === label ? colors.text : colors.text },
                            ]}
                        >
                            {label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* History Cards */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {historyData[selectedFilter].map((item, index) => (
                    <HistoryCard
                        date={item.date}
                        location={item.location}
                        clockIn={item.clockIn}
                        clockOut={item.clockOut}
                        duration={item.duration}
                        status={item.status === 'Verified' ? 'Verified' : 'Incomplete'}
                        key={index}
                    />
                ))}
            </ScrollView>

            <BottomMenuBar navigation={navigation} />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        paddingHorizontal: 10,
    },
    filterButton: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    filterText: {
        fontSize: 13,
        fontFamily: 'DMSans-Bold'
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
});

export default HistoryScreen;
