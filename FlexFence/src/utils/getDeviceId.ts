import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export const getDeviceId = async (): Promise<string> => {
  try {
    let storedId = await SecureStore.getItemAsync('device_id');

    if (!storedId) {
      // Use Expo's device ID with additional entropy for uniqueness
      const expoDeviceId = Constants.deviceId || 'unknown';
      const installationId = Constants.installationId || 'unknown';
      const sessionId = Constants.sessionId || 'unknown';
      const timestamp = Date.now();
      
      // Create a composite unique ID using multiple Expo constants
      storedId = `${Platform.OS}_${expoDeviceId}_${installationId}_${sessionId}_${timestamp}`;
      
      await SecureStore.setItemAsync('device_id', storedId);
      console.log("📱 Generated new device ID:", storedId);
    } else {
      console.log("📱 Retrieved existing device ID:", storedId);
    }

    return storedId;
  } catch (error) {
    console.log("❌ Device ID Error:", error);
    // Fallback to a combination of platform and timestamp with random component
    const fallbackId = `fallback_${Platform.OS}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log("📱 Using fallback device ID:", fallbackId);
    return fallbackId;
  }
};