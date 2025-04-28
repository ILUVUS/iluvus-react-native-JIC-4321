import React, { useEffect } from 'react'
import {View, Text, ScrollView, RefreshControl, TouchableOpacity} from 'react-native'
import { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'
import { BASE_URL } from '@env'
import ReportItem from './components/ReportItem'

const ReportUsersView = ({ nav }) => {
    const [reportPosts, setReportPosts] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [users, setUsers] = useState([{ id: 1, username: 'grand_smith' }]);

    const [communityId, setCommunityId] = useState(
        useRoute().params.communityId
    )
    const [moderatorId, setModeratorId] = useState(
        useRoute().params.moderatorId
    )

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        getReportPosts()
        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }, [])

    useEffect(() => {
        getReportPosts()
    }, [])

    const handleUnreport = (id) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    };

    const getReportPosts = async () => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/post/getReportedPosts?communityId=${communityId}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setReportPosts(res.data.reverse())
            })
            .catch((err) => {
                console.log('Cannot get posts', err)
            })
    }


    return (
        <>
            <View className="h-screen w-screen flex-1 bg-white">
                {users.length > 0 ? (
                    users.map((user) => (
                        <View
                            key={user.id}
                            className="flex-row items-center justify-between bg-gray-100 p-4 rounded-lg mb-4"
                        >
                            <Text className="text-lg font-semibold">{user.username}</Text>
                            <TouchableOpacity
                                className="bg-red-500 px-4 py-2 rounded-md"
                                onPress={() => handleUnreport(user.id)}
                            >
                                <Text className="text-white">Unreport</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <View className="flex h-full w-full items-center justify-start p-5">
                        <Text>No reported users.</Text>
                    </View>
                )}
            </View>
        </>
    )
}

export default ReportUsersView
