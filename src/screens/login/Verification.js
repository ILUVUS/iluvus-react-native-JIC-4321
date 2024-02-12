import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import STRINGS from '../../constants/strings';
import axios from 'axios';

const Verification = () => {
    const [verificationCode, setVerificationCode] = useState('');

    useEffect(() => {  
        generateAndSendCode();
    }, []);

    const generateRandomCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const generateAndSendCode = () => {
        const code = generateRandomCode();
        setVerificationCode(code);
        sendCodeToBackend(code);
    };

    const sendCodeToBackend = (code) => {
        // axios
    };

    const handleVerification = (enteredCode) => {
        // handle logic
        if (enteredCode == verificationCode) {
            Alert.alert('Verification successful');
        } else {
            Alert.alert('Verification failed');
        }
        // console.log('Verification Code:', verificationCode);
    };

    const handleResendCode = () => {
        generateAndSendCode();
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text className="mt-1 text-base text-orchid-900">
            {STRINGS.enterCode}
        </Text>     
        <OTPTextView
            handleTextChange={code => setVerificationCode(code)}
            containerStyle={{ marginBottom: 20 }}
            textInputStyle={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
            inputCount={6}
            keyboardType="numeric"
        />
        <Button title="Verify" onPress={handleVerification} />
        <Button title="Didn't get a verification code?" onPress={handleResendCode} />
        </View>
    );
};

export default Verification;