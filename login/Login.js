// LoginScreen.js
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginStyle as styles } from "../styles/style";
import loginImage from "../assets/images/loginImage.png";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const handleSignin = () => {
    // Here, you can add your authentication logic
    // For simplicity, we'll just navigate to a home screen if the fields are not empty
    if (username !== "" && password !== "") {
      navigation.navigate("Home");
    } else {
      // Show an error or alert for empty fields
      alert("Please enter username and password");
    }
  };

  const handleRegistration = () => {
    navigation.navigate("Registration");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
      >
        <Image source={loginImage} style={styles.image} />
        <Text style={[styles.title, { color: "#40128B" }]}>ILUVUS</Text>

        <TextInput
          style={styles.input}
          placeholderTextColor="#cc9eff"
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#cc9eff"
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignin}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegistration}>
          <Text style={styles.forgotPassword}>Create an account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignin}>
          <Text style={styles.forgotPassword}>Forgot Password ?</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LoginScreen;
