import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import {
    appStyle as styles,
    communityStyles,
    searchBarStyle,
} from '../../styles/style'
import { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { SearchBar, Image } from 'react-native-elements'
import loginImage from '../../assets/images/loginImage.png'
import sampleIcon from '../../assets/images/sampleicon.jpg'

import strings from '../constants/strings'
import colors from '../constants/colors'
import sizes from '../constants/sizes'

import Community from './community/Community'

// const [searchText, setSearchText] = useState("");

// Tab navigation bar for the app
function HomeScreenNav() {
    return (
        <View style={styles.container}>
            <Text>Home!</Text>
        </View>
    )
}

function CommunityScreenNav() {
    return <Community />
}

function ProfileScreenNav() {
    return (
        <View style={styles.container}>
            <Text>ProfileScreen!</Text>
        </View>
    )
}

function MessageScreenNav() {
    return (
        <View style={styles.container}>
            <Text>MessageScreen!</Text>
        </View>
    )
}

function SettingsScreenNav() {
    return (
        <View style={styles.container}>
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
                        case strings.hometab:
                            iconName = focused ? 'ios-home' : 'ios-home-outline'
                            break
                        case strings.communitytab:
                            iconName = focused
                                ? 'ios-earth'
                                : 'ios-earth-outline'
                            break
                        case strings.profiletab:
                            iconName = focused
                                ? 'ios-person-circle'
                                : 'ios-person-circle-outline'
                            break
                        case strings.messagetab:
                            iconName = focused
                                ? 'ios-chatbubble'
                                : 'ios-chatbubble-outline'
                            break
                        case strings.settingstab:
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
                tabBarActiveTintColor: colors.darkViolet,
                tabBarInactiveTintColor: colors.gray,
            })}
        >
            <Tab.Screen name={strings.hometab} component={HomeScreenNav} />
            <Tab.Screen
                name={strings.communitytab}
                component={CommunityScreenNav}
            />
            <Tab.Screen
                name={strings.profiletab}
                component={ProfileScreenNav}
            />
            <Tab.Screen
                name={strings.messagetab}
                component={MessageScreenNav}
            />
            <Tab.Screen
                name={strings.settingstab}
                component={SettingsScreenNav}
            />
        </Tab.Navigator>
    )
}
