import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { BASE_URL} from '@env';

import { useNavigation } from "@react-navigation/native";
import { setUpCommunityStyles as styles } from "../../styles/style";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { SelectList } from "react-native-dropdown-select-list";
import { appStyle } from "../../styles/style";
import strings from "../../constants/strings";
import { inputStyle } from "../../styles/style";
import sizes from "../../constants/sizes";
import colors from "../../constants/colors";

export default function SetupCommunity() {
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [communityRule, setCommunityRule] = useState("");
  const [visibility, setVisibility] = useState("");


  const navigation = useNavigation();

  const publishCommunity = async () => {
    if (
      communityName.trim() !== "" &&
      communityDescription.trim() !== "" &&
      communityRule.trim() !== "" &&
      visibility.trim() !== ""
    ) {
      
      axios({
        method: "POST",
        url: `${BASE_URL}/community/create`,
        data: {
          "name": String(communityName),
          "description": String(communityDescription),
          "rules": String(communityRule),
          "visibility": String(visibility),
          "ownerId": await AsyncStorage.getItem('userId')
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res.data);
        Alert.alert("Successful", "Community Created");
        navigation.navigate("Home");
      })
      .catch(err => {
        Alert.alert("Unsuccessful", "Community not created");
      });



    }
  };

  const addPicture = () => {};

  return (
    <ScrollView
      contentContainerStyle={[appStyle.scrollableContainer, styles.container]}
      automaticallyAdjustKeyboardInsets={true}
    >
      <Text style={[styles.title, inputStyle.inputShadow]}>
        {strings.setupCommunityName}
      </Text>
      <TextInput
        style={[styles.input, inputStyle.inputShadow]}
        placeholder={strings.setupCommunityNamePlaceholder}
        value={communityName}
        onChangeText={(text) => setCommunityName(text)}
        multiline={true}
        numberOfLines={4}
      />
      <Text style={[styles.title, inputStyle.inputShadow]}>
        {strings.setupCommunityDescription}
      </Text>
      <TextInput
        style={[styles.input, inputStyle.inputShadow]}
        placeholder={strings.setupCommunityDescriptionPlaceholder}
        value={communityDescription}
        onChangeText={(text) => setCommunityDescription(text)}
        multiline={true}
        numberOfLines={4}
      />
      <Text style={[styles.title, inputStyle.inputShadow]}>
        {strings.setupCommunityRules}
      </Text>
      <TextInput
        style={[styles.input, inputStyle.inputShadow]}
        placeholder={strings.setupCommunityRulesPlaceholder}
        value={communityRule}
        onChangeText={(text) => setCommunityRule(text)}
        multiline={true}
        numberOfLines={4}
      />
      <Text style={[styles.title, inputStyle.inputShadow]}>
        {strings.setupCommunityVisibility}
      </Text>
      <SelectList
        data={strings.Visibility}
        setSelected={setVisibility}
        value={visibility}
        boxStyles={[styles.dropDown, inputStyle.input, inputStyle.inputShadow]}
        dropdownStyles={styles.dropDownActive}
        dropdownItemStyles={styles.dropDownItem}
        maxHeight={sizes.dropDownMaxHeight}
        search={false}
        placeholder={strings.setupCommunityVisibilityPlaceholder}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, inputStyle.inputShadow]}
          onPress={addPicture}
        >
          <Ionicons
            name="ios-add-circle-outline"
            size={sizes.communityIconSize}
            color={colors.darkViolet}
          />
          <Text style={styles.buttonText}>Picture</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, inputStyle.inputShadow]}
          onPress={publishCommunity}
        >
          <Ionicons
            name="ios-navigate"
            size={sizes.communityIconSize}
            color={colors.darkViolet}
          />
          <Text style={styles.buttonText}>Publish</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
