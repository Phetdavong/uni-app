import React, { useState, useRef, useEffect } from 'react';
import Skeleton from "react-native-reanimated-skeleton";
import { themeColors } from '../../styles';
import {
  View,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const BannerSlider = ({ bannerData, bannerLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const windowWidth = Dimensions.get('window').width;
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        currentIndex === bannerData?.length - 1 ? 0 : currentIndex + 1;

      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: nextIndex,
      });

      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, bannerData?.length]);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => Linking.openURL(item.link)}
      style={{
        width: windowWidth,
        height: 150,
        marginTop: 20,
      }}>
      <Image
        source={{ uri: item?.banner_imgs?.length > 0 ? item?.banner_imgs[0]?.imageUrl : 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg' }}
        style={{
          borderRadius: 10,
          alignSelf: 'center',
          height: '90%',
          width: '90%',
        }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  return (
    <View>
      {bannerLoading ? (
        <Skeleton
          layout={[
            {
              key: 'skeleton',
              width: windowWidth * 0.9,
              height: 135,
              borderRadius: 10,
              marginTop: 20,
              alignSelf: 'center',
            },
          ]}
        />
      ) :
        bannerData?.length > 0 ? (
          <View>
            <FlatList
              ref={flatListRef}
              data={bannerData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={event => {
                const slideSize = event?.nativeEvent?.layoutMeasurement?.width;
                const index = event?.nativeEvent?.contentOffset?.x / slideSize;
                setCurrentIndex(Math.floor(index));
              }}
              getItemLayout={(data, index) => (
                { length: windowWidth, offset: windowWidth * index, index }
              )}
              onScrollToIndexFailed={(info) => {
                const wait = new Promise(resolve => setTimeout(resolve, 500));
                wait.then(() => {
                  flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
                });
              }}
            />
            <View style={styles.dotsContainer}>
              {bannerData?.map((_, index) => (
                <View
                  key={index}
                  style={[styles.dot, currentIndex === index && styles.activeDot]}
                />
              ))}
            </View>
          </View>
        ) : null
      }

    </View>
  );
};

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: themeColors.primaryColor,
  },
});

export default BannerSlider;
