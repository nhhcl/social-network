import api from './axios';

export const getFeedApi = () => api.get('/posts/feed');
