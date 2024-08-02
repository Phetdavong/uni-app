import { View, Text, Image,SafeAreaView } from 'react-native'
import { themeColors, themeStyles } from '../styles'
import React from 'react'

const NoDataMessage = ({noDataText}) => {
  return (
    <View className="justify-center items-center space-y-2">
      <Image source={require('../../../assets/icons/NoData.png')} style={{width: 50, height: 50}}/>
      <Text style={[themeStyles.subTitleTextStyle, { color: themeColors.subtitleTextColor }]}>{noDataText}</Text>
    </View>
  )
}

export default NoDataMessage