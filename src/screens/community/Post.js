// Import package and project components
import React, { useEffect, useState, Component } from 'react'

import axios from 'axios'
import { BASE_URL } from '@env'
import { Alert } from 'react-native'
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
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import sampleImage from '../../../assets/images/sampleicon.jpg'

import Modal from 'react-native-modal'

import COLORS from '../../constants/colors'

import PostItem from './PostItem'
import Comment from './Comments'

import * as ImagePicker from 'expo-image-picker'

// import path from 'path'

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

const Post = ({ community_id = '65d40edbab9c837874869dc4' }) => {
    const [refreshing, setRefreshing] = React.useState(false)
    const navigation = useNavigation()
    const [postContent, setPostContent] = useState('')
    const [fName, setFname] = useState('')
    const [lName, setLname] = useState('')
    const [postData, setPostData] = useState([{}])
    const [isVisible, setIsVisible] = useState(true)
    const [commentView, setCommentView] = useState(false)
    const [userId, setUserId] = useState('')
    const [pickedImages, setPickedImages] = useState([
        {
            assetId: 'ED7AC36B-A150-4C38-BB8C-B6D696F4F2ED/L0/001',
            base64: null,
            duration: null,
            exif: null,
            fileName: 'IMG_0005.jpg',
            fileSize: 1500185,
            height: 2002,
            type: 'image',
            uri: 'file:///Users/thuanvo/Library/Developer/CoreSimulator/Devices/DAA09DCA-7F2A-42B4-8519-DC86FD6DFCE6/data/Containers/Data/Application/46224787-3EBE-4FF4-8EA6-EB93F2AD8B82/Library/Caches/ExponentExperienceData/%2540anonymous%252Filuvus-react-native-c88319dc-bd37-4a64-b2a6-ab5163134627/ImagePicker/3E9942C2-421E-49C8-BA56-910646D09AA5.jpg',
            width: 3000,
        },
        {
            assetId: 'ED7AC36B-A150-4C38-BB8C-B6D696F4F2ED/L0/001',
            base64: null,
            duration: null,
            exif: null,
            fileName: 'IMG_0005.jpg',
            fileSize: 1500185,
            height: 2002,
            type: 'image',
            uri: 'file:///Users/thuanvo/Library/Developer/CoreSimulator/Devices/DAA09DCA-7F2A-42B4-8519-DC86FD6DFCE6/data/Containers/Data/Application/46224787-3EBE-4FF4-8EA6-EB93F2AD8B82/Library/Caches/ExponentExperienceData/%2540anonymous%252Filuvus-react-native-c88319dc-bd37-4a64-b2a6-ab5163134627/ImagePicker/3E9942C2-421E-49C8-BA56-910646D09AA5.jpg',
            width: 3000,
        },
        {
            assetId: 'ED7AC36B-A150-4C38-BB8C-B6D696F4F2ED/L0/001',
            base64: null,
            duration: null,
            exif: null,
            fileName: 'IMG_0005.jpg',
            fileSize: 1500185,
            height: 2002,
            type: 'image',
            uri: 'file:///Users/thuanvo/Library/Developer/CoreSimulator/Devices/DAA09DCA-7F2A-42B4-8519-DC86FD6DFCE6/data/Containers/Data/Application/46224787-3EBE-4FF4-8EA6-EB93F2AD8B82/Library/Caches/ExponentExperienceData/%2540anonymous%252Filuvus-react-native-c88319dc-bd37-4a64-b2a6-ab5163134627/ImagePicker/3E9942C2-421E-49C8-BA56-910646D09AA5.jpg',
            width: 3000,
        },
        {
            assetId: 'CC95F08C-88C3-4012-9D6D-64A413D254B3/L0/001',
            base64: null,
            duration: null,
            exif: null,
            fileName: 'IMG_0111.jpg',
            fileSize: 4081439,
            height: 3024,
            type: 'image',
            uri: 'file:///Users/thuanvo/Library/Developer/CoreSimulator/Devices/DAA09DCA-7F2A-42B4-8519-DC86FD6DFCE6/data/Containers/Data/Application/46224787-3EBE-4FF4-8EA6-EB93F2AD8B82/Library/Caches/ExponentExperienceData/%2540anonymous%252Filuvus-react-native-c88319dc-bd37-4a64-b2a6-ab5163134627/ImagePicker/1CAF29C6-D998-4FF8-86FA-4E22826DC824.jpg',
            width: 4032,
        },
    ])

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
            setPickedImages([...pickedImages, result.assets[0]])
        } else {
            alert('You did not select any image.')
        }
    }

    useEffect(() => {
        console.log('Picked images:', pickedImages)
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

    const handlePublish = () => {
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
        let temp = [...pickedImages]
        temp.splice(index, 1)
        setPickedImages(temp)
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
                            <View className="w-fit flex-col items-center justify-start space-y-4 pb-10 pt-10 shadow">
                                <Text className="text-2xl font-bold text-orchid-900">
                                    {STRINGS.CreatePost}
                                </Text>
                                <PostInput
                                    className="h-3/6"
                                    multiline={true}
                                    placeholder={STRINGS.postContentPlaceholder}
                                    value={postContent}
                                    onChangeText={(text) =>
                                        setPostContent(text)
                                    }
                                />
                                <View className="h-fit w-full flex-row items-start justify-start space-x-2">
                                    {pickedImages.map((imageInfo, index) => {
                                        return (
                                            <View className="relative h-20 w-20 bg-transparent shadow shadow-slate-400">
                                                <Image
                                                    source={{
                                                        uri: imageInfo.uri,
                                                    }}
                                                    className="h-20 w-20 rounded-lg"
                                                />
                                                <TouchableOpacity
                                                    className="absolute right-1 top-1"
                                                    onPress={() =>
                                                        removePickedImage(index)
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
                                <View className="flex-row justify-evenly space-x-10">
                                    <PostButton
                                        onPress={() => pickingImageHandler()}
                                        className="bg-gold-900"
                                    >
                                        <Text className="text-orchid-900">
                                            {' '}
                                            Pick Images
                                        </Text>
                                    </PostButton>
                                    <PostButton
                                        onPress={() => resizeImage()}
                                        className="bg-gold-900"
                                    >
                                        <Text className="text-orchid-900">
                                            {' '}
                                            Resize Images
                                        </Text>
                                    </PostButton>
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
