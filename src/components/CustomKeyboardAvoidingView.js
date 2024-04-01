import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'

const CustomKeyboardAvoidingView = ({
    children,
    keyboardPadding = '50',
    ...props
}) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex flex-1 h-screen w-screen flex-col items-center justify-center bg-white align-top"
            keyboardVerticalOffset={
                Platform.OS === 'ios' ? `${keyboardPadding}` : '100'
            }
        >
            <ScrollView
                className="flex h-screen w-screen px-6 py-4"
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View className="flex-1 h-screen">
                    {children}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default CustomKeyboardAvoidingView
