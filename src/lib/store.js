import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './features/auth'
import { useDispatch, useSelector } from 'react-redux';
import { userReducer } from './features/user';
import { useEffect } from 'react';

export const makeStore = (data) => {
  useEffect(() => {
    console.log(data)
  },[])
  return configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer
    },
  })
};

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
