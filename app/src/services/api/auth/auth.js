import ApiService from '../api';

const AuthService = {
  getCurrentUser: () => ApiService.get('/users/me'),
  login: (email, password) => ApiService.post('/login', { email, password }),
  logout: () => ApiService.get('/logout'),
};

export default AuthService;
