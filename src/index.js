import 'core-js/es/string';
import 'core-js/es/array';
import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/es/object';
import 'core-js/es/promise';
import 'core-js/es/object';
import 'core-js/es/array';
import 'raf/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

//import reducers from './store/reducers/index.js';
//import {createStore} from 'redux';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

import App from './App';

import './i18n';

import configureStore from './store/store';
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
