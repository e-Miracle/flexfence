// components/LinkedOrganizations.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

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

      <LinearGradient
        colors={['#1F229A', '#0BC1D8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.clockButton}
      >
        <Text style={styles.clockText}>Clock In</Text>
      </LinearGradient>
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
    elevation: 2,
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
    fontWeight: '700',
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
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    fontSize: 13,
    color: '#444',
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
    fontWeight: '600',
  },
});
