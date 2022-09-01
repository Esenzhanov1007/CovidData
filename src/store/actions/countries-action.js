export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_CURRENT_COUNTRY = 'GET_CURRENT_COUNTRY';
export const GET_DATE = "GET_DATE";
export const GET_TOP_CONFIRMED = "GET_TOP_CONFIRMED"

export const getCountries = (data) => ({
    type: GET_COUNTRIES,
    payload: data,
})

export const getCurrentCountry = (data) => ({
    type: GET_CURRENT_COUNTRY,
    payload: data,
})

export const getTopConfirmed = (data) => ({
    type: GET_TOP_CONFIRMED,
    payload: data,
})