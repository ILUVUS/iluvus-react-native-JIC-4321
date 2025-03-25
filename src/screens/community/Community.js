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

import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
import { TouchableOpacity } from 'react-native'
import { debounce } from 'lodash';
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const Community = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const [appliedFilters, setAppliedFilters] = useState(null)
    const [userFullName, setUserFullName] = useState('');

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [communityList, setCommunityList] = useState([])
    const [refreshing, setRefreshing] = React.useState(false)
    const [verify, setVerify] = useState(false)
    const [searchResultList, setSearchResultList] = useState([])
    const [communityListInfo, setCommunityListInfo] = useState([])
    const [userSearchResults, setUserSearchResults] = useState([])

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

    useEffect(() => {
        if (route.params?.filters) {
            setAppliedFilters(route.params.filters)
            fetchFilteredCommunities(route.params.filters)
        }
    }, [route.params?.filters])

    // useEffect(() => {
    //     const delayDebounceFn = setTimeout(() => {
    //         if (!searchValue.trim()) {
    //             setUserSearchResults([]);
    //             return;
    //         }

    //         // Fetch Users
    //         axios.get(`${BASE_URL}/user/search?filter=${searchValue}`)
    //             .then((res) => {
    //                 console.log("User Search API Response:", res.data);
    //                 setUserSearchResults(res.data || []);
    //             })
    //             .catch((err) => {
    //                 console.log("User Search Error:", err);
    //                 setUserSearchResults([]);
    //             });

    //     });

    //     return () => clearTimeout(delayDebounceFn);
    // }, [searchValue]);

    const fetchFilteredCommunities = async (filters) => {
        const { selectedCommunityType, selectedVisibility, ownerSearch } =
            filters

        try {
            const response = await axios.get(`${BASE_URL}/community/filter`, {
                params: {
                    type: selectedCommunityType,
                    visibility: selectedVisibility,
                    owner: ownerSearch,
                },
            })

            const data = response.data || {}
            setSearchResultList(data)

            // convert to communityListInfo format if needed
            const filteredInfos = Object.keys(data).map((id) => ({
                id,
                name: data[id].name,
                description: data[id].description,
                rules: data[id].rules,
                visibility: data[id].visibility,
                ownerId: data[id].ownerId,
                image: data[id].image,
            }))
            setCommunityListInfo(filteredInfos)
        } catch (err) {
            console.error('Error fetching filtered communities:', err)
        }
    }


    // useEffect(() => {
    //     axios({
    //         method: 'GET',
    //         url: `${BASE_URL}/community/search?filter=${searchValue}`,
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then((res) => {
    //             // console.log(res.data)
    //             setSearchResultList(res.data)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }, [searchValue])

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

    const navigateToUserProfile = (userId) => {
        navigation.navigate('Profile', { userId, showBackButton: true });
    };
    

    useEffect(() => {
        if (route.params?.resetSearchToUser) {
            resetSearchToCurrentUser()
            navigation.setParams({ resetSearchToUser: false }) // Clear flag after use
        }
    }, [route.params?.resetSearchToUser])
    
    const resetSearchToCurrentUser = async () => {
        if (userFullName) {
            setSearchValue(userFullName);
            searchFunction(userFullName);
        } else {
            try {
                const userId = await AsyncStorage.getItem('userId');
                if (!userId) return;
    
                const res = await axios.get(`${BASE_URL}/user/get?userId=${userId}`);
                const user = res.data;
                const fullName = `${user.fname} ${user.lname}`;
                setUserFullName(fullName);
                setSearchValue(fullName);
                searchFunction(fullName);
            } catch (err) {
                console.error('Error during fallback reset:', err);
            }
        }
    };
    
    
    useEffect(() => {
        const getOwnUserInfo = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                const res = await axios.get(`${BASE_URL}/user/get?userId=${userId}`);
                const user = res.data;
                const fullName = `${user.fname} ${user.lname}`;
                setUserFullName(fullName); // ✅ Save for later
            } catch (err) {
                console.error('Error fetching own user info:', err);
            }
        };
    
        getOwnUserInfo();
        getVerified();
        fetchCommunityList();
    }, []);
    
    

    useEffect(() => {
        setCommunityListInfo([])
        // make sure data arrive in order
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
            throw err // re-throw the error to be caught in the calling function
        }
    }

    const fetchCommunitySearch = async (filter) => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (!userId) return;

            const res = await axios.get(`${BASE_URL}/user/getMyFollowingGroups?userId=${userId}`);
            if (res.data) {
                const filteredCommunities = Object.keys(res.data)
                    .filter((id) => res.data[id].toLowerCase().includes(filter.toLowerCase()))
                    .map((id) => ({
                        id,
                        name: res.data[id],
                        image: '',  // Placeholder for images
                    }));
                setSearchResultList(filteredCommunities);
            }
        } catch (err) {
            console.error("Community Search Error:", err);
            setSearchResultList([]);
        }
    };

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

    const communityClick = (communityOrId) => {
        if (typeof communityOrId === 'string') {
          navigation.navigate(STRINGS.communityView, { communityId: communityOrId });
        } else {
          navigation.navigate(STRINGS.communityView, { communityData: communityOrId });
        }
      };
      

      const searchFunction = debounce(async (text) => {
        setSearchValue(text);
    
        if (text.length === 0) {
            setSearchResultList([]);
            setUserSearchResults([]);
            return;
        }
    
        try {
            const [communityRes, userRes] = await Promise.all([
                axios.get(`${BASE_URL}/community/search?filter=${text}`),
                axios.get(`${BASE_URL}/user/search?filter=${text}`)
            ]);
    
            console.log("Community Search Response:", communityRes.data);
            console.log("User Search Response:", userRes.data.map(({ id, fname, lname }) => ({ id, fname, lname })));
    
            // communityRes.data is expected to be an object: { id1: { name, image, ... }, id2: { ... } }
            setSearchResultList(communityRes.data || {});
            setUserSearchResults(userRes.data || []);
        } catch (err) {
            console.error("Search error:", err);
            Alert.alert("Error", "Failed to fetch search results. Please try again.");
        }
    }, 500);
    

    const statusBarHeight = StatusBar.currentHeight
    const screenHeight = Dimensions.get('screen').height
    const contentHeight = screenHeight - statusBarHeight

    return (
        <View
            className="flex justify-center bg-white align-middle"
            style={{ paddingTop: Constants.statusBarHeight }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    backgroundColor: 'white',
                }}
            >
                <View style={{ flex: 1 }}>
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
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('CommunityFilterScreen')}
                    style={{
                        width: 45,
                        height: 45,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLORS.orchid[900],
                        borderRadius: 8,
                        marginLeft: 8,
                    }}
                >
                    <FontAwesomeIcon icon={faFilter} size={20} color="white" />
                </TouchableOpacity>
            </View>

            {!searchValue && (
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
                    <View className="my-3 flex flex-row flex-wrap justify-evenly overflow-auto">
                        <CommunityViewMainButton onPress={() => newCommunity()}>
                            <Icon
                                name="plus"
                                size={SIZES.communityIconSize}
                                color={COLORS['orchid'][900]}
                            />
                            <Text className="mt-1 text-base text-orchid-900">
                                {STRINGS.newCommunity}
                            </Text>
                        </CommunityViewMainButton>

                        <CommunityViewMainButton
                            onPress={() => myCreatedGroup()}
                        >
                            <Icon
                                name="users"
                                size={SIZES.communityIconSize}
                                color={COLORS['orchid'][900]}
                            />
                            <Text className="mt-1 text-base text-orchid-900">
                                {STRINGS.myGroups}
                            </Text>
                        </CommunityViewMainButton>
                    </View>

                    <View className="mb-2 ml-5 flex w-screen items-start">
                        <Text className="text-3xl font-bold text-orchid-900 shadow-md shadow-slate-200">
                            Communities
                        </Text>
                    </View>

                    <View className="flex flex-row flex-wrap overflow-auto">
                        {communityListInfo.length > 0 ? (
                            <>
                                {communityListInfo.map((info, index) => (
                                    <CommunityViewImageButton
                                        key={index}
                                        onPress={() => communityClick(info.id)}
                                    >
                                        <Image
                                            source={
                                                info.image != null &&
                                                info.image !== ''
                                                    ? {
                                                        uri: `data:image/jpg;base64,${info.image}`

                                                    }
                                                    : communityIcon
                                            }
                                            className="h-24 w-24 rounded-3xl"
                                        />
                                        <Text className="mt-1 text-sm text-orchid-900">
                                            {info.name.length > 12
                                                ? info.name
                                                      .substring(0, 10)
                                                      .trim() + '...'
                                                : info.name}
                                        </Text>
                                    </CommunityViewImageButton>
                                ))}
                            </>
                        ) : (
                            <View className="flex w-full items-center justify-center gap-2 pt-14">
                                <ActivityIndicator />
                                <Text>{STRINGS.loading_indicator}</Text>
                            </View>
                        )}
                    </View>
                    
                </ScrollView>
            )}

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
             {searchResultList && Object.keys(searchResultList).length > 0 && (
  <View className="mb-4">
    <Text className="text-lg font-semibold text-orchid-900 mb-2">Communities Found</Text>
    <View className="flex flex-row flex-wrap overflow-auto">
      {Object.keys(searchResultList).map((key) => {
        const community = searchResultList[key];
        return (
          <CommunityViewImageButton
            key={key}
            onPress={() => communityClick(key)} // or communityClick({ id: key, ...community }) if needed
          >
            <Image
              source={
                community.image && community.image !== ''
                  ? { uri: `data:image/jpg;base64,${community.image}` }
                  : communityIcon
              }
              className="h-24 w-24 rounded-3xl"
            />
            <Text className="mt-1 text-base text-orchid-900">
              {community.name?.length > 12
                ? community.name.substring(0, 10).trim() + '...'
                : community.name || 'Unnamed'}
            </Text>
          </CommunityViewImageButton>
        );
      })}
    </View>
  </View>
)}



                    <View className="rounded-lg bg-blue-100 p-4">
                        <Text className="text-lg font-semibold text-blue-900">
                            Users Found
                        </Text>
                        {userSearchResults.length === 0 &&
                        searchValue.trim() !== '' ? (
                            <Text className="mt-2 text-base text-gray-600">
                                No users found
                            </Text>
                        ) : (
                            userSearchResults.map((user, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() =>
                                        navigateToUserProfile(user.id)
                                    }
                                >
                                    <View className="mt-2 flex-row items-center rounded-md bg-white p-2">
                                    <Image
  source={
    typeof user.avatar === 'string' && user.avatar.trim() !== ''
      ? {
          uri: user.avatar.startsWith('data:image/') 
            ? user.avatar
            : `data:image/jpeg;base64,${user.avatar.trim()}`,
        }
      : sampleIcon
  }
  className="mr-3 h-10 w-10 rounded-full"
/>

<Text className="text-base text-blue-900">
  {user?.fname && user?.lname
    ? `${user.fname} ${user.lname}`
    : user?.username || 'Unknown User'}
</Text>

                                    </View>
                                </TouchableOpacity>
                            ))
                        )}
                    </View>
                </ScrollView>
            )}
        </View>
    )
}
export default Community
