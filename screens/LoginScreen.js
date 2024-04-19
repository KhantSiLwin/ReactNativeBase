// LoginScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, AsyncStorage } from 'react-native';
import axios from '../axiosConfig';
const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', {
        phone: phoneNumber,
        password: password,
      });

      if (response.data.success) {
        // Save token to AsyncStorage
        // await AsyncStorage.setItem('token', response.data.token);
        // Navigate to home screen
        navigation.replace('HomeTabs');
      } else {
        Alert.alert('Error', 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };
  return (
    <View>
      <Text>Phone Number</Text>
      <TextInput
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Text>Password</Text>
      <TextInput
        placeholder="Enter your password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
