import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './features/auth'
import { useDispatch, useSelector } from 'react-redux';
import { userReducer } from './features/user';

export const makeStore = () => {

  return configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer
    },
  })
};

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
