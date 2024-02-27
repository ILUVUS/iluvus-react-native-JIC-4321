import { styled } from 'nativewind'
import { TouchableOpacity } from 'react-native'

const CommunityViewMainButton = styled(
    TouchableOpacity,
    'px-3 py-5 bg-orchid-100 flex justify-between items-center flex-col align-middle border-none rounded-3xl shadow shadow-orchid-200'
)

const CommunityViewImageButton = styled(
    TouchableOpacity,
    'w-1/3 p-2 border-none flex justify-start items-center flex-col shadow shadow-orchid-200'
)

const NewCommunityButton = styled(
    TouchableOpacity,
    'items-center justify-between rounded-3xl border-none bg-orchid-100 p-5 shadow-md'
)

const PostButton = styled(
    TouchableOpacity,
    'flex h-fit w-fit flex-row flex-wrap items-center justify-center rounded-full bg-orchid-200 px-5 py-3 shadow'
)

export { CommunityViewMainButton, CommunityViewImageButton, NewCommunityButton, PostButton}
