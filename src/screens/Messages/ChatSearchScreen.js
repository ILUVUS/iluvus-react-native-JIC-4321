import React, { useState, useEffect } from 'react'
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { BASE_URL } from '@env'


export default function ChatSearchScreen() {
    const navigation = useNavigation()

  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [chats, setChats] = useState([])
  const [userId, setUserId] = useState(null)

  

  const getUserNameById = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/user/get?userId=${id}`);
      const data = await res.json();
      return data?.username || data?.fname || 'Unknown';

    } catch (err) {
      console.error('Failed to fetch username for ID:', id);
      return 'Unknown';
    }
  };

  useEffect(() => {
    fetchUserIdAndChats();
  }, []);
  
  
  const fetchUserIdAndChats = async () => {
    const id = await AsyncStorage.getItem('userId');
    setUserId(id);
    if (!id) return;
  
    try {
      const res = await fetch(`${BASE_URL}/chat_room/getChats?userId=${id}`);
      const data = await res.json();
  
      const enrichedChats = await Promise.all(
        data.map(async (chat) => {
          const otherIds = chat.participants.filter(pid => pid !== id);
          const names = await Promise.all(otherIds.map(getUserNameById));
          return {
            ...chat,
            chatId: chat.id || chat._id, 
            participantNames: names,
          };
          
        })
      );
  
      setChats(enrichedChats);
    } catch (err) {
      console.error('Error fetching chats:', err);
    }
  };
  

  useEffect(() => {
    if (search.length === 0) {
      setUsers([])
      return
    }

    fetch(`${BASE_URL}/user/search?filter=${search}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const filtered = data.filter(u => u.id !== userId)
          setUsers(filtered)
        }
      })
      .catch(console.error)
  }, [search])

  const toggleUserSelect = (user) => {
    if (selectedUsers.find(u => u.id === user.id)) {
      setSelectedUsers(prev => prev.filter(u => u.id !== user.id))
    } else {
      setSelectedUsers(prev => [...prev, user])
    }
  }

  const startChat = () => {
    if (!userId || selectedUsers.length === 0) return

    const isGroup = selectedUsers.length > 1

    if (isGroup) {
      Alert.prompt('Group Name', 'Enter a name for the group chat:', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Create',
          onPress: (groupName) => {
            if (!groupName?.trim()) {
              Alert.alert('Group name is required.')
              return
            }
            createChat(groupName)
          },
        },
      ])
    } else {
      createChat('')
    }
  }

  const createChat = (groupName) => {
    const participantIds = [userId, ...selectedUsers.map(u => u.id)].join(',');
    const isGroup = selectedUsers.length > 1;
  
    fetch(`${BASE_URL}/chat_room/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        groupName,
        participants: participantIds,
        creator: userId,
      }),
    })
      .then(res => res.json())
      .then(async (data) => {
        if (!data.chatId) {
          // Check for block-related error
          if (data.error && data.error.includes('block')) {
            Alert.alert('Blocked', 'You or someone in the group has blocked each other. Please review participants.');
          } else {
            Alert.alert('Error', "Chat couldn't be created");
          }
          return;
        }
  
        const otherIds = selectedUsers.map(u => u.id);
        const names = await Promise.all(otherIds.map(getUserNameById));
  
        navigation.navigate('ChatRoom', {
          chat: {
            chatId: data.chatId || data.id,
            participants: [userId, ...otherIds],
            participantNames: names,
            isGroup,
            groupName: groupName || '',
          },
          userId,
        });
      })
      .catch((error) => {
        console.error('Error creating chat:', error);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      });
  };
  

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={styles.header}>Start New Chat</Text>
      <TextInput
        placeholder="Search users..."
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />

      {selectedUsers.length > 0 && (
        <View style={styles.selectedContainer}>
          <Text style={{ fontWeight: 'bold' }}>Selected:</Text>
          {selectedUsers.map(u => (
            <Text key={u.id} style={styles.selectedUser}>{u.username}</Text>
          ))}
        </View>
      )}

      {users.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => toggleUserSelect(item)}
          style={styles.userItem}
        >
          <Text style={styles.username}>{item.username}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.startChatButton} onPress={startChat}>
        <Text style={{ color: 'white' }}>Start Chat</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Recent Chats</Text>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.chatId?.toString() || Math.random().toString()}
        renderItem={({ item }) => {
          const displayName = item.isGroup
            ? item.groupName || 'Unnamed Group'
            : item.participantNames?.join(', ') || 'Direct Chat';
        
          return (
            <TouchableOpacity
              style={styles.chatItem}
              onPress={() =>
                navigation.navigate('ChatRoom', {
                  chat: item,
                  userId,
                })
              }
            >
              <Text>{displayName}</Text>
            </TouchableOpacity>
          );
        }}
        
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 10,
  },
  userItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  chatItem: {
    padding: 12,
    borderBottomWidth: 1,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
  },
  username: {
    fontSize: 16,
  },
  selectedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    gap: 8,
  },
  selectedUser: {
    backgroundColor: '#e3d5ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  startChatButton: {
    marginTop: 10,
    backgroundColor: '#7b5cd6',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
})
