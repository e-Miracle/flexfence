import React, { useEffect } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAppColors } from '../hooks/useAppColors';
import ScreenContainer from '../components/screencontainer';
import Button from '../components/Button';

type VerifyScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

const VerifyScreen: React.FC<VerifyScreenProps> = ({ navigation }) => {
    const colors = useAppColors();

   

    return (
        <ScreenContainer style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.centeredContent}>
                <Image source={require('../assets/Emailicon.png')} style={styles.image} resizeMode="contain" />
            </View>
            <View style={styles.bottomContent}>
                <Text style={[styles.VerifyTitle, { color: colors.primary }]}>
                    Email{'\n'}Verification{'\n'}Successful
                </Text>
                <Button style={{width:'100%', marginTop:'20%'}} text="Proceed to Flexfence" variant="full" onPress={() => navigation.navigate('Invitation')} />

            </View>

        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        justifyContent:'center'
    },
    centeredContent: {

        justifyContent: 'center',
    },
    bottomContent: {
        alignItems: 'center',
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
    VerifyTitle: {
        fontSize: 32,
        fontFamily: 'DMSans-Bold',
        textAlign: 'center',
        marginBottom: 10,
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

export default VerifyScreen;
