import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import NavBar from "../../components/NavBar";
import { useNavigation } from "@react-navigation/native";
import * as OutLineIcon from "react-native-heroicons/outline";
import EventApiModel from "../../../viewApiModel/eventApiModels/EventApiModel";
import { themeColors, themeStyles } from "../../styles";
import RenderHtml from "react-native-render-html";
import React, { useEffect } from "react";

const EventDetails = ({ route }) => {
  const {
    eventDetailData,
    isEventDetailLoading,
    setIsEventDetailLoading,
    eventDetailError,
    handleGeEventDetail,
  } = EventApiModel.getEventDetail();

  const imageWidth = Dimensions.get("window").width;
  const navigation = useNavigation()

  const handleFormmateDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  const paramsEventId = route.params.eventId;

  const { width } = useWindowDimensions();
  const source = {
    html: `
        <h1>This HTML snippet is now rendered with native components !</h1>
        <h2>Enjoy a webview-free and blazing fast application</h2>
        <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
        <em style="textAlign: center;">Look at how happy this native cat is</em>`,
  };

  useEffect(() => {
    handleGeEventDetail({ evid: paramsEventId });
  }, []);

  return (
    <ScrollView style={{ flex: 1 }} className="space-y-2">
      <NavBar
        backgroundColor={"white"}
        outSideLeftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <OutLineIcon.ArrowLeftIcon
              size={25}
              color={themeColors.titleTextColor}
            />
          </TouchableOpacity>
        }
        insideLeftIcon={
          <Text
            style={[
              themeStyles.titleTextStyle,
              { color: themeColors.titleTextColor },
            ]}
          >
            Event
          </Text>
        }
      />
      <View style={{padding: 20, backgroundColor: 'white'}}>
        <Text
          style={[
            themeStyles.priceTextStyle,
            { color: themeColors.titleTextColor },
          ]}
        >
          {eventDetailData?.name}
        </Text>
        <View className="flex-row items-center space-x-2">
          <Text
            style={[
              themeStyles.subTitleTextStyle,
              { color: themeColors.subtitleTextColor },
            ]}
          >
            {handleFormmateDate(eventDetailData?.startdate)}
          </Text>
          <Text
            style={[
              themeStyles.subTitleTextStyle,
              { color: themeColors.subtitleTextColor },
            ]}
          >
            {handleFormmateDate(eventDetailData?.enddate)}
          </Text>
        </View>

        <FlatList
          data={eventDetailData?.event_imgs}
          renderItem={({ item, index }) => (
            <Image
              source={{ uri: item?.imageUrl }}
              style={{ width: imageWidth, height: imageWidth }}
            />
          )}
          snapToAlignment={"start"}
          vertical
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
        />

        <RenderHtml source={source} contentWidth={width} />
      </View>
    </ScrollView>
  );
};

export default EventDetails;
