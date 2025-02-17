import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '@env';
import CustomKeyboardAvoidingView from '../../components/CustomKeyboardAvoidingView';
import STRINGS from '../../constants/strings';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    console.log("Forgot password pressed with email:", email);
    try {
      const response = await axios.post(`${BASE_URL}/user/forgotPassword`, { email });
      console.log("Response from forgotPassword:", response.data);
      Alert.alert('Success', 'Password reset link sent! Check your email.');
    } catch (error) {
      console.log("Error in forgotPassword:", error);
      Alert.alert('Error', 'Cannot send the verification: ' + error.message);
    }
  };

  return (
    <CustomKeyboardAvoidingView>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start', // start at the top rather than center
          paddingTop: 50, // adjust this value to move things up or down
          backgroundColor: 'white',
          paddingHorizontal: 16,
        }}
        onTouchStart={Keyboard.dismiss}
      >
        <Text style={{ fontSize: 24, marginBottom: 16 }}>{STRINGS.forgotPassword}</Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 8,
            borderRadius: 8,
            marginBottom: 16,
          }}
        />
        <TouchableOpacity
          onPress={handleForgotPassword}
          style={{
            backgroundColor: '#DAA520', // gold-like color
            padding: 16,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: 'white' }}>Send Reset Link</Text>
        </TouchableOpacity>
      </View>
    </CustomKeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
