import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Reducer/userReducer';
import productReducer from './Reducer/productReducer';
import loadingReducer from './Reducer/loadingReducer';

export const store = configureStore({
    reducer: {
        userReducer: userReducer,
        productReducer: productReducer,
        loadingReducer: loadingReducer,
    }
})