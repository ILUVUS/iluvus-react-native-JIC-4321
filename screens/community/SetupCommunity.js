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
  ScrollView
} from "react-native";
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
  const [postText, setPostText] = useState("");
  const [visibility, setVisibility] = useState("");

  const handlePublish = () => {
    if (postText.trim() !== "") {
      // Execute the onPost function and pass the postText
      onPost({ text: postText, visibility });
      // Clear the text input and reset visibility to 'public'
      setPostText("");
      setVisibility("public");
    }
  };
  return (
    <ScrollView contentContainerStyle={[appStyle.scrollableContainer, styles.container]} automaticallyAdjustKeyboardInsets={true}>
      <Text style={[styles.title, inputStyle.inputShadow]}>{strings.setupCommunityName}</Text>
      <TextInput
        style={[styles.input, inputStyle.inputShadow]}
        placeholder={strings.setupCommunityNamePlaceholder}
        value={postText}
        onChangeText={(text) => setPostText(text)}
        multiline={true}
        numberOfLines={4}
      />
      <Text style={[styles.title, inputStyle.inputShadow]}>{strings.setupCommunityDescription}</Text>
      <TextInput
        style={[styles.input, inputStyle.inputShadow]}
        placeholder={strings.setupCommunityDescriptionPlaceholder}
        value={postText}
        onChangeText={(text) => setPostText(text)}
        multiline={true}
        numberOfLines={4}
      />
      <Text style={[styles.title, inputStyle.inputShadow]}>{strings.setupCommunityRules}</Text>
      <TextInput
        style={[styles.input, inputStyle.inputShadow]}
        placeholder={strings.setupCommunityRulesPlaceholder}
        value={postText}
        onChangeText={(text) => setPostText(text)}
        multiline={true}
        numberOfLines={4}
      />
      <Text style={[styles.title, inputStyle.inputShadow]}>{strings.setupCommunityVisibility}</Text>
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
        onPress={handlePublish}>
          <Ionicons
            name="ios-add-circle-outline"
            size={sizes.communityIconSize}
            color={colors.darkViolet}
          />
          <Text style={styles.buttonText}>Picture</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={[styles.actionButton, inputStyle.inputShadow]} 
        onPress={handlePublish}>
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
