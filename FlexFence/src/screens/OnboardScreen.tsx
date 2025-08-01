import React, { useRef, useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    Animated,
    Dimensions,
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';
import ScreenContainer from '../components/screencontainer';
import Button from '../components/Button';
import { useAppColors } from '../hooks/useAppColors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useTheme } from '../constants/ThemeContext';
const { width } = Dimensions.get('window');

const slides = [
    {
        image: require('../assets/Boundary-free.png'),
        title: 'Boundary-Free Attendance',
        subtitle: `A geofencing attendance platform\nfor seamless tracking.`,
    },
    {
        image: require('../assets/MultipleOrg.png'),
        title: 'Support for Multiple Organizations',
        subtitle: 'Manage attendance across different\norganizations or events.',
    },
    {
        image: require('../assets/Selfie.png'),
        title: 'Optional Selfie Verification',
        subtitle: 'Use facial verification to ensure\ntrusted attendance',
    },
    {
        image: require('../assets/Businesses.png'),
        title: 'For Businesses, Events and More',
        subtitle: 'Caters to businesses, events\norganizers and gig workers.',
    },
];
type OnboardScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Reg'>;
  };
  
const OnboardScreen: React.FC<OnboardScreenProps>  = ({ navigation }) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const colors = useAppColors();
    const { theme } = useTheme();

    const logoSource =
        theme === 'dark'
            ? require('../assets/logohh.png')
            : require('../assets/logoh.png');

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    );
    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentSlide + 1 });
        } else {
            console.log('Finished onboarding');
        }
    };
    const handleSkip = () => {
        const targetOffset = 3 * width;
        flatListRef.current?.scrollToOffset({
          offset: targetOffset,
          animated: true,
        });  
        setTimeout(() => setCurrentSlide(3), 800);
      };
      
    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentSlide(viewableItems[0].index);
        }
    }).current;

    return (
        <ScreenContainer style={{backgroundColor:colors.background}}>
            <View style={styles.centered}>
            <Image
                    source={logoSource}
                    style={styles.image}
                />

            </View>
            <Animated.FlatList
                ref={flatListRef}
                data={slides}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                        <Image source={item.image} style={styles.bigimage} resizeMode="contain" />
                        <Text style={[styles.bigtext,{color:colors.text}]}>{item.title}</Text>
                        <View style={styles.subtextWrapper}>
                            <Text style={[styles.subtext,{color:colors.text}]}>{item.subtitle}</Text>
                        </View>
                    </View>
                )}
                onScroll={handleScroll}
                onViewableItemsChanged={onViewableItemsChanged}
                scrollEventThrottle={16}
            />
            {currentSlide !== slides.length - 1 && (
                <View style={styles.pagination}>
                    {[0, 1, 2].map((i) => {
                        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                        const dotWidth = scrollX.interpolate({
                            inputRange,
                            outputRange: [8, 16, 8],
                            extrapolate: 'clamp',
                        });
                        const dotOpacity =
                            i === 2
                                ? 1 
                                : scrollX.interpolate({
                                    inputRange,
                                    outputRange: [0.4, 1, 0.4],
                                    extrapolate: 'clamp',
                                });
                        return (
                            <Animated.View
                                key={i}
                                style={[
                                    styles.dot,
                                    {
                                        backgroundColor:colors.primary,
                                        width: dotWidth,
                                        opacity: dotOpacity,
                                    },
                                ]}
                            />
                        );
                    })}
                </View>
            )}

            {currentSlide === slides.length - 1 ? (
                <View style={styles.fullButtonWrapper}>
                    <Button text="Get Started" variant="full" onPress={() => navigation.navigate('Reg')} />
                    <Button text="Login" variant="outline" onPress={() => navigation.navigate('Login')} />
                </View>
            ) : (
                <View style={styles.buttonContainer}>
                    <Button text="Skip" variant="skip" onPress={handleSkip} />
                    <Button
                        text={currentSlide === slides.length - 2 ? 'Start' : 'Next'}
                        variant="next"
                        onPress={handleNext}
                    />
                </View>
            )}
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    centered: {
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 20,
        marginBottom: 10,
        marginTop:20
    },
    slide: {
        width,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    bigimage: {
        width: '100%',
        height: 240,
        marginBottom: 20,
        alignSelf: 'center',
    },
    bigtext: {
        fontFamily: 'DMSans-Bold',
        fontSize: 26,
        fontWeight: '600',
        lineHeight: 32,
        color: '#000',
    },
    subtextWrapper: {
        alignSelf: 'flex-start',
    },
    subtext: {
        fontFamily: 'DMSans-Regular',
        fontSize: 14,
        lineHeight: 20,
        marginTop: 8,
        color: '#555',
        textAlign: 'left',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
        gap: 8,
    },
    dot: {
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    fullButtonWrapper: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 40,
        marginTop: 80,
        gap: 12,
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        flex: 1,
    },
});

export default OnboardScreen;
