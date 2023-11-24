import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Switch, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { groupStyles as styles } from '../styles/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { SelectList } from 'react-native-dropdown-select-list';

export default function SetupCommunity() {


    const [postText, setPostText] = useState('');
    const [visibility, setVisibility] = useState('');
    const Visibility = [
        { key: 'Private', value: "Private" },
        { key: 'Public', value: "Public" },
    ];

    
    const handlePublish = () => {
        if (postText.trim() !== '') {
            // Execute the onPost function and pass the postText
            onPost({ text: postText, visibility });
            // Clear the text input and reset visibility to 'public'
            setPostText('');
            setVisibility('public');

        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>New Group Title</Text>
            <TextInput
                style={styles.input}
                placeholder="Write your group title..."
                value={postText}
                onChangeText={(text) => setPostText(text)}
                multiline={true}
                numberOfLines={4}
            />
            <Text style={styles.title}>Description</Text>
            <TextInput
                style={styles.input}
                placeholder="Please input description about the group..."
                value={postText}
                onChangeText={(text) => setPostText(text)}
                multiline={true}
                numberOfLines={4}
            />
            <Text style={styles.title}>Rules</Text>
            <TextInput
                style={styles.input}
                placeholder="Please input rules for the group..."
                value={postText}
                onChangeText={(text) => setPostText(text)}
                multiline={true}
                numberOfLines={4}
            />
            <Text style={styles.title}>Set Group's Visibility</Text>
            {/* <Picker
                style={styles.visibilityPicker}
                selectedValue={visibility}
                onValueChange={(itemValue) => setVisibility(itemValue)}
            >
                <Picker.Item label="Public" value="public" />
                <Picker.Item label="Private" value="private" />
            </Picker> */}
            <SelectList
                data={Visibility}
                setSelected={setVisibility}
                value={visibility}
                boxStyles={{ marginBottom: 10, backgroundColor: "#F4EAFF", borderColor: '#ddd',width: 200, height: 50, borderRadius: 8, padding: 8, marginRight: 8,}}
                dropdownStyles={{ marginBottom: 10, marginRight: 10,width: 200, borderRadius: 8,}}
                placeholder="Select"
                maxHeight={75}
            />

            <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
                <Ionicons name="ios-navigate" size={30} color="#250059" />
                <Text style={styles.buttonText}>Publish</Text>


            </TouchableOpacity>
            <TouchableOpacity style={styles.imageButton} onPress={handlePublish}>
                <Ionicons name="ios-add-circle-outline" size={30} color="#250059" />
                <Text style={styles.buttonText}>Picture</Text>

            </TouchableOpacity>
        </View>
    );
}


