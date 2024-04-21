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
    KeyboardAvoidingView,
    ActivityIndicator,
} from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import Constants from 'expo-constants'

const Home = (nav) => {
    const [postData, setPostData] = useState([])
    const [userId, setUserId] = useState('')
    const [refreshing, setRefreshing] = React.useState(false)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        findUserId()
        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }, [])

    const findUserId = async () => {
        setUserId('')
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
        findUserId()
    }, [])

    useEffect(() => {
        if (userId !== '') {
            getPosts()
        }
    }, [userId])

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
                setPostData([])
                console.log('Cannot get posts', err)
            })
    }

    return (
        <>
            <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1 }}
                keyboardVerticalOffset={useHeaderHeight()}
            >
                <View className="h-screen w-screen flex-1 bg-white">
                    <View className="h-full w-full">
                        <ScrollView
                            contentContainerStyle={{
                                paddingBottom: Constants.statusBarHeight,
                                minHeight: '100%',
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
                            {postData.length > 0 ? (
                                postData.map((post, index) => {
                                    return (
                                        <PostItem
                                            key={index}
                                            post={post}
                                            userId={userId}
                                            displayCommunityName={true}
                                        />
                                    )
                                })
                            ) : (
                                <View className="flex h-full w-full items-center justify-center gap-2">
                                    <ActivityIndicator />
                                    <Text className="text-center text-orchid-900">
                                        No post available.
                                    </Text>
                                    <Text className="text-center text-orchid-900">
                                        Please select Interests in Profile tab,
                                        and follow communities to view posts.
                                    </Text>
                                </View>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}
export default Home
