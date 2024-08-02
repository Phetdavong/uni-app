import Skeleton from 'react-native-reanimated-skeleton'
import { View, Text } from 'react-native'
import React from 'react'

const ViewMoreSkeleton = () => {
  return (
    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 20 }}>
    <Skeleton
      layout={[
        {
          key: 'skeleton',
          width: 80,
          height: 15,
          borderRadius: 4,
          alignSelf: 'flex-start'
        },
      ]}
    />
    <Skeleton
      layout={[
        {
          key: 'skeleton',
          width: 80,
          height: 15,
          borderRadius: 4,
          alignSelf: 'flex-end'
        },
      ]}
    />
  </View>
  )
}

export default ViewMoreSkeleton