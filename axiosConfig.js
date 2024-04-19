import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: 'http://192.168.100.33:8000/api',
  timeout: 10000, // Timeout in milliseconds (adjust as needed)
  headers: {
    "Content-Type": "application/json", // Set default headers (optional)
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  async config => {
    // Do something before sending the request, such as adding headers
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    // Do something with the response data
    return response;
  },
  error => {
    // Handle response error
    if (error.code === 'ECONNABORTED') {
      // Request timeout
      Alert.alert('Timeout', 'The request took too long to complete. Please try again.');
    } else if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      const status = error.response.status;
      if (status === 401) {
        // Unauthorized error, redirect to login
        await logout();
        AsyncStorage.removeItem('token'); // Remove token
        Alert.alert('Unauthorized', 'Please login again.');
        // Navigate to login screen
        // navigation.replace('Login');
      } else if (status >= 500) {
        // Server error
        Alert.alert('Server Error', 'Something went wrong on the server.');
      } else {
        // Other errors
        Alert.alert('Error', 'An error occurred. Please try again later.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      Alert.alert('Network Error', 'Please check your internet connection.');
    } else {
      // Other errors
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
    return Promise.reject(error);
  }
);

export default instance;
