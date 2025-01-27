import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { useState, useEffect } from 'react'
import { BASE_URL } from '@env'
import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler'
import STRINGS from '../../constants/strings'

export default function SkillSelector({
    setModalVisibility,
    selectedSkills,
    setSelectedSkills,
}) {
    const [skillList, setSkillList] = useState({})
    const [localSelectedSkills, setLocalSelectedSkills] = useState(selectedSkills)

    // Fetch skill list from /skill/getByName (empty name returns all)
    const getSkills = async (name) => {
        axios({
            method: 'GET',
            url: `${BASE_URL}/skill/getByName?name=${name}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setSkillList(res.data)
            })
            .catch((err) => {
                console.log('Cannot get the skill list', err)
            })
    }

    // Initial load: get all skills
    useEffect(() => {
        getSkills('')
    }, [])

    // Toggle whether a skill is selected
    const toggleSkillSelection = (skillId, skillName) => {
        setLocalSelectedSkills((prevSelected) => {
            const alreadySelected = Object.keys(prevSelected).includes(skillId)
            if (alreadySelected) {
                // Remove skill if it was already selected
                const { [skillId]: _, ...rest } = prevSelected
                return rest
            } else {
                // Optionally enforce a max number of selections
                const selectedCount = Object.keys(prevSelected).length
                if (selectedCount < 5) {
                    return {
                        ...prevSelected,
                        [skillId]: skillName,
                    }
                }
                return prevSelected
            }
        })
    }

    return (
        <View className="mb-2 flex w-full flex-1 p-5">
            <View className="flex items-center">
                <Text className="mb-3 text-2xl font-bold text-orchid-900">
                    Select Your Skills
                </Text>
            </View>
            <TextInput
                className="mb-4 rounded-lg bg-orchid-100 px-6 py-4 shadow-sm"
                placeholder="Search for Skills"
                onChangeText={(text) => {
                    getSkills(text)
                }}
            />
            <ScrollView
                className="mb-3 flex-1 gap-2 pb-32"
                showsVerticalScrollIndicator={false}
            >
                {Object.keys(skillList).map((key) => {
                    const isSelected = Object.keys(localSelectedSkills).includes(key)
                    return (
                        <TouchableOpacity
                            className={
                                'rounded-lg bg-orchid-100 px-6 py-4 shadow-sm' +
                                (isSelected ? ' bg-gold-900' : '')
                            }
                            key={key}
                            onPress={() => {
                                toggleSkillSelection(key, skillList[key])
                            }}
                        >
                            <Text className="text-sm text-orchid-900">
                                {skillList[key]}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            <View className="flex h-fit w-fit flex-row justify-center space-x-2 rounded-full">
                <TouchableOpacity
                    className="flex h-fit flex-1 items-center rounded-xl bg-red-300 px-8 py-2 shadow"
                    onPress={() => {
                        setModalVisibility(false)
                    }}
                >
                    <Text className="align-middle text-base font-bold text-red-900">
                        {STRINGS.cancel}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex h-fit w-1/2 items-center rounded-xl bg-green-300 px-10 py-2 shadow"
                    onPress={() => {
                        // Pass localSelectedSkills back up to parent
                        setSelectedSkills(localSelectedSkills)
                        // Then close this modal
                        setModalVisibility(false)
                    }}
                >
                    <Text className="align-middle text-base font-bold text-green-900">
                        {STRINGS.save}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
