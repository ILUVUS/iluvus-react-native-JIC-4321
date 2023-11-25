// RegistrationScreen.js
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
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

const RegistrationScreen = ({ navigation }) => {
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [DOB, setDOB] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [race, setRace] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = React.useState("");
  const handleRegister = () => {
    // Implement your registration logic here
    // You can send the user details to your backend for processing

    // For simplicity, we'll just navigate to a success screen
    navigation.navigate("Home");
  };

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
        <Text style={[styles.title, textStyle.titleColor, textStyle.shadow]}>
          Location
        </Text>
        <TextInput
          style={[styles.input, inputStyle.input, inputStyle.inputShadow]}
          placeholderTextColor={colors.lightDarkviolet}
          placeholder={strings.locationExample}
          value={location}
          onChangeText={(text) => setLocation(text)}
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
