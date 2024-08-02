import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { themeStyles, themeColors } from "../styles";
import React from "react";

const ProductCard = ({
  starMarginTop,
  starmarginRight,
  marginLeft,
  marginRight,
  width,
  height,
  onPress,
  image,
  title,
  highLightText,
  price,
  distance,
  totalOrder,
  starRating,
  OfficialMark,
  vacationTime,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="space-y-2"
      style={{
        width: width,
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      {starRating !== null ? (
        <View
          style={{
            position: "absolute",
            zIndex: 100,
            right: starmarginRight,
            top: starMarginTop,
            backgroundColor: "white",
            paddingVertical: 2,
            paddingHorizontal: 4,
            borderRadius: 10,
            elevation: 3,
            shadowOffset: { width: 10, height: 10 },
            opacity: 5,
          }}
          className="flex-row items-center space-x-1"
        >
          <Image
            source={require("../../../assets/icons/StarRating.png")}
            style={{ width: 15, height: 15 }}
          />
          <Text
            style={[themeStyles.textStyle, { color: themeColors.starColor }]}
          >
            {starRating
              ? starRating?.toString().length < 4
                ? starRating?.toString()
                : starRating?.toString().substring(0, 3)
              : "0"}
          </Text>
        </View>
      ) : null}

      {OfficialMark ? (
        <Image
          source={require("../../../assets/icons/OfficialPartner.png")}
          style={{
            width: 25,
            height: 25,
            position: "absolute",
            zIndex: 100,
            right: 10,
            top: 10,
          }}
        />
      ) : null}

      <Image
        source={{
          uri: image,
        }}
        style={{ width: width, height: height, borderRadius: 10 }}
      />
      <View className="space-y-1">
        <Text
          numberOfLines={1}
          style={[
            themeStyles.subTitleTextStyle,
            { color: themeColors.subtitleTextColor },
          ]}
        >
          {title}
        </Text>
        <Text
          numberOfLines={1}
          style={[
            themeStyles.titleTextStyle,
            { color: themeColors.primaryColor },
          ]}
        >
          {price ? parseFloat(price).toLocaleString() : highLightText}{" "}
          {price ? "Lak" : null}
        </Text>
        {(distance && totalOrder) || vacationTime ? (
          <View className="flex-row items-center">
            <View
              style={{
                borderRightWidth: 1,
                borderColor: themeColors.subtitleTextColor,
                paddingRight: 5,
              }}
            >
              <Text
                style={[
                  themeStyles.textStyle,
                  { color: themeColors.subtitleTextColor },
                ]}
              >
                {(distance?.toString().length < 4
                  ? distance?.toString()
                  : distance?.toString().substring(0, 4)) + " km"}
              </Text>
            </View>
            <View style={{ paddingLeft: 5 }}>
              <Text
                style={[
                  themeStyles.textStyle,
                  { color: themeColors.subtitleTextColor },
                ]}
              >
                {totalOrder ? totalOrder : vacationTime}{" "}
                {totalOrder ? "ຂາຍ" : null}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
