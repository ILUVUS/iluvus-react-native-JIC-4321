// Import package and project components
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PostItem from '../community/components/PostItem'
import {
    View,
    Text,
    ScrollView,
    RefreshControl,
    KeyboardAvoidingView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import Constants from 'expo-constants'
import { useHeaderHeight } from '@react-navigation/elements'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons'

import STRINGS from '../../constants/strings'
import COLORS from '../../constants/colors'
import { searchBarStyle } from '../../../styles/style'

const Home = () => {
    const [postData, setPostData] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([]) // Holds searched/filtered posts
    const [userId, setUserId] = useState('')
    const [refreshing, setRefreshing] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [doneSearch, setDoneSearch] = useState(false)
    const [trendingTopics, setTrendingTopics] = useState([])
    const [popularTopics, setPopularTopics] = useState([])
    const navigation = useNavigation()
    const route = useRoute()

    useEffect(() => {
        fetchUserId()
    }, [])

    useEffect(() => {
        fetchTrendingTopics();
        fetchPopularTopics();
    }, [])
    
    useEffect(() => {
        if (userId) fetchPosts()
    }, [userId])

    useEffect(() => {
        if (route.params?.filters) applyFilters(route.params.filters)
    }, [route.params?.filters])
    useEffect(() => {
        if (route.params?.filters) fetchFilteredPosts(route.params.filters)
    }, [route.params?.filters])
    const fetchTrendingTopics = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/post/topicsOfTheDay`)
            setTrendingTopics(res.data || [])
        } catch (err) {
            console.error('Failed to fetch topics of the day:', err)
        }
    }

    const fetchPopularTopics = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/post/popularTopics`)
            setPopularTopics(res.data || [])
        } catch (err) {
            console.error('Failed to fetch popular topics:', err)
        }
    }

    const fetchUserId = async () => {
        try {
            const value = await AsyncStorage.getItem('userId')
            if (value) setUserId(value)
        } catch (e) {
            console.log('Error fetching userId:', e)
        }
    }

    const fetchPosts = async () => {
        try {
            const res = await axios.get(
                `${BASE_URL}/post/getPostForHomePage?userId=${userId}`,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            )

            const posts = res.data.reverse()
            setPostData(posts)
            setFilteredPosts(posts)
        } catch (err) {
            //something happening here, timing out - too many queries on backend?
            console.log('Cannot get posts', err)
            setPostData([])
            setFilteredPosts([])
        }
    }

    const handleSearch = async (text) => {
        try {
            const res = await axios.get(`${BASE_URL}/post/search`, {
                params: {
                    userId: userId, // Make sure you have the user's ID
                    searchTerm: searchValue,
                },
                headers: { 'Content-Type': 'application/json' },
            })
            setFilteredPosts(res.data)
        } catch (err) {
            console.error('Search API failed', err)
            setFilteredPosts([])
        }
        setDoneSearch(true)
    }


    const applyFilters = async (filters) => {
        try {
            let filtered = postData

            if (filters.selectedFilters.includes('shared')) {
                const res = await axios.get(
                    `${BASE_URL}/post/getSharedPosts?userId=${userId}`
                )
                filtered = [...filtered, ...res.data]
            }
            if (filters.selectedFilters.includes('liked')) {
                filtered = [
                    ...filtered,
                    ...postData.filter((post) => post.likedBy.includes(userId)),
                ]
            }
            if (filters.selectedFilters.includes('tagged')) {
                filtered = [
                    ...filtered,
                    ...postData.filter((post) => post.tagged.includes(userId)),
                ]
            }
            if (filters.selectedFilters.includes('reported')) {
                const res = await axios.get(`${BASE_URL}/post/getReportedPosts`)
                filtered = [...filtered, ...res.data]
            }
            if (filters.selectedCommunities.length > 0) {
                filtered = [
                    ...filtered,
                    ...postData.filter((post) =>
                        filters.selectedCommunities.includes(post.community_id)
                    ),
                ]
            }

            // Remove duplicates
            const uniqueFilteredPosts = [
                ...new Map(filtered.map((post) => [post.id, post])).values(),
            ]
            setFilteredPosts(uniqueFilteredPosts)
        } catch (err) {
            console.log('Filter Error:', err)
        }
    }

    const fetchFilteredPosts = async (filters) => {
        const { selectedFilters, selectedCommunities } = filters

        const params = {}

        if (selectedFilters.includes('shared')) {
            params.sharedBy = userId
        }

        if (selectedFilters.includes('liked')) {
            params.likedBy = userId
        }

        if (selectedCommunities.length > 0) {
            params.communityName = selectedCommunities[0] // Supports one for now
        }

        try {
            const response = await axios.get(`${BASE_URL}/post/filter`, {
                params,
            })

            const data = response.data || []
            setFilteredPosts(data)
        } catch (err) {
            console.error('Error fetching filtered posts:', err)
            setFilteredPosts([])
        }
    }

    const handleSaveSearchText = async (text) => {
        setSearchValue(text)
        setDoneSearch(false)
    }

    return (
        <>
            <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1 }}
                keyboardVerticalOffset={useHeaderHeight()}
            >
                <View className="h-screen w-screen flex-1 bg-white">
                    {/* Search Bar & Filter Button */}
                    <View className="flex flex-row items-center bg-white px-4 py-2">
                        {/* Search Bar */}
                        <SearchBar
                            placeholder="Search posts..."
                            //onChangeText={handleSearch}
                            onChangeText={handleSaveSearchText}
                            value={searchValue}
                            containerStyle={[
                                searchBarStyle.containerSearchBar,
                                { width: '72%' },
                            ]}
                            inputContainerStyle={searchBarStyle.inputSearchBar}
                            inputStyle={searchBarStyle.input}
                            placeholderTextColor={COLORS['orchid'][400]}
                            searchIcon={searchBarStyle.seachIcon}
                            clearIcon={searchBarStyle.clearIcon}
                        />

                        {/* Search Button */}
                        <TouchableOpacity
                            onPress={handleSearch}
                            className="ml-2 rounded-lg bg-orchid-900 p-3"
                            style={{
                                width: '12.5%',
                                height: 45,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faSearch}
                                size={20}
                                color="white"
                            />
                        </TouchableOpacity>

                        {/* Filter Button */}
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('HomeFilterScreen')
                            }
                            className="ml-2 rounded-lg bg-orchid-900 p-3"
                            style={{
                                width: '12.5%',
                                height: 45,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faFilter}
                                size={20}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>


                    {trendingTopics.length > 0 && (
                        <View className="mb-3 px-4">
                            <View
                                style={{
                                    backgroundColor: '#F9F2FF',
                                    borderRadius: 16,
                                    padding: 15,
                                    elevation: 3,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 2,
                                }}
                            >
                                <Text className="mb-2 text-lg font-bold text-orchid-900">
                                    Topics of the Day
                                </Text>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {trendingTopics.map((topic, index) => (
                                        <View
                                            key={index}
                                            style={{
                                                backgroundColor:
                                                    COLORS.orchid[100],
                                                paddingVertical: 10,
                                                paddingHorizontal: 15,
                                                borderRadius: 16,
                                                marginRight: 10,
                                                elevation: 3,
                                                shadowColor: '#000',
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 2,
                                                },
                                                shadowOpacity: 0.2,
                                                shadowRadius: 3,
                                                minWidth: 150,
                                            }}
                                        >
                                            <Text className="text-base font-semibold text-orchid-900">
                                                {topic.name}
                                            </Text>
                                            <Text className="text-sm text-gray-700">
                                                {topic.count} post
                                                {topic.count > 1
                                                    ? 's'
                                                    : ''}{' '}
                                                today
                                            </Text>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>
                    )}

                    {popularTopics.length > 0 && (
                        <View className="mb-3 px-4">
                            <View
                                style={{
                                    backgroundColor: '#F9F2FF',
                                    borderRadius: 16,
                                    padding: 15,
                                    elevation: 3,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 2,
                                }}
                            >
                                <Text className="mb-2 text-lg font-bold text-orchid-900">
                                    Popular Topics 🔥
                                </Text>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {popularTopics.map((topic, index) => (
                                        <View
                                            key={index}
                                            style={{
                                                backgroundColor:
                                                    COLORS.orchid[100],
                                                paddingVertical: 10,
                                                paddingHorizontal: 15,
                                                borderRadius: 16,
                                                marginRight: 10,
                                                elevation: 3,
                                                shadowColor: '#000',
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 2,
                                                },
                                                shadowOpacity: 0.2,
                                                shadowRadius: 3,
                                                minWidth: 150,
                                            }}
                                        >
                                            <Text className="text-base font-semibold text-orchid-900">
                                                {topic.name}
                                            </Text>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>
                    )}

                    {/* Post List Section */}
                    <View className="h-full w-full">
                        <ScrollView
                            contentContainerStyle={{
                                paddingBottom: Constants.statusBarHeight,
                                minHeight: '100%',
                                flexGrow: 1,
                            }}
                            className="h-full w-full overflow-auto bg-white p-5"
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={fetchPosts}
                                />
                            }
                        >
                            {filteredPosts.length > 0 ? (
                                filteredPosts.map((post, index) => (
                                    <PostItem
                                        key={index}
                                        post={post}
                                        userId={userId}
                                        displayCommunityName={true}
                                    />
                                ))
                            ) : (
                                <View className="flex h-full w-full items-center justify-center gap-2">
                                    {searchValue.trim() !== '' &&
                                    doneSearch === true ? (
                                        <Text className="text-lg font-semibold text-orchid-900">
                                            No matching posts found.
                                        </Text>
                                    ) : (
                                        <>
                                            <ActivityIndicator />
                                            <Text className="text-center text-orchid-900">
                                                {STRINGS.no_post_alert}
                                            </Text>
                                            <Text className="text-center text-orchid-900">
                                                {STRINGS.no_post_message}
                                            </Text>
                                        </>
                                    )}
                                </View>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}

export default Home
