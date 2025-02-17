import {
    TouchableOpacity,
    View,
    Text,
    ActivityIndicator,
    KeyboardAvoidingView,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { BASE_URL } from '@env'
import { Alert } from 'react-native';
import { useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'

import { RefreshControl } from 'react-native'
import { ImageBackground, Image, Keyboard, Modal } from 'react-native'
import profileBg from '../../../assets/images/profileBg.png'
import profile_icon_f from '../../../assets/images/profile_icon_f.png'
import profile_icon_m from '../../../assets/images/profile_icon_m.png'
import profile_icon_x from '../../../assets/images/profile_icon_x.png'
import COLORS from '../../constants/colors'
import { faAward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import InterestSelector from './InterestSelector'
import SIZES from '../../constants/sizes'
import STRINGS from '../../constants/strings'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Constants from 'expo-constants'
import { useHeaderHeight } from '@react-navigation/elements'
import PersonalBioEditor from './PersonalBioEditor'

// -- NEW IMPORT for SkillSelector
import SkillSelector from './SkillSelector'
import * as ImagePicker from 'expo-image-picker';

const Profile = ( ) => {
    const [userId, setUserId] = useState('')
    const [userInfo, setUserInfo] = useState({})
    const [refreshing, setRefreshing] = useState(false)
    const [isTopicSelectorModalVisible, setIsTopicSelectorModalVisible] = useState(false)
    const [verify, setVerify] = useState(false)
    const [selectedTopic, setSelectedTopic] = useState({})
    const [interestList, setInterestList] = useState({})
    const [jobStatus, setJobStatus] = useState('');
const [jobDetails, setJobDetails] = useState('');
const [profileBio, setProfileBio] = useState('');
const [profileImage, setProfileImage] = useState('');
const navigation = useNavigation()
const [posts, setPosts] = useState([]);
const [relationshipStatus, setRelationshipStatus] = useState('');
const [isJobRelationshipModalVisible, setIsJobRelationshipModalVisible] =
    useState(false);

    // -- NEW STATES for SKILLS
    const [selectedSkills, setSelectedSkills] = useState({})
    const [isSkillSelectorModalVisible, setIsSkillSelectorModalVisible] = useState(false)
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

    useEffect(() => {
        getUserId();
    }, []);

    useEffect(() => {
        if (userId) {
            //fetchUserPosts();
            fetchSharedPosts();
            //fetchTaggedPosts();
        }
    }, [userId]);

    const getUserId = async () => {
        const id = await AsyncStorage.getItem('userId');
        setUserId(id);
    };

    // const fetchUserPosts = async () => {
    //     axios({
    //         method: 'GET',
    //         url: `${BASE_URL}/user/getPosts?userId=${userId}`,
    //         headers: { 'Content-Type': 'application/json' },
    //     })
    //         .then((res) => {
    //             setPosts((prevPosts) => [...prevPosts, ...res.data.map(post => ({ ...post, type: 'Personal' }))]);
    //         })
    //         .catch((err) => {
    //             console.log('Cannot fetch user posts', err);
    //         });
    // };

    const fetchSharedPosts = async () => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/post/getSharedPosts?userId=${userId}`,
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => {
                setPosts((prevPosts) => [...prevPosts, ...res.data.map(post => ({ ...post, type: 'Shared' }))]);
            })
            .catch((err) => {
                console.log('Cannot fetch shared posts', err);
            });
    };
    

    // const fetchTaggedPosts = async () => {
    //     axios({
    //         method: 'GET',
    //         url: `${BASE_URL}/user/getTaggedPosts?userId=${userId}`,
    //         headers: { 'Content-Type': 'application/json' },
    //     })
    //         .then((res) => {
    //             setPosts((prevPosts) => [...prevPosts, ...res.data.map(post => ({ ...post, type: 'Tagged' }))]);
    //         })
    //         .catch((err) => {
    //             console.log('Cannot fetch tagged posts', err);
    //         });
    // }

    const navigateToPosts = () => {
        navigation.navigate('Post', {
            userId: userId,
        })
    }

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
            .then(() => {
                setVerify(true)
            })
            .catch((err) => {
                console.log('cannot verify' + err)
                setVerify(false)
            })
    }


    
    const handlePickImage = async () => {
        // // Request media library permissions
        // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        // if (status !== 'granted') {
        //     Alert.alert(
        //         'Permission Required',
        //         'We need media library permissions to let you pick an image.'
        //     );
        //     return;
        // }

        // Open media library
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                base64: true,
                aspect: [1, 1], // Square image2w
                quality: 1,
            });

            if (!result.canceled) {
                const base64Image = result.assets[0].base64;
                handleUploadImage(base64Image);
            }
        } catch (error) {
            console.error('Error picking an image:', error);
            Alert.alert('Error', 'Unable to pick an image. Please try again.');
        }
    };

    const handleUploadImage = async (base64Image) => {
        try {
            const response = await axios.post(`${BASE_URL}/user/editProfileImage`, {    
                userId,
                image: base64Image,
            });
            if (response.status === 200) {
                Alert.alert('Success', 'Profile image updated successfully!');
                setProfileImage(base64Image); // Update the profile image locally
                getUserInfo(userId); // Refresh user info
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error', 'Failed to update the profile image. Please try again.');
        }
    };
    
    
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

    // ---------------------------
    // PERSIST INTERESTS (existing)
    // ---------------------------
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
                console.log('cannot save interest ' + err)
            })
    }
    useEffect(() => {
        if (selectedTopic && Object.keys(selectedTopic).length !== 0) {
            saveInterests()
        }
    }, [selectedTopic])

    // ---------------------------
    // PERSIST SKILLS (new)
    // ---------------------------
    const saveSkills = async () => {
        // Turn { '0': 'JavaScript', '1': 'Python' } -> "JavaScript,Python"
        const skillArray = Object.keys(selectedSkills).map((key) => selectedSkills[key])
        const selectedSkillsString = skillArray.join(',')

        axios({
            method: 'POST',
            url: `${BASE_URL}/user/editSkills`,
            data: {
                userId: userId,
                selectedSkills: selectedSkillsString,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(() => {
                // If you need to handle the response, do it here
                // console.log('Skills saved successfully')
            })
            .catch((err) => {
                console.log('cannot save skills ' + err)
            })
    }
    useEffect(() => {
        if (selectedSkills && Object.keys(selectedSkills).length !== 0) {
            saveSkills()
        }
    }, [selectedSkills])

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
                const data = res.data
                setUserInfo(data)
                setProfileBio(data.bio || '')
                setJobStatus(data.jobStatus || '')
                setJobDetails(data.jobDetails || '')
                setRelationshipStatus(data.relationshipStatus || '')

                // If the server returns data.skills as an array
                if (data.skills && Array.isArray(data.skills)) {
                    // Convert that array to an object with numeric keys
                    const skillObj = {}
                    data.skills.forEach((skill, idx) => {
                        skillObj[idx] = skill
                    })
                    setSelectedSkills(skillObj)
                }
            })
            .catch((err) => {
                console.log('Cannot get user info' + err)
            })
    }

    useEffect(() => {
        setSelectedTopic(userInfo.interest)
    }, [userInfo.interest])

    const editProfile = () => {
        setIsTopicSelectorModalVisible(true)
    }

    const formatDob = (dob) => {
        const date = new Date(dob)
        return date.toLocaleDateString()
    }

    return (
        <View style={{ flex: 1 }} className="flex h-screen w-screen">
            <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1 }}
                keyboardVerticalOffset={useHeaderHeight()}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
                                <View className="height-fit relative w-fit">
                                    <View className="mb-5 flex h-fit w-28 items-center justify-center rounded-full bg-white shadow shadow-slate-600">
                                    <Image
    source={
      userInfo?.image && userInfo.image.trim().length
        ? { uri: `data:image/jpeg;base64,${userInfo.image}` }
        : userInfo.gender === 'Female'
          ? profile_icon_f
          : userInfo.gender === 'Male'
            ? profile_icon_m
            : profile_icon_x
    }
    className="h-40 w-40 rounded-full"
  />
                                    </View>
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



                                <View className="mb-5 flex h-fit w-full flex-col items-start justify-start rounded-3xl bg-white p-5 shadow-md shadow-slate-300">
                                    <View className="mb-1 flex flex-row gap-2">
                                        <Text className="mb-2 text-2xl font-bold text-orchid-900">
                                            {STRINGS.job_relationship_details}
                                        </Text>
                                    </View>

                                    {/* Job Status */}
                                    <View className="mb-2 flex flex-col items-start justify-center gap-2">
                                        <View className="flex flex-row items-start justify-start">
                                            <Text className="mr-3 text-base font-semibold text-orchid-800">
                                                Job Status:
                                            </Text>
                                            <Text className="text-base text-orchid-800">
                                                {jobStatus || 'Not specified'}
                                            </Text>
                                        </View>
                                        {jobStatus !== 'Other' && jobDetails && (
                                            <View className="flex flex-row items-start justify-start">
                                                <Text className="mr-3 text-base font-semibold text-orchid-800">
                                                    {jobStatus === 'Employed'
                                                        ? 'Job Details:'
                                                        : 'Field of Study:'}
                                                </Text>
                                                <Text className="text-base text-orchid-800">
                                                    {jobDetails}
                                                </Text>
                                            </View>
                                        )}
                                    </View>

                                    {/* Relationship Status */}
                                    <View className="mb-2 flex flex-col items-start justify-center gap-2">
                                        <View className="flex flex-row items-start justify-start">
                                            <Text className="mr-3 text-base font-semibold text-orchid-800">
                                                Relationship Status:
                                            </Text>
                                            <Text className="text-base text-orchid-800">
                                                {relationshipStatus || 'Not specified'}
                                            </Text>
                                        </View>
                                    </View>

    <TouchableOpacity onPress={() => setIsJobRelationshipModalVisible(true)}>
    <Ionicons
        name="create-outline"
        size={SIZES.mediumIconSize}
        color={COLORS['orchid'][900]}
    />
</TouchableOpacity>

<TouchableOpacity onPress={handlePickImage}>
    <View className="flex flex-col items-center">
        <View className="mt-2">
            <TouchableOpacity
                style={{
                    backgroundColor: COLORS['orchid'][800],
                    borderRadius: 20,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                }}
                onPress={handlePickImage}
            >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    Change Profile Photo
                </Text>
            </TouchableOpacity>
        </View>
    </View>
</TouchableOpacity>




</View>


                                <View className="mb-5 flex items-center justify-center">
                                    <View className="mb-1 flex flex-row gap-1">
                                        <Text className="text-2xl font-semibold text-white shadow shadow-orchid-600">
                                            {userInfo.lname}, {userInfo.fname}
                                        </Text>
                                    </View>
                                    {verify && (
                                        <Text className="text-lg italic text-white shadow shadow-orchid-600">
                                            {STRINGS.profesional_account}
                                        </Text>
                                    )}
                                   <Text
    className="text-base text-orchid-800 bg-white px-2 py-1 rounded-md shadow"
>
    {profileBio}
</Text>

                                </View>

                                <View className="flex flex-row items-center justify-center gap-5" />
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

                                {/* Interests */}
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
                                        Object.keys(selectedTopic).map((key) => {
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
                                        })}
                                </View>

                                {/* Skills */}
                                <View className="mb-3 flex flex-row items-center gap-2">
                                    <Text className="text-base font-semibold text-orchid-800">
                                        Skills
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => setIsSkillSelectorModalVisible(true)}
                                    >
                                        <Ionicons
                                            name="create-outline"
                                            size={SIZES.mediumIconSize}
                                            color={COLORS['orchid'][900]}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View className="my-1 flex flex-grow flex-row flex-wrap gap-2">
                                    {selectedSkills &&
                                        Object.keys(selectedSkills).map((key) => {
                                            return (
                                                <View
                                                    key={key}
                                                    className="rounded-full bg-orchid-100 px-3 py-1 "
                                                >
                                                    <Text className="text-base text-orchid-900">
                                                        {selectedSkills[key]}
                                                    </Text>
                                                </View>
                                            )
                                        })}
                                </View>
                            </View>

                            {/* INTERESTS MODAL */}
                            <Modal
                                presentationStyle="pageSheet"
                                visible={isTopicSelectorModalVisible}
                                transparent={false}
                                animationType="slide"
                            >
                                <InterestSelector
                                    key={Math.random()}
                                    setModalVisibility={setIsTopicSelectorModalVisible}
                                    selectedTopic={selectedTopic}
                                    setSelectedTopic={setSelectedTopic}
                                />
                            </Modal>

                            {/* SKILLS MODAL */}
                            <Modal
                                presentationStyle="pageSheet"
                                visible={isSkillSelectorModalVisible}
                                transparent={false}
                                animationType="slide"
                            >
                                <SkillSelector
                                    setModalVisibility={setIsSkillSelectorModalVisible}
                                    selectedSkills={selectedSkills}
                                    setSelectedSkills={setSelectedSkills}
                                />
                            </Modal>

                            {/* JOB/RELATIONSHIP MODAL */}
                            {isJobRelationshipModalVisible && (
                                <Modal
                                    presentationStyle="pageSheet"
                                    visible={isJobRelationshipModalVisible}
                                    transparent={false}
                                    animationType="slide"
                                >
                                    <PersonalBioEditor
                                        setModalVisibility={setIsJobRelationshipModalVisible}
                                        userId={userId}
                                        profileBio={profileBio}
                                        setProfileBio={setProfileBio}
                                        jobStatus={jobStatus}
                                        setJobStatus={setJobStatus}
                                        jobDetails={jobDetails}
                                        setJobDetails={setJobDetails}
                                        relationshipStatus={relationshipStatus}
                                        setRelationshipStatus={setRelationshipStatus}
                                    />
                                </Modal>
                            )}
                        </>
                    ) : (
                        <ActivityIndicator />
                    )}

<Text className="text-2xl font-bold text-orchid-900 mb-4">
                {STRINGS.profilePosts}
            </Text>
            <TouchableOpacity 
                onPress={navigateToPosts} 
                className="mb-4 p-2 bg-orchid-900 rounded-full text-center">
                <Text className="text-white font-bold text-center">View My Posts</Text>
            </TouchableOpacity>
            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <PostItem
                        key={index}
                        post={post}
                        userId={userId}
                        displayCommunityName={!!post.community_id}
                        postType={post.type}
                    />
                ))
            ) : (
                <Text className="text-lg text-center text-orchid-600">
                    {STRINGS.noPostsAvailable}
                </Text>
            )}
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default Profile
