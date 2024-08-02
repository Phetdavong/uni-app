import { Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'

const FinishedEventViewModel = () => {

    const [finishedEventStart, setFinishedEventStart] = useState(0);
    const [finishedEventEnd, setFinishedEventEnd] = useState(3);

    const navigation = useNavigation()
    const screenWidth = Dimensions.get('window').width;
    const marginHorizontal = 20;
    const itemWidth = (screenWidth - 4 * marginHorizontal) / 1;

    return {
        finishedEventStart,
        setFinishedEventStart,
        finishedEventEnd,
        setFinishedEventEnd,
        navigation,
        screenWidth,
        marginHorizontal,
        itemWidth,
    }
}

export default FinishedEventViewModel