import { View, Text, Dimensions } from 'react-native'
import React, { useState } from 'react'

const ProductDetailsViewModel = () => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [operatingTimeStatus, setOperatingTimeStatus] = useState(null)
    const [writeTime, setWriteTime] = useState(null)
    const [todayClosedTime, setTodayClosedTime] = useState(null)
    const [destination, setDestination] = useState(null);
    const [directionTime, setDirectionTime] = useState(null)
    const [isFavorite, setIsFavorite] = useState(false)
    const [totalFavorite, setTotalFavorite] = useState(null)

    const imageWidth = Dimensions.get('window').width
    const imageHeight = Dimensions.get('window').width

    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();

    const errorImages = [
        'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg',
        'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg',
        'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg',
        'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg',
        'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg',
    ];

    const handleScrollEnd = (event, setCurrentImageIndex) => {
        const contentOffset = event.nativeEvent.contentOffset;
        const currentIndex = Math.round(contentOffset.x / imageWidth);
        setCurrentImageIndex(currentIndex);
    };

    const getTodayClosedTime = (operatingTimes) => {
        const operatingDay = operatingTimes?.find(item => item?.did_day?.did === currentDayIndex);
        return operatingDay?.close
    }

    const getTodayOpenTime = (operatingTimes) => {
        const operatingDay = operatingTimes?.find(item => item?.did_day?.did === currentDayIndex);
        return operatingDay?.open
    }



    const isOpenOrClosed = (operatingTimes) => {
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();
        const currentTime = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;
        const operatingDay = operatingTimes?.find(item => item?.did_day?.did === currentDayIndex);

        if (operatingDay) {
            const { open, close, break_start, break_end } = operatingDay;
            const isOpen = currentTime >= open && currentTime < close;
            const isInBreak = currentTime >= break_start && currentTime < break_end;

            if (isOpen) {
                if (isInBreak) {
                    return 'closed';
                } else {
                    return 'open';
                }
            }
        }
        return 'closed';
    }

    const calculateTimeAgo = (writeDate) => {
        const writeDateObject = new Date(writeDate);
        const now = new Date();
        const diffInMilliseconds = now - writeDateObject;
        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInDays > 0) {
            return `${diffInDays} ມື້`;
        } else if (diffInHours > 0) {
            return `${diffInHours} ຊົ່ວໂມງ`;
        } else if (diffInMinutes > 0) {
            return `${diffInMinutes} ນາທີ`;
        } else {
            return `${diffInSeconds} ວິນາທີ`;
        }
    };



    return {
        directionTime,
        setDirectionTime,
        destination,
        setDestination,
        todayClosedTime,
        setTodayClosedTime,
        writeTime,
        setWriteTime,
        calculateTimeAgo,
        operatingTimeStatus,
        setOperatingTimeStatus,
        isOpenOrClosed,
        imageWidth,
        imageHeight,
        errorImages,
        handleScrollEnd,
        currentImageIndex,
        setCurrentImageIndex,
        getTodayClosedTime,
        getTodayOpenTime,
        currentDate,
        currentDayIndex,
        isFavorite,
        setIsFavorite,
        totalFavorite,
        setTotalFavorite,
    }
}

export default ProductDetailsViewModel