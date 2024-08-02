import { View, Text, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import HomeViewModel from '../../../viewModel/homeViewModels/HomeViewModel';
import Skeleton from "react-native-reanimated-skeleton";
import { themeStyles, themeColors } from '../../styles';
import React from 'react';

const CategoryList = ({ categoryData, categoryCount, setCategoryEnd, setCategoryStart, categoryLoading }) => {

  const { handleGetItemWidth, handleLoadMore } = HomeViewModel()

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      className="items-center justify-start space-y-2"
      style={{
        marginRight: 15,
        marginTop: 20,
      }}>
      <Image
        source={{ uri: item?.tag_img?.imageUrl }}
        style={{
          height: handleGetItemWidth({ itemLength: 4.5, totalMargin: 5, marginHorizontal: 20 }),
          width: handleGetItemWidth({ itemLength: 4.5, totalMargin: 5, marginHorizontal: 20 })
        }} />
      <Text
        style={[
          themeStyles.textStyle,
          {
            color: themeColors.subtitleTextColor,
            textAlign: 'center',
            width: handleGetItemWidth({ itemLength: 5, totalMargin: 5, marginHorizontal: 20 })
          },
        ]}>
        {item?.name_la}
      </Text>
    </TouchableOpacity>
  );


  const renderCateItemSkeleton = (index) => (
    <View
      key={index}
      style={{
        marginRight: index === categoryData?.length ? 0 : 15,
        marginTop: 20,
      }}>
      <Skeleton
        layout={[
          {
            key: 'skeleton',
            width: handleGetItemWidth({ itemLength: 5, totalMargin: 5, marginHorizontal: 20 }),
            height: handleGetItemWidth({ itemLength: 5, totalMargin: 5, marginHorizontal: 20 }),
            borderRadius: 10,
          },
        ]}
      />
      <Skeleton
        layout={[
          {
            key: 'skeleton',
            width: handleGetItemWidth({ itemLength: 5, totalMargin: 5, marginHorizontal: 20 }),
            height: 20,
            borderRadius: 4,
            marginTop: 10

          },
        ]}
      />
    </View>
  );


  return (
    <View style={{ marginHorizontal: 20 }}>
      {categoryLoading ? (
        <FlatList
          data={[...Array(5).keys()]}
          keyExtractor={(item, index) => `${index}_cateId`}
          renderItem={({ index }) => renderCateItemSkeleton(index)}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      ) :
        categoryData?.length > 0 ?
          <FlatList
            data={categoryData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            onEndReachedThreshold={0.5}
            horizontal
            scrollEnabled={true}
            snapToInterval={handleGetItemWidth({ itemLength: 5, totalMargin: 5, marginHorizontal: 20 })}
            snapToAlignment={'start'}
            showsHorizontalScrollIndicator={false}
            onEndReached={() =>
              handleLoadMore({
                leastAmount: 6,
                loadMoreAmount: 6,
                dataLength: categoryData?.length,
                dataCount: categoryCount,
                setDisplayEnd: setCategoryEnd,
                setDisplayStart: setCategoryStart,
              })
            }
          /> : null
      }
    </View>
  );
};

export default CategoryList;
