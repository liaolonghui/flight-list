import { createStore } from 'redux';
import { sortord } from './reducers';

const store = createStore(sortord); // redux-thunk

export default store;