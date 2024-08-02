import { View, Text, TouchableOpacity } from "react-native";
import { themeColors, themeStyles } from "../styles";
import React from "react";

const RadiusButton = ({
  text,
  onPress,
  disabled,
  textColor,
  backgroundColor,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      className="flex h-[60px]"
      style={{
        backgroundColor: backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
      }}
    >
      <View>
        <Text
          style={[
            themeStyles.titleTextStyle,
            { color: textColor },
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RadiusButton;
