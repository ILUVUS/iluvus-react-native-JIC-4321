// RegistrationScreen.js
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { registrationStyle as styles } from "../styles/style";
import { inputStyle } from "../styles/style";
import { buttonStyle } from "../styles/style";
import { textStyle } from "../styles/style";

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
  const Race = [
    { key: "White", value: "White" },
    { key: "African American", value: "African American" },
    { key: "Hispanic", value: "Hispanic" },
    { key: "Asian", value: "Asian" },
    { key: "American Indian", value: "American Indian" },
    { key: "Other", value: "Other" },
  ];
  const Gender = [
    { key: "Male", value: "Male" },
    { key: "Female", value: "Female" },
    { key: "Non-Binary", value: "Non-Binary" },
    { key: "Other", value: "Other" },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 20}
    >
      <ScrollView style={styles.scrollContainer}>
        <Text style={[[styles.title, textStyle.titleColor, textStyle.shadow], textStyle.titleColor, textStyle.shadow]}>First Name</Text>
        <TextInput
          style={[styles.input, inputStyle.input, inputStyle.inputShadow]}
          placeholderTextColor="#9f88c5"
          placeholder="First Name (e.g. John)"
          value={fName}
          onChangeText={(text) => setFname(text)}
        />
        <Text style={[styles.title, textStyle.titleColor, textStyle.shadow]}>Last Name</Text>
        <TextInput
          style={[styles.input, inputStyle.input, inputStyle.inputShadow]}
          placeholderTextColor="#9f88c5"
          placeholder="Last Name (e.g. Smith)"
          value={lName}
          onChangeText={(text) => setLname(text)}
        />
        <Text style={[styles.title, textStyle.titleColor, textStyle.shadow]}>Date of Birth</Text>
        <TextInput
          style={[styles.input, inputStyle.input, inputStyle.inputShadow]}
          placeholderTextColor="#9f88c5"
          placeholder="mm-dd-yyyy (e.g. 01-01-2000)"
          value={DOB}
          onChangeText={(text) => setDOB(text)}
        />

        <Text style={[styles.title, textStyle.titleColor, textStyle.shadow]}>Race</Text>
        <SelectList
          data={Race}
          setSelected={setRace}
          value={race}
          boxStyles={[styles.dropDown, inputStyle.input, inputStyle.inputShadow]}
          dropdownStyles={styles.dropDownActive}
          dropdownItemStyles={styles.dropDownItem}
          maxHeight={75}
          search={false}
          placeholder="Please select your race"
        />

        <Text style={[styles.title, textStyle.titleColor, textStyle.shadow]}>Gender</Text>
        <SelectList
          data={Gender}
          setSelected={setGender}
          value={gender}
          boxStyles={[styles.dropDown,inputStyle.input, inputStyle.inputShadow]}
          dropdownStyles={styles.dropDownActive}
          dropdownItemStyles={styles.dropDownItem}
          maxHeight={75}
          search={false}
          placeholder="Please select your gender"
        />
        <Text style={[styles.title, textStyle.titleColor, textStyle.shadow]}>Email</Text>
        <TextInput
          style={[styles.input, inputStyle.input, inputStyle.inputShadow]}
          placeholderTextColor="#9f88c5"
          placeholder="Email (e.g. user@mail.com)"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <Text style={[styles.title, textStyle.titleColor, textStyle.shadow]}>Username</Text>
        <TextInput
          style={[styles.input, inputStyle.input, inputStyle.inputShadow]}
          placeholderTextColor="#9f88c5"
          placeholder="Username (e.g. user123)"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Text style={[styles.title, textStyle.titleColor, textStyle.shadow]}>Password</Text>
        <TextInput
          style={[styles.input, inputStyle.input, inputStyle.inputShadow]}
          placeholderTextColor="#9f88c5"
          placeholder="Password (e.g. password123)"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Text style={[styles.title, textStyle.titleColor, textStyle.shadow]}>Location</Text>
        <TextInput
          style={[styles.input, inputStyle.input, inputStyle.inputShadow]}
          placeholderTextColor="#9f88c5"
          placeholder="Location (e.g. 123 Main St, City, State, Zip)"
          value={location}
          onChangeText={(text) => setLocation(text)}
          secureTextEntry
        />

        <TouchableOpacity style={[styles.button, buttonStyle.buttonShadow]} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;
