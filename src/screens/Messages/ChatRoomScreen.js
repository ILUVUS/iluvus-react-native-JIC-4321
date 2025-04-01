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
    if (!chat?.chatId) {
      console.warn("No chatId available, skipping fetch");
      return;
    }

  fetch(`${BASE_URL}/chat_room/${chat.chatId}/recent_messages?page=0&size=50`)
      .then(res => res.json())
     .then(data => {
        if (Array.isArray(data?.content)) {
         setMessages(data.content)
       }
      })
     .catch(console.error)
  }, [chat.chatId])

  useEffect(() => {
    const fetchMessages = async () => {
      const cached = await AsyncStorage.getItem(`chat_${chat.chatId}`);
      if (cached) setMessages(JSON.parse(cached));
  
      fetch(`${BASE_URL}/chat_room/${chat.chatId}/recent_messages?page=0&size=200`)
      .then(res => res.json())
        .then(data => {
          if (Array.isArray(data?.content)) {
            setMessages(data.content);
            AsyncStorage.setItem(`chat_${chat.chatId}`, JSON.stringify(data.content));
          }
        })
        .catch(console.error);
    };
  
    fetchMessages();
  }, [chat.chatId]);
  

  const sendMessage = () => {
    if (!text.trim()) return;
  
    const endpoint = isGroup
      ? `${BASE_URL}/chat_message/group`
      : `${BASE_URL}/chat_message/direct`;
  
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
    .then(res => {
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      return res.text();
    })
      .then(async res => {
        const text = await res.text();
        try {
          return JSON.parse(text); 
        } catch {
          console.error('Invalid JSON response:', text);
          return null;
        }
      })
      .then(newMessage => {
        if (newMessage && newMessage.message) {
          const updatedMessages = [...messages, newMessage];
          setMessages(updatedMessages);
          AsyncStorage.setItem(`chat_${chat.chatId}`, JSON.stringify(updatedMessages));
          setText('');
        }
      })
      
      .catch(console.error);
  };
  

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
