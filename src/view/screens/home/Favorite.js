import HomeViewModel from "../../../viewModel/homeViewModels/HomeViewModel";
import ProductSkeletonCard from "../../components/ProductSkeletonCard";
import ViewMoreSkeleton from "../../components/ViewMoreSkeleton";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "../../components/ProductCard";
import ViewMore from "../../components/ViewMore";
import { View, FlatList } from "react-native";
import React, { useEffect } from "react";

const Favorite = ({
  favoriteFirstData,
  favoriteSecondData,
  favoriteThirdData,
  favoriteLoading,
}) => {
  const { handleGetItemWidth, getItemLayout } = HomeViewModel();

  const navigation = useNavigation();
  const starMarginTop = 80;
  const starMarginRight = 10;

  const favoriteCards = [];

  if (favoriteFirstData) {
    favoriteCards.push(
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
        title={favoriteFirstData?.name}
        price={favoriteFirstData?.price}
        distance={favoriteFirstData?.com?.distance}
        image={
          favoriteFirstData?.product_imgs
            ? favoriteFirstData?.product_imgs[0]?.imageUrl
            : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
        }
        starRating={favoriteFirstData?.starpoint}
        totalOrder={favoriteFirstData?.total_order}
        onPress={() => {
          navigation.navigate(
            "ProductDetail",
            favoriteFirstData?.good
              ? {
                  productId: favoriteFirstData?.pid,
                }
              : {
                  serviceId: favoriteFirstData?.pid,
                }
          );
        }}
      />
    );
  }

  if (favoriteSecondData) {
    favoriteCards.push(
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
        title={favoriteSecondData?.name}
        price={favoriteSecondData?.price}
        distance={favoriteSecondData?.com?.distance}
        image={
          favoriteSecondData?.product_imgs
            ? favoriteSecondData?.product_imgs[0]?.imageUrl
            : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
        }
        starRating={favoriteSecondData?.starpoint}
        totalOrder={favoriteSecondData?.total_serv}
        onPress={() => {
          navigation.navigate(
            "ProductDetail",
            favoriteSecondData?.good
              ? {
                  productId: favoriteSecondData?.pid,
                }
              : {
                  serviceId: favoriteSecondData?.pid,
                }
          );
        }}
      />
    );
  }

  if (favoriteThirdData) {
    favoriteCards.push(
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
        title={favoriteThirdData?.name}
        price={favoriteThirdData?.price}
        distance={favoriteThirdData?.com?.distance}
        image={
          favoriteThirdData?.product_imgs
            ? favoriteThirdData?.product_imgs[0]?.imageUrl
            : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
        }
        starRating={favoriteThirdData?.starpoint}
        totalOrder={favoriteThirdData?.total_serv}
        onPress={() => {
          navigation.navigate(
            "ProductDetail",
            favoriteThirdData?.good
              ? {
                  productId: favoriteThirdData?.pid,
                }
              : {
                  serviceId: favoriteThirdData?.pid,
                }
          );
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
      {favoriteLoading ? (
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
      ) : favoriteFirstData || favoriteSecondData || favoriteThirdData ? (
        <View style={{ marginTop: 30 }}>
          <ViewMore
            title={"ທີ່ຖຶກໃຈ"}
            onPress={() => {
              navigation.navigate("FavoriteTopTab");
            }}
          />
          <FlatList
            data={favoriteCards}
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

export default Favorite;
