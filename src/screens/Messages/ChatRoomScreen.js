import React, { useState } from 'react'
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from 'react-native'

const BASE_URL = 'https://iluvusapi-524621294197.us-east1.run.app'

export default function ChatRoomScreen({ route }) {
  const { chat, userId } = route.params
  const [messages, setMessages] = useState(chat?.messages ?? [])
  const [text, setText] = useState('')

  const sendMessage = () => {
    if (!text.trim()) return
    fetch(`${BASE_URL}/user/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        senderId: userId,
        receiverId: chat.participants.find((id) => id !== userId),
        content: text,
      }),
    })
      .then(res => res.text())
      .then(() => {
        setMessages(prev => [
          ...prev,
          { senderId: userId, content: text, timestamp: new Date().toISOString() },
        ])
        setText('')
      })
      .catch(console.error)
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              alignSelf: item.senderId === userId ? 'flex-end' : 'flex-start',
              backgroundColor: item.senderId === userId ? '#aee' : '#eee',
              padding: 8,
              marginVertical: 4,
              borderRadius: 6,
              maxWidth: '80%',
            }}
          >
            <Text>{item.content}</Text>
            <Text style={{ fontSize: 10, color: 'gray' }}>{item.timestamp}</Text>
          </View>
        )}
      />
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type a message..."
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          padding: 8,
          borderRadius: 6,
          marginBottom: 10,
        }}
      />
      <Button title="Send" onPress={sendMessage} />
    </KeyboardAvoidingView>
  )
}
