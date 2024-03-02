import { Alert, Text, View } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import COLORS from '../constants/colors'
import STRINGS from '../constants/strings'
import Community from './community/Community'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Profile from './Profile/Profile'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '@env'

function HomeScreenNav() {
    const [userId, setUserId] = useState('')
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        const getUserId = async () => {
            try {
                const value = await AsyncStorage.getItem('userId')
                if (value !== null) {
                    setUserId(value)
                }
            } catch (e) {
                console.log(e)
            }
        }
        getUserId()
    }, [])

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/user/get?userId=${userId}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setUserInfo(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [userId])

    return (
        <View className="flex h-screen justify-center bg-white p-2 align-middle">
            <Text>Welcome {userInfo.lname}, {userInfo.fname}</Text>
        </View>
    )
}

function CommunityScreenNav() {
    return <Community />
}

function ProfileScreenNav() {
    return <Profile />
}

function MessageScreenNav() {
    return (
        <View className="flex h-screen justify-center bg-white p-2 align-middle">
            <Text>MessageScreen!</Text>
        </View>
    )
}

function SettingsScreenNav() {
    return (
        <View className="flex h-screen justify-center bg-white p-2 align-middle">
            <Text>Settings!</Text>
        </View>
    )
}

const Tab = createBottomTabNavigator()

export default function HomeScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName

                    switch (route.name) {
                        case STRINGS.hometab:
                            iconName = focused ? 'home' : 'home-outline'
                            break
                        case STRINGS.communitytab:
                            iconName = focused ? 'earth' : 'earth-outline'
                            break
                        case STRINGS.profiletab:
                            iconName = focused
                                ? 'person-circle'
                                : 'person-circle-outline'
                            break
                        case STRINGS.messagetab:
                            iconName = focused
                                ? 'chatbubble'
                                : 'chatbubble-outline'
                            break
                        case STRINGS.settingstab:
                            iconName = focused ? 'list' : 'list-outline'
                            break
                        default:
                            iconName = 'list'
                            break
                    }

                    // You can return any component that you like here!
                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    )
                },
                tabBarActiveTintColor: COLORS['orchid'][900],
                tabBarInactiveTintColor: COLORS['gray'][400],
            })}
        >
            <Tab.Screen name={STRINGS.hometab} component={HomeScreenNav} />
            <Tab.Screen
                name={STRINGS.communitytab}
                component={CommunityScreenNav}
            />
            <Tab.Screen
                name={STRINGS.profiletab}
                component={ProfileScreenNav}
            />
            <Tab.Screen
                name={STRINGS.messagetab}
                component={MessageScreenNav}
            />
            <Tab.Screen
                name={STRINGS.settingstab}
                component={SettingsScreenNav}
            />
        </Tab.Navigator>
    )
}
