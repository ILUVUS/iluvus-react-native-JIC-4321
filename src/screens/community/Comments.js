import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

const Comment = ({ authorName, text }) => {
    return (
        <View className="h-col mb-3 h-fit w-full rounded-l-full rounded-tr-full bg-slate-200 px-6 py-2 shadow-sm">
            <Text className="font-bold text-orchid-900">{authorName}</Text>
            <Text>{text}</Text>
        </View>
    )
}

export default Comment
