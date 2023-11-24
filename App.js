import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './login/loginPage'
import RegistrationScreen from './login/simpleRegistration';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { appStyle as styles } from './styles/style';
import SetupCommunity from './screens/SetupCommunity';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{
          title: "Login",
          headerShown:false
        }}/>

        <Stack.Screen 
        name="Registration" 
        component={RegistrationScreen}
        options={{
          title: "Registration",
          headerShown:false
        }} />

        <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: "Home",
          headerShown:false
        }}/>

        <Stack.Screen 
          name="SetupCommunity" 
          component={SetupCommunity} 
          options={{
            title: "SetupCommunity",
            headerShown:true
          }}/>

      </Stack.Navigator>


    </NavigationContainer>
  );
}



