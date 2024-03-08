import React from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import STRINGS from '../../constants/strings'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserTag } from '@fortawesome/free-solid-svg-icons'
import COLORS from '../../constants/colors'
import Notitem from './Notitem'

const Notification = () => {
    const [userId, setUserId] = useState('Thuan')
    const [notifications, setNotifications] = useState([
        'A tagged you in a post',
        'B tagged you in a post',
        'C tagged you in a post',
        'D tagged you in a post',
        'E tagged you in a post',
        'F tagged you in a post',
        'G tagged you in a post',
        'H tagged you in a post',
        'I tagged you in a post',
        'J tagged you in a post',
        'K tagged you in a post',
        'L tagged you in a post',
        'M tagged you in a post',
        'N tagged you in a post',
        'O tagged you in a post',
        'P tagged you in a post',
    ])

    return (
        <View className="w-screenflex-1 flex h-screen bg-white">
            <View className="h-full w-full">
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom: 250,
                        flexGrow: 1,
                    }}
                    className="overflow-ao h-full w-full space-y-3 bg-transparent p-5"
                >
                    {notifications.map((value, index) => (
                        <View className="flex h-fit w-full flex-row items-start justify-start rounded-3xl bg-orchid-100 p-5 shadow-sm shadow-slate-300">
                            <Notitem key={index} text={value} />
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}

export default Notification
