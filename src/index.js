import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { combineReducers, createStore } from 'redux';
import * as serviceWorker from './serviceWorker';
import configureStore from './configureStore';
import persistor from './configureStore';
import App from './App';
import { movieListReducer, userReducer } from './reducers/reducer';




// const store = configureStore();


const store = createStore(combineReducers({
    movieList: movieListReducer,
    userInfo: userReducer,
}))

ReactDOM.render(

    <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}

        <BrowserRouter>
            <App />
        </BrowserRouter>
        {/* </PersistGate> */}

    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
