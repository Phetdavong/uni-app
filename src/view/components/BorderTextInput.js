import { themeColors, themeStyles } from "../styles";
import { View, Text, TextInput } from "react-native";
import React from "react";
 
const BorderTextInput = ({
  value,
  setValue,
  placeholder,
  keyboardType,
  secureTextEntry,
  handleIconPressed,
  icon,
  invalid,
  invalidText,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
 
  return (
    <View>
      {icon ? (
        <View className="space-y-2">
          <View
            className="w-full flex-row items-center justify-between h-[60px]"
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
            <TextInput
              value={value}
              placeholder={placeholder}
              placeholderTextColor={themeColors.textColor}
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
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
 
            <View onPress={handleIconPressed} className="flex-2 px-2">
              {icon}
            </View>
          </View>
          <Text
            style={[
              themeStyles.textStyle,
              { color: themeColors.primaryColor },
            ]}
          >
            {invalidText}
          </Text>
        </View>
      ) : (
        <View className="space-y-2">
          <View
            className="h-[60px]"
            style={{
              borderColor: isFocused
                ? themeColors.subtitleTextColor
                : invalid
                ? themeColors.primaryColor
                : themeColors.textColor,
              borderWidth: 1,
              borderRadius: 4,
              textAlign: "left",
            }}
          >
            <TextInput
              value={value}
              placeholder={placeholder}
              placeholderTextColor={themeColors.textColor}
              keyboardType={keyboardType}
              autoFocus={isFocused ? true : false}
              style={{
                flex: 1,
                paddingHorizontal: 20,
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
          <Text
            style={[
              themeStyles.textStyle,
              { color: themeColors.primaryColor },
            ]}
          >
            {invalidText}
          </Text>
        </View>
      )}
    </View>
  );
};
 
export default BorderTextInput;