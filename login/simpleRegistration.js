// RegistrationScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { registrationStyle as styles } from '../styles/style';
import { SelectList } from 'react-native-dropdown-select-list';

const RegistrationScreen = ({ navigation }) => {
  const [fName, setFname] = useState('');
  const [lName, setLname] = useState('');
  const [DOB, setDOB] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [race, setRace] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = React.useState("");
  const handleRegister = () => {
    // Implement your registration logic here
    // You can send the user details to your backend for processing

    // For simplicity, we'll just navigate to a success screen
    navigation.navigate('Home');
  };
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={fName}
        onChangeText={(text) => setFname(text)}
      />
      <Text style={styles.title}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lName}
        onChangeText={(text) => setLname(text)}
      />
      <Text style={styles.title}>Date of Birth</Text>
      <TextInput
        style={styles.input}
        placeholder="DOB in mm-dd-yyyy"
        value={DOB}
        onChangeText={(text) => setDOB(text)}
      />
      <SelectList
        data={Race} 
        setSelected={setRace}
        value= {race} 
        boxStyles={{marginBottom: 10, backgroundColor: "#F4EAFF", borderColor: '#ddd', left: 20}}
        dropdownStyles={{marginBottom: 10, marginRight: 10}}
        placeholder="Race"
        maxHeight={75}
      />
      <SelectList
        data={Gender} 
        setSelected={setGender} 
        value= {gender}
        boxStyles={{marginBottom: 10, backgroundColor: "#F4EAFF", borderColor: '#ddd', left: 20}}
        dropdownStyles={{marginBottom: 10}}
        placeholder="Gender"
        maxHeight={75}
      />
      <Text style={styles.title}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <Text style={styles.title}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Text style={styles.title}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Text style={styles.title}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={(text) => setLocation(text)}
        secureTextEntry
      />
      

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationScreen;
