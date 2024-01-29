import React, { Component } from 'react'
import { useEffect, useState } from 'react'

import axios from 'axios'
import { BASE_URL } from '@env'
import { Image, SearchBar } from 'react-native-elements'
import { Alert, RefreshControl, ScrollView, Text, View } from 'react-native'

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

const Community = () => {
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [communityList, setCommunityList] = useState([])
    const [refreshing, setRefreshing] = React.useState(false)
    const [verify, setVerify] = useState(false)
    const [searchResultList, setSearchResultList] = useState([])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        // refresh the communityList
        getVerified()
        fetchCommunityList()
        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }, [])

    useEffect(() => {
        getVerified()
        fetchCommunityList()
    }, [])

    useEffect(() => {
        console.log(searchValue)
        axios({
            method: 'GET',
            url: `${BASE_URL}/community/search?filter=${searchValue}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {
            console.log(res.data)
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
                console.log('All community: ', res.data)
                setCommunityList(res.data)
            })
            .catch((err) => {})
    }

    const getVerified = async () => {
        console.log(await AsyncStorage.getItem('userId'))
        axios({
            method: 'POST',
            url: `${BASE_URL}/user/verify`,
            data: {
                username: await AsyncStorage.getItem('userId'),
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                console.log(res.data)
                setVerify(true)
            })
            .catch((err) => {
                console.log(err)

                setVerify(false)
            })
    }

    const newCommunity = () => {
        navigation.navigate('SetupCommunity')
    }

    const myCommunity = () => {
        navigation.navigate('SetupCommunity')
    }

    const myFriend = () => {
        navigation.navigate('SetupCommunity')
    }

    const communityClick = (id) => {
        // Alert.alert('Search', 'Search for a group')
        navigation.navigate(STRINGS.communityView, { communityId: id })
    }

    const searchFunction = (text) => {
        // bla bla things here
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
                    inputStyle.inputShadow,
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
                    <View className="my-3 flex w-screen flex-row justify-evenly">
                        {verify && (
                            <CommunityViewMainButton onPress={newCommunity}>
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

                        <CommunityViewMainButton onPress={myCommunity}>
                            <Icon
                                name="users"
                                size={SIZES.communityIconSize}
                                color={COLORS['orchid'][900]}
                            />
                            <Text className="mt-1 text-base text-orchid-900">
                                {STRINGS.myCommunity}
                            </Text>
                        </CommunityViewMainButton>

                        <CommunityViewMainButton onPress={myFriend}>
                            <Icon
                                name="child"
                                size={SIZES.communityIconSize}
                                color={COLORS['orchid'][900]}
                            />
                            <Text className="mt-1 text-base text-orchid-900">
                                {STRINGS.myFriends}
                            </Text>
                        </CommunityViewMainButton>
                    </View>

                    <View className="mb-2 ml-5 flex w-screen items-start">
                        <Text className="text-3xl font-bold text-orchid-900 shadow-md shadow-slate-200">
                            Developing
                        </Text>
                    </View>

                    <View className="flex flex-row flex-wrap overflow-auto">
                        {/* Sample Items */}
                        {/* <CommunityViewImageButton
                        key={1}
                        onPress={() => communityClick('id1')} // <<===== passing communityid here
                    >
                        <Image
                            source={sampleIcon}
                            className="h-24 w-24 rounded-3xl"
                        />
                        <Text className="mt-1 text-base text-orchid-900">
                            Item 1
                        </Text>
                    </CommunityViewImageButton> */}
                        {/* Sample Items */}

                        {/* {communityList.map((item, index) => (
                            <CommunityViewImageButton
                                key={index}
                                onPress={communityClick(item.index)}
                            >
                                <Image
                                    source={sampleIcon}
                                    className="h-24 w-24 rounded-3xl"
                                />
                                <Text className="mt-1 text-base text-orchid-900">
                                    {item}
                                </Text>
                            </CommunityViewImageButton>
                        ))} */}

                        {Object.keys(communityList).map((key, index) => (
                            <CommunityViewImageButton
                                key={key}
                                onPress={() => communityClick(key)}
                            >
                                <Image
                                    source={sampleIcon}
                                    className="h-24 w-24 rounded-3xl"
                                />
                                <Text className="mt-1 text-base text-orchid-900">
                                    {communityList[key]}
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

                        {/* {searchResultList.map((item, index) => (
                        
                    ))} */}
                    </View>
                </ScrollView>
            )}
        </View>
    )
}
export default Community
