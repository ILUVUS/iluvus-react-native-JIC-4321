import React from 'react'
import { useEffect, useState } from 'react'

import axios from 'axios'
import { BASE_URL } from '@env'
import { Image, SearchBar } from 'react-native-elements'
import {
    RefreshControl,
    ScrollView,
    Text,
    View,
    StatusBar,
    Dimensions,
    ActivityIndicator,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { debounce } from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { debounce } from 'lodash';
import sampleIcon from '../../../assets/images/sampleicon.jpg';
import SIZES from '../../constants/sizes'
import COLORS from '../../constants/colors'
import STRINGS from '../../constants/strings'
import sampleIcon from '../../../assets/images/sampleicon.jpg'
import communityIcon from '../../../assets/images/communitybg4.png'
import { inputStyle, searchBarStyle } from '../../../styles/style'
import {
    CommunityViewImageButton,
    CommunityViewMainButton,
} from '../../components/button'

import Constants from 'expo-constants'
const [searchResultList, setSearchResultList] = useState([]);
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckToSlot } from '@fortawesome/free-solid-svg-icons'

const Community = () => {
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [communityList, setCommunityList] = useState([])
    const [refreshing, setRefreshing] = React.useState(false)
    const [verify, setVerify] = useState(false)
    const [searchResultList, setSearchResultList] = useState([])
    const [communityListInfo, setCommunityListInfo] = useState([])
    const [userSearchList, setUserSearchList] = useState([]); 
    
    useEffect(() => {
        getVerified()
        fetchCommunityList()
    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        getVerified()
        fetchCommunityList()
        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }, [])

    const fetchCommunityList = async () => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/community/all`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setCommunityList(res.data)
            })
            .catch((err) => {})
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
                setVerify(true)
            })
            .catch((err) => {
                console.log(err)
                setVerify(false)
            })
    }

    const searchFunction = debounce(async (text) => {
        setSearchValue(text);
        
        if (text.length === 0) {
            setSearchResultList([]);
            setUserSearchList([]);
            return;
        }
    
        try {
            const [communityRes, userRes] = await Promise.all([
                axios.get(`${BASE_URL}/community/search?filter=${text}`),
                axios.get(`${BASE_URL}/user/search?filter=${text}`)
            ]);
    
            console.log("Community Search Response:", communityRes.data);
            console.log("User Search Response:", userRes.data);
    
            setSearchResultList(communityRes.data || []);
            setUserSearchList(userRes.data || []);

            
    
        } catch (err) {
            console.error("Search error:", err);
            Alert.alert("Error", "Failed to fetch search results. Please try again.");
        }
        
    }, 500);
    

    useEffect(() => {
        setCommunityListInfo([])
        const promises = Object.keys(communityList).map((key) =>
            getCommunityInfo(key)
        )
        Promise.all(promises).then((infos) => {
            setCommunityListInfo((prev) =>
                infos.map((info, index) => ({
                    id: Object.keys(communityList)[index],
                    name: info.name,
                    description: info.description,
                    rules: info.rules,
                    visibility: info.visibility,
                    ownerId: info.ownerId,
                    image: info.image,
                }))
            )
        })
    }, [communityList])

    const getCommunityInfo = async (id) => {
        try {
            const res = await axios({
                method: 'GET',
                url: `${BASE_URL}/community/getInfo?id=${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            return res.data
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    const newCommunity = () => {
        navigation.navigate('SetupCommunity')
    }

    const myCommunity = () => {
        navigation.navigate('MyGroup')
    }

    const myFriend = () => {
        // navigation.navigate('SetupCommunity')
    }

    const myCreatedGroup = () => {
        navigation.navigate('MyCreatedGroup')
    }

    const communityClick = (id) => {
        navigation.navigate(STRINGS.communityView, { communityId: id })
    }
    

    const statusBarHeight = StatusBar.currentHeight
    const screenHeight = Dimensions.get('screen').height
    const contentHeight = screenHeight - statusBarHeight

    return (
        <View
            className="flex justify-center bg-white align-middle"
            style={{ paddingTop: Constants.statusBarHeight }}
        >
            <SearchBar
                placeholder={STRINGS.communitySearchBar}
                onChangeText={(text) => searchFunction(text)}
                value={searchValue}
                containerStyle={[searchBarStyle.containerSearchBar]}
                inputContainerStyle={searchBarStyle.inputSearchBar}
                inputStyle={searchBarStyle.input}
                placeholderTextColor={COLORS['orchid'][400]}
                searchIcon={searchBarStyle.seachIcon}
                clearIcon={searchBarStyle.clearIcon}
            />
                        {loading && <ActivityIndicator size="large" color="#6200ea" style={{ marginVertical: 10 }} />}

           {searchValue && (
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
        {/* 🔵 Users Section */}
        <View style={{ backgroundColor: '#D0E6F7', padding: 10, borderRadius: 10, marginBottom: 15 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#005A9C', marginBottom: 8 }}>
                            Users
                        </Text>
                        {userSearchList.length > 0 ? (
                            userSearchList.map((user, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={{ flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#B0C4DE' }}
                                    onPress={() => navigation.navigate('UserProfile', { userId: user.id })}
                                >
                                    <Image
                                        source={user.image ? { uri: `data:image/jpg;base64,${user.image}` } : sampleIcon}
                                        style={{ height: 40, width: 40, borderRadius: 20, marginRight: 10 }}
                                    />
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#003366' }}>{user.username}</Text>
                                        <Text style={{ fontSize: 14, color: '#005A9C' }}>{user.fname} {user.lname}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={{ textAlign: 'center', color: '#005A9C', fontSize: 16 }}>No users found.</Text>
                        )}
                    </View>

                    {/* 🟩 Communities Section */}
                    <View style={{ backgroundColor: '#DFF7D0', padding: 10, borderRadius: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2E7D32', marginBottom: 8 }}>
                            Communities
                        </Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {searchResultList.length > 0 ? (
                                searchResultList.map((community, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={{ alignItems: 'center', margin: 8 }}
                                        onPress={() => navigation.navigate('CommunityView', { communityId: community.id })}
                                    >
                                        <Image
                                            source={community.image ? { uri: `data:image/jpg;base64,${community.image}` } : communityIcon}
                                            style={{ height: 60, width: 60, borderRadius: 30, marginBottom: 5 }}
                                        />
                                        <Text style={{ fontSize: 14, color: '#1B5E20' }}>
                                            {community.name.length > 12 ? `${community.name.substring(0, 10)}...` : community.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <Text style={{ textAlign: 'center', color: '#2E7D32', fontSize: 16 }}>No communities found.</Text>
                            )}
                        </View>
        </View>

                </ScrollView>
            )}
        </View>
    )
}
export default Community
