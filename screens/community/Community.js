import React, { Component } from "react";
import { Text, View, TouchableOpacity, Alert, ScrollView, RefreshControl } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SearchBar, Image } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { BASE_URL} from '@env';
// import Images
import sampleIcon from "../../assets/images/sampleicon.jpg";

// import styles
import {
    appStyle as styles,
    communityStyles,
    searchBarStyle,
    inputStyle
  } from "../../styles/style";

// import constants
import strings from "../../constants/strings";
import colors from "../../constants/colors";
import sizes from "../../constants/sizes";

const Community = () => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [communityList, setCommunityList] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      // refresh the communityList
      fetchCommunityList();
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }, []);

    useEffect(() => {
      fetchCommunityList();
    }, []);  
    
    const fetchCommunityList = async () => {
      axios({
        method: "GET",
        url: `${BASE_URL}/community/all`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res.data);
        setCommunityList(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    };
    
    const groupedCommunityList = communityList.reduce((resultArray, item, index) => { 
      const chunkIndex = Math.floor(index/3)
    
      if(!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }
    
      resultArray[chunkIndex].push(item)
    
      return resultArray
    }, [])

    const newCommunity = () => {
        navigation.navigate('SetupCommunity');
    }

    const myCommunity = () => {
        navigation.navigate('SetupCommunity');
    }

    const myFriend = () => {
        navigation.navigate('SetupCommunity');
    }

    const communityClick = () => {
        Alert.alert("Search", "Search for a group");
    }

    const searchFunction = (text) => {
        // bla bla things here
        setSearchValue(text);
    };
    return (
      <View style={styles.homeContainer}>
        <SearchBar
          placeholder={strings.communitySearchBar}
          onChangeText={(text) => searchFunction(text)}
          value={searchValue}
          containerStyle={[searchBarStyle.containerSearchBar, inputStyle.inputShadow]}
          inputContainerStyle={searchBarStyle.inputSearchBar}
          inputStyle={searchBarStyle.input}
          placeholderTextColor={colors.lightDarkviolet}
          searchIcon={searchBarStyle.seachIcon}
          clearIcon={searchBarStyle.clearIcon}
        />
        <ScrollView contentContainerStyle={styles.scrollableContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
          <View style={communityStyles.buttonContainer}>
            <TouchableOpacity
              style={[
                communityStyles.buttonIcon, 
                inputStyle.inputShadow, 
                inputStyle.inputShadow
                ]}
              onPress={newCommunity}
            >
              <Icon
                name="plus"
                size={sizes.communityIconSize}
                color={colors.darkViolet}
              />
              <Text style={communityStyles.buttonText}>{strings.newCommunity}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[communityStyles.buttonIcon, inputStyle.inputShadow]}
              onPress={myCommunity}
            >
              <Icon
                name="users"
                size={sizes.communityIconSize}
                color={colors.darkViolet}
              />
              <Text style={communityStyles.buttonText}>{strings.myCommunity}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[communityStyles.buttonIcon, inputStyle.inputShadow]}
              onPress={myFriend}
            >
              <Icon
                name="child"
                size={sizes.communityIconSize}
                color={colors.darkViolet}
              />
              <Text style={communityStyles.buttonText}>{strings.myFriends}</Text>
            </TouchableOpacity>
          </View>


          <View>
            <Text style={[communityStyles.header, inputStyle.inputShadow]}>Developing</Text>
          </View>

          {groupedCommunityList.map((group, index) => (
            <View key={index} style={communityStyles.buttonContainer}>
              {group.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[communityStyles.buttonImage, inputStyle.inputShadow]}
                  onPress={communityClick}
                >
                  <Image
                    source={sampleIcon}
                    style={communityStyles.communityImage}
                  />
                  <Text style={communityStyles.buttonText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}

        </ScrollView>
      </View>
    );
  }
  export default Community;

