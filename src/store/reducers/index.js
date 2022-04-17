import { combineReducers } from 'redux';
import { streamReducer } from './stream.reducer';
import { roomsReducer } from './rooms.reducer';

export default combineReducers({
  stream: streamReducer,
  rooms: roomsReducer
});
