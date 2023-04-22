import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import accountReducer from './accountSlice/accountSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        account: accountReducer
    },
});