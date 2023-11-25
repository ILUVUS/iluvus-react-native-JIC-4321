// RegistrationScreen.js
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";

import {
  registrationStyle as styles,
  inputStyle,
  buttonStyle,
  textStyle,
} from "../styles/style";

import strings from "../constants/strings";
import colors from "../constants/colors";
import sizes from "../constants/sizes";

import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
import { BASE_URL} from '@env';
import React, { useState } from "react";

const RegistrationScreen = ({ navigation }) => {
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [DOB, setDOB] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [race, setRace] = useState("");
  const [gender, setGender] = useState("");
  const [proEmail, setProfEmail] = React.useState("");


  const handleRegister = () => {
    axios({
      method: "POST",
      url: `${BASE_URL}/user/create`,
      data: {
        "username": String(username),
        "email": String(email),
        "password": String(password),
        "fname": String(fName),
        "lname": String(lName),
        "gender": String(gender),
        "dob": String(DOB),
        "race": String(Race),
        "proEmail": String(proEmail),
        "interests": "",
        "education": "",
        "work": "",
        "skills": "",
        "hobbies": "",
        "posts": "",
        "friends": "",
        "groups": ""
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      console.log(res.data);
      navigation.navigate("Home");
    }
      
      ).catch(err => console.log(err))
  }
  const Race = [
    {key: 'White', value: "White"},
    {key: 'African American', value: "African American"},
    {key: 'Hispanic', value: "Hispanic"},
    {key: 'Asian', value: "Asian"},
    {key: 'American Indian', value: "American Indian"},
    {key: 'Other', value: "Other"},
  ];
  const Gender = [
    {key: 'Male', value: "Male"},
    {key: 'Female', value: "Female"},
    {key: 'Non-Binary', value: "Non-Binary"},
    {key: 'Other', value: "Other"},
  ];
  //////////////////////////////////////


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 20}
    >
      <ScrollView style={styles.scrollContainer}>
        <Text
          style={[
            [styles.title, textStyle.titleColor, textStyle.shadow],
            textStyle.titleColor,
            textStyle.shadow,
          ]}
        >
          First Name
        </Text>
        <TextInput
          style={[styles.input, inputStyle.input, inputStyle.inputShadow]}
          placeholderTextColor={colors.lightDarkviolet}
          placeholder={strings.fnameExample}
          value={fName}
          onChangeText={(text) => setFname(text)}
        />
        <Text style={[styles.title, textStyle.titleColor, textStyle.shadow]}>
          Last Name
        </Text>
        <TextInput
          style={[styles.input, inputStyle.input, inputStyle.inputShadow]}
          placeholderTextColor={colors.lightDarkviolet}
          placeholder={strings.lnameExample}
          value={lName}
          onChangeText={(text) => setLname(text)}
        />
        <Text style={[styles.title, textStyle.titleColor, textStyle.shadow]}>
          Date of Birth
        </Text>
        <TextInput
          style={[styles.input, inputStyle.input, inputStyle.inputShadow]}
          placeholderTextColor={colors.lightDarkviolet}
          placeholder={strings.dobExample}
          value={DOB}
          onChangeText={(text) => setDOB(text)}
        />

        <Text style={[styles.title, textStyle.titleColor, textStyle.shadow]}>
          Race
        </Text>
        <SelectList
          data={strings.races}
          setSelected={setRace}
          value={race}
          boxStyles={[
            styles.dropDown,
            inputStyle.input,
            inputStyle.inputShadow,
          ]}
          dropdownStyles={styles.dropDownActive}
          dropdownItemStyles={styles.dropDownItem}
          maxHeight={sizes.dropDownMaxHeight}
          search={false}
          placeholder={strings.race}
        />

        <Text style={[styles.title, textStyle.titleColor, textStyle.shadow]}>
          Gender
        </Text>
        <SelectList
          data={strings.genders}
          setSelected={setGender}
          value={gender}
          boxStyles={[
            styles.dropDown,
            inputStyle.input,
            inputStyle.inputShadow,
          ]}
          dropdownStyles={styles.dropDownActive}
          dropdownItemStyles={styles.dropDownItem}
          maxHeight={sizes.dropDownMaxHeight}
          search={false}
          placeholder={strings.gender}
        />
        <Text style={[styles.title, textStyle.titleColor, textStyle.shadow]}>
          Email
        </Text>
        <TextInput
          style={[styles.input, inputStyle.input, inputStyle.inputShadow]}
          placeholderTextColor={colors.lightDarkviolet}
          placeholder={strings.emailExample}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <Text style={styles.title}>Professional Email</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#cc9eff"
          placeholder="Only for Professional user"
          value={proEmail}
          onChangeText={(text) => setProfEmail(text)}
        />
        <Text style={[styles.title, textStyle.titleColor, textStyle.shadow]}>
          Username
        </Text>
        <TextInput
          style={[styles.input, inputStyle.input, inputStyle.inputShadow]}
          placeholderTextColor={colors.lightDarkviolet}
          placeholder={strings.usernameExample}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Text style={[styles.title, textStyle.titleColor, textStyle.shadow]}>
          Password
        </Text>
        <TextInput
          style={[styles.input, inputStyle.input, inputStyle.inputShadow]}
          placeholderTextColor={colors.lightDarkviolet}
          placeholder={strings.passwordExample}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TouchableOpacity
          style={[styles.button, buttonStyle.buttonShadow]}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;
