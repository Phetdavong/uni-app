import { View, Text, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'

const ProductImageListViewModel = () => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const scrollViewRef = useRef(null);
    const tumbnailListRef = useRef(null);

    const dimensions = Dimensions.get('window');
    const imageHeight = dimensions.height / 2;
    const imageWidth = dimensions.width;

    const handleTumbnailChanged = (index) => {
        scrollViewRef.current.scrollToIndex({
            index: index,
            animated: true,
        });
    }

    return {
        handleTumbnailChanged,
        tumbnailListRef,
        imageHeight,
        imageWidth,
        currentImageIndex,
        setCurrentImageIndex,
        scrollViewRef,
    }
}

export default ProductImageListViewModel