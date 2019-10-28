import {combineReducers} from 'redux';
import reducersRooms from './rooms';

export const AppReducers = combineReducers({
  rooms: reducersRooms,
});
