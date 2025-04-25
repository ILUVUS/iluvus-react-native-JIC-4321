import React, { useEffect, useState, useCallback } from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
    RefreshControl,
} from 'react-native'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native'
import { BASE_URL } from '@env'

const BlockedUsersScreen = ({ route }) => {
    const { userId } = route.params
    const [blockedUsers, setBlockedUsers] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    // Fetch blocked users on screen focus
    useFocusEffect(
        useCallback(() => {
            if (userId) {
                console.log("Fetching blocked users for userId:", userId)
                fetchBlockedUsers()
            }
        }, [userId])
    )

    useEffect(() => {
        const fetchUserId = async () => {
          const storedUserId = await AsyncStorage.getItem('userId');
          setUserId(route.params?.userId || storedUserId);
        };
        fetchUserId();
      }, []);
      
    const fetchBlockedUsers = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/getBlockedUsers?userId=${userId}`)
            console.log("Blocked users fetched:", res.data)
            setBlockedUsers(res.data || [])
        } catch (err) {
            console.error('Error fetching blocked users:', err)
            setBlockedUsers([]) // fallback to empty
        } finally {
            setRefreshing(false)
        }
    }

    const handleUnblock = async (blockedUserId) => {
        try {
            await axios.post(`${BASE_URL}/user/unblockUser`, null, {
                params: {
                    unblockingUser: userId,
                    userToUnblock: blockedUserId,
                },
            })
            Alert.alert('Unblocked', 'User has been unblocked.')
            fetchBlockedUsers()
        } catch (err) {
            console.error('Error unblocking user:', err)
            Alert.alert('Error', 'Failed to unblock user.')
        }
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        fetchBlockedUsers()
    }, [])

    return (
        <View className="flex-1 bg-white p-4">
            <Text className="text-lg font-bold mb-4">Blocked Users</Text>
            <FlatList
                data={blockedUsers}
                keyExtractor={(item, index) => item?.id || index.toString()}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                renderItem={({ item }) => (
                    <View className="mb-4 flex-row justify-between items-center border-b pb-2">
                        <Text>{item.fname} {item.lname} ({item.username})</Text>
                        <TouchableOpacity
                            onPress={() => handleUnblock(item.id)}
                            style={{ backgroundColor: 'crimson', padding: 6, borderRadius: 6 }}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Unblock</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={
                    <Text className="text-center text-gray-500">No blocked users found.</Text>
                }
            />
        </View>
    )
}

export default BlockedUsersScreen
