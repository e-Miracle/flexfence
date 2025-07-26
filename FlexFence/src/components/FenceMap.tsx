import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const FenceMap = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [fenceCenter, setFenceCenter] = useState<{ latitude: number; longitude: number } | null>(null);
  const [insideFence, setInsideFence] = useState(false);
  const fenceRadius = 300; // meters

  const getDistanceFromLatLonInMeters = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371000;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      const currentCoords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };

      // Set current location as fence center
      setFenceCenter(currentCoords);

      const dist = getDistanceFromLatLonInMeters(
        loc.coords.latitude,
        loc.coords.longitude,
        currentCoords.latitude,
        currentCoords.longitude
      );

      setInsideFence(dist <= fenceRadius);
    })();
  }, []);

  if (!location || !fenceCenter) return <Text>Loading map...</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {insideFence ? 'Inside Fence' : 'Outside Fence'}
        </Text>
        <Text style={styles.headerSubtitle}>
          You are currently {insideFence ? 'within' : 'outside'} the designated fence
        </Text>
      </View>

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: fenceCenter.latitude,
          longitude: fenceCenter.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
      >
        <Circle
          center={fenceCenter}
          radius={fenceRadius}
          strokeColor="rgba(0,191,255,0.5)"
          fillColor="rgba(0,191,255,0.3)"
        />
      </MapView>
    </View>
  );
};

export default FenceMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 10,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#dceeff',
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  map: {
    width: '100%',
    height: 260,
  },
});
