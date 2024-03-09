// Import package and project components
import React, { useEffect, useState, Component } from 'react'

import axios from 'axios'
import { BASE_URL } from '@env'
import { Alert, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { PostInput } from '../../components/input'
import STRINGS from '../../constants/strings'
import SIZES from '../../constants/sizes'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { uploadImage } from '../../utils/fbHelper'

import Modal from 'react-native-modal'
import COLORS from '../../constants/colors'
import PostItem from './PostItem'

import * as Progress from 'react-native-progress'

import * as ImagePicker from 'expo-image-picker'
import { useRoute } from '@react-navigation/native'
import ImageView from 'react-native-image-viewing'

import { getDatetime } from '../../utils/Utils'

import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    RefreshControl,
} from 'react-native'
import { PostButton } from '../../components/button'
import { SearchBar } from 'react-native-elements'
import { inputStyle, searchBarStyle } from '../../../styles/style'

const Post = (nav) => {
    const [postContent, setPostContent] = useState('')

    const [postData, setPostData] = useState([{}])
    const [IsModalVisible, setIsModalVisible] = useState(true)

    const [userId, setUserId] = useState('')
    const [community_id, setCommunityId] = useState(
        useRoute().params.communityId
    )
    const [pickedImages, setPickedImages] = useState([])

    const [uploadProgress, setUploadProgress] = useState(0)

    const [eachImageProgress, setEachImageProgress] = useState([])

    const [imageURLs, setImageURLs] = useState([])

    const [refreshing, setRefreshing] = React.useState(false)

    const [isJoined, setIsJoined] = useState(useRoute().params.communityId)

    const [imageViewerVisible, setImageViewerVisible] = useState(false)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        getPosts()
        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }, [])
    const [searchUsername, setSearchUsername] = useState('')
    const [searchUserList, setSearchUserList] = useState([])
    const [taggedUsers, setTaggedUsers] = useState([])

    const tagUser = (index) => {
        setTaggedUsers([...taggedUsers, searchUserList[index]])
        searchUserList.splice(index, 1)
    }

    const removeTaggedUser = (index) => {
        const removedUser = taggedUsers.splice(index, 1)
        setTaggedUsers([...taggedUsers])
        if (removedUser[0].username.includes(searchUsername.toLowerCase())) {
            setSearchUserList([...searchUserList, removedUser[0]])
        }
        
    }

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

    const pickingImageHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 0.8,
        })

        console.log(result)

        if (!result.canceled) {
            const resultImage = result.assets[0]
            setPickedImages([...pickedImages, resultImage])
            setEachImageProgress(
                eachImageProgress.concat(Array(pickedImages.length).fill(0))
            )
        } else {
            // alert('You did not select any image.')
        }
    }

    useEffect(() => {
        console.log('Picked images:', pickedImages.length)
        setUploadProgress(0)
        setEachImageProgress([])
    }, [pickedImages])

    useEffect(() => {
        getPosts()
        findUserId()

        console.log(community_id)
        console.log(userId)
    }, [])

    const getPosts = async () => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/post/getPostsByCommunityID?id=${community_id}`,
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

    const handleOpenPopup = () => {
        setIsModalVisible(true)
    }

    const handleClosePopup = () => {
        setPostContent('')
        setPickedImages([])
        setImageURLs([])
        setIsModalVisible(false)
    }

    useEffect(() => {
        // console.log('Each image progress:', eachImageProgress)
        if (eachImageProgress.length > 0) {
            setUploadProgress(
                eachImageProgress.reduce((a, b) => a + b, 0) /
                    eachImageProgress.length /
                    100
            )
        }
    }, [eachImageProgress])

    // SUCCESS MESSAGE HERE
    useEffect(() => {
        if (
            imageURLs.length != 0 &&
            pickedImages != 0 &&
            imageURLs.length === pickedImages.length
        ) {
            console.log('Image URLs:', imageURLs)

            setPickedImages([])
            setEachImageProgress([])

            // turn array of objects into array of strings

            axios({
                method: 'POST',
                url: `${BASE_URL}/post/create`,
                data: {
                    text: postContent,
                    communityId: community_id,
                    authorId: userId,
                    dateTime: getDatetime(),
                    medias: JSON.stringify({ urls: imageURLs }),
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    console.log('Post published', res.data)

                    setPostData(res.data)
                    handleClosePopup()
                })
                .catch((err) => {
                    console.log('Cannot publish the post', err)
                })
        }
    }, [imageURLs])

    const handlePublish = async () => {
        setImageURLs([])

        for (let i = 0; i < pickedImages.length; i++) {
            try {
                const uploadedImage = await uploadImage(
                    community_id,
                    userId,
                    pickedImages[i],
                    i,
                    setEachImageProgress,
                    setImageURLs
                )
            } catch (e) {
                console.log(e)
                return
            }
        }
    }

    const removePickedImage = (index) => {
        pickedImages.splice(index, 1)
        setPickedImages([...pickedImages])
    }

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/user/search?filter=${searchUsername}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                // remove the tagged users from the search result
                const filteredUsers = res.data.filter(
                    (user) =>
                        !taggedUsers.some(
                            (taggedUser) => taggedUser.id === user.id
                        )
                )
                setSearchUserList(filteredUsers)
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
            <View className="h-screen w-screen flex-1 bg-white">
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

                <View className="h-screen w-screen">
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
                    >
                        <View className="flex flex-1">
                            <View className="w-fit flex-col items-center justify-start space-y-6 pb-10 pt-10 shadow">
                                <Text className="text-2xl font-bold text-orchid-900">
                                    {STRINGS.CreatePost}
                                </Text>
                                <PostInput
                                    className="h-52"
                                    multiline={true}
                                    placeholder={STRINGS.postContentPlaceholder}
                                    value={postContent}
                                    onChangeText={(text) =>
                                        setPostContent(text)
                                    }
                                />
                                {taggedUsers.length > 0 && (
                                    <View className="w-full">
                                        <View className="flex w-full flex-col items-start justify-start">
                                            <Text className="text-base font-bold text-orchid-900">
                                                Tagged Users
                                            </Text>
                                        </View>

                                        <ScrollView
                                            className="min-h-16 max-h-26 w-fit overflow-auto"
                                            contentContainerStyle={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                                justifyContent: 'flex-start',
                                                flexGrow: 1,
                                            }}
                                        >
                                            {taggedUsers.map((user, index) => (
                                                <View
                                                    key={index}
                                                    className="mx-1 my-2 flex flex-row items-center justify-center space-x-2 rounded-full bg-orchid-100 px-3 py-2 shadow-sm"
                                                >
                                                    <View>
                                                        <Text className="text-base text-orchid-900">
                                                            {user.username}
                                                        </Text>
                                                    </View>
                                                    <TouchableOpacity
                                                        onPress={() =>
                                                            removeTaggedUser(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faCircleXmark}
                                                            color={
                                                                COLORS[
                                                                    'orchid'
                                                                ][800]
                                                            }
                                                            size={
                                                                SIZES[
                                                                    'xMarkIconSizeTag'
                                                                ]
                                                            }
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                        </ScrollView>
                                    </View>
                                )}
                                <View className="flex h-fit w-full">
                                    <View className="w-fit flex-col items-center justify-start">
                                        <SearchBar
                                            placeholder={STRINGS.TagUsers}
                                            onChangeText={(text) =>
                                                searchUser(text)
                                            }
                                            value={searchUsername}
                                            containerStyle={[
                                                searchBarStyle.containerSearchBar,
                                                inputStyle.inputShadow,
                                            ]}
                                            inputContainerStyle={
                                                searchBarStyle.inputSearchBar
                                            }
                                            inputStyle={searchBarStyle.input}
                                            placeholderTextColor={
                                                COLORS['orchid'][400]
                                            }
                                            searchIcon={
                                                searchBarStyle.seachIcon
                                            }
                                            clearIcon={searchBarStyle.clearIcon}
                                        />

                                        {searchUsername.length > 0 && (
                                            <ScrollView
                                                className="mt-2 h-28 w-fit overflow-auto"
                                                contentContainerStyle={{
                                                    // display: 'flex',
                                                    flexDirection: 'row',
                                                    // flexWrap: 'wrap',
                                                    // justifyContent: 'flex-start',
                                                    // alignItems: 'start',
                                                    flexGrow: 1,
                                                }}
                                            >
                                                <View className="flex h-full w-full flex-row flex-wrap items-start justify-start overflow-auto">
                                                    {searchUserList.map(
                                                        (user, index) => (
                                                            <TouchableOpacity
                                                                key={index}
                                                                className="mx-1 my-2 rounded-full bg-orchid-100 px-3 py-2 shadow-sm"
                                                                onPress={() =>
                                                                    tagUser(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <Text className="text-base text-orchid-900">
                                                                    {
                                                                        user.username
                                                                    }
                                                                </Text>
                                                            </TouchableOpacity>
                                                        )
                                                    )}
                                                </View>
                                            </ScrollView>
                                        )}
                                    </View>
                                </View>

                                <View className="h-fit w-full flex-row items-center justify-center space-x-2">
                                    {pickedImages.length >= 0 &&
                                        pickedImages.length < 5 && (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    pickingImageHandler()
                                                }
                                                className="flex h-16 w-16 items-center justify-center space-y-1 rounded-lg bg-orchid-100 shadow shadow-slate-300"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faPlus}
                                                    color={COLORS.orchid[900]}
                                                    size={
                                                        SIZES.postImageIconSize
                                                    }
                                                />
                                                <Text className="text-xs text-orchid-900">
                                                    Images...
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    {pickedImages.length > 0 &&
                                        pickedImages.map((imageInfo, index) => {
                                            return (
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        setImageViewerVisible(
                                                            true
                                                        )
                                                    }
                                                >
                                                    <View className="relative h-16 w-16 bg-transparent shadow shadow-slate-300">
                                                        <Image
                                                            source={{
                                                                uri: imageInfo.uri,
                                                            }}
                                                            className="h-16 w-16 rounded-lg"
                                                        />
                                                        <TouchableOpacity
                                                            className="absolute right-1 top-1"
                                                            onPress={() =>
                                                                removePickedImage(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faCircleXmark
                                                                }
                                                                color={
                                                                    COLORS.white
                                                                }
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })}
                                </View>
                                {uploadProgress > 0 && uploadProgress < 1 && (
                                    <View className="flex h-fit w-4/5 flex-col items-center justify-center space-y-1">
                                        <View className="flex h-2 w-full shadow shadow-slate-200">
                                            <Progress.Bar
                                                animated={true}
                                                progress={uploadProgress}
                                                width={null}
                                                height={6}
                                                borderRadius={4}
                                                borderColor={COLORS.orchid[500]}
                                                borderWidth={0}
                                                unfilledColor={
                                                    COLORS.orchid[100]
                                                }
                                                color={COLORS.orchid[500]}
                                            />
                                        </View>
                                        <Text>
                                            {Math.round(uploadProgress * 100)}%
                                        </Text>
                                    </View>
                                )}
                                {uploadProgress === 1 && (
                                    <View className="flex h-fit w-4/5 flex-col items-center justify-center space-y-1">
                                        <Text className="text-orchid-900">
                                            {STRINGS.uploadSuccess}
                                        </Text>
                                    </View>
                                )}
                                {uploadProgress === 0 && (
                                    <View className="flex h-fit w-4/5 flex-col items-center justify-center space-y-1">
                                        <Text className="text-orchid-900">
                                            {pickedImages.length}/5 images
                                            selected
                                        </Text>
                                    </View>
                                )}
                                <View className="flex-row justify-evenly space-x-10">
                                    <PostButton
                                        onPress={() => handlePublish()}
                                        className="bg-gold-900"
                                    >
                                        <Text className="text-base text-orchid-900">
                                            {' '}
                                            {STRINGS.publish}
                                        </Text>
                                    </PostButton>
                                    <PostButton
                                        onPress={() => handleClosePopup()}
                                        className="bg-gray-300"
                                    >
                                        <Text className="justify-center text-base  text-orchid-900">
                                            {' '}
                                            {STRINGS.cancel}
                                        </Text>
                                    </PostButton>
                                </View>
                            </View>
                        </View>
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
