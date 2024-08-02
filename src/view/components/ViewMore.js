import * as OutLineIcon from 'react-native-heroicons/outline';
import { View, Text, TouchableOpacity } from 'react-native'
import { themeColors, themeStyles } from '../styles';
import React from 'react'

const ViewMore = ({onPress, title}) => {
  return (
    <View className="flex-row justify-between items-center" style={{ paddingHorizontal: 20 }}>
    <Text style={[themeStyles.titleTextStyle, { color: themeColors.titleTextColor }]}>{title}</Text>
    <TouchableOpacity className="flex-row items-center space-x-1" onPress={onPress}>
      <Text style={[themeStyles.subTitleTextStyle, { color: themeColors.subtitleTextColor }]}>ເພິ່ມເຕີມ</Text>
      <OutLineIcon.ChevronRightIcon
        size={18}
        color={themeColors.subtitleTextColor}
      />
    </TouchableOpacity>
  </View>
  )
}

export default ViewMore