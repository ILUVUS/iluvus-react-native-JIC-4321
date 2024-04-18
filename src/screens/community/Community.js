import React from 'react'
import { useEffect, useState } from 'react'

import axios from 'axios'
import { BASE_URL } from '@env'
import { Image, SearchBar } from 'react-native-elements'
import { RefreshControl, ScrollView, Text, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'

import SIZES from '../../constants/sizes'
import COLORS from '../../constants/colors'
import STRINGS from '../../constants/strings'
import sampleIcon from '../../../assets/images/sampleicon.jpg'
import { inputStyle, searchBarStyle } from '../../../styles/style'
import {
    CommunityViewImageButton,
    CommunityViewMainButton,
} from '../../components/button'

import { useIsFocused } from '@react-navigation/native'

const Community = () => {
    const navigation = useNavigation()
    const isFocused = useIsFocused()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [communityList, setCommunityList] = useState([])
    const [refreshing, setRefreshing] = React.useState(false)
    const [verify, setVerify] = useState(false)
    const [searchResultList, setSearchResultList] = useState([])
    const [communityListInfo, setCommunityListInfo] = useState([])

    useEffect(() => {
        getVerified()
        fetchCommunityList()
    }, [isFocused])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        getVerified()
        fetchCommunityList()
        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }, [])

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/community/search?filter=${searchValue}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setSearchResultList(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [searchValue])

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

    const newCommunity = () => {
        navigation.navigate('SetupCommunity')
    }

    const myCommunity = () => {
        navigation.navigate('MyGroup')
    }

    const myFriend = () => {
        // navigation.navigate('SetupCommunity')
    }

    const communityClick = (id) => {
        navigation.navigate(STRINGS.communityView, { communityId: id })
    }

    const searchFunction = (text) => {
        setSearchValue(text)
    }

    return (
        <View className="flex justify-center bg-white align-middle">
            <SearchBar
                placeholder={STRINGS.communitySearchBar}
                onChangeText={(text) => searchFunction(text)}
                value={searchValue}
                containerStyle={[
                    searchBarStyle.containerSearchBar,
                ]}
                inputContainerStyle={searchBarStyle.inputSearchBar}
                inputStyle={searchBarStyle.input}
                placeholderTextColor={COLORS['orchid'][400]}
                searchIcon={searchBarStyle.seachIcon}
                clearIcon={searchBarStyle.clearIcon}
            />
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
                    <View className="flex flex-row flex-wrap overflow-auto justify-evenly my-3">
                        {verify && (
                            <CommunityViewMainButton
                                onPress={() => newCommunity()}
                            >
                                <Icon
                                    name="plus"
                                    size={SIZES.communityIconSize}
                                    color={COLORS['orchid'][900]}
                                />
                                <Text className="mt-1 text-base text-orchid-900">
                                    {STRINGS.newCommunity}
                                </Text>
                            </CommunityViewMainButton>
                        )}

                        <CommunityViewMainButton onPress={() => myCommunity()}>
                            <Icon
                                name="users"
                                size={SIZES.communityIconSize}
                                color={COLORS['orchid'][900]}
                            />
                            <Text className="mt-1 text-base text-orchid-900">
                                {STRINGS.myCommunity}
                            </Text>
                        </CommunityViewMainButton>

                    </View>

                    <View className="mb-2 ml-5 flex w-screen items-start">
                        <Text className="text-3xl font-bold text-orchid-900 shadow-md shadow-slate-200">
                            Developing
                        </Text>
                    </View>

                    <View className="flex flex-row flex-wrap overflow-auto">
                        {communityListInfo.map((info, index) => (
                            <CommunityViewImageButton
                                key={index}
                                onPress={() => communityClick(info.id)}
                            >
                                <Image
                                    source={
                                        info.image != null && info.image !== ''
                                            ? {
                                                  uri: `data:image/jpg;base64,${info.image}`,
                                              }
                                            : sampleIcon
                                    }
                                    className="h-24 w-24 rounded-3xl"
                                />
                                <Text className="mt-1 text-sm text-orchid-900">
                                    {info.name.length > 12
                                        ? info.name.substring(0, 10) + '...'
                                        : info.name}
                                </Text>
                            </CommunityViewImageButton>
                        ))}
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
                    <View className="flex flex-row flex-wrap overflow-auto">
                        {Object.keys(searchResultList).map((key, index) => (
                            <CommunityViewImageButton
                                key={key}
                                onPress={() => communityClick(key)}
                            >
                                <Image
                                    source={sampleIcon}
                                    className="h-24 w-24 rounded-3xl"
                                />
                                <Text className="mt-1 text-base text-orchid-900">
                                    {searchResultList[key]}
                                </Text>
                            </CommunityViewImageButton>
                        ))}
                    </View>
                </ScrollView>
            )}
        </View>
    )
}
export default Community
