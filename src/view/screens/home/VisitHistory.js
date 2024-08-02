import CompanyApiModel from "../../../viewApiModel/companyApiModels/CompanyApiModel";
import HomeViewModel from "../../../viewModel/homeViewModels/HomeViewModel";
import ProductSkeletonCard from "../../components/ProductSkeletonCard";
import * as OutLineIcon from "react-native-heroicons/outline";
import * as SolidIcon from "react-native-heroicons/solid";
import StorageContext from "../../contexts/StorageContext";
import BorderButton from "../../components/BorderButton";
import { useNavigation } from "@react-navigation/native";
import { themeColors, themeStyles } from "../../styles";
import Skeleton from "react-native-reanimated-skeleton";
import ProductCard from "../../components/ProductCard";
import { View, Text, FlatList } from "react-native";
import React, { useContext } from "react";

const VisitHistory = ({
  visitHistoryData,
  visitHisStart,
  setVisitHistoryStart,
  setVisitHistoryEnd,
  visitHistoryCount,
  googleDirectionData,
  visitHistoryLoading,
}) => {
  const {
    isInsertVisitHistoryCompanyLoading,
    setIsInsertVisitHistoryCompanyLoading,
    insertVisitHistoryCompanyError,
    handleInsertVisitHistoryCompany,
  } = CompanyApiModel.insertVisitHistoryCompany();

  const { mId } = useContext(StorageContext);
  const { handleGetItemWidth, handleLoadMore, getItemLayout } = HomeViewModel();
  const starMarginTop = 150;
  const starMarginRight = 10;

  const renderProItemSkeleton = (index) => (
    <View
      key={index}
      style={{
        marginRight: 20,
        marginLeft: index === 0 ? 20 : 0,
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <ProductSkeletonCard
        cardWidth={handleGetItemWidth({
          itemLength: 2,
          totalMargin: 3,
          marginHorizontal: 20,
        })}
      />
    </View>
  );

  return (
    <View>
      {visitHistoryLoading && visitHisStart === 0 ? (
        <View style={{ marginTop: 30 }}>
          <Skeleton
            layout={[
              {
                key: "skeleton",
                width: 80,
                height: 15,
                borderRadius: 4,
                alignSelf: "flex-start",
                marginLeft: 20,
              },
            ]}
          />
          <FlatList
            data={[...Array(2).keys()]}
            keyExtractor={(item, index) => `${index}_cateId`}
            renderItem={({ index }) => renderProItemSkeleton(index)}
            vertical
            numColumns={2}
            scrollEnabled={false}
          />
        </View>
      ) : (
        visitHistoryData?.length > 0 ?
        <View style={{ marginTop: 30 }}>
        <Text
          style={[
            themeStyles.titleTextStyle,
            { color: themeColors.titleTextColor, marginLeft: 20 },
          ]}
        >
          ຜູ້ຂາຍທີ່ເຂົ້າຊົມຕະຫຼອດ
        </Text>
        <FlatList
          data={visitHistoryData}
          keyExtractor={(item, index) => `${index}_visit_history`}
          renderItem={({ item, index }) => (
            <ProductCard
              key={index}
              marginLeft={20}
              marginRight={0}
              starMarginTop={starMarginTop}
              starMarginRight={starMarginRight}
              width={handleGetItemWidth({
                itemLength: 2,
                totalMargin: 3,
                marginHorizontal: 20,
              })}
              height={handleGetItemWidth({
                itemLength: 2,
                totalMargin: 3,
                marginHorizontal: 20,
              })}
              title={item?.name}
              highLightText={
                item?.products?.length > 0 ? item?.products[0]?.name : "???"
              }
              distance={item?.distance ? item?.distance : "???"}
              image={
                item?.company_imgs?.length > 0
                  ? item?.company_imgs[0]?.imageUrl
                  : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
              }
              starRating={item?.starpoint ? item?.starpoint : "0"}
              vacationTime={
                googleDirectionData?.legs[0]?.duration?.text
                  ? googleDirectionData?.legs[0]?.duration?.text
                  : "?"
              }
              onPress={() => {
                handleInsertVisitHistoryCompany({
                  comid: item?.comid,
                  mid: mId,
                });
              }}
            />
          )}
          vertical
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListFooterComponent={
            <View style={{ paddingHorizontal: 20 }}>
              <BorderButton
                onPress={() => {
                  handleLoadMore({
                    leastAmount: 6,
                    loadMoreAmount: 6,
                    dataLength: visitHistoryData?.length,
                    dataCount: visitHistoryCount,
                    setDisplayEnd: setVisitHistoryStart,
                    setDisplayStart: setVisitHistoryEnd,
                  });
                }}
                text={"ເບິ່ງເພີ່ມເຕິມ"}
                icon={
                  <OutLineIcon.ChevronDownIcon
                    size={16}
                    color={themeColors.subtitleTextColor}
                  />
                }
              />
            </View>
          }
        />
      </View> : null
      )}
    </View>
  );
};

export default VisitHistory;
