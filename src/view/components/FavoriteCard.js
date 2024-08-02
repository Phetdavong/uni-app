import { View, Text, Image, TouchableOpacity } from "react-native";
import * as OutLineIcon from "react-native-heroicons/outline";
import * as SolidIcon from "react-native-heroicons/solid";
import { themeColors, themeStyles } from "../styles";
import React from "react";

const FavoriteCard = ({
  dataLength,
  item,
  index,
  totalServ,
  totalOrder,
  onPress,
  iconPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center space-x-4 w-full"
      style={{
        padding: 20,
        borderBottomWidth: dataLength - 1 === index ? 0 : 1,
        borderColor: themeColors.bgColor,
      }}
    >
      <Image
        source={{
          uri: item?.product_imgs[0]?.imageUrl
            ? item?.product_imgs[0]?.imageUrl
            : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg",
        }}
        style={{ width: 100, height: 100, borderRadius: 10 }}
      />
      <View style={{ flex: 1 }}>
        <Text
          style={[
            themeStyles.titleTextStyle,
            { color: themeColors.titleTextColor },
          ]}
        >
          {item?.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={[
                themeStyles.titleTextStyle,
                { color: themeColors.titleTextColor },
              ]}
            >
              {"ລາຄາ"} {parseFloat(item?.price).toLocaleString()} {"ກີບ"}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Text
                style={[
                  themeStyles.subTitleTextStyle,
                  { color: themeColors.textColor },
                ]}
              >
                {totalOrder !== null ? totalOrder : totalServ}{" "}
                {totalOrder !== null ? "ຂາຍແລ້ວ" : "ຄົນທີ່ໃຊ້ບໍລິການ"}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <SolidIcon.MapPinIcon
                  size={15}
                  color={themeColors.subtitleTextColor}
                />
                <Text
                  style={[
                    themeStyles.subTitleTextStyle,
                    { color: themeColors.textColor },
                  ]}
                >
                  {(item?.com?.distance?.toString().length < 4
                    ? item?.com?.distance?.toString()
                    : item?.com?.distance?.toString().substring(0, 4)) + " km"}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={iconPress}>
            <SolidIcon.HeartIcon size={30} color={themeColors.primaryColor} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FavoriteCard;
