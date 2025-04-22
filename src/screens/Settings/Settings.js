import { TouchableOpacity, View, Text, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import STRINGS from '../../constants/strings'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { BASE_URL } from '@env'
import appIcon from '../../../assets/icon.png'

const Settings = () => {
    const [userId, setUserId] = useState('')

    const [userInfo, setUserInfo] = useState({})

    const navigation = useNavigation()

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
    }, [])

    useEffect(() => {
        // console.log(userId)
        axios({
            method: 'GET',
            url: `${BASE_URL}/user/get?userId=${userId}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                // console.log(res.data)
                setUserInfo(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [userId])

    return (
        <View className="flex h-full w-full flex-col items-center bg-white p-2">
            <View className="gap-5 p-4">
                <Image source={appIcon} className="h-28 w-28" />
                <TouchableOpacity
                    className="w-fit items-center justify-center rounded-3xl bg-gold-900 px-5 py-4 shadow-md shadow-slate-200"
                    onPress={handleLogout}
                >
                    <Text className="text-sm text-orchid-900">Logout</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                className="w-fit items-center justify-center rounded-3xl bg-red-600 px-5 py-4 shadow-md shadow-slate-200"
                onPress={() => {
                    if (!userId) return
                    navigation.navigate('Blocked Users', { userId })
                }}
            >
                <Text className="text-sm text-white font-semibold">View Blocked Users</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Settings
