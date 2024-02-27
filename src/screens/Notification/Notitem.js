import React from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import STRINGS from '../../constants/strings'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserTag } from '@fortawesome/free-solid-svg-icons'
import COLORS from '../../constants/colors'

const Notitem = ({userId}) => {
    return (
        <View className=" flex h-fit w-full flex-row items-start justify-start rounded-3xl bg-orchid-100 p-5 shadow-md shadow-slate-300">
            <FontAwesomeIcon
                icon={faUserTag}
                color={COLORS.orchid[700]}
                size={30}
            />
            <Text className="items-start justify-start pl-5 text-orchid-900 shadow">
                {userId}
                <Text>{STRINGS.isTagged}</Text>
            </Text>
        </View>
    )
}
export default Notitem
