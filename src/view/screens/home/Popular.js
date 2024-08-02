import CompanyApiModel from "../../../viewApiModel/companyApiModels/CompanyApiModel";
import GoogleApiModel from "../../../viewApiModel/googleApiModels/GoogleApiModel";
import HomeViewModel from "../../../viewModel/homeViewModels/HomeViewModel";
import ProductSkeletonCard from "../../components/ProductSkeletonCard";
import ViewMoreSkeleton from "../../components/ViewMoreSkeleton";
import { View, Text, FlatList, Dimensions } from "react-native";
import StorageContext from "../../contexts/StorageContext";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "../../components/ProductCard";
import ViewMore from "../../components/ViewMore";
import React, { useContext } from "react";

const Popular = ({
  popularProductData,
  popularCompanyServiceData,
  popularCompanyData,
  googleDirectionData,
  popularCompanyLoading,
  popularProductLoading,
  popularServiceLoading,
}) => {
  const {
    isInsertVisitHistoryCompanyLoading,
    setIsInsertVisitHistoryCompanyLoading,
    insertVisitHistoryCompanyError,
    handleInsertVisitHistoryCompany,
  } = CompanyApiModel.insertVisitHistoryCompany();

  const { mId } = useContext(StorageContext);

  const { handleGetItemWidth } = HomeViewModel();
  const navigation = useNavigation();
  const starMarginTop = 80;
  const starMarginRight = 10;

  const popularCards = [];

  if (popularProductData) {
    popularCards.push(
      <ProductCard
        marginLeft={20}
        marginRight={0}
        starMarginTop={starMarginTop}
        starmarginRight={starMarginRight}
        width={handleGetItemWidth({
          itemLength: 3,
          totalMargin: 4,
          marginHorizontal: 20,
        })}
        height={handleGetItemWidth({
          itemLength: 3,
          totalMargin: 4,
          marginHorizontal: 20,
        })}
        title={popularProductData?.name}
        price={popularProductData?.price}
        distance={popularProductData?.com?.distance}
        image={
          popularProductData?.product_imgs?.length
            ? popularProductData?.product_imgs[0]?.imageUrl
            : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
        }
        starRating={popularProductData?.starpoint}
        totalOrder={popularProductData?.total_order}
        onPress={() => {
          navigation.navigate("ProductDetail", {
            productId: popularProductData?.pid,
          });
        }}
      />
    );
  }

  if (popularCompanyServiceData) {
    popularCards.push(
      <ProductCard
        marginLeft={20}
        marginRight={0}
        starMarginTop={starMarginTop}
        starmarginRight={starMarginRight}
        width={handleGetItemWidth({
          itemLength: 3,
          totalMargin: 4,
          marginHorizontal: 20,
        })}
        height={handleGetItemWidth({
          itemLength: 3,
          totalMargin: 4,
          marginHorizontal: 20,
        })}
        title={popularCompanyServiceData?.name}
        price={popularCompanyServiceData?.price}
        distance={popularCompanyServiceData?.com?.distance}
        image={
          popularCompanyServiceData?.product_imgs?.length
            ? popularCompanyServiceData?.product_imgs[0]?.imageUrl
            : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
        }
        starRating={popularCompanyServiceData?.starpoint}
        totalOrder={popularCompanyServiceData?.total_serv}
        onPress={() => {
          navigation.navigate("ProductDetail", {
            serviceId: popularCompanyServiceData?.pid,
          });
        }}
      />
    );
  }

  if (popularCompanyData) {
    popularCards.push(
      <ProductCard
        marginLeft={20}
        marginRight={20}
        starMarginTop={starMarginTop}
        starmarginRight={starMarginRight}
        width={handleGetItemWidth({
          itemLength: 3,
          totalMargin: 4,
          marginHorizontal: 20,
        })}
        height={handleGetItemWidth({
          itemLength: 3,
          totalMargin: 4,
          marginHorizontal: 20,
        })}
        title={popularCompanyData?.name}
        highLightText={popularCompanyData?.products[0]?.name}
        distance={popularCompanyData?.distance}
        image={
          popularCompanyData?.company_profile_img?.imageUrl
            ? popularCompanyData?.company_profile_img?.imageUrl
            : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
        }
        starRating={popularCompanyData?.starpoint}
        vacationTime={
          googleDirectionData?.legs[0]?.duration?.text
            ? googleDirectionData?.legs[0]?.duration?.text
            : "?"
        }
        onPress={() => {
          handleInsertVisitHistoryCompany({
            comid: popularCompanyData?.comid,
            mid: mId,
          });
        }}
      />
    );
  }

  const renderProItemSkeleton = (index) => (
    <View
      key={index}
      style={{
        marginRight: 20,
        marginLeft: index === 0 ? 20 : 0,
        marginTop: 20,
      }}
    >
      <ProductSkeletonCard
        cardWidth={handleGetItemWidth({
          itemLength: 3,
          totalMargin: 4,
          marginHorizontal: 20,
        })}
      />
    </View>
  );

  return (
    <View>
      {popularCompanyLoading ||
      popularProductLoading ||
      popularServiceLoading ? (
        <View style={{ marginTop: 30 }}>
          <ViewMoreSkeleton />
          <FlatList
            data={[...Array(3).keys()]}
            keyExtractor={(item, index) => `${index}_cateId`}
            renderItem={({ index }) => renderProItemSkeleton(index)}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ) : popularCompanyData ||
        popularProductData ||
        popularCompanyServiceData ? (
        <View style={{ marginTop: 30 }}>
          <ViewMore
            title={"ເປັນທີ່ນິຍົມ"}
            onPress={() => {
              navigation.navigate("PopularTopTab");
            }}
          />
          <FlatList
            data={popularCards}
            renderItem={({ item, index }) => <View>{item}</View>}
            snapToInterval={390}
            snapToAlignment={"start"}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ) : null}
    </View>
  );
};

export default Popular;
