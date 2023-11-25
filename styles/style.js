import { StyleSheet } from 'react-native';

export const appStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const loginStyle = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: 'white',
    },
    button: {
      width: 92,
      height: 50,
      backgroundColor: '#FFE79B', // Set button background color here
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
      marginBottom: 80,
      color: '#40128B',
    },
    forgotPassword: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
      color: '#40128B',
    },
  
    title: {
      fontSize: 30,
      marginBottom: 105,
    },
    input: {
      width: 300,
      height: 44,
      borderColor: 'transparent',
      borderWidth: 0,
      marginBottom: 16,
      paddingLeft: 8,
      borderRadius: 10,
      fontSize: 15,
      backgroundColor: '#F4EAFF',
      color: '#40128B'
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 16,
    },
    buttonText: {
      color: '#40128B',
      fontSize: 16,
    },
  
  });

export const registrationStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'start', 
    padding: 10,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    width: '100%',
  },
  dropDown: {
    backgroundColor: "#F4EAFF",
    borderColor: '#ddd',
    borderWidth: 0,
    marginBottom:10,
    height:10,
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 20,
    marginRight: 20,
    width: '90%',
    height: 40,
  },
  dropDownActive: {
    borderWidth: 1,
    borderColor: '#cc9eff',
    marginBottom: 10, 
    marginRight: 20, 
    marginLeft: 20,
    marginTop: -5,
  },
  dropDownItem: {
    backgroundColor: "#F4EAFF",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 2,
    borderRadius: 8,
  },
  title: { 
    fontSize: 15,
    marginBottom: 5,
    left: 20, 
    color: '#40128B',
   },

  input: {
    width: '90%',
    height: 40,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 10,
    backgroundColor: '#F4EAFF',
    color: '#40128B',
    marginLeft: 20,
    marginRight: 20,
  
  },
  button: {
    width: '25%',
    height: 40,
    backgroundColor: '#FFE79B',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    left: 140,
  },
  buttonText: {
    color: '#40128B',
    fontSize: 16,
  },
});

export const homeStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
