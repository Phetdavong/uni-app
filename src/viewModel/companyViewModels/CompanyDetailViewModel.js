import { Dimensions } from 'react-native'
import React, { useState } from 'react'

const CompanyDetailViewModel = () => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [operatingTimeStatus, setOperatingTimeStatus] = useState(null)
  const [todayClosedTime, setTodayClosedTime] = useState(null)
  const [todayOpenTime, setTodayOpenTime] = useState(null)

  const [isFollowed, setIsFollowed] = useState(false)
  const [isMoreOperatingTime, setIsMoreTodayOpenTime] = useState(false)
  const [isMoreDetail, setIsMoreDetail] = useState(false)
  const [currentDayIndex, setCurrentDayIndex] = useState(null)

  const imageWidth = Dimensions.get('window').width
  const imageHeight = 200

  return {
    isFollowed,
    setIsFollowed,
    isMoreOperatingTime,
    setIsMoreTodayOpenTime,
    isMoreDetail,
    setIsMoreDetail,
    operatingTimeStatus,
    setOperatingTimeStatus,
    todayOpenTime,
    setTodayOpenTime,
    currentImageIndex,
    setCurrentImageIndex,
    todayClosedTime,
    setTodayClosedTime,
    imageWidth,
    imageHeight,
    currentDayIndex,
    setCurrentDayIndex,
  }
}

export default CompanyDetailViewModel