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

  createFaceId(data) {
    return this.fetcher.post('create_face_id', data);
  }
}

export default new Api();
