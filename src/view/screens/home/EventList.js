import { View, Text, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import HomeViewModel from '../../../viewModel/homeViewModels/HomeViewModel';
import ViewMoreSkeleton from '../../components/ViewMoreSkeleton';
import { useNavigation } from '@react-navigation/native';
import Skeleton from "react-native-reanimated-skeleton";
import { themeColors, themeStyles } from '../../styles';
import EventCard from '../../components/EventCard';
import ViewMore from '../../components/ViewMore';
import React, { useEffect } from 'react';

const EventList = ({
  eventData,
  eventCount,
  eventListStart,
  setEventListStart,
  eventListEnd,
  setEventListEnd,
  eventLoading
}) => {

  const navigation = useNavigation()

  const { handleLoadMore, handleGetItemWidth } = HomeViewModel()

  const renderEventItemSkeleton = (index) => (
    <View
      key={index}
      style={{
        marginTop: 20,
        marginRight: 20,
        marginLeft: index === 0 ? 20 : 0
      }}>
      <Skeleton
        layout={[
          {
            key: 'skeleton',
            width: handleGetItemWidth({ itemLength: 1, totalMargin: 3, marginHorizontal: 20 }),
            height: 150,
            borderRadius: 10,
            alignSelf: 'flex-start'
          },
        ]}
      />
      <Skeleton
        layout={[
          {
            key: 'skeleton',
            width: 270,
            height: 20,
            borderRadius: 4,
            marginTop: 10,
            alignSelf: 'flex-start'

          },
        ]}
      />
      <Skeleton
        layout={[
          {
            key: 'skeleton',
            width: 150,
            height: 20,
            borderRadius: 4,
            marginTop: 10,
            alignSelf: 'flex-start'

          },
        ]}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
        <Skeleton
          layout={[
            {
              key: 'skeleton',
              width: 150,
              height: 20,
              borderRadius: 4,
              marginTop: 10,
              alignSelf: 'flex-start'

            },
          ]}
        />
        <Skeleton
          layout={[
            {
              key: 'skeleton',
              width: 80,
              height: 20,
              borderRadius: 4,
              marginTop: 10,
              alignSelf: 'flex-end'

            },
          ]}
        />
      </View>
    </View>
  );

  return (
    <View>
      {
        eventLoading && eventListStart === 0 ?
          <View style={{ marginTop: 30 }}>
            <ViewMoreSkeleton />
            <FlatList
              data={[...Array(2).keys()]}
              keyExtractor={(item, index) => `${index}_cateId`}
              renderItem={({ index }) => renderEventItemSkeleton(index)}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          :
          eventData?.length > 0 ?
            <View style={{ marginTop: 30 }}>
              <ViewMore title={'ອີເວັ້ນມາໃໝ່'} onPress={() => { navigation.navigate('EventTopTab') }} />
              <FlatList
                data={eventData}
                renderItem={({ item, index }) => (
                  <EventCard
                    item={item}
                    image={item?.event_imgs[0]?.imageUrl}
                    title={item?.name}
                    endDate={item?.enddate}
                    startDate={item?.startdate}
                    status={item?.delete_yn === 'Y' ? 'ກຳລັງດຳເນີນການ' : 'ທີ່ສິ້ນສຸດແລ້ວ'}
                    marginRight={20}
                    marginLeft={index === 0 ? 20 : 0}
                    width={handleGetItemWidth({ itemLength: 1, totalMargin: eventData?.length + 1, marginHorizontal: 20 })}
                    onPress={() => { navigation.navigate('EventTopTab', { eventId: item?.evid }) }} />
                )}
                onEndReached={() =>
                  handleLoadMore(
                    {
                      leastAmount: 3,
                      loadMoreAmount: 3,
                      dataLength: eventData?.length,
                      dataCount: eventCount,
                      setDisplayEnd: setEventListEnd,
                      setDisplayStart: setEventListStart
                    }
                  )
                }
                snapToInterval={handleGetItemWidth({ itemLength: 3, totalMargin: 4, marginHorizontal: 20 })}
                snapToAlignment={'start'}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}

              />
            </View>
            : console.log('No any Current Event...')
      }
    </View>


  );
};

export default EventList;
