// Import package and project components    
import React, { useEffect, useState, Component } from 'react'

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
import Comment from './Comments'

import {
  Keyboard,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  RefreshControl,
} from 'react-native'


const Post = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [liked, setLiked] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [commentText, setCommentText] = useState('');


  const [postInfo, setPostInfo] = useState({
    title: 'Post Title',
    text: 'Post Text',
    likes: 0,
    comments: 0,
  })

  const toggleCommentsVisibility = () => {
    console.log("Comment Button Pressed!");
    setCommentsVisible(!commentsVisible);
  };

  const submitComment = () => {
    console.log(commentText);
    setCommentText('');
  };

  const handleLike = () => {
    setLiked(!liked);
    console.log("Like Button Pressed")
    axios({
      method: 'GET',
      url: `${BASE_URL}/community/all`,
      headers: {
          'Content-Type': 'application/json',
      },
    })
      .then((res) => {
          setCommunityList(res.data)
      })
      .catch((err) => {})
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
          <TouchableOpacity className = "" onPress={handleLike}>
            <FontAwesomeIcon icon={faStar} color={liked ? COLORS.gold[950] : COLORS.gold[900]} size={22} />
            <Text > {postInfo.likes} </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleCommentsVisibility}>
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
          {commentsVisible && (
            <>
              <Comment authorName='Author 1' text='This is a comment text 1 by Author 1.' />
              <Comment authorName='Author 2' text='This is a comment text 2 by Author 2.' />

              <View className = " flex-row justify-evenly  h-fit w-full rounded-b-3xl p-2">
                <TextInput className = "h-10 border-2 p-2 m-1 rounded-xl bg-purple-300 w-4/5"
                  onChangeText={setCommentText}
                  value={commentText}
                  placeholder="Write a comment..."
                />

                <TouchableOpacity className = " border-2 w-1/6 p-2 self-center rounded-xl h-9 bg-green-500 " onPress={submitComment}>
                  <Text className="font-medium self-center">Send</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
      </ScrollView>

    </View>
  );
}
export default Post;