import React, { useState } from 'react'

import axios from 'axios'
import { BASE_URL } from '@env'
import {
    Alert,
    Text,
    TouchableOpacity,
    View,
    Switch,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'

import SIZES from '../../constants/sizes'
import COLORS from '../../constants/colors'
import STRINGS from '../../constants/strings'
import { RegisterInput } from '../../components/input'
import { dropDownStyle, inputStyle } from '../../../styles/style'
import CustomKeyboardAvoidingView from '../../components/CustomKeyboardAvoidingView'

import Modal from 'react-native-modal'
import DateTimePicker from '@react-native-community/datetimepicker'
import Constants from 'expo-constants'

import { useNavigation } from '@react-navigation/native'

import {
    nameValidator,
    emailValidator,
    dobValidator,
    passwordValidator,
} from '../../utils/Utils'

import { useHeaderHeight } from '@react-navigation/elements'

const RegistrationScreen = ({}) => {
    // datatime picker
    const [dateDatePicker, setDateDatePicker] = useState(() => {
        {
            // default date 18 years ago
            const d = new Date()
            d.setFullYear(d.getFullYear() - 18)
            return d
        }
    })

    // default dob in yyyy-mm-dd format
    const [fName, setFname] = useState('Thuan')
    const [lName, setLname] = useState('Vo')
    const [DOB, setDOB] = useState(dateDatePicker.toISOString().split('T')[0])
    const [email, setEmail] = useState('hvo41@gatech.edu')
    const [username, setUsername] = useState('hvo41')
    const [password, setPassword] = useState('thuan0000')
    const [race, setRace] = useState('')
    const [gender, setGender] = useState('')
    // const [proEmail, setProfEmail] = useState('')

    const [isProfessionalUser, setIsProfessionalUser] = useState(false)

    const toggleSwitch = () =>
        setIsProfessionalUser((previousState) => !previousState)

    const navigation = useNavigation()

    const handleRegister = () => {
        const packedData = {
            username: String(username),
            email: String(email),
            password: String(password),
            fname: String(fName),
            lname: String(lName),
            gender: String(gender),
            dob: String(DOB),
            race: String(race),
            interests: '',
            isPro: isProfessionalUser,
        }

        if (!isProfessionalUser) {
            axios({
                method: 'POST',
                url: `${BASE_URL}/user/create`,
                data: packedData,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    // avoid going back to registration screen
                    navigation.reset({
                        index: 0,
                        routes: [{ name: STRINGS.loginscreen }],
                    })
                })
                .catch((err) => {
                    console.log('Error', err)
                    const error = err.response.data
                    Alert.alert(error)
                })
        } else {
            // console.log('Pro Data:', packedData)
            navigation.navigate(STRINGS.verificationscreen, {
                data: packedData,
            })
        }
    }

    const setDate = (event, date) => {
        const {
            type,
            nativeEvent: { timestamp, utcOffset },
        } = event
        //format to get string yyyy-mm-dd
        const dateObj = new Date(timestamp)
        setDateDatePicker(dateObj)
        const formattedDate = date.toISOString().split('T')[0]
        setDOB(formattedDate)
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1 }}
            keyboardVerticalOffset={useHeaderHeight()}
        >
            <ScrollView
                className="flex h-screen w-screen overflow-auto bg-white px-6 py-4"
                contentContainerStyle={{
                    paddingBottom: Constants.statusBarHeight,
                    minHeight: '100%',
                }}
                style={{ flex: 1 }}
            >
                <Text className="pb-2 text-base text-orchid-900 shadow-md shadow-slate-400">
                    First Name
                </Text>
                <RegisterInput
                    autoCapitalize="words"
                    className="text-base text-orchid-900"
                    placeholderTextColor={COLORS['orchid'][400]}
                    placeholder={STRINGS.fnameExample}
                    value={fName}
                    onChangeText={(text) => setFname(text)}
                />
                {!nameValidator(fName) && (
                    <Text className="py-2 text-xs text-red-600">
                        First Name must have 2 or more characters
                    </Text>
                )}
                <Text className="py-2 text-base text-orchid-900 shadow-md shadow-slate-400">
                    Last Name
                </Text>
                <RegisterInput
                    autoCapitalize="words"
                    className="text-base text-orchid-900"
                    placeholderTextColor={COLORS['orchid'][400]}
                    placeholder={STRINGS.lnameExample}
                    value={lName}
                    onChangeText={(text) => setLname(text)}
                />
                {!nameValidator(lName) && (
                    <Text className="py-2 text-xs text-red-600">
                        Last Name must have 2 or more characters.
                    </Text>
                )}
                <View className="flex flex-row items-center justify-start pb-2 pt-5">
                    <Text className="text-base text-orchid-900 shadow-md shadow-slate-400">
                        Date of Birth
                    </Text>
                    <DateTimePicker
                        mode="date"
                        value={dateDatePicker}
                        onChange={setDate}
                        dateFormat="year day month"
                    />
                </View>

                {!dobValidator(DOB) && (
                    <Text className="py-2 text-xs text-red-600">
                        Must be 18 years or older
                    </Text>
                )}

                <Text className="py-2 text-base text-orchid-900 shadow-md shadow-slate-400">
                    Race
                </Text>
                <SelectList
                    data={STRINGS.races}
                    setSelected={setRace}
                    value={race}
                    boxStyles={[inputStyle.input, inputStyle.inputShadow]}
                    dropdownStyles={dropDownStyle.dropDownActive}
                    dropdownItemStyles={dropDownStyle.dropDownItem}
                    maxHeight={SIZES.dropDownMaxHeight}
                    search={false}
                    placeholder={STRINGS.race}
                />

                {race === '' && (
                    <Text className="py-2 text-xs text-red-600">
                        Please select a value
                    </Text>
                )}

                <Text className="py-2 text-base text-orchid-900 shadow-md shadow-slate-400">
                    Gender
                </Text>
                <SelectList
                    data={STRINGS.genders}
                    setSelected={setGender}
                    value={gender}
                    boxStyles={[inputStyle.input, inputStyle.inputShadow]}
                    dropdownStyles={dropDownStyle.dropDownActive}
                    dropdownItemStyles={dropDownStyle.dropDownItem}
                    maxHeight={SIZES.dropDownMaxHeight}
                    search={false}
                    placeholder={STRINGS.gender}
                />
                {gender === '' && (
                    <Text className="py-2 text-xs text-red-600">
                        Please select a value
                    </Text>
                )}

                <View className="mt-3 flex flex-row justify-between py-2">
                    <Text className="text-base text-orchid-900 shadow-md shadow-slate-400">
                        Are you a professional user?
                    </Text>
                    <Switch
                        trackColor={{
                            false: COLORS['gold'][900],
                            true: COLORS['orchid'][300],
                        }}
                        thumbColor={
                            isProfessionalUser
                                ? COLORS['gold'][900]
                                : COLORS['gold'][100]
                        }
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isProfessionalUser}
                    />
                </View>

                <Text className="py-2 text-base text-orchid-900 shadow-md shadow-slate-400">
                    Email
                </Text>
                <RegisterInput
                    autoCapitalize="none"
                    className="text-base text-orchid-900"
                    placeholderTextColor={COLORS['orchid'][400]}
                    placeholder={STRINGS.emailExample}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                />

                {!emailValidator(email) && (
                    <Text className="py-2 text-xs text-red-600">
                        Please enter a valid email address
                    </Text>
                )}

                {/* {!isProfessionalUser && (
                <>
                    <Text className="py-2 text-base text-orchid-900 shadow-md shadow-slate-400">
                        Email
                    </Text>
                    <RegisterInput
                        autoCapitalize="none"
                        className="text-base text-orchid-900"
                        placeholderTextColor={COLORS['orchid'][400]}
                        placeholder={STRINGS.emailExample}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                    />
                </>
            )}
            {isProfessionalUser && (
                <>
                    <Text className="py-2 text-base text-orchid-900 shadow-md shadow-slate-400">
                        Professional Email
                    </Text>
                    <RegisterInput
                        autoCapitalize="none"
                        className="text-base text-orchid-900"
                        placeholderTextColor={COLORS['orchid'][400]}
                        placeholder="Only Required for Professional user"
                        value={proEmail}
                        onChangeText={(text) => setProfEmail(text)}
                        keyboardType="email-address"
                    />
                </>
            )} */}

                <Text className="py-2 text-base text-orchid-900 shadow-md shadow-slate-400">
                    Username
                </Text>
                <RegisterInput
                    autoCapitalize="none"
                    className="text-base text-orchid-900"
                    placeholderTextColor={COLORS['orchid'][400]}
                    placeholder={STRINGS.usernameExample}
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                {!nameValidator(username) && (
                    <Text className="py-2 text-xs text-red-600">
                        Username must have 2 or more characters
                    </Text>
                )}

                <Text className="py-2 text-base text-orchid-900 shadow-md shadow-slate-400">
                    Password
                </Text>
                <RegisterInput
                    autoCapitalize="none"
                    className="text-base text-orchid-900"
                    placeholderTextColor={COLORS['orchid'][400]}
                    placeholder={STRINGS.passwordExample}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />

                {!passwordValidator(password) && (
                    <Text className="py-2 text-xs text-red-600">
                        Password must have 8 or more characters
                    </Text>
                )}

                {nameValidator(fName) &&
                    nameValidator(lName) &&
                    dobValidator(DOB) &&
                    emailValidator(email) &&
                    nameValidator(username) &&
                    passwordValidator(password) && (
                        <View className="my-5 flex items-center">
                            <TouchableOpacity
                                className="flex w-fit items-center rounded-3xl bg-gold-900 px-5 py-4 align-middle shadow-md shadow-slate-200"
                                onPress={handleRegister}
                            >
                                <Text className="w-fit text-base text-orchid-900">
                                    Register
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default RegistrationScreen
