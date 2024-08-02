import { themeStyles, themeColors } from '../styles';
import { View, Text } from 'react-native';
import React from 'react';

const AbsoluteImagePage = ({
  currentImageIndex,
  totalImage,
  bottom,
  right,
  left,
  top,
}) => {
  return (
    <View
      className="absolute py-1 px-3 justify-center items-center rounded-full"
      style={{
        zIndex: 100,
        backgroundColor: 'rgba(57, 73, 86, 0.5)',
        alignSelf: 'center',
        bottom: bottom,
        right: right,
        left: left,
        top: top,
      }}>
      <Text
        style={[
          themeStyles.subTitleTextStyle,
          { color: 'white' },
        ]}>
        {`${currentImageIndex + 1} / ${totalImage}`}
      </Text>
    </View>
  );
};

export default AbsoluteImagePage;
