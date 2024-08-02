import PolicyService from "../../service/policyServices/PolicyService"
import React, {useState} from "react"

export default {
    getAppUsagePolicy(){
        const [appUsagePolicyData, setAppUsagePolicyData] = useState(null)
        const [isAppUsagePolicyLoading, setIsAppUsagePolicyLoading] = useState(true)
        const [appUsagePolicyError, setAppUsagePolicyError] = useState(null)

        const handleGetAppUsagePolicy = async ({ pcid }) => {
            setIsAppUsagePolicyLoading(true)
            await PolicyService.loadedAppUsagePolicyService({ pcid: pcid }).then(response =>{
                if(response){

                const apiAppUsagePolicyData = response?.data[0]
                
                setAppUsagePolicyData(apiAppUsagePolicyData)
                setIsAppUsagePolicyLoading(false)
                console.log('Loaded App Usage Policy Successfully...')
                }
            }).catch(error =>{
                setAppUsagePolicyError(error)
                setIsAppUsagePolicyLoading(false)
                console.log('Loaded App Usage Policy Failed...', error)
            })
        }
        return {
            appUsagePolicyData,
            isAppUsagePolicyLoading,
            setIsAppUsagePolicyLoading,
            appUsagePolicyError,
            handleGetAppUsagePolicy
        }
    },

    getAppUsagePolicy(){
        const [appUsagePolicyData, setAppUsagePolicyData] = useState(null)
        const [isAppUsagePolicyLoading, setIsAppUsagePolicyLoading] = useState(true)
        const [appUsagePolicyError, setAppUsagePolicyError] = useState(null)

        const handleGetAppUsagePolicy = async ({ pcid }) => {
            setIsAppUsagePolicyLoading(true)
            await PolicyService.loadedAppUsagePolicyService({ pcid: pcid }).then(response =>{
                if(response){

                const apiAppUsagePolicyData = response?.data[0]
                
                setAppUsagePolicyData(apiAppUsagePolicyData)
                setIsAppUsagePolicyLoading(false)
                console.log('Loaded App Usage Policy Successfully...')
                }
            }).catch(error =>{
                setAppUsagePolicyError(error)
                setIsAppUsagePolicyLoading(false)
                console.log('Loaded App Usage Policy Failed...', error)
            })
        }
        return {
            appUsagePolicyData,
            isAppUsagePolicyLoading,
            setIsAppUsagePolicyLoading,
            appUsagePolicyError,
            handleGetAppUsagePolicy
        }
    }
}