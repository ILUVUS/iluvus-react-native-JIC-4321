import React, { useEffect, useState, useRef } from 'react'
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
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChatRoomScreen({ route, navigation }) {
  const { chat, userId } = route.params
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const flatListRef = useRef();

  const isGroup = chat?.isGroup
  const receiverId = !isGroup
    ? chat.participants.find(id => id !== userId)
    : null

  // useEffect(() => {
  //   if (!chat?.chatId) {
  //     console.warn("No chatId available, skipping fetch");
  //     return;
  //   }

  // fetch(`${BASE_URL}/chat_room/${chat.chatId}/recent_messages?page=0&size=50`)
  //     .then(res => res.json())
  //    .then(data => {
  //       if (Array.isArray(data?.content)) {
  //         setMessages(data.content.reverse());
  //      }
  //     })
  //    .catch(console.error)
  // }, [chat.chatId])

 
  

  const sendMessage = async () => {
    if (!text.trim()) return;
  
    const endpoint = isGroup
      ? `${BASE_URL}/chat_message/group`
      : `${BASE_URL}/chat_message/direct`;
  
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: chat.chatId,
          senderId: userId,
          receiverId: isGroup ? null : receiverId,
          message: text,
          timestamp: new Date().toISOString(),
        }),
      });
  
      if (!res.ok) {
        console.error('Failed to send message:', await res.text());
        return;
      }
  
      const newMessage = await res.json();
  
      if (newMessage && newMessage.message) {
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        await AsyncStorage.setItem(`chat_${chat.chatId}`, JSON.stringify(updatedMessages));
        setText('');
        flatListRef.current?.scrollToEnd({ animated: true }); // scroll to bottom
      }
  
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };
  
  
  useEffect(() => {
    const fetchMessages = async () => {
      const cached = await AsyncStorage.getItem(`chat_${chat.chatId}`);
      if (cached) setMessages(JSON.parse(cached));
  
      fetch(`${BASE_URL}/chat_room/${chat.chatId}/recent_messages?page=0&size=200`)
      .then(res => res.json())
        .then(data => {
          if (Array.isArray(data?.content)) {
            const ordered = data.content.reverse();
            setMessages(ordered);
            AsyncStorage.setItem(`chat_${chat.chatId}`, JSON.stringify(ordered));
          }
          
        })
        .catch(console.error);
    };
  
    fetchMessages();
  }, [chat.chatId]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <FlatList
      ref={flatListRef}
        data={messages}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
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
            <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
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
