import { SET_CURRENT_ROOM_ID, SET_ROOMS } from '../actionTypes';

const initialRoomState = {
  roomIds: [],
  currentRoomId: undefined
};

export const roomsReducer = (state = initialRoomState, action) => {
  switch (action.type) {
    case SET_CURRENT_ROOM_ID:
      return {
        ...state,
        currentRoomId: action.payload
      };
    case SET_ROOMS:
      return {
        ...state,
        roomIds: action.payload
      };
    default:
      return state;
  }
};
