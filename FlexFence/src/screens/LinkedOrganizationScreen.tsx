import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ScreenContainer from '../components/screencontainer';
import { useAppColors } from '../hooks/useAppColors';
import TopBar from '../components/TopBar';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';

const moreOrganizations = [
    { id: '1', title: 'Central Park', subtitle: 'Owerri, Garden Park' },
    { id: '2', title: 'Conventional Centre', subtitle: 'Abuja' },
    { id: '3', title: 'Downtown Venue', subtitle: 'Head of Service' },
    { id: '4', title: 'Federal Hall', subtitle: 'Kano' },
    { id: '5', title: 'Civic Centre', subtitle: 'Lagos' },
    { id: '6', title: 'Harmony Arena', subtitle: 'Port Harcourt' },
    { id: '7', title: 'Federal Hall', subtitle: 'Kano' },
    { id: '8', title: 'Civic Centre', subtitle: 'Lagos' },
    { id: '9', title: 'Harmony Arena', subtitle: 'Port Harcourt' },
    { id: '10', title: 'Harmony Arena', subtitle: 'Port Harcourt' },
    { id: '11', title: 'Federal Hall', subtitle: 'Kano' },
    { id: '12', title: 'Civic Centre', subtitle: 'Lagos' },
    { id: '13', title: 'Harmony Arena', subtitle: 'Port Harcourt' },
];

export default function LinkedOrganizationScreen() {
    const colors = useAppColors();
    const navigation = useNavigation();

    const renderItem = ({ item }: any) => (
        <View style={styles.row}>
            <View>
                <Text style={[styles.title, { color: colors.text }]}>
                    {item.title}
                </Text>
                <Text style={[styles.subtitle, { color: colors.text }]}>
                    {item.subtitle}
                </Text>
            </View>

            <Button
                text="Clock In"
                onPress={() => console.log(`Clocked into ${item.title}`)}
                variant="next"
                style={styles.clockButton}
                textStyle={styles.clockText}
            />
        </View>
    );

    return (
        <ScreenContainer style={[styles.container, { backgroundColor: colors.background }]}>
            <TopBar title="Linked Organization" onBack={() => navigation.goBack()} />
            <View style={{marginTop: 40}}/>
            <FlatList
                data={moreOrganizations}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={{ paddingVertical: 12, flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            />
            <View
                style={{
                    backgroundColor: colors.background,
                    width: 'auto',
                    paddingHorizontal: 10,
                    paddingVertical: 25,
                }}
            >
                {[
                    'Sign in to another organization',
                    'Add an Organization',
                    'Delete an organization',
                ].map((label, index) => (
                    <View
                        key={index}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            text="+"
                            onPress={() => console.log(`${label} clicked`)}
                            variant="skip"
                        />
                        <Text style={{ marginLeft: 8 , color:colors.text}}>{label}</Text>
                    </View>
                ))}
            </View>

        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        color: '#000',
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        color: '#444',
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
        marginHorizontal: 16,
    },
    clockButton: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    clockText: {
        color: '#fff',
        fontSize: 8,
        fontFamily: 'DMSans-Regular',
    },
});
