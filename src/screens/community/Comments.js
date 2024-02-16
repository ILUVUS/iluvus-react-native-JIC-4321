import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

const Comment = ({ authorName, text, dateTime }) => {
    return (
        <View className="h-col mb-3 h-fit w-full space-y-1 rounded-l-full rounded-tr-full bg-slate-200 px-6 py-2 shadow-sm">
            <View className="flex flex-row items-center space-x-2">
                <Text className="font-bold text-orchid-900">{authorName}</Text>
                <Text className="text-xs text-orchid-600">{dateTime}</Text>
            </View>
            <Text>{text}</Text>
        </View>
    )
}

export default Comment
