import axios from 'axios';

const api = axios.create({
    baseURL: 'https://new-happy.herokuapp.com',
})

export default api;