import axios from 'axios';

class Api {
  fetcher = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });

  getUniqueRoomId() {
    return this.fetcher.get('unique_room_id');
  }

  getRooms() {
    return this.fetcher.get('available_rooms');
  }
}

export default new Api();
