import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAppColors } from '../hooks/useAppColors';
import ScreenContainer from '../components/screencontainer';
import { useTheme } from '../constants/ThemeContext';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const colors = useAppColors();
  const { theme } = useTheme();

  const logoSource =
    theme === 'dark'
      ? require('../assets/whitelogo.png')
      : require('../assets/purplelogo.png');

  const flexSource =
    theme === 'light'
      ? require('../assets/whiteflex.png')
      : require('../assets/blackflex.png');

  return (
    <ScreenContainer style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.centeredContent}>
        <Image source={logoSource} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.bottomContent}>
        <Image source={flexSource} style={styles.fleximage} resizeMode="contain" />
        <Text style={{color:colors.text, fontSize:10}}>Boundary-Free Attendance</Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
});

export default HomeScreen;
