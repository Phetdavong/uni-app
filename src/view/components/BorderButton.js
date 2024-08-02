import { View, Text, TouchableOpacity } from 'react-native'
import { themeColors, themeStyles } from '../styles'
import React from 'react'

const BorderButton = ({ onPress, text, icon }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`h-[50px] items-center justify-center flex-row space-x-2`}
            style={{
                borderColor: themeColors.bgColor,
                borderWidth: 1,
                borderRadius: 10
            }}
        >
            <Text
                style={[themeStyles.subTitleTextStyle, { color: themeColors.subtitleTextColor }]}>
                {text}
            </Text>
            {icon}
        </TouchableOpacity>
    )
}

export default BorderButton