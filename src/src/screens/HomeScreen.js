import { Alert, Settings, Text, View } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import COLORS from '../constants/colors'
import STRINGS from '../constants/strings'
import Community from './community/Community'
import Profile from './Profile/Profile'
import Home from './Home/Home.js'
import Notification from './Notification/Notification'
import Setting from './Settings/Settings'

function HomeScreenNav() {
    return <Home />
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
    return <Setting />
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
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name={STRINGS.profiletab}
                component={ProfileScreenNav}
            />
            <Tab.Screen
                name={STRINGS.notificationtab}
                component={Notification}
            />
            <Tab.Screen
                name={STRINGS.settingstab}
                component={SettingsScreenNav}
            />
        </Tab.Navigator>
    )
}
