import React, { useCallback, useEffect, useState } from 'react'

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
import communityIcon from '../../../assets/images/communitybg4.png'

import STRINGS from '../../constants/strings'

import RequestItem from './components/RequestItem'

import { useRoute } from '@react-navigation/native'

import { getDatetime } from '../../utils/Utils'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleXmark, faSync } from '@fortawesome/free-solid-svg-icons'
import COLORS from '../../constants/colors'
import SIZES from '../../constants/sizes'

const CommunityView = ({ nav }) => {
    const [refreshing, setRefreshing] = useState(false)
    const [refreshingPendingRequests, setRefreshingPendingRequests] =
        useState(false)
    const [isHost, setIsHost] = useState(false)
    const [isModerator, setIsModerator] = useState(false)
    const [isPublicCommunity, setIsPublicCommunity] = useState(true)
    const [isJoined, setIsJoined] = useState(false)
    const [isWaiting, setIsWaiting] = useState(false)

    const navigation = useNavigation()

    const [communityInfo, setCommunityInfo] = useState({
        name: 'Community Name',
        host: 'Host Name',
        members: 0,
        posts: 0,
        description: STRINGS.exanple_text,
        rules: STRINGS.exanple_text,
    })

    const [requests, setRequests] = useState([
        {
            userId: '1',
            name: 'Vo, Thuan',
            dateTime: getDatetime(),
        },
        {
            userId: '2',
            name: 'Tran, Doan',
            dateTime: getDatetime(),
        },
        {
            userId: '1',
            name: 'Vo, Thuan',
            dateTime: getDatetime(),
        },
        {
            userId: '2',
            name: 'Tran, Doan',
            dateTime: getDatetime(),
        },
    ])

    const [owner, setOwner] = useState({})

    const [globalCommunityId, setGlobalCommunityId] = useState(
        useRoute().params.communityId
    )
    const [members, setMembers] = useState([{}])

    const onRefresh = useCallback(() => {
        getCommunityInfo()
        getVerified()
        getPendingRequests()
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
                // split and strip the string
                // const membersListAsArray = getListFromString(res.data.members)
                setMembers(res.data.members)

                // updade only name, description and rules fields
                setCommunityInfo({
                    name: res.data.name,
                    description: res.data.description,
                    rules: res.data.rules,
                    posts: res.data.posts,
                    followers: res.data.followers,
                    members: res.data.members.length,
                    owner: res.data.owner,
                    image: res.data.image,
                    // fake moderator
                    moderators: res.data.moderators,
                })
            })
            .catch((err) => {
                console.log(err)
            })

        return () => {}
    }

    const getUser = async () => {
        const userId = await AsyncStorage.getItem('userId')
        return userId
    }

    useEffect(() => {
        getUserInfo(communityInfo.owner)

        getUser().then((userId) => {
            setIsHost(communityInfo.owner === userId)
        })
    }, [communityInfo.owner])

    useEffect(() => {
        getUserInfo(communityInfo.owner)

        if (communityInfo.moderators) {
            getUser().then((userId) => {
                setIsModerator(communityInfo.moderators.includes(userId))
            })
        }
    }, [communityInfo])

    const getUserInfo = async (id) => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/user/get?userId=${id}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setOwner(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getPendingRequests = async (communityId) => {
        setRefreshingPendingRequests(false)
        axios({
            method: 'GET',
            url: `${BASE_URL}/community/getPendingRequests?communityId=${globalCommunityId}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setRequests(res.data)
                setRefreshingPendingRequests(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getListFromString = (string) => {
        if (string === '') {
            return []
        }
        return string.split(',').map((item) => item.trim())
    }

    useEffect(() => {
        checkIfPublic()
        getCommunityInfo()
        getVerified()
        getPendingRequests()
    }, [])

    const checkIfJoined = async () => {
        getUser().then((userId) => {
            for (let i = 0; i < members.length; i++) {
                if (members[i].memberId === userId) {
                    setIsJoined(true)
                    return
                }
            }
            setIsJoined(false)
        })
    }

    const isWaitingForApproval = async () => {
        getUser().then((userId) => {
            for (let i = 0; i < members.length; i++) {
                if (members[i].memberId === userId) {
                    if (members[i].status === 'PENDING') {
                        setIsWaiting(true)
                        return
                    } else if (members[i].status === 'APPROVED') {
                        setIsWaiting(false)
                        return
                    }
                }
            }
        })
    }

    const leaveCommunity = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId')
            await axios.post(
                `${BASE_URL}/community/leave`,
                {
                    userId,
                    communityId: globalCommunityId,
                },
                { headers: { 'Content-Type': 'application/json' } }
            )
            Alert.alert('Success', 'You have left the community.')
            getCommunityInfo()
        } catch (err) {
            console.error(err)
            Alert.alert('Error', 'Unable to leave the community.')
        }
    }

    useEffect(() => {
        checkIfJoined()
        isWaitingForApproval()
    }, [members])

    const checkIfPublic = async () => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/community/getVisibility?id=${globalCommunityId}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setIsPublicCommunity(Boolean(res.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }

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
                getCommunityInfo()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    

    const getVerified = async () => {
        axios({
            method: 'POST',
            url: `${BASE_URL}/user/verify`,
            data: {
                userId: await AsyncStorage.getItem('userId'),
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                // setIsHost(true)
            })
            .catch((err) => {
                console.log(err)
                // setIsHost(false)
            })
    }

    // const addNewMember = async () => {
    //     members.push(await AsyncStorage.getItem('userId'))
    // }

    const viewPosts = () => {
        // Alert.alert('Viewing Posts')
        navigation.navigate('Post', {
            communityId: globalCommunityId,
            isJoined: isJoined,
        })
    }

    const viewAllReports = () => {
        getUser().then((userId) => {
            navigation.navigate(STRINGS.reportscreen, {
                communityId: globalCommunityId,
                moderatorId: userId,
            })
        })
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
                    paddingTop: 24,
                    paddingHorizontal: 24,
                    paddingBottom: 150,
                }}
                className="h-screen w-screen overflow-auto bg-white"
                onTouchStart={Keyboard.dismiss}
            >
                <ImageBackground
                    source={
                        communityInfo.image && communityInfo.image != ''
                            ? {
                                  uri: `data:image/jpg;base64,${communityInfo.image}`,
                              }
                            : communityBg
                    }
                    resizeMode="cover"
                    borderRadius={24}
                    blurRadius={
                        communityInfo.image && communityInfo.image != ''
                            ? 20
                            : 10
                    }
                    imageStyle={{
                        opacity: 0.75,
                    }}
                    className="mb-5 flex h-fit w-full flex-col items-center
                    justify-center rounded-3xl bg-black py-12 shadow-md
                    shadow-slate-300 brightness-0"
                >
                    <View className="mb-5 flex h-fit w-28 items-center justify-center rounded-full bg-white shadow shadow-slate-600">
                        <Image
                            source={
                                communityInfo.image && communityInfo.image != ''
                                    ? {
                                          uri: `data:image/jpg;base64,${communityInfo.image}`,
                                      }
                                    : communityIcon
                            }
                            className="h-40 w-40 rounded-full"
                        />
                    </View>
                    <View className="mb-5 flex items-center justify-center">
                        <Text className="text-2xl font-semibold text-white shadow shadow-slate-600">
                            {communityInfo.name}
                        </Text>
                        {isJoined && !isHost && (
                            <TouchableOpacity
                                onPress={() =>
                                    Alert.alert(
                                        'Leave Community',
                                        'Are you sure you want to leave?',
                                        [
                                            { text: 'Cancel', style: 'cancel' },
                                            {
                                                text: 'Yes',
                                                onPress: () =>
                                                    leaveCommunity(),
                                            },
                                        ]
                                    )
                                }
                                className="mt-3 flex h-fit w-fit flex-row flex-wrap items-center justify-center rounded-full bg-red-500 px-5 py-2 shadow shadow-slate-600"
                            >
                                <Text className="text-md text-white">
                                    {STRINGS.leaveCommunity || 'Leave'}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View className="mb-5 flex items-center justify-center">
                        <View className="mb-1 flex flex-row gap-2">
                            <Text className="text-2xl font-semibold text-white shadow shadow-slate-600">
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
                        <Text className="mb-1 text-base text-white shadow shadow-slate-600">
                            Host by {owner.lname}, {owner.fname}
                        </Text>
                        <View className="flex flex-row items-center justify-center gap-5">
                            <Text className="text-base text-white shadow shadow-slate-600">
                                {communityInfo.members} Followers
                            </Text>
                        </View>
                    </View>
                    <View className="flex flex-row items-center justify-center gap-5">
                        {!isJoined && !isHost && isPublicCommunity ? (
                            <TouchableOpacity
                                onPress={() => joinCommunity()}
                                className="flex h-fit w-fit flex-row flex-wrap items-center justify-center rounded-full bg-white px-5 py-2 shadow shadow-slate-600"
                            >
                                <Text className="text-md text-orchid-900">
                                    {STRINGS.joinUs}
                                </Text>
                            </TouchableOpacity>
                        ) : !isJoined &&
                          !isWaiting &&
                          !isPublicCommunity &&
                          !isHost ? (
                            <TouchableOpacity
                                onPress={() => joinCommunity()}
                                className="flex h-fit w-fit flex-row flex-wrap items-center justify-center rounded-full bg-white px-5 py-2 shadow shadow-slate-600"
                            >
                                <Text className="text-md text-orchid-900">
                                    {STRINGS.requestJoin}
                                </Text>
                            </TouchableOpacity>
                        ) : (isPublicCommunity || isJoined || isHost) &&
                          !isWaiting ? (
                            <TouchableOpacity
                                onPress={viewPosts}
                                className="flex h-fit w-fit flex-row flex-wrap items-center justify-center rounded-full bg-white px-5 py-2 shadow shadow-slate-600"
                            >
                                <Text className="text-md text-orchid-900">
                                    {STRINGS.viewPosts}
                                </Text>
                            </TouchableOpacity>
                        ) : isWaiting ? (
                            <View
                                className="flex h-fit w-fit flex-row flex-wrap
                                items-center justify-center rounded-full
                                bg-white px-5 py-2 shadow shadow-slate-600"
                            >
                                <Text className="text-md text-orchid-900">
                                    Waiting for Approval
                                </Text>
                            </View>
                        ) : (
                            <></>
                        )}
                    </View>
                </ImageBackground>

                {isHost && !isPublicCommunity && (
                    <View>
                        <View className="mb-5 flex h-fit w-full flex-col items-start justify-start rounded-3xl bg-white p-5 shadow-md shadow-slate-300">
                            <View className="flex w-full flex-row items-center justify-between">
                                <Text className="mb-2 text-2xl font-bold text-orchid-900">
                                    {STRINGS.requestToJoin}
                                </Text>
                                {refreshingPendingRequests && (
                                    <TouchableOpacity
                                        onPress={() => getPendingRequests()}
                                    >
                                        <FontAwesomeIcon
                                            icon={faSync}
                                            color={COLORS['orchid'][900]}
                                            size={SIZES['xMarkIconSizeTag']}
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                            {requests.length > 0 && (
                                <ScrollView
                                    horizontal={false}
                                    contentContainerStyle={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        flexGrow: 1,
                                        backgroundColor: 'white',
                                    }}
                                    className="h-64 w-full space-y-2 overflow-auto bg-white"
                                >
                                    {requests.map((request, index) => (
                                        <View key={index}>
                                            <RequestItem
                                                key={index}
                                                requestData={request}
                                                setRequests={setRequests}
                                            />
                                        </View>
                                    ))}
                                </ScrollView>
                            )}
                        </View>
                    </View>
                )}

                {(isHost || isModerator) && (
                    <View>
                        <View className="mb-5 flex h-fit w-full flex-col items-center justify-start rounded-3xl bg-white p-5 shadow-md shadow-slate-300">
                            <View className="flex w-full flex-row items-center justify-between">
                                <Text className="text-2xl font-bold text-orchid-900">
                                    {STRINGS.review_reports}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => viewAllReports()}
                                    className="flex h-fit w-fit flex-row flex-wrap items-center justify-center rounded-full bg-gold-900 px-3 py-2 "
                                >
                                    <Text className="text-md text-orchid-900">
                                        View All
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}

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
