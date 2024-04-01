import React, { useEffect } from 'react'
import { View, Text, ScrollView, RefreshControl } from 'react-native'
import { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'
import { BASE_URL } from '@env'
import ReportItem from './components/ReportItem'

const ReportView = ({ nav }) => {
    const [reportPosts, setReportPosts] = useState([])
    const [refreshing, setRefreshing] = useState(false)
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

    const getReportPosts = async () => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/post/getPostsByCommunityID?id=${communityId}`,
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
                {reportPosts.length > 0 &&
                Object.keys(reportPosts[0]).length > 0 ? (
                    <View className="h-full w-full">
                        <ScrollView
                            contentContainerStyle={{
                                paddingBottom: 120,
                                flexGrow: 1,
                            }}
                            className="h-full w-full overflow-auto bg-white p-5"
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                        >
                            {reportPosts.map((post, index) => (
                                <View key={index}>
                                    <ReportItem
                                        post={post}
                                        userId={moderatorId}
                                        onChange={getReportPosts}
                                    />
                                </View>
                            ))
                            }
                        </ScrollView>
                    </View>
                ) : (
                    <View className="flex h-full w-full items-center justify-start p-5">
                        <Text>No reports available.</Text>
                    </View>
                )}
            </View>
        </>
    )
}

export default ReportView
