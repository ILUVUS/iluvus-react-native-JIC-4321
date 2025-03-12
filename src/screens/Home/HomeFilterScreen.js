import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';


import COLORS from '../../constants/colors';


const HomeFilterScreen = ({ route }) => {
   const navigation = useNavigation();
   const [userId, setUserId] = useState('');


   // Multi-Select Filters
   const [selectedFilters, setSelectedFilters] = useState([]);
   const [selectedCommunities, setSelectedCommunities] = useState([]);


   // Dropdown states
   const [filterOpen, setFilterOpen] = useState(false);
   const [communityOpen, setCommunityOpen] = useState(false);
  
   // Options
   const [filterOptions] = useState([
       { label: "Shared Posts", value: "shared" },
       { label: "Liked Posts", value: "liked" },
       { label: "Tagged Posts", value: "tagged" },
       { label: "Reported Posts", value: "reported" },
   ]);
   const [communityOptions, setCommunityOptions] = useState([]);


   useEffect(() => {
       fetchUserId();
       fetchCommunities();


       // Load previous filters if returning from Home.js
       if (route.params?.filters) {
           setSelectedFilters(route.params.filters.selectedFilters || []);
           setSelectedCommunities(route.params.filters.selectedCommunities || []);
       }
   }, []);


   const fetchUserId = async () => {
       const value = await AsyncStorage.getItem('userId');
       if (value) setUserId(value);
   };


   const fetchCommunities = async () => {
       try {
           const res = await axios.get(`${BASE_URL}/community/all`, {
               headers: { 'Content-Type': 'application/json' },
           });
           const formattedOptions = res.data.map((community) => ({
               label: community.name,
               value: community.id,
           }));
           setCommunityOptions(formattedOptions);
       } catch (err) {
           console.log("⚠ Failed to fetch communities:", err);
           setCommunityOptions([]);  // Prevents dropdown errors
       }
   };


   const applyFilters = () => {
       navigation.navigate('Home', {
           filters: { selectedFilters, selectedCommunities }
       });
   };


   return (
       <View className="flex-1 bg-white p-5">
           

           {/* Multi-Select Post Filters (Higher zIndex) */}
           <View style={{ zIndex: 3000 }}>
               <Text className="text-base text-orchid-800 mb-1">Filter By:</Text>
               <DropDownPicker
                   open={filterOpen}
                   value={selectedFilters}
                   items={filterOptions}
                   setOpen={setFilterOpen}
                   setValue={setSelectedFilters}
                   multiple={true} // Enables multi-select
                   min={0}
                   max={4}
                   mode="BADGE" // Shows selected values as a badge
                   showBadgeDot={true}
                   style={{
                       borderWidth: 1,
                       borderColor: '#ccc',
                       borderRadius: 8,
                       backgroundColor: COLORS.orchid[100],
                       marginBottom: 10
                   }}
                   dropDownContainerStyle={{
                       borderColor: '#ccc',
                   }}
               />
           </View>


           {/* Searchable & Multi-Select Community Filter (Lower zIndex) */}
           <View style={{ zIndex: 2000 }}>
               <Text className="text-base text-orchid-800 mb-1 mt-2">Select Communities:</Text>
               <DropDownPicker
                   open={communityOpen}
                   value={selectedCommunities}
                   items={communityOptions}
                   setOpen={setCommunityOpen}
                   setValue={setSelectedCommunities}
                   searchable={true} // Enables search
                   multiple={true} // Enables multi-select
                   mode="BADGE"
                   showBadgeDot={true}
                   placeholder="Search and select communities"
                   style={{
                       borderWidth: 1,
                       borderColor: '#ccc',
                       borderRadius: 8,
                       backgroundColor: COLORS.orchid[100],
                       marginBottom: 10
                   }}
                   dropDownContainerStyle={{
                       borderColor: '#ccc',
                   }}
               />
           </View>


           {/* Apply Button */}
           <TouchableOpacity
               onPress={applyFilters}
               style={{
                   backgroundColor: COLORS.orchid[900],
                   borderRadius: 8,
                   paddingVertical: 10,
                   alignItems: 'center',
                   marginTop: 10,
               }}
           >
               <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Apply Filters</Text>
           </TouchableOpacity>
       </View>
   );
};


export default HomeFilterScreen;