import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers/reducers';
import middlewares from './middlewares/middlewares'

import { updateTheme } from './middlewares/themes.middleware.js';

import { persistedState, saveState } from './persisted.store.js';

export default function configureStore() {

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducers, /* persistedState, */ composeEnhancers(
        applyMiddleware(...middlewares)
    ));

    // add a listener that will be invoked on any state change
    store.subscribe(() => {
        saveState(store.getState());
    });

    // Update the initial theme
    updateTheme(store.getState())

    return store;

}