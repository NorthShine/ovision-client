import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import api from '../api';
import { ROOM_ID } from '../constants';
import { SET_ROOM_ID } from '../store/actionTypes';

export const RoomProvider = ({ children }) => {
  const dispatch = useDispatch();

  const getUserRoomId = async () => {
    const localRoomId = localStorage.getItem(ROOM_ID);
    if (localRoomId) return localRoomId;
    const res = await api.getUniqueRoomId();
    return res.data.room_id;
  };

  useEffect(() => {
    getUserRoomId()
      .then(roomId => {
        dispatch({ type: SET_ROOM_ID, payload: roomId });
        localStorage.setItem(ROOM_ID, roomId);
      })
      .catch(err => console.error(err));
  }, []);

  return children;
};
