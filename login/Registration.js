// RegistrationScreen.js
import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { registrationStyle as styles } from '../styles/style';
import { SelectList } from 'react-native-dropdown-select-list';
import axios from "axios";
import { BASE_URL} from '@env';
// import { useRouter } from "next/navigation";

const RegistrationScreen = ({ navigation }) => {
  const [fName, setFname] = useState('');
  const [lName, setLname] = useState('');
  const [DOB, setDOB] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  return (
    <View style={styles.container}>
    <ScrollView style={styles.scrollContainer}>

      <Text style={styles.title}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#cc9eff"
        placeholder="First Name"
        value={fName}
        onChangeText={(text) => setFname(text)}
      />
      <Text style={styles.title}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#cc9eff"
        placeholder="Last Name"
        value={lName}
        onChangeText={(text) => setLname(text)}
      />
      <Text style={styles.title}>Date of Birth</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#cc9eff"
        placeholder="yyyy-mm-dd"
        value={DOB}
        onChangeText={(text) => setDOB(text)}
      />

      <Text style={styles.title}>Race</Text>
      <SelectList
        data={Race} 
        setSelected={setRace}
        value= {race} 
        boxStyles={styles.dropDown}
        dropdownStyles={styles.dropDownActive}
        // placeholder="Race"
        maxHeight={75}
        search={false}
      />


      <Text style={styles.title}>Gender</Text>
      <SelectList
        data={Gender} 
        setSelected={setGender} 
        value= {gender}
        boxStyles={styles.dropDown}
        dropdownStyles={styles.dropDownActive}
        // placeholder="Gender"
        maxHeight={75}
        search={false}
      />
      <Text style={styles.title}>Email</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#cc9eff"
        placeholder="Email"
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
      <Text style={styles.title}>Username</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#cc9eff"
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Text style={styles.title}>Password</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#cc9eff"
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

    </ScrollView>
    </View>
  );
};

export default RegistrationScreen;
