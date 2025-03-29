import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BASE_URL = 'https://iluvusapi-524621294197.us-east1.run.app'

export default function ChatListScreen({ navigation }) {
  const [chats, setChats] = useState([])
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const loadChats = async () => {
      const id = await AsyncStorage.getItem('userId')
      setUserId(id)
      if (!id) return

      fetch(`${BASE_URL}/user/getChats?userId=${id}`)
        .then(res => res.json())
        .then(data => setChats(data ?? []))
        .catch(err => console.error(err))
    }

    loadChats()
  }, [])

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Messages</Text>
      {userId && (
        <FlatList
          data={chats}
          keyExtractor={(item) => item.chatId}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ChatRoom', {
                  chat: item,
                  userId,
                })
              }
            >
              <View style={{ padding: 10, borderBottomWidth: 1 }}>
                <Text>
                  Chat with:{' '}
                  {item.participants
                    .filter((id) => id !== userId)
                    .join(', ')}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  )
}
