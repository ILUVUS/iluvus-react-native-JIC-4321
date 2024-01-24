import React, { useState } from 'react'

import axios from 'axios'
import { BASE_URL } from '@env'
import { Text, TouchableOpacity, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'

import SIZES from '../../constants/sizes'
import COLORS from '../../constants/colors'
import STRINGS from '../../constants/strings'
import { RegisterInput } from '../../components/input'
import { dropDownStyle, inputStyle } from '../../../styles/style'
import CustomKeyboardAvoidingView from '../../components/CustomKeyboardAvoidingView'

const RegistrationScreen = ({ navigation }) => {
    const [fName, setFname] = useState('')
    const [lName, setLname] = useState('')
    const [DOB, setDOB] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [race, setRace] = useState('')
    const [gender, setGender] = useState('')
    const [proEmail, setProfEmail] = React.useState('')

    const handleRegister = () => {
        axios({
            method: 'POST',
            url: `${BASE_URL}/user/create`,
            data: {
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
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                navigation.navigate('Login')
            })
            .catch((err) => {})
    }

    return (
        <CustomKeyboardAvoidingView keyboardPadding="100">
            <Text className="pb-2 text-base text-orchid-900 shadow-md shadow-slate-400">
                First Name
            </Text>
            <RegisterInput
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
                className="text-base text-orchid-900"
                placeholderTextColor={COLORS['orchid'][400]}
                placeholder={STRINGS.lnameExample}
                value={lName}
                onChangeText={(text) => setLname(text)}
            />
            <Text className="py-2 text-base text-orchid-900 shadow-md shadow-slate-400">
                Date of Birth
            </Text>
            <RegisterInput
                className="text-base text-orchid-900"
                placeholderTextColor={COLORS['orchid'][400]}
                placeholder={STRINGS.dobExample}
                value={DOB}
                onChangeText={(text) => setDOB(text)}
            />

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
            <Text className="py-2 text-base text-orchid-900 shadow-md shadow-slate-400">
                Email
            </Text>
            <RegisterInput
                className="text-base text-orchid-900"
                placeholderTextColor={COLORS['orchid'][400]}
                placeholder={STRINGS.emailExample}
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
            />
            <Text className="py-2 text-base text-orchid-900 shadow-md shadow-slate-400">
                Professional Email
            </Text>
            <RegisterInput
                className="text-base text-orchid-900"
                placeholderTextColor={COLORS['orchid'][400]}
                placeholder="Only Required for Professional user"
                value={proEmail}
                onChangeText={(text) => setProfEmail(text)}
            />
            <Text className="py-2 text-base text-orchid-900 shadow-md shadow-slate-400">
                Username
            </Text>
            <RegisterInput
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
                className="text-base text-orchid-900"
                placeholderTextColor={COLORS['orchid'][400]}
                placeholder={STRINGS.passwordExample}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />

            <View className="mb-10 mt-5 flex items-center">
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
