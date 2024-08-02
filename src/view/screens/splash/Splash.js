import { useNavigation } from "@react-navigation/native";
import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("AppUsagePolicy");
    }, 3000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../../../../assets/logos/UniMarkethub_logo.png")}
        style={{ width: 300, height: 300 }}
      />
    </View>
  );
};

export default Splash;
