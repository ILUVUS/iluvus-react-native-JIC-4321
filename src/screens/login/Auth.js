import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, Image } from 'react-native'
import { useEffect, useState } from 'react'

import STRINGS from '../../constants/strings'
import loginImage from '../../../assets/images/loginImage.png'

const AuthScreen = () => {
    const navigation = useNavigation()

    useEffect(() => {
        findUserId()
    }, [])

    const findUserId = async () => {
        const userId = await AsyncStorage.getItem('userId')
        if (userId != null) {
            navigation.reset({
                index: 0,
                routes: [{ name: STRINGS.homescreen }],
            })
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: STRINGS.loginscreen }],
            })
        }
    }

    return (
        <View className="flex h-screen w-screen items-center justify-center bg-white">
            <Image
                source={loginImage}
                className="h-1/4 w-auto"
                resizeMode="contain"
            />
        </View>
    )
}
export default AuthScreen
