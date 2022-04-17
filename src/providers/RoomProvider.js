import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import api from '../api';
import { SET_ROOMS } from '../store/actionTypes';

export const RoomProvider = ({ children }) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   api
  //     .getRooms()
  //     .then(res => {
  //       dispatch({ type: SET_ROOMS, payload: res.data.rooms });
  //     })
  //     .catch(err => console.error(err));
  // }, []);

  return children;
};
