import { createStore, combineReducers } from 'redux';
import customerProductReducer from './reducers/customerProductReducer';

const reducers = combineReducers({
  customerProductReducer,
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
