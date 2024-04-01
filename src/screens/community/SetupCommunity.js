import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { BASE_URL } from '@env'
import { Alert, Text, View, TouchableOpacity } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'

import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'

import SIZES from '../../constants/sizes'
import COLORS from '../../constants/colors'
import STRINGS from '../../constants/strings'
import { SetupCommunityInput } from '../../components/input'
import { NewCommunityButton } from '../../components/button'
import { dropDownStyle, inputStyle } from '../../../styles/style'
import CustomKeyboardAvoidingView from '../../components/CustomKeyboardAvoidingView'

import { Image } from 'react-native'

import * as ImagePicker from 'expo-image-picker'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

export default function SetupCommunity() {
    const [communityName, setCommunityName] = useState('')
    const [communityDescription, setCommunityDescription] = useState('')
    const [communityRule, setCommunityRule] = useState('')
    const [visibility, setVisibility] = useState('')
    const [ownerId, setOwnerId] = useState('')

    const [communityImage, setCommunityImage] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        const getUserId = async () => {
            try {
                const value = await AsyncStorage.getItem('userId')
                if (value !== null) {
                    setOwnerId(value)
                }
            } catch (e) {
                console.log(e)
            }
        }
        getUserId()
    }, [])

    const pickingImageHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 0.5,
            aspect: [1, 1],
            base64: true,
            allowsEditing: true,
        })

        // console.log(result.assets[0].base64)

        if (!result.canceled) {
            setCommunityImage(result.assets[0].base64)
        } else {
            // alert('You did not select any image.')
        }
    }

    const publishCommunity = async () => {
        if (
            communityName.trim() !== '' &&
            communityDescription.trim() !== '' &&
            communityRule.trim() !== '' &&
            visibility.trim() !== ''
        ) {
            console.log(visibility)
            axios({
                method: 'POST',
                url: `${BASE_URL}/community/create`,
                data: {
                    name: String(communityName),
                    description: String(communityDescription),
                    rules: String(communityRule),
                    visibility: String(visibility),
                    ownerId: String(ownerId),
                    image: communityImage,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    Alert.alert('Successful', 'Community Created')
                    // navigation.navigate('Home')
                    // go back to previous screen
                    navigation.goBack()
                })
                .catch((err) => {
                    Alert.alert('Unsuccessful', 'Community not created')
                })
        }
    }

    const removePicture = () => {
        setCommunityImage('')
    }

    return (
        <CustomKeyboardAvoidingView>
            <Text className="my-2 text-base text-orchid-900 shadow-md shadow-slate-400">
                {STRINGS.setupCommunityName}
            </Text>
            <SetupCommunityInput
                placeholder={STRINGS.setupCommunityNamePlaceholder}
                value={communityName}
                onChangeText={(text) => setCommunityName(text)}
                multiline={true}
                numberOfLines={4}
            />
            <Text className="my-2 text-base text-orchid-900 shadow-md shadow-slate-400">
                {STRINGS.setupCommunityDescription}
            </Text>
            <SetupCommunityInput
                placeholder={STRINGS.setupCommunityDescriptionPlaceholder}
                value={communityDescription}
                onChangeText={(text) => setCommunityDescription(text)}
                multiline={true}
                numberOfLines={4}
            />
            <Text className="my-2 text-base text-orchid-900 shadow-md shadow-slate-400">
                {STRINGS.setupCommunityRules}
            </Text>
            <SetupCommunityInput
                placeholder={STRINGS.setupCommunityRulesPlaceholder}
                value={communityRule}
                onChangeText={(text) => setCommunityRule(text)}
                multiline={true}
                numberOfLines={4}
            />
            <Text className="my-2 text-base text-orchid-900 shadow-md shadow-slate-400">
                {STRINGS.setupCommunityVisibility}
            </Text>
            <SelectList
                data={STRINGS.Visibility}
                setSelected={setVisibility}
                value={visibility}
                boxStyles={[inputStyle.input, inputStyle.inputShadow]}
                dropdownStyles={dropDownStyle.dropDownActive}
                dropdownItemStyles={dropDownStyle.dropDownItem}
                maxHeight={SIZES.dropDownMaxHeight}
                search={false}
                placeholder={STRINGS.setupCommunityVisibilityPlaceholder}
            />

            <View className="flex w-full flex-row justify-start gap-4 pt-5">
                {communityImage.length > 0 ? (
                    <View className="relative h-24 w-24 overflow-auto rounded-3xl border-none bg-gray-100 shadow-lg">
                        <Image
                            source={{
                                uri: `data:image/jpg;base64,${communityImage}`,
                            }}
                            className="absolute h-full w-full overflow-hidden rounded-3xl "
                        />
                        <TouchableOpacity
                            className="absolute right-2 top-2"
                            onPress={() => removePicture()}
                        >
                            <FontAwesomeIcon
                                icon={faCircleXmark}
                                color={COLORS.white}
                                size={SIZES.xMarkIconSizeTag}
                            />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <NewCommunityButton onPress={() => pickingImageHandler()}>
                        <Ionicons
                            name="ios-add-circle-outline"
                            size={SIZES.communityIconSize}
                            color={COLORS['orchid'][900]}
                        />
                        <Text className="mt-2 text-center text-sm text-orchid-900">
                            {STRINGS.picturebtn}
                        </Text>
                    </NewCommunityButton>
                )}

                <NewCommunityButton onPress={publishCommunity}>
                    <Ionicons
                        name="ios-navigate"
                        size={SIZES.communityIconSize}
                        color={COLORS['orchid'][900]}
                    />
                    <Text className="mt-2 text-center text-sm text-orchid-900">
                        {STRINGS.publishbtn}
                    </Text>
                </NewCommunityButton>
            </View>
        </CustomKeyboardAvoidingView>
    )
}
