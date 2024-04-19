// ProfileScreen.js

import React from 'react';
import { View, Text, Button, AsyncStorage, Alert } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      // Remove token from AsyncStorage
      await AsyncStorage.removeItem('token');
      // Navigate to login screen
      navigation.replace('Login');
    } catch (error) {
      console.error('Error:', error);
      // Handle error
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  return (
    <View>
      <Text>Profile Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;
