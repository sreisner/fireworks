import ApiService from '../api.service';

export default {
  register: (firstName, lastName, email, password) =>
    ApiService.post('/register', { firstName, lastName, email, password }),
};
