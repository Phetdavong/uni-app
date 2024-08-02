import RecommendViewModel from "../../../viewModel/recommendViewModels/RecommendViewModel";
import CompanyApiModel from "../../../viewApiModel/companyApiModels/CompanyApiModel";
import GoogleApiModel from "../../../viewApiModel/googleApiModels/GoogleApiModel";
import HomeViewModel from "../../../viewModel/homeViewModels/HomeViewModel";
import ProductSkeletonCard from "../../components/ProductSkeletonCard";
import ViewMoreSkeleton from "../../components/ViewMoreSkeleton";
import StorageContext from "../../contexts/StorageContext";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "../../components/ProductCard";
import ViewMore from "../../components/ViewMore";
import { View, FlatList } from "react-native";
import React, { useContext } from "react";

const Recommend = ({
  recommendProductData,
  recommendCompanyServiceData,
  recommendCompanyData,

  recommedProductLoading,
  recommedServiceLoading,
  recommedCompanyLoading,

  googleDirectionData,
}) => {
  const {
    isInsertVisitHistoryCompanyLoading,
    setIsInsertVisitHistoryCompanyLoading,
    insertVisitHistoryCompanyError,
    handleInsertVisitHistoryCompany,
  } = CompanyApiModel.insertVisitHistoryCompany();

  const { currentLocation, setCurrentLocation, mId } =
    useContext(StorageContext);
  const { handleGetItemWidth } = HomeViewModel();

  const navigation = useNavigation();
  const starMarginTop = 80;
  const starMarginRight = 10;

  const recommedCards = [];

  if (recommendProductData) {
    recommedCards.push(
      <ProductCard
        key="product"
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
        title={recommendProductData?.name}
        price={recommendProductData?.price}
        distance={recommendProductData?.com?.distance}
        image={
          recommendProductData?.product_imgs?.length > 0
            ? recommendProductData?.product_imgs[0]?.imageUrl
            : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
        }
        starRating={recommendProductData?.starpoint}
        totalOrder={recommendProductData?.total_order}
        onPress={() => {
          navigation.navigate("ProductDetail", {
            productId: recommendProductData.pid,
          });
        }}
      />
    );
  }

  if (recommendCompanyServiceData) {
    recommedCards.push(
      <ProductCard
        key="companyService"
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
        title={recommendCompanyServiceData?.name}
        price={recommendCompanyServiceData?.price}
        distance={recommendCompanyServiceData?.com?.distance}
        image={
          recommendCompanyServiceData?.product_imgs?.length
            ? recommendCompanyServiceData?.product_imgs[0]?.imageUrl
            : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
        }
        starRating={recommendCompanyServiceData?.starpoint}
        totalOrder={recommendCompanyServiceData?.total_serv}
        onPress={() => {
          navigation.navigate("ProductDetail", {
            serviceId: recommendCompanyServiceData?.pid,
          });
        }}
      />
    );
  }

  if (recommendCompanyData) {
    recommedCards.push(
      <ProductCard
        key="company"
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
        title={recommendCompanyData?.name}
        highLightText={recommendCompanyData?.products[0]?.name}
        distance={recommendCompanyData?.distance}
        image={
          recommendCompanyData?.company_profile_img?.imageUrl
            ? recommendCompanyData?.company_profile_img?.imageUrl
            : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
        }
        starRating={recommendCompanyData?.starpoint}
        vacationTime={googleDirectionData?.legs[0]?.duration?.text ?? "?"}
        onPress={() => {
          handleInsertVisitHistoryCompany({
            comid: recommendCompanyData?.comid,
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
      {recommedCompanyLoading ||
      recommedProductLoading ||
      recommedServiceLoading ? (
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
      ) : recommendCompanyData ||
        recommendCompanyServiceData ||
        recommendProductData ? (
        <View style={{ marginTop: 30 }}>
          <ViewMore
            title={"ແນະນຳ"}
            onPress={() => {
              navigation.navigate("RecommdedTopTab");
            }}
          />
          <FlatList
            data={recommedCards}
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

export default Recommend;
