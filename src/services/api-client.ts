import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: '3d86eef7c585435e94d2702cdc2401a7',
  },
});