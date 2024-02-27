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
    return (
        <View className="flex h-screen w-screen flex-1 bg-white">
            <View className="h-full w-full">
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom: 120,
                        flexGrow: 1,
                    }}
                    className="h-full w-full overflow-auto bg-white p-5"
                >
                    <Notitem
                        userId ={userId}
                    />
                </ScrollView>
            </View>
        </View>
    )
}

export default Notification
