import React from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import STRINGS from '../../constants/strings'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserTag } from '@fortawesome/free-solid-svg-icons'
import COLORS from '../../constants/colors'

const NotitemCaseMsg = ({ data }) => {
    switch (data.type) {
        case 'tag':
            return `${data.userFullName} tagged you in a post in ${data.communityName}`
        case 'report':
            return `${data.userFullName} reported your post in ${data.communityName}`
        case 'like':
            return `${data.userFullName} liked your post in ${data.communityName}`
        case 'comment':
            return `${data.userFullName} commented on your post in ${data.communityName}`
    }
}

const Notitem = ({ data }) => {
    return (
        <View className="mr-14 flex flex-row items-start justify-start space-x-4">
            <FontAwesomeIcon
                icon={faUserTag}
                color={COLORS.orchid[700]}
                size={30}
            />
            <View className="flex flex-col">
                <Text className="mb-2 text-xs text-orchid-700">
                    {data.dateTime}
                </Text>
                <Text
                    className="items-start justify-start text-orchid-900 shadow"
                    numberOfLines={2}
                >
                    <NotitemCaseMsg data={data} />
                </Text>
            </View>
        </View>
    )
}
export default Notitem
