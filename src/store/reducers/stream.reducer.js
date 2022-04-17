import {
  CANCEL_WEBSOCKET,
  CANCEL_STREAM,
  SET_STREAM_IS_RUNNING,
  SET_STREAM_SOURCE,
  SET_WS_TRANSFER_INTERVAL,
  SET_CANCELLING
} from '../actionTypes';

const initialStreamState = {
  source: undefined,
  interval: undefined,
  isRunning: false,
  isCancelling: false
};

export const streamReducer = (state = initialStreamState, action) => {
  switch (action.type) {
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
    case SET_WS_TRANSFER_INTERVAL:
      return {
        ...state,
        interval: action.payload
      };
    case CANCEL_STREAM:
      clearInterval(state.interval);
      return {
        ...state,
        isCancelling: true,
        interval: undefined
      };
    case SET_STREAM_IS_RUNNING:
      return {
        ...state,
        isRunning: action.payload
      };
    case SET_CANCELLING:
      return {
        ...state,
        isCancelling: action.payload
      };
    default:
      return state;
  }
};
