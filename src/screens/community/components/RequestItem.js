import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import COLORS from '../../../constants/colors'
import { SlideOutDown } from 'react-native-reanimated'

const RequestItem = ({ requestData }) => {
    const accept = () => {
        // handle accept request button
    }
    const decline = () => {
        // handle decline request button
    }

    return (
        <View className="flex w-full flex-col flex-wrap items-start justify-stretch rounded-3xl bg-slate-100 p-3 shadow-slate-300 ">
            <View className="w-full flex flex-row justify-between items-start pl-2 shadow">
                <Text className="text-base text-orchid-900 shadow-md shadow-slate-400">
                    {requestData.name}
                </Text>
                <Text className="text-xs text-orchid-900 shadow-md shadow-slate-400">
                    {requestData.dateTime}
                </Text>
            </View>
            <View className="w-full flex-row justify-end space-x-2">
                <TouchableOpacity
                    onPress={accept()}
                    className="flex h-fit w-fit flex-row flex-wrap items-center justify-center rounded-full bg-gold-900 px-3 py-2 "
                >
                    <Text className="text-md text-orchid-900">Accept</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={decline()}
                    className="flex h-fit w-fit flex-row flex-wrap items-center justify-center rounded-full bg-gray-200 px-3 py-2 "
                >
                    <Text className="text-md text-orchid-900">Decline</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default RequestItem
