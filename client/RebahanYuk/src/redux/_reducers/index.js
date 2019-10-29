import {combineReducers} from 'redux';
import reducersRooms from './rooms';
import reducersCustomers from './customers';

export const AppReducers = combineReducers({
  rooms: reducersRooms,
  customers: reducersCustomers,
});
