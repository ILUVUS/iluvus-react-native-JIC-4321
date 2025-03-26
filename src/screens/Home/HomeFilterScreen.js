import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native'
import axios from 'axios'
import { BASE_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useRoute } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker'

import COLORS from '../../constants/colors'

const HomeFilterScreen = ({ route }) => {
    const navigation = useNavigation()
    const [userId, setUserId] = useState('')

    const [communitySearch, setCommunitySearch] = useState('')
    const [suggestions, setSuggestions] = useState([])

    // Multi-Select Filters
    const [selectedFilters, setSelectedFilters] = useState([])
    const [selectedCommunities, setSelectedCommunities] = useState([])

    // Dropdown states
    const [filterOpen, setFilterOpen] = useState(false)
    const [communityOpen, setCommunityOpen] = useState(false)

    // Options
    const [filterOptions] = useState([
        { label: 'Shared Posts', value: 'shared' },
        { label: 'Liked Posts', value: 'liked' },
    ])
    const [communityOptions, setCommunityOptions] = useState([])

    useEffect(() => {
        fetchUserId()
        fetchCommunities()

        // Load previous filters if returning from Home.js
        if (route.params?.filters) {
            setSelectedFilters(route.params.filters.selectedFilters || [])
            setSelectedCommunities(
                route.params.filters.selectedCommunities || []
            )
        }
    }, [])

    const fetchUserId = async () => {
        const value = await AsyncStorage.getItem('userId')
        if (value) setUserId(value)
    }

    const fetchCommunities = async (query) => {
        if (!query) return

        try {
            const res = await axios.get(
                `${BASE_URL}/community/search?filter=${query}`,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            )

            const formattedOptions = Object.entries(res.data).map(
                ([id, community]) => ({
                    label: community.name,
                    value: community.name,
                })
            )

            setCommunityOptions(formattedOptions)
        } catch (err) {
            console.log('⚠ Failed to fetch communities:', err)
            setCommunityOptions([])
        }
    }

    const applyFilters = () => {
        if (selectedFilters.length === 0 && selectedCommunities.length === 0) {
            alert('Please select at least one filter before applying.')
            return
        }

        navigation.navigate('Home', {
            filters: { selectedFilters, selectedCommunities },
        })
    }
    const fetchCommunitySuggestions = async (input) => {
        if (input.length > 1) {
            try {
                const res = await axios.get(
                    `${BASE_URL}/community/search?filter=${input}`
                )
                const communities = res.data.Communities || {}
                const result = Object.values(communities).map(
                    (comm) => comm.name
                )
                setSuggestions(result)
            } catch (err) {
                console.log('❌ Error fetching communities:', err)
                setSuggestions([])
            }
        } else {
            setSuggestions([])
        }
    }

    return (
        <View className="flex-1 bg-white p-5">
            {/* Multi-Select Post Filters (Higher zIndex) */}
            <View style={{ zIndex: 3000 }}>
                <Text className="mb-1 text-base text-orchid-800">
                    Filter By:
                </Text>
                <DropDownPicker
                    open={filterOpen}
                    value={selectedFilters}
                    items={filterOptions}
                    setOpen={setFilterOpen}
                    setValue={setSelectedFilters}
                    multiple={true} // Enables multi-select
                    min={0}
                    max={4}
                    mode="BADGE" // Shows selected values as a badge
                    showBadgeDot={true}
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        backgroundColor: COLORS.orchid[100],
                        marginBottom: 10,
                    }}
                    dropDownContainerStyle={{
                        borderColor: '#ccc',
                    }}
                />
            </View>

            {/* Searchable & Multi-Select Community Filter (Lower zIndex) */}
            <View style={{ zIndex: 2000 }}>
                <Text className="mb-1 mt-2 text-base text-orchid-800">
                    Search Community:
                </Text>
                <TextInput
                    placeholder="Enter community name..."
                    value={communitySearch}
                    onChangeText={(text) => {
                        setCommunitySearch(text)
                        fetchCommunitySuggestions(text)
                    }}
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        padding: 10,
                        height: 40,
                        fontSize: 14,
                        marginBottom: 10,
                    }}
                />

                {suggestions.length > 0 && (
                    <FlatList
                        data={suggestions}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedCommunities([item]) // override with selected name
                                    setCommunitySearch(item)
                                    setSuggestions([])
                                }}
                                style={{
                                    padding: 10,
                                    backgroundColor: '#f5f5f5',
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#ddd',
                                }}
                            >
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>

            {/* Apply Button */}
            <TouchableOpacity
                onPress={applyFilters}
                style={{
                    backgroundColor: COLORS.orchid[900],
                    borderRadius: 8,
                    paddingVertical: 10,
                    alignItems: 'center',
                    marginTop: 10,
                }}
            >
                <Text
                    style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}
                >
                    Apply Filters
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeFilterScreen
