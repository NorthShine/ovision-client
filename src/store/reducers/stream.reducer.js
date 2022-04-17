import {
  CANCEL_WEBSOCKET,
  SET_CURRENT_ROOM_ID,
  SET_STREAM_RUNNING,
  SET_STREAM_SOURCE
} from '../actionTypes';

const initialStreamState = {
  source: undefined,
  roomId: undefined,
  isRunning: false
};

export const streamReducer = (state = initialStreamState, action) => {
  switch (action.type) {
    case SET_STREAM_RUNNING:
      return {
        ...state,
        isRunning: action.payload
      };
    case SET_CURRENT_ROOM_ID:
      return {
        ...state,
        roomId: action.payload
      };
    case SET_STREAM_SOURCE:
      return {
        ...state,
        source: action.payload
      };
    case CANCEL_WEBSOCKET:
      return {
        ...state,
        source: undefined
      };
    default:
      return state;
  }
};
