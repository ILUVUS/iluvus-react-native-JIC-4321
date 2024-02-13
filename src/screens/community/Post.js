// Import package and project components    
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { BASE_URL } from '@env'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faBullhorn } from '@fortawesome/free-solid-svg-icons'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { PostInput } from '../../components/input'
import CustomKeyboardAvoidingView from '../../components/CustomKeyboardAvoidingView'
import STRINGS from '../../constants/strings'


import Modal from "react-native-modal";

import COLORS from '../../constants/colors'

import {
  Keyboard,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native'
import { PostButton } from '../../components/button'


const Post = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation()
  const [postContent, setPostContent] = useState('');
  const [fName, setFname] = useState('')
  const [lName, setLname] = useState('')

  const handleLike = () => {
    // handle like button press
  }
 


  const [isVisible, setIsVisible] = useState(false);

  const handleOpenPopup = () => {
    setIsVisible(true);
    
  };

  const handleClosePopup = () => {
    setIsVisible(false);
  };


  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
  }, [])

  return (
    <View className="flex h-screen w-screen">
      <CustomKeyboardAvoidingView>
        <View className="flex flex-row items-end justify-end mb-2 mt-0">
          <TouchableOpacity onPress={handleOpenPopup} className="flex h-fit w-fit flex-row flex-wrap items-center justify-center rounded-full bg-orchid-200 px-5 py-2 shadow">
            <Text className="text-orchid-900">Post</Text>
            <Ionicons
              name="create-outline"
              size={20}
              color={COLORS.orchid[900]}
            />
          </TouchableOpacity>
        </View>
        <View className="mb-5 flex h-fit w-full flex-col items-start justify-start rounded-3xl bg-white shadow-md shadow-slate-300">
          <View className='p-5'>
            <Text className="mb-2 text-xl text-orchid-900 shadow">
              {fName} {lName}
            </Text>
            <Text className="text-base text-orchid-700">
              {postContent}
            </Text>
          </View>
          <View className="bg-orchid-200 flex-row justify-evenly space-x-10 h-fit w-full rounded-b-3xl p-2 ">
            <TouchableOpacity onPress={handleLike} >
              <FontAwesomeIcon icon={faStar} color={COLORS.gold[900]} size={22} />
            </TouchableOpacity>

            {/* COMMENT BUTTON HERE */}
            <TouchableOpacity onPress={() => console.log('Comment button pressed')}>
              <FontAwesomeIcon icon={faComment} color={COLORS.orchid[700]} size={22} />
            </TouchableOpacity>

            {/* SHARE BUTTON HERE */}
            <TouchableOpacity onPress={() => console.log('Share button pressed')}>
            <FontAwesomeIcon icon={faBullhorn} color={COLORS.blue} size={22} />
            </TouchableOpacity>
            
            {/* REPORT BUTTON HERE */}
            <TouchableOpacity onPress={() => console.log('Report button pressed')}>
              <FontAwesomeIcon icon={faEllipsis} color={COLORS.gray[500]} size={22} />
            </TouchableOpacity>
          </View>
        </View>


      </CustomKeyboardAvoidingView>

      <View className='w-screen h-screen'>
        <Modal visible={isVisible} transparent={false} animationType="slide" >
          <TouchableOpacity  activeOpacity={1} >
            <View className="justify-start items-center shadow w-fit pb-10 pt-10 flex-col">
              <Text className="mb-5 text-2xl font-bold text-orchid-900">New post</Text>
              <PostInput
                className="h-4/5 mb-5"
                multiline={true}
                placeholder={STRINGS.postContentPlaceholder}
                value={postContent}
                onChangeText={text => setPostContent(text)}
              />
              <View className= "justify-evenly flex-row space-x-10">
              <PostButton onPress={handleClosePopup} className='bg-gold-900'>
                <Text className = "text-orchid-900"> Publish</Text>
              </PostButton>
              <PostButton onPress={handleClosePopup} className='bg-gray-300'>
                <Text className = "text-orchid-900 justify-center"> Cancel</Text>
              </PostButton>
              </View>
              

            </View>
          </TouchableOpacity>
        </Modal>
      </View>

    </View>

  );
}
export default Post;