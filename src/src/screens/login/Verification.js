import React, { useState, useEffect } from 'react'
import { View, Text, Button, Alert } from 'react-native'
import OTPTextView from 'react-native-otp-textinput'
import STRINGS from '../../constants/strings'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'

import { BASE_URL } from '@env'

const Verification = (nav) => {
    const navigation = useNavigation()
    const route = useRoute()

    const [verificationCode, setVerificationCode] = useState('')
    const [enteredCode, setEnteredCode] = useState('')

    const [data, setData] = useState(route.params.data)

    useEffect(() => {
        generateAndSendCode()
    }, [data])

    const generateAndSendCode = () => {
        setVerificationCode('')
        const code = generateRandomCode()
        setVerificationCode(code)
    }

    useEffect(() => {
        if (verificationCode !== '') {
            sendCodeToBackend(verificationCode)
        }
    }, [verificationCode])

    const generateRandomCode = () => {
        const code = Math.floor(100000 + Math.random() * 900000).toString()
        return code
    }

    const sendCodeToBackend = (code) => {
        // send code to backend
        axios({
            method: 'POST',
            url: `${BASE_URL}/user/sendEmail`,
            data: {
                verificationCode: code,
                email: data.email,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log('Cannot send the verification:', err)
            })
    }

    const handleVerification = () => {
        // handle logic
        if (enteredCode.trim() === '') {
            Alert.alert(STRINGS.enterCode)
            return
        }
        if (enteredCode.length !== 6) {
            Alert.alert(STRINGS.enterCode)
            return
        }
        if (enteredCode === verificationCode) {
            console.log('verified')
            Alert.alert(STRINGS.verificationSuccess)

            axios({
                method: 'POST',
                url: `${BASE_URL}/user/create`,
                data: route.params.data,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    // Alert.alert('Registered Successful')
                    // avoid going back to registration screen
                    navigation.reset({
                        index: 0,
                        routes: [{ name: STRINGS.loginscreen }],
                    })
                })
                .catch((err) => {
                    console.log('Error', err)
                    const error = err.response.data
                    Alert.alert(error)
                })
        } else {
            Alert.alert(STRINGS.verificationFailed)
        }
        // console.log('Verification Code:', verificationCode);
    }

    const handleResendCode = () => {
        generateAndSendCode()
        setEnteredCode('')
        Alert.alert(STRINGS.newCodeResent)
    }

    const handleCancel = () => {
        // transition back to previous screen
        navigation.goBack()
    }

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="mb-5 text-lg font-bold">{STRINGS.sentCode}</Text>
            <Text className="mt-1 text-base text-orchid-900">
                {STRINGS.enterCode}
            </Text>
            <OTPTextView
                handleTextChange={(code) => setEnteredCode(code)}
                containerStyle={{ marginBottom: 20 }}
                textInputStyle={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 5,
                }}
                inputCount={6}
                keyboardType="numeric"
            />
            <Button
                title={STRINGS.verify}
                onPress={() => handleVerification()}
                color="green"
            />
            <Button
                title={STRINGS.notReceivedCode}
                onPress={() => handleResendCode()}
            />
            <Button
                title={STRINGS.cancel}
                onPress={() => handleCancel()}
                color="red"
            />
        </View>
    )
}

export default Verification
