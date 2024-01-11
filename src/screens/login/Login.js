// LoginScreen.js
import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '@env'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoginInput } from '../../components/input'

import CustomKeyboardAvoidingView from '../../components/CustomKeyboardAvoidingView'

import { View, Text, Image, TouchableOpacity, Keyboard } from 'react-native'
import { loginStyle as styles, textStyle } from '../../../styles/style'

import { useNavigation } from '@react-navigation/native'
import loginImage from '../../../assets/images/loginImage.png'

import STRINGS from '../../constants/strings'
import COLORS from '../../constants/colors'

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
        navigation.navigate(STRINGS.register)
    }

    return (
        <CustomKeyboardAvoidingView>
            <View
                className="flex h-screen items-center justify-center bg-white p-10"
                onTouchStart={Keyboard.dismiss}
            >
                <Image source={loginImage} style={styles.image} />
                <Text
                    className="mb-32 text-3xl text-orchid-900"
                    style={[textStyle.shadow]}
                >
                    {STRINGS.appName}
                </Text>

                <LoginInput
                    placeholderTextColor={COLORS['orchid'][300]}
                    placeholder={STRINGS.usernameExample}
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <LoginInput
                    placeholderTextColor={COLORS['orchid'][300]}
                    placeholder={STRINGS.passwordExample}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity
                    className="mb-32 mt-5 flex items-center justify-center rounded-3xl bg-gold-900 px-5 py-4 align-middle shadow-md shadow-slate-200"
                    onPress={handleSignin}
                >
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleRegistration}>
                    <Text
                        className="mb-1 justify-center align-middle text-base text-orchid-900"
                        style={[textStyle.shadow]}
                    >
                        {STRINGS.createAnAccount}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignin}>
                    <Text
                        className="mb-1 justify-center align-middle text-sm text-orchid-800"
                        style={[textStyle.shadow]}
                    >
                        {STRINGS.forgotPassword}
                    </Text>
                </TouchableOpacity>
            </View>
        </CustomKeyboardAvoidingView>
    )
}

export default LoginScreen
