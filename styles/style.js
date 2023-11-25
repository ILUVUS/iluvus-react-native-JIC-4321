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
    //shadow
    shadowColor: '#40128B',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  createAccountButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    color: "#40128B",
    fontSize: 16,
    marginBottom: 5,
    //shadow
    shadowColor: '#40128B',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  forgotPasswordButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    color: "#6641a2",
    fontSize: 14,
    marginBottom: 5,
    //shadow
    shadowColor: '#40128B',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  title: {
    height: 50,
    fontSize: 30,
    marginBottom: (screenHeight / 10),
    //shadow
    shadowColor: '#40128B',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  input: {
    width: screenWidth - 100,
    maxWidth: 300,
    height: 40,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#F4EAFF",
    color: "#40128B",
    //shadow
    shadowColor: '#40128B',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
    backgroundColor: "#F4EAFF",
    borderColor: "#ddd",
    borderWidth: 0,
    marginBottom: 10,
    height: 10,
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    //shadow
    shadowColor: '#40128B',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  dropDownActive: {
    borderWidth: 1,
    borderColor: "#cc9eff",
    marginBottom: 10,
    marginRight: 20,
    marginLeft: 20,
    marginTop: -5,
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
    marginTop: 5,
    left: 20,
    color: "#40128B",
    //shadow
    shadowColor: '#40128B',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  input: {
    height: 40,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 10,
    backgroundColor: "#F4EAFF",
    color: "#40128B",
    marginLeft: 20,
    marginRight: 20,
    //shadow
    shadowColor: '#40128B',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
    //shadow
    shadowColor: '#40128B',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  buttonText: {
    color: "#40128B",
    fontSize: 16,
  },
});

export const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
