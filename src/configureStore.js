


import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { movieListReducer, userReducer } from './reducers/reducer';


const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    movieList: movieListReducer,
    userInfo: userReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)


export default () => {
    const store = createStore(persistedReducer, devToolsEnhancer())
    const persistor = persistStore(store)
    return { store, persistor }
}
