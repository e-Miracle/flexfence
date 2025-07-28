import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import {
    CameraView,
    useCameraPermissions,
    CameraType,
    CameraViewRef,
} from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../components/TopBar';
import ScreenContainer from '../components/screencontainer';
import { useAppColors } from '../hooks/useAppColors';

const { width } = Dimensions.get('window');

const SelfieScreen: React.FC = () => {
    const navigation = useNavigation();
    const cameraRef = useRef<CameraView>(null);
    
    const [facing, setFacing] = useState<CameraType>('front');
    const [permission, requestPermission] = useCameraPermissions();
    const [isLoading, setIsLoading] = useState(false);
    const colors = useAppColors();

    useEffect(() => {
        if (!permission) {
            requestPermission();
        }
    }, [permission]);

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            setIsLoading(true);
            try {
                const photo = await cameraRef.current?.takePictureAsync({ base64: true });
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

    return (
        <ScreenContainer style={[styles.container, { backgroundColor: colors.background }]}>
            <TopBar title="Selfie Verification" onBack={() => navigation.goBack()} />
            <Text style={{ color: colors.primary, fontFamily: 'DMSans-Regular', textAlign: 'center', marginTop: 20 }}>Take selfie to verify your{'\n'}identity/join fence</Text>
            <View style={styles.cameraWrapper}>
                <CameraView
                    ref={cameraRef}
                    style={styles.camera}
                    facing={facing}
                />

            </View>

            <View style={styles.captureContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#1F229A" />
                ) : (
                    <TouchableOpacity
                        onPress={takePicture}
                        style={[styles.captureButton, { backgroundColor: '#1F229A' }]}
                    >
                        <Text style={styles.captureText}>Capture</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.captureButton} onPress={toggleCameraFacing}>
                    <Text>Switch</Text>
                </TouchableOpacity>
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
    },
    captureContainer: {
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#fff',
    },
    captureButton: {
        width: 140,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        backgroundColor: '#ccc',
    },
    captureText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default SelfieScreen;
