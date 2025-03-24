import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { useNavigation, useRoute } from '@react-navigation/native'
import COLORS from '../../constants/colors'
import DropDownPicker from 'react-native-dropdown-picker'
import { BASE_URL } from '@env'

const CommunityFilterScreen = ({ route }) => {
    const navigation = useNavigation()

    // Rename to ownerSearch for consistency
    const [ownerSearch, setOwnerSearch] = useState('')
    const [selectedCommunityType, setSelectedCommunityType] = useState('')
    const [selectedVisibility, setSelectedVisibility] = useState('')

    // Dropdown states
    const [communityTypeOpen, setCommunityTypeOpen] = useState(false)
    const [visibilityOpen, setVisibilityOpen] = useState(false)

    // Dropdown options
    const [communityTypeOptions] = useState([
        { label: 'All', value: '' },
        { label: 'General', value: 'General' },
        { label: 'Professional', value: 'Professional' },
    ])
    const [visibilityOptions] = useState([
        { label: 'All', value: '' },
        { label: 'Public', value: 'Public' },
        { label: 'Private', value: 'Private' },
    ])

    // Username suggestions
    const [suggestions, setSuggestions] = useState([])

    // Restore previously selected filters (if returning)
    useEffect(() => {
        if (route.params?.filters) {
            setSelectedCommunityType(
                route.params.filters.selectedCommunityType || ''
            )
            setSelectedVisibility(route.params.filters.selectedVisibility || '')
            setOwnerSearch(route.params.filters.ownerSearch || '')
        }
    }, [route.params?.filters])

    // Fetch username suggestions from the API
    const fetchUserSuggestions = async (input) => {
        if (input.length > 1) {
            try {
                const response = await axios.get(
                    `${BASE_URL}/user/search?filter=${input}`
                )
                setSuggestions(response.data || [])
            } catch (error) {
                console.log('Error fetching usernames:', error)
            }
        } else {
            setSuggestions([])
        }
    }

    // Apply filter and return to Community.js
    const applyFilters = () => {
        navigation.navigate('Community', {
            filters: {
                selectedCommunityType,
                selectedVisibility,
                ownerSearch: ownerSearch.trim(), // Trim to remove extra spaces
            },
        })
    }

    return (
        <View className="flex-1 bg-white p-5">
            <Text className="mb-4 text-lg font-semibold text-orchid-900">
                Filter Communities
            </Text>

            {/* Community Type Dropdown */}
            <View style={{ zIndex: 3000 }}>
                <Text className="mb-1 text-base text-orchid-800">
                    Community Type:
                </Text>
                <DropDownPicker
                    open={communityTypeOpen}
                    value={selectedCommunityType}
                    items={communityTypeOptions}
                    setOpen={setCommunityTypeOpen}
                    setValue={setSelectedCommunityType}
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        backgroundColor: COLORS.orchid[100],
                        marginBottom: 10,
                    }}
                    dropDownContainerStyle={{ borderColor: '#ccc' }}
                />
            </View>

            {/* Group Visibility Dropdown */}
            <View style={{ zIndex: 2000 }}>
                <Text className="mb-1 text-base text-orchid-800">
                    Group Visibility:
                </Text>
                <DropDownPicker
                    open={visibilityOpen}
                    value={selectedVisibility}
                    items={visibilityOptions}
                    setOpen={setVisibilityOpen}
                    setValue={setSelectedVisibility}
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        backgroundColor: COLORS.orchid[100],
                        marginBottom: 10,
                    }}
                    dropDownContainerStyle={{ borderColor: '#ccc' }}
                />
            </View>

            {/* Owner Username Search */}
            <Text className="mb-1 text-base text-orchid-800">
                Search by Owner Username:
            </Text>
            <TextInput
                placeholder="Enter owner username..."
                value={ownerSearch}
                onChangeText={(text) => {
                    setOwnerSearch(text)
                    fetchUserSuggestions(text)
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

            {/* Display Username Suggestions */}
            {suggestions.length > 0 && (
                <FlatList
                    data={suggestions}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setOwnerSearch(item.username)
                                setSuggestions([])
                            }}
                            style={{
                                padding: 10,
                                backgroundColor: '#f5f5f5',
                                borderBottomWidth: 1,
                                borderBottomColor: '#ddd',
                            }}
                        >
                            <Text>{item.username}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}

            {/* Apply Filters Button */}
            <TouchableOpacity
                onPress={applyFilters}
                style={{
                    backgroundColor: COLORS.orchid[900],
                    borderRadius: 8,
                    paddingVertical: 10,
                    alignItems: 'center',
                    marginTop: 20,
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

export default CommunityFilterScreen
