import React, { useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
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

import { BASE_URL } from '@env'
import axios from 'axios'

const PostItem = ({ post }) => {
    const [isCommentVisible, setIsCommentVisible] = useState(false)
    const [upliftNumber, setUpliftNumber] = useState(0)

    const handleComment = () => {
        setIsCommentVisible(!isCommentVisible)
    }

    const handleLike = () => {
        axios({
            method: 'POST',
            url: `${BASE_URL}/post/like`,
            data: {
                postId: post.id,
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

    useEffect(() => {
        setUpliftNumber(post.uplift)
    }, [post.uplift])

    return (
        <>
            <View className="mb-5 flex h-fit w-full flex-col items-start justify-start rounded-3xl bg-white shadow-md shadow-slate-300">
                <View className="p-5">
                    <Text className="text-xl font-bold text-orchid-900 shadow">
                        {post.author_id}
                    </Text>
                    <Text className="text-xs text-orchid-600">
                        {post.dateTime}
                    </Text>
                    <Text className="my-2 text-base text-orchid-700">
                        {post.text}
                    </Text>
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
                            {0}
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
                    <TouchableOpacity
                        onPress={() => console.log('Report button pressed')}
                    >
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
                                    justifyContent: 'space-between',
                                }}
                                className="px-3"
                            >
                                {/* Loop 10 times */}
                                {Array.from({ length: 20 }, (_, i) => (
                                    <Comment
                                        authorName="Author"
                                        text="Comment"
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
                                        console.log('Comment: ', text)
                                    }
                                />
                                <TouchableOpacity className="flex h-10 w-12 items-center justify-center rounded-full bg-gold-800">
                                    <FontAwesomeIcon icon={faLeaf} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </>
    )
}

export default PostItem
