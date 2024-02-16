import React, { useEffect, useState } from 'react'
import { View, Text, } from 'react-native';

const Comment = ({authorName, text}) => {

    return (
        <View className ='flex-row items-center rounded-3xl'>
            <View className ='flex-row items-center rounded-l-full rounded-tr-full p-5 bg-purple-800 w-full'>
                <Text className = 'text-white  italic font-semibold w-1/5 '> {authorName}:</Text>
                <Text className = 'text-white  w-4/5 '> {text}</Text>
            </View>
        </View>
    );
};

export default Comment;
