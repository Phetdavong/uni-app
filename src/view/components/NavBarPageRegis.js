import { View, Text, Dimensions } from "react-native";
import StepIndicator from "react-native-step-indicator";
import { Shadow } from "react-native-shadow-2";
import React from "react";

const NavbarPageRegis = ({ backgroundColor, value }) => {
  const fullWidth = Dimensions.get("window").width;
  const labels = [
    "Cart",
    "Delivery Address",
    "Order Summary",
    "Payment Method",
    "Track",
  ];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 1,
    stepStrokeCurrentColor: "#CA7D00",
    stepStrokeWidth: 1,
    stepStrokeFinishedColor: "#CA7D00",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#CA7D00",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#CA7D00",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#CA7D00",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#ffffff",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#fe7013",
  };

  this.state = {
    currentPosition: value,
  };
  return (
    <Shadow>
      <View
        style={{
          width: fullWidth,
          height: 64,
          backgroundColor: backgroundColor,
          paddingHorizontal: 20,
          justifyContent: "center",
          shadowColor: "#999999",
        }}
      >
        <StepIndicator
          customStyles={customStyles}
          currentPosition={this.state.currentPosition}
          //  labels={labels}
        />
      </View>
    </Shadow>
  );
};

export default NavbarPageRegis;
