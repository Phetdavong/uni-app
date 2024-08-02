import FinishedEventViewModel from "../../../viewModel/eventViewModels/FinishedEventViewModel";
import EventApiModel from "../../../viewApiModel/eventApiModels/EventApiModel";
import HomeViewModel from "../../../viewModel/homeViewModels/HomeViewModel";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useContext } from "react";
import StorageContext from "../../contexts/StorageContext";
import NoDataMessage from "../../components/NoDataMessage";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { themeColors, themeStyles } from "../../styles";
import EventCard from "../../components/EventCard";

const FinishedEvent = () => {
  const {
    finishedEventListCount,
    setFinishEventListCount,
    finishedEventListData,
    isFinishEventListLoading,
    setIsFinishEventListLoading,
    finishedEventListError,
    handleGeFinishEventList,
  } = EventApiModel.getFinishEventList();

  const {
    finishedEventStart,
    setFinishedEventStart,
    finishedEventEnd,
    setFinishedEventEnd,
    navigation,
    screenWidth,
    marginHorizontal,
    itemWidth,
  } = FinishedEventViewModel();

  const { currentLocation, setCurrentLocation, mId, setMId } =
    useContext(StorageContext);

  const { formattedCurrentDate, handleLoadMore, requestLocationPermission } =
    HomeViewModel();

  useFocusEffect(
    useCallback(() => {
      if (currentLocation === null) {
        requestLocationPermission(setCurrentLocation);
      }
    }, [])
  );

  useEffect(() => {
    handleGeFinishEventList({
      start: finishedEventStart === 0 ? 0 : finishedEventStart + 1,
      limit: finishedEventEnd,
      currentDate: formattedCurrentDate,
    });
  }, [finishedEventStart, finishedEventEnd, formattedCurrentDate]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {isFinishEventListLoading && finishedEventStart === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        >
          <ActivityIndicator size="large" color={themeColors.primaryColor} />
        </View>
      ) : finishedEventListData?.length > 0 ? (
        <FlatList
          data={finishedEventListData}
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
              dataLength: finishedEventListData?.length,
              dataCount: finishedEventListCount,
              setDisplayEnd: setFinishedEventEnd,
              setDisplayStart: setFinishedEventStart,
            })
          }
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <NoDataMessage noDataText={"ຍັງບໍ່ມີອີເວັ້ນທີ່ສິ້ນສຸດ"} />
        </View>
      )}
    </View>
  );
};

export default FinishedEvent;
