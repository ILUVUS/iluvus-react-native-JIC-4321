import { StyleSheet } from "react-native";

import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


export const appStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  button: {
    display: "flex",
    backgroundColor: "#FFE79B",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    marginTop: (screenHeight / 30),
    marginBottom: (screenHeight / 8),
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  createAccountButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    color: "#40128B",
    fontSize: 16,
    marginBottom: 5,
  },
  forgotPasswordButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    color: "#6641a2",
    fontSize: 14,
    marginBottom: 5,
  },
  title: {
    height: 50,
    fontSize: 30,
    marginBottom: (screenHeight / 10),
  },
  input: {
    width: screenWidth - 100,
    maxWidth: 300,
    marginBottom: 15,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  buttonText: {
    color: "#40128B",
    fontSize: 16,
  },
});

export const registrationStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "top",
    padding: 10,
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
    width: "100%",
  },
  dropDown: {
    marginLeft: 20,
    marginRight: 20,
  },
  dropDownActive: {
    borderWidth: 1,
    borderColor: "#cc9eff",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
  },
  dropDownItem: {
    backgroundColor: "#F4EAFF",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
    borderRadius: 8,
    paddingTop: 8,
    paddingBottom: 8,
  },
  title: {
    fontSize: 15,
    marginBottom: 5,
    marginTop: 15,
    left: 20,
  },
  input: {
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    display: "flex",
    backgroundColor: "#FFE79B",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: "#40128B",
    fontSize: 16,
  },
});

export const inputStyle = StyleSheet.create({
  input: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 10,  
    paddingRight: 10,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: "#F4EAFF",
    color: "#40128B",
  },
  inputShadow: {
    //shadow
    shadowColor: '#40128B',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  }
});

export const buttonStyle = StyleSheet.create({
  buttonShadow: {
    //shadow
    shadowColor: '#40128B',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  }

});

export const textStyle = StyleSheet.create({
  titleColor : {
    color: "#40128B"
  },
  shadow: {
    //shadow
    shadowColor: '#40128B',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  }
});

export const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
