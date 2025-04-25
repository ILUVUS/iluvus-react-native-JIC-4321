import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '@env';

const BlockedUsersScreen = ({ route }) => {
  const { userId } = route.params;
  const [blockedUsers, setBlockedUsers] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchBlockedUsers();
    }, [userId])
  );

  const fetchBlockedUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/getBlockedUsers?userId=${userId}`);
      setBlockedUsers(res.data);
    } catch (err) {
      console.error('Error fetching blocked users:', err);
    }
  };

  const handleUnblock = async (blockedUserId) => {
    try {
      await axios.post(`${BASE_URL}/user/unblockUser`, null, {
        params: {
          unblockingUser: userId,
          userToUnblock: blockedUserId,
        },
      });
      Alert.alert('Unblocked', 'User has been unblocked.');
      fetchBlockedUsers();
    } catch (err) {
      console.error('Error unblocking user:', err);
      Alert.alert('Error', 'Failed to unblock user.');
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-lg font-bold mb-4">Blocked Users</Text>
      <FlatList
        data={blockedUsers}
        keyExtractor={(item) => item.id}
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
      />
    </View>
  );
};

export default BlockedUsersScreen;
