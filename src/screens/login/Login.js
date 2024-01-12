import React, { useState } from 'react'

import axios from 'axios'
import { BASE_URL } from '@env'
import { Alert } from 'react-native'
import { Image, Keyboard, Text, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import COLORS from '../../constants/colors'
import STRINGS from '../../constants/strings'
import { LoginInput } from '../../components/input'
import loginImage from '../../../assets/images/loginImage.png'
import CustomKeyboardAvoidingView from '../../components/CustomKeyboardAvoidingView'

const LoginScreen = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()

    const handleSignin = async () => {
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

                try {
                    await AsyncStorage.setItem('userId', res.data)
                } catch (e) {
                    // saving error
                }

                const value = await AsyncStorage.getItem('userId')

                setUsername('')
                setPassword('')

                navigation.navigate(STRINGS.homescreen)
            })
            .catch((err) =>
                Alert.alert('Unsuccessful', 'Wrong Username or Password')
            )
    }

    const handleRegistration = () => {
        navigation.navigate(STRINGS.registerscreen)
    }

    return (
        <CustomKeyboardAvoidingView>
            <View
                className="flex h-screen items-center justify-center bg-white px-[10%] py-10"
                onTouchStart={Keyboard.dismiss}
            >
                <Image
                    source={loginImage}
                    className="mb-2 h-1/4 w-auto"
                    resizeMode="contain"
                />
                <Text className="text-3xl text-orchid-900 shadow-md shadow-orchid-400">
                    {STRINGS.appName}
                </Text>

                <LoginInput
                    className="mt-32"
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
                    <Text className="text-orchid-900 text-sm" >Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleRegistration}>
                    <Text className="mb-1 justify-center align-middle text-base text-orchid-900 shadow-md shadow-slate-400">
                        {STRINGS.createAnAccount}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignin}>
                    <Text className="mb-1 justify-center align-middle text-sm text-orchid-800 shadow-md shadow-slate-400">
                        {STRINGS.forgotPassword}
                    </Text>
                </TouchableOpacity>
            </View>
        </CustomKeyboardAvoidingView>
    )
}

export default LoginScreen
