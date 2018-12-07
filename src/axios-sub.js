import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://subscribio-5321a.firebaseio.com/'
});

export default instance;
