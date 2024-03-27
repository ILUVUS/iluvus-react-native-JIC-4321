// Import package and project components
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PostItem from '../community/components/PostItem'
import {
    View,
    Text,
    ScrollView,
    RefreshControl,
} from 'react-native'

const Home = (nav) => {
    const [postData, setPostData] = useState([{}])
    const [userId, setUserId] = useState('')
    const [refreshing, setRefreshing] = React.useState(false)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        getPosts()
        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }, [])

    const findUserId = async () => {
        try {
            const value = await AsyncStorage.getItem('userId')
            if (value !== null) {
                setUserId(value)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getPosts()
        findUserId()

        console.log(userId)
    }, [])

    const getPosts = async () => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/post/getPostForHomePage?userId=${userId}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                // reverse the array to show the latest post first
                setPostData(res.data.reverse())
            })
            .catch((err) => {
                console.log('Cannot get posts', err)
            })
    }

    return (
        <>
            <View className="h-screen w-screen flex-1 bg-white">
                
                {postData.length > 0  ? (
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
                            {postData.map((post, index) => {
                                return (
                                    <PostItem
                                        key={index}
                                        post={post}
                                        userId={userId}
                                    />
                                )
                            })}
                        </ScrollView>
                    </View>
                ) : (
                    <View className="flex h-full w-full items-center justify-center">
                        <Text className="text-orchid-900">Make First Post</Text>
                    </View>
                )}
            </View>
        </>
    )
}
export default Home
