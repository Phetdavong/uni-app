import EventService from "../../service/eventServices/EventService";
import React, { useState } from "react";

export default {
    getCurrentEventList() {
        const [currentEventListData, setCurrentEventListData] = useState(null)
        const [isCurrentEventListLoading, setIsCurrentEventListLoading] = useState(true)
        const [currentEventListError, setCurrentEventListError] = useState(null)
        const [currentEventListCount, setCurrentEventListCount] = useState(null)


        const handleGeCurrentEventList = async ({ start, limit, currentDate }) => {
            setIsCurrentEventListLoading(true)
            await EventService.loadedCurrentEventService({ start: start, limit: limit, currentDate: currentDate }).then(response => {
                if (response) {

                    const currentEventData = start === 0 ? response?.data?.events : [...currentEventListData, ...response?.data?.events]
                    const currentEventCount = response?.data?.count
                    setCurrentEventListCount(currentEventCount)
                    setCurrentEventListData(currentEventData)
                    setIsCurrentEventListLoading(false)
                    console.log('Loaded Current Event Successfully...')
                }
            }).catch(error => {
                setCurrentEventListError(error)
                setIsCurrentEventListLoading(false)
                console.log('Loaded Current Event Failed...', error)
            })
        }
        return {
            currentEventListCount,
            setCurrentEventListCount,
            currentEventListData,
            isCurrentEventListLoading,
            setIsCurrentEventListLoading,
            currentEventListError,
            handleGeCurrentEventList
        }
    },
    getFinishEventList() {
        const [finishedEventListData, setFinishEventListData] = useState(null)
        const [isFinishEventListLoading, setIsFinishEventListLoading] = useState(true)
        const [finishedEventListError, setFinishEventListError] = useState(null)
        const [finishedEventListCount, setFinishEventListCount] = useState(null)

        const handleGeFinishEventList = async ({ start, limit, currentDate }) => {
            setIsFinishEventListLoading(true)
            await EventService.loadedFinishedEventService({ start: start, limit: limit, currentDate: currentDate }).then(response => {
                if (response) {

                    const finishedEventData = start === 0 ? response?.data?.events : [finishedEventListData, ...response?.data?.events]
                    setFinishEventListData(finishedEventData)
                    setIsFinishEventListLoading(false)
                    console.log('Loaded Finished Event Successfully...')
                }
            }).catch(error => {
                setFinishEventListError(error)
                setIsFinishEventListLoading(false)
                console.log('Loaded Finished Event Failed...', error)
            })
        }
        return {
            finishedEventListCount,
            setFinishEventListCount,
            finishedEventListData,
            isFinishEventListLoading,
            setIsFinishEventListLoading,
            finishedEventListError,
            handleGeFinishEventList
        }
    },
    getEventDetail() {
        const [eventDetailData, setEventDetailData] = useState(null)
        const [isEventDetailLoading, setIsEventDetailLoading] = useState(true)
        const [eventDetailError, setEventDetailError] = useState(null)

        const handleGeEventDetail = async ({ evid }) => {
            setIsEventDetailLoading(true)
            await EventService.loadedEventDetailService({ evid: evid }).then(response => {
                if (response) {

                    const eventDetail = response?.data?.event
                    setEventDetailData(eventDetail)
                    setIsEventDetailLoading(false)
                    console.log('Loaded Event Detail Successfully...', eventDetail)
                }
            }).catch(error => {
                setEventDetailError(error)
                setIsEventDetailLoading(false)
                console.log('Loaded Event Detail Failed...', error)
            })
        }
        return {
            eventDetailData,
            isEventDetailLoading,
            setIsEventDetailLoading,
            eventDetailError,
            handleGeEventDetail
        }
    }
}
