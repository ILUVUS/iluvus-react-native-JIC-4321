import React from 'react'
import { useEffect, useState } from 'react'

import axios from 'axios'
import { BASE_URL } from '@env'
import { Image } from 'react-native-elements'
import { RefreshControl, ScrollView, Text, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'

import SIZES from '../../constants/sizes'
import COLORS from '../../constants/colors'
import STRINGS from '../../constants/strings'
import sampleIcon from '../../../assets/images/sampleicon.jpg'
import communityIcon from '../../../assets/images/communitybg4.png'

import {
    CommunityViewImageButton,
    CommunityViewMainButton,
} from '../../components/button'


const MyCreatedGroup = () => {
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [communityList, setCommunityList] = useState([])
    const [refreshing, setRefreshing] = React.useState(false)
    const [communityListInfo, setCommunityListInfo] = useState([])
    const [userId, setUserId] = useState('')

    useEffect(() => {
        setUserIdFromStorage()
    }, [])

    const setUserIdFromStorage = async () => {
        setUserId('')
        AsyncStorage.getItem('userId').then((value) => {
            setUserId(value)
        })
    }

    useEffect(() => {
        if (userId !== '') {
            fetchCommunityList()
        }
    }, [userId])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        fetchCommunityList()
        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }, [])

    const fetchCommunityList = async () => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/community/myCreatedGroup?userId=${userId}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setCommunityList(res.data)
            })
            .catch((err) => {})
    }

    useEffect(() => {
        setCommunityListInfo([])
        // make sure data arrive in order
        const promises = Object.keys(communityList).map((key) =>
            getCommunityInfo(key)
        )
        Promise.all(promises).then((infos) => {
            setCommunityListInfo((prev) =>
                infos.map((info, index) => ({
                    id: Object.keys(communityList)[index],
                    name: info.name,
                    description: info.description,
                    rules: info.rules,
                    visibility: info.visibility,
                    ownerId: info.ownerId,
                    image: info.image,
                }))
            )
        })
    }, [communityList])

    const getCommunityInfo = async (id) => {
        try {
            const res = await axios({
                method: 'GET',
                url: `${BASE_URL}/community/getInfo?id=${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            return res.data
        } catch (err) {
            console.log(err)
            throw err // re-throw the error to be caught in the calling function
        }
    }

    const communityClick = (id) => {
        navigation.navigate(STRINGS.communityView, { communityId: id })
    }

    return (
        <View className="flex justify-center bg-white align-middle">
            <ScrollView
                className="h-screen w-screen"
                contentContainerStyle={{
                    paddingHorizontal: 5,
                    display: 'flex',
                    justifyContent: 'center',
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View className="my-3 mb-2 ml-5 flex w-screen items-start">
                    {/* <Text className="text-3xl font-bold text-orchid-900 shadow-md shadow-slate-200">
                        My Communities 
                    </Text> */}
                </View>

                <View className="flex flex-row flex-wrap overflow-auto">
                    {communityListInfo.map((info, index) => (
                        <CommunityViewImageButton
                            key={index}
                            onPress={() => communityClick(info.id)}
                        >
                            <Image
                                source={
                                    info.image != null && info.image !== ''
                                        ? {
                                              uri: `data:image/jpg;base64,${info.image}`,
                                          }
                                        : communityIcon
                                }
                                className="h-24 w-24 rounded-3xl"
                            />
                            <Text className="mt-1 text-sm text-orchid-900">
                                {info.name.length > 12
                                    ? info.name.substring(0, 10) + '...'
                                    : info.name}
                            </Text>
                        </CommunityViewImageButton>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}
export default MyCreatedGroup
