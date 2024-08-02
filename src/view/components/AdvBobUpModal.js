import { View, Text, Image, Modal, TouchableOpacity } from 'react-native'
import * as OutLineIcon from 'react-native-heroicons/outline';
import { themeStyles, themeColors } from '../styles'
import React from 'react'

const AdvBobUpModal = ({ image, activeVisible, setActiveVisible, onPress }) => {
  return (
    <View className="flex absolute z-10">
      <Modal animationType="fade" transparent={true} visible={activeVisible}>
        <View style={themeStyles.modalStyle}>
          <View className="w-[300px] h-[300px]">
            <TouchableOpacity style={{ position: 'absolute', zIndex: 100, right: -15, top: -15 }} onPress={onPress}>
              <OutLineIcon.XCircleIcon
                size={30}
                color={'white'}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={{ uri: image }} className="w-[300px] h-[300px]" resizeMode='cover' />
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  )
}

export default AdvBobUpModal