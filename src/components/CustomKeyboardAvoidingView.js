import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

const CustomKeyboardAvoidingView = ({ children, ...props }) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex flex-col h-screen w-screen items-center justify-center bg-white align-top"
            keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 20}
        >
            <ScrollView className="w-full px-6 py-4">
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default CustomKeyboardAvoidingView
