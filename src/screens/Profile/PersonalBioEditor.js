import React from 'react'
import {View, Text, TouchableOpacity, TextInput, Dimensions, Alert} from 'react-native'
import { useState, useEffect } from 'react'

import { BASE_URL } from '@env'
import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler'

import STRINGS from '../../constants/strings'

const screenHeight = Dimensions.get('window').height;

export default PersonalBioEditor = ({
                                       setModalVisibility,
                                       userId,
                                       profileBio,
                                       setProfileBio,
                                   }) => {
    const [editedBio, setEditedBio] = useState(profileBio)

    const editProfileBioHandler = async () => {
        if (editedBio != null) {
            axios({
                method: 'POST',
                url: `${BASE_URL}/user/editBio`,
                data: {
                    userId: userId,
                    bio: String(editedBio),
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    Alert.alert('Successful', 'Personal Bio updated')
                    setProfileBio(editedBio)
                })
                .catch((err) => {
                    Alert.alert('Unsuccessful', 'Personal Bio not updated')
                })
        }
    }

    return (
        <View className="mb-2 flex w-full flex-1 p-5">
            <View
                className="flex items-center"
                style={{
                    paddingBottom: 30
                }}
            >
                <Text className="mb-3 text-2xl font-bold text-orchid-900">
                    Edit Personal Bio
                </Text>
            </View>
            <Text className="mb-3 text font-bold text-orchid-900">
                Max 150 Characters*
            </Text>
            <TextInput
                className="mb-4 rounded-lg bg-orchid-100 px-6 py-4 shadow-sm"
                placeholder="Edit personal bio here"
                multiline={true}
                numberOfLines={5}
                onChangeText={(text) => {
                    if (text.length <= 150) { // ensure that the bio never exceeds 150 characters.
                        setEditedBio(text) // keep track of the edited user bio.
                    }
                }}
                style={{
                    textAlignVertical: 'top', // Ensures text starts at the top-left
                    height: screenHeight * 0.25, // 25% of the screen height
                }}
                value={editedBio}
            />
            <View // background filler space.
                style={{
                    flex: 1 // ensures that the main content expands the rest of the available screen height.
                }}
            >
            </View>
            <View className="flex h-fit w-fit flex-row justify-center space-x-2 rounded-full">
                <TouchableOpacity
                    className="flex h-fit flex-1 items-center rounded-xl bg-red-300 px-8 py-2 shadow"
                    onPress={() => {
                        setModalVisibility(false)
                    }}
                >
                    <Text className="align-middle text-base font-bold text-red-900">
                        {STRINGS.cancel}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex h-fit w-1/2 items-center rounded-xl bg-green-300 px-10 py-2 shadow"
                    onPress={() => {
                        editProfileBioHandler();
                        setModalVisibility(false)
                    }}
                >
                    <Text className="align-middle text-base font-bold text-green-900">
                        {STRINGS.save}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
