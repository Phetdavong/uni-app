import ProductImageListViewModel from "../../../viewModel/productViewModels/ProductImageListViewModel";
import {
  View,
  Text,
  Image,
  FlatList,
  Animated,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import ProductDetailsViewModel from "../../../viewModel/productViewModels/ProductDetailsViewModel";
import AbsoluteImagePage from "../../components/AbsoluteImagePage";
import * as OutLineIcon from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { themeColors, themeStyles } from "../../styles";
import React, { useEffect } from "react";

const ProductImageList = ({ route }) => {
  const paramsImageData = route.params.imageData;
  const paramsCurrentImageIndex = route.params.currentImageIndex;

  const {
    handleTumbnailChanged,
    tumbnailListRef,
    imageHeight,
    imageWidth,
    currentImageIndex,
    setLastItemIndex,
    setCurrentImageIndex,
    scrollViewRef,
  } = ProductImageListViewModel();

  const navigation = useNavigation();

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const marginHorizontal = 20;
  const itemWidth = (screenWidth - 4 * marginHorizontal) / 5;

  const { handleScrollEnd } = ProductDetailsViewModel();

  useEffect(() => {
    if (currentImageIndex !== null) {
      handleTumbnailChanged(currentImageIndex);
    }
  }, [currentImageIndex]);

  useEffect(() => {
    setTimeout(() => {
      if (paramsImageData?.length > 0) {
        setCurrentImageIndex(paramsCurrentImageIndex);
      }
    }, 100);
  }, [paramsImageData]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        className="absolute z-10 p-2"
        style={{
          top: 40,
          alignSelf: "flex-end",
        }}
      >
        <OutLineIcon.XMarkIcon
          size={30}
          color={"white"}
          style={{
            shadowColor: "#000000",
            elevation: 3,
            opacity: 5,
            shadowOffset: { width: 10, height: 10 },
          }}
        />
      </TouchableOpacity>

      <AbsoluteImagePage
        currentImageIndex={currentImageIndex}
        totalImage={paramsImageData?.length}
        top={40}
      />

      <View
        className="items-center justify-center"
        style={{ paddingVertical: 100 }}
      >
        <FlatList
          horizontal
          pagingEnabled
          ref={scrollViewRef}
          data={paramsImageData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image
              source={{
                uri: item?.imageUrl,
              }}
              style={{ width: imageWidth, height: screenHeight * 0.8 }}
              resizeMode="cover"
            />
          )}
          onMomentumScrollEnd={(event) =>
            handleScrollEnd(event, setCurrentImageIndex)
          }
          contentContainerStyle={{
            flexGrow: 1,
            alignSelf: "center",
            height: screenHeight * 0.8,
          }}
        />

        <FlatList
          data={paramsImageData}
          ref={tumbnailListRef}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setCurrentImageIndex(index);
              }}
            >
              <Image
                source={{
                  uri: item?.imageUrl,
                }}
                style={{
                  width: itemWidth,
                  height: itemWidth,
                  borderRadius: 2,
                  marginLeft: index === 0 ? 0 : 10,
                  borderWidth: 1,
                  borderColor:
                    index === currentImageIndex
                      ? themeColors.primaryColor
                      : "white",
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductImageList;
