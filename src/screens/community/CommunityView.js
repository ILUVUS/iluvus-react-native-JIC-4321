import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { BASE_URL } from '@env'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

import {
    Keyboard,
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    ScrollView,
    RefreshControl,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomKeyboardAvoidingView from '../../components/CustomKeyboardAvoidingView'

import sampleIcon from '../../../assets/images/sampleicon.jpg'
import communityBg from '../../../assets/images/communitybg.jpg'
import STRINGS from '../../constants/strings'

import { signal } from '@preact/signals-react'

const CommunityView = (communityId = 'communityId') => {
    const [refreshing, setRefreshing] = React.useState(false)
    const [isHost, setIsHost] = useState(false)
    const [isPublicCommunity, setIsPublicCommunity] = useState(true)
    const [isJoined, setIsJoined] = useState(false)

    const navigation = useNavigation()

    const [communityInfo, setCommunityInfo] = useState({
        name: 'Community Name',
        host: 'Host Name',
        followers: 0,
        posts: 0,
        description: STRINGS.exanple_text,
        rules: STRINGS.exanple_text,
    })
    const [globalCommunityId, setGlobalCommunityId] = useState(
        communityId.route.params.communityId
    )
    const [members, setMembers] = useState([])

    const onRefresh = React.useCallback(() => {
        getCommunityInfo()
    }, [])

    const getCommunityInfo = async () => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/community/getInfo?id=${globalCommunityId}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                // updade only name, description and rules fields
                setCommunityInfo((prevState) => ({
                    ...prevState,
                    name: res.data.name,
                    description: res.data.description,
                    rules: res.data.rules,
                }))

                // split and strip the string
                membersListAsArray = res.data.members.split(',')
                const membersListTrimmed = membersListAsArray.map((member) =>
                    member.trim()
                )
                setMembers(membersListTrimmed)
            })
            .catch((err) => {
                console.log(err)
            })

        return () => {}
    }

    useEffect(() => {
        // This is the community ID it receives from the community list

        getCommunityInfo()
    }, [])

    const checkIfJoined = async () => {
        if (members.includes(await AsyncStorage.getItem('userId'))) {
            setIsJoined(true) // Update isJoined state using setIsJoined
        } else {
            setIsJoined(false) // Update isJoined state using setIsJoined
        }
    }

    useEffect(() => {
        checkIfJoined()
    }, [members])

    const joinCommunity = async () => {
        axios({
            method: 'POST',
            url: `${BASE_URL}/community/join`,
            data: {
                userId: await AsyncStorage.getItem('userId'),
                communityId: globalCommunityId,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                addNewMember()

                checkIfJoined()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const addNewMember = async () => {
        members.push(await AsyncStorage.getItem('userId'))
    }

    const viewPosts = () => {
        // Alert.alert('Viewing Posts')
        navigation.navigate('Post')
    }

    const editCommunity = () => {
        Alert.alert('Editing Community')
    }

    return (
        <View className="flex h-screen w-screen">
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                horizontal={false}
                contentContainerStyle={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexGrow: 1,
                    paddingVertical: 24,
                    paddingHorizontal: 24,
                }}
                className="h-screen w-screen overflow-auto bg-white"
                onTouchStart={Keyboard.dismiss}
            >
                <ImageBackground
                    source={communityBg}
                    resizeMode="cover"
                    imageStyle={{
                        borderRadius: 24,
                        opacity: 0.8,
                    }}
                    blurRadius={5}
                    className="mb-5 flex h-fit w-full flex-col items-center justify-center rounded-3xl  py-12 shadow-md shadow-orchid-300"
                >
                    <View className="mb-5 flex h-fit w-28 items-center justify-center rounded-full bg-transparent shadow shadow-orchid-600">
                        <Image
                            source={sampleIcon}
                            className="h-40 w-40 rounded-full "
                        />
                    </View>

                    <View className="mb-5 flex items-center justify-center">
                        <View className="mb-1 flex flex-row gap-2">
                            <Text className="text-2xl font-semibold text-white shadow shadow-orchid-600">
                                {communityInfo.name}
                            </Text>
                            {isHost && (
                                <TouchableOpacity onPress={editCommunity}>
                                    <Ionicons
                                        name="create-outline"
                                        size={26}
                                        color={'#fff'}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                        <Text className="mb-1 text-base text-white shadow shadow-orchid-600">
                            Host by {communityInfo.host}
                        </Text>
                        <View className="flex flex-row items-center justify-center gap-5">
                            <Text className="text-base text-white shadow shadow-orchid-600">
                                {communityInfo.followers} Followers
                            </Text>
                            <Text className="text-base text-white shadow shadow-orchid-600">
                                {communityInfo.posts} Posts
                            </Text>
                        </View>
                    </View>

                    <View className="flex flex-row items-center justify-center gap-5">
                        {!isJoined && (
                            <TouchableOpacity
                                onPress={() => joinCommunity()}
                                className="flex h-fit w-fit flex-row flex-wrap items-center justify-center rounded-full bg-white px-5 py-2 shadow shadow-orchid-600"
                            >
                                <Text className="text-md text-orchid-900">
                                    JOIN US
                                </Text>
                            </TouchableOpacity>
                        )}
                        {(isPublicCommunity || isJoined) && (
                            <TouchableOpacity
                                onPress={viewPosts}
                                className="flex h-fit w-fit flex-row flex-wrap items-center justify-center rounded-full bg-white px-5 py-2 shadow shadow-orchid-600"
                            >
                                <Text className="text-md text-orchid-900">
                                    VIEW POSTS
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </ImageBackground>

                <View className="mb-5 flex h-fit w-full flex-col items-start justify-start rounded-3xl bg-white p-5 shadow-md shadow-slate-300">
                    <Text className="mb-2 text-2xl font-bold text-orchid-900">
                        Description
                    </Text>
                    <Text className="text-base text-orchid-800">
                        {communityInfo.description}
                    </Text>
                </View>

                <View className="mb-5 flex h-fit w-full flex-col items-start justify-start rounded-3xl bg-white p-5 shadow-md shadow-slate-300">
                    <Text className="mb-2 text-2xl font-bold text-orchid-900">
                        Rules
                    </Text>
                    <Text className="text-base text-orchid-900">
                        {communityInfo.rules}
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default CommunityView
