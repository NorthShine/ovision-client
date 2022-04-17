import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import api from '../api';
import { SET_CURRENT_ROOM_ID } from '../store/actionTypes';

export const RoomProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    api
      .getUniqueRoomId()
      .then(res => {
        dispatch({ type: SET_CURRENT_ROOM_ID, payload: res.data.room_id });
      })
      .catch(err => console.error(err));
  }, []);

  return children;
};
