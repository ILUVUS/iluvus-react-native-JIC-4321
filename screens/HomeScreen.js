import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { communityStyles} from '../styles/style';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const Stack = createStackNavigator();



// Tab navigation bar for the app
function homeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function communityScreen() {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
        // search logic
        Alert.alert("Search", "Searching for:")
        setSearchTerm("")
  }
  const navigation = useNavigation();
  
  const handleNewGroup = () => {
    // Navigate to the 'SetupCommunity' screen when the "New Group" button is pressed
    navigation.navigate('SetupCommunity');

  }

  return (
    <View>
        <View style={communityStyles.searchContainer}>
             <TextInput
                style={communityStyles.input}
                //value=input
                onChangeText={(text) => setSearchTerm(text)}
                placeholder='Explore Communities'
                />
        </View>
        <View style={communityStyles.buttonContainer}>
            <TouchableOpacity style={communityStyles.button} onPress={handleNewGroup}>
                <Text style={communityStyles.buttonText}>New Group</Text>
            </TouchableOpacity>
            <TouchableOpacity style={communityStyles.button} onPress={handleSearch}>
                <Text style={communityStyles.buttonText}>My Groups</Text>
            </TouchableOpacity>
            <TouchableOpacity style={communityStyles.button} onPress={handleSearch}>
                <Text style={communityStyles.buttonText}>My Friends</Text>
            </TouchableOpacity>
        </View>
        <View>
            <Text style={communityStyles.header}>
                Popular
            </Text>
        </View>

        <View>
          <Text>
            popular communities
          </Text>
        </View>

        <View>
            <Text style={communityStyles.header}>
                Developing
            </Text>
        </View>

        <View>
          <Text>
            popular communities
          </Text>
        </View>
        
        </View>
  )
}

function profileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ProfileScreen!</Text>
    </View>
  );
}

function messageScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>MessageScreen!</Text>
    </View>
  );
}

function settingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();


export default function HomeScreen() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
              ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Community') {
              iconName = focused ? 'ios-earth' : 'ios-earth-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'ios-person-circle' : 'ios-person-circle-outline';
            }else if (route.name === 'Message') {
              iconName = focused ? 'ios-chatbubble' : 'ios-chatbubble-outline';
            }else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }
            

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#250059',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={homeScreen} />
        <Tab.Screen name="Community" component={communityScreen} />
        <Tab.Screen name="Profile" component={profileScreen} />
        <Tab.Screen name="Message" component={messageScreen} />
        <Tab.Screen name="Settings" component={settingsScreen} />
      </Tab.Navigator>
  );
}



