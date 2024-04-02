import React, { useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
    Image,
} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFlag, faStar } from '@fortawesome/free-solid-svg-icons'
import { faLeaf } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faBullhorn } from '@fortawesome/free-solid-svg-icons'

import COLORS from '../../../constants/colors'
import STRINGS from '../../../constants/strings'
import { useState } from 'react'

import { BASE_URL } from '@env'
import axios from 'axios'

import ImageView from 'react-native-image-viewing'

import { displayDatetime, getDatetime } from '../../../utils/Utils'

const ReportItem = ({ post, userId, onChange }) => {
    const [taggedUsers, setTaggedUsers] = useState([])

    const [taggedUsernames, setTaggedUsernames] = useState([])
    const [imageViewerVisible, setImageViewerVisible] = useState(false)
    const [imageViewerIndex, setImageViewerIndex] = useState(0)
    const [media_urls, setMediaUrls] = useState([])

    useEffect(() => {
        setTaggedUsernames([])
        taggedUsers.map((userId) => {
            getUserInfo(userId)
        })
    }, [taggedUsers])

    useEffect(() => {
        if (post.tagged && post.tagged.length > 0) {
            setTaggedUsers(post.tagged)
        }
    }, [post.tagged])

    const getUserInfo = (userId) => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/user/get?userId=${userId}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                // console.log('User info', res.data.username)
                setTaggedUsernames((prev) => [...prev, res.data.username])
            })
            .catch((err) => {
                console.log('Cannot like the post', err)
            })
    }

    const openImageViewer = (medias, index) => {
        setMediaUrls(medias.map((url) => ({ uri: url })))
        setImageViewerIndex(index)
        setImageViewerVisible(true)
    }

    const closeImageViewer = () => {
        setMediaUrls([])
        setImageViewerIndex(0)
        setImageViewerVisible(false)
    }

    const keepPostConfirmation = () => {
        Alert.alert(
            STRINGS.keep_post_title,
            STRINGS.keep_post_confirmation,
            [
                {
                    text: STRINGS.cancel,
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: STRINGS.yes, onPress: () => keepPostHandler() },
            ],
            { cancelable: false }
        )
    }

    const keepPostHandler = () => {
        axios({
            method: 'POST',
            url: `${BASE_URL}/post/keep`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                communityId: post.communityId,
                postId: post.id,
                moderatorId: userId,
            },
        })
            .then((res) => {
                console.log('Post kept', res.data)
            })
            .catch((err) => {
                console.log('Cannot keep the post', err)
            })

        unmount()
    }

    const removePostConfirmation = () => {
        Alert.alert(
            STRINGS.remove_post_title,
            STRINGS.remove_post_confirmation,
            [
                {
                    text: STRINGS.cancel,
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: STRINGS.yes, onPress: () => removePostHandler() },
            ],
            { cancelable: false }
        )
    }

    const removePostHandler = () => {
        axios({
            method: 'POST',
            url: `${BASE_URL}/post/delete`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                communityId: post.communityId,
                postId: post.id,
                moderatorId: userId,
            },
        })
            .then((res) => {
                console.log('Post kept', res.data)
            })
            .catch((err) => {
                console.log('Cannot keep the post', err)
            })

        unmount()
    }

    const unmount = () => {
        onChange()
    }

    return (
        <>
            <View className="mb-5 flex h-fit w-full flex-col items-start justify-start rounded-3xl bg-white shadow-md shadow-slate-300">
                <View className="w-full p-5">
                    <View className="flex h-fit w-full flex-row items-start justify-between">
                        <Text className="text-xl font-bold text-orchid-900 shadow">
                            {post.author_id}
                        </Text>
                        <Text className="text-xs text-orchid-600">
                            {displayDatetime(post.dateTime)}
                        </Text>
                    </View>
                    <Text className="my-1 text-base text-orchid-700">
                        {post.text}
                    </Text>
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={{
                            flexGrow: 1,
                            justifyContent: 'flex-start',
                        }}
                        className="my-2 h-fit w-full space-x-2"
                    >
                        {post.medias && (
                            <View className="flex h-fit w-full flex-row justify-start space-x-2">
                                {post.medias.map((url, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() =>
                                            openImageViewer(post.medias, index)
                                        }
                                    >
                                        <Image
                                            key={index}
                                            source={{ uri: url }}
                                            className="h-16 w-16 rounded-2xl"
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </ScrollView>
                    <View className="my-2 flex h-fit w-full flex-row flex-wrap items-start justify-start overflow-auto">
                        {taggedUsernames.map((username, index) => (
                            <View
                                key={index}
                                className="mx-1 rounded-full bg-orchid-100 px-2 py-1 shadow-sm"
                            >
                                <Text className="text-sm text-orchid-900">
                                    {username}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <View className="mt-2 flex h-fit w-fit flex-row justify-center space-x-2 rounded-full">
                        <TouchableOpacity
                            className="flex h-fit w-1/2 items-center rounded-xl bg-green-300 px-10 py-2 shadow"
                            onPress={() => keepPostConfirmation()}
                        >
                            <Text className="align-middle text-base font-bold text-green-900">
                                Keep
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex h-fit flex-1 items-center rounded-xl bg-red-300 px-8 py-2 shadow"
                            onPress={() => removePostConfirmation()}
                        >
                            <Text className="align-middle text-base font-bold text-red-900">
                                Remove
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* image viewer */}
            <ImageView
                images={media_urls}
                imageIndex={imageViewerIndex}
                visible={imageViewerVisible}
                onRequestClose={() => closeImageViewer()}
                swipeToCloseEnabled={true}
                doubleTapToZoomEnabled={true}
                FooterComponent={({ imageIndex }) => (
                    <View className="mx-5 mb-20 flex flex-col items-start justify-center space-y-1 shadow shadow-black">
                        {/* display only a few lines of the post text */}
                        <Text className="text-white">
                            {post.text.slice(0, 100)}
                            {post.text.length > 100 ? '...' : ''}
                        </Text>
                    </View>
                )}
            />
        </>
    )
}

export default ReportItem
