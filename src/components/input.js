import { styled } from 'nativewind'
import { TextInput, View } from 'react-native'

const LoginInput = styled(
    TextInput,
    'mb-5 h-fit w-full rounded-2xl border-0 border-transparent bg-orchid-100 px-5 py-3 text-base text-orchid-900 shadow shadow-slate-200'
)

const RegisterInput = styled(
    TextInput,
    'rounded-lg bg-orchid-100 p-3 text-base shadow shadow-slate-200'
)

const SetupCommunityInput = styled(
    TextInput,
    'w-full h-22 border-none rounded-lg focus:shadow-lg text-sm focus:text-base focus:h-32 bg-orchid-100 p-3 shadow-md placeholder-orchid-300 text-orchid-900 mb-3'
)

const PostInput = styled(
    TextInput,
    'w-full border-none rounded-lg focus:shadow-lg text-sm focus:text-base focus:h-32 bg-orchid-100 p-3 shadow-md placeholder-orchid-300 text-orchid-900'
)

export { LoginInput, RegisterInput, SetupCommunityInput, PostInput }
