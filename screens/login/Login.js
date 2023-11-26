// LoginScreen.js
import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  Keyboard,
} from "react-native";
import {
  loginStyle as styles,
  inputStyle,
  buttonStyle,
  textStyle,
} from "../../styles/style";

import { useNavigation } from "@react-navigation/native";
import loginImage from "../../assets/images/loginImage.png";

import strings from "../../constants/strings";
import color from "../../constants/colors";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const handleSignin = () => {
    // Here, you can add your authentication logic
    // For simplicity, we'll just navigate to a home screen if the fields are not empty
    if (username !== "" && password !== "") {
      navigation.navigate(strings.home);
    } else {
      // Show an error or alert for empty fields
      alert(strings.loginAlert);
    }
  };

  const handleRegistration = () => {
    navigation.navigate(strings.register);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <View style={styles.container} onTouchStart={Keyboard.dismiss}>
        <Image source={loginImage} style={styles.image} />
        <Text style={[styles.title, textStyle.titleColor, textStyle.shadow]}>
          {strings.appName}
        </Text>

        <TextInput
          style={[styles.input, inputStyle.input, inputStyle.inputShadow]}
          placeholderTextColor={color.lightDarkviolet}
          placeholder={strings.usernameExample}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={[styles.input, inputStyle.input, inputStyle.inputShadow]}
          placeholderTextColor={color.lightDarkviolet}
          placeholder={strings.passwordExample}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={[styles.button, buttonStyle.buttonShadow]}
          onPress={handleSignin}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegistration}>
          <Text style={[styles.createAccountButton, textStyle.shadow]}>
            {strings.createAnAccount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignin}>
          <Text style={[styles.forgotPasswordButton, textStyle.shadow]}>
            {strings.forgotPassword}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
