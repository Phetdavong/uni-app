import { themeColors, themeStyles } from "../styles";
import * as OutLineIcon from "react-native-heroicons/outline";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
 
const PhoneTextInput = ({
  callingCode,
  setCallingCode,
  phone,
  setPhone,
  placeholder,
  invalid,
  flagImage,
  onFlagPress,
  invalidText,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
 
  return (
    <View className="space-y-2">
      <View
        className="flex-row h-[60px] items-center "
        style={{
          borderColor: isFocused
            ? themeColors.subtitleTextColor
            : invalid
            ? themeColors.primaryColor
            : themeColors.textColor,
          borderWidth: 2,
          borderRadius: 10,
          textAlign: "left",
        }}
      >
        <TouchableOpacity
          onPress={onFlagPress}
          style={{ paddingLeft: 20 }}
          className="flex-row items-center space-x-1"
        >
          <Text style={[themeStyles.titleTextStyle, { color: "white" }]}>
            {flagImage}
          </Text>
          <OutLineIcon.ChevronDownIcon
            size={20}
            color={themeColors.titleTextColor}
          />
          <Text
            style={[
              themeStyles.titleTextStyle,
              { color: themeColors.titleTextColor },
            ]}
          >
            {callingCode}
          </Text>
        </TouchableOpacity>
        <TextInput
          value={phone}
          placeholder={placeholder}
          placeholderTextColor={themeColors.textColor}
          keyboardType={"numeric"}
          autoFocus={isFocused ? true : false}
          style={{
            flex: 1,
            paddingLeft: 20,
            paddingVertical: 5,
            color: themeColors.titleTextColor,
            ...themeStyles.subTitleTextStyle,
          }}
          {...props}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
      </View>
      {invalidText ? (
        <Text
          style={[themeStyles.textStyle, { color: themeColors.primaryColor }]}
        >
          {invalidText}
        </Text>
      ) : null}
    </View>
  );
};
 
export default PhoneTextInput;
 