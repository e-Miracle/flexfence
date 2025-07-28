import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Alert,
} from 'react-native';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../components/TopBar';
import ScreenContainer from '../components/screencontainer';
import { useAppColors } from '../hooks/useAppColors';

const { width } = Dimensions.get('window');
const SCAN_AREA_SIZE = width * 0.8;

const ScanQRCodeScreen: React.FC = () => {
    const navigation = useNavigation();
    const cameraRef = useRef<CameraView>(null);
    const [permission, requestPermission] = useCameraPermissions();
    const colors = useAppColors();
    const [facing, setFacing] = useState<CameraType>('back');

    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        if (!permission) {
            requestPermission();
        }
    }, [permission]);

    const handleBarCodeScanned = ({ data }: { data: string }) => {
        if (!scanned) {
            setScanned(true);
            Alert.alert('QR Code Scanned', `Data: ${data}`, [
                {
                    text: 'OK',
                    onPress: () => {
                        setScanned(false);
                        navigation.goBack();
                    },
                },
            ]);
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
                <Text style={styles.permissionText}>Camera access is required to scan QR codes.</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.button}>
                    <Text style={styles.buttonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScreenContainer style={[styles.container, { backgroundColor: colors.background }]}>
            <TopBar title="Scan QR Code" onBack={() => navigation.goBack()} />

            <Text style={[styles.instruction, { color: colors.primary }]}>
                Scan QR code to join{'\n'}fence/event
            </Text>

            <View style={styles.cameraWrapper}>
                <CameraView
                    ref={cameraRef}
                    style={styles.camera}
                    facing={facing}
                    onBarcodeScanned={handleBarCodeScanned}
                />
                <View style={styles.scanBox} />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#000',
    },
    permissionText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    instruction: {
        textAlign: 'center',
        fontFamily: 'DMSans-Regular',
        fontSize: 16,
        marginTop: 20,
    },
    cameraWrapper: {
        flex: 1,
        alignItems: 'center',
        marginTop: 70
    },
    camera: {
        width: SCAN_AREA_SIZE,
        height: SCAN_AREA_SIZE,
        position: 'absolute',
        borderRadius: 10,

    },
    scanBox: {
        width: SCAN_AREA_SIZE,
        height: SCAN_AREA_SIZE,
        borderWidth: 3,
        borderColor: '#1F229A',
        borderRadius: 10,
        position: 'absolute',
    },
    button: {
        backgroundColor: '#1F229A',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ScanQRCodeScreen;
