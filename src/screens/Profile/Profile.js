import {
    TouchableOpacity,
    View,
    Text,
    ActivityIndicator,
    KeyboardAvoidingView, Alert,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '@env'
import { ScrollView } from 'react-native-gesture-handler'
import { RefreshControl } from 'react-native'
import { useCallback } from 'react'
import { ImageBackground } from 'react-native'
import profileBg from '../../../assets/images/profileBg.png'
import { Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import profile_icon_f from '../../../assets/images/profile_icon_f.png'
import profile_icon_m from '../../../assets/images/profile_icon_m.png'
import profile_icon_x from '../../../assets/images/profile_icon_x.png'
import { Keyboard } from 'react-native'
import COLORS from '../../constants/colors'
import { faAward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Modal } from 'react-native'
import InterestSelector from './InterestSelector'
import SIZES from '../../constants/sizes'
import STRINGS from '../../constants/strings'
import Constants from 'expo-constants'
import { useHeaderHeight } from '@react-navigation/elements'
import * as ImagePicker from "expo-image-picker";

const Profile = () => {
    const [userId, setUserId] = useState('')
    const [userInfo, setUserInfo] = useState({})
    const [refreshing, setRefreshing] = useState(false)
    const [isTopicSelectorModalVisible, setIsTopicSelectorModalVisible] =
        useState(false)
    const [verify, setVerify] = useState(false)
    const [selectedTopic, setSelectedTopic] = useState({})
    const interestInteger = parseInt(userInfo.interest)
    const [interestList, setInterestList] = useState({})
    const [profileImage, setProfileImage] = useState('')

    useEffect(() => {
        getVerified()
        const findUserInfoById = async () => {
            try {
                const value = await AsyncStorage.getItem('userId')
                if (value !== null) {
                    setUserId(value)
                }
            } catch (e) {
                console.log('cannot get verify' + e)
            }
        }
        findUserInfoById()
    }, [])

    const onRefresh = useCallback(() => {
        getVerified()
        getUserInfo()
    }, [refreshing])

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
                setVerify(true)
            })
            .catch((err) => {
                console.log('cannot verify' + err)
                setVerify(false)
            })
    }

    const getTopics = async (name) => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/interest/getByName?name=${name}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setInterestList(res.data)
            })
            .catch((err) => {
                console.log('Cannot get the interest list', err)
            })
    }

    const saveInterests = async () => {
        const selectedTopicString = Object.keys(selectedTopic).join(',')

        axios({
            method: 'POST',
            url: `${BASE_URL}/user/editInterest`,
            data: {
                userId: userId,
                selectedTopic: selectedTopicString,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                Object.keys(selectedTopic).map((key) => {
                    if (selectedTopic[key] === res.data[key]) {
                        setSelectedTopic(res.data)
                    }
                })
            })
            .catch((err) => {
                console.log('cannot save in' + err)
            })
    }

    useEffect(() => {
        // check if the selected topic is empty
        if (
            selectedTopic !== undefined &&
            Object.keys(selectedTopic).length !== 0
        ) {
            saveInterests()
        }
    }, [selectedTopic])

    useEffect(() => {
        if (userId !== '') {
            getUserInfo()
        }
    }, [userId])

    const getUserInfo = async () => {
        setUserInfo({})
        axios({
            method: 'GET',
            url: `${BASE_URL}/user/get?userId=${userId}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setUserInfo(res.data)
            })
            .catch((err) => {
                console.log('Cannot get user info' + err)
            })
    }

    useEffect(() => {
        setSelectedTopic(userInfo.interest)
    }, [userInfo.interest])

    useEffect(() => {
        if (userInfo.image != null) {
            setProfileImage(userInfo.image)
        } else {
            setProfileImage('')
        }
    }, [userInfo.image])

    const editProfile = () => {
        setIsTopicSelectorModalVisible(true)
    }

    const formatDob = (dob) => {
        const date = new Date(dob)
        return date.toLocaleDateString()
    }

    const pickingImageHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 0.5,
            aspect: [1, 1],
            base64: true,
            allowsEditing: true,
        })
        // console.log(result.assets[0].base64)
        if (!result.canceled) {
            axios({
                method: 'POST',
                url: `${BASE_URL}/user/editProfileImage`,
                data: {
                    userId: userId,
                    image: result.assets[0].base64,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    Alert.alert('Successful', 'Profile image updated')
                    setProfileImage(result.assets[0].base64) // only change the profile image from the app view if it has already been saved to the database!
                })
                .catch((err) => {
                    Alert.alert('Unsuccessful', 'Profile image not updated')
                    setProfileImage('') // revert back to the default profile image.
                })
        } else {
            // alert('You did not select any image.')
        }
    }

    return (
        <View className="flex h-screen w-screen">
            <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1 }}
                keyboardVerticalOffset={useHeaderHeight()}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    horizontal={false}
                    contentContainerStyle={{
                        paddingBottom: Constants.statusBarHeight,
                        minHeight: '100%',
                    }}
                    className="flex h-screen w-screen overflow-auto bg-white px-6 py-4"
                    onTouchStart={Keyboard.dismiss}
                >
                    {Object.keys(userInfo).length > 0 ? (
                        <>
                            <ImageBackground
                                source={profileBg}
                                resizeMode="cover"
                                opacity={0.9}
                                borderRadius={24}
                                blurRadius={7}
                                className="mb-5 flex h-fit w-full flex-col items-center justify-center rounded-3xl bg-black py-12 shadow-md shadow-slate-300 blur-3xl"
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        pickingImageHandler();
                                    }}
                                    activeOpacity={0.7} // adjusts the opacity when pressed.
                                >
                                    <View className="height-fit relative w-fit">
                                        {profileImage === '' && ( // default profile images.
                                            <View className="mb-5 flex h-fit w-28 items-center justify-center rounded-full bg-white shadow shadow-slate-600">
                                                {userInfo.gender === 'Female' && (
                                                    <Image
                                                        source={profile_icon_f}
                                                        className="h-40 w-40 rounded-full "
                                                    />
                                                )}
                                                {userInfo.gender === 'Male' && (
                                                    <Image
                                                        source={profile_icon_m}
                                                        className="h-40 w-40 rounded-full "
                                                    />
                                                )}
                                                {userInfo.gender !== 'Female' &&
                                                    userInfo.gender !== 'Male' && (
                                                        <Image
                                                            source={profile_icon_x}
                                                            className="h-40 w-40 rounded-full "
                                                        />
                                                    )}
                                            </View>
                                        )}
                                        {profileImage !== '' && (
                                            <View className="mb-5 flex h-fit w-28 items-center justify-center rounded-full bg-white shadow shadow-slate-600">
                                                <Image
                                                    source={{
                                                        uri: `data:image/jpg;base64,${profileImage}`,
                                                    }}
                                                    className="h-40 w-40 rounded-full "
                                                />
                                            </View>
                                        )}
                                        {verify && (
                                            <View className="absolute bottom-3 right-1">
                                                <FontAwesomeIcon
                                                    icon={faAward}
                                                    size={35}
                                                    color={COLORS['gold'][900]}
                                                />
                                            </View>
                                        )}
                                    </View>
                                </TouchableOpacity>
                                <View className="mb-5 flex items-center justify-center">
                                    <View className="mb-1 flex flex-row gap-1">
                                        <Text className="text-2xl font-semibold text-white shadow shadow-orchid-600">
                                            {userInfo.lname}, {userInfo.fname}
                                        </Text>
                                        {/* <Text className="text-base text-orchid-800 shadow shadow-orchid-600">
                                            {verify && (
                                                <FontAwesomeIcon
                                                    icon={faAward}
                                                    size={30}
                                                    color={COLORS['gold'][900]}
                                                />
                                            )}
                                        </Text> */}
                                    </View>
                                    {verify && (
                                        <Text className="text-lg italic text-white shadow shadow-orchid-600">
                                            {STRINGS.profesional_account}
                                        </Text>
                                    )}
                                    <Text className="text-base text-orchid-800 ">
                                        {}
                                    </Text>
                                </View>
                                <View className="flex flex-row items-center justify-center gap-5"></View>
                            </ImageBackground>

                            <View className="mb-5 flex h-fit w-full flex-col items-start justify-start rounded-3xl bg-white p-5 shadow-md shadow-slate-300">
                                <View className="mb-1 flex flex-row gap-2">
                                    <Text className="mb-2 text-2xl font-bold text-orchid-900">
                                        {STRINGS.details}
                                    </Text>
                                </View>

                                <View className="mb-2 flex flex-col items-start justify-center gap-2">
                                    <View className="flex flex-row items-start justify-start">
                                        <Text className="mr-3 text-base font-semibold text-orchid-800">
                                            {STRINGS.dob_details}
                                        </Text>
                                        <Text className="text-base text-orchid-800">
                                            {formatDob(userInfo.dob)}
                                        </Text>
                                    </View>
                                </View>

                                <View className="mb-3 flex flex-row items-center gap-2">
                                    <Text className="text-base font-semibold text-orchid-800">
                                        {STRINGS.interests_details}
                                    </Text>
                                    <TouchableOpacity onPress={editProfile}>
                                        <Ionicons
                                            name="create-outline"
                                            size={SIZES.mediumIconSize}
                                            color={COLORS['orchid'][900]}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View className="my-1 flex flex-grow flex-row flex-wrap gap-2">
                                    {selectedTopic &&
                                        Object.keys(selectedTopic).map(
                                            (key) => {
                                                return (
                                                    <View
                                                        key={key}
                                                        className="rounded-full bg-orchid-100 px-3 py-1 "
                                                    >
                                                        <Text className="text-base text-orchid-900">
                                                            {selectedTopic[key]}
                                                        </Text>
                                                    </View>
                                                )
                                            }
                                        )}
                                </View>
                            </View>

                            <Modal
                                presentationStyle="pageSheet"
                                visible={isTopicSelectorModalVisible}
                                transparent={false}
                                animationType="slide"
                            >
                                {/* safe area? */}

                                <InterestSelector
                                    key={Math.random()}
                                    setModalVisibility={
                                        setIsTopicSelectorModalVisible
                                    }
                                    selectedTopic={selectedTopic}
                                    setSelectedTopic={setSelectedTopic}
                                />
                            </Modal>
                        </>
                    ) : (
                        <ActivityIndicator />
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default Profile
