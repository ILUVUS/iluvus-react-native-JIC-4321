import React, { useState } from 'react'

import axios from 'axios'
import { BASE_URL } from '@env'
import { Alert, Text, TouchableOpacity, View, Switch } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'

import SIZES from '../../constants/sizes'
import COLORS from '../../constants/colors'
import STRINGS from '../../constants/strings'
import { RegisterInput } from '../../components/input'
import { dropDownStyle, inputStyle } from '../../../styles/style'
import CustomKeyboardAvoidingView from '../../components/CustomKeyboardAvoidingView'

import Modal from 'react-native-modal'
import DateTimePicker from '@react-native-community/datetimepicker'

import { useNavigation } from '@react-navigation/native'

const RegistrationScreen = ({}) => {
    // datatime picker
    const [dateDatePicker, setDateDatePicker] = useState(new Date())

    // default dob in yyyy-mm-dd format
    const [fName, setFname] = useState('')
    const [lName, setLname] = useState('')
    const [DOB, setDOB] = useState(dateDatePicker.toISOString().split('T')[0])
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [race, setRace] = useState('')
    const [gender, setGender] = useState('')
    const [proEmail, setProfEmail] = useState('')

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
            proEmail: String(proEmail),
            interests: '',
            education: '',
            work: '',
            skills: '',
            hobbies: '',
            posts: '',
            friends: '',
            groups: '',
        }

        if (!isProfessionalUser) {
            console.log('user')
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
            console.log('prof')
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

    const toggleEmailMode = () => {
        setEmail('')
        setProfEmail('')
        setEmailMode(!emailMode)
    }

    return (
        <CustomKeyboardAvoidingView keyboardPadding="100">
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

            {!isProfessionalUser && (
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

            <View className="mb-44 mt-5 flex items-center">
                <TouchableOpacity
                    className="flex w-fit items-center rounded-3xl bg-gold-900 px-5 py-4 align-middle shadow-md shadow-slate-200"
                    onPress={handleRegister}
                >
                    <Text className="w-fit text-base text-orchid-900">
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        </CustomKeyboardAvoidingView>
    )
}

export default RegistrationScreen
