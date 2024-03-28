import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { useState, useEffect } from 'react'

import { BASE_URL } from '@env'
import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler'

import STRINGS from '../../../constants/strings'

export default TopicSelector = ({
    setModalVisibility,
    setPostModalVisibility,
    selectedTopic,
    setSelectedTopic,
}) => {
    const [topicList, setTopicList] = useState({})
    const [currentTopic, setCurrentTopic] = useState(selectedTopic)

    const getTopics = async (name) => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/interest/getByName?name=${name}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setTopicList(res.data)
            })
            .catch((err) => {
                console.log('Cannot get the interest list', err)
            })
    }

    useEffect(() => {
        getTopics('')
    }, [])

    useEffect(() => {
        // console.log('Topic List:', topicList)
    }, [topicList])

    return (
        <View className="mb-2 flex w-full flex-1">
            <View className="flex items-center">
                <Text className="mb-3 text-2xl font-bold text-orchid-900">
                    Select Post Topic
                </Text>
            </View>
            <TextInput
                className="mb-4 rounded-lg bg-orchid-100 px-6 py-4 shadow-sm"
                placeholder="Search for Topics"
                onChangeText={(text) => {
                    getTopics(text)
                }}
            />
            <ScrollView
                className="mb-3 flex-1 gap-2 pb-32"
                showsVerticalScrollIndicator={false}
            >
                {Object.keys(topicList).map((key) => {
                    return (
                        <TouchableOpacity
                            className={
                                'rounded-lg bg-orchid-100 px-6 py-4 shadow-sm' +
                                (currentTopic.id === key ? ' bg-gold-900' : '')
                            }
                            key={key}
                            onPress={() => {
                                setCurrentTopic({
                                    id: key,
                                    name: topicList[key],
                                })
                            }}
                        >
                            <Text className="text-sm text-orchid-900">
                                {topicList[key]}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            <View className="flex h-fit w-fit flex-row justify-center space-x-2 rounded-full">
                <TouchableOpacity
                    className="flex h-fit flex-1 items-center rounded-xl bg-red-300 px-8 py-2 shadow"
                    onPress={() => {
                        setPostModalVisibility(true)
                        setModalVisibility(false)
                    }}
                >
                    <Text className="align-middle text-base font-bold text-red-900">
                        {STRINGS.cancel}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex h-fit w-1/2 items-center rounded-xl bg-green-300 px-10 py-2 shadow"
                    onPress={() => {
                        setSelectedTopic(currentTopic)
                        setModalVisibility(false)
                        setPostModalVisibility(true)
                    }}
                >
                    <Text className="align-middle text-base font-bold text-green-900">
                        {STRINGS.save}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
