import {GET_COUNTRIES, GET_CURRENT_COUNTRY, GET_DATE, GET_TOP_CONFIRMED} from '../actions/countries-action';

const initState = {
  countries: [],
  currentCountry: [],
  topConfirmed: {
    cases: 0,
    date: '',
  },
}

export const countriesReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {...state, countries: action.payload}
    case GET_CURRENT_COUNTRY: 
      return {...state, currentCountry: action.payload}
    case GET_TOP_CONFIRMED:
      return {...state, topConfirmed: action.payload}
    default:
      return state; 
  }
}