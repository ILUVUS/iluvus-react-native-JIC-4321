import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { homeStyle as styles } from '../styles/style';
import { communityStyles} from '../styles/style';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SearchBar, Image} from 'react-native-elements';
import loginImage from '../assets/images/loginImage.png';
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

  const updateSearch = (searchText) => {
    setSearch({searchText});
  }

  return (
    <View>
          <SearchBar 
            placeholder='Explore Communities'
            onChangeText={this.updateSearch}
            value = {searchText}
            containerStyle={{ 
              backgroundColor: '#F4EAFF', 
              borderBottomColor: '#F4EAFF', 
              borderTopColor: '#F4EAFF',
            }}
            inputStyle={{ backgroundColor: '#F4EAFF', color: 'purple' }}
            placeholderTextColor='gray'
            searchIcon={{ color: '#F4EAFF' }}
            clearIcon={{ color: '#F4EAFF' }}
          />

        <View style={communityStyles.buttonContainer}>
            <TouchableOpacity style={communityStyles.button} onPress={handleSearch}>
                <Icon name="plus-square" size={50} color="#250059" />
                <Text style={communityStyles.buttonText}>New Group</Text>
            </TouchableOpacity>
            <TouchableOpacity style={communityStyles.button} onPress={handleSearch}>
                <Icon name="users" size={50} color="#250059" />
                <Text style={communityStyles.buttonText}>My Groups</Text>
            </TouchableOpacity>
            <TouchableOpacity style={communityStyles.button} onPress={handleSearch}>
                <Icon name="child" size={50} color="#250059" />
                <Text style={communityStyles.buttonText}>My Friends</Text>
            </TouchableOpacity>
        </View>

        <View>
            <Text style={communityStyles.header}>
                Popular
            </Text>
        </View>

        <View style={communityStyles.buttonContainer}>
            <TouchableOpacity style={communityStyles.button} onPress={handleSearch}>
            <Image source={loginImage} style={styles.image} />
                <Text style={communityStyles.buttonText}>Group A</Text>
            </TouchableOpacity>
            <TouchableOpacity style={communityStyles.button} onPress={handleSearch}>
                <Image source={loginImage} style={styles.image} />
                <Text style={communityStyles.buttonText}>Group B</Text>
            </TouchableOpacity>
            <TouchableOpacity style={communityStyles.button} onPress={handleSearch}>
                <Image source={loginImage} style={styles.image} />
                <Text style={communityStyles.buttonText}>Group C</Text>
            </TouchableOpacity>
        </View>

        <View>
            <Text style={communityStyles.header}>
                Developing
            </Text>
        </View>

        <View style={communityStyles.buttonContainer}>
            <TouchableOpacity style={communityStyles.button} onPress={handleSearch}>
                <Image source={loginImage} style={styles.image} />
                <Text style={communityStyles.buttonText}>Group D</Text>
            </TouchableOpacity>
            <TouchableOpacity style={communityStyles.button} onPress={handleSearch}>
                <Image source={loginImage} style={styles.image} />
                <Text style={communityStyles.buttonText}>Group E</Text>
            </TouchableOpacity>
            <TouchableOpacity style={communityStyles.button} onPress={handleSearch}>
                <Image source={loginImage} style={styles.image} />
                <Text style={communityStyles.buttonText} color="#250059" >Group F</Text>
            </TouchableOpacity>
        </View>
        
        </View>
  );
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



