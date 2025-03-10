

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostItem from '../community/components/PostItem';
import {
   View,
   Text,
   ScrollView,
   RefreshControl,
   KeyboardAvoidingView,
   ActivityIndicator,
   TouchableOpacity
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Constants from 'expo-constants';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import STRINGS from '../../constants/strings';
import COLORS from '../../constants/colors';
import { searchBarStyle } from '../../../styles/style';

const Home = () => {
   const [postData, setPostData] = useState([]);
   const [filteredPosts, setFilteredPosts] = useState([]); // Holds searched/filtered posts
   const [userId, setUserId] = useState('');
   const [refreshing, setRefreshing] = useState(false);
   const [searchValue, setSearchValue] = useState('');

   const navigation = useNavigation();
   const route = useRoute();

   useEffect(() => {
       fetchUserId();
   }, []);

   useEffect(() => {
       if (userId) fetchPosts();
   }, [userId]);

   useEffect(() => {
       if (route.params?.filters) {
           applyFilters(route.params.filters);
       }
   }, [route.params?.filters]);

   const fetchUserId = async () => {
       try {
           const value = await AsyncStorage.getItem('userId');
           if (value) setUserId(value);
       } catch (e) {
           console.log('Error fetching userId:', e);
       }
   };

   const fetchPosts = async () => {
       try {
           const res = await axios.get(`${BASE_URL}/post/getPostForHomePage?userId=${userId}`, {
               headers: { 'Content-Type': 'application/json' },
           });
           const posts = res.data.reverse(); // show latest first
           setPostData(posts);
           setFilteredPosts(posts);
       } catch (err) {
           console.log('Cannot get posts', err);
           setPostData([]);
           setFilteredPosts([]);
       }
   };

   const handleSearch = async (text) => {
       setSearchValue(text);
       
       if (text.trim() === '') {
           setFilteredPosts(postData);
           return;
       }

       try {
           const res = await axios.get(`${BASE_URL}/post/search`, {
               params: {
                   userId: userId,
                   searchTerm: text
               },
               headers: { 'Content-Type': 'application/json' },
           });
           console.log(res.data);
           setFilteredPosts(res.data);
       } catch (err) {
           console.log('Search API failed', err);
           setFilteredPosts([]);
       }
   };

   const applyFilters = async (filters) => {
       try {
           let filtered = postData;

           if (filters.selectedFilters.includes('shared')) {
               const res = await axios.get(`${BASE_URL}/post/getSharedPosts?userId=${userId}`);
               filtered = [...filtered, ...res.data];
           }
           if (filters.selectedFilters.includes('liked')) {
               filtered = [...filtered, ...postData.filter((post) => post.likedBy.includes(userId))];
           }
           if (filters.selectedFilters.includes('tagged')) {
               filtered = [...filtered, ...postData.filter((post) => post.tagged.includes(userId))];
           }
           if (filters.selectedFilters.includes('reported')) {
               const res = await axios.get(`${BASE_URL}/post/getReportedPosts`);
               filtered = [...filtered, ...res.data];
           }
           if (filters.selectedCommunities.length > 0) {
               filtered = [...filtered, ...postData.filter((post) =>
                   filters.selectedCommunities.includes(post.community_id)
               )];
           }

           // Remove duplicates
           const uniqueFilteredPosts = [...new Map(filtered.map(post => [post.id, post])).values()];
           setFilteredPosts(uniqueFilteredPosts);
       } catch (err) {
           console.log('Filter Error:', err);
       }
   };

   return (
       <>
           <KeyboardAvoidingView
               behavior="padding"
               style={{ flex: 1 }}
               keyboardVerticalOffset={useHeaderHeight()}
           >
               <View className="h-screen w-screen flex-1 bg-white">

                   {/* Search Bar & Filter Button */}
                   <View className="flex flex-row items-center px-4 py-2 bg-white">
                       {/* Search Bar */}
                       <SearchBar
                           placeholder="Search posts..."
                           onChangeText={handleSearch}
                           value={searchValue}
                           containerStyle={[searchBarStyle.containerSearchBar, { width: '88%' }]}
                           inputContainerStyle={searchBarStyle.inputSearchBar}
                           inputStyle={searchBarStyle.input}
                           placeholderTextColor={COLORS['orchid'][400]}
                           searchIcon={searchBarStyle.seachIcon}
                           clearIcon={searchBarStyle.clearIcon}
                       />

                       {/* Filter Button */}
                       <TouchableOpacity
                           onPress={() => navigation.navigate('HomeFilterScreen')}
                           className="p-3 bg-orchid-900 rounded-lg ml-2"
                           style={{ width: 45, height: 45, justifyContent: 'center', alignItems: 'center' }}
                       >
                           <FontAwesomeIcon icon={faFilter} size={20} color="white" />
                       </TouchableOpacity>
                   </View>

                   {/* Post List Section */}
                   <View className="h-full w-full">
                       <ScrollView
                           contentContainerStyle={{
                               paddingBottom: Constants.statusBarHeight,
                               minHeight: '100%',
                               flexGrow: 1,
                           }}
                           className="h-full w-full overflow-auto bg-white p-5"
                           refreshControl={
                               <RefreshControl
                                   refreshing={refreshing}
                                   onRefresh={fetchPosts}
                               />
                           }
                       >
                           {filteredPosts.length > 0 ? (
                               filteredPosts.map((post, index) => (
                                   <PostItem
                                       key={index}
                                       post={post}
                                       userId={userId}
                                       displayCommunityName={true}
                                   />
                               ))
                           ) : (
                               <View className="flex h-full w-full items-center justify-center gap-2">
                                   {searchValue.trim() !== '' ? (
                                       <Text className="text-lg font-semibold text-orchid-900">
                                           No matching posts found.
                                       </Text>
                                   ) : (
                                       <>
                                           <ActivityIndicator />
                                           <Text className="text-center text-orchid-900">
                                               {STRINGS.no_post_alert}
                                           </Text>
                                           <Text className="text-center text-orchid-900">
                                               {STRINGS.no_post_message}
                                           </Text>
                                       </>
                                   )}
                               </View>
                           )}
                       </ScrollView>
                   </View>
               </View>
           </KeyboardAvoidingView>
       </>
   );
};

export default Home;
