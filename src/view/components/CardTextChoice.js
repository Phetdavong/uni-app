import { View, Text, TouchableOpacity } from "react-native";
import { themeColors, themeStyles } from "../styles";
import RegisterSellerFourViewModel from "../../viewModel/registerSellerViewModels/RegisterSellerFourViewModel";
import React from "react";

const CardTextChoice = ({
  textDetail,
  textTitle,
  id,
  index,
  onPress,
  length,
  selectedId,
}) => {


  return (
    <View style={{ paddingBottom: index + 1 === length ? 0 : 20, flex: 1,}}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: 
            selectedId === id 
              ? themeColors.primaryColorS
              : themeColors.textColor,

          }}
          className="flex-row p-1"
        >
          <View className="px-3 py-1">
            {/* radio */}
            <Text
              style={{
                borderWidth: 1,
                width: 25,
                height: 27,
                borderRadius: 20,
                marginTop: 3,
                borderColor:
                selectedId === id
                    ? themeColors.primaryColorS
                    : themeColors.textColor,
              }}
            ></Text>
            <Text
              className='mt-[12px]'
              style={{
                position: 'absolute',
                borderWidth: 8,
                width: 5,
                height: 5,
                borderRadius: 10,
                marginLeft: 16.5,
                borderColor:
                selectedId === id
                    ? themeColors.primaryColorS
                    : themeColors.bgColor,
              }}
            ></Text>
            {/* End radio */}
          </View>

          <View  style={{ flex: 1}}>
            <Text
              style={[
                themeStyles.titleTextStyle,
                { color: themeColors.blackColor },
              ]}
            >
              {textTitle}
            </Text>
            <Text
              style={[
                themeStyles.subTitleTextStyle,
                { color: themeColors.blackColor,},
              ]}
            >
              {textDetail}
            </Text>
          </View>

        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardTextChoice;
