import { Alert, Text, View } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import COLORS from '../constants/colors'
import STRINGS from '../constants/strings'
import Community from './community/Community'
import Profile from './Profile/Profile'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
                            iconName = focused ? 'ios-home' : 'ios-home-outline'
                            break
                        case STRINGS.communitytab:
                            iconName = focused
                                ? 'ios-earth'
                                : 'ios-earth-outline'
                            break
                        case STRINGS.profiletab:
                            iconName = focused
                                ? 'ios-person-circle'
                                : 'ios-person-circle-outline'
                            break
                        case STRINGS.messagetab:
                            iconName = focused
                                ? 'ios-chatbubble'
                                : 'ios-chatbubble-outline'
                            break
                        case STRINGS.settingstab:
                            iconName = focused ? 'ios-list' : 'ios-list-outline'
                            break
                        default:
                            iconName = 'ios-list'
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
