import CurrentEventViewModel from "../../../viewModel/eventViewModels/CurrentEventViewModel";
import { View, Text, FlatList, Dimensions,ActivityIndicator } from "react-native";
import EventApiModel from "../../../viewApiModel/eventApiModels/EventApiModel";
import HomeViewModel from "../../../viewModel/homeViewModels/HomeViewModel";
import React, { useState, useEffect, useCallback, useContext } from "react";
import StorageContext from "../../contexts/StorageContext";
import NoDataMessage from "../../components/NoDataMessage";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { themeColors, themeStyles } from "../../styles";
import EventCard from "../../components/EventCard";

const CurrentEvent = ({ route }) => {
  const [paramsEventId, setParamsEventId] = useState(route?.params?.eventId);

  const {
    currentEventListCount,
    currentEventListData,
    isCurrentEventListLoading,
    setIsCurrentEventListLoading,
    currentEventListError,
    handleGeCurrentEventList,
  } = EventApiModel.getCurrentEventList();

  const { currentLocation, setCurrentLocation, mId, setMId } =
  useContext(StorageContext);

  const navigation = useNavigation()
  const screenWidth = Dimensions.get('window').width;
  const marginHorizontal = 20;
  const itemWidth = (screenWidth - 4 * marginHorizontal) / 1;

  const { formattedCurrentDate, handleLoadMore, requestLocationPermission } = HomeViewModel();

  const [currentEventStart, setCurrentEventStart] = useState(0);
  const [currentEventEnd, setCurrentEventEnd] = useState(3);

  useFocusEffect(
    useCallback(() => {
      if (currentLocation === null) {
        requestLocationPermission(setCurrentLocation);
      }
    }, [])
  );

  useEffect(() => {
    if (paramsEventId) {
      navigation.navigate("EventDetails", { eventId: paramsEventId });
      setTimeout(() => {
        setParamsEventId(null);
      }, 100);
    }
  }, [paramsEventId]);

  useEffect(() => {
    handleGeCurrentEventList({
      start: currentEventStart === 0 ? 0 : currentEventStart + 1,
      limit: currentEventEnd,
      currentDate: formattedCurrentDate,
    });
  }, [currentEventEnd, currentEventStart, formattedCurrentDate]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {isCurrentEventListLoading && currentEventStart === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        >
          <ActivityIndicator size="large" color={themeColors.primaryColor} />
        </View>
      ) : currentEventListData?.length > 0 ? (
        <FlatList
          data={currentEventListData}
          renderItem={({ item, index }) => (
            <EventCard
              item={item}
              image={item?.event_imgs[0]?.imageUrl}
              title={item?.name}
              endDate={item?.enddate}
              startDate={item?.startdate}
              status={
                item?.delete_yn === "Y" ? "ກຳລັງດຳເນີນການ" : "ທີ່ສິ້ນສຸດແລ້ວ"
              }
              marginRight={20}
              marginLeft={20}
              onPress={() => {
                navigation.navigate("EventDetails", { eventId: item?.evid });
              }}
            />
          )}
          snapToInterval={itemWidth}
          snapToAlignment={"start"}
          vertical
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          onEndReached={() =>
            handleLoadMore({
              leastAmount: 3,
              loadMoreAmount: 3,
              dataLength: currentEventListData?.length,
              dataCount: currentEventListCount,
              setDisplayEnd: setCurrentEventEnd,
              setDisplayStart: setCurrentEventStart,
            })
          }
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <NoDataMessage noDataText={"ຍັງບໍ່ມີອີເວັ້ນທີ່ກຳລັງດຳເນີນການ"} />
        </View>
      )}
    </View>
  );
};

export default CurrentEvent;
