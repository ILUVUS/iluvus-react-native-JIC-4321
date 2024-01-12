import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

const CustomKeyboardAvoidingView = ({ children, ...props }) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex w-screen flex-col items-center justify-center bg-white align-top"
            keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 20}
        >
            <ScrollView className="h-full w-screen flex-grow px-6 py-4">
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default CustomKeyboardAvoidingView
