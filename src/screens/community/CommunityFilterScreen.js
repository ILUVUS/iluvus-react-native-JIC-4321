import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../constants/colors';
import DropDownPicker from 'react-native-dropdown-picker';

const CommunityFilterScreen = ({ route }) => {
    const navigation = useNavigation();
    const [selectedOwner, setSelectedOwner] = useState("");

    // Dropdown states
    const [communityTypeOpen, setCommunityTypeOpen] = useState(false);
    const [selectedCommunityType, setSelectedCommunityType] = useState('');
    const [communityTypeOptions] = useState([
        { label: "All", value: "" },
        { label: "General", value: "General" },
        { label: "Professional", value: "Professional" }
    ]);

    const [visibilityOpen, setVisibilityOpen] = useState(false);
    const [selectedVisibility, setSelectedVisibility] = useState('');
    const [visibilityOptions] = useState([
        { label: "All", value: "" },
        { label: "Public", value: "Public" },
        { label: "Private", value: "Private" }
    ]);

    // Apply filter and return to Community.js
    const applyFilters = () => {
        let filtered = communityListInfo;

        if (selectedCommunityType) {
            filtered = filtered.filter((item) => item.type === selectedCommunityType);
        }

        if (selectedVisibility) {
            filtered = filtered.filter((item) => item.visibility === selectedVisibility);
        }

        if (selectedOwner.trim() !== "") {
            filtered = filtered.filter((item) => 
                item.ownerUsername.toLowerCase().includes(selectedOwner.toLowerCase())
            );
        }

        setFilteredCommunities(filtered);
    };

    return (
    <View className="flex-1 bg-white p-5">
    

    {/* Community Type Dropdown */}
    <View style={{ zIndex: 3000 }}>
        <Text className="text-base text-orchid-800 mb-1 mt-2">Community Type:</Text>
        <DropDownPicker
            open={communityTypeOpen}
            value={selectedCommunityType}
            items={communityTypeOptions}
            setOpen={setCommunityTypeOpen}
            setValue={setSelectedCommunityType}
            style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 8,
                backgroundColor: COLORS.orchid[100],
                marginBottom: 10
            }}
            dropDownContainerStyle={{
                borderColor: '#ccc'
            }}
        />
    </View>

    {/* Group Visibility Dropdown */}
    <View style={{ zIndex: 2000 }}>
        <Text className="text-base text-orchid-800 mb-1 mt-2">Group Visibility:</Text>
        <DropDownPicker
            open={visibilityOpen}
            value={selectedVisibility}
            items={visibilityOptions}
            setOpen={setVisibilityOpen}
            setValue={setSelectedVisibility}
            style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 8,
                backgroundColor: COLORS.orchid[100],
                marginBottom: 10
            }}
            dropDownContainerStyle={{
                borderColor: '#ccc'
            }}
        />
    </View>

    {/* Owner Username Search */}
    <Text className="text-base text-orchid-800 mb-1 mt-2">Search by Owner Username:</Text>
    <TextInput
        placeholder="Enter owner username..."
        value={selectedOwner}
        onChangeText={(text) => setSelectedOwner(text)}
        style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 10,
            height: 40,
            fontSize: 14,
            marginBottom: 20
        }}
    />

    {/* Apply Filters Button */}
    <TouchableOpacity
        onPress={applyFilters}
        style={{
            backgroundColor: COLORS.orchid[900],
            borderRadius: 8,
            paddingVertical: 10,
            alignItems: 'center'
        }}
    >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Apply Filters</Text>
    </TouchableOpacity>
</View>

    );
};

export default CommunityFilterScreen;
