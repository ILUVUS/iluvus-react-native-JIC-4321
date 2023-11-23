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
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
      marginBottom: 80,
    },
    forgotPassword: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
    },
  
    title: {
      
      fontSize: 30,
      marginBottom: 105,
    },
    input: {
      width: 300,
      height: 44,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      paddingLeft: 8,
      borderRadius: 10,
      fontSize: 15,
      backgroundColor: '#F4EAFF',
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 16,
    },
  });

export const registrationStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 35,
    marginBottom: 75,
    marginTop: -100,

  },

  input: {
    width: '75%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 8,
    backgroundColor: '#F4EAFF',
  },
  button: {
    width: '25%',
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
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

export const communityStyles = StyleSheet.create({
    header: {
    fontWeight: 'bold',
    color: '#250059',
    fontSize: 30,
    },
    input: {
    width: 300,
    height: 44,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 10,
    fontSize: 15,
    backgroundColor: '#F4EAFF',
  },
    button: {
    width: 92,
    height: 92,
    backgroundColor: '#F4EAFF',
    borderColor: 'gray',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
    buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    paddingHorizontal: 20, 
    width: '100%',
  },
    searchBar: {
      backgroundColor: '#F4EAFF'
    },
    searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    height: 50,
  },
    searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 30,
  },
});