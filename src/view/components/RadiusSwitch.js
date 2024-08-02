import React, { useRef, useEffect, useState } from "react";
import { View, PanResponder, Animated } from "react-native";
import { themeColors } from "../styles";
 
const RadiusSwitch = ({ switchValue, setSwitchValue, onChange }) => {
  const pan = useRef(new Animated.ValueXY()).current;
 
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gestureState) => {
        const newSwitchValue = gestureState.dx > 0 ? true : false;
        setSwitchValue(newSwitchValue);
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
        onChange(newSwitchValue);
      },
    })
  ).current;
 
  useEffect(() => {
    pan.setValue({ x: 0, y: 0 });
  }, [switchValue, pan]);
 
  return (
    <View
      style={{
        width: 51,
        height: 22,
        borderRadius: 15.5,
        backgroundColor:
          switchValue === true ? themeColors.followColor : themeColors.textColor,
        justifyContent: "center",
        alignItems: switchValue === true ? "flex-end" : "flex-start",
      }}
    >
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          width: 20,
          height: 20,
          borderRadius: 13.5,
          backgroundColor: "white",
          marginLeft: 0.5,
          transform: [{ translateX: pan.x }],
        }}
      />
    </View>
  );
};
 
export default RadiusSwitch;
