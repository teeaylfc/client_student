import * as reduxModule from 'redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createReducer from './reducers';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = '@@redux/INIT';

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);
export const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['users', 'login', 'auth']
};

const persistedReducer = persistReducer(persistConfig, createReducer());


const store = createStore(persistedReducer, enhancer);

store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
    if (store.asyncReducers[key]) {
        return;
    }
    store.asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(store.asyncReducers));
    return store;
};

export default store;
