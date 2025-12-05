import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = 'https://api.flexfence.app'; // or use http://192.168.X.X:3000 for local dev

// --- Types ---
type RegisterData = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  imei: string;
};

type UpdateProfileData = {
  first_name?: string;
  last_name?: string;
  avatar?: string | null; // optional avatar URL
  // add any other fields you want to allow updating
};

type LoginData = {
  email: string;
  password: string;
};

// --- Axios instance ---
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Register ---
export const registerUser = async (data: RegisterData) => {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (error: any) {
    console.error('Axios Register Error:', error.message);
    if (error.response) {
      // Server responded with a status code outside 2xx
      console.error('Status:', error.response.status, 'Data:', error.response.data);
      throw new Error(error.response.data?.message || 'Registration failed');
    } else if (error.request) {
      // Request was made but no response received
      console.error('Request made but no response received', error.request);
      throw new Error('No response from server. Check network or server status.');
    } else {
      // Something else happened
      console.error('Axios error', error.message);
      throw new Error(error.message || 'Network error');
    }
  }
};

// --- Login ---
export const loginUser = async (data: LoginData) => {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error: any) {
    console.error('Axios Login Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status, 'Data:', error.response.data);
      throw new Error(error.response.data?.message || 'Login failed');
    } else if (error.request) {
      console.error('Request made but no response received', error.request);
      throw new Error('No response from server. Check network or server status.');
    } else {
      console.error('Axios error', error.message);
      throw new Error(error.message || 'Network error');
    }
  }
};



export const getProfile = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await api.get('/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("❌ Get Profile Error:", error.message);

    if (error.response) {
      console.error('Status:', error.response.status, 'Data:', error.response.data);
      throw new Error(error.response.data?.message || "Failed to fetch profile");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "Network error");
    }
  }
};

export const updateProfile = async (data: UpdateProfileData) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await api.patch('/user/update-profile', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log("✅ Update Profile Response Body:", response.data); // <--- log server response

    return response.data;
  } catch (error: any) {
    console.error("❌ Update Profile Error:", error.message);

    if (error.response) {
      console.error('Status:', error.response.status, 'Data:', error.response.data);
      throw new Error(error.response.data?.message || "Failed to update profile");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "Network error");
    }
  }
};
