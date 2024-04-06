import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
} from 'react-native'
import { PostInput } from '../../../components/input'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import axios from 'axios'
import { BASE_URL } from '@env'

import STRINGS from '../../../constants/strings'
import COLORS from '../../../constants/colors'
import SIZES from '../../../constants/sizes'

import {
    faPencil,
    faMagnifyingGlass,
    faCircleXmark,
    faPlus,
} from '@fortawesome/free-solid-svg-icons'

import * as ImagePicker from 'expo-image-picker'
import { SearchBar } from 'react-native-elements'
import { inputStyle, searchBarStyle } from '../../../../styles/style'

import { PostButton } from '../../../components/button'

import { uploadImage } from '../../../utils/fbHelper'
import * as Progress from 'react-native-progress'
import { getDatetime } from '../../../utils/Utils'

const NewPost = ({
    userId,
    community_id,
    isPostModalVisible,
    setIsPostModalVisible,
    openTopicSelector,
    setOpenTopicSelector,
    selectedTopic,
    setSelectedTopic,
    postContent,
    setPostContent,
    taggedUsers,
    setTaggedUsers,
    pImages,
    setPImages,
    isNewData,
    setIsNewData,
}) => {
    const [searchBarDisplay, setSearchBarDisplay] = useState(false)
    const [searchUsername, setSearchUsername] = useState('')
    const [searchUserList, setSearchUserList] = useState([])
    const [taggedUsersId, setTaggedUsersId] = useState([])

    const [uploadProgress, setUploadProgress] = useState(0)

    const [pickedImages, setPickedImages] = useState(pImages)

    const [isPosting, setIsPosting] = useState(false)
    const [eachImageProgress, setEachImageProgress] = useState([])
    const [imageURLs, setImageURLs] = useState([])

    const [resultPostData, setResultPostData] = useState([])

    const [signal, setSignal] = useState()

    const getSignal = async () => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/community/getInfo?id=${community_id}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setSignal(true)
            })
            .catch((err) => {
                console.log(err)
                setSignal(false)
                Alert.alert(
                    'Cannot publish post at this time. Please try again later.'
                )
            })
    }

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/user/searchUsersInCommunity?filter=${searchUsername}&communityId=${community_id}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
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

    const tagUser = (index) => {
        setTaggedUsers([...taggedUsers, searchUserList[index]])
        searchUserList.splice(index, 1)
        setSearchUsername('')
    }

    const removeTaggedUser = (index) => {
        const removedUser = taggedUsers.slice(index)
        const removeUserId = taggedUsersId.slice(index)

        setTaggedUsers(
            taggedUsers.filter((user) => user.id !== removedUser[0].id)
        )
        setTaggedUsersId(taggedUsersId.filter((id) => id !== removeUserId[0]))

        if (removedUser[0].username.includes(searchUsername.toLowerCase())) {
            setSearchUserList([...searchUserList, removedUser[0]])
        }
    }

    const pickingImageHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 0.8,
        })

        // console.log(result)

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
        setPImages(pickedImages)
    }, [pickedImages])

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

    const handlePublish = async () => {
        if (postContent.length === 0) {
            Alert.alert('Post content cannot be empty.')
            return
        } else if (selectedTopic.id === undefined) {
            Alert.alert('Please select a post topic.')
            return
        }

        await getSignal()
    }

    useEffect(() => {
        if (signal) {
            setImageURLs([])

            for (let i = 0; i < pickedImages.length; i++) {
                try {
                    const uploadedImage = uploadImage(
                        community_id,
                        userId,
                        pickedImages[i],
                        i,
                        setEachImageProgress,
                        setImageURLs
                    )
                } catch (e) {
                    setIsPosting(false)
                    console.log(e)
                    return
                }
            }
            setIsPosting(false)
        }
    }, [signal])

    useEffect(() => {
        if (
            imageURLs.length != 0 &&
            pickedImages != 0 &&
            imageURLs.length === pickedImages.length
        ) {
            // console.log('Image URLs:', imageURLs)

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
                    //join the tagged users id into a string
                    tagged: taggedUsersId.join(','),
                    topicId: selectedTopic.id,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    // console.log('Post published', res.data)

                    // setResultPostData(res.data.reverse())
                    handleClosePopup()
                })
                .catch((err) => {
                    setIsPosting(false)
                    console.log('Cannot publish the post', err)
                })
        }
    }, [imageURLs])

    const removePickedImage = (index) => {
        pickedImages.splice(index, 1)
        setPickedImages([...pickedImages])
    }

    const handleCancelPopup = () => {
        Alert.alert(
            'Discard Post',
            'Are you sure you want to discard this post? You will lose all inputs.',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        setPostContent('')
                        setPickedImages([])
                        setImageURLs([])
                        setTaggedUsers([])
                        setTaggedUsersId([])
                        setIsPostModalVisible(false)
                        setOpenTopicSelector(false)
                        setSelectedTopic({})
                    },
                },
            ],
            { cancelable: false }
        )
    }

    const handleClosePopup = () => {
        setPostContent('')
        setPickedImages([])
        setImageURLs([])
        setTaggedUsers([])
        setTaggedUsersId([])
        setIsPostModalVisible(false)
        setOpenTopicSelector(false)
        setSelectedTopic({})
        setIsNewData(true)
    }

    return (
        <>
            <View className="w-fit flex-col items-center justify-start space-y-5">
                <View className="flex w-full items-center">
                    <Text className="text-2xl font-bold text-orchid-900">
                        {STRINGS.CreatePost}
                    </Text>
                </View>
                <PostInput
                    className="h-48"
                    multiline={true}
                    placeholder={STRINGS.postContentPlaceholder}
                    value={postContent}
                    onChangeText={(text) => setPostContent(text)}
                />

                <View className="flex h-fit w-full flex-row items-center justify-between">
                    <Text className="text-orchid-900">Select a Post Topic</Text>
                    <View className="flex-row items-center justify-center">
                        <TouchableOpacity
                            onPress={() => {
                                setOpenTopicSelector((prev) => !prev)
                            }}
                            className="flex-row items-center justify-center space-x-2 rounded-full bg-gold-900 px-6 py-2"
                        >
                            {selectedTopic.name && (
                                <Text className="text-orchid-900">
                                    {selectedTopic.name}
                                </Text>
                            )}
                            <FontAwesomeIcon
                                icon={faPencil}
                                color={COLORS.orchid[900]}
                                size={SIZES.smallIconSize}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex h-fit w-full">
                    <View className="mb-2 flex flex-row items-center justify-between">
                        <Text className="text-orchid-900">Tag Users</Text>
                        <TouchableOpacity
                            onPress={() => setSearchBarDisplay((prev) => !prev)}
                            className="flex-row items-center justify-center space-x-2 rounded-full bg-gold-900 px-5 py-2"
                        >
                            <Text className="text-sm text-orchid-900">
                                Find Users
                            </Text>
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                color={COLORS.orchid[900]}
                                size={SIZES.smallIconSize}
                            />
                        </TouchableOpacity>
                    </View>
                    {searchBarDisplay && (
                        <View className="w-fit flex-col items-center justify-start">
                            <SearchBar
                                placeholder={STRINGS.TagUsers}
                                onChangeText={(text) => setSearchUsername(text)}
                                value={searchUsername}
                                containerStyle={[
                                    searchBarStyle.containerSearchBar,
                                    inputStyle.inputShadow,
                                ]}
                                inputContainerStyle={
                                    searchBarStyle.inputSearchBar
                                }
                                inputStyle={searchBarStyle.input}
                                placeholderTextColor={COLORS['orchid'][400]}
                                searchIcon={searchBarStyle.seachIcon}
                                clearIcon={searchBarStyle.clearIcon}
                            />

                            {searchUsername.length > 0 &&
                                searchUserList.length > 0 && (
                                    <ScrollView
                                        className="mt-1 h-24 w-fit overflow-auto"
                                        contentContainerStyle={{
                                            flexDirection: 'row',
                                            flexGrow: 1,
                                        }}
                                    >
                                        <View className="flex h-full w-full flex-row flex-wrap items-start justify-start overflow-auto">
                                            {searchUserList.map(
                                                (user, index) => (
                                                    <TouchableOpacity
                                                        key={index}
                                                        className="mx-1 my-2 rounded-full bg-orchid-100 px-3 py-1.5 shadow-sm"
                                                        onPress={() =>
                                                            tagUser(index)
                                                        }
                                                    >
                                                        <Text className="text-sm text-orchid-900">
                                                            {user.username}
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            )}
                                        </View>
                                    </ScrollView>
                                )}
                        </View>
                    )}
                </View>

                {taggedUsers.length > 0 && (
                    <View className="w-full space-y-1">
                        <View className="flex w-full flex-col items-start justify-start">
                            <Text className="text-orchid-900">
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
                                <View className="mx-1 my-2 flex flex-row items-center justify-center space-x-2 rounded-full bg-orchid-100 px-3 py-1.5 shadow-sm">
                                    <View>
                                        <Text className="text-sm text-orchid-900">
                                            {user.username}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => removeTaggedUser(index)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCircleXmark}
                                            color={COLORS['orchid'][800]}
                                            size={SIZES['xMarkIconSizeTag']}
                                        />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                )}

                <View className="h-fit w-full flex-row items-center justify-center space-x-2">
                    {pickedImages.length >= 0 && pickedImages.length < 5 && (
                        <TouchableOpacity
                            onPress={() => pickingImageHandler()}
                            className="flex h-16 w-16 items-center justify-center space-y-1 rounded-lg bg-orchid-100"
                        >
                            <FontAwesomeIcon
                                icon={faPlus}
                                color={COLORS.orchid[900]}
                                size={SIZES.postImageIconSize}
                            />
                            <Text className="text-xs text-orchid-900">
                                Images
                            </Text>
                        </TouchableOpacity>
                    )}
                    {pickedImages.length > 0 &&
                        pickedImages.map((imageInfo, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => setImageViewerVisible(true)}
                                >
                                    <View className="relative h-16 w-16 bg-transparent">
                                        <Image
                                            source={{
                                                uri: imageInfo.uri,
                                            }}
                                            className="h-16 w-16 rounded-lg"
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
                                </TouchableOpacity>
                            )
                        })}
                    {pickedImages.length < 5 &&
                        Array.from(
                            {
                                length: 4 - pickedImages.length,
                            },
                            (_, i) => (
                                <View className="h-16 w-16 rounded-lg bg-slate-100"></View>
                            )
                        )}
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
                                unfilledColor={COLORS.orchid[100]}
                                color={COLORS.orchid[500]}
                            />
                        </View>
                        <Text>{Math.round(uploadProgress * 100)}%</Text>
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
                            {pickedImages?.length}/5 images selected
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
                        onPress={() => handleCancelPopup()}
                        className="bg-gray-300"
                    >
                        <Text className="justify-center text-base  text-orchid-900">
                            {' '}
                            {STRINGS.cancel}
                        </Text>
                    </PostButton>
                </View>
            </View>
        </>
    )
}

export default NewPost
