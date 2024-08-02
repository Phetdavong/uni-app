import { View, Text, Image, TouchableOpacity } from "react-native";
import { themeColors, themeStyles } from "../styles";
import React from "react";

const AllFollowCard = ({
  dataLength,
  index,
  item,
  buttonOnPress,
  cardPress,
}) => {
  return (
    <TouchableOpacity
      onPress={cardPress}
      className="space-x-4"
      style={{
        padding: 20,
        borderBottomWidth: dataLength - 1 === index ? 0 : 1,
        borderColor: themeColors.bgColor,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <Image
        source={{
          uri: item?.com?.company_profile_img?.imageUrl
            ? item?.com?.company_profile_img?.imageUrl
            : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg",
        }}
        style={{ width: 50, height: 50, borderRadius: 100 }}
      />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={[
              themeStyles.titleTextStyle,
              { color: themeColors.titleTextColor },
            ]}
          >
            {item?.com?.name}
          </Text>
          <Text
            style={[
              themeStyles.subTitleTextStyle,
              { color: themeColors.textColor },
            ]}
          >
            {item?.com?.follower_count} {"ຄົນຕິດຕາມຮ້ານນີ້"}
          </Text>
        </View>
        <TouchableOpacity
          onPress={buttonOnPress}
          style={{
            backgroundColor: themeColors.followColor,
            padding: 5,
            borderRadius: 100,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text style={[themeStyles.subTitleTextStyle, { color: "white" }]}>
            {" "}
            ຕິດຕາມແລ້ວ{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default AllFollowCard;
