import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Text, View, TouchableOpacity, Alert, ScrollView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  appStyle as styles,
  communityStyles,
  searchBarStyle,
} from "../../styles/style";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SearchBar, Image } from "react-native-elements";
import loginImage from "../../assets/images/loginImage.png";
import sampleIcon from "../../assets/images/sampleicon.jpg";

import strings from "../../constants/strings";
import colors from "../../constants/colors";
import sizes from "../../constants/sizes";

export default class Community extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      searchValue: "",
    };
  }

  handleCommunityClick = () => {
    Alert.alert("Search", "Search for a group");
  };

  searchFunction = (text) => {
    // bla bla things here
    this.setState({ searchValue: text });
  };

  render() {
    return (
      <View style={styles.homeContainer}>
        <SearchBar
          placeholder={strings.communitySearchBar}
          onChangeText={(text) => this.searchFunction(text)}
          value={this.state.searchValue}
          containerStyle={searchBarStyle.containerSearchBar}
          inputContainerStyle={searchBarStyle.inputSearchBar}
          inputStyle={searchBarStyle.input}
          placeholderTextColor={colors.lightDarkviolet}
          searchIcon={searchBarStyle.seachIcon}
          clearIcon={searchBarStyle.clearIcon}
        />
        <ScrollView contentContainerStyle={styles.scrollableContainer}>
          <View style={communityStyles.buttonContainer}>
            <TouchableOpacity
              style={communityStyles.buttonIcon}
              onPress={this.handleCommunityClick}
            >
              <Icon
                name="plus"
                size={sizes.communityIconSize}
                color={colors.darkViolet}
              />
              <Text style={communityStyles.buttonText}>New Group</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={communityStyles.buttonIcon}
              onPress={this.handleCommunityClick}
            >
              <Icon
                name="users"
                size={sizes.communityIconSize}
                color={colors.darkViolet}
              />
              <Text style={communityStyles.buttonText}>My Groups</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={communityStyles.buttonIcon}
              onPress={this.handleCommunityClick}
            >
              <Icon
                name="child"
                size={sizes.communityIconSize}
                color={colors.darkViolet}
              />
              <Text style={communityStyles.buttonText}>My Friends</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={communityStyles.header}>Popular</Text>
          </View>

          <View style={communityStyles.buttonContainer}>
            <TouchableOpacity
              style={communityStyles.buttonImage}
              onPress={this.handleCommunityClick}
            >
              <Image
                source={sampleIcon}
                style={communityStyles.communityImage}
              />
              <Text style={communityStyles.buttonText}>Group A</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={communityStyles.buttonImage}
              onPress={this.handleCommunityClick}
            >
              <Image
                source={sampleIcon}
                style={communityStyles.communityImage}
              />
              <Text style={communityStyles.buttonText}>Group B</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={communityStyles.buttonImage}
              onPress={this.handleCommunityClick}
            >
              <Image
                source={sampleIcon}
                style={communityStyles.communityImage}
              />
              <Text style={communityStyles.buttonText}>Group C</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={communityStyles.header}>Developing</Text>
          </View>

          <View style={communityStyles.buttonContainer}>
            <TouchableOpacity
              style={communityStyles.buttonImage}
              onPress={this.handleCommunityClick}
            >
              <Image
                source={sampleIcon}
                style={communityStyles.communityImage}
              />
              <Text style={communityStyles.buttonText}>Group A</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={communityStyles.buttonImage}
              onPress={this.handleCommunityClick}
            >
              <Image
                source={sampleIcon}
                style={communityStyles.communityImage}
              />
              <Text style={communityStyles.buttonText}>Group B</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={communityStyles.buttonImage}
              onPress={this.handleCommunityClick}
            >
              <Image
                source={sampleIcon}
                style={communityStyles.communityImage}
              />
              <Text style={communityStyles.buttonText}>Group C</Text>
            </TouchableOpacity>
          </View>

          <View style={communityStyles.buttonContainer}>
            <TouchableOpacity
              style={communityStyles.buttonImage}
              onPress={this.handleCommunityClick}
            >
              <Image
                source={sampleIcon}
                style={communityStyles.communityImage}
              />
              <Text style={communityStyles.buttonText}>Group A</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={communityStyles.buttonImage}
              onPress={this.handleCommunityClick}
            >
              <Image
                source={sampleIcon}
                style={communityStyles.communityImage}
              />
              <Text style={communityStyles.buttonText}>Group B</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={communityStyles.buttonImage}
              onPress={this.handleCommunityClick}
            >
              <Image
                source={sampleIcon}
                style={communityStyles.communityImage}
              />
              <Text style={communityStyles.buttonText}>Group C</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
