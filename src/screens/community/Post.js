// Import package and project components
import React, { useEffect, useState, Component } from 'react'

import axios from 'axios'
import { BASE_URL } from '@env'
import { Alert , FlatList} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faLeaf } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faBullhorn } from '@fortawesome/free-solid-svg-icons'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { PostInput } from '../../components/input'
import CustomKeyboardAvoidingView from '../../components/CustomKeyboardAvoidingView'
import STRINGS from '../../constants/strings'

import Modal from 'react-native-modal'

import COLORS from '../../constants/colors'

import PostItem from './PostItem'
import Comment from './Comments'

import {
    Keyboard,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ImageBackground,
    ScrollView,
    RefreshControl,
} from 'react-native'
import { PostButton } from '../../components/button'
import { SearchBar } from 'react-native-elements'
import { inputStyle, searchBarStyle } from '../../../styles/style'

const Post = (data) => {
    const [refreshing, setRefreshing] = React.useState(false)
    const navigation = useNavigation()
    const [postContent, setPostContent] = useState('')
    const [fName, setFname] = useState('')
    const [lName, setLname] = useState('')
    const [postData, setPostData] = useState([{}])
    const [isVisible, setIsVisible] = useState(false)
    const [commentView, setCommentView] = useState(false)
    const [userId, setUserId] = useState('')
    const [searchUsername, setSearchUsername] = useState('')
    const [searchUserList, setSearchUserList] = useState([])

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
        axios({
            method: 'GET',
            url: `${BASE_URL}/post/getPostsByCommunityID?id=${data.route.params.community_id}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setPostData(res.data)
            })
            .catch((err) => {
                console.log('Cannot get posts', err)
            })
        findUserId()
    }, [])

    const getDatetime = () => {
        // get current datetime in format 2024-01-29T05:00:00.000+00:00
        const date = new Date()
        console.log('Date', date.toISOString())
        return date.toISOString()
    }

    const handleOpenPopup = () => {
        setIsVisible(true)
    }

    const handleClosePopup = () => {
        setIsVisible(false)
    }

    const handlePublish = () => {
        axios({
            method: 'POST',
            url: `${BASE_URL}/post/create`,
            data: {
                text: postContent,
                communityId: data.route.params.community_id,
                authorId: userId,
                dateTime: getDatetime(),
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                console.log('Post published', res.data)
                setPostData(res.data)
                setPostContent('')
                handleClosePopup()
            })
            .catch((err) => {
                console.log('Cannot publish the post', err)
            })
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
    }, [])

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/user/search?filter=${searchUsername}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setSearchUserList(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [searchUsername])

    const searchUser = (text) => {
        setSearchUsername(text)
    }

    const handleAddTag = () => {
        //
    }

    return (
        <>
            <View className="flex h-screen w-screen flex-1 bg-white">
                <View className="h-full w-full">
                    <ScrollView
                        contentContainerStyle={{
                            paddingBottom: 120,
                            flexGrow: 1,
                        }}
                        className="h-full w-full overflow-auto bg-white p-5"
                    >
                        {postData.reverse().map((post, index) => {
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

                <View className="h-screen w-screen">
                    <Modal
                        visible={isVisible}
                        transparent={false}
                        animationType="slide"
                    >
                        <View className="flex flex-1">
                        <TouchableOpacity activeOpacity={1}>
                            <View className="w-fit flex-col items-center justify-start pb-10 pt-10 shadow">
                                <SearchBar
                                    placeholder={STRINGS.TagUsers}
                                    onChangeText={(text) => searchUser(text)}
                                    value={searchUsername}
                                    containerStyle={[
                                    searchBarStyle.containerSearchBar,
                                    inputStyle.inputShadow,
                                    ]}
                                    inputContainerStyle={searchBarStyle.inputSearchBar}
                                    inputStyle={searchBarStyle.input}
                                    placeholderTextColor={COLORS['orchid'][400]}
                                    searchIcon={searchBarStyle.seachIcon}
                                    clearIcon={searchBarStyle.clearIcon}
                                />
                                {!searchUsername && (
                                    <React.Fragment>
                                    <Text className="mb-5 text-2xl font-bold text-orchid-900">
                                        {STRINGS.CreatePost}
                                    </Text>
                                        <PostInput
                                            className="mb-5 h-4/5"
                                            multiline={true}
                                            placeholder={STRINGS.postContentPlaceholder}
                                            value={postContent}
                                            onChangeText={(text) =>
                                            setPostContent(text)
                                        }
                                        />
                                    <View className="flex-row justify-evenly space-x-10">
                                        <PostButton
                                            onPress={() => handlePublish()}
                                            className="bg-gold-900"
                                        >
                                            <Text className="text-orchid-900">
                                                {' '}
                                                {STRINGS.publish}
                                            </Text>
                                        </PostButton>
                                        <PostButton
                                            onPress={() => handleClosePopup()}
                                            className="bg-gray-300"
                                        >
                                            <Text className="justify-center text-orchid-900">
                                                {' '}
                                                {STRINGS.cancel}
                                            </Text>
                                        </PostButton>
                                    </View>
                                    </React.Fragment>
                                )}
                                {searchUsername && (
                                    <React.Fragment>
                                        <ScrollView
                                        className="h-screen w-screen"
                                        contentContainerStyle={{
                                            paddingHorizontal: 5,
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={refreshing}
                                                onRefresh={onRefresh}
                                            />
                                        }
                                        >
                                        <View className="flex flex-col flex-wrap overflow-auto">
                                            {searchUserList.map((user, index) => (
                                                <View key={index} className="flex flex-row justify-between py-3 px-4 border-b border-gray-200">
                                                    <Text className="text-base text-orchid-900 flex-grow">
                                                        {user.username}
                                                    </Text>
                                                    <TouchableOpacity onPress={() => handleAddTag(user.id)} className="bg-green-500 px-4 py-2 rounded text-white">
                                                        <Text>{STRINGS.add}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                        </View>
                                        </ScrollView>
                                    </React.Fragment>
                                )}
                            </View>
                        </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
            </View>

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
        </>
    )
}
export default Post
