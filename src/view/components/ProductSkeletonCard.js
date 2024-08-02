import Skeleton from 'react-native-reanimated-skeleton'
import { View, Text } from 'react-native'
import React from 'react'

const ProductSkeletonCard = ({ cardWidth }) => {
    return (
        <View>
            <Skeleton
                layout={[
                    {
                        key: 'skeleton',
                        width: cardWidth,
                        height: cardWidth,
                        borderRadius: 10,
                    },
                ]}
            />
            <Skeleton
                layout={[
                    {
                        key: 'skeleton',
                        width: cardWidth,
                        height: 15,
                        borderRadius: 4,
                        marginTop: 10

                    },
                ]}
            />
            <Skeleton
                layout={[
                    {
                        key: 'skeleton',
                        width: cardWidth,
                        height: 15,
                        borderRadius: 4,
                        marginTop: 10

                    },
                ]}
            />
            <Skeleton
                layout={[
                    {
                        key: 'skeleton',
                        width: cardWidth,
                        height: 15,
                        borderRadius: 4,
                        marginTop: 10

                    },
                ]}
            />
        </View>
    )
}

export default ProductSkeletonCard