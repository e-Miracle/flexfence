import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    Animated,
} from 'react-native';
import {
    CameraView,
    useCameraPermissions,
    CameraType,
} from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../components/TopBar';
import ScreenContainer from '../components/screencontainer';
import { useAppColors } from '../hooks/useAppColors';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const DURATION = 20 * 1000; // 50 seconds

const SelfieScreen: React.FC = () => {
    const navigation = useNavigation();
    const cameraRef = useRef<CameraView>(null);
    const [facing, setFacing] = useState<CameraType>('front');
    const [permission, requestPermission] = useCameraPermissions();
    const [isLoading, setIsLoading] = useState(false);
    const progressAnim = useRef(new Animated.Value(0)).current;
    const [percent, setPercent] = useState(0);
    const colors = useAppColors();

    useEffect(() => {
        if (!permission) {
            requestPermission();
        }
    }, [permission]);

    useEffect(() => {
        if (!permission?.granted) return;

        // Start animation to progress bar
        Animated.timing(progressAnim, {
            toValue: 1,
            duration: DURATION,
            useNativeDriver: false,
        }).start();

        // Attach animated listener to update percent state
        const listenerId = progressAnim.addListener(({ value }) => {
            setPercent(Math.round(value * 100));
        });

        // Auto trigger photo after animation completes
        const timer = setTimeout(() => {
            takePicture();
        }, DURATION);

        // Cleanup
        return () => {
            clearTimeout(timer);
            progressAnim.removeListener(listenerId);
        };
    }, [permission]);

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    const takePicture = async () => {
        if (cameraRef.current && !isLoading) {
            setIsLoading(true);
            try {
                const photo = await cameraRef.current.takePictureAsync({ base64: true });
                console.log('📸 Captured selfie:', photo.uri);

                setTimeout(() => {
                    setIsLoading(false);
                    navigation.goBack();
                }, 1500);
            } catch (error) {
                console.error('Failed to take picture:', error);
                setIsLoading(false);
            }
        }
    };

    if (!permission) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>Checking camera permissions…</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>Camera access is required.</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.captureButton}>
                    <Text style={styles.captureText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <ScreenContainer style={[styles.container, { backgroundColor: colors.background }]}>
            <TopBar title="Selfie Verification" onBack={() => navigation.goBack()} />
            <View style={{ marginTop: 40 }}></View>

            <Text style={{ color: colors.primary, fontFamily: 'DMSans-Regular', textAlign: 'center', marginTop: 40 }}>
                Take selfie to verify your{'\n'}identity/join fence
            </Text>

            <View style={styles.cameraWrapper}>
                <CameraView
                    ref={cameraRef}
                    style={[styles.camera, { borderColor: colors.primary }]}
                    facing={facing}
                />
            </View>

            <Text style={[styles.progressText, { color: colors.primary }]}>
                {percent}%
            </Text>

            <Text style={{ color: colors.text, fontFamily: 'DMSans-Regular', textAlign: 'center', marginVertical: 5 }}>
                Verifying your face...
            </Text>

            <View style={styles.progressBarWrapper}>
                <Animated.View style={[styles.progressBar, { width: progressWidth }]}>
                    <LinearGradient
                        colors={['#1F229A', '#00BFFF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradientFill}
                    />
                </Animated.View>
            </View>

            <View style={[styles.captureContainer, {backgroundColor: colors.background}]}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={colors.primary} />
                ) : (
                    <TouchableOpacity
                        style={[styles.captureButton, { backgroundColor: '#1F229A' }]}
                    >
                    </TouchableOpacity>
                )}
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {},
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 20,
    },
    permissionText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
    cameraWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    camera: {
        height: 300,
        width: 200,
        borderRadius: 130,
        overflow: 'hidden',
        borderWidth: 3,
        marginBottom:20
    },
    progressText: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '600',
        marginTop: 14,
    },
    progressBarWrapper: {
        width: '70%',
        height: 20,
        backgroundColor: '#eee',
        borderRadius: 10,
        overflow: 'hidden',
        alignSelf: 'center',
        marginTop: 14,
    },
    progressBar: {
        height: '100%',
    },
    gradientFill: {
        height: '100%',
        width: '100%',
    },
    captureContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    captureButton: {
display: 'none'
    },
    captureText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default SelfieScreen;
