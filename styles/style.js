import { StyleSheet } from 'react-native'
import colors from '../src/constants/colors'
import sizes from '../src/constants/sizes'

const screenWidth = sizes.screenWidth
const screenHeight = sizes.screenHeight

export const appStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'start',
        padding: 10,
    },
    homeContainer: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollableContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'start',
        // alignItems: "start",
        padding: 10,
        backgroundColor: colors.white,
    },
})

export const loginStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.white,
    },
    button: {
        display: 'flex',
        backgroundColor: colors.yellow,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: screenHeight / 30,
        marginBottom: screenHeight / 8,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
    },
    createAccountButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        color: colors.darkViolet,
        fontSize: sizes.normalSize,
        marginBottom: 5,
    },
    forgotPasswordButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        color: '#6641a2',
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
        paddingHorizontal: 10,
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
})

export const registrationStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'top',
        padding: 10,
        backgroundColor: colors.white,
    },
    scrollContainer: {
        flexGrow: 1,
        width: '100%',
    },
    dropDown: {
    },
    dropDownActive: {
        borderWidth: 1,
        borderColor: colors.violet,
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
    button: {
        display: 'flex',
        backgroundColor: colors.yellow,
        borderRadius: sizes.buttonBorderRadius,
        justifyContent: 'center',
        alignItems: 'center',
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
        color: colors.darkViolet,
        fontSize: sizes.normalSize,
    },
    input: {
        marginHorizontal: 20,
        paddingHorizontal: 20,
    },
})

export const inputStyle = StyleSheet.create({
    input: {
        paddingTop: 12,
        paddingBottom: 12,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: sizes.inputBorderRadius,
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
})

export const buttonStyle = StyleSheet.create({
    buttonShadow: {
        //shadow
        shadowColor: colors.darkViolet,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
})

export const textStyle = StyleSheet.create({
    titleColor: {
        color: colors.darkViolet,
    },
    shadow: {
        //shadow
        shadowColor: '#cbd5e1',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 3,
    },
})

export const homeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export const searchBarStyle = StyleSheet.create({
    containerSearchBar: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        backgroundColor: 'transparent',
    },
    inputSearchBar: {
        width: '100%',
        backgroundColor: colors.lightViolet,
        borderRadius: sizes.inputBorderRadius,
    },
    input: {
        backgroundColor: colors.lightViolet,
        color: colors.darkViolet,
        fontSize: sizes.normalSize,
    },
    seachIcon: {
        color: colors.lightDarkviolet,
        paddingLeft: 5,
        paddingRight: 5,
    },
    clearIcon: {
        color: colors.lightDarkviolet,
    },
})

export const communityStyles = StyleSheet.create({
    header: {
        fontWeight: 'bold',
        color: colors.darkViolet,
        fontSize: 30,
        left: 10,
        marginBottom: 10,
    },
    buttonIcon: {
        padding: 20,
        backgroundColor: colors.lightViolet,
        borderWidth: 0,
        borderRadius: sizes.communityIconRadius,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonImage: {
        paddingTop: 1,
        paddingBottom: 5,
        paddingLeft: 1,
        paddingRight: 1,
        borderWidth: 0,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 0,
        marginBottom: 15,
    },
    communityImage: {
        width: 95,
        height: 95,
        borderRadius: sizes.communityIconRadius,
    },
    buttonText: {
        color: 'black',
        fontSize: 12,
        marginTop: 10,
    },
})

export const setUpCommunityStyles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        // height: sizes.screenHeight,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 18,
        color: colors.darkViolet,
        marginBottom: 10,
        marginLeft: 10,
    },
    input: {
        width: '100%',
        height: 100,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: sizes.inputBorderRadius,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: colors.lightViolet,
        marginBottom: 15,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'start',
        marginTop: 15,
    },
    actionButton: {
        padding: 20,
        backgroundColor: colors.lightViolet,
        borderWidth: 0,
        borderRadius: sizes.communityIconRadius,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10,
    },
    buttonText: {
        color: colors.darkViolet,
        fontWeight: 'normal',
        textAlign: 'center',
        marginTop: 10,
    },
    dropDown: {
        width: '100%',
    },
    dropDownActive: {
        borderWidth: 1,
        borderColor: colors.violet,
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
})
