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
    const [fName, setFname] = useState('')
    const [lName, setLname] = useState('')
    const [DOB, setDOB] = useState(dateDatePicker.toISOString().split('T')[0])
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [race, setRace] = useState('')
    const [gender, setGender] = useState('')
    // const [proEmail, setProfEmail] = useState('')

    const [isProfessionalUser, setIsProfessionalUser] = useState(false)

    const toggleSwitch = () =>
        setIsProfessionalUser((previousState) => !previousState)

    const navigation = useNavigation()

    const [acceptedTerms, setAcceptedTerms] = useState(false)

    const [showTermsModal, setShowTermsModal] = useState(false)

    const handleRegister = () => {

        if (!acceptedTerms) {
            Alert.alert('Terms and Conditions', 'Please accept the Terms and Conditions before continuing.')
            return
        }
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
                        {STRINGS.fname_alert}
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
                        {STRINGS.lname_alert}
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
                        {STRINGS.dob_alert}
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
                        {STRINGS.invalid_value_alert}
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
                        {STRINGS.invalid_value_alert}
                    </Text>
                )}

                <View className="mt-3 flex flex-row items-center justify-between py-2">
                    <Text className="text-base text-orchid-900 shadow-md shadow-slate-400">
                        {STRINGS.pro_user_question}
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
                        {STRINGS.email_alert}
                    </Text>
                )}

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
                        {STRINGS.username_alert}
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
                    <Text className= "py-2 text-xs text-red-600">
                        {STRINGS.password_alert}
                    </Text>
                )}

                 <View className="mt-5 flex flex-row items-center">
                    <Switch
                        value= {acceptedTerms}
                        onValueChange= {(val) => setAcceptedTerms(val)}
                        trackColor= {{ false: '#767577', true: COLORS['orchid'][300] }}
                        thumbColor = {acceptedTerms ? COLORS['gold'][900] : COLORS['gold'][100]}
                    />
                    <Text style= {{ marginLeft: 8, color: COLORS['orchid'][900] }}>
                        I accept the Terms and Conditions
                    </Text>
                </View>

                <TouchableOpacity onPress= {() => setShowTermsModal(true)}>
                    <Text
                        style= {{
                            color: 'blue',
                            textDecorationLine: 'underline',
                            marginTop: 6,
                        }}
                    >
                        View Terms and Conditions
                    </Text>
                </TouchableOpacity>

                <Modal
                    visible= {showTermsModal}
                    transparent
                    animationType= "slide"
                    onRequestClose={() => setShowTermsModal(false)}
                >

                    <View
                        style={{
                            flex: 1,
                             backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 10,
                                borderColor: 'orchid',
                                padding: 16,
                                width: '90%',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 10,
                                    color: COLORS['orchid'][900],
                                }}
                            >
                                Terms and Conditions
                            </Text>
                            <ScrollView style={{ maxHeight: 250 }}>
                                <Text
                                    style={{
                                        color: COLORS['orchid'][900],
                                        marginBottom: 20,
                                    }}
                                >
                                    1. You must be at least 18 years old.{'\n'}
                                    2. By using this app, you agree to treat every one with respect{'\n'}
                                    3. By using this app, you agree to your profile being shared with others {'\n'}
                                    4. You also agree to the rest: {'\n'}
                                </Text>
                            </ScrollView>
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    padding: 8,
                                    backgroundColor: COLORS['orchid'][100],
                                    borderRadius: 8,
                                }}
                                onPress={() => setShowTermsModal(false)}
                            >
                                <Text style={{ color: COLORS['orchid'][900] }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {nameValidator(fName) &&
                nameValidator(lName) &&
                dobValidator(DOB) &&
                emailValidator(email) &&
                nameValidator(username) &&
                passwordValidator(password) &&
                acceptedTerms  ? (
                    <View className="my-5 flex items-center">
                        <TouchableOpacity
                            className="flex w-fit items-center rounded-3xl bg-gold-900 px-5 py-4 align-middle shadow-md shadow-slate-200"
                            onPress={() => handleRegister()}
                        >
                            <Text className="w-fit text-base text-orchid-900">
                                Register
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View className="mt-3 rounded-xl bg-orchid-100 p-3 shadow shadow-slate-200">
                        <Text className="text-base text-red-500">
                            {STRINGS.registration_button_alert}
                            {!acceptedTerms && ' (Must accept T&C)'}
                        </Text>
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default RegistrationScreen
