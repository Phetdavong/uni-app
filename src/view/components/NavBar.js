import { View, Text, Dimensions } from "react-native";
import React from "react";
 
const NavBar = ({
  outSideLeftIcon,
  insideLeftIcon,
  middleIcon,
  insideRightIcon,
  outSideRightIcon,
  backgroundColor,
}) => {
  const fullWidth = Dimensions.get("window").width;
 
  return (
    <View
    className="flex-row items-center"
      style={{
        width: fullWidth,
        height: 50,
        backgroundColor: backgroundColor,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <View style={{ flexDirection: "row" }} className="space-x-2 items-center">
        {outSideLeftIcon && <View>{outSideLeftIcon}</View>}
        {insideLeftIcon && <View>{insideLeftIcon}</View>}
      </View>
 
      {middleIcon && (
        <View
          style={{
            left: "25%",
            right: "25%",
            flex: 1
          }}
        >
          {middleIcon}
        </View>
      )}
 
      <View style={{ flexDirection: "row" }} className="space-x-2 items-center">
        {insideRightIcon && <View>{insideRightIcon}</View>}
        {outSideRightIcon && <View>{outSideRightIcon}</View>}
      </View>
    </View>
  );
};
 
export default NavBar;