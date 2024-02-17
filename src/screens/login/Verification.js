import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import STRINGS from '../../constants/strings';
import axios from 'axios';

const Verification = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [enteredCode, setEnteredCode] = useState('');

    useEffect(() => {  
        generateAndSendCode();
    }, []);

    const generateAndSendCode = () => {
        const code = generateRandomCode();
        setVerificationCode(code);
        sendCodeToBackend(code);
    };

    const generateRandomCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const sendCodeToBackend = (code) => {
        // axios
    };

    const handleVerification = () => {
        // handle logic
        if (enteredCode.trim() === '') {
            Alert.alert('Please enter the verification code.');
            return;
        }
        if (enteredCode.length !== 6) {
            Alert.alert('Please enter the entire verification code.');
            return;
        }
        if (enteredCode === verificationCode) {
            Alert.alert('Verification Successful');
        } else {
            Alert.alert('Verification Failed');
        }
        // console.log('Verification Code:', verificationCode);
    };

    const handleResendCode = () => {
        generateAndSendCode();
        setEnteredCode('');
        Alert.alert('New Verification Code Sent');
    };

    const handleCancel = () => {
        // transition back to previous screen
        Alert.alert('Verification Cancelled');
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, marginBottom: 20, fontWeight: 'bold'}}>
            We have sent you a verification code.
        </Text>
        <Text className="mt-1 text-base text-orchid-900">
            {STRINGS.enterCode}
        </Text>     
        <OTPTextView
            handleTextChange={code => setEnteredCode(code)}
            containerStyle={{ marginBottom: 20 }}
            textInputStyle={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
            inputCount={6}
            keyboardType="numeric"
        />
        <Button title="Verify" onPress={handleVerification} color = "green"/>
        <Button title="Didn't get a verification code?" onPress={handleResendCode} />
        <Button title="Cancel" onPress={handleCancel} color = "red"/>
        </View>
    );
};

export default Verification;