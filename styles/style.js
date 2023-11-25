import { StyleSheet } from "react-native";
import colors from "../constants/colors";
import sizes from "../constants/sizes";

const screenWidth = sizes.screenWidth;
const screenHeight = sizes.screenHeight;

export const appStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    backgroundColor: colors.white,
  },
  button: {
    display: "flex",
    backgroundColor: colors.yellow,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: screenHeight / 30,
    marginBottom: screenHeight / 8,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  createAccountButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    color: colors.darkViolet,
    fontSize: sizes.normalSize,
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
    marginBottom: screenHeight / 10,
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
    color: colors.darkViolet,
    fontSize: sizes.normalSize,
  },
});

export const registrationStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "top",
    padding: 10,
    backgroundColor: colors.white,
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
    borderColor: colors.violet,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
  },
  dropDownItem: {
    backgroundColor: colors.lightViolet,
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
    backgroundColor: colors.yellow,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: colors.darkViolet,
    fontSize: sizes.normalSize,
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
    fontSize: sizes.normalSize,
    backgroundColor: colors.lightViolet,
    color: colors.darkViolet,
  },
  inputShadow: {
    //shadow
    shadowColor: colors.darkViolet,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});

export const buttonStyle = StyleSheet.create({
  buttonShadow: {
    //shadow
    shadowColor: colors.darkViolet,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});

export const textStyle = StyleSheet.create({
  titleColor: {
    color: colors.darkViolet,
  },
  shadow: {
    //shadow
    shadowColor: colors.darkViolet,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});

export const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
