import React from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import STRINGS from '../../constants/strings'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserTag } from '@fortawesome/free-solid-svg-icons'
import COLORS from '../../constants/colors'

const Notitem = ({text}) => {
    return (
        <>
            <FontAwesomeIcon
                icon={faUserTag}
                color={COLORS.orchid[700]}
                size={30}
            />
            <Text className="items-start justify-start pl-5 text-orchid-900 shadow">
                <Text>{text}</Text>
            </Text>
        </>
    )
}
export default Notitem
