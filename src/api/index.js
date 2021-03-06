import axios from 'axios';

class Api {
  fetcher = axios.create({
    baseURL: process.env.REACT_APP_URL
  });

  getUniqueRoomId() {
    return this.fetcher.get('unique_room_id');
  }
}

export default new Api();
