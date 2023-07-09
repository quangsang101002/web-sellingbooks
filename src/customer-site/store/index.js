import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import customerAuthReducer from './reducers/customerAuthReducer';
import customerProductReducer from './reducers/customerProductReducer';

const reducer = combineReducers({
  customerAuthReducer: customerAuthReducer,
  customerProductReducer: customerProductReducer,
});

const store = configureStore({
  reducer: reducer,
});

export default store;
