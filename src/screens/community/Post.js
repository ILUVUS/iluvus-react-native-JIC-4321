// Import package and project components
import React, { useEffect, useState, Component } from 'react'

import axios from 'axios'
import { BASE_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { PostInput } from '../../components/input'
import STRINGS from '../../constants/strings'
import SIZES from '../../constants/sizes'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { uploadImage } from '../../utils/fbHelper'

import Modal from 'react-native-modal'
import COLORS from '../../constants/colors'
import PostItem from './PostItem'

import * as Progress from 'react-native-progress'

import * as ImagePicker from 'expo-image-picker'

import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { PostButton } from '../../components/button'

const Post = ({ community_id = '65d40edbab9c837874869dc4' }) => {
    const [postContent, setPostContent] = useState('')

    const [postData, setPostData] = useState([{}])
    const [isVisible, setIsVisible] = useState(true)

    const [userId, setUserId] = useState('defaultUser')
    const [pickedImages, setPickedImages] = useState([])

    const [uploadProgress, setUploadProgress] = useState(0)

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

        if (!result.canceled) {
            const resultImage = result.assets[0]
            setPickedImages([...pickedImages, resultImage])
        } else {
            alert('You did not select any image.')
        }
    }

    useEffect(() => {
        console.log('Picked images:', pickedImages.length)
        setUploadProgress(0)
    }, [pickedImages])

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/post/getPostsByCommunityID?id=${community_id}`,
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

    const handlePublish = async () => {
        // try {
        //     const uploadedImages = await uploadImage(community_id, userId, pickedImages)
        //     console.log('Uploaded images', uploadedImages)
        // } catch (e) {
        //     console.log(e)
        //     return
        // }
        setUploadProgress(0.0001)

        for (let i = 0; i < pickedImages.length; i++) {
            try {
                const uploadedImage = await uploadImage(
                    community_id,
                    userId,
                    pickedImages[i]
                )
                console.log('Uploaded image', uploadedImage)
                setUploadProgress((i + 1) / pickedImages.length)
            } catch (e) {
                console.log(e)
                return
            }
        }

        axios({
            method: 'POST',
            url: `${BASE_URL}/post/create`,
            data: {
                text: postContent,
                communityId: community_id,
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

    const removePickedImage = (index) => {
        pickedImages.splice(index, 1)
        setPickedImages([...pickedImages])
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
                        <TouchableOpacity activeOpacity={1}>
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
                                <View className="h-fit w-full flex-row items-center justify-center space-x-2">
                                    {pickedImages.length >= 0 &&
                                        pickedImages.length < 4 && (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    pickingImageHandler()
                                                }
                                                className="flex h-20 w-20 items-center justify-center space-y-1 rounded-lg bg-orchid-100 shadow shadow-slate-300"
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
                                                <View className="relative h-20 w-20 bg-transparent shadow shadow-slate-300">
                                                    <Image
                                                        source={{
                                                            uri: imageInfo.uri,
                                                        }}
                                                        className="h-20 w-20 rounded-lg"
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
                                                            icon={faCircleXmark}
                                                            color={COLORS.white}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })}
                                </View>
                                {uploadProgress > 0 && (
                                    <View className="flex h-fit w-4/5 flex-col space-y-1 justify-center items-center">
                                        <View className="flex w-full h-2 shadow shadow-slate-200">
                                            <Progress.Bar
                                                animated={true}
                                                progress={uploadProgress}
                                                width={null}
                                                height={6}
                                                borderRadius={4}
                                                borderColor={COLORS.orchid[500]}
                                                borderWidth={0}
                                                unfilledColor={COLORS.orchid[100]}
                                                color={COLORS.orchid[500]}
                                            />
                                        </View>
                                        <Text>
                                            {Math.round(uploadProgress * 100)}%
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
                        </TouchableOpacity>
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
