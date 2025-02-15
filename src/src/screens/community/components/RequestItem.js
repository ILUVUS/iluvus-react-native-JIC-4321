import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BASE_URL } from '@env'

import { displayDatetime } from '../../../utils/Utils'
import axios from 'axios'

const RequestItem = ({ requestData, setRequests }) => {
    const accept = () => {
        // handle accept request button
        axios({
            method: 'POST',
            url: `${BASE_URL}/community/approveRequest`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                userId: requestData.id,
                communityId: requestData.communityId,
            },
        })
            .then((res) => {
                setRequests(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const decline = () => {
        // handle decline request button
        axios({
            method: 'POST',
            url: `${BASE_URL}/community/rejectRequest`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                userId: requestData.id,
                communityId: requestData.communityId,
            },
        })
            .then((res) => {
                setRequests(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <View className="flex w-full flex-col flex-wrap items-start justify-stretch rounded-3xl bg-slate-100 p-3 shadow-slate-300 ">
            <View className="flex w-full flex-row items-start justify-between px-2 shadow">
                <Text className="text-base text-orchid-900 shadow-md shadow-slate-400">
                    {requestData.lname}, {requestData.fname}
                </Text>
                <Text className="text-xs text-orchid-900 shadow-md shadow-slate-400">
                    {displayDatetime(requestData.requestDateTime)}
                </Text>
            </View>
            <View className="w-full flex-row justify-end space-x-2">
                <TouchableOpacity
                    onPress={() => accept()}
                    className="flex h-fit w-fit flex-row flex-wrap items-center justify-center rounded-full bg-gold-900 px-3 py-2 "
                >
                    <Text className="text-md text-orchid-900">Accept</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => decline()}
                    className="flex h-fit w-fit flex-row flex-wrap items-center justify-center rounded-full bg-gray-200 px-3 py-2 "
                >
                    <Text className="text-md text-orchid-900">Decline</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default RequestItem
