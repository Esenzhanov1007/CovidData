import { createStore } from 'redux';
import {rootReducer} from './reducers/root-reducer'
import { countriesReducer } from './reducers/countries-reducer'
import { loadState, saveState } from './local-storage'

export const configureStore = () => {
  const persistedState = loadState();

  const store = createStore(countriesReducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  store.subscribe(() => {
    saveState(store.getState())
  })
  
  return store;
}