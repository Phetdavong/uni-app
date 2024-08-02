import React, {useState, createContext, useContext} from 'react';

const StorageContext = createContext();
export const useStorageContext = () => useContext(StorageContext);
export default StorageContext;
