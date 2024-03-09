import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import STRINGS from '../../constants/strings'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserTag } from '@fortawesome/free-solid-svg-icons'
import COLORS from '../../constants/colors'
import Notitem from './Notitem'
import axios from 'axios'
import { BASE_URL } from '@env'

const Notification = () => {
    const [userId, setUserId] = useState('Thuan')
    const [notifications, setNotifications] = useState([
        {
            dateTime: '2021-10-10T00:00:00',
            type: 'tag',
            postId: '123',
            userId: 'A',
            communityId: '333',
            userFullName: 'User A',
            communityName: 'Community A',
        },
        {
            dateTime: '2021-10-10T00:00:00',
            type: 'report',
            postId: '123',
            userId: 'B',
            communityId: '311',
            userFullName: 'User X',
            communityName: 'Community A',
        },
        {
            dateTime: '2021-10-10T00:00:00',
            type: 'like',
            postId: '143',
            userId: 'C',
            communityId: '322',
            userFullName: 'User T',
            communityName: 'Community G',
        },
        {
            dateTime: '2021-10-10T00:00:00',
            type: 'comment',
            postId: '541',
            userId: 'D',
            communityId: '333',
            userFullName: 'User F',
            communityName: 'Community 22',
        },
    ])

    useEffect(() => {
        fetchNotifications()
    }, [])

    const fetchNotifications = () => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/user/${userId}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setNotifications(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <View className="w-screenflex-1 flex h-screen bg-white">
            {notifications.length > 0 && (
                <View className="h-full w-full">
                    <ScrollView
                        contentContainerStyle={{
                            paddingBottom: 250,
                            flexGrow: 1,
                        }}
                        className="overflow-ao h-full w-full space-y-3 bg-transparent p-5"
                    >
                        {notifications.map((data, index) => (
                            <View>
                                <Notitem key={index} data={data} />
                            </View>
                        ))}
                    </ScrollView>
                </View>
            )}

            {notifications.length <= 0 && (
                <View className="flex h-full w-full items-center justify-start p-5">
                    <Text>You don't have any notifications.</Text>
                </View>
            )}
        </View>
    )
}

export default Notification
