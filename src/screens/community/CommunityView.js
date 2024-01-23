import React, { useState } from 'react'

import axios from 'axios'
import { BASE_URL } from '@env'
import { Alert } from 'react-native'

import {
    Keyboard,
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    ScrollView,
    RefreshControl,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomKeyboardAvoidingView from '../../components/CustomKeyboardAvoidingView'

import sampleIcon from '../../../assets/images/sampleicon.jpg'
import communityBg from '../../../assets/images/communitybg.jpg'

const LoginScreen = () => {

    const [refreshing, setRefreshing] = React.useState(false)
    const onRefresh = React.useCallback(() => {
        console.log('refreshing')
    }, [])


    return (
        // <CustomKeyboardAvoidingView>
        <View className="flex h-screen w-screen">
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                horizontal={false}
                contentContainerStyle={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexGrow: 1,
                    paddingVertical: 65,
                    paddingHorizontal: 24,
                }}
                className="h-screen w-screen overflow-auto bg-white"
                onTouchStart={Keyboard.dismiss}
            >
                <ImageBackground
                    source={communityBg}
                    resizeMode="cover"
                    imageStyle={{
                        borderRadius: 24,
                    }}
                    blurRadius={5}
                    className="mb-5 flex h-fit w-full flex-col items-center justify-center rounded-3xl  py-12 shadow-md shadow-orchid-300"
                >
                    <View className="mb-5 flex h-fit w-28 items-center justify-center rounded-full bg-transparent shadow shadow-orchid-600">
                        <Image
                            source={sampleIcon}
                            className="h-40 w-40 rounded-full "
                        />
                    </View>

                    <View className="mb-5 flex items-center justify-center">
                        <View className="mb-1 flex flex-row gap-2">
                            <Text className="text-2xl font-semibold text-white shadow shadow-orchid-600">
                                Community Name
                            </Text>
                            <TouchableOpacity>
                                <Ionicons
                                    name="create-outline"
                                    size={26}
                                    color={'#fff'}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text className="mb-1 text-base text-white shadow shadow-orchid-600">
                            Host by ILUVUS
                        </Text>
                        <View className="flex flex-row items-center justify-center gap-5">
                            <Text className="text-base text-white shadow shadow-orchid-600">
                                90 Followers
                            </Text>
                            <Text className="text-base text-white shadow shadow-orchid-600">
                                90 Posts
                            </Text>
                        </View>
                    </View>

                    <View className="flex flex-row items-center justify-center gap-5">
                        <TouchableOpacity className="flex h-fit w-fit flex-row flex-wrap items-center justify-center rounded-full bg-white px-5 py-2 shadow shadow-orchid-600">
                            <Text className="text-md text-orchid-900">
                                JOIN US
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex h-fit w-fit flex-row flex-wrap items-center justify-center rounded-full bg-white px-5 py-2 shadow shadow-orchid-600">
                            <Text className="text-md text-orchid-900">
                                VIEW POSTS
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <View className="mb-5 flex h-fit w-full flex-col items-start justify-start rounded-3xl bg-white p-5 shadow-md shadow-slate-300">
                    <Text className="mb-2 text-2xl font-bold text-orchid-900">
                        Description
                    </Text>
                    <Text className="text-base text-orchid-800">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed at risus at erat pretium bibendum. Sed eget
                        vestibulum eros. Aenean sed lobortis mi, vitae
                        ullamcorper odio. Nullam quis ligula vel nisi vestibulum
                        tincidunt. Nulla facilisi. Maecenas venenatis, libero ut
                        aliquam aliquam, tellus nisl tincidunt nunc, eu rutrum
                        ipsum nisl eget massa. Duis euismod, velit eget faucibus
                        consectetur, nunc nisl ultrices nisl, sit amet lacinia
                        libero nisi sed nisl. Nullam auctor, lorem ac ultricies
                        molestie, urna nulla facilisis ligula, quis aliquet nisl
                        tellus quis nisl. Nullam auctor, lorem ac ultricies
                        molestie, urna nulla facilisis ligula, quis aliquet nisl
                        tellus quis nisl. Nullam auctor, lorem ac ultricies
                        molestie, urna nulla facilisis ligula, quis aliquet nisl
                        tellus quis nisl.
                    </Text>
                </View>

                <View className="mb-5 flex h-fit w-full flex-col items-start justify-start rounded-3xl bg-white p-5 shadow-md shadow-slate-300">
                    <Text className="mb-2 text-2xl font-bold text-orchid-900">
                        Rules
                    </Text>
                    <Text className="text-base text-orchid-900">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed at risus at erat pretium bibendum. Sed eget
                        vestibulum eros. Aenean sed lobortis mi, vitae
                        ullamcorper odio. Nullam quis ligula vel nisi vestibulum
                        tincidunt. Nulla facilisi. Maecenas venenatis, libero ut
                        aliquam aliquam, tellus nisl tincidunt nunc, eu rutrum
                        ipsum nisl eget massa. Duis euismod, velit eget faucibus
                        consectetur, nunc nisl ultrices nisl, sit amet lacinia
                        libero nisi sed nisl.
                    </Text>
                </View>
            </ScrollView>
        </View>
        // </CustomKeyboardAvoidingView>
    )
}

export default LoginScreen
