import { Alert, Text, View } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import COLORS from '../constants/colors'
import STRINGS from '../constants/strings'
import Community from './community/Community'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Profile from './Profile/Profile'
import Notification from './Notification/Notification'

import { useEffect, useState } from 'react'

function HomeScreenNav() {
    const [userId, setUserId] = useState('')

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
    return (
        <View className="flex h-screen justify-center bg-white p-2 align-middle">
            <Text>Welcome {userId}</Text>
        </View>
    )
}

function CommunityScreenNav() {
    return <Community />
}

function ProfileScreenNav() {
    return <Profile />
}

function NotificationScreenNav() {
    return <Notification />
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
                            iconName = focused
                                ? 'earth'
                                : 'earth-outline'
                            break
                        case STRINGS.profiletab:
                            iconName = focused
                                ? 'person-circle'
                                : 'person-circle-outline'
                            break
                        case STRINGS.notificationtab:
                            iconName = focused
                                ? 'notifications'
                                : 'notifications-outline'
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
                name={STRINGS.notificationtab}
                component={NotificationScreenNav}
            />
            <Tab.Screen
                name={STRINGS.settingstab}
                component={SettingsScreenNav}
            />
        </Tab.Navigator>
    )
}
