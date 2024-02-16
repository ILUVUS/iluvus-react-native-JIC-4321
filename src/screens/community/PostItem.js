import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faBullhorn } from '@fortawesome/free-solid-svg-icons'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import COLORS from '../../constants/colors'

const PostItem = ({ post }) => {

    const handleLike = () => {
        // handle like button press
    }

    console.log(post)

    return (
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
                <TouchableOpacity onPress={handleLike}>
                    <FontAwesomeIcon
                        icon={faStar}
                        color={COLORS.gold[900]}
                        size={22}
                    />
                </TouchableOpacity>

                {/* COMMENT BUTTON HERE */}
                <TouchableOpacity
                    onPress={() => console.log('Comment button pressed')}
                >
                    <FontAwesomeIcon
                        icon={faComment}
                        color={COLORS.orchid[700]}
                        size={22}
                    />
                </TouchableOpacity>

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
    )
}

export default PostItem