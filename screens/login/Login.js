// LoginScreen.js
import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '@env'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
    View,
    KeyboardAvoidingView,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Platform,
    Keyboard,
} from 'react-native'
import {
    loginStyle as styles,
    inputStyle,
    buttonStyle,
    textStyle,
} from '../../styles/style'

import { useNavigation } from '@react-navigation/native'
import loginImage from '../../assets/images/loginImage.png'

import strings from '../../constants/strings'
import color from '../../constants/colors'

const LoginScreen = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()

    const handleSignin = async () => {
        console.log(username, password)
        axios({
            method: 'POST',
            url: `${BASE_URL}/user/login`,
            data: {
                username: String(username),
                password: String(password),
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(async (res) => {
                // Alert.alert("Successful", res.data);
                console.log(res.data)
                try {
                    await AsyncStorage.setItem('userId', res.data)
                } catch (e) {
                    // saving error
                }

                const value = await AsyncStorage.getItem('userId')
                console.log(value)

                setUsername('')
                setPassword('')

                navigation.navigate('Home')
            })
            .catch((err) =>
                Alert.alert('Unsuccessful', 'Wrong Username or Password')
            )
    }

    const handleRegistration = () => {
        navigation.navigate(strings.register)
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <View
                className="flex h-screen items-center justify-center bg-white p-10"
                onTouchStart={Keyboard.dismiss}
            >
                <Image source={loginImage} style={styles.image} />
                <Text
                    style={[
                        styles.title,
                        textStyle.titleColor,
                        textStyle.shadow,
                    ]}
                >
                    {strings.appName}
                </Text>

                <TextInput
                    className="mb-5 w-10/12 rounded-2xl border-0 border-transparent bg-violet-100 px-5 py-3 text-base text-violet-900 shadow-md shadow-gray-300"
                    placeholderTextColor={color.lightDarkviolet}
                    placeholder={strings.usernameExample}
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                    className="mb-5 w-10/12 rounded-2xl border-0 border-transparent bg-violet-100 px-5 py-3 text-base text-violet-900 shadow-md shadow-gray-300"
                    placeholderTextColor={color.lightDarkviolet}
                    placeholder={strings.passwordExample}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity
                    style={[styles.button, buttonStyle.buttonShadow]}
                    onPress={handleSignin}
                >
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleRegistration}>
                    <Text
                        style={[styles.createAccountButton, textStyle.shadow]}
                    >
                        {strings.createAnAccount}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignin}>
                    <Text
                        style={[styles.forgotPasswordButton, textStyle.shadow]}
                    >
                        {strings.forgotPassword}
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen
