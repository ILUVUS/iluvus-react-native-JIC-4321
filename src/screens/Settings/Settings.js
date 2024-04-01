import { TouchableOpacity, View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import STRINGS from '../../constants/strings'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { BASE_URL } from '@env'
import { useIsFocused } from '@react-navigation/native'



const Settings = () => {
    const [userId, setUserId] = useState('')

    const [userInfo, setUserInfo] = useState({})

    const navigation = useNavigation()
    const isFocused = useIsFocused()

    const handleLogout = () => {
        removeUserId()
    }

    const removeUserId = async () => {
        try {
            const value = await AsyncStorage.getItem('userId')
            if (value !== null) {
                await AsyncStorage.removeItem('userId')
            }
        } catch (e) {
            console.log(e)
        } finally {
            navigation.reset({
                index: 0,
                routes: [{ name: STRINGS.loginscreen }],
            })
        }
    }

    useEffect(() => {
        const findUserInfoById = async () => {
            try {
                const value = await AsyncStorage.getItem('userId')
                if (value !== null) {
                    setUserId(value)
                }
            } catch (e) {
                console.log(e)
            }
        }
        findUserInfoById()
    }, [isFocused])

    useEffect(() => {
        console.log(userId)
        axios({
            method: 'GET',
            url: `${BASE_URL}/user/get?userId=${userId}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                console.log(res.data)
                setUserInfo(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [userId, isFocused])

    return (
        <View className="flex h-screen w-screen items-center bg-white p-2">
            <View className="flex flex-col">
                <Text>{userInfo.fname}</Text>
                <Text>{userInfo.lname}</Text>
                <Text>{userInfo.username}</Text>
                <Text>{userInfo.email}</Text>
                <Text>{userId}</Text>
            </View>
            <TouchableOpacity
                className="inline-block w-fit items-center justify-center rounded-3xl bg-gold-900 px-5 py-4 shadow-md shadow-slate-200"
                onPress={handleLogout}
            >
                <Text className="text-sm text-orchid-900">Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Settings
