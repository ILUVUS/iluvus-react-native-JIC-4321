import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import STRINGS from '../../constants/strings'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserTag } from '@fortawesome/free-solid-svg-icons'
import {
    faTag,
    faFlag,
    faStar,
    faComment,
    faCircleInfo,
} from '@fortawesome/free-solid-svg-icons'
import COLORS from '../../constants/colors'
import axios from 'axios'
import {displayDatetime} from '../../utils/Utils'

const NotItemIdentify = ({ data }) => {
    let msg = ''
    let tag = faTag
    let bgColor = 'bg-orchid-100'

    // Object.keys(data).map((key) => {
    switch (data.type) {
        case 'TAG':
            msg = data.message
            tag = faTag
            bgColor = 'bg-orchid-100'
            break

        case 'REPORT':
            msg = data.message
            tag = faFlag
            bgColor = 'bg-red-100'
            break

        case 'UPLIFT':
            msg = data.message
            tag = faStar
            bgColor = 'bg-gold-500'
            break

        case 'COMMENT':
            msg = data.message
            tag = faComment
            bgColor = 'bg-blue-100'
            break

        default:
            msg = data.message
            tag = faCircleInfo
            bgColor = 'bg-gray-100'
            break
    }

    return { msg, tag, bgColor }
}

const Notitem = ({ data }) => {
    const comp = NotItemIdentify({ data })

    return (
        <View
            className={`flex h-fit w-full flex-row items-start justify-start space-x-4 rounded-3xl px-5 py-4 shadow-sm shadow-slate-300 ${comp.bgColor}`}
        >
            <View>
                <FontAwesomeIcon
                    icon={comp.tag}
                    color={COLORS.orchid[700]}
                    size={30}
                />
            </View>
            <View className="mr-5 flex flex-col">
                <Text className="mb-2 text-xs text-orchid-700">
                    {displayDatetime(data.datetime)}
                </Text>
                <Text
                    className="items-start justify-start text-orchid-900 shadow"
                    numberOfLines={2}
                >
                    {comp.msg}
                </Text>
            </View>
        </View>
    )
}
export default Notitem
