import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Image,
    Switch,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native'
import { SetupCommunityInput } from '../../components/input'

import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { BASE_URL } from '@env'

import { useNavigation } from '@react-navigation/native'
import {
    setUpCommunityStyles as styles,
    inputStyle,
    appStyle,
} from '../../../styles/style'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Picker } from '@react-native-picker/picker'
import { SelectList } from 'react-native-dropdown-select-list'

import strings from '../../constants/strings'

import sizes from '../../constants/sizes'
import colors from '../../constants/colors'

import CustomKeyboardAvoidingView from '../../components/CustomKeyboardAvoidingView'

export default function SetupCommunity() {
    const [communityName, setCommunityName] = useState('')
    const [communityDescription, setCommunityDescription] = useState('')
    const [communityRule, setCommunityRule] = useState('')
    const [visibility, setVisibility] = useState('')

    const navigation = useNavigation()

    const publishCommunity = async () => {
        if (
            communityName.trim() !== '' &&
            communityDescription.trim() !== '' &&
            communityRule.trim() !== '' &&
            visibility.trim() !== ''
        ) {
            await axios({
                method: 'POST',
                url: `${BASE_URL}/community/create`,
                data: {
                    name: String(communityName),
                    description: String(communityDescription),
                    rules: String(communityRule),
                    visibility: String(visibility),
                    ownerId: await AsyncStorage.getItem('userId'),
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    console.log(res.data)
                    Alert.alert('Successful', 'Community Created')
                    navigation.navigate('Home')
                })
                .catch((err) => {
                    Alert.alert('Unsuccessful', 'Community not created')
                })
        }
    }

    const addPicture = () => {}

    return (
        <CustomKeyboardAvoidingView>
            <Text
                className="my-2 text-base text-orchid-900"
                style={[inputStyle.inputShadow]}
            >
                {strings.setupCommunityName}
            </Text>
            <SetupCommunityInput
                placeholder={strings.setupCommunityNamePlaceholder}
                value={communityName}
                onChangeText={(text) => setCommunityName(text)}
                multiline={true}
                numberOfLines={4}
            />
            <Text
                className="my-2 text-base text-orchid-900"
                style={[inputStyle.inputShadow]}
            >
                {strings.setupCommunityDescription}
            </Text>
            <SetupCommunityInput
                placeholder={strings.setupCommunityDescriptionPlaceholder}
                value={communityDescription}
                onChangeText={(text) => setCommunityDescription(text)}
                multiline={true}
                numberOfLines={4}
            />
            <Text
                className="my-2 text-base text-orchid-900"
                style={[inputStyle.inputShadow]}
            >
                {strings.setupCommunityRules}
            </Text>
            <SetupCommunityInput
                placeholder={strings.setupCommunityRulesPlaceholder}
                value={communityRule}
                onChangeText={(text) => setCommunityRule(text)}
                multiline={true}
                numberOfLines={4}
            />
            <Text
                className="my-2 text-base text-orchid-900"
                style={[inputStyle.inputShadow]}
            >
                {strings.setupCommunityVisibility}
            </Text>
            <SelectList
                data={strings.Visibility}
                setSelected={setVisibility}
                value={visibility}
                boxStyles={[inputStyle.input, inputStyle.inputShadow]}
                dropdownStyles={styles.dropDownActive}
                dropdownItemStyles={styles.dropDownItem}
                maxHeight={sizes.dropDownMaxHeight}
                search={false}
                placeholder={strings.setupCommunityVisibilityPlaceholder}
            />

            <View className="flex w-full flex-row justify-start gap-4 pt-5">
                <TouchableOpacity
                    className="items-center justify-between rounded-3xl border-none bg-orchid-100 p-5 shadow-md"
                    onPress={addPicture}
                >
                    <Ionicons
                        name="ios-add-circle-outline"
                        size={sizes.communityIconSize}
                        color={colors.darkViolet}
                    />
                    <Text className="mt-2 text-center text-sm text-orchid-900">
                        Picture
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="items-center justify-between rounded-3xl border-none bg-orchid-100 p-5 shadow-md"
                    onPress={publishCommunity}
                >
                    <Ionicons
                        name="ios-navigate"
                        size={sizes.communityIconSize}
                        color={colors.darkViolet}
                    />
                    <Text className="mt-2 text-center text-sm text-orchid-900">
                        Publish
                    </Text>
                </TouchableOpacity>
            </View>
        </CustomKeyboardAvoidingView>
    )
}
