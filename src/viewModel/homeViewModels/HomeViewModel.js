import { PermissionsAndroid, Platform, Dimensions } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import React, { useState } from 'react'

const HomeViewModel = () => {

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const formattedCurrentDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

  const [eventListStart, setEventListStart] = useState(0);
  const [eventListEnd, setEventListEnd] = useState(3);

  const [proCateListStart, setProCateListStart] = useState(0);
  const [proCateListEnd, setProCateListEnd] = useState(5);

  const [servCateListStart, setServCateListStart] = useState(0);
  const [servCateListEnd, setServCateListEnd] = useState(5);

  const [visitHisStart, setVisitHisStart] = useState(0);
  const [visitHisEnd, setVisitHisEnd] = useState(6);

  const [isAdvBobUp, setIsAdvBobup] = useState(true);

  const [directionTime, setDirectionTime] = useState(null)
  const [destination, setDestination] = useState(null);


  const getCurrentLocation = setCurrentLocation => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      error => {
        console.log(error);

        setCurrentLocation({
          latitude: 17.97113925159666,
          longitude: 102.61910860806323,
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  const handleGetItemWidth = ({ itemLength, totalMargin, marginHorizontal }) => {
    const screenWidth = Dimensions.get('window').width;
    const itemWidth = (screenWidth - totalMargin * marginHorizontal) / itemLength;
    return itemWidth
  }

  const requestLocationPermission = setCurrentLocation => {
    // getCurrentLocation(setCurrentLocation);

    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation(setCurrentLocation);
          } else {
            console.log('Location permission denied...');
            setCurrentLocation({
              latitude: 17.97113925159666,
              longitude: 102.61910860806323,
            });
          }
        })
        .catch(error => {
          console.log(error);
          console.log('Location permission error...');
          setCurrentLocation({
            latitude: 17.97113925159666,
            longitude: 102.61910860806323,
          });
        });
    } else {
      getCurrentLocation(setCurrentLocation);
    }
  };

  const handleLoadMore = (
    { leastAmount,
      loadMoreAmount,
      dataLength,
      dataCount,
      setDisplayEnd,
      setDisplayStart }
  ) => {
    if (dataLength >= leastAmount && dataLength < dataCount) {
      setDisplayStart(prev => prev + loadMoreAmount);
      setDisplayEnd(prev => prev + loadMoreAmount);
    }
    console.log('Load more active...', dataLength, '===>', dataCount);
  };


  const getItemLayout = (index, itemWidth) => (
    { length: itemWidth, offset: itemWidth * index, index }
);

  return {
    getItemLayout,
    visitHisStart,
    setVisitHisStart,
    visitHisEnd,
    setVisitHisEnd,
    directionTime,
    setDirectionTime,
    destination,
    setDestination,
    proCateListStart,
    setProCateListStart,
    proCateListEnd,
    setProCateListEnd,
    servCateListStart,
    setServCateListStart,
    servCateListEnd,
    setServCateListEnd,
    isAdvBobUp,
    setIsAdvBobup,
    handleGetItemWidth,
    eventListStart,
    setEventListStart,
    eventListEnd,
    setEventListEnd,
    handleLoadMore,
    requestLocationPermission,
    getCurrentLocation,
    formattedCurrentDate
  }
}

export default HomeViewModel