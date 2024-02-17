import { TouchableOpacity, View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import STRINGS from '../../constants/strings'
import { useNavigation } from '@react-navigation/native'

const Profile = () => {
    const navigation = useNavigation()

    const handleLogout = () => {
        removeUserId()
    }

    const removeUserId = async () => {
        try {
            const value = await AsyncStorage.getItem('userId')
            if (value !== null) {
                await AsyncStorage.removeItem('userId')
            }
        } catch (e) {
            console.log(e)
        } finally {
            navigation.reset({
                index: 0,
                routes: [{ name: STRINGS.loginscreen }],
            })
        }
    }

    return (
        <View className="flex h-screen w-screen items-center bg-white p-2">
            <TouchableOpacity
                className="inline-block w-fit items-center justify-center rounded-3xl bg-gold-900 px-5 py-4 shadow-md shadow-slate-200"
                onPress={handleLogout}
            >
                <Text className="text-sm text-orchid-900">Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Profile
