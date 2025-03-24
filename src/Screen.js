import { LogBox } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import STRINGS from './constants/strings'
import PostScreen from './screens/Profile/PostScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/login/Login'
import RegistrationScreen from './screens/login/Registration'
import SetupCommunity from './screens/community/SetupCommunity'
import CommunityView from './screens/community/CommunityView'
import AuthScreen from './screens/login/Auth'
import Post from './screens/community/Post'
import Comments from './screens/community/Comments'
import Verification from './screens/login/Verification'
import Settings from './screens/Settings/Settings'
import Notification from './screens/Notification/Notification'
import ReportView from './screens/Report/ReportView'
import MyGroup from './screens/community/MyGroup'
import MyCreatedGroup from './screens/community/MyCreatedGroup'
import MediaViewer from './screens/community/components/MediaViewer'
import ForgotPasswordScreen from './screens/login/ForgotPasswordScreen'
import CommunityFilterScreen from './screens/community/CommunityFilterScreen'

LogBox.ignoreAllLogs(true)

const Stack = createStackNavigator()

export default function Screen() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={STRINGS.InitialRoute}>
                <Stack.Screen
                    name={STRINGS.authscreen}
                    component={AuthScreen}
                    options={{
                        title: STRINGS.authscreen,
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name={STRINGS.comment}
                    component={Comments}
                    options={{
                        title: STRINGS.Comment,
                        headerShown: true,
                    }}
                />

                <Stack.Screen
                    name={STRINGS.loginscreen}
                    component={LoginScreen}
                    options={{
                        title: STRINGS.loginscreen,
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="PostScreen" // Make sure this matches exactly with navigation.navigate()
                    component={PostScreen}
                    options={{
                        title: 'My Posts',
                        headerShown: true,
                    }}
                />

                <Stack.Screen
                    name={STRINGS.registerscreen}
                    component={RegistrationScreen}
                    options={{
                        title: STRINGS.registerscreen,
                        headerShown: true,
                    }}
                />

                <Stack.Screen
                    name={STRINGS.homescreen}
                    component={HomeScreen}
                    options={{
                        title: STRINGS.homescreen,
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name={STRINGS.communityView}
                    component={CommunityView}
                    options={{
                        title: STRINGS.communityView,
                        headerShown: true,
                    }}
                />

                <Stack.Screen
                    name={STRINGS.setupCommunity}
                    component={SetupCommunity}
                    options={{
                        title: STRINGS.newCommunity,
                        headerShown: true,
                    }}
                />

                <Stack.Screen
                    name={STRINGS.myGroup}
                    component={MyGroup}
                    options={{
                        title: STRINGS.myCommunity,
                        headerShown: true,
                    }}
                />

                <Stack.Screen
                    name={STRINGS.verificationscreen}
                    component={Verification}
                    options={{
                        title: STRINGS.verificationscreen,
                        headerShown: true,
                    }}
                />

                <Stack.Screen
                    name={STRINGS.Post}
                    component={Post}
                    options={{
                        title: STRINGS.Post,
                        headerShown: true,
                    }}
                />

                <Stack.Screen
                    name={STRINGS.notificationtab}
                    component={Notification}
                    options={{
                        title: STRINGS.notificationtab,
                        headerShown: true,
                    }}
                />

                <Stack.Screen
                    name={STRINGS.settings}
                    component={Settings}
                    options={{
                        title: STRINGS.settings,
                        headerShown: true,
                    }}
                />

                <Stack.Screen
                    name={STRINGS.reportscreen}
                    component={ReportView}
                    options={{
                        title: STRINGS.reportscreen,
                        headerShown: true,
                    }}
                />
                <Stack.Screen
                    name={STRINGS.MyCreatedGroup}
                    component={MyCreatedGroup}
                    options={{
                        title: STRINGS.myGroups,
                        headerShown: true,
                    }}
                />

                <Stack.Screen
                    name={STRINGS.imageviewerscreen}
                    component={MediaViewer}
                    options={{
                        title: STRINGS.imageviewerscreen,
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="ForgotPasswordScreen"
                    component={ForgotPasswordScreen}
                    options={{
                        title: 'Forgot Password',
                        headerShown: true,
                    }}
                />
                <Stack.Screen
                    name="CommunityFilterScreen"
                    component={CommunityFilterScreen}
                    options={{
                        title: 'Filter Communities',
                        headerShown: true,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
