import StorageContext from '../contexts/StorageContext';
import React, {useEffect, useState} from 'react';

const StorageProvider = ({children}) => {

  const [currentLocation, setCurrentLocation] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [aaccessToken, setAccessToken] = useState(null);
  const [mId, setMId] = useState(5);

  return (
    <StorageContext.Provider
      value={{
        currentLocation,
        setCurrentLocation,
        refreshToken,
        setRefreshToken,
        aaccessToken,
        setAccessToken,
        mId,
        setMId,
      }}>
      {children}
    </StorageContext.Provider>
  );
};

export default StorageProvider;
