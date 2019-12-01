export * from './settings.actions.js';
export * from './themes.actions.js';

//ALL ACTION CREATORS
//parameter passed in here can be anything (just placeholder)

//passing in first name (reduced)
export const firstName = (name) => {
    return {
        type: 'FIRST_NAME',
        payload: name
    };
};

//passing in last name (reduced)
export const lastName = (name) => {
    return {
        type: 'LAST_NAME',
        payload: name
    };
};

//passing in user name (reduced)
export const userName = (name) => {
    return {
        type: 'USER_NAME',
        payload: name
    };
};

//passing in password (reduced)
export const password = (password) => {
    return {
        type: 'PASSWORD',
        payload: password
    };
};

//passing in confirmation password (reduced)
export const confPassword = (confPassword) => {
    return {
        type: 'CONF_PASSWORD',
        payload: confPassword
    };
};

//passing in the first credit card number (reduced)
export const creditOne = (creditOne) => {
    return {
        type: 'CREDIT_ONE',
        payload: creditOne
    };
};

//passing in the second credit card number (reduced)
export const creditTwo = (creditTwo) => {
    return {
        type: 'CREDIT_TWO',
        payload: creditTwo
    };
};

//passing in the third credit card number (reduced)
export const creditThree = (creditThree) => {
    return {
        type: 'CREDIT_THREE',
        payload: creditThree
    };
};

//passing in the fourth credit card number (reduced)
export const creditFour = (creditFour) => {
    return {
        type: 'CREDIT_FOUR',
        payload: creditFour
    };
};

//passing in the fifth credit card number (reduced)
export const creditFive = (creditFive) => {
    return {
        type: 'CREDIT_FIVE',
        payload: creditFive
    };
};

//passing in the company name (reduced)
export const company = (company) => {
    return {
        type: 'COMPANY_NAME',
        payload: company
    };
};

//passing in the theater name (reduced)
export const theaterName = (theater) => {
    return {
        type: 'THEATER_NAME',
        payload: theater
    };
};

//passing in the street address number (reduced)
export const streetAddress = (addy) => {
    return {
        type: 'ADDRESS',
        payload: addy
    };
};

//passing in the name of the city (reduced)
export const city = (cityName) => {
    return {
        type: 'CITY_NAME',
        payload: cityName
    };
};

//passing in the name of the state (reduced)
export const state = (stateName) => {
    return {
        type: 'STATE_NAME',
        payload: stateName
    };
};

//passing in the name of the zipcode (reduced)
export const zip = (zipcode) => {
    return {
        type: 'ZIP',
        payload: zipcode
    };
};

//passing in the theater capacity (reduced)
export const capacity = (theaterCapacity) => {
    return {
        type: 'THEATER_CAP',
        payload: theaterCapacity
    };
};

//passing in the name of the manager (reduced)
export const managerName = (managerName) => {
    return {
        type: 'MANAGER_NAME',
        payload: managerName
    };
};

//passing in the name of the movie (reduced)
export const movieName = (name) => {
    return {
        type: 'MOVIE_NAME',
        payload: name
    };
};

//passing in the name of the movie (reduced)
export const movieDuration = (duration) => {
    return {
        type: 'MOVIE_DURATION',
        payload: duration
    };
}

//passing in the movie release date (reduced)
export const releaseDate = (date) => {
    return {
        type: 'RELEASE_DATE',
        payload: date
    };
}

//passing in the movie play date (reduced)
export const playDate = (date) => {
    return {
        type: 'PLAY_DATE',
        payload: date
    };
}

//RESET ALL OF STATE. NEEDS TO BE CALLED AT LOGIN TIME
export const resetState = () => {
    return {
        type: 'RESET_APP',
        payload: ""
    };
}

//actions for setting











