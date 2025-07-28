// components/LinkedOrganizations.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';

const organizations = [
    {
        id: '1',
        title: 'Central Park',
        subtitle: 'Owerri, Garden Park',
    },
    {
        id: '2',
        title: 'Conventional Centre',
        subtitle: 'Abuja',
    },
    {
        id: '3',
        title: 'Downtown Venue',
        subtitle: 'Head of Service',
    },
    {
        id: '4',
        title: 'Conventional Centre',
        subtitle: 'Abuja',
    },
    {
        id: '5',
        title: 'Downtown Venue',
        subtitle: 'Head of Service',
    },
];

const LinkedOrganizations = () => {
    const renderItem = ({ item }: any) => (
        <View style={styles.row}>
            <View>
                <Text style={[styles.title, item.id === '1' && styles.highlightedTitle]}>{item.title}</Text>
                <Text style={[styles.subtitle, item.id === '1' && styles.highlightedSubtitle]}>{item.subtitle}</Text>
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
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Linked Organizations/Events</Text>
                <Ionicons name="chevron-forward" size={20} color="black" />
            </View>

            <FlatList
                data={organizations}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};

export default LinkedOrganizations;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 18,
        overflow: 'hidden',
        marginTop: 16,
        // Android shadow
        elevation: 2,
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
    },
    header: {
        backgroundColor: '#dceeff',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 16,
        fontFamily:'DMSans-Bold'

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 15,
        color: '#000',
        fontFamily:'DMSans-Bold'

    },
    subtitle: {
        fontSize: 13,
        color: '#444',
        fontFamily:'DMSans-Regular'

    },
    highlightedTitle: {
        color: '#1F229A',
    },
    highlightedSubtitle: {
        color: '#1F229A',
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
        fontFamily:'DMSans-Regular'

    },
});
