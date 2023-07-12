import { createStore, combineReducers } from 'redux';
import customerProductReducer from './reducers/customerProductReducer';
import customerAuthReducer from './reducers/customerAuthReducer';

const reducers = combineReducers({
  customerProductReducer,
  customerAuthReducer,
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
