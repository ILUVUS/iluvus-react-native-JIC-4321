import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import COLORS from '../../constants/colors'
import { SlideOutDown } from 'react-native-reanimated'

const RequestItem = ({ requestId }) => {
    const accept = () => {
        // handle accept request button
    }
    const decline = () => {
        // handle decline request button
    }
    
    return (
        <View className="flex w-full flex-wrap flex-row items-start justify-stretch rounded-3xl bg-white p-3 shadow-md shadow-slate-300 ">
            <View className="items-start justify-start shadow pl-2">
            <Text className=" text-orchid-900 shadow text-base">
                {requestId}
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
