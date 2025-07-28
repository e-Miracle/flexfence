import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Button from './Button';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const FloatingMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const handleFloatingPress = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {isMenuOpen && (
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <View style={styles.floatingMenu}>
        {isMenuOpen && (
          <View style={styles.expandedMenu}>
            <View style={styles.inlineMenu}>
              <Button
                text="Scan QR Code"
                variant="next"
                onPress={() => {
                  navigation.navigate('QrCode');

                }}
                style={styles.menuItem}
                textStyle={{ fontSize: 10 }}
              />
              <View style={styles.roundIcon}>
                <Feather name="maximize" size={16} color="white" />
              </View>
            </View>

            <View style={styles.inlineMenu}>
              <Button
                text="Selfie Verification"
                variant="next"
                onPress={() => {
                  navigation.navigate('Selfie');
                }}
                style={styles.menuItem}
                textStyle={{ fontSize: 10 }}
              />
              <View style={styles.roundIcon}>
                <Feather name="camera" size={16} color="white" />
              </View>
            </View>
          </View>
        )}

        <Button
          text={isMenuOpen ? '×' : '+'}
          variant="next"
          onPress={handleFloatingPress}
          style={styles.fabButton}
          textStyle={{ fontSize: 28, fontWeight: 'bold', marginTop: -2 }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 998,
  },
  floatingMenu: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    alignItems: 'flex-end',
    zIndex: 999,
  },
  expandedMenu: {
    marginBottom: 10,
    gap: 10,
    alignItems: 'flex-end',
  },
  inlineMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  fabButton: {
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    height: 44,
    borderRadius: 20,
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  roundIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1F229A',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatingMenu;
