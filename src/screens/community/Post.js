// Import package and project components
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { BASE_URL } from '@env'

import AsyncStorage from '@react-native-async-storage/async-storage'

import Ionicons from 'react-native-vector-icons/Ionicons'

import Modal from 'react-native-modal'
import COLORS from '../../constants/colors'
import PostItem from './components/PostItem'
import { useRoute } from '@react-navigation/native'
import ImageView from 'react-native-image-viewing'

import TopicSelector from './components/TopicSelector'

import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
} from 'react-native'

import NewPost from './components/NewPost'

const Post = (nav) => {
    const [postContent, setPostContent] = useState('')

    const [postData, setPostData] = useState([{}])
    const [IsModalVisible, setIsModalVisible] = useState(false)

    const [userId, setUserId] = useState('')
    const [community_id, setCommunityId] = useState(
        useRoute().params.communityId
    )
    const [pickedImages, setPickedImages] = useState([])

    const [refreshing, setRefreshing] = React.useState(false)

    const [isJoined, setIsJoined] = useState(useRoute().params.communityId)

    const [openTopicSelector, setOpenTopicSelector] = useState(false)

    const [imageViewerVisible, setImageViewerVisible] = useState(false)

    const [selectedTopic, setSelectedTopic] = useState({})

    const [isNewData, setIsNewData] = useState(false)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        getPosts()
        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }, [])

    const [taggedUsers, setTaggedUsers] = useState([])

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
    }, [])

    useEffect(() => {
        if (isNewData) {
            console.log('new data')
            getPosts()
            setIsNewData(false)
        }
    }, [isNewData])

    const getPosts = async () => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/post/getPostsByCommunityID?id=${community_id}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setPostData(res.data.reverse())
            })
            .catch((err) => {
                console.log('Cannot get posts', err)
            })
    }

    const handleOpenPopup = () => {
        setIsModalVisible(true)
    }

    return (
        <>
            <View className="h-screen w-screen flex-1 bg-white">
                {postData.length > 0 && Object.keys(postData[0]).length > 0 ? (
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
                                        displayCommunityName={false}
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

                <View className="h-screen w-screen bg-black">
                    {/* image viewer */}

                    <ImageView
                        images={pickedImages.map((image) => {
                            return { uri: image.uri }
                        })}
                        imageIndex={0}
                        visible={imageViewerVisible}
                        onRequestClose={() => setImageViewerVisible(false)}
                        swipeToCloseEnabled={true}
                        doubleTapToZoomEnabled={true}
                    />

                    <Modal
                        visible={IsModalVisible && !imageViewerVisible}
                        transparent={false}
                        animationType="slide"
                        presentationStyle="pageSheet"
                    >
                        {openTopicSelector ? (
                            <TopicSelector
                                key={Math.random()}
                                openTopicSelector={openTopicSelector}
                                setOpenTopicSelector={setOpenTopicSelector}
                                selectedTopic={selectedTopic}
                                setSelectedTopic={setSelectedTopic}
                            />
                        ) : (
                            <ScrollView
                                className="flex-1"
                                showsVerticalScrollIndicator={false}
                            >
                                <NewPost
                                    userId={userId}
                                    community_id={community_id}
                                    isPostModalVisible={IsModalVisible}
                                    setIsPostModalVisible={setIsModalVisible}
                                    openTopicSelector={openTopicSelector}
                                    setOpenTopicSelector={setOpenTopicSelector}
                                    selectedTopic={selectedTopic}
                                    setSelectedTopic={setSelectedTopic}
                                    postContent={postContent}
                                    setPostContent={setPostContent}
                                    taggedUsers={taggedUsers}
                                    setTaggedUsers={setTaggedUsers}
                                    pImages={pickedImages}
                                    setPImages={setPickedImages}
                                    isNewData={isNewData}
                                    setIsNewData={setIsNewData}
                                />
                            </ScrollView>
                        )}
                    </Modal>
                </View>
            </View>

            {isJoined && (
                <TouchableOpacity
                    onPress={() => handleOpenPopup()}
                    className="absolute bottom-6 right-6 h-16 w-16 items-center justify-center rounded-full bg-orchid-500 px-5 py-2 shadow shadow-slate-500"
                >
                    <Ionicons
                        name="create-outline"
                        size={30}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
            )}
        </>
    )
}
export default Post
