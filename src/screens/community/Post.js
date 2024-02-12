// Import package and project components    
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { BASE_URL } from '@env'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faFeatherPointed } from '@fortawesome/free-solid-svg-icons'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

import COLORS from '../../constants/colors'

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


const Post = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const [postInfo, setPostInfo] = useState({
    title: 'Post Title',
    text: 'Post Text',
    likes: 0,
    comments: 0,
  })

  const handleLike = () => {
    // handle like button press
  }


  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
  }, [])

  return (
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
          paddingVertical: 24,
          paddingHorizontal: 24,
        }}
        className="h-screen w-screen overflow-auto bg-white"
        onTouchStart={Keyboard.dismiss}
      >
        <View className="mb-5 flex h-fit w-full flex-col items-start justify-start rounded-3xl bg-white shadow-md shadow-slate-300">
         <View className='p-5'>
         <Text className="mb-2 text-2xl font-bold text-orchid-900">
            {postInfo.title}
          </Text>
          <Text className="text-base text-orchid-700">
            {postInfo.text}
          </Text>
         </View>
          <View className = "bg-orchid-200 flex-row justify-evenly space-x-10 h-fit w-full rounded-b-3xl p-2 ">
          <TouchableOpacity onPress={handleLike} >
            <FontAwesomeIcon icon={faStar} color={ COLORS.gold[900]} size={22} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Comment button pressed')}>
            <FontAwesomeIcon icon={faComment} color={COLORS.orchid[700]} size={22} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Share button pressed')}>
            <FontAwesomeIcon icon={faFeatherPointed} color={COLORS.blue} size={22} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Report button pressed')}>
            <FontAwesomeIcon icon={faEllipsis} color={COLORS.gray[500]} size={22}/>
          </TouchableOpacity>
          </View>
        </View>


      </ScrollView>

    </View>
  );
}
export default Post;