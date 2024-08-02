import { themeColors, themeStyles } from '../styles'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const EventCard = ({ item, marginRight, marginLeft, width, onPress, image, title, status, startDate, endDate }) => {

  const handleFormmateDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      className="items-center justify-center"
      style={{
        width: width,
        height: 250,
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginTop: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: themeColors.textColor
      }}
    >

      <Image source={{ uri: image }}
        style={{ flex: 2, width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
      />

      <View className="space-y-2" style={{ flex: 1, width: '100%', padding: 10 }}>
        <Text style={[themeStyles.titleTextStyle, {flex: 1 ,color: themeColors.titleTextColor, maxWidth: '100%' }]}>{title}</Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-2">
            <Text style={[themeStyles.subTitleTextStyle, { color: themeColors.subtitleTextColor }]}>{handleFormmateDate(startDate)}</Text>
            <Text style={[themeStyles.subTitleTextStyle, { color: themeColors.subtitleTextColor }]}>ຫາ</Text>
            <Text style={[themeStyles.subTitleTextStyle, { color: themeColors.subtitleTextColor }]}>{handleFormmateDate(endDate)}</Text>
          </View>
          <View className="flex-row items-center space-x-2" style={{ backgroundColor: themeColors.subtitleTextColor, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 }}>
            <Text style={[themeStyles.textStyle, { color: 'white' }]}>{status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default EventCard