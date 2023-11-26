import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screens/login/Login";
import RegistrationScreen from "./screens/login/Registration";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { appStyle as styles } from "./styles/style";
import strings from "./constants/strings";

const Stack = createStackNavigator();

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
