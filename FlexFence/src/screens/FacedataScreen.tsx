import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import TopBar from '../components/TopBar';
import ScreenContainer from '../components/screencontainer';
import Button from '../components/Button';
import { useAppColors } from '../hooks/useAppColors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

const { width } = Dimensions.get('window');
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

const steps = [
    {
        image: require('../assets/face1.png'),
        valid: false,
        instruction: 'Take Selfie in a\nwell lit area',
        sub: 'Not too dark nor too bright',
        noticeTitle: 'Notice!!!',
        noticeSubtitle: 'For great results, follow the following steps below',
    },
    {
        image: require('../assets/face2.png'),
        valid: true,
        instruction: 'Hold camera at eye level',
        sub: 'Center your face and smile',
        noticeTitle: 'You are almost there...',
        noticeSubtitle: 'Just one more step!',
    },
    {
        image: require('../assets/face3.png'),
        valid: false,
        instruction: 'Avoid shadows or glares',
        sub: 'Make sure your face is visible',
        noticeTitle: 'Final Step..',
        noticeSubtitle: 'Please read carefully!',
    },
];

const ConfigureFaceDataScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const colors = useAppColors();
    const scrollRef = useRef<ScrollView>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [showWalkthrough, setShowWalkthrough] = useState<boolean | null>(null);

    useEffect(() => {
        const checkWalkthrough = async () => {
            const hasSeen = await AsyncStorage.getItem('hasSeenFaceWalkthrough');
            setShowWalkthrough(hasSeen !== 'true');
        };
        checkWalkthrough();
    }, []);

    const handleNext = async () => {
        if (currentStep < steps.length - 1) {
          scrollRef.current?.scrollTo({ x: width * (currentStep + 1), animated: true });
          setCurrentStep((prev) => prev + 1);
        } else {
          await AsyncStorage.setItem('hasSeenFaceWalkthrough', 'true');
          navigation.navigate('Selfie');
        }
      };
      

    if (showWalkthrough === null) return null; 

    return showWalkthrough ? (
        <ScreenContainer style={{ flex: 1, backgroundColor: colors.background, paddingBottom: 40 }}>
            <TopBar title="Configure Face Data" onBack={() => navigation.goBack()} />
            <View style={{ marginTop: 40 }} />
            <View style={styles.noticeContainer}>
                <Text style={[styles.noticeTitle,{color:colors.text}]}>{steps[currentStep].noticeTitle}</Text>
                <Text style={[styles.noticeSubtitle, {color:colors.reggy}]}>{steps[currentStep].noticeSubtitle}</Text>
            </View>

            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                {steps.map((item, index) => (
                    <View key={index} style={[styles.slide, { width }]}>
                        <Image source={item.image} style={styles.faceImage} />
                        <View style={styles.iconRow}>
                            {steps.map((s, idx) => (
                                <Ionicons
                                    key={idx}
                                    name={s.valid ? 'checkmark-circle' : 'close-circle'}
                                    size={28}
                                    color={s.valid ? 'green' : 'red'}
                                />
                            ))}
                        </View>
                        <View style={styles.instructionContainer}>
                            <Text style={[styles.instructionTitle,{color:colors.text}]}>{item.instruction}</Text>
                            <Text style={[styles.instructionSubtitle, {color:colors.reggy}]}>{item.sub}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.dots}>
                {steps.map((_, index) => (
                    <View key={index} style={[styles.dot, currentStep === index && styles.activeDot]} />
                ))}
            </View>

            <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
                <Button
                    text={currentStep < steps.length - 1 ? 'Next' : 'Setup Face data'}
                    variant="full"
                    onPress={handleNext}
                />
            </View>
        </ScreenContainer>
    ) : (
        <ScreenContainer style={{ flex: 1, backgroundColor: colors.background}}>
            <TopBar title="Face Data" onBack={() => navigation.goBack()} />
            <View style={{ marginTop: 60 }} />

            <TouchableOpacity
                style={styles.optionRow}
                onPress={async () => {
                    await AsyncStorage.removeItem('hasSeenFaceWalkthrough');
                    setShowWalkthrough(true); // show walkthrough immediately
                    setCurrentStep(0); // reset step to start
                    scrollRef.current?.scrollTo({ x: 0, animated: false });
                }}
            >
                <Text style={[styles.optionText, {color:colors.text}]}>Update face data</Text>
                <Ionicons name="scan" size={20} color={colors.text} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.optionRow}
                onPress={async () => {
                    await AsyncStorage.removeItem('hasSeenFaceWalkthrough');
                    setShowWalkthrough(true); // show walkthrough immediately
                    setCurrentStep(0); // reset step to start
                    scrollRef.current?.scrollTo({ x: 0, animated: false });
                }}
            >
                <Text style={[styles.optionText, { color: 'red' }]}>Delete face data</Text>
                <Ionicons name="trash-outline" size={20} color="red" />
            </TouchableOpacity>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    noticeContainer: {
        marginTop: 20,
        marginLeft: 20,
        alignItems: 'flex-start',
        paddingHorizontal: 16,
    },
    noticeTitle: {
        fontSize: 28,
        fontFamily: 'DMSans-Bold',
        color: '#000',
    },
    noticeSubtitle: {
        marginTop: 8,
        fontSize: 15,
        textAlign: 'left',
        color: '#444',
        fontFamily: 'DMSans-Regular',

    },
    slide: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 80,
        marginTop: 24,
    },
    faceImage: {
        width: width - 60,
        height: (width - 64) * 0.42,
        borderRadius: 12,
        resizeMode: 'cover',
    },
    instructionContainer: {
        marginTop: 28,
        alignItems: 'center',
    },
    instructionTitle: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'DMSans-Bold',

    },
    instructionSubtitle: {
        marginTop: 6,
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        fontFamily: 'DMSans-Regular',

    },
    dots: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
    },
    activeDot: {
        backgroundColor: '#3F51B5',
        width: 24,
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    optionText: {
        fontSize: 16,
        fontWeight: '500',
    },
});

export default ConfigureFaceDataScreen;
