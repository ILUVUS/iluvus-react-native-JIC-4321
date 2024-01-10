import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Screens imports
import LoginScreen from './screens/login/Login'
import RegistrationScreen from './screens/login/Registration'
import HomeScreen from './screens/HomeScreen'
import SetupCommunity from './screens/community/SetupCommunity'

// Constants imports
import strings from './constants/strings'

import { LogBox } from 'react-native'

LogBox.ignoreAllLogs(true)

// console.ignoredYellowBox = ['Warning: Failed propType: SceneView'];

const Stack = createStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={strings.login}>
                <Stack.Screen
                    name={strings.login}
                    component={LoginScreen}
                    options={{
                        title: strings.login,
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name={strings.register}
                    component={RegistrationScreen}
                    options={{
                        title: strings.register,
                        headerShown: true,
                    }}
                />

                <Stack.Screen
                    name={strings.home}
                    component={HomeScreen}
                    options={{
                        title: strings.home,
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name={strings.setupCommunity}
                    component={SetupCommunity}
                    options={{
                        title: strings.newCommunity,
                        headerShown: true,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
