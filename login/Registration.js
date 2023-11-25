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
  const [location, setLocation] = React.useState("");
  // const [msg, setMsg] = useState("");
  // const router = useRouter();

// 


  // const handleRegister = async () => {
  //   try {
  //     const response = await axios.post(`${BASE_URL}/user/create`,  {
  //       "username": "exampleUsername",
  //       "email": "example@email.com",
  //       "password": "examplePassword",
  //       "fname": "John",
  //       "lname": "Doe",
  //       "gender": "Male",
  //       "dob": "1990-01-01",
  //       "race": "Caucasian",
  //       "location": "123 Street, City, GA, US, 00000",
  //       "interests": "",
  //       "education": "",
  //       "work": "",
  //       "skills": "",
  //       "hobbies": "",
  //       "posts": "",
  //       "friends": "",
  //       "groups": ""
  //     }, {
  //       headers: {
  //         'accept': 'application/json',
  //         // Add other headers as needed
  //       },
  //   });
  //     if (response.data) {
  //       console.log("POST request response:", response.data);
  //       setMsg(response.data);
  //       setTimeout(() => {
  //         router.push("/");
  //       }, 1000); // wait 1s to make it cool
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       console.error("Error sending POST request:", error.response.data);
  //       setMsg(error.response.data);
  //     } else {
  //       console.error("Error sending POST request:", error.message);
  //       setMsg("An error occurred while processing your request.");
  //     }
  //   }
  // };


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
        "location": String(location),
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
        placeholder="mm-dd-yyyy"
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
      <Text style={styles.title}>Location</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#cc9eff"
        placeholder="Location"
        value={location}
        onChangeText={(text) => setLocation(text)}
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
