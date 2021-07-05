import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from 'Redux/reducers';
const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
});
const store = configureStore({
    reducer: rootReducer,
    middleware: customizedMiddleware
});

export default store;
