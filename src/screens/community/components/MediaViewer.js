import React, { useState, useEffect, useRef } from 'react'
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'

import { FlatList } from 'react-native'
import { Zoom, createZoomListComponent } from 'react-native-reanimated-zoom'

import { Video } from 'expo-av'
import SIZES from '../../../constants/sizes'
import COLORS from '../../../constants/colors'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'

import Constants from 'expo-constants'

export default function MediaViewer() {
    const [medias, setMedias] = useState(useRoute().params.medias)
    const [readyMedias, setReadyMedias] = useState([])
    const ZoomFlatList = createZoomListComponent(FlatList)
    const navigate = useNavigation()

    const getMediaType = async (url) => {
        try {
            const { data: response } = await axios.get(url, {
                responseType: 'blob',
            })
            return response.data.type
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setReadyMedias([])

        const prepareMedias = async () => {
            for (let i = 0; i < medias.length; i++) {
                const media = medias[i]
                const mediaType = await getMediaType(media)
                if (mediaType.includes('image')) {
                    setReadyMedias((prev) => [
                        ...prev,
                        {
                            url: media,
                            mediaType: 'image',
                        },
                    ])
                } else {
                    setReadyMedias((prev) => [
                        ...prev,
                        {
                            url: media,
                            mediaType: 'video',
                        },
                    ])
                }
            }
        }
        prepareMedias()
    }, [])

    const renderItem = React.useCallback(
        ({ item }) => {
            if (item.mediaType === 'image') {
                return (
                    <Zoom
                        className="flex items-center justify-center"
                        key={item.url}
                    >
                        <Image
                            source={{
                                uri: item.url,
                            }}
                            className="h-screen w-screen"
                            resizeMode="contain"
                        />
                    </Zoom>
                )
            } else if (item.mediaType === 'video') {
                return (
                    <View
                        className="flex h-full w-screen items-center justify-center"
                        key={Math.random()}
                    >
                        <Video
                            source={{
                                uri: item.url,
                            }}
                            className="h-52 w-full"
                            resizeMode="contain"
                            useNativeControls
                            isLooping={false}
                        />
                    </View>
                )
            }
        },
        [readyMedias]
    )

    return (
        <>
            <View className="flex h-full w-full items-center justify-center bg-black">
                {readyMedias.length > 0 &&
                readyMedias.length >= medias.length ? (
                    <>
                        <ZoomFlatList
                            data={readyMedias}
                            pagingEnabled
                            horizontal
                            renderItem={renderItem}
                        />
                        <TouchableOpacity
                            className="absolute right-3 opacity-70"
                            style={{ top: Constants.statusBarHeight }}
                            onPress={() => {
                                navigate.goBack()
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faXmark}
                                color={COLORS['white']}
                                size={SIZES['xxlargeIconSize']}
                            />
                        </TouchableOpacity>
                    </>
                ) : (
                    <View className="flex items-center justify-center gap-2">
                        <ActivityIndicator
                            size="large"
                            color={COLORS['white']}
                        />
                    </View>
                )}
            </View>
        </>
    )
}
