import React, { useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
    Image,
    Linking,
} from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFlag, faStar, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { faLeaf } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faBullhorn } from '@fortawesome/free-solid-svg-icons'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'

import COLORS from '../../../constants/colors'
import STRINGS from '../../../constants/strings'
import { useState } from 'react'
import Comment from '../Comments'

import { BASE_URL } from '@env'
import axios from 'axios'

import ImageView from 'react-native-image-viewing'

import {
    displayDatetime,
    getDatetime,
    randomSymbol,
} from '../../../utils/Utils'
import { useNavigation } from '@react-navigation/native'

const PostItem = ({ post, userId, displayCommunityName }) => {
    console.log('POST DEBUG:', post);
    const [isCommentVisible, setIsCommentVisible] = useState(false)
    const [upliftNumber, setUpliftNumber] = useState(0)
    const [commentsNumber, setCommentsNumber] = useState(0)
    const [comments, setComments] = useState([])
    const [commentText, setCommentText] = useState('')
    const [taggedUsers, setTaggedUsers] = useState([])

    const [taggedUsernames, setTaggedUsernames] = useState([])
    const [topic, setTopic] = useState({})
    const [community, setCommunity] = useState({})

    const navigate = useNavigation()

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

    useEffect(() => {
        // console.log('topic id', post.topicId)
        getPostTopicById(post.topicId)
    }, [post.topicId])

    const openSourceLink = () => {
        if (post.sourceLink && post.sourceLink.trim().length > 0) {
            Linking.openURL(post.sourceLink) // (2) NEW
        } else {
            Alert.alert('No valid source link provided.')
        }
    }

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
                // console.log('Post liked', res.data)
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
                // console.log('Comments', res.data)
                setComments(res.data)
                setCommentsNumber(res.data.length)
            })
            .catch((err) => {
                console.log('Cannot get comments', err)
            })
    }

    const reportConfirm = () => {
        Alert.alert(
            'Report Post',
            'Are you sure you want to report this post?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Yes', onPress: () => handleReport() },
            ],
            { cancelable: false }
        )
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
                // console.log(res.data)
            })
            .catch((err) => {
                console.log('Cannot like the post', err)
            })
    }

    const handleShare = () => {
        axios({
            method: 'POST',
            url: `${BASE_URL}/post/share`,
            data: {
                postId: post.id,
                userId: userId,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                Alert.alert('Post Shared')
                // console.log(res.data)
            })
            .catch((err) => {
                console.log('Cannot Share the post', err)
            })
    }

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

    const getPostTopicById = (id) => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/interest/getById?id=${id}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                // map the response to the topic object { 0: text } => { id: 0, name: text }
                const topic = Object.keys(res.data).map((key) => ({
                    id: key,
                    name: res.data[key],
                }))
                setTopic(topic[0])
            })
            .catch((err) => {
                setTopic({
                    id: 200,
                    name: 'Other',
                })
                // console.log('Cannot get topic', err)
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
                // console.log('Comment written', res.data)
                setComments(res.data)
                setCommentsNumber(res.data.length)
            })
            .catch((err) => {
                console.log('Cannot write the comment', err)
            })
    }

    useEffect(() => {
        if (post['likedBy']) {
            setUpliftNumber(post['likedBy'].length)
        }
        if (displayCommunityName && post.community_id) {
            getCommunityInfo()
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
        navigate.navigate('MediaViewer', {
            medias: medias,
        })
    }

    const closeImageViewer = () => {
        setMediaUrls([])
        setImageViewerIndex(0)
        setImageViewerVisible(false)
    }

    const getCommunityInfo = () => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/community/getInfo?id=${post.community_id}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                // console.log('Community info', res.data)
                setCommunity(res.data)
            })
            .catch((err) => {
                console.log('Cannot get community info', err)
            })
    }

    return (
        <>
            <View className="mb-5 flex h-fit w-full flex-col items-start justify-start rounded-3xl bg-white shadow-md shadow-slate-300">
                <View className="w-full p-5">
                    <View className="flex h-fit w-full flex-row items-start justify-between">
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <Text className="text-xl font-bold text-orchid-900 shadow">
                                {post.author_id + "\t"}
                            </Text>

                            <TouchableOpacity
                                onPress={() => Alert.alert('User has been reported!')}
                            >
                                <Text className="text-xl font-bold text-orchid-900 shadow">
                                       🚩
                                </Text>
                            </TouchableOpacity>
                            
                            {post.reportedBy && post.reportedBy.length > 0 && (
                                <TouchableOpacity
                                    style={{ marginLeft: 8 }}
                                    onPress={() =>
                                        Alert.alert(
                                            `This post has been reported ${post.reportedBy.length} time(s) Please view with caution.`
                                        )
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faExclamationTriangle}
                                        size={18}
                                        color="orange"
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                        <Text className="text-xs text-orchid-600">
                            {displayDatetime(post.dateTime)}
                        </Text>
                    </View>

                    <View className="my-2 flex h-fit w-full flex-row flex-wrap items-start justify-start">
                        <View
                            key={topic.id}
                            className="rounded-full bg-gold-900 px-3 py-1 shadow-sm"
                        >
                            <Text className="text-sm text-orchid-900">
                                {topic.name}
                            </Text>
                        </View>
                    </View>
                    <Text className="mb-2 mt-1 text-base text-orchid-700">
                        {post.text}
                    </Text>

                    {/* horizontal scroll view for media */}
                    {post.medias && (
                        <ScrollView
                            horizontal={true}
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: 'flex-start',
                            }}
                            className="my-2 h-fit w-full"
                        >
                            {post.medias && (
                                <View className="mb-2 flex h-fit w-full flex-row justify-start space-x-2">
                                    {post.medias.map((url, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() =>
                                                openImageViewer(
                                                    post.medias,
                                                    index
                                                )
                                            }
                                        >
                                            <Image
                                                key={index}
                                                source={{ uri: url }}
                                                className="h-16 w-16 rounded-2xl"
                                                defaultSource={randomSymbol(
                                                    index
                                                )}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </ScrollView>
                    )}
                    {taggedUsernames.length > 0 && (
                        <View className="mb-3 flex h-fit w-full flex-row flex-wrap items-start justify-start overflow-auto">
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
                    )}
                    {displayCommunityName && community.name && (
                        <View className="flex h-fit w-full flex-row items-start justify-between">
                            <Text className="text-xs text-orchid-600">
                                From {community.name}
                            </Text>
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
                    <TouchableOpacity onPress={() => handleShare()}>
                        <FontAwesomeIcon
                            icon={faBullhorn}
                            color={COLORS.blue}
                            size={22}
                        />
                    </TouchableOpacity>

                    {post.sharedBy && post.sharedBy.length > 0 && (
                        <Text className="text-xs text-orchid-600">
                            Shared by {post.sharedBy.length} user(s)
                        </Text>
                    )}

                    {post.type === 'Shared' && post.author_id !== userId && (
                        <Text style={{ fontStyle: 'italic', color: 'gray' }}>
                            Shared from {post.author_id}
                        </Text>
                    )}

                    {/* CHECK SOURCE BUTTON HERE */}
                    {post.sourceLink && (
                        <TouchableOpacity
                            onPress={() => openSourceLink()}
                        >
                            <FontAwesomeIcon
                                icon={faNewspaper}
                                color={COLORS.green}
                                size={22}
                            />
                        </TouchableOpacity>
                    )}

                    {/* REPORT BUTTON HERE */}
                    <TouchableOpacity onPress={() => reportConfirm()}>
                        <FontAwesomeIcon
                            icon={faFlag}
                            color={COLORS.red}
                            size={22}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {isCommentVisible && (
                <View className="mb-5 flex h-fit max-h-80 w-full flex-1 rounded-3xl bg-white py-3 shadow-md shadow-slate-300">
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
