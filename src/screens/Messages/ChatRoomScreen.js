import React, { useEffect, useState } from 'react'
import {
  View,
  FlatList,
  TextInput,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { BASE_URL } from '@env'

export default function ChatRoomScreen({ route, navigation }) {
  const { chat, userId } = route.params
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')

  const isGroup = chat?.isGroup
  const receiverId = !isGroup
    ? chat.participants.find(id => id !== userId)
    : null

  useEffect(() => {
    if (!chat?.chatId) return

    fetch(`${BASE_URL}/chat_room/${chat.chatId}/recent_messages?page=0&size=50`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data?.content)) {
          setMessages(data.content)
        }
      })
      .catch(console.error)
  }, [chat.chatId])

  const sendMessage = () => {
    if (!text.trim()) return

    const endpoint = isGroup
    ? `${BASE_URL}/chat_message/group`
    : `${BASE_URL}/chat_message/direct`
  

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roomId: chat.chatId,
        senderId: userId,
        receiverId: isGroup ? null : receiverId,
        message: text,
        timestamp: new Date().toISOString(),
      }),
    })
      .then(res => res.json())
      .then(newMessage => {
        if (newMessage && newMessage.message) {
          setMessages(prev => [...prev, newMessage])
          setText('')
        }
      })
      .catch(console.error)
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              {
                alignSelf: item.senderId === userId ? 'flex-end' : 'flex-start',
                backgroundColor:
                  item.senderId === userId ? '#aee' : '#eee',
              },
            ]}
          >
            <Text>{item.message}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        )}
      />
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type a message..."
        style={styles.input}
      />
      <Button title="Send" onPress={sendMessage} />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    padding: 8,
    marginVertical: 4,
    borderRadius: 6,
    maxWidth: '80%',
  },
  timestamp: {
    fontSize: 10,
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    borderRadius: 6,
    marginVertical: 10,
  },
})
