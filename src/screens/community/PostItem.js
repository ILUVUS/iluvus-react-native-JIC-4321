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
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faLeaf } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faBullhorn } from '@fortawesome/free-solid-svg-icons'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import COLORS from '../../constants/colors'
import STRINGS from '../../constants/strings'
import { useState } from 'react'
import Comment from './Comments'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { BASE_URL } from '@env'
import axios from 'axios'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import ImageView from 'react-native-image-viewing'

const PostItem = ({ post, userId }) => {
    const [isCommentVisible, setIsCommentVisible] = useState(false)
    const [upliftNumber, setUpliftNumber] = useState(0)
    const [commentsNumber, setCommentsNumber] = useState(0)
    const [comments, setComments] = useState([])
    const [commentText, setCommentText] = useState('')

    const handleComment = () => {
        setCommentText('')
        getAllComments()
        setIsCommentVisible(!isCommentVisible)
    }

    const handleLike = () => {
        axios({
            method: 'POST',
            url: `${BASE_URL}/post/like`,
            data: {
                postId: post.id,
                userId: userId,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                console.log('Post liked', res.data)
                setUpliftNumber(res.data)
            })
            .catch((err) => {
                console.log('Cannot like the post', err)
            })
    }

    const getAllComments = () => {
        axios({
            method: 'POST',
            url: `${BASE_URL}/post/getAllComments`,
            data: {
                postId: post.id,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                console.log('Comments', res.data)
                setComments(res.data)
                setCommentsNumber(res.data.length)
            })
            .catch((err) => {
                console.log('Cannot get comments', err)
            })
    }

    const getDatetime = () => {
        // get current datetime in format 2024-01-29T05:00:00.000+00:00
        const date = new Date()
        console.log('Date', date.toISOString())
        return date.toISOString()
    }

    const displayDatetime = (postDatetime) => {
        //I have time in this format, I need to calculate like "minutes ago, hours ago, day ago, and if it more than 1 day, display whole thing.
        const parseDatetime = new Date(postDatetime)

        const currentDate = new Date()

        const diffTime = Math.abs(currentDate - parseDatetime)
        const diffDays = diffTime / (1000 * 60 * 60 * 24)

        if (diffDays < 1) {
            const diffHours = diffTime / (1000 * 60 * 60)
            if (diffHours < 1) {
                const diffMinutes = diffTime / (1000 * 60)
                return `${Math.round(diffMinutes)} minutes ago`
            } else {
                return `${Math.round(diffHours)} hours ago`
            }
        } else {
            // display date and time
            return parseDatetime.toLocaleString()
        }
    }

    const handleReport = () => {
        axios({
            method: 'POST',
            url: `${BASE_URL}/post/report`,
            data: {
                postId: post.id,
                userId: userId,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                Alert.alert('Post Reported')
                console.log(res.data)
            })
            .catch((err) => {
                console.log('Cannot like the post', err)
            })
    }

    const writeComment = async () => {
        axios({
            method: 'POST',
            url: `${BASE_URL}/post/comment`,
            data: {
                postId: post.id,
                authorId: userId,
                text: commentText,
                dateTime: getDatetime(),
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setCommentText('')
                console.log('Comment written', res.data)
                setComments(res.data)
                setCommentsNumber(res.data.length)
            })
            .catch((err) => {
                console.log('Cannot write the comment', err)
            })
    }

    useEffect(() => {
        if (post.likedBy) {
            setUpliftNumber(post.likedBy.length)
        }
    }, [post])

    useEffect(() => {
        const commentsLen = post['comments']?.length
        setCommentsNumber(commentsLen)
    }, [post['comments']])

    const [imageViewerVisible, setImageViewerVisible] = useState(false)
    const [imageViewerIndex, setImageViewerIndex] = useState(0)
    const [media_urls, setMediaUrls] = useState([])

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

    return (
        <>
            <View className="mb-5 flex h-fit w-full flex-col items-start justify-start rounded-3xl bg-white shadow-md shadow-slate-300">
                <View className="w-full p-5">
                    <Text className="text-xl font-bold text-orchid-900 shadow">
                        {post.author_id}
                    </Text>
                    <Text className="text-xs text-orchid-600">
                        {displayDatetime(post.dateTime)}
                    </Text>
                    <Text className="my-2 text-base text-orchid-700">
                        {post.text}
                    </Text>
                    {post.medias && (
                        <View className="mt-3 flex h-fit w-full flex-row justify-start space-x-2">
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
                </View>
                <View className="h-fit w-full flex-row justify-evenly space-x-10 rounded-b-3xl bg-orchid-200 p-2 ">
                    <View className="flex flex-row items-center justify-center space-x-2">
                        <TouchableOpacity onPress={() => handleLike()}>
                            <FontAwesomeIcon
                                icon={faStar}
                                color={COLORS.gold[900]}
                                size={22}
                            />
                        </TouchableOpacity>
                        <Text className="text-sm text-orchid-600">
                            {upliftNumber}
                        </Text>
                    </View>

                    {/* COMMENT BUTTON HERE */}
                    <View className="flex flex-row items-center justify-center space-x-2">
                        <TouchableOpacity onPress={() => handleComment()}>
                            <FontAwesomeIcon
                                icon={faComment}
                                color={COLORS.orchid[700]}
                                size={22}
                            />
                        </TouchableOpacity>
                        <Text className="text-sm text-orchid-600">
                            {commentsNumber}
                        </Text>
                    </View>

                    {/* SHARE BUTTON HERE */}
                    <TouchableOpacity
                        onPress={() => console.log('Share button pressed')}
                    >
                        <FontAwesomeIcon
                            icon={faBullhorn}
                            color={COLORS.blue}
                            size={22}
                        />
                    </TouchableOpacity>

                    {/* REPORT BUTTON HERE */}
                    <TouchableOpacity onPress={() => handleReport()}>
                        <FontAwesomeIcon
                            icon={faEllipsis}
                            color={COLORS.gray[500]}
                            size={22}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {isCommentVisible && (
                <View className="mb-5 flex h-80 w-full flex-1 rounded-3xl bg-white py-3 shadow-md shadow-slate-300">
                    <View className="flex h-full w-full flex-col">
                        <View className="flex flex-1">
                            <ScrollView
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    justifyContent: 'flex-start',
                                }}
                                className="px-3"
                                ref={(ref) => {
                                    this.scrollView = ref
                                }}
                                onContentSizeChange={() =>
                                    this.scrollView.scrollToEnd({
                                        animated: true,
                                    })
                                }
                            >
                                {comments.map((comment, index) => (
                                    <Comment
                                        key={index}
                                        authorName={comment.author_id}
                                        text={comment.text}
                                        dateTime={comment.datetime}
                                    />
                                ))}
                            </ScrollView>
                        </View>

                        <View className="mt-3 flex flex-col px-3">
                            <View className="flex flex-row space-x-2">
                                <TextInput
                                    className="min-10 flex max-h-20 flex-1 rounded-3xl bg-slate-200 p-3"
                                    multiline={true}
                                    placeholder={STRINGS.commentPlaceholder}
                                    onChangeText={(text) =>
                                        setCommentText(text)
                                    }
                                    value={commentText}
                                />
                                <TouchableOpacity
                                    className="flex h-10 w-12 items-center justify-center rounded-full bg-gold-800"
                                    onPress={() => {
                                        writeComment()
                                    }}
                                >
                                    <FontAwesomeIcon icon={faLeaf} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            )}

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
                        <Text className="font-bold text-white">
                            {upliftNumber} likes, {commentsNumber} comments
                        </Text>
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

export default PostItem
