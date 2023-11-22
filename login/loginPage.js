// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import loginImage from '../images/loginImage.png';
const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const handleSignin = () => {
    // Here, you can add your authentication logic
    // For simplicity, we'll just navigate to a home screen if the fields are not empty
    if (username !== '' && password !== '') {
      navigation.navigate('Home');
    } else {
      // Show an error or alert for empty fields
      alert('Please enter username and password');
    }
  };

  const handleRegistration = () => {
    navigation.navigate('Registration');
  };

  return (
    <View style={styles.container}>
      <Image source={loginImage} style={styles.image} />
      <Text style={[styles.title, { color: 'blue' }]}>ILUVUS</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignin}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegistration}>
        <Text style={styles.forgotPassword}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignin}>
        <Text style={styles.forgotPassword}>Forgot Password</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  button: {
    width: 92,
    height: 50,
    backgroundColor: '#FFE79B', // Set button background color here
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 80,
  },
  forgotPassword: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  title: {
    
    fontSize: 30,
    marginBottom: 105,
  },
  input: {
    width: 300,
    height: 44,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 10,
    fontSize: 15,
    backgroundColor: '#F4EAFF',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
});

export default LoginScreen;
