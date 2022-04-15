import {
    configureStore,
    combineReducers,
    getDefaultMiddleware,
    compose
} from "@reduxjs/toolkit";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import thunk from 'redux-thunk'
import storage from "redux-persist/lib/storage";

import brands from "./../store/reducers/brands";

import auth from "./../store/reducers/AuthReducer/auth";
import {applyMiddleware} from "redux";

const persistConfig = {
    key: "root",
    storage,
};
const reducers=combineReducers({
    brands:brands,
    auth:auth,
})
const persistedReducer = persistReducer(persistConfig, reducers);
const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    },
    composeEnhancers(applyMiddleware(thunk))),
});

export default store;
