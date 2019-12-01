import { combineReducers } from 'redux';

import settingsReducer from './settings.reducer.js';
import themesReducer from './themes.reducers.js';

const defaultNames = {
    firstName: "",
    lastName: "",
    userName: "",
    companyName: "",
    theaterName: "",
    managerUserName: "",
    movieName: "",
    theaterCap: 0,
}

const defaultPasswords = {
    password:"",
    confPassword:""
}

const creditNumbers = {
    creditOne:"",
    creditTwo:"",
    creditThree:"",
    creditFour:"",
    creditFive:""
}

const addresses = {
    streetAddress:"",
    cityName:"",
    stateName:"Alabama",
    zipCode:0
}

const dates = {
    releaseDate: new Date(),
    playDate: new Date(),
    movieDuration: 0
}

//This reducer will handle all names like first name, last name, username etc. & theater capacity
const namesReducer = (state=defaultNames, action) => {
    switch (action.type) {
        case 'RESET_APP':
            return defaultNames;
        case 'FIRST_NAME':
            return Object.assign({}, state, {
                firstName: action.payload
            });
        case 'LAST_NAME':
            return Object.assign({}, state, {
                lastName: action.payload
            });
        case 'USER_NAME':
            return Object.assign({}, state, {
                userName: action.payload
            });
        case 'COMPANY_NAME':
            return Object.assign({}, state, {
                companyName: action.payload
            });
        case 'THEATER_NAME':
            return Object.assign({}, state, {
                theaterName: action.payload
            });
        case 'MANAGER_NAME':
            return Object.assign({}, state, {
                managerUserName: action.payload
            });
        case 'MOVIE_NAME':
            return Object.assign({}, state, {
                movieName: action.payload
            });
        case 'THEATER_CAP':
            return Object.assign({}, state, {
                theaterCap: action.payload
            });
        default:
            return state
    }
}

//This reducer will handle the passwords
const passwordReducer = (state=defaultPasswords, action) => {
    switch (action.type) {
        case 'RESET_APP':
            return defaultPasswords;
        case 'PASSWORD':
            return Object.assign({}, state, {
                password: action.payload
            });
        case 'CONF_PASSWORD':
            return Object.assign({}, state, {
                confPassword: action.payload
            });
        default:
            return state
    }
}

//This reducer will handle all the credit cards
const creditReducer = (state=creditNumbers, action) => {
    switch (action.type) {
        case 'RESET_APP':
            return creditNumbers;
        case 'CREDIT_ONE':
            return Object.assign({}, state, {
                creditOne: action.payload
            });
        case 'CREDIT_TWO':
            return Object.assign({}, state, {
                creditTwo: action.payload
            });
        case 'CREDIT_THREE':
            return Object.assign({}, state, {
                creditThree: action.payload
            });
        case 'CREDIT_FOUR':
            return Object.assign({}, state, {
                creditFour: action.payload
            });
        case 'CREDIT_FIVE':
            return Object.assign({}, state, {
                creditFive: action.payload
            });
        default:
            return state
    }
}

//This reducer will handle all the times
const addressReducer = (state=addresses, action) => {
    switch (action.type) {
        case 'RESET_APP':
            return addresses;
        case 'ADDRESS':
            return Object.assign({}, state, {
                streetAddress: action.payload
            });
        case 'CITY_NAME':
            return Object.assign({}, state, {
                cityName: action.payload
            });
        case 'STATE_NAME':
            return Object.assign({}, state, {
                stateName: action.payload
            });
        case 'ZIP':
            return Object.assign({}, state, {
                zipCode: action.payload
            });
        default:
            return state
    }
}

//This reducer will handle all the times
const datesReducer = (state=dates, action) => {
    switch (action.type) {
        case 'RESET_APP':
            return dates;
        case 'MOVIE_DURATION':
            return Object.assign({}, state, {
                movieDuration: action.payload
            });
        case 'RELEASE_DATE':
            return Object.assign({}, state, {
                releaseDate: action.payload
            });
        case 'PLAY_DATE':
            return Object.assign({}, state, {
                playDate: action.payload
            });
        default:
            return state
    }
}

export default combineReducers({
    //boilerplate stuff
    settings: settingsReducer,
    theme: themesReducer,
    //non boiler plate stuff
    names: namesReducer,
    passwords: passwordReducer,
    creditCards: creditReducer,
    addresses: addressReducer,
    dates: datesReducer,
});
