import { StyleSheet } from 'react-native'
import COLORS from '../src/constants/colors'
import sizes from '../src/constants/sizes'

const screenWidth = sizes.screenWidth
const screenHeight = sizes.screenHeight

const inputStyle = StyleSheet.create({
    input: {
        paddingVertical: 12,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: sizes.inputBorderRadius,
        fontSize: sizes.normalSize,
        backgroundColor: COLORS['orchid'][100],
        color: COLORS['orchid'][900],
    },
    inputShadow: {
        shadowColor: COLORS['orchid'][900],
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
})

const searchBarStyle = StyleSheet.create({
    containerSearchBar: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        backgroundColor: 'transparent',
    },
    inputSearchBar: {
        width: '100%',
        backgroundColor: COLORS['orchid'][100],
        borderRadius: sizes.inputBorderRadius,
    },
    input: {
        backgroundColor: COLORS['orchid'][100],
        color: COLORS['orchid'][900],
        fontSize: sizes.normalSize,
    },
    seachIcon: {
        color: COLORS['orchid'][400],
        paddingHorizontal: 5,
    },
    clearIcon: {
        color: COLORS['orchid'][400],
    },
})

const dropDownStyle = StyleSheet.create({
    dropDown: {
        width: '100%',
    },
    dropDownActive: {
        borderWidth: 1,
        borderColor: COLORS['orchid'][600],
    },
    dropDownItem: {
        backgroundColor: COLORS['orchid'][100],
        marginHorizontal: 15,
        marginVertical: 8,
        borderRadius: 8,
        paddingBottom: 8,
    },
})

export { inputStyle, searchBarStyle, dropDownStyle }
