import React, { useEffect } from 'react'
import { View, Text, ScrollView, RefreshControl } from 'react-native'
import { useState } from 'react'
import STRINGS from '../../constants/strings'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserTag } from '@fortawesome/free-solid-svg-icons'
import COLORS from '../../constants/colors'
import Notitem from './Notitem'
import axios from 'axios'
import { BASE_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Notification = () => {
    const [userId, setUserId] = useState('')
    const [notifications, setNotifications] = useState([])

    const [refreshing, setRefreshing] = React.useState(false)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        setUserIdFromStorage()
        // getNotifications()
        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }, [])
    const getNotifications = async () => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/user/getNotificationByUserId?userId=${userId}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                // console.log(res.data)
                setNotifications(res.data.reverse())
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const setUserIdFromStorage = async () => {
        setUserId('')
        await AsyncStorage.getItem('userId').then((value) => {
            setUserId(value)
        })
    }

    useEffect(() => {
        setUserIdFromStorage()
    }, [])

    useEffect(() => {
        if (userId !== '') {
            getNotifications()
        }
    }, [userId])

    return (
        <View className="w-screenflex-1 flex h-screen bg-white">
            <View className="h-full w-full">
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom: 250,
                        flexGrow: 1,
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    className="overflow-ao h-full w-full space-y-3 bg-transparent p-5"
                >
                    {notifications.length > 0 &&
                        notifications.map((data, index) => (
                            <View>
                                <Notitem key={index} data={data} />
                            </View>
                        ))}

                    {notifications.length <= 0 && (
                        <View className="flex h-full w-full items-center justify-start p-5">
                            <Text>You don't have any notifications.</Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        </View>
    )
}

export default Notification
